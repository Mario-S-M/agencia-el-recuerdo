# El Recuerdo - Backend REST API

Proyecto completo con PostgreSQL, pgAdmin, backups automatizados y API REST con TypeORM.

## Estructura del Proyecto

```
el-recuerdo/
├── docker-compose.yml           # Configuración de Docker
├── .env                        # Variables de entorno
├── README.md                   # Documentación principal
├── scripts/                    # Scripts de inicialización y backup
│   ├── init_db.sh
│   └── backup.sh
├── frontend/                   # Carpeta de frontend
├── backend/                    # Carpeta de backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.config.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── coverage/                   # Cobertura de tests
```

## Servicios Docker

| Servicio   | Imagen                  | Puerto | Descripción                 |
| ---------- | ----------------------- | ------ | --------------------------- |
| `postgres` | `postgres:17-alpine`    | 5432   | Base de datos PostgreSQL 17 |
| `pgadmin`  | `dpage/pgadmin4:latest` | 9000   | Administración visual       |
| `backup`   | `postgres:17-alpine`    | 5432   | Servicio de backups         |

## Configuración Inicial

### Requisitos previos

- **Docker Desktop** instalado y corriendo
- **Node.js** 18+ instalado

### 1. Actualizar contraseñas

Edita el archivo `.env` con tus contraseñas seguras:

```bash
# PostgreSQL
POSTGRES_PASSWORD=tu_contraseña_segura_aqui

# pgAdmin
PGADMIN_PASSWORD=tu_contraseña_pgadmin
```

### 2. Levantar todos los servicios

```bash
docker-compose up -d
```

Espera a que `postgres` quede listo antes de arrancar el backend. El backend ahora reintenta la conexión durante unos segundos, pero no reemplaza un Postgres detenido.

### 3. Verificar que los servicios están corriendo

```bash
docker-compose ps
```

### 4. Acceder a pgAdmin

Abre http://localhost:9000 con las credenciales del `.env`.

### 5. Levantar el backend

```bash
cd backend
npm run start:dev
```

### 3. Acceder a pgAdmin

Abre http://localhost:9000 con las credenciales del `.env`.

### 4. Levantar el backend

```bash
cd backend
npm run start:dev
```

## API REST - Endpoints de Usuarios

### Obtener todos los usuarios

```
GET /usuarios
```

### Buscar usuarios

```
GET /usuarios/search?term=juan
```

### Obtener usuario por ID

```
GET /usuarios/:id
```

### Filtrar por rol

```
GET /usuarios/role/:rol
```

### Obtener usuarios activos

```
GET /usuarios/active
```

### Estadísticas

```
GET /usuarios/stats
```

### Crear usuario

```
POST /usuarios
Content-Type: application/json

{
  "email": "juan@email.com",
  "nombre": "Juan",
  "apellidos": "Pérez",
  "telefono": "+52 555 1234",
  "rol": "admin",
  "activo": true
}
```

### Actualizar usuario (parcial)

```
PATCH /usuarios/:id
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "activo": true
}
```

### Eliminar (soft delete)

```
DELETE /usuarios/:id
```

### Restaurar usuario eliminado

```
PATCH /usuarios/:id/restore
```

### Eliminar permanentemente

```
DELETE /usuarios/:id/permanent
```

## Modelos de Datos

### Usuario

| Campo        | Tipo         | Descripción            |
| ------------ | ------------ | ---------------------- |
| `id`         | UUID (auto)  | Identificador único    |
| `email`      | VARCHAR(100) | Email único            |
| `nombre`     | VARCHAR(100) | Nombre                 |
| `apellidos`  | VARCHAR(100) | Apellidos              |
| `telefono`   | VARCHAR(20)  | Teléfono               |
| `rol`        | VARCHAR(50)  | Rol del usuario        |
| `avatar`     | VARCHAR(255) | URL de avatar          |
| `activo`     | BOOLEAN      | Estado activo/inactivo |
| `created_at` | TIMESTAMP    | Fecha de creación      |
| `updated_at` | TIMESTAMP    | Fecha de actualización |
| `deleted_at` | TIMESTAMP    | Soft delete            |

## Comandos Útiles

### Ver logs del backend

```bash
docker-compose logs -f backend
```

### Ver logs de la base de datos

```bash
docker-compose logs -f postgres
```

### Ver logs de pgAdmin

```bash
docker-compose logs -f pgadmin
```

### Ver logs de backup

```bash
docker-compose logs -f backup
```

### Ver backups generados

```bash
ls -lh backups/
cat backups/backup_log.txt
```

### Restaurar desde backup

```bash
gunzip -c backups/pg_dump_EL_RECUERDO_DB_*.sql.gz | psql -h localhost -p 5432 -U postgres
```

### Detener todos los servicios

```bash
docker-compose down
```

### Detener solo el backend

```bash
cd backend
npm run build
node dist/main
# Ctrl+C para detener
```

## Variables de Entorno

### `.env` (raíz)

```env
# PostgreSQL
POSTGRES_DB=el_recuerdo_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña
POSTGRES_PORT=5432

# pgAdmin
PGADMIN_EMAIL=admin@el-recuerdo.local
PGADMIN_PASSWORD=tu_contraseña_pgadmin
PGADMIN_PORT=9000

# Backup
BACKUP_CRON="0 */24 * * *"  # Cada 24 horas
```

### `backend/.env`

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=el_recuerdo_db
CORS_ORIGIN=*
```

## Tecnologías Usadas

- **Base de datos**: PostgreSQL 17
- **ORM**: TypeORM
- **Framework**: NestJS
- **Administración**: pgAdmin 4
- **Autobackup**: pg_dump programado
- **Containerización**: Docker Compose

## Licencia

MIT
