import { z } from 'zod';
import type { TipoServicio } from '../../domain/entities/fechas-salida.types';

const tipoServicioSchema = z.enum([
  'paquete_mar', 'vuelo', 'excursion', 'transporte', 'crucero', 'boda_xv',
  'transporte_aereo', 'transporte_van', 'transporte_autobus', 'transporte_maritimo',
  'todo_incluido', 'solo_almuerzo', 'media_pension', 'solo_desayuno',
]);

export const destinoInfoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  pais: z.string(),
});

export interface DestinoInfoDTO {
  id: string;
  nombre: string;
  pais: string;
}

export const servicioInfoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: tipoServicioSchema,
});

export interface ServicioInfoDTO {
  id: string;
  nombre: string;
  tipo: TipoServicio;
}

export const paqueteResumenSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  destino: destinoInfoSchema,
  servicios: z.array(servicioInfoSchema),
});

export interface PaqueteResumenDTO {
  id: string;
  nombre: string;
  destino: DestinoInfoDTO;
  servicios: ServicioInfoDTO[];
}

export const opcionHotelSchema = z.object({
  id: z.string(),
  fechaSalidaId: z.string(),
  hotelId: z.string(),
  hotelNombre: z.string(),
  tipoHabitacionId: z.string(),
  tipoHabitacionNombre: z.string(),
  regimen: z.string(),
  precio: z.number(),
  activo: z.boolean(),
});

export interface OpcionHotelDTO {
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

export const transporteAdicionalSchema = z.object({
  id: z.string(),
  fechaSalidaId: z.string(),
  descripcion: z.string(),
  tipo: z.string(),
  precio: z.number(),
  activo: z.boolean(),
});

export interface TransporteAdicionalDTO {
  id: string;
  fechaSalidaId: string;
  descripcion: string;
  tipo: string;
  precio: number;
  activo: boolean;
}

export const fechaSalidaResponseSchema = z.object({
  id: z.string(),
  paqueteId: z.string(),
  paquete: paqueteResumenSchema,
  fechaSalida: z.string(),
  fechaRegreso: z.nullable(z.string()),
  cupoMaximo: z.number(),
  cupoMinimo: z.number(),
  cupoDisponible: z.number(),
  activo: z.boolean(),
  opcionesHotel: z.array(opcionHotelSchema),
  transportesAdicionales: z.array(transporteAdicionalSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface FechaSalidaDTO {
  id: string;
  paqueteId: string;
  paquete: PaqueteResumenDTO;
  fechaSalida: string;
  fechaRegreso: string | null;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
  activo: boolean;
  opcionesHotel: OpcionHotelDTO[];
  transportesAdicionales: TransporteAdicionalDTO[];
  createdAt: string;
  updatedAt: string;
}

export const createFechaSalidaSchema = z.object({
  paqueteId: z.string().min(1),
  fechaSalida: z.string().min(1),
  fechaRegreso: z.string().optional(),
  cupoMaximo: z.number().min(1),
  cupoMinimo: z.number().min(1),
  cupoDisponible: z.number().min(0),
  activo: z.boolean().optional(),
  opcionesHotel: z.array(z.object({
    hotelId: z.string(),
    tipoHabitacionId: z.string(),
    regimen: z.string(),
    precio: z.number(),
    activo: z.boolean().optional(),
  })).optional(),
  transportesAdicionales: z.array(z.object({
    descripcion: z.string(),
    tipo: z.string(),
    precio: z.number(),
    activo: z.boolean().optional(),
  })).optional(),
});

export const updateFechaSalidaSchema = createFechaSalidaSchema.partial();

export interface CreateFechaSalidaDTO {
  paqueteId: string;
  fechaSalida: string;
  fechaRegreso?: string;
  cupoMaximo: number;
  cupoMinimo: number;
  cupoDisponible: number;
  activo?: boolean;
  opcionesHotel?: Array<{
    hotelId: string;
    tipoHabitacionId: string;
    regimen: string;
    precio: number;
    activo?: boolean;
  }>;
  transportesAdicionales?: Array<{
    descripcion: string;
    tipo: string;
    precio: number;
    activo?: boolean;
  }>;
}

export type UpdateFechaSalidaDTO = Partial<CreateFechaSalidaDTO>;
