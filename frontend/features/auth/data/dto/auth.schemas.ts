import { z } from 'zod';

export const authUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  nombre: z.string(),
  apellidos: z.nullable(z.string()),
  telefono: z.nullable(z.string()),
  rol: z.nullable(z.string()),
  avatar: z.nullable(z.string()),
  activo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  user: authUserSchema,
});

export interface AuthUserDTO {
  id: string;
  email: string;
  nombre: string;
  apellidos: string | null;
  telefono: string | null;
  rol: string | null;
  avatar: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponseDTO {
  access_token: string;
  user: AuthUserDTO;
}
