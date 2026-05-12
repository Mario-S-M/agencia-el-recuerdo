import { z } from 'zod';

const TIPOS = [
  'paquete_mar', 'vuelo', 'excursion', 'transporte', 'crucero', 'boda_xv',
  'transporte_aereo', 'transporte_van', 'transporte_autobus', 'transporte_maritimo',
  'todo_incluido', 'solo_almuerzo', 'media_pension', 'solo_desayuno',
] as const;

export const servicioFormSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(100),
  tipo: z.enum(TIPOS),
  descripcion: z.string().optional(),
  icono: z.string().max(10).optional().or(z.literal('')),
  activo: z.boolean().optional(),
});

export type ServicioFormData = z.infer<typeof servicioFormSchema>;
