# Graph Report - /Users/mario-e-s-m/Documents/el-recuerdo/frontend  (2026-05-11)

## Corpus Check
- Corpus is ~39,082 words - fits in a single context window. You may not need a graph.

## Summary
- 524 nodes · 834 edges · 128 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Structure Signals
- Entity graph basis: 387 non-file, non-concept node(s)
- Weakly connected components: 180
- Singleton components: 142
- Isolated nodes: 142
- Largest component: 93 node(s) (24% of the entity graph basis)
- Low-cohesion communities: 0
- Largest low-cohesion community: none on the entity graph basis

## Workspace Bridges
1. `Button\(\)` - connects `Components Calendar`, `Components Card`, `Components Carousel`, `Components Dialog`, `Features Admin Destinos Page`, `Features Admin Fechas Salida Page — Open`, `Features Admin Hoteles Page`, `Features Admin Paquetes Page`, `Features Admin Servicios Page`, `Features Hotel Card`, `Features Hotel Detail Panel`; home: `Features Form`; degree 22; score 4861.61
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/calendar.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/carousel.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/dialog.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/auth/presentation/components/client/AdminDashboard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/auth/presentation/components/client/LoginForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/destinos/presentation/components/client/AdminDestinosPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/destinos/presentation/components/client/DestinoForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/AdminFechasSalidaPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/AdminHotelesPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelCard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelDetailPanel.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelFormModal.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/PeriodoForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/TarifaGrid.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/TipoHabitacionForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/paquetes/presentation/components/client/AdminPaquetesPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/paquetes/presentation/components/client/PaqueteForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/components/client/AdminServiciosPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/components/client/ServicioForm.tsx`
2. `FechaSalidaForm\(\)` - connects `Components Calendar`, `Components Field`, `Components Field — Label`, `Components Popover`; home: `Features Form`; degree 15; score 1568.46
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/calendar.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/checkbox.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/field.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/form.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/input.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/popover.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx`
3. `Calendar\(\)` - connects `Features Event Card`, `Features Form`, `Features Hotel Card`, `Features Hotel Detail Panel`; home: `Components Calendar`; degree 5; score 239.47
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/calendar.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/calendario/presentation/components/client/EventCard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelCard.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/hoteles/presentation/components/client/HotelDetailPanel.tsx`
4. `FechasSalidaRepository` - connects `Features Fechas Salida Repository — Create`, `Features Fechas Salida Repository — Create \(2\)`, `Features Fechas Salida Repository — Domain`; home: `Features Fechas Salida Repository`; degree 10; score 2898.06
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/data/repositories/fechas-salida.repository.ts`
5. `AdminFechasSalidaPage\(\)` - connects `Features Admin Fechas Salida Page — Close`, `Features Form`, `Features Use Fechas Salida`; home: `Features Admin Fechas Salida Page — Open`; degree 8; score 2249.95
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/AdminFechasSalidaPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/hooks/useFechasSalida.ts`
6. `AdminServiciosPage\(\)` - connects `Features Admin Servicios Page — Close`, `Features Form`, `Features Use Servicios`; home: `Features Admin Servicios Page`; degree 7; score 2037.74
  source files: `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/components/client/AdminServiciosPage.tsx`, `/Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/servicios/presentation/hooks/useServicios.ts`

## God Nodes
1. `Button\(\)` - 23 edges
2. `FechaSalidaForm\(\)` - 17 edges
3. `HotelRepository` - 17 edges
4. `LoginForm\(\)` - 12 edges
5. `DestinoForm\(\)` - 11 edges
6. `FechasSalidaRepository` - 11 edges
7. `HotelFormModal\(\)` - 11 edges
8. `PaqueteForm\(\)` - 11 edges
9. `ServicioForm\(\)` - 11 edges
10. `FormControl\(\)` - 10 edges

## Surprising Connections
- `TestimonialsSection\(\)` --renders--> `VideoText\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/landing/testimonials-section.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/video-text.tsx  _bridges separate communities; peripheral node \`VideoText\(\)\` unexpectedly reaches hub \`TestimonialsSection\(\)\`_
- `DialogFooter\(\)` --renders--> `Button\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/dialog.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/button.tsx  _bridges separate communities; peripheral node \`DialogFooter\(\)\` unexpectedly reaches hub \`Button\(\)\`_
- `FechaSalidaForm\(\)` --renders--> `Field\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/field.tsx  _bridges separate communities; peripheral node \`Field\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_
- `FechaSalidaForm\(\)` --renders--> `Popover\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/popover.tsx  _bridges separate communities; peripheral node \`Popover\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_
- `FechaSalidaForm\(\)` --renders--> `PopoverTrigger\(\)`  [EXTRACTED]
  /Users/mario-e-s-m/Documents/el-recuerdo/frontend/features/fechas-salida/presentation/components/client/FechaSalidaForm.tsx → /Users/mario-e-s-m/Documents/el-recuerdo/frontend/components/ui/popover.tsx  _bridges separate communities; peripheral node \`PopoverTrigger\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_

## Semantic Anomalies
- **[HIGH] Bridge node** - Button\(\) bridges Features Form and Features Admin Fechas Salida Page, Components Calendar, Components Carousel, Components Dialog, Components Card, Features Admin Destinos Page, Features Admin Fechas Salida Page — Open, Features Admin Hoteles Page, Features Hotel Card, Features Hotel Detail Panel, Features Admin Paquetes Page, Features Admin Servicios Page.
  _High betweenness centrality \(4729.607\) across 13 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - FechasSalidaRepository bridges Features Fechas Salida Repository and Features Fechas Salida Repository — Fechas, Features Fechas Salida Repository — Create \(2\), Features Fechas Salida Repository — Domain, Features Fechas Salida Repository — Create.
  _High betweenness centrality \(2858.062\) across 5 communities makes this node a likely dependency chokepoint._
- **[HIGH] Bridge node** - HotelRepository bridges Features Hotel Repository and Features Hotel Repository — Domain, Features Hotel Repository — Create.
  _High betweenness centrality \(4352.500\) across 3 communities makes this node a likely dependency chokepoint._
- **[HIGH] Cross-boundary edge** - DialogFooter\(\) → Button\(\) crosses graph boundaries in an unexpected way.
  _bridges separate communities; peripheral node \`DialogFooter\(\)\` unexpectedly reaches hub \`Button\(\)\`_
- **[HIGH] Cross-boundary edge** - FechaSalidaForm\(\) → Field\(\) crosses graph boundaries in an unexpected way.
  _bridges separate communities; peripheral node \`Field\(\)\` unexpectedly reaches hub \`FechaSalidaForm\(\)\`_

## Communities

### Community 0 - "Features Admin Fechas Salida Page"
Cohesion (entity basis within full-graph community): 0.01
Nodes (19): cupoBadge\(\), formatCupo\(\), ModalState, CalendarGridProps, DestinationPickerProps, DestinoFormProps, FechaSalidaFormProps, formatDateToString\(\) (+11 more)

### Community 1 - "Features Form"
Cohesion (entity basis within full-graph community): 0.2
Nodes (27): Button\(\), Checkbox\(\), DestinoForm\(\), FechaSalidaForm\(\), parseDateString\(\), FormControl\(\), FormDescription\(\), FormField\(\) (+19 more)

### Community 2 - "Features Fechas Salida Types"
Cohesion (entity basis within full-graph community): 0
Nodes (12): CalendarFechaEvent, CreateFechaSalidaInput, CreateOpcionHotelInput, CreateTransporteAdicionalInput, DestinoInfo, FechaSalidaAdmin, FechaSalidaCalendario, getEstadoCupo\(\) (+4 more)

### Community 3 - "Components Card"
Cohesion (entity basis within full-graph community): 0.22
Nodes (11): AdminDashboard\(\), handleLogout\(\), Card\(\), CardAction\(\), CardContent\(\), CardDescription\(\), CardFooter\(\), CardHeader\(\) (+3 more)

### Community 4 - "Components Dialog"
Cohesion (entity basis within full-graph community): 0.04
Nodes (10): Dialog\(\), DialogClose\(\), DialogContent\(\), DialogDescription\(\), DialogFooter\(\), DialogHeader\(\), DialogOverlay\(\), DialogPortal\(\) (+2 more)

### Community 5 - "Features HTTP Client"
Cohesion (entity basis within full-graph community): 1
Nodes (1): getHttpClient\(\)

### Community 6 - "Components Field"
Cohesion (entity basis within full-graph community): 0
Nodes (8): Field\(\), FieldContent\(\), FieldDescription\(\), FieldError\(\), FieldGroup\(\), FieldLegend\(\), FieldSet\(\), FieldTitle\(\)

### Community 7 - "Features Hotel Repository"
Cohesion (entity basis within full-graph community): 0.22
Nodes (9): HotelRepository, .delete\(\), .deletePeriodo\(\), .deleteTarifa\(\), .deleteTipoHabitacion\(\), .findAll\(\), .findAllActive\(\), .updateTipoHabitacion\(\) (+1 more)

### Community 8 - "Features Hotel Repository — Create"
Cohesion (entity basis within full-graph community): 0.22
Nodes (9): .create\(\), .createPeriodo\(\), .createTarifa\(\), .createTipoHabitacion\(\), .findOne\(\), .update\(\), .updatePeriodo\(\), .updateTarifa\(\) (+1 more)

### Community 9 - "Features Admin Destinos Page"
Cohesion (entity basis within full-graph community): 0.27
Nodes (6): AdminDestinosPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\), useDestinos\(\), UseDestinosReturn

### Community 10 - "Features Fechas Salida Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (7): CreateFechaSalidaDTO, DestinoInfoDTO, FechaSalidaDTO, OpcionHotelDTO, PaqueteResumenDTO, ServicioInfoDTO, TransporteAdicionalDTO

### Community 11 - "Components Popover"
Cohesion (entity basis within full-graph community): 0
Nodes (7): Popover\(\), PopoverAnchor\(\), PopoverContent\(\), PopoverDescription\(\), PopoverHeader\(\), PopoverTitle\(\), PopoverTrigger\(\)

### Community 12 - "Components Carousel"
Cohesion (entity basis within full-graph community): 0.27
Nodes (6): Carousel\(\), CarouselContent\(\), CarouselItem\(\), CarouselNext\(\), CarouselPrevious\(\), useCarousel\(\)

### Community 13 - "Features Fechas Salida Repository"
Cohesion (entity basis within full-graph community): 0.29
Nodes (7): FechasSalidaRepository, .delete\(\), .deleteOpcionHotel\(\), .deleteTransporte\(\), .findAll\(\), .getPaquetes\(\), IFechasSalidaRepository

### Community 14 - "Lib HTTP Client"
Cohesion (entity basis within full-graph community): 0.48
Nodes (7): HttpClient, .constructor\(\), .delete\(\), .get\(\), .patch\(\), .post\(\), .request\(\)

### Community 15 - "Features Calendario Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): DestinoCalendario, FechaSalidaCalendario, getEstadoCupo\(\), PaqueteCalendario, ServicioCalendario

### Community 16 - "Features Hotel Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (5): HotelDTO, HotelResumenDTO, PeriodoHotelDTO, TarifaPeriodoDTO, TipoHabitacionDTO

### Community 17 - "Features Hotel Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): Hotel, HotelResumen, PeriodoHotel, TarifaPeriodo, TipoHabitacion

### Community 18 - "Features Paquete Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (5): CreatePaqueteDTO, DestinoResumenDTO, HotelResumenDTO, PaqueteDTO, ServicioResumenDTO

### Community 19 - "Features Paquete Types"
Cohesion (entity basis within full-graph community): 0
Nodes (5): CreatePaqueteInput, DestinoResumen, HotelResumen, Paquete, ServicioResumen

### Community 20 - "Features Admin Fechas Salida Page — Open"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): AdminFechasSalidaPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\), formatDate\(\)

### Community 21 - "Features Big Calendar"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): BigCalendar\(\), goToToday\(\), handleSelectDate\(\), nextMonth\(\), prevMonth\(\)

### Community 22 - "Features Hotel Detail Panel"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): HotelDetailPanel\(\), handleAddTarifa\(\), handlePeriodoSubmit\(\), handleRemoveTarifa\(\), handleTipoSubmit\(\)

### Community 23 - "Features Media Uploader"
Cohesion (entity basis within full-graph community): 0.6
Nodes (5): MediaUploader\(\), handleChange\(\), handleDrop\(\), handleFiles\(\), handleRemove\(\)

### Community 24 - "Components Morphing Text"
Cohesion (entity basis within full-graph community): 0.33
Nodes (4): MorphingText\(\), MorphingTextProps, useMorphingText\(\), animate\(\)

### Community 25 - "Features Paquete Repository"
Cohesion (entity basis within full-graph community): 0.4
Nodes (5): PaqueteRepository, .delete\(\), .findAll\(\), .findAllDestinos\(\), .findOne\(\)

### Community 26 - "Components Stats Section"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): StatPanel\(\), StatsSection\(\), useCountUp\(\), step\(\)

### Community 27 - "Features Hotel Card"
Cohesion (entity basis within full-graph community): 0
Nodes (2): HotelCard\(\), HotelCardProps

### Community 28 - "Features Admin Hoteles Page"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AdminHotelesPage\(\), handleDelete\(\), handleSubmit\(\), useHoteles\(\)

### Community 29 - "Features Use Paquetes"
Cohesion (entity basis within full-graph community): 0
Nodes (2): usePaquetes\(\), UsePaquetesReturn

### Community 30 - "Features Admin Paquetes Page"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AdminPaquetesPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\)

### Community 31 - "Features Admin Servicios Page"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): AdminServiciosPage\(\), handleDelete\(\), openCreate\(\), openEdit\(\)

### Community 32 - "Features Auth Types"
Cohesion (entity basis within full-graph community): 0
Nodes (3): AuthUser, LoginCredentials, LoginResponse

### Community 33 - "Features Chat Bubble"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ChatBubble\(\), ChatBubbleProps

### Community 34 - "Features Chat Widget"
Cohesion (entity basis within full-graph community): 0.67
Nodes (4): ChatWidget\(\), handleHashChange\(\), handleKeyDown\(\), handleSubmit\(\)

### Community 35 - "Components Cta Section"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): CtaSection\(\), HowItWorks\(\), Step

### Community 36 - "Features Destino Repository"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .create\(\), .update\(\), toDomain\(\)

### Community 37 - "Features Destino Repository — Find"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): DestinoRepository, .delete\(\), .findAll\(\), .findOne\(\)

### Community 38 - "Components Globe"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): Globe\(\), onResize\(\), updateMovement\(\), updatePointerInteraction\(\)

### Community 39 - "App Layout"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): AdminLayout\(\), NavItem\(\), RootLayout\(\)

### Community 40 - "App Page"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): CalendarioPage\(\), layout /, page /calendario

### Community 41 - "App Page — Admin"
Cohesion (entity basis within full-graph community): 0.33
Nodes (3): DestinosPage\(\), layout /admin, page /admin/destinos

### Community 42 - "Features Paquete Repository — Create"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .create\(\), .update\(\), toDomain\(\)

### Community 43 - "Components Rainbow Button"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): ButtonHTMLAttributes, RainbowButtonProps, VariantProps

### Community 44 - "Features Servicio Repository"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .create\(\), .update\(\), toDomain\(\)

### Community 45 - "Features Servicio Repository — Find"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): ServicioRepository, .delete\(\), .findAll\(\), .findOne\(\)

### Community 46 - "Features Uploads API"
Cohesion (entity basis within full-graph community): 0
Nodes (3): mediaUrl\(\), uploadMedia\(\), UploadResult

### Community 47 - "Features Use Fechas Salida"
Cohesion (entity basis within full-graph community): 0.5
Nodes (4): useFechasSalida\(\), create\(\), remove\(\), update\(\)

### Community 48 - "Features Auth Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): AuthUserDTO, LoginResponseDTO

### Community 49 - "Features Calendar Legend"
Cohesion (entity basis within full-graph community): 1
Nodes (1): CalendarLegend\(\)

### Community 50 - "Registry Border Beam"
Cohesion (entity basis within full-graph community): 0
Nodes (2): BorderBeam\(\), BorderBeamProps

### Community 51 - "Features Calendario Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (2): CalendarioRepository, .getActivas\(\)

### Community 52 - "Features Calendario Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): DestinoCalendarioDTO, FechaSalidaCalendarioDTO

### Community 53 - "Features Calendario Schemas — Calendario"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): infer, PaqueteCalendarioDTO, ServicioCalendarioDTO

### Community 54 - "Features Calendar Sidebar"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CalendarSidebar\(\), CalendarSidebarProps

### Community 55 - "Features Chat Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (2): ChatRepository, .sendMessage\(\)

### Community 56 - "Features Chat Schemas"
Cohesion (entity basis within full-graph community): 1
Nodes (2): infer, SendMessageDTO

### Community 57 - "Features Chat Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ChatMessage, Destination

### Community 58 - "Components Destinations Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): DestCard\(\), DestinationsSection\(\)

### Community 59 - "Features Destino Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateDestinoInput, Destino

### Community 60 - "Features Event Card"
Cohesion (entity basis within full-graph community): 0
Nodes (2): EventCard\(\), EventCardProps

### Community 61 - "Features Fechas Salida Repository — Fechas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): toOpcionHotel\(\), toTransporte\(\)

### Community 62 - "Features Fechas Salida Repository — Create"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .createOpcionHotel\(\), .createTransporte\(\), findAddedItem\(\)

### Community 63 - "Features Fechas Salida Repository — Domain"
Cohesion (entity basis within full-graph community): 0.67
Nodes (3): .update\(\), toDomain\(\), toPaqueteResumen\(\)

### Community 64 - "Components Separator"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FieldSeparator\(\), Separator\(\)

### Community 65 - "Components Footer"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Footer\(\)

### Community 66 - "Components Marquee"
Cohesion (entity basis within full-graph community): 0
Nodes (2): Marquee\(\), MarqueeProps

### Community 67 - "Components Navbar"
Cohesion (entity basis within full-graph community): 1
Nodes (2): Navbar\(\), handleScroll\(\)

### Community 68 - "App Page — Admin \(2\)"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AdminPage\(\), page /admin

### Community 69 - "App Page — Fechas"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FechasSalidaPage\(\), page /admin/fechas-salida

### Community 70 - "App Page — Home"
Cohesion (entity basis within full-graph community): 1
Nodes (2): Home\(\), page /

### Community 71 - "App Page — Hoteles"
Cohesion (entity basis within full-graph community): 1
Nodes (2): HotelesPage\(\), page /admin/hoteles

### Community 72 - "App Page — Login"
Cohesion (entity basis within full-graph community): 1
Nodes (2): LoginPage\(\), page /login

### Community 73 - "App Page — Paquetes"
Cohesion (entity basis within full-graph community): 1
Nodes (2): PaquetesPage\(\), page /admin/paquetes

### Community 74 - "App Page — Servicios"
Cohesion (entity basis within full-graph community): 1
Nodes (2): ServiciosPage\(\), page /admin/servicios

### Community 75 - "Features Servicio Schemas"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioDTO, ServicioDTO

### Community 76 - "Features Servicio Types"
Cohesion (entity basis within full-graph community): 0
Nodes (2): CreateServicioInput, Servicio

### Community 77 - "Components Testimonials Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): TestimonialCard\(\), TestimonialsSection\(\)

### Community 78 - "Features Use Calendario"
Cohesion (entity basis within full-graph community): 0
Nodes (2): useCalendario\(\), UseCalendarioReturn

### Community 79 - "Features Use Chat"
Cohesion (entity basis within full-graph community): 0
Nodes (2): createMessage\(\), useChat\(\)

### Community 80 - "Features Use Chat Store"
Cohesion (entity basis within full-graph community): 0
Nodes (2): ChatStore, generateSessionId\(\)

### Community 81 - "Features Use Servicios"
Cohesion (entity basis within full-graph community): 0
Nodes (2): useServicios\(\), UseServiciosReturn

### Community 82 - "Features Admin Destinos Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 83 - "Features Admin Fechas Salida Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 84 - "Features Admin Paquetes Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 85 - "Features Admin Servicios Page — Close"
Cohesion (entity basis within full-graph community): 1
Nodes (2): closeModal\(\), handleSubmit\(\)

### Community 86 - "Components Animated Beam"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AnimatedBeamProps

### Community 87 - "Components Animated Beam — Animated"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AnimatedBeam\(\), updatePath\(\)

### Community 88 - "Components Aurora Text"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuroraText\(\)

### Community 89 - "Features Auth Repository"
Cohesion (entity basis within full-graph community): 1
Nodes (1): toDomain\(\)

### Community 90 - "Features Auth Repository — Auth"
Cohesion (entity basis within full-graph community): 1
Nodes (2): AuthRepository, .login\(\)

### Community 91 - "Features Auth Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): AuthPageSkeleton\(\)

### Community 92 - "Components Calendar"
Cohesion (entity basis within full-graph community): 1
Nodes (2): Calendar\(\), CalendarDayButton\(\)

### Community 93 - "Features Calendar Grid"
Cohesion (entity basis within full-graph community): 1
Nodes (2): CalendarGrid\(\), getEventsForDay\(\)

### Community 94 - "Features Calendario Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): CalendarioSkeleton\(\)

### Community 95 - "Features Chat API"
Cohesion (entity basis within full-graph community): 1
Nodes (1): extractTextFromResponse\(\)

### Community 96 - "Features Chat Widget Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ChatWidgetSkeleton\(\)

### Community 97 - "Features Destination Picker"
Cohesion (entity basis within full-graph community): 1
Nodes (2): DestinationPicker\(\), handleSelect\(\)

### Community 98 - "Features Destino Schemas"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinoDTO

### Community 99 - "Features Destinos Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): DestinosPageSkeleton\(\)

### Community 100 - "Features Fechas Salida Repository — Create \(2\)"
Cohesion (entity basis within full-graph community): 1
Nodes (2): .create\(\), toCreateDTO\(\)

### Community 101 - "Features Fechas Salida Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): IFechasSalidaRepository

### Community 102 - "Components Field — Label"
Cohesion (entity basis within full-graph community): 1
Nodes (2): FieldLabel\(\), Label\(\)

### Community 103 - "Components Globe — Globe"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 104 - "Components Hero Section"
Cohesion (entity basis within full-graph community): 1
Nodes (2): HeroSection\(\), handleMouseMove\(\)

### Community 105 - "Features Hotel Repository — Domain"
Cohesion (entity basis within full-graph community): 1
Nodes (1): toResumenDomain\(\)

### Community 106 - "Features Hotel Repository Interface"
Cohesion (entity basis within full-graph community): 1
Nodes (1): IHotelRepository

### Community 107 - "Features Hoteles Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesPageSkeleton\(\)

### Community 108 - "Features Media Uploader — Media"
Cohesion (entity basis within full-graph community): 1
Nodes (2): isVideo\(\), MediaThumb\(\)

### Community 109 - "Components Meteors"
Cohesion (entity basis within full-graph community): 1
Nodes (1): Meteors\(\)

### Community 110 - "Public Next"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 111 - "Features Paquetes Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): PaquetesPageSkeleton\(\)

### Community 112 - "Components Services Section"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ServicesSection\(\)

### Community 113 - "Features Servicios Page Skeleton"
Cohesion (entity basis within full-graph community): 1
Nodes (1): ServiciosPageSkeleton\(\)

### Community 114 - "Features Use Hoteles"
Cohesion (entity basis within full-graph community): 1
Nodes (1): UseHotelesReturn

### Community 115 - "Features Use Hoteles Store"
Cohesion (entity basis within full-graph community): 1
Nodes (1): HotelesUIState

### Community 116 - "Components Video Text"
Cohesion (entity basis within full-graph community): 1
Nodes (1): VideoText\(\)

### Community 117 - "Chat Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 118 - "Destino Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 119 - "Fecha Salida Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 120 - "File SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 121 - "Hotel Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 122 - "Login Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 123 - "Next Env D TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 124 - "Paquete Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 125 - "Servicio Form Schema TypeScript"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 126 - "Vercel SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

### Community 127 - "Window SVG"
Cohesion (entity basis within full-graph community): n/a
Nodes (0): 

## Knowledge Gaps
- **277 weakly connected node(s):** `DestinosPage\(\)`, `page /admin/destinos`, `layout /admin`, `layout /`, `FechasSalidaPage\(\)` (+272 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Features Admin Destinos Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Admin Fechas Salida Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Admin Paquetes Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Admin Servicios Page — Close`** (2 nodes): `closeModal\(\)`, `handleSubmit\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Animated Beam`** (2 nodes): `animated-beam.tsx`, `AnimatedBeamProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Animated Beam — Animated`** (2 nodes): `AnimatedBeam\(\)`, `updatePath\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Aurora Text`** (2 nodes): `aurora-text.tsx`, `AuroraText\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Auth Repository`** (2 nodes): `auth.repository.ts`, `toDomain\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Auth Repository — Auth`** (2 nodes): `AuthRepository`, `.login\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Auth Page Skeleton`** (2 nodes): `AuthPageSkeleton.tsx`, `AuthPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Calendar`** (2 nodes): `Calendar\(\)`, `CalendarDayButton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Calendar Grid`** (2 nodes): `CalendarGrid\(\)`, `getEventsForDay\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Calendario Skeleton`** (2 nodes): `CalendarioSkeleton.tsx`, `CalendarioSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Chat API`** (2 nodes): `chat.api.ts`, `extractTextFromResponse\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Chat Widget Skeleton`** (2 nodes): `ChatWidgetSkeleton.tsx`, `ChatWidgetSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Destination Picker`** (2 nodes): `DestinationPicker\(\)`, `handleSelect\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Destino Schemas`** (2 nodes): `destino.schemas.ts`, `DestinoDTO`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Destinos Page Skeleton`** (2 nodes): `DestinosPageSkeleton.tsx`, `DestinosPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Fechas Salida Repository — Create \(2\)`** (2 nodes): `.create\(\)`, `toCreateDTO\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Fechas Salida Repository Interface`** (2 nodes): `fechas-salida.repository.interface.ts`, `IFechasSalidaRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Field — Label`** (2 nodes): `FieldLabel\(\)`, `Label\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Globe — Globe`** (2 nodes): `globe.svg`, `hero-section.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Hero Section`** (2 nodes): `HeroSection\(\)`, `handleMouseMove\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Hotel Repository — Domain`** (2 nodes): `hotel.repository.ts`, `toResumenDomain\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Hotel Repository Interface`** (2 nodes): `hotel.repository.interface.ts`, `IHotelRepository`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Hoteles Page Skeleton`** (2 nodes): `HotelesPageSkeleton.tsx`, `HotelesPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Media Uploader — Media`** (2 nodes): `isVideo\(\)`, `MediaThumb\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Meteors`** (2 nodes): `meteors.tsx`, `Meteors\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Public Next`** (2 nodes): `next.svg`, `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Paquetes Page Skeleton`** (2 nodes): `PaquetesPageSkeleton.tsx`, `PaquetesPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Services Section`** (2 nodes): `services-section.tsx`, `ServicesSection\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Servicios Page Skeleton`** (2 nodes): `ServiciosPageSkeleton.tsx`, `ServiciosPageSkeleton\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Use Hoteles`** (2 nodes): `useHoteles.ts`, `UseHotelesReturn`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Features Use Hoteles Store`** (2 nodes): `useHotelesStore.ts`, `HotelesUIState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Components Video Text`** (2 nodes): `video-text.tsx`, `VideoText\(\)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Chat Form Schema TypeScript`** (1 nodes): `chat-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Destino Form Schema TypeScript`** (1 nodes): `destino-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Fecha Salida Form Schema TypeScript`** (1 nodes): `fecha-salida-form.schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `File SVG`** (1 nodes): `file.svg`
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

- **Why does \`Button\(\)\` connect \`Features Form\` to \`Features Admin Fechas Salida Page\`, \`Components Calendar\`, \`Components Carousel\`, \`Components Dialog\`, \`Components Card\`, \`Features Admin Destinos Page\`, \`Features Admin Fechas Salida Page — Open\`, \`Features Admin Hoteles Page\`, \`Features Hotel Card\`, \`Features Hotel Detail Panel\`, \`Features Admin Paquetes Page\`, \`Features Admin Servicios Page\`?**
  _High betweenness centrality \(4729.607\) - this node is a cross-community bridge._
- **Why does \`HotelRepository\` connect \`Features Hotel Repository\` to \`Features Hotel Repository — Domain\`, \`Features Hotel Repository — Create\`?**
  _High betweenness centrality \(4352.500\) - this node is a cross-community bridge._
- **Why does \`FechasSalidaRepository\` connect \`Features Fechas Salida Repository\` to \`Features Fechas Salida Repository — Fechas\`, \`Features Fechas Salida Repository — Create \(2\)\`, \`Features Fechas Salida Repository — Domain\`, \`Features Fechas Salida Repository — Create\`?**
  _High betweenness centrality \(2858.062\) - this node is a cross-community bridge._
- **What connects \`DestinosPage\(\)\`, \`page /admin/destinos\`, \`layout /admin\` to the rest of the system?**
  _277 weakly-connected nodes found - possible documentation gaps or missing edges._
