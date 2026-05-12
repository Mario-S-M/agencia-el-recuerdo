import { z } from 'zod';

export const paqueteFormSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(150),
  descripcion: z.string().optional(),
  destinoId: z.string().min(1, 'Selecciona un destino'),
  hotelId: z.string().min(1, 'Selecciona un hotel'),
  servicioIds: z.array(z.string()).min(1, 'Selecciona al menos un servicio'),
  destacado: z.boolean().optional(),
  activo: z.boolean().optional(),
});

export type PaqueteFormData = z.infer<typeof paqueteFormSchema>;
