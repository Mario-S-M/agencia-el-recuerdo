# El Recuerdo — Arquitectura (Cloud Point)

## Visión General

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 15)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐│
│  │   App Router │  │  pages/*     │  │  features/*              ││
│  │  (app/*)     │──│ (admin,      │──│  ┌──────┬──────┬──────┐ ││
│  │              │  │  calendario, │  │  │domain│ data │present│ ││
│  │  layout.tsx  │  │  login)      │  │  │entity│  dto │component││
│  │  page.tsx    │  └──────────────┘  │  │ repo │ repo │  hook  │ ││
│  └─────────────┘                    │  └──────┴──────┴──────┘ ││
│                                     └─────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  lib/                         ┌──────────────────────────┐  ││
│  │  ├── http-client.ts ──────────│  Fetch API → Backend     │  ││
│  │  ├── utils.ts                 │  http://localhost:3001   │  ││
│  │  └── index.ts                 └──────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (NestJS 11)                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  src/                                                        ││
│  │  ├── common/              Abstracciones compartidas          ││
│  │  │   ├── base/             BaseEntity, BaseRepository         ││
│  │  │   ├── guards/           Auth guards (JWT)                  ││
│  │  │   ├── decorators/       Custom decorators                  ││
│  │  │   ├── interfaces/       IBaseRepository<T>                 ││
│  │  │   └── seed.ts           Seed inicial (hoteles, servicios)  ││
│  │  ├── config/              DataSource (TypeORM)                ││
│  │  ├── auth/                Autenticación JWT                   ││
│  │  ├── users/               Usuarios CRUD                      ││
│  │  ├── destinos/            Destinos CRUD                      ││
│  │  ├── servicios/           Servicios (tipo + categoría)       ││
│  │  ├── hoteles/             Hoteles + habitaciones + tarifas   ││
│  │  ├── paquetes/            Paquetes (con hoteles y servicios) ││
│  │  ├── fechas-salida/       Fechas + opciones hoteles          ││
│  │  └── uploads/             Subida de archivos                 ││
│  └─────────────────────────────────────────────────────────────┘│
└──────────────────────┬──────────────────────────────────────────┘
                       │ TypeORM
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POSTGRES (via Docker)                         │
│  Base de datos: el_recuerdo                                      │
│  Volumen: pg_data                                                │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict mode, no `any`)
- **Zod** v4 (validación de formularios y DTOs)
- **Tailwind CSS** + shadcn/ui
- **Clean Architecture**: cada feature en `features/<nombre>/` con `domain/` `data/` `presentation/`

### Backend
- **NestJS 11** (controllers, services, modules)
- **TypeORM** (sin SQL raw; solo FindOptions y QueryRunner para transactions)
- **PostgreSQL 17** (vía Docker Compose)
- **JWT** (passport + @nestjs/jwt)
- **Swagger** (documentación automática en /swagger)
- **class-validator** + **class-transformer** (DTOs)

### Infraestructura
- **Docker Compose**: postgres, backend (Node), pgadmin, backup scheduler
- **Volúmenes**: pg_data, pgadmin_data, backup_volume, media_uploads
- **Red**: el_recuerdo_network (bridge)

## Clean Architecture (Frontend)

Cada feature sigue una estructura de 3 capas:

```
features/hoteles/
├── index.ts                   # Barrel: re-exporta todo lo público
├── domain/
│   ├── entities/              # Interfaces de dominio (hotel.types.ts)
│   ├── repositories/          # IHotelRepository (abstracto)
│   └── index.ts               # Barrel
├── data/
│   ├── dto/                   # Schemas Zod + interfaces DTO
│   ├── repositories/          # HotelRepositoryImpl (implementación concreta)
│   ├── api/                   # Transformación request/response
│   └── index.ts               # Barrel
└── presentation/
    ├── components/            # Componentes React
    ├── hooks/                 # Custom hooks (uso del repositorio)
    ├── schemas/               # Esquemas Zod para formularios
    ├── store/                 # Estado local (Zustand u otro)
    └── index.ts               # Barrel
```

**Reglas**:
- `domain/` nunca importa de `data/` o `presentation/`
- `data/` implementa interfaces definidas en `domain/`
- `presentation/` solo conoce interfaces de `domain/`, nunca los DTOs de `data/`
- El `http-client` global en `lib/http-client.ts` centraliza la comunicación con el backend

## DataSource & Seed (Backend)

### Conexión
- `config/database.config.ts` crea un `DataSource` de TypeORM con `synchronize: true`
- `app.module.ts` tiene un bootstrap con retry loop (10 intentos, 2s de espera)
- Después de conectar, se ejecuta `seed.ts` para datos iniciales (hoteles, servicios)

### Seed
- Se ejecuta en cada arranque (es idempotente — verifica existencia antes de insertar)
- Inserta 3 hoteles por defecto (Hotel Emporio, Hotel Azul, Hotel Gran Fiesta)
- Inserta 13 servicios (transporte, alimentación, general)

### Módulos CRUD
Cada módulo sigue el patrón:
```
Controller → Service → Repository → Entity
                             ↑
                      BaseRepository<T>
                      (common/base/base.repository.ts)
```

`BaseRepository<T>` implementa `IBaseRepository<T>` y provee CRUD genérico con soft delete. Cada repositorio de feature extiende `BaseRepository<Entidad>`.

## API Communication Flow

```
Frontend Component
    ── llama ──> hook (useHoteles)
                      ── llama ──> repository data layer (HotelRepositoryImpl)
                                        ── usa ──> HttpClient (lib/http-client.ts)
                                                      ── fetch ──> Backend API
                                                                      GET /api/hoteles
                                                                      Controller
                                                                          ──> Service
                                                                              ──> Repository
                                                                                  ──> TypeORM
                                                                                      ──> PostgreSQL
```

## Deployment (Docker Compose)

```bash
docker compose up -d
```

Esto levanta:
1. **postgres** (puerto 5432) — base de datos
2. **backend** (puerto 3001) — API NestJS
3. **pgadmin** (puerto 5050) — administración de BD
4. **backup** — backup automático cada 24h

Variables de entorno vía `.env` en la raíz del proyecto:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=el_recuerdo
POSTGRES_PORT=5432
BACKEND_PORT=3001
JWT_SECRET=changeme_in_production
```

## Graphify Knowledge Graphs

El proyecto tiene grafos de conocimiento generados con `graphify-ts`:

| Ámbito | Archivo |
|--------|---------|
| Root (todo el proyecto) | `graphify-out/graph.json` |
| Backend | `backend/graphify-out/graph.json` |
| Frontend | `frontend/graphify-out/graph.json` |

Para regenerar:
```bash
graphify-ts generate .          # root
cd backend && graphify-ts generate .
cd frontend && graphify-ts generate .
```

Cada grafo incluye:
- `graph.json` — datos estructurados del grafo
- `GRAPH_REPORT.md` — reporte legible
- `graph.html` — visualización interactiva

## Diagrama de Componentes (Backend)

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  AuthModule   │     │  UsersModule  │     │ DestinosModule│
│  JWT guard    │     │  CRUD users   │     │  CRUD destinos│
└───────┬───────┘     └───────┬───────┘     └───────┬───────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────────────────────────────────────────────────────┐
│                    BaseRepository<T>                           │
│           (common/base/base.repository.ts)                     │
│   softDelete · findOne · exists · restore · save · update     │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                      TypeORM DataSource                        │
│               (config/database.config.ts)                      │
│               synchronize: true · PostgreSQL 17                │
└───────────────────────────────────────────────────────────────┘
```

## Convenciones

- **Backend**: snake_case en columnas de BD, camelCase en TypeScript
- **Frontend**: camelCase en todo, PascalCase en componentes React
- **DTOs**: siempre separados de entidades. Nunca exponer entidades TypeORM al frontend
- **Errores**: controlados con `BusinessException` y `NotFoundException` (common/exceptions/)
- **Tipado**: CERO `any`. Usar `unknown` + type guards cuando sea necesario
- **Seed**: idempotente. Solo inserta datos que no existen
