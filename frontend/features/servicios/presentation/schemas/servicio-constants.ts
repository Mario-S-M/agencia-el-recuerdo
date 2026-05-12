import type { TipoServicio } from '../../domain/entities/servicio.types';

export const TIPO_SERVICIO_OPTIONS: { value: TipoServicio; label: string; emoji: string }[] = [
  { value: 'paquete_mar',        label: 'Paquetes al Mar',      emoji: '🌊' },
  { value: 'vuelo',              label: 'Vuelos',                emoji: '✈️' },
  { value: 'excursion',          label: 'Excursiones',           emoji: '🗺️' },
  { value: 'transporte',         label: 'Transporte General',    emoji: '🚌' },
  { value: 'transporte_aereo',   label: 'Transporte Aéreo',     emoji: '🛩️' },
  { value: 'transporte_van',     label: 'Transporte en Van',     emoji: '🚐' },
  { value: 'transporte_autobus', label: 'Transporte en Autobús', emoji: '🚌' },
  { value: 'transporte_maritimo',label: 'Transporte Marítimo',   emoji: '⛴️' },
  { value: 'crucero',            label: 'Cruceros',               emoji: '🚢' },
  { value: 'boda_xv',            label: 'Bodas y XV Años',       emoji: '💍' },
  { value: 'todo_incluido',      label: 'Todo Incluido',         emoji: '🍽️' },
  { value: 'solo_almuerzo',      label: 'Solo Almuerzo',         emoji: '🥗' },
  { value: 'media_pension',      label: 'Media Pensión',         emoji: '🌅' },
  { value: 'solo_desayuno',      label: 'Solo Desayuno',         emoji: '☕' },
];

export const TIPO_COLOR: Record<TipoServicio, { bg: string; text: string }> = {
  paquete_mar:        { bg: 'bg-teal-500/15',    text: 'text-teal-300' },
  vuelo:              { bg: 'bg-sky-500/15',     text: 'text-sky-300' },
  excursion:          { bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
  transporte:         { bg: 'bg-amber-500/15',   text: 'text-amber-300' },
  transporte_aereo:   { bg: 'bg-sky-500/15',     text: 'text-sky-300' },
  transporte_van:     { bg: 'bg-amber-500/15',   text: 'text-amber-300' },
  transporte_autobus: { bg: 'bg-amber-500/15',   text: 'text-amber-300' },
  transporte_maritimo:{ bg: 'bg-cyan-500/15',    text: 'text-cyan-300' },
  crucero:            { bg: 'bg-violet-500/15',  text: 'text-violet-300' },
  boda_xv:            { bg: 'bg-rose-500/15',    text: 'text-rose-300' },
  todo_incluido:      { bg: 'bg-green-500/15',   text: 'text-green-300' },
  solo_almuerzo:      { bg: 'bg-lime-500/15',    text: 'text-lime-300' },
  media_pension:      { bg: 'bg-yellow-500/15',  text: 'text-yellow-300' },
  solo_desayuno:      { bg: 'bg-orange-500/15',  text: 'text-orange-300' },
};
