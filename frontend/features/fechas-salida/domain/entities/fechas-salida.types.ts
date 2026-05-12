export type TipoServicio =
  | 'paquete_mar' | 'vuelo' | 'excursion' | 'transporte' | 'crucero' | 'boda_xv'
  | 'transporte_aereo' | 'transporte_van' | 'transporte_autobus' | 'transporte_maritimo'
  | 'todo_incluido' | 'solo_almuerzo' | 'media_pension' | 'solo_desayuno';

export const SERVICIO_CONFIG: Record<TipoServicio, { label: string; emoji: string; color: string }> = {
  paquete_mar: { label: 'Paquetes al Mar', emoji: '🌊', color: '#14b8a6' },
  vuelo: { label: 'Vuelos', emoji: '✈️', color: '#0ea5e9' },
  excursion: { label: 'Excursiones', emoji: '🗺️', color: '#10b981' },
  transporte: { label: 'Transporte', emoji: '🚌', color: '#f59e0b' },
  crucero: { label: 'Cruceros', emoji: '🚢', color: '#8b5cf6' },
  boda_xv: { label: 'Bodas y XV Años', emoji: '💍', color: '#f43f5e' },
  transporte_aereo: { label: 'Transporte Aéreo', emoji: '🛩️', color: '#0ea5e9' },
  transporte_van: { label: 'Transporte en Van', emoji: '🚐', color: '#f59e0b' },
  transporte_autobus: { label: 'Transporte en Autobús', emoji: '🚌', color: '#f59e0b' },
  transporte_maritimo: { label: 'Transporte Marítimo', emoji: '⛴️', color: '#0ea5e9' },
  todo_incluido: { label: 'Todo Incluido', emoji: '🍽️', color: '#10b981' },
  solo_almuerzo: { label: 'Solo Almuerzo', emoji: '🥗', color: '#84cc16' },
  media_pension: { label: 'Media Pensión', emoji: '🌅', color: '#eab308' },
  solo_desayuno: { label: 'Solo Desayuno', emoji: '☕', color: '#f97316' },
};

export type EstadoCupo = 'agotado' | 'ultimos' | 'disponible' | 'medio';

export function getEstadoCupo(disp: number, max: number, minimo: number): EstadoCupo {
  const ratio = max > 0 ? disp / max : 1;
  if (disp === 0) return 'agotado';
  if (disp <= minimo) return 'ultimos';
  if (ratio > 0.5) return 'disponible';
  return 'medio';
}

export interface DestinoInfo {
  id: string;
  nombre: string;
  pais: string;
}

export interface ServicioInfo {
  id: string;
  nombre: string;
  tipo: TipoServicio;
}

export interface PaqueteResumen {
  id: string;
  nombre: string;
  destino: DestinoInfo;
  servicios: ServicioInfo[];
}

export interface OpcionHotel {
  id: string;
  fechaSalidaId: string;
  hotelId: string;
  hotelNombre: string;
  tipoHabitacionId: string;
  tipoHabitacionNombre: string;
  regimen: string;
  precio: number;
  activo: boolean;
}

export interface CreateOpcionHotelInput {
  hotelId: string;
  tipoHabitacionId: string;
  regimen: string;
  precio: number;
  activo?: boolean;
}

export interface TransporteAdicional {
  id: string;
  fechaSalidaId: string;
  descripcion: string;
  tipo: string;
  precio: number;
  activo: boolean;
}

export interface CreateTransporteAdicionalInput {
  descripcion: string;
  tipo: string;
  precio: number;
  activo?: boolean;
}

export interface FechaSalidaAdmin {
  id: string;
  paqueteId: string;
  paquete: PaqueteResumen;
  fechaSalida: string;
  fechaRegreso: string | null;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
  activo: boolean;
  opcionesHotel: OpcionHotel[];
  transportesAdicionales: TransporteAdicional[];
  createdAt: string;
  updatedAt: string;
}

export interface FechaSalidaCalendario {
  id: string;
  paqueteId: string;
  paquete: PaqueteResumen;
  fechaSalida: string;
  fechaRegreso: string | null;
  cupoMaximo: number;
  cupoDisponible: number;
  activo: boolean;
}

export interface CalendarFechaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: FechaSalidaCalendario;
}

export interface CreateFechaSalidaInput {
  paqueteId: string;
  fechaSalida: string;
  fechaRegreso?: string;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
  activo?: boolean;
  opcionesHotel?: CreateOpcionHotelInput[];
  transportesAdicionales?: CreateTransporteAdicionalInput[];
}

export type UpdateFechaSalidaInput = Partial<CreateFechaSalidaInput>;
