import { z } from 'zod';

const destinoResumenSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  pais: z.string(),
});

export interface DestinoResumenDTO {
  id: string;
  nombre: string;
  pais: string;
}

const hotelResumenSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  destinoId: z.nullable(z.string()),
});

export interface HotelResumenDTO {
  id: string;
  nombre: string;
  destinoId: string | null;
}

const servicioResumenSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: z.string(),
  categoria: z.string(),
  icono: z.nullable(z.string()),
});

export interface ServicioResumenDTO {
  id: string;
  nombre: string;
  tipo: string;
  categoria: string;
  icono: string | null;
}

export const paqueteResponseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.nullable(z.string()),
  destinoId: z.string(),
  destino: destinoResumenSchema,
  hotelId: z.nullable(z.string()),
  hotel: z.nullable(hotelResumenSchema),
  servicios: z.array(servicioResumenSchema),
  incluye: z.nullable(z.array(z.string())),
  todoIncluido: z.boolean(),
  destacado: z.boolean(),
  activo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface PaqueteDTO {
  id: string;
  nombre: string;
  descripcion: string | null;
  destinoId: string;
  destino: DestinoResumenDTO;
  hotelId: string | null;
  hotel: HotelResumenDTO | null;
  servicios: ServicioResumenDTO[];
  incluye: string[] | null;
  todoIncluido: boolean;
  destacado: boolean;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaqueteDTO {
  nombre: string;
  descripcion?: string;
  destinoId: string;
  hotelId: string;
  servicioIds: string[];
  destacado?: boolean;
  activo?: boolean;
}

export const createPaqueteSchema = z.object({
  nombre: z.string().min(3).max(150),
  descripcion: z.string().optional(),
  destinoId: z.string().min(1),
  hotelId: z.string().min(1, 'Selecciona un hotel'),
  servicioIds: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
  destacado: z.boolean().optional(),
  activo: z.boolean().optional(),
});

export type UpdatePaqueteDTO = Partial<CreatePaqueteDTO>;

export const updatePaqueteSchema = createPaqueteSchema.partial();
