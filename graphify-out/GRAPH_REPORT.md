# Graph Report - /Users/mario-e-s-m/Documents/el-recuerdo  (2026-05-11)

## Corpus Check
- Large corpus: 327 files · ~56,579 words. Graph generation will take longer and produce larger artifacts. Consider running on a subfolder first, or targeting a smaller high-value slice of the repo.

## Summary
- 1008 nodes · 1402 edges · 223 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Structure Signals
- Entity graph basis: 791 non-file, non-concept node(s)
- Weakly connected components: 230
- Singleton components: 173
- Isolated nodes: 173
- Largest component: 324 node(s) (41% of the entity graph basis)
- Low-cohesion communities: 7
- Largest low-cohesion community: 26 node(s) (cohesion 0.08)

## Workspace Bridges
1. `Button\(\)` - connects `Frontend Admin Destinos Page`, `Frontend Admin Fechas Salida Page`, `Frontend Admin Fechas Salida Page — Open`, `Frontend Admin Hoteles Page`, `Frontend Admin Paquetes Page`, `Frontend Admin Servicios Page`, `Frontend Card`, `Frontend Carousel`, `Frontend Dialog`, `Frontend Hotel Detail Panel`; home: `Frontend Form`; degree 22; score 4851.61
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/calendar.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/carousel.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/dialog.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/auth/presentation/components/client/AdminDashboard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/auth/presentation/components/client/LoginForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/destinos/presentation/components/client/AdminDestinosPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/destinos/presentation/components/client/DestinoForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/AdminFechasSalidaPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/AdminHotelesPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelCard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelDetailPanel.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelFormModal.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/PeriodoForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/TarifaGrid.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/TipoHabitacionForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/paquetes/presentation/components/client/AdminPaquetesPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/paquetes/presentation/components/client/PaqueteForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/components/client/AdminServiciosPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/components/client/ServicioForm.tsx`
2. `JwtAuthGuard` - connects `Backend Destinos Controller`, `Backend Fechas Salida Controller`, `Backend Hoteles Controller`, `Backend Paquetes Controller`, `Backend Roles Guard`, `Backend Servicios Controller`, `Backend Uploads Controller`, `Backend Users Controller`; home: `Backend Hoteles Controller — ID`; degree 42; score 71069.09
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/jwt-auth.guard.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/destinos/destinos.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/paquetes/paquetes.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/servicios/servicios.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/uploads/uploads.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`
3. `RolesGuard` - connects `Backend Destinos Controller`, `Backend Fechas Salida Controller`, `Backend Hoteles Controller`, `Backend Hoteles Controller — ID`, `Backend Paquetes Controller`, `Backend Servicios Controller`, `Backend Users Controller`; home: `Backend Roles Guard`; degree 43; score 68113.09
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/roles.guard.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/destinos/destinos.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/hoteles/hoteles.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/paquetes/paquetes.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/servicios/servicios.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`
4. `UsersService` - connects `Backend Users Controller`, `Backend Users Module`, `Backend Users Service — All`, `Backend Users Service — Create`, `Backend Users Service — Delete`, `Backend Users Service — Find`, `Backend Users Service — Generate`; home: `Backend Users Service`; degree 16; score 11889
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/users/users.service.ts`
5. `FechasSalidaRepository` - connects `Backend Fechas Salida Module`, `Backend Fechas Salida Repository — Opcion`, `Backend Fechas Salida Repository — Transporte`, `Frontend Fechas Salida Repository — Create`, `Frontend Fechas Salida Repository — Create \(2\)`, `Frontend Fechas Salida Repository — Domain`; home: `Backend Fechas Salida Repository`; degree 24; score 114406.3
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.repository.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/data/repositories/fechas-salida.repository.ts`
6. `FechasSalidaController` - connects `Backend Fechas Salida Module`, `Backend Fechas Salida Service`, `Backend Hoteles Controller — ID`, `Backend Roles Guard`; home: `Backend Fechas Salida Controller`; degree 33; score 111296.51
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.controller.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.module.ts`, `/Users/mario-e-s-m/Documents/el-recuerdo/backend/src/fechas-salida/fechas-salida.service.ts`

## God Nodes
1. `RolesGuard` - 44 edges
2. `JwtAuthGuard` - 43 edges
3. `HotelesController` - 36 edges
4. `FechasSalidaController` - 34 edges
5. `UsersController` - 26 edges
6. `FechasSalidaRepository` - 25 edges
7. `Button\(\)` - 23 edges
8. `DestinosController` - 22 edges
9. `PaquetesController` - 22 edges
10. `HotelesService` - 20 edges

## Surprising Connections
- `POST /uploads/media` --uses\_guard--> `JwtAuthGuard`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/uploads/uploads.controller.ts → /Users/mario-e-s-m/Documents/el-recuerdo/backend/src/common/guards/jwt-auth.guard.ts  _bridges separate communities; peripheral node \`POST /uploads/media\` unexpectedly reaches hub \`JwtAuthGuard\`_
- `TestimonialsSection\(\)` --renders--> `VideoText\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/landing/testimonials-section.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/video-text.tsx  _bridges separate communities; peripheral node \`VideoText\(\)\` unexpectedly reaches hub \`TestimonialsSection\(\)\`_
- `DialogFooter\(\)` --renders--> `Button\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/dialog.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx  _bridges separate communities; peripheral node \`DialogFooter\(\)\` unexpectedly reaches hub \`Button\(\)\`_
- `FechaSalidaForm\(\)` --renders--> `Field\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/field.tsx  _bridges separate communities; peripheral node \`Field\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_
- `FechaSalidaForm\(\)` --renders--> `Popover\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/popover.tsx  _bridges separate communities; peripheral node \`Popover\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_

## Semantic Anomalies
- **[HIGH] Bridge node** - FechasSalidaRepository bridges Backend Fechas Salida Repository and Backend Fechas Salida Module, Frontend Fechas Salida Repository, Backend Fechas Salida Repository — Opcion, Backend Fechas Salida Repository — Transporte, Frontend Fechas Salida Repository — Create \(2\), Frontend Fechas Salida Repository — Domain, Frontend Fechas Salida Repository — Create.
  _High betweenness centrality \(114322.297\) across 8 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - JwtAuthGuard bridges Backend Hoteles Controller — ID and Backend Destinos Controller, Backend Fechas Salida Controller, Backend Roles Guard, Backend Hoteles Controller, Backend Paquetes Controller, Backend Servicios Controller, Backend Uploads Controller, Backend Users Controller.
  _High betweenness centrality \(70947.087\) across 9 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - FechasSalidaController bridges Backend Fechas Salida Controller and Backend Fechas Salida Service, Backend Hoteles Controller — ID, Backend Roles Guard, Backend Fechas Salida Module.
  _High betweenness centrality \(111223.507\) across 5 communities makes this node a likely dependency chokepoint._
- **[HIGH] Low-cohesion community** - Backend Fechas Salida Controller is weakly connected for its size.
  _Cohesion score 0.08 across 26 nodes suggests this community may mix unrelated responsibilities._
- **[HIGH] Low-cohesion community** - Backend Hoteles Controller is weakly connected for its size.
  _Cohesion score 0.08 across 25 nodes suggests this community may mix unrelated responsibilities._

## Communities

### Community 0 - "Frontend Admin Fechas Salida Page"
Cohesion (entity basis within full-graph community): 0.01
Nodes (33): cupoBadge\(\), formatCupo\(\), ModalState, Calendar\(\), CalendarDayButton\(\), CalendarGrid\(\), getEventsForDay\(\), CalendarGridProps (+25 more)

### Community 1 - "Frontend Form"
Cohesion (entity basis within full-graph community): 0.2
Nodes (27): Button\(\), Checkbox\(\), DestinoForm\(\), FechaSalidaForm\(\), parseDateString\(\), FormControl\(\), FormDescription\(\), FormField\(\) (+19 more)

### Community 2 - "Backend Fechas Salida Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (26): FechasSalidaController, .addOpcionHotel\(\), .addTransporte\(\), .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByPaquete\(\) (+18 more)

### Community 3 - "Backend Hoteles Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (25): HotelesController, .constructor\(\), .create\(\), .createPeriodo\(\), .createTarifa\(\), .createTipoHabitacion\(\), .deletePeriodo\(\), .deleteTarifa\(\) (+17 more)

### Community 4 - "Backend Users Controller"
Cohesion (entity basis within full-graph community): 0.08
Nodes (24): UsersController, .constructor\(\), .create\(\), .findActive\(\), .findAll\(\), .findByRole\(\), .findOne\(\), .getStats\(\) (+16 more)

### Community 5 - "Backend Destinos Controller"
Cohesion (entity basis within full-graph community): 0.1
Nodes (20): DestinosController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\), .findOne\(\) (+12 more)

### Community 6 - "Backend Paquetes Controller"
Cohesion (entity basis within full-graph community): 0.1
Nodes (20): PaquetesController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\), .findOne\(\) (+12 more)

### Community 7 - "Backend Servicios Controller"
Cohesion (entity basis within full-graph community): 0.11
Nodes (18): ServiciosController, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByTipo\(\), .findOne\(\), .restore\(\) (+10 more)

### Community 8 - "Backend Fechas Salida Repository"
Cohesion (entity basis within full-graph community): 0.13
Nodes (16): BaseRepository, FechasSalidaRepository, .delete\(\), .deleteOpcion\(\), .deleteOpcionHotel\(\), .deleteTransporte\(\), .findAll\(\), .findAllActive\(\) (+8 more)

### Community 9 - "Frontend Fechas Salida Types"
Cohesion (entity basis within full-graph community): 0
Nodes (12): CalendarFechaEvent, CreateFechaSalidaInput, CreateOpcionHotelInput, CreateTransporteAdicionalInput, DestinoInfo, FechaSalidaAdmin, FechaSalidaCalendario, getEstadoCupo\(\) (+4 more)

### Community 10 - "Backend Hoteles Service"
Cohesion (entity basis within full-graph community): 0.17
Nodes (12): HotelesService, .constructor\(\), .create\(\), .createTarifa\(\), .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\) (+4 more)

### Community 11 - "Frontend Card"
Cohesion (entity basis within full-graph community): 0.22
Nodes (11): AdminDashboard\(\), handleLogout\(\), Card\(\), CardAction\(\), CardContent\(\), CardDescription\(\), CardFooter\(\), CardHeader\(\) (+3 more)

### Community 12 - "Backend Fechas Salida Service"
Cohesion (entity basis within full-graph community): 0.18
Nodes (11): FechasSalidaService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByPaquete\(\), .findProximas\(\), .removeOpcionHotel\(\) (+3 more)

### Community 13 - "Backend Roles Guard"
Cohesion (entity basis within full-graph community): 0.18
Nodes (11): CanActivate, RolesGuard, .canActivate\(\), .constructor\(\), DELETE /fechas-salida/:id/transportes/:transporteId, PATCH /fechas-salida/:id/restore, POST /fechas-salida/:id/opciones-hotel, DELETE /hoteles/:hotelId/periodos/:periodoId/tarifas/:id (+3 more)

### Community 14 - "Frontend Dialog"
Cohesion (entity basis within full-graph community): 0.04
Nodes (10): Dialog\(\), DialogClose\(\), DialogContent\(\), DialogDescription\(\), DialogFooter\(\), DialogHeader\(\), DialogOverlay\(\), DialogPortal\(\) (+2 more)

### Community 15 - "Backend Hoteles Controller — ID"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): AuthGuard, JwtAuthGuard, DELETE /fechas-salida/:id/opciones-hotel/:opcionId, PATCH /fechas-salida/:id/opciones-hotel/:opcionId, POST /fechas-salida, DELETE /hoteles/:hotelId/periodos/:id, DELETE /hoteles/:hotelId/tipos-habitacion/:id, PATCH /hoteles/:hotelId/periodos/:periodoId/tarifas/:id (+2 more)

### Community 16 - "Backend Users Repository"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): BaseRepository, UsersRepository, .countActive\(\), .countAll\(\), .findActiveUsers\(\), .findAll\(\), .findByEmail\(\), .findByEmailWithPassword\(\) (+2 more)

### Community 17 - "Backend Hoteles Repository"
Cohesion (entity basis within full-graph community): 0.2
Nodes (10): BaseRepository, HotelesRepository, .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\), .findAllActive\(\), .findWithRelations\(\) (+2 more)

### Community 18 - "Frontend HTTP Client"
Cohesion (entity basis within full-graph community): 1
Nodes (1): getHttpClient\(\)

### Community 19 - "Frontend Field"
Cohesion (entity basis within full-graph community): 0
Nodes (8): Field\(\), FieldContent\(\), FieldDescription\(\), FieldError\(\), FieldGroup\(\), FieldLegend\(\), FieldSet\(\), FieldTitle\(\)

### Community 20 - "Frontend Hotel Repository"
Cohesion (entity basis within full-graph community): 0.22
Nodes (9): HotelRepository, .delete\(\), .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\), .findAllActive\(\), .updateTipoHabitacion\(\) (+1 more)

### Community 21 - "Frontend Hotel Repository — Create"
Cohesion (entity basis within full-graph community): 0.22
Nodes (9): .create\(\), .createPeriodo\(\), .createTarifa\(\), .createTipoHabitacion\(\), .findOne\(\), .update\(\), .updatePeriodo\(\), .updateTarifa\(\) (+1 more)

### Community 22 - "Frontend Admin Destinos Page"
Cohesion (entity basis within full-graph community): 0.27
Nodes (6): AdminDestinosPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\), useDestinos\(\), UseDestinosReturn

### Community 23 - "Backend Destinos Service"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): DestinosService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\)

### Community 24 - "Frontend Fechas Salida Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (7): CreateFechaSalidaDTO, DestinoInfoDTO, FechaSalidaDTO, OpcionHotelDTO, PaqueteResumenDTO, ServicioInfoDTO, TransporteAdicionalDTO

### Community 25 - "Backend Paquetes Repository"
Cohesion (entity basis within full-graph community): 0.25
Nodes (8): BaseRepository, IPaqueteRepository, PaquetesRepository, .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\), .findById\(\)

### Community 26 - "Backend Paquetes Service"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): PaquetesService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByDestino\(\)

### Community 27 - "Frontend Popover"
Cohesion (entity basis within full-graph community): 0
Nodes (7): Popover\(\), PopoverAnchor\(\), PopoverContent\(\), PopoverDescription\(\), PopoverHeader\(\), PopoverTitle\(\), PopoverTrigger\(\)

### Community 28 - "Frontend Carousel"
Cohesion (entity basis within full-graph community): 0.27
Nodes (6): Carousel\(\), CarouselContent\(\), CarouselItem\(\), CarouselNext\(\), CarouselPrevious\(\), useCarousel\(\)

### Community 29 - "Backend Destinos Repository"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): BaseRepository, DestinosRepository, .findAll\(\), .findAllActive\(\), .findAllDestacados\(\), .findByPais\(\), IDestinoRepository

### Community 30 - "Frontend HTTP Client — Client"
Cohesion (entity basis within full-graph community): 0.48
Nodes (7): HttpClient, .constructor\(\), .delete\(\), .get\(\), .patch\(\), .post\(\), .request\(\)

### Community 31 - "Backend Servicios Service"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): ServiciosService, .constructor\(\), .create\(\), .findAll\(\), .findAllActive\(\), .findByTipo\(\)

### Community 32 - "Backend Base Repository"
Cohesion (entity basis within full-graph community): 0.47
Nodes (6): BaseRepository, .find\(\), .findById\(\), .findOne\(\), .save\(\), IBaseRepository

### Community 33 - "Frontend Calendario Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): DestinoCalendario, FechaSalidaCalendario, getEstadoCupo\(\), PaqueteCalendario, ServicioCalendario

### Community 34 - "Backend Fechas Salida Service — Add"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): .addOpcionHotel\(\), .addTransporte\(\), .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 35 - "Frontend Hotel Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (5): HotelDTO, HotelResumenDTO, PeriodoHotelDTO, TarifaPeriodoDTO, TipoHabitacionDTO

### Community 36 - "Frontend Hotel Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): Hotel, HotelResumen, PeriodoHotel, TarifaPeriodo, TipoHabitacion

### Community 37 - "Backend Hoteles Service — Create"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): .createPeriodo\(\), .createTipoHabitacion\(\), .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 38 - "Frontend Paquete Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (5): CreatePaqueteDTO, DestinoResumenDTO, HotelResumenDTO, PaqueteDTO, ServicioResumenDTO

### Community 39 - "Frontend Paquete Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): CreatePaqueteInput, DestinoResumen, HotelResumen, Paquete, ServicioResumen

### Community 40 - "Backend Servicios Repository"
Cohesion (entity basis within full-graph community): 0.33
Nodes (6): BaseRepository, IServicioRepository, ServiciosRepository, .findAll\(\), .findAllActive\(\), .findByTipo\(\)

### Community 41 - "Backend Users Service"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): UsersService, .constructor\(\), .findActive\(\), .findByRole\(\), .getStats\(\)

### Community 42 - "Frontend Admin Fechas Salida Page — Open"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): AdminFechasSalidaPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\), formatDate\(\)

### Community 43 - "Backend App Controller"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AppController, .constructor\(\), .getHello\(\), GET /

### Community 44 - "Backend Auth Controller"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AuthController, .constructor\(\), .login\(\), POST /auth/login

### Community 45 - "Frontend Big Calendar"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): BigCalendar\(\), goToToday\(\), handleSelectDate\(\), nextMonth\(\), prevMonth\(\)

### Community 46 - "Backend Create User Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (4): CreateUserDto, UpdateUserDto, UserResponseDto, UserStatsDto

### Community 47 - "Frontend Hotel Detail Panel"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): HotelDetailPanel\(\), handleAddTarifa\(\), handlePeriodoSubmit\(\), handleRemoveTarifa\(\), handleTipoSubmit\(\)

### Community 48 - "Backend Jwt Strategy"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): JwtStrategy, .constructor\(\), .validate\(\), PassportStrategy

### Community 49 - "Frontend Media Uploader"
Cohesion (entity basis within full-graph community): 0.6
Nodes (5): MediaUploader\(\), handleChange\(\), handleDrop\(\), handleFiles\(\), handleRemove\(\)

### Community 50 - "Frontend Morphing Text"
Cohesion (entity basis within full-graph community): 0.33
Nodes (4): MorphingText\(\), MorphingTextProps, useMorphingText\(\), animate\(\)

### Community 51 - "Frontend Stats Section"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): StatPanel\(\), StatsSection\(\), useCountUp\(\), step\(\)

### Community 52 - "Frontend Admin Paquetes Page"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AdminPaquetesPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\)

### Community 53 - "Frontend Admin Servicios Page"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AdminServiciosPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\)

### Community 54 - "Frontend Auth Types"
Cohesion (entity basis within full-graph community): 0
Nodes (3): AuthUser, LoginCredentials, LoginResponse

### Community 55 - "Frontend Chat Widget"
Cohesion (entity basis within full-graph community): 0.67
Nodes (4): ChatWidget\(\), handleHashChange\(\), handleKeyDown\(\), handleSubmit\(\)

### Community 56 - "Frontend Cta Section"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): CtaSection\(\), HowItWorks\(\), Step

### Community 57 - "Frontend Destino Repository"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): DestinoRepository, .delete\(\), .findAll\(\), .update\(\)

### Community 58 - "Backend Destinos Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 59 - "Frontend Globe"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): Globe\(\), onResize\(\), updateMovement\(\), updatePointerInteraction\(\)

### Community 60 - "Frontend Layout"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): AdminLayout\(\), NavItem\(\), RootLayout\(\)

### Community 61 - "Frontend Page"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): CalendarioPage\(\), layout /, page /calendario

### Community 62 - "Frontend Page — Admin"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): DestinosPage\(\), layout /admin, page /admin/destinos

### Community 63 - "Frontend Paquete Repository"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): PaqueteRepository, .delete\(\), .findAll\(\), .findAllDestinos\(\)

### Community 64 - "Frontend Paquete Repository — Create"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .create\(\), .findOne\(\), .update\(\), toDomain\(\)

### Community 65 - "Backend Paquetes Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 66 - "Frontend Rainbow Button"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): ButtonHTMLAttributes, RainbowButtonProps, VariantProps

### Community 67 - "Frontend Servicio Repository"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): ServicioRepository, .delete\(\), .findAll\(\), .update\(\)

### Community 68 - "Backend Servicios Service — Delete"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): .findOne\(\), .restore\(\), .softDelete\(\), .update\(\)

### Community 69 - "Frontend Uploads API"
Cohesion (entity basis within full-graph community): 0
Nodes (3): mediaUrl\(\), uploadMedia\(\), UploadResult

### Community 70 - "Backend Uploads Controller"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): UploadsController, .uploadMedia\(\), POST /uploads/media

### Community 71 - "Frontend Use Fechas Salida"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): useFechasSalida\(\), create\(\), remove\(\), update\(\)

### Community 72 - "Frontend Admin Hoteles Page"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): AdminHotelesPage\(\), handleDelete\(\), handleSubmit\(\)

### Community 73 - "Backend App Service"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AppService, .getHello\(\)

### Community 74 - "Frontend Auth Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): AuthUserDTO, LoginResponseDTO

### Community 75 - "Backend Auth Service"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): AuthService, .constructor\(\), .login\(\)

### Community 76 - "Backend Base Repository — Delete"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .restore\(\), .softDelete\(\), .update\(\)

### Community 77 - "Frontend Border Beam"
Cohesion (entity basis within full-graph community): 0
Nodes (2): BorderBeam\(\), BorderBeamProps

### Community 78 - "Frontend Calendario Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (2): CalendarioRepository, .getActivas\(\)

### Community 79 - "Frontend Calendario Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): DestinoCalendarioDTO, FechaSalidaCalendarioDTO

### Community 80 - "Frontend Calendario Schemas — Calendario"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): infer, PaqueteCalendarioDTO, ServicioCalendarioDTO

### Community 81 - "Frontend Calendar Sidebar"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CalendarSidebar\(\), CalendarSidebarProps

### Community 82 - "Frontend Chat Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (2): ChatRepository, .sendMessage\(\)

### Community 83 - "Frontend Chat Schemas"
Cohesion (entity basis within full-graph community): 1
Nodes (2): infer, SendMessageDTO

### Community 84 - "Frontend Chat Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ChatMessage, Destination

### Community 85 - "Backend Create Destino Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateDestinoDto, UpdateDestinoDto

### Community 86 - "Backend Create Fecha Salida Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateFechaSalidaDto, UpdateFechaSalidaDto

### Community 87 - "Backend Create Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateHotelDto, UpdateHotelDto

### Community 88 - "Backend Create Opcion Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateOpcionHotelDto, UpdateOpcionHotelDto

### Community 89 - "Backend Create Paquete Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreatePaqueteDto, UpdatePaqueteDto

### Community 90 - "Backend Create Periodo Hotel Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreatePeriodoHotelDto, UpdatePeriodoHotelDto

### Community 91 - "Backend Create Servicio Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioDto, UpdateServicioDto

### Community 92 - "Backend Create Tarifa Periodo Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTarifaPeriodoDto, UpdateTarifaPeriodoDto

### Community 93 - "Backend Create Tipo Habitacion Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTipoHabitacionDto, UpdateTipoHabitacionDto

### Community 94 - "Backend Create Transporte Adicional Dto"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateTransporteAdicionalDto, UpdateTransporteAdicionalDto

### Community 95 - "Frontend Destinations Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): DestCard\(\), DestinationsSection\(\)

### Community 96 - "Backend Destino Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Destino

### Community 97 - "Frontend Destino Repository — Create"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .create\(\), .findOne\(\), toDomain\(\)

### Community 98 - "Backend Destino Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IDestinoRepository

### Community 99 - "Frontend Destino Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateDestinoInput, Destino

### Community 100 - "Frontend Event Card"
Cohesion (entity basis within full-graph community): 0
Nodes (2): EventCard\(\), EventCardProps

### Community 101 - "Backend Fecha Salida Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, FechaSalida

### Community 102 - "Backend Fecha Salida Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IFechaSalidaRepository

### Community 103 - "Frontend Fechas Salida Repository"
Cohesion (entity basis within full-graph community): 0
Nodes (2): toOpcionHotel\(\), toTransporte\(\)

### Community 104 - "Frontend Fechas Salida Repository — Create"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .createOpcionHotel\(\), .createTransporte\(\), findAddedItem\(\)

### Community 105 - "Frontend Fechas Salida Repository — Domain"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .update\(\), toDomain\(\), toPaqueteResumen\(\)

### Community 106 - "Frontend Separator"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FieldSeparator\(\), Separator\(\)

### Community 107 - "Backend Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Hotel

### Community 108 - "Frontend Hotel Repository — Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (1): toResumenDomain\(\)

### Community 109 - "Frontend Hotel Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IHotelRepository

### Community 110 - "Backend Hoteles Repository — Periodo"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findPeriodoById\(\), .savePeriodo\(\), .updatePeriodo\(\)

### Community 111 - "Backend Hoteles Repository — Tarifa"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findTarifaById\(\), .saveTarifa\(\), .updateTarifa\(\)

### Community 112 - "Frontend Marquee"
Cohesion (entity basis within full-graph community): 0
Nodes (2): Marquee\(\), MarqueeProps

### Community 113 - "Backend Opcion Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, OpcionHotel

### Community 114 - "Frontend Page — Admin \(2\)"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AdminPage\(\), page /admin

### Community 115 - "Frontend Page — Fechas"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FechasSalidaPage\(\), page /admin/fechas-salida

### Community 116 - "Frontend Page — Home"
Cohesion (entity basis within full-graph community): 1
Nodes (2): Home\(\), page /

### Community 117 - "Frontend Page — Hoteles"
Cohesion (entity basis within full-graph community): 1
Nodes (2): HotelesPage\(\), page /admin/hoteles

### Community 118 - "Frontend Page — Login"
Cohesion (entity basis within full-graph community): 1
Nodes (2): LoginPage\(\), page /login

### Community 119 - "Frontend Page — Paquetes"
Cohesion (entity basis within full-graph community): 1
Nodes (2): PaquetesPage\(\), page /admin/paquetes

### Community 120 - "Frontend Page — Servicios"
Cohesion (entity basis within full-graph community): 1
Nodes (2): ServiciosPage\(\), page /admin/servicios

### Community 121 - "Backend Paquete Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Paquete

### Community 122 - "Backend Paquete Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IPaqueteRepository

### Community 123 - "Backend Periodo Hotel Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, PeriodoHotel

### Community 124 - "Backend Servicio Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, Servicio

### Community 125 - "Backend Servicio Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (2): IBaseRepository, IServicioRepository

### Community 126 - "Frontend Servicio Repository — Create"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .create\(\), .findOne\(\), toDomain\(\)

### Community 127 - "Frontend Servicio Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioDTO, ServicioDTO

### Community 128 - "Frontend Servicio Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioInput, Servicio

### Community 129 - "Backend Tarifa Periodo Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TarifaPeriodo

### Community 130 - "Frontend Testimonials Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): TestimonialCard\(\), TestimonialsSection\(\)

### Community 131 - "Backend Tipo Habitacion Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TipoHabitacion

### Community 132 - "Backend Transporte Adicional Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, TransporteAdicional

### Community 133 - "Frontend Use Calendario"
Cohesion (entity basis within full-graph community): 0
Nodes (2): useCalendario\(\), UseCalendarioReturn

### Community 134 - "Frontend Use Chat"
Cohesion (entity basis within full-graph community): 0
Nodes (2): createMessage\(\), useChat\(\)

### Community 135 - "Frontend Use Chat Store"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ChatStore, generateSessionId\(\)

### Community 136 - "Frontend Use Paquetes"
Cohesion (entity basis within full-graph community): 0
Nodes (2): usePaquetes\(\), UsePaquetesReturn

### Community 137 - "Backend User Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (2): BaseEntity, User

### Community 138 - "Backend Users Service — Find"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .findOne\(\), .restore\(\), .update\(\)

### Community 139 - "Frontend Use Servicios"
Cohesion (entity basis within full-graph community): 0
Nodes (2): useServicios\(\), UseServiciosReturn

### Community 140 - "Frontend Admin Destinos Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 141 - "Frontend Admin Fechas Salida Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 142 - "Frontend Admin Paquetes Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 143 - "Frontend Admin Servicios Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 144 - "Frontend Animated Beam"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AnimatedBeamProps

### Community 145 - "Frontend Animated Beam — Animated"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AnimatedBeam\(\), updatePath\(\)

### Community 146 - "Backend App Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): wait\(\)

### Community 147 - "Backend App Module — App"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AppModule, .bootstrap\(\)

### Community 148 - "Frontend Aurora Text"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuroraText\(\)

### Community 149 - "Backend Auth Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuthModule

### Community 150 - "Frontend Auth Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (1): toDomain\(\)

### Community 151 - "Frontend Auth Repository — Auth"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AuthRepository, .login\(\)

### Community 152 - "Backend Auth Service — Auth"
Cohesion (entity basis within full-graph community): 1
Nodes (1): LoginResponse

### Community 153 - "Frontend Auth Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuthPageSkeleton\(\)

### Community 154 - "Backend Base Entity"
Cohesion (entity basis within full-graph community): 1
Nodes (1): BaseEntity

### Community 155 - "Backend Base Repository — Count"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .count\(\), .exists\(\)

### Community 156 - "Backend Base Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): IBaseRepository

### Community 157 - "Frontend Calendario Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): CalendarioSkeleton\(\)

### Community 158 - "Frontend Chat API"
Cohesion (entity basis within full-graph community): 1
Nodes (1): extractTextFromResponse\(\)

### Community 159 - "Frontend Chat Widget Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ChatWidgetSkeleton\(\)

### Community 160 - "Backend Destino Repository"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 161 - "Frontend Destino Schemas"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinoDTO

### Community 162 - "Backend Destinos Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinosModule

### Community 163 - "Frontend Destinos Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinosPageSkeleton\(\)

### Community 164 - "Backend Fechas Salida Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): FechasSalidaModule

### Community 165 - "Frontend Fechas Salida Repository — Create \(2\)"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .create\(\), toCreateDTO\(\)

### Community 166 - "Backend Fechas Salida Repository — Opcion"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findOpcionById\(\), .updateOpcion\(\)

### Community 167 - "Backend Fechas Salida Repository — Transporte"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findTransporteById\(\), .updateTransporte\(\)

### Community 168 - "Frontend Fechas Salida Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): IFechasSalidaRepository

### Community 169 - "Frontend Field — Label"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FieldLabel\(\), Label\(\)

### Community 170 - "Frontend Footer"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Footer\(\)

### Community 171 - "Frontend Globe — Globe"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 172 - "Frontend Hero Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): HeroSection\(\), handleMouseMove\(\)

### Community 173 - "Backend Hoteles Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesModule

### Community 174 - "Backend Hoteles Repository — Habitacion"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findTipoHabitacionById\(\), .updateTipoHabitacion\(\)

### Community 175 - "Frontend Hoteles Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesPageSkeleton\(\)

### Community 176 - "Backend Jwt Payload Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): JwtPayload

### Community 177 - "Backend Login Dto"
Cohesion (entity basis within full-graph community): 1
Nodes (1): LoginDto

### Community 178 - "Backend Bootstrap"
Cohesion (entity basis within full-graph community): 1
Nodes (1): bootstrap\(\)

### Community 179 - "Frontend Media Uploader — Media"
Cohesion (entity basis within full-graph community): 1
Nodes (2): isVideo\(\), MediaThumb\(\)

### Community 180 - "Frontend Meteors"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Meteors\(\)

### Community 181 - "Frontend Navbar"
Cohesion (entity basis within full-graph community): 1
Nodes (2): Navbar\(\), handleScroll\(\)

### Community 182 - "Frontend Next"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 183 - "Backend Paquete Repository"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 184 - "Backend Paquetes Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): PaquetesModule

### Community 185 - "Frontend Paquetes Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): PaquetesPageSkeleton\(\)

### Community 186 - "Backend Roles Decorator"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Roles\(\)

### Community 187 - "Backend Seed"
Cohesion (entity basis within full-graph community): 1
Nodes (1): runSeed\(\)

### Community 188 - "Backend Servicio Repository"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 189 - "Backend Servicios Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ServiciosModule

### Community 190 - "Frontend Servicios Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ServiciosPageSkeleton\(\)

### Community 191 - "Backend Uploads Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): UploadsModule

### Community 192 - "Frontend Use Hoteles Store"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesUIState

### Community 193 - "Backend Users Module"
Cohesion (entity basis within full-graph community): 1
Nodes (1): UsersModule

### Community 194 - "Backend Users Service — Create"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .create\(\), .findByEmail\(\)

### Community 195 - "Backend Users Service — All"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .findAll\(\), .search\(\)

### Community 196 - "Backend Users Service — Generate"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .generateUUID\(\), s4\(\)

### Community 197 - "Backend Users Service — Delete"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .remove\(\), .softDelete\(\)

### Community 198 - "Frontend Video Text"
Cohesion (entity basis within full-graph community): 1
Nodes (1): VideoText\(\)

### Community 199 - "03741069 3208 4c37 9433 E58470cc6a15 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 200 - "30a77df1 20d3 4f83 8441 9e2443cc82da Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 201 - "5bef35ab 6fbd 4741 Bb38 6a97d7bde3d4 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 202 - "615b711b 661f 4454 8260 0c9b621da9b5 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 203 - "B380c437 Bcc4 419d B4db 8b25582d4580 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 204 - "Bab8ce22 Cb2f 4d4c 90ee A523934e08bf Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 205 - "Base Repository TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 206 - "Chat Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 207 - "D6069f3e 36a4 48d0 8354 8af4470e9f97 Jpeg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 208 - "Database Config TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 209 - "Destino Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 210 - "E2ec06e2 9492 41b1 Bc4a Ee02cd5afdd6 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 211 - "Eb282b31 A8b5 4a18 9b7d 931be2372201 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 212 - "F602dd80 042d 4809 9f26 7aebee5e4ef6 Jpg"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 213 - "Fecha Salida Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 214 - "File SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 215 - "Fix Frontend Js"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 216 - "Hotel Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 217 - "Login Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 218 - "Next Env D TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 219 - "Paquete Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 220 - "Servicio Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 221 - "Vercel SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 222 - "Window SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

## Knowledge Gaps
- **551 weakly connected node(s):** `.constructor\(\)`, `.getHello\(\)`, `GET /`, `wait\(\)`, `.getHello\(\)` (+546 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Frontend Admin Destinos Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Admin Fechas Salida Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Admin Paquetes Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Admin Servicios Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Animated Beam`** (2 nodes): `animated-beam.tsx`, `AnimatedBeamProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Animated Beam — Animated`** (2 nodes): `AnimatedBeam\(\)`, `updatePath\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend App Module`** (2 nodes): `app.module.ts`, `wait\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend App Module — App`** (2 nodes): `AppModule`, `.bootstrap\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Aurora Text`** (2 nodes): `aurora-text.tsx`, `AuroraText\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Auth Module`** (2 nodes): `auth.module.ts`, `AuthModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Auth Repository`** (2 nodes): `auth.repository.ts`, `toDomain\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Auth Repository — Auth`** (2 nodes): `AuthRepository`, `.login\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Auth Service — Auth`** (2 nodes): `auth.service.ts`, `LoginResponse`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Auth Page Skeleton`** (2 nodes): `AuthPageSkeleton.tsx`, `AuthPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Base Entity`** (2 nodes): `base.entity.ts`, `BaseEntity`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Base Repository — Count`** (2 nodes): `.count\(\)`, `.exists\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Base Repository Interface`** (2 nodes): `base-repository.interface.ts`, `IBaseRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Calendario Skeleton`** (2 nodes): `CalendarioSkeleton.tsx`, `CalendarioSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Chat API`** (2 nodes): `chat.api.ts`, `extractTextFromResponse\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Chat Widget Skeleton`** (2 nodes): `ChatWidgetSkeleton.tsx`, `ChatWidgetSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Destino Repository`** (2 nodes): `destino.repository.ts`, `destinos.repository.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Destino Schemas`** (2 nodes): `destino.schemas.ts`, `DestinoDTO`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Destinos Module`** (2 nodes): `destinos.module.ts`, `DestinosModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Destinos Page Skeleton`** (2 nodes): `DestinosPageSkeleton.tsx`, `DestinosPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Fechas Salida Module`** (2 nodes): `fechas-salida.module.ts`, `FechasSalidaModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Fechas Salida Repository — Create \(2\)`** (2 nodes): `.create\(\)`, `toCreateDTO\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Fechas Salida Repository — Opcion`** (2 nodes): `.findOpcionById\(\)`, `.updateOpcion\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Fechas Salida Repository — Transporte`** (2 nodes): `.findTransporteById\(\)`, `.updateTransporte\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Fechas Salida Repository Interface`** (2 nodes): `fechas-salida.repository.interface.ts`, `IFechasSalidaRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Field — Label`** (2 nodes): `FieldLabel\(\)`, `Label\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Footer`** (2 nodes): `footer.tsx`, `Footer\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Globe — Globe`** (2 nodes): `globe.svg`, `hero-section.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Hero Section`** (2 nodes): `HeroSection\(\)`, `handleMouseMove\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Hoteles Module`** (2 nodes): `hoteles.module.ts`, `HotelesModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Hoteles Repository — Habitacion`** (2 nodes): `.findTipoHabitacionById\(\)`, `.updateTipoHabitacion\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Hoteles Page Skeleton`** (2 nodes): `HotelesPageSkeleton.tsx`, `HotelesPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Jwt Payload Interface`** (2 nodes): `jwt-payload.interface.ts`, `JwtPayload`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Login Dto`** (2 nodes): `login.dto.ts`, `LoginDto`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Bootstrap`** (2 nodes): `main.ts`, `bootstrap\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Media Uploader — Media`** (2 nodes): `isVideo\(\)`, `MediaThumb\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Meteors`** (2 nodes): `meteors.tsx`, `Meteors\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Navbar`** (2 nodes): `Navbar\(\)`, `handleScroll\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Next`** (2 nodes): `next.svg`, `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Paquete Repository`** (2 nodes): `paquete.repository.ts`, `paquetes.repository.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Paquetes Module`** (2 nodes): `paquetes.module.ts`, `PaquetesModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Paquetes Page Skeleton`** (2 nodes): `PaquetesPageSkeleton.tsx`, `PaquetesPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Roles Decorator`** (2 nodes): `roles.decorator.ts`, `Roles\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Seed`** (2 nodes): `seed.ts`, `runSeed\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Servicio Repository`** (2 nodes): `servicio.repository.ts`, `servicios.repository.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Servicios Module`** (2 nodes): `servicios.module.ts`, `ServiciosModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Servicios Page Skeleton`** (2 nodes): `ServiciosPageSkeleton.tsx`, `ServiciosPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Uploads Module`** (2 nodes): `uploads.module.ts`, `UploadsModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Use Hoteles Store`** (2 nodes): `useHotelesStore.ts`, `HotelesUIState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Users Module`** (2 nodes): `users.module.ts`, `UsersModule`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Users Service — Create`** (2 nodes): `.create\(\)`, `.findByEmail\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Users Service — All`** (2 nodes): `.findAll\(\)`, `.search\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Users Service — Generate`** (2 nodes): `.generateUUID\(\)`, `s4\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Users Service — Delete`** (2 nodes): `.remove\(\)`, `.softDelete\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Video Text`** (2 nodes): `video-text.tsx`, `VideoText\(\)`
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
- **Thin community `Chat Form Schema TypeScript`** (1 nodes): `chat-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `D6069f3e 36a4 48d0 8354 8af4470e9f97 Jpeg`** (1 nodes): `d6069f3e-36a4-48d0-8354-8af4470e9f97.jpeg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Database Config TypeScript`** (1 nodes): `database.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Destino Form Schema TypeScript`** (1 nodes): `destino-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `E2ec06e2 9492 41b1 Bc4a Ee02cd5afdd6 Jpg`** (1 nodes): `e2ec06e2-9492-41b1-bc4a-ee02cd5afdd6.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Eb282b31 A8b5 4a18 9b7d 931be2372201 Jpg`** (1 nodes): `eb282b31-a8b5-4a18-9b7d-931be2372201.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `F602dd80 042d 4809 9f26 7aebee5e4ef6 Jpg`** (1 nodes): `f602dd80-042d-4809-9f26-7aebee5e4ef6.jpg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fecha Salida Form Schema TypeScript`** (1 nodes): `fecha-salida-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File SVG`** (1 nodes): `file.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fix Frontend Js`** (1 nodes): `fix\_frontend.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hotel Form Schema TypeScript`** (1 nodes): `hotel-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Login Form Schema TypeScript`** (1 nodes): `login-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next Env D TypeScript`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Paquete Form Schema TypeScript`** (1 nodes): `paquete-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Servicio Form Schema TypeScript`** (1 nodes): `servicio-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vercel SVG`** (1 nodes): `vercel.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Window SVG`** (1 nodes): `window.svg`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does \`FechasSalidaRepository\` connect \`Backend Fechas Salida Repository\` to \`Backend Fechas Salida Module\`, \`Frontend Fechas Salida Repository\`, \`Backend Fechas Salida Repository — Opcion\`, \`Backend Fechas Salida Repository — Transporte\`, \`Frontend Fechas Salida Repository — Create \(2\)\`, \`Frontend Fechas Salida Repository — Domain\`, \`Frontend Fechas Salida Repository — Create\`?**
  _High betweenness centrality \(114322.297\) - this node is a cross-community bridge._
- **Why does \`FechasSalidaController\` connect \`Backend Fechas Salida Controller\` to \`Backend Fechas Salida Service\`, \`Backend Hoteles Controller — ID\`, \`Backend Roles Guard\`, \`Backend Fechas Salida Module\`?**
  _High betweenness centrality \(111223.507\) - this node is a cross-community bridge._
- **Why does \`FechasSalidaModule\` connect \`Backend Fechas Salida Module\` to \`Backend Fechas Salida Controller\`, \`Backend Fechas Salida Service\`, \`Backend Fechas Salida Repository\`?**
  _High betweenness centrality \(106172.990\) - this node is a cross-community bridge._
- **What connects \`.constructor\(\)\`, \`.getHello\(\)\`, \`GET /\` to the rest of the system?**
  _551 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should \`Backend Fechas Salida Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 26 entity nodes - this community may mix unrelated responsibilities._
- **Should \`Backend Hoteles Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 25 entity nodes - this community may mix unrelated responsibilities._
- **Should \`Backend Users Controller\` be split into smaller, more focused modules?**
  _Cohesion score 0.08 across 24 entity nodes - this community may mix unrelated responsibilities._
