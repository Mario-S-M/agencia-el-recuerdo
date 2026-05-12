import { z } from 'zod';
import type { TipoServicio, CategoriaServicio } from '../../domain/entities/servicio.types';

const TIPOS = [
  'paquete_mar', 'vuelo', 'excursion', 'transporte', 'crucero', 'boda_xv',
  'transporte_aereo', 'transporte_van', 'transporte_autobus', 'transporte_maritimo',
  'todo_incluido', 'solo_almuerzo', 'media_pension', 'solo_desayuno',
] as const;

const CATEGORIAS = ['general', 'transporte', 'alimentacion'] as const;

export const servicioResponseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: z.enum(TIPOS),
  categoria: z.enum(CATEGORIAS),
  descripcion: z.nullable(z.string()),
  icono: z.nullable(z.string()),
  activo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface ServicioDTO {
  id: string;
  nombre: string;
  tipo: TipoServicio;
  categoria: CategoriaServicio;
  descripcion: string | null;
  icono: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServicioDTO {
  nombre: string;
  tipo: TipoServicio;
  categoria?: CategoriaServicio;
  descripcion?: string;
  icono?: string;
  activo?: boolean;
}

export const createServicioSchema = z.object({
  nombre: z.string().min(3).max(100),
  tipo: z.enum(TIPOS),
  categoria: z.enum(CATEGORIAS).optional(),
  descripcion: z.string().optional(),
  icono: z.string().optional(),
  activo: z.boolean().optional(),
});

export type UpdateServicioDTO = Partial<CreateServicioDTO>;

export const updateServicioSchema = createServicioSchema.partial();
