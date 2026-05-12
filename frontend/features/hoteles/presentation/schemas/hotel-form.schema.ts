import { z } from 'zod';

export const hotelFormSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(150),
  direccion: z.string().max(255).optional().or(z.literal('')),
  descripcion: z.string().optional().or(z.literal('')),
  googleMapsUrl: z.string().url('URL inválida').max(500).optional().or(z.literal('')),
  fotos: z.array(z.string()).optional(),
  destinoId: z.string().optional().or(z.literal('')),
  activo: z.boolean().optional(),
});

export type HotelFormData = z.infer<typeof hotelFormSchema>;

export const tipoHabitacionFormSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(100),
  ocupacion: z.enum(['sencilla', 'doble', 'triple', 'cuadruple']),
  descripcion: z.string().optional().or(z.literal('')),
  activo: z.boolean().optional(),
});

export type TipoHabitacionFormData = z.infer<typeof tipoHabitacionFormSchema>;

export const periodoHotelFormSchema = z
  .object({
    nombre: z.string().min(2, 'Mínimo 2 caracteres').max(150),
    fechaInicio: z.string().min(1, 'Fecha requerida'),
    fechaFin: z.string().min(1, 'Fecha requerida'),
    descripcion: z.string().optional().or(z.literal('')),
    activo: z.boolean().optional(),
  })
  .refine((d) => d.fechaFin >= d.fechaInicio, {
    message: 'La fecha fin debe ser igual o posterior a la fecha inicio',
    path: ['fechaFin'],
  });

export type PeriodoHotelFormData = z.infer<typeof periodoHotelFormSchema>;

export const tarifaFormSchema = z.object({
  tipoHabitacionId: z.string().min(1, 'Selecciona un tipo de habitación'),
  precio: z.number().min(0, 'El precio debe ser ≥ 0'),
});

export type TarifaFormData = z.infer<typeof tarifaFormSchema>;
