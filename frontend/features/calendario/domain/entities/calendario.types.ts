export type TipoServicio =
  | 'paquete_mar' | 'vuelo' | 'excursion' | 'transporte' | 'crucero' | 'boda_xv'
  | 'transporte_aereo' | 'transporte_van' | 'transporte_autobus' | 'transporte_maritimo'
  | 'todo_incluido' | 'solo_almuerzo' | 'media_pension' | 'solo_desayuno';

export interface DestinoCalendario {
  id: string;
  nombre: string;
  pais: string;
  imagen?: string | null;
}

export interface ServicioCalendario {
  id: string;
  nombre: string;
  tipo: TipoServicio;
  icono?: string | null;
}

export interface PaqueteCalendario {
  id: string;
  nombre: string;
  descripcion?: string | null;
  imagen?: string | null;
  incluye?: string[] | null;
  destino: DestinoCalendario;
  servicios: ServicioCalendario[];
}

export interface FechaSalidaCalendario {
  id: string;
  paquete: PaqueteCalendario;
  paqueteId: string;
  fechaSalida: string;
  fechaRegreso?: string | null;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EstadoCupo = 'disponible' | 'ultimos' | 'agotado';

export function getEstadoCupo(
  cupoDisponible: number,
  cupoMinimo: number,
): EstadoCupo {
  if (cupoDisponible === 0) return 'agotado';
  if (cupoDisponible <= cupoMinimo) return 'ultimos';
  return 'disponible';
}

export const SERVICIO_CONFIG: Record<
  TipoServicio,
  { label: string; emoji: string; color: string; dot: string; border: string }
> = {
  paquete_mar: { label: 'Paquetes al Mar', emoji: '🌊', color: 'text-teal-300', dot: 'bg-teal-400', border: 'border-teal-500/40' },
  vuelo: { label: 'Vuelos', emoji: '✈️', color: 'text-sky-300', dot: 'bg-sky-400', border: 'border-sky-500/40' },
  excursion: { label: 'Excursiones', emoji: '🗺️', color: 'text-emerald-300', dot: 'bg-emerald-400', border: 'border-emerald-500/40' },
  transporte: { label: 'Transporte', emoji: '🚌', color: 'text-amber-300', dot: 'bg-amber-400', border: 'border-amber-500/40' },
  crucero: { label: 'Cruceros', emoji: '🚢', color: 'text-violet-300', dot: 'bg-violet-400', border: 'border-violet-500/40' },
  boda_xv: { label: 'Bodas y XV Años', emoji: '💍', color: 'text-rose-300', dot: 'bg-rose-400', border: 'border-rose-500/40' },
  transporte_aereo: { label: 'Transporte Aéreo', emoji: '🛩️', color: 'text-sky-300', dot: 'bg-sky-400', border: 'border-sky-500/40' },
  transporte_van: { label: 'Transporte en Van', emoji: '🚐', color: 'text-amber-300', dot: 'bg-amber-400', border: 'border-amber-500/40' },
  transporte_autobus: { label: 'Transporte en Autobús', emoji: '🚌', color: 'text-amber-300', dot: 'bg-amber-400', border: 'border-amber-500/40' },
  transporte_maritimo: { label: 'Transporte Marítimo', emoji: '⛴️', color: 'text-sky-300', dot: 'bg-sky-400', border: 'border-sky-500/40' },
  todo_incluido: { label: 'Todo Incluido', emoji: '🍽️', color: 'text-emerald-300', dot: 'bg-emerald-400', border: 'border-emerald-500/40' },
  solo_almuerzo: { label: 'Solo Almuerzo', emoji: '🥗', color: 'text-lime-300', dot: 'bg-lime-400', border: 'border-lime-500/40' },
  media_pension: { label: 'Media Pensión', emoji: '🌅', color: 'text-yellow-300', dot: 'bg-yellow-400', border: 'border-yellow-500/40' },
  solo_desayuno: { label: 'Solo Desayuno', emoji: '☕', color: 'text-orange-300', dot: 'bg-orange-400', border: 'border-orange-500/40' },
};
