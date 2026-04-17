# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desarrollo

```bash
# Backend
cd backend && npm run start:dev   # Servidor en modo desarrollo
cd backend && npm run type-check  # Verificación TypeScript estricta
cd backend && npm run lint        # ESLint con reglas de tipado
cd backend && npm run test:cov    # Tests con coverage
```

---

## Principios de Arquitectura Obligatorios

### SOLID en NestJS + TypeORM

| Letra | Aplicación concreta |
|-------|---------------------|
| **S** — Single Responsibility | Controller: solo HTTP. Service: solo lógica de negocio. Repository: solo acceso a datos. DTO: solo validación/transformación. |
| **O** — Open/Closed | Extensiones mediante herencia/interfaces. Nunca modificar clases base; extenderlas. |
| **L** — Liskov Substitution | Clases derivadas sustituibles por su base. Todos los repositories implementan `IBaseRepository<T>`. |
| **I** — Interface Segregation | Interfaces pequeñas y específicas. `IUserRepository` separado de `IUserService`. |
| **D** — Dependency Inversion | Depender de abstracciones (interfaces), no de implementaciones. Inyección con tokens de interfaz. |

### STUPID — Anti-patrones Prohibidos

- **S**ingleton descontrolado — No crear instancias manuales; usar el sistema de inyección de NestJS.
- **T**ight Coupling — Controllers no acceden a repositories directamente; Services no hacen HTTP.
- **U**ntestability — Toda dependencia inyectada para facilitar mocking en tests.
- **P**remature Optimization — No crear abstracciones genéricas hasta que haya ≥3 casos reales.
- **I**ndescriptive Naming — Nombres que describan el dominio (`UserRepository`, no `DataHelper`).
- **D**uplication — Si la misma lógica existe en dos services, extraerla a `common/` antes de una tercera copia.

### DRY

- Entidades con campos comunes → extender `BaseEntity`
- Lógica CRUD repetida → extender `BaseRepository<T>` y `BaseService<T>`
- DTOs compartidos entre módulos → `common/dto/`
- Excepciones de negocio → `common/exceptions/`
- Pipes, guards, interceptors reutilizables → `common/`

---

## Estructura por Features (obligatorio)

Organizar por **dominio/feature**. Cada módulo es autocontenido.

```
backend/src/
├── common/                          # Abstracciones compartidas (DRY)
│   ├── interfaces/
│   │   ├── base-repository.interface.ts
│   │   └── soft-delete.interface.ts
│   ├── base/
│   │   ├── base.entity.ts           # id, createdAt, updatedAt, deletedAt
│   │   ├── base.service.ts
│   │   └── base.repository.ts       # CRUD + softDelete con TypeORM
│   ├── dto/
│   │   ├── pagination.dto.ts
│   │   └── response.dto.ts
│   └── exceptions/
│       ├── business.exception.ts
│       └── not-found.exception.ts
│
├── users/                           # Feature: users
│   ├── users.module.ts
│   ├── users.controller.ts          # Solo HTTP
│   ├── users.service.ts             # Solo lógica de negocio
│   ├── users.repository.ts          # Solo acceso a datos
│   ├── entities/
│   │   └── user.entity.ts
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── user-response.dto.ts
│   └── interfaces/
│       ├── user.interface.ts
│       └── user-repository.interface.ts
│
└── [feature]/                       # Misma estructura para cada dominio
```

> **Regla:** Si algo es usado por un solo módulo, vive dentro de ese módulo. Solo sube a `common/` si lo usan ≥2 módulos.

---

## Patrón Base Repository (SOLID + TypeORM)

### Base Entity

```typescript
// common/base/base.entity.ts
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true, type: 'timestamp' })
  deletedAt: Date | null;
}
```

### Base Repository Interface

```typescript
// common/interfaces/base-repository.interface.ts
import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface IBaseRepository<T> {
  find(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  save(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  softDelete(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  exists(options: FindOneOptions<T>): Promise<boolean>;
}
```

### Base Repository (TypeORM puro — sin SQL raw)

```typescript
// common/base/base.repository.ts
import { Repository, FindManyOptions, FindOneOptions, DeepPartial } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { IBaseRepository } from '../interfaces/base-repository.interface';

export abstract class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    const where = { ...options?.where, deletedAt: null } as FindManyOptions<T>['where'];
    return this.repository.find({ ...options, where });
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    const where = { ...options.where, deletedAt: null } as FindOneOptions<T>['where'];
    return this.repository.findOne({ ...options, where });
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    await this.repository.update(id, entity as Parameters<Repository<T>['update']>[1]);
    const updated = await this.findOne({ where: { id } as FindOneOptions<T>['where'] });
    if (!updated) throw new NotFoundException(`Entity ${id} not found`);
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.update(id, { deletedAt: new Date() } as Parameters<Repository<T>['update']>[1]);
  }

  async restore(id: string): Promise<void> {
    await this.repository.update(id, { deletedAt: null } as Parameters<Repository<T>['update']>[1]);
  }

  async exists(options: FindOneOptions<T>): Promise<boolean> {
    const count = await this.repository.count({ where: options.where });
    return count > 0;
  }
}
```

---

## Uso Exclusivo de TypeORM (NO SQL directo)

- ❌ `query()` / `execute()` con SQL raw
- ❌ `createQueryBuilder()` con strings SQL
- ❌ Acceso directo a `DataSource.query()`
- ✅ Repository pattern con TypeORM
- ✅ `FindOptions` tipadas
- ✅ Transactions con `QueryRunner`
- ✅ Relations con `relations: ['profile']`

### Transactions

```typescript
async transferData(userId: string, profileData: CreateProfileDto): Promise<void> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.manager.getRepository(User).update(userId, { status: 'active' });
    await queryRunner.manager.getRepository(Profile).save({ userId, ...profileData });
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
```

---

## DTOs Tipados (class-validator)

```typescript
// users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';

export enum UserRole { ADMIN = 'admin', USER = 'user' }

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString() @MinLength(3) @MaxLength(50)
  username: string;

  @IsString() @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
```

```typescript
// users/dto/user-response.dto.ts — nunca exponer entidades directamente
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() username: string;
  @Expose() role: string;
  @Expose() createdAt: Date;
  @Exclude() password: string;
  @Exclude() deletedAt: Date | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
```

---

## Tipado Estricto (CERO `any`)

### Reglas TSConfig

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictPropertyInitialization": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

- ❌ `any` → usar `unknown` + type guards
- ❌ `@ts-ignore` → resolver el error correctamente
- ❌ `as any` → usar type predicates

```typescript
function isValidUser(data: unknown): data is User {
  return typeof data === 'object' && data !== null && 'id' in data;
}
```

### Reglas ESLint

```json
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error"
  }
}
```

---

## Checklist para Nuevo Módulo

- [ ] Crear `[feature]/` con: `module`, `controller`, `service`, `repository`, `entities/`, `dto/`, `interfaces/`
- [ ] Entidad extiende `BaseEntity`
- [ ] Repository extiende `BaseRepository<T>` e implementa su interfaz
- [ ] Service define su interfaz antes de implementarla
- [ ] DTOs separados: Create, Update, Response
- [ ] Controller tipado (ParseUUIDPipe, DTOs, sin lógica de negocio)
- [ ] Registrar módulo en `app.module.ts` y entidad en `database.config.ts`
- [ ] Verificar 0 `any`: `npm run type-check`
- [ ] Verificar 0 SQL raw: `grep -r "\.query(" src/`
