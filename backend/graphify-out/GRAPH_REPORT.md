# Graph Report - /Users/mario-e-s-m/Documents/el-recuerdo/backend  (2026-05-11)

## Corpus Check
- Corpus is ~15,214 words - fits in a single context window. You may not need a graph.

## Summary
- 489 nodes · 568 edges · 101 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Structure Signals
- Entity graph basis: 408 non-file, non-concept node(s)
- Weakly connected components: 52
- Singleton components: 32
- Isolated nodes: 32
- Largest component: 312 node(s) (76% of the entity graph basis)
- Low-cohesion communities: 6
- Largest low-cohesion community: 26 node(s) (cohesion 0.08)

## Workspace Bridges
1. `JwtAuthGuard` - connects `Common Roles Guard`, `Destinos Destinos Controller`, `Fechas Salida Fechas Salida Controller`, `Hoteles Hoteles Controller`, `Paquetes Paquetes Controller`, `Servicios Servicios Controller`, `Uploads Uploads Controller`, `Users Users Controller`; home: `Hoteles Hoteles Controller — ID`; degree 42; score 24688.33
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/jwt-auth.guard.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/destinos/destinos.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/paquetes/paquetes.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/servicios/servicios.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/uploads/uploads.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`
2. `RolesGuard` - connects `Destinos Destinos Controller`, `Fechas Salida Fechas Salida Controller`, `Hoteles Hoteles Controller`, `Hoteles Hoteles Controller — ID`, `Paquetes Paquetes Controller`, `Servicios Servicios Controller`, `Users Users Controller`; home: `Common Roles Guard`; degree 43; score 23364.33
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/roles.guard.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/destinos/destinos.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/paquetes/paquetes.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/servicios/servicios.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`
3. `UsersService` - connects `Users Users Controller`, `Users Users Module`, `Users Users Service — All`, `Users Users Service — Create`, `Users Users Service — Delete`, `Users Users Service — Find`, `Users Users Service — Generate`; home: `Users Users Service`; degree 16; score 5361
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.service.ts`
4. `HotelesController` - connects `Common Roles Guard`, `Hoteles Hoteles Controller — ID`, `Hoteles Hoteles Module`, `Hoteles Hoteles Service`; home: `Hoteles Hoteles Controller`; degree 35; score 18109
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.service.ts`
5. `FechasSalidaController` - connects `Common Roles Guard`, `Fechas Salida Fechas Salida Module`, `Fechas Salida Fechas Salida Service`, `Hoteles Hoteles Controller — ID`; home: `Fechas Salida Fechas Salida Controller`; degree 33; score 17653
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.service.ts`
6. `HotelesRepository` - connects `Hoteles Hoteles Module`, `Hoteles Hoteles Repository — Habitacion`, `Hoteles Hoteles Repository — Periodo`, `Hoteles Hoteles Repository — Tarifa`; home: `Hoteles Hoteles Repository`; degree 18; score 5983
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.repository.ts`

## God Nodes
1. `RolesGuard` - 44 edges
2. `JwtAuthGuard` - 43 edges
3. `HotelesController` - 36 edges
4. `FechasSalidaController` - 34 edges
5. `UsersController` - 26 edges
6. `DestinosController` - 22 edges
7. `PaquetesController` - 22 edges
8. `HotelesService` - 20 edges
9. `ServiciosController` - 20 edges
10. `FechasSalidaService` - 19 edges

## Surprising Connections
- `POST /uploads/media` --uses\_guard--> `JwtAuthGuard`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/uploads/uploads.controller.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/jwt-auth.guard.ts  _bridges separate communities; peripheral node \`POST /uploads/media\` unexpectedly reaches hub \`JwtAuthGuard\`_
- `AppController` --injects--> `AppService`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.controller.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.service.ts  _bridges separate communities_
- `AppModule` --declares\_controller--> `AppController`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.module.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.controller.ts  _bridges separate communities_
- `AppModule` --provides--> `AppService`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.module.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/app.service.ts  _bridges separate communities_
- `AuthController` --injects--> `AuthService`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/auth/auth.controller.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/auth/auth.service.ts  _bridges separate communities_

## Semantic Anomalies
- **[HIGH] Bridge node** - JwtAuthGuard bridges Hoteles Hoteles Controller — ID and Destinos Destinos Controller, Fechas Salida Fechas Salida Controller, Common Roles Guard, Hoteles Hoteles Controller, Paquetes Paquetes Controller, Servicios Servicios Controller, Uploads Uploads Controller, Users Users Controller.
  _High betweenness centrality \(24566.333\) across 9 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - RolesGuard bridges Common Roles Guard and Destinos Destinos Controller, Hoteles Hoteles Controller — ID, Fechas Salida Fechas Salida Controller, Hoteles Hoteles Controller, Paquetes Paquetes Controller, Servicios Servicios Controller, Users Users Controller.
  _High betweenness centrality \(23251.333\) across 8 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - HotelesController bridges Hoteles Hoteles Controller and Hoteles Hoteles Service, Common Roles Guard, Hoteles Hoteles Controller — ID, Hoteles Hoteles Module.
  _High betweenness centrality \(18034.000\) across 5 communities makes this node a likely dependency chokepoint._
- **[HIGH] Low-cohesion community** - Fechas Salida Fechas Salida Controller is weakly connected for its size.
  _Cohesion score 0.08 across 26 nodes suggests this community may mix unrelated responsibilities._
- **[HIGH] Low-cohesion community** - Hoteles Hoteles Controller is weakly connected for its size.
  _Cohesion score 0.08 across 25 nodes suggests this community may mix unrelated responsibilities._

## Communities

### Community 0 - "Fechas Salida Fechas Salida Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (26): FechasSalidaController, .addOpcionHotel\(\), .addTransporte\(\), .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByPaquete\(\) (+18 more)

### Community 1 - "Hoteles Hoteles Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (25): HotelesController, .constructor\(\), .create\(\), .createPeriodo\(\), .createTarifa\(\), .createTipoHabitacion\(\), .deletePeriodo\(\), .deleteTarifa\(\) (+17 more)

### Community 2 - "Users Users Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (24): UsersController, .constructor\(\), .create\(\), .findActive\(\), .findAll\(\), .findByRole\(\), .findOne\(\), .getStats\(\) (+16 more)

### Community 3 - "Destinos Destinos Controller"
Cohesion (entity basis within full-graph community): 0.1
Nodes (20): DestinosController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\), .findOne\(\) (+12 more)

### Community 4 - "Paquetes Paquetes Controller"
Cohesion (entity basis within full-graph community): 0.1
Nodes (20): PaquetesController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\), .findOne\(\) (+12 more)

### Community 5 - "Servicios Servicios Controller"
Cohesion (entity basis within full-graph community): 0.11
Nodes (18): ServiciosController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByTipo\(\), .findOne\(\), .restore\(\) (+10 more)

### Community 6 - "Fechas Salida Fechas Salida Repository"
Cohesion (entity basis within full-graph community): 0.17
Nodes (12): BaseRepository, FechasSalidaRepository, .deleteOpcion\(\), .deleteTransporte\(\), .findAll\(\), .findAllActive\(\), .findById\(\), .findByPaquete\(\) (+4 more)

### Community 7 - "Hoteles Hoteles Service"
Cohesion (entity basis within full-graph community): 0.17
Nodes (12): HotelesService, .constructor\(\), .create\(\), .createTarifa\(\), .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\) (+4 more)

### Community 8 - "Fechas Salida Fechas Salida Service"
Cohesion (entity basis within full-graph community): 0.18
Nodes (11): FechasSalidaService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByPaquete\(\), .findProximas\(\), .removeOpcionHotel\(\) (+3 more)

### Community 9 - "Common Roles Guard"
Cohesion (entity basis within full-graph community): 0.18
Nodes (11): CanActivate, RolesGuard, .canActivate\(\), .constructor\(\), DELETE /fechas-salida/:id/transportes/:transporteId, PATCH /fechas-salida/:id/restore, POST /fechas-salida/:id/opciones-hotel, DELETE /hoteles/:hotelId/periodos/:periodoId/tarifas/:id (+3 more)

### Community 10 - "Hoteles Hoteles Repository"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): BaseRepository, HotelesRepository, .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\), .findAllActive\(\), .findWithRelations\(\) (+2 more)

### Community 11 - "Hoteles Hoteles Controller — ID"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): AuthGuard, JwtAuthGuard, DELETE /fechas-salida/:id/opciones-hotel/:opcionId, PATCH /fechas-salida/:id/opciones-hotel/:opcionId, POST /fechas-salida, DELETE /hoteles/:hotelId/periodos/:id, DELETE /hoteles/:hotelId/tipos-habitacion/:id, PATCH /hoteles/:hotelId/periodos/:periodoId/tarifas/:id (+2 more)

### Community 12 - "Users Users Repository"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): BaseRepository, UsersRepository, .countActive\(\), .countAll\(\), .findActiveUsers\(\), .findAll\(\), .findByEmail\(\), .findByEmailWithPassword\(\) (+2 more)

### Community 13 - "Paquetes Paquetes Repository"
Cohesion (entity basis within full-graph community): 0.25
Nodes (8): BaseRepository, IPaqueteRepository, PaquetesRepository, .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\), .findById\(\)

### Community 14 - "Destinos Destinos Repository"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): BaseRepository, DestinosRepository, .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\), IDestinoRepository

### Community 15 - "Destinos Destinos Service"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): DestinosService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\)

### Community 16 - "Paquetes Paquetes Service"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): PaquetesService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\)

### Community 17 - "Servicios Servicios Repository"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): BaseRepository, IServicioRepository, ServiciosRepository, .findAll\(\), .findAllActive\(\), .findByTipo\(\)

### Community 18 - "Servicios Servicios Service"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): ServiciosService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByTipo\(\)

### Community 19 - "Common Base Repository"
Cohesion (entity basis within full-graph community): 0.47
Nodes (6): BaseRepository, .find\(\), .findById\(\), .findOne\(\), .save\(\), IBaseRepository

### Community 20 - "Fechas Salida Fechas Salida Service — Add"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): .addOpcionHotel\(\), .addTransporte\(\), .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 21 - "Hoteles Hoteles Service — Create"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): .createPeriodo\(\), .createTipoHabitacion\(\), .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 22 - "Users Users Service"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): UsersService, .constructor\(\), .findActive\(\), .findByRole\(\), .getStats\(\)

### Community 23 - "Src App Controller"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AppController, .constructor\(\), .getHello\(\), GET /

### Community 24 - "Auth Auth Controller"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AuthController, .constructor\(\), .login\(\), POST /auth/login

### Community 25 - "Users Create User Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (4): CreateUserDto, UpdateUserDto, UserResponseDto, UserStatsDto

### Community 26 - "Auth Jwt Strategy"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): JwtStrategy, .constructor\(\), .validate\(\), PassportStrategy

### Community 27 - "Destinos Destinos Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 28 - "Paquetes Paquetes Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 29 - "Servicios Servicios Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 30 - "Uploads Uploads Controller"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): UploadsController, .uploadMedia\(\), POST /uploads/media

### Community 31 - "Src App Service"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AppService, .getHello\(\)

### Community 32 - "Auth Auth Service"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): AuthService, .constructor\(\), .login\(\)

### Community 33 - "Common Base Repository — Delete"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .restore\(\), .softDelete\(\), .update\(\)

### Community 34 - "Destinos Create Destino Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateDestinoDto, UpdateDestinoDto

### Community 35 - "Fechas Salida Create Fecha Salida Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateFechaSalidaDto, UpdateFechaSalidaDto

### Community 36 - "Hoteles Create Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateHotelDto, UpdateHotelDto

### Community 37 - "Fechas Salida Create Opcion Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateOpcionHotelDto, UpdateOpcionHotelDto

### Community 38 - "Paquetes Create Paquete Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreatePaqueteDto, UpdatePaqueteDto

### Community 39 - "Hoteles Create Periodo Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreatePeriodoHotelDto, UpdatePeriodoHotelDto

### Community 40 - "Servicios Create Servicio Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioDto, UpdateServicioDto

### Community 41 - "Hoteles Create Tarifa Periodo Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTarifaPeriodoDto, UpdateTarifaPeriodoDto

### Community 42 - "Hoteles Create Tipo Habitacion Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTipoHabitacionDto, UpdateTipoHabitacionDto

### Community 43 - "Fechas Salida Create Transporte Adicional Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTransporteAdicionalDto, UpdateTransporteAdicionalDto

### Community 44 - "Destinos Destino Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Destino

### Community 45 - "Destinos Destino Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IDestinoRepository

### Community 46 - "Fechas Salida Fecha Salida Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, FechaSalida

### Community 47 - "Fechas Salida Fecha Salida Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IFechaSalidaRepository

### Community 48 - "Hoteles Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Hotel

### Community 49 - "Hoteles Hotel Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IHotelRepository

### Community 50 - "Hoteles Hoteles Repository — Periodo"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findPeriodoById\(\), .savePeriodo\(\), .updatePeriodo\(\)

### Community 51 - "Hoteles Hoteles Repository — Tarifa"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findTarifaById\(\), .saveTarifa\(\), .updateTarifa\(\)

### Community 52 - "Fechas Salida Opcion Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, OpcionHotel

### Community 53 - "Paquetes Paquete Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Paquete

### Community 54 - "Paquetes Paquete Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IPaqueteRepository

### Community 55 - "Hoteles Periodo Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, PeriodoHotel

### Community 56 - "Servicios Servicio Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Servicio

### Community 57 - "Servicios Servicio Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IServicioRepository

### Community 58 - "Hoteles Tarifa Periodo Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TarifaPeriodo

### Community 59 - "Hoteles Tipo Habitacion Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TipoHabitacion

### Community 60 - "Fechas Salida Transporte Adicional Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TransporteAdicional

### Community 61 - "Users User Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, User

### Community 62 - "Users Users Service — Find"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findOne\(\), .restore\(\), .update\(\)

### Community 63 - "Src App Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): wait\(\)

### Community 64 - "Src App Module — App"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AppModule, .bootstrap\(\)

### Community 65 - "Auth Auth Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuthModule

### Community 66 - "Auth Auth Service — Auth"
Cohesion (entity basis within full-graph community): 1
Nodes (1): LoginResponse

### Community 67 - "Common Base Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (1): BaseEntity

### Community 68 - "Common Base Repository — Count"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .count\(\), .exists\(\)

### Community 69 - "Common Base Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): IBaseRepository

### Community 70 - "Destinos Destinos Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinosModule

### Community 71 - "Fechas Salida Fechas Salida Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): FechasSalidaModule

### Community 72 - "Fechas Salida Fechas Salida Repository — Opcion"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findOpcionById\(\), .updateOpcion\(\)

### Community 73 - "Fechas Salida Fechas Salida Repository — Transporte"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findTransporteById\(\), .updateTransporte\(\)

### Community 74 - "Hoteles Hoteles Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesModule

### Community 75 - "Hoteles Hoteles Repository — Habitacion"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findTipoHabitacionById\(\), .updateTipoHabitacion\(\)

### Community 76 - "Auth Jwt Payload Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): JwtPayload

### Community 77 - "Auth Login Dto"
Cohesion (entity basis within full-graph community): 1
Nodes (1): LoginDto

### Community 78 - "Src Bootstrap"
Cohesion (entity basis within full-graph community): 1
Nodes (1): bootstrap\(\)

### Community 79 - "Paquetes Paquetes Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): PaquetesModule

### Community 80 - "Common Roles Decorator"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Roles\(\)

### Community 81 - "Common Seed"
Cohesion (entity basis within full-graph community): 1
Nodes (1): runSeed\(\)

### Community 82 - "Servicios Servicios Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ServiciosModule

### Community 83 - "Uploads Uploads Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): UploadsModule

### Community 84 - "Users Users Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): UsersModule

### Community 85 - "Users Users Service — Create"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .create\(\), .findByEmail\(\)

### Community 86 - "Users Users Service — All"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findAll\(\), .search\(\)

### Community 87 - "Users Users Service — Generate"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .generateUUID\(\), s4\(\)

### Community 88 - "Users Users Service — Delete"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .remove\(\), .softDelete\(\)

### Community 89 - "03741069 3208 4c37 9433 E58470cc6a15 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 90 - "30a77df1 20d3 4f83 8441 9e2443cc82da Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 91 - "5bef35ab 6fbd 4741 Bb38 6a97d7bde3d4 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 92 - "615b711b 661f 4454 8260 0c9b621da9b5 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 93 - "B380c437 Bcc4 419d B4db 8b25582d4580 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 94 - "Bab8ce22 Cb2f 4d4c 90ee A523934e08bf Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 95 - "Base Repository TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 96 - "D6069f3e 36a4 48d0 8354 8af4470e9f97 Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 97 - "Database Config TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 98 - "E2ec06e2 9492 41b1 Bc4a Ee02cd5afdd6 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 99 - "Eb282b31 A8b5 4a18 9b7d 931be2372201 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 100 - "F602dd80 042d 4809 9f26 7aebee5e4ef6 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

## Knowledge Gaps
- **277 weakly connected node(s):** `.constructor\(\)`, `.getHello\(\)`, `GET /`, `wait\(\)`, `.getHello\(\)` (+272 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Src App Module`** (2 nodes): `app.module.ts`, `wait\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Src App Module — App`** (2 nodes): `AppModule`, `.bootstrap\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Auth Module`** (2 nodes): `auth.module.ts`, `AuthModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Auth Service — Auth`** (2 nodes): `auth.service.ts`, `LoginResponse`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Common Base Entity`** (2 nodes): `base.entity.ts`, `BaseEntity`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Common Base Repository — Count`** (2 nodes): `.count\(\)`, `.exists\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Common Base Repository Interface`** (2 nodes): `base-repository.interface.ts`, `IBaseRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Destinos Destinos Module`** (2 nodes): `destinos.module.ts`, `DestinosModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fechas Salida Fechas Salida Module`** (2 nodes): `fechas-salida.module.ts`, `FechasSalidaModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fechas Salida Fechas Salida Repository — Opcion`** (2 nodes): `.findOpcionById\(\)`, `.updateOpcion\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fechas Salida Fechas Salida Repository — Transporte`** (2 nodes): `.findTransporteById\(\)`, `.updateTransporte\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hoteles Hoteles Module`** (2 nodes): `hoteles.module.ts`, `HotelesModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hoteles Hoteles Repository — Habitacion`** (2 nodes): `.findTipoHabitacionById\(\)`, `.updateTipoHabitacion\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Jwt Payload Interface`** (2 nodes): `jwt-payload.interface.ts`, `JwtPayload`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth Login Dto`** (2 nodes): `login.dto.ts`, `LoginDto`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Src Bootstrap`** (2 nodes): `main.ts`, `bootstrap\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Paquetes Paquetes Module`** (2 nodes): `paquetes.module.ts`, `PaquetesModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Common Roles Decorator`** (2 nodes): `roles.decorator.ts`, `Roles\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Common Seed`** (2 nodes): `seed.ts`, `runSeed\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Servicios Servicios Module`** (2 nodes): `servicios.module.ts`, `ServiciosModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Uploads Uploads Module`** (2 nodes): `uploads.module.ts`, `UploadsModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Users Module`** (2 nodes): `users.module.ts`, `UsersModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Users Service — Create`** (2 nodes): `.create\(\)`, `.findByEmail\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Users Service — All`** (2 nodes): `.findAll\(\)`, `.search\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Users Service — Generate`** (2 nodes): `.generateUUID\(\)`, `s4\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Users Users Service — Delete`** (2 nodes): `.remove\(\)`, `.softDelete\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `03741069 3208 4c37 9433 E58470cc6a15 Jpg`** (1 nodes): `03741069-3208-4c37-9433-e58470cc6a15.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `30a77df1 20d3 4f83 8441 9e2443cc82da Jpeg`** (1 nodes): `30a77df1-20d3-4f83-8441-9e2443cc82da.jpeg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `5bef35ab 6fbd 4741 Bb38 6a97d7bde3d4 Jpg`** (1 nodes): `5bef35ab-6fbd-4741-bb38-6a97d7bde3d4.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `615b711b 661f 4454 8260 0c9b621da9b5 Jpg`** (1 nodes): `615b711b-661f-4454-8260-0c9b621da9b5.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `B380c437 Bcc4 419d B4db 8b25582d4580 Jpg`** (1 nodes): `b380c437-bcc4-419d-b4db-8b25582d4580.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Bab8ce22 Cb2f 4d4c 90ee A523934e08bf Jpeg`** (1 nodes): `bab8ce22-cb2f-4d4c-90ee-a523934e08bf.jpeg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Base Repository TypeScript`** (1 nodes): `base.repository.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `D6069f3e 36a4 48d0 8354 8af4470e9f97 Jpeg`** (1 nodes): `d6069f3e-36a4-48d0-8354-8af4470e9f97.jpeg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Database Config TypeScript`** (1 nodes): `database.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `E2ec06e2 9492 41b1 Bc4a Ee02cd5afdd6 Jpg`** (1 nodes): `e2ec06e2-9492-41b1-bc4a-ee02cd5afdd6.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Eb282b31 A8b5 4a18 9b7d 931be2372201 Jpg`** (1 nodes): `eb282b31-a8b5-4a18-9b7d-931be2372201.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `F602dd80 042d 4809 9f26 7aebee5e4ef6 Jpg`** (1 nodes): `f602dd80-042d-4809-9f26-7aebee5e4ef6.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does \`JwtAuthGuard\` connect \`Hoteles Hoteles Controller — ID\` to \`Destinos Destinos Controller\`, \`Fechas Salida Fechas Salida Controller\`, \`Common Roles Guard\`, \`Hoteles Hoteles Controller\`, \`Paquetes Paquetes Controller\`, \`Servicios Servicios Controller\`, \`Uploads Uploads Controller\`, \`Users Users Controller\`?**
  _High betweenness centrality \(24566.333\) - this node is a cross-community bridge._
- **Why does \`RolesGuard\` connect \`Common Roles Guard\` to \`Destinos Destinos Controller\`, \`Hoteles Hoteles Controller — ID\`, \`Fechas Salida Fechas Salida Controller\`, \`Hoteles Hoteles Controller\`, \`Paquetes Paquetes Controller\`, \`Servicios Servicios Controller\`, \`Users Users Controller\`?**
  _High betweenness centrality \(23251.333\) - this node is a cross-community bridge._
- **Why does \`HotelesController\` connect \`Hoteles Hoteles Controller\` to \`Hoteles Hoteles Service\`, \`Common Roles Guard\`, \`Hoteles Hoteles Controller — ID\`, \`Hoteles Hoteles Module\`?**
  _High betweenness centrality \(18034.000\) - this node is a cross-community bridge._
- **What connects \`.constructor\(\)\`, \`.getHello\(\)\`, \`GET /\` to the rest of the system?**
  _277 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should \`Fechas Salida Fechas Salida Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 26 entity nodes - this community may mix unrelated responsibilities._
- **Should \`Hoteles Hoteles Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 25 entity nodes - this community may mix unrelated responsibilities._
- **Should \`Users Users Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 24 entity nodes - this community may mix unrelated responsibilities._
