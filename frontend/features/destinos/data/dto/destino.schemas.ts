import { z } from 'zod';

export const destinoResponseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  pais: z.string(),
  paisId: z.nullable(z.string()),
  estadoId: z.nullable(z.string()),
  municipioId: z.nullable(z.string()),
  descripcion: z.nullable(z.string()),
  imagenes: z.array(z.string()),
  destacado: z.boolean(),
  activo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface DestinoDTO {
  id: string;
  nombre: string;
  pais: string;
  paisId: string | null;
  estadoId: string | null;
  municipioId: string | null;
  descripcion: string | null;
  imagenes: string[];
  destacado: boolean;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createDestinoSchema = z.object({
  nombre: z.string().min(2).max(100),
  pais: z.string().min(2).max(100),
  paisId: z.string().uuid().optional(),
  estadoId: z.string().uuid().optional(),
  municipioId: z.string().uuid().optional(),
  descripcion: z.string().optional(),
  imagenes: z.array(z.string()).optional(),
  destacado: z.boolean().optional(),
  activo: z.boolean().optional(),
});

export const updateDestinoSchema = createDestinoSchema.partial();

export type CreateDestinoDTO = z.infer<typeof createDestinoSchema>;
export type UpdateDestinoDTO = z.infer<typeof updateDestinoSchema>;
