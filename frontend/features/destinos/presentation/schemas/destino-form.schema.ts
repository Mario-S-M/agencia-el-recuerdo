import { z } from 'zod';

export const destinoFormSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  pais: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  paisId: z.string().optional(),
  estadoId: z.string().optional(),
  municipioId: z.string().optional(),
  descripcion: z.string().optional(),
  imagenes: z.array(z.string()).optional(),
  destacado: z.boolean().optional(),
  activo: z.boolean().optional(),
});

export type DestinoFormData = z.infer<typeof destinoFormSchema>;
