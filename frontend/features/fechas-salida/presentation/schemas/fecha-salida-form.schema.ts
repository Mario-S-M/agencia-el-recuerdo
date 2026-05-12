import { z } from 'zod';

export const fechaSalidaFormSchema = z
  .object({
    paqueteId: z.string().min(1, 'Selecciona un paquete'),
    fechaSalida: z.string().min(1, 'Selecciona una fecha de salida'),
    fechaRegreso: z.string().optional(),
    cupoMaximo: z
      .string()
      .refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 1 && Number.isInteger(Number(v))), { message: 'Entero ≥ 1' }),
    cupoMinimo: z
      .string()
      .refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 1 && Number.isInteger(Number(v))), { message: 'Entero ≥ 1' }),
    cupoDisponible: z
      .string()
      .refine((v) => !v || (!isNaN(Number(v)) && Number(v) >= 0 && Number.isInteger(Number(v))), { message: 'Entero ≥ 0' }),
    activo: z.boolean().optional(),
  })
  .refine(
    (d) => !d.fechaSalida || !d.fechaRegreso || d.fechaRegreso >= d.fechaSalida,
    { message: 'La fecha de regreso debe ser igual o posterior a la de salida', path: ['fechaRegreso'] },
  )
  .refine(
    (d) => {
      const max = d.cupoMaximo ? Number(d.cupoMaximo) : Infinity;
      const disp = d.cupoDisponible ? Number(d.cupoDisponible) : 0;
      return disp <= max;
    },
    { message: 'Los cupos disponibles no pueden superar el máximo', path: ['cupoDisponible'] },
  );

export type FechaSalidaFormData = z.infer<typeof fechaSalidaFormSchema>;
