import { z } from 'zod';
import type { OcupacionHabitacion } from '../../domain/entities/hotel.types';

const ocupacionSchema = z.enum(['sencilla', 'doble', 'triple', 'cuadruple']);

export const tipoHabitacionSchema = z.object({
  id: z.string(),
  hotelId: z.string(),
  nombre: z.string(),
  ocupacion: ocupacionSchema,
  descripcion: z.nullable(z.string()),
  fotos: z.array(z.string()),
  activo: z.boolean(),
});

export const tarifaPeriodoSchema = z.object({
  id: z.string(),
  periodoId: z.string(),
  tipoHabitacionId: z.string(),
  tipoHabitacion: tipoHabitacionSchema,
  precio: z.number(),
  activo: z.boolean(),
});

export const periodoSchema = z.object({
  id: z.string(),
  hotelId: z.string(),
  nombre: z.string(),
  fechaInicio: z.string(),
  fechaFin: z.string(),
  descripcion: z.nullable(z.string()),
  activo: z.boolean(),
  tarifas: z.array(tarifaPeriodoSchema),
});

export const hotelResponseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  direccion: z.nullable(z.string()),
  descripcion: z.nullable(z.string()),
  googleMapsUrl: z.nullable(z.string()),
  fotos: z.array(z.string()),
  activo: z.boolean(),
  destinoId: z.nullable(z.string()),
  tiposHabitacion: z.array(tipoHabitacionSchema),
  periodos: z.array(periodoSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const hotelResumenSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  destinoId: z.nullable(z.string()),
});

export interface TipoHabitacionDTO {
  id: string;
  hotelId: string;
  nombre: string;
  ocupacion: OcupacionHabitacion;
  descripcion: string | null;
  fotos: string[];
  activo: boolean;
}

export interface TarifaPeriodoDTO {
  id: string;
  periodoId: string;
  tipoHabitacionId: string;
  tipoHabitacion: TipoHabitacionDTO;
  precio: number;
  activo: boolean;
}

export interface PeriodoHotelDTO {
  id: string;
  hotelId: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string | null;
  activo: boolean;
  tarifas: TarifaPeriodoDTO[];
}

export interface HotelDTO {
  id: string;
  nombre: string;
  direccion: string | null;
  descripcion: string | null;
  googleMapsUrl: string | null;
  fotos: string[];
  activo: boolean;
  destinoId: string | null;
  tiposHabitacion: TipoHabitacionDTO[];
  periodos: PeriodoHotelDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface HotelResumenDTO {
  id: string;
  nombre: string;
  destinoId: string | null;
}

export const createHotelSchema = z.object({
  nombre: z.string().min(2).max(150),
  direccion: z.string().max(255).optional(),
  descripcion: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  fotos: z.array(z.string()).optional(),
  activo: z.boolean().optional(),
  destinoId: z.string().optional(),
});

export const updateHotelSchema = createHotelSchema.partial();

export const createTipoHabitacionSchema = z.object({
  nombre: z.string().min(2).max(100),
  ocupacion: ocupacionSchema,
  descripcion: z.string().optional(),
  fotos: z.array(z.string()).optional(),
  activo: z.boolean().optional(),
});

export const updateTipoHabitacionSchema = createTipoHabitacionSchema.partial();

export const createPeriodoSchema = z.object({
  nombre: z.string().min(2).max(150),
  fechaInicio: z.string().min(1),
  fechaFin: z.string().min(1),
  descripcion: z.string().optional(),
  activo: z.boolean().optional(),
});

export const updatePeriodoSchema = createPeriodoSchema.partial();

export const createTarifaSchema = z.object({
  tipoHabitacionId: z.string().min(1),
  precio: z.number().min(0),
  activo: z.boolean().optional(),
});

export const updateTarifaSchema = createTarifaSchema.partial();

export type CreateHotelDTO = z.infer<typeof createHotelSchema>;
export type UpdateHotelDTO = z.infer<typeof updateHotelSchema>;
export type CreateTipoHabitacionDTO = z.infer<typeof createTipoHabitacionSchema>;
export type UpdateTipoHabitacionDTO = z.infer<typeof updateTipoHabitacionSchema>;
export type CreatePeriodoHotelDTO = z.infer<typeof createPeriodoSchema>;
export type UpdatePeriodoHotelDTO = z.infer<typeof updatePeriodoSchema>;
export type CreateTarifaPeriodoDTO = z.infer<typeof createTarifaSchema>;
export type UpdateTarifaPeriodoDTO = z.infer<typeof updateTarifaSchema>;
