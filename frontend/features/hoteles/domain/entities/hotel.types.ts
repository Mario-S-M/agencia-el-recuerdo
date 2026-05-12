export type OcupacionHabitacion = 'sencilla' | 'doble' | 'triple' | 'cuadruple';

export const OCUPACION_LABELS: Record<OcupacionHabitacion, string> = {
  sencilla: 'Sencilla',
  doble: 'Doble',
  triple: 'Triple',
  cuadruple: 'Cuádruple',
};

export interface TarifaPeriodo {
  id: string;
  periodoId: string;
  tipoHabitacionId: string;
  tipoHabitacion: TipoHabitacion;
  precio: number;
  activo: boolean;
}

export interface TipoHabitacion {
  id: string;
  hotelId: string;
  nombre: string;
  ocupacion: OcupacionHabitacion;
  descripcion: string | null;
  fotos: string[];
  activo: boolean;
  tarifas?: TarifaPeriodo[];
}

export interface PeriodoHotel {
  id: string;
  hotelId: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string | null;
  activo: boolean;
  tarifas: TarifaPeriodo[];
}

export interface Hotel {
  id: string;
  nombre: string;
  direccion: string | null;
  descripcion: string | null;
  googleMapsUrl: string | null;
  fotos: string[];
  activo: boolean;
  destinoId: string | null;
  tiposHabitacion: TipoHabitacion[];
  periodos: PeriodoHotel[];
  createdAt: string;
  updatedAt: string;
}

export interface HotelResumen {
  id: string;
  nombre: string;
  destinoId: string | null;
}
