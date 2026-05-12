import { z } from 'zod';

const destinoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  pais: z.string(),
  imagen: z.string().nullable(),
});

const servicioSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: z.enum([
    'paquete_mar', 'vuelo', 'excursion', 'transporte', 'crucero', 'boda_xv',
    'transporte_aereo', 'transporte_van', 'transporte_autobus', 'transporte_maritimo',
    'todo_incluido', 'solo_almuerzo', 'media_pension', 'solo_desayuno',
  ]),
  icono: z.string().nullable(),
});

const paqueteSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string().nullable(),
  imagen: z.string().nullable(),
  incluye: z.array(z.string()).nullable(),
  destino: destinoSchema,
  servicios: z.array(servicioSchema),
});

export const fechaSalidaCalendarioSchema = z.object({
  id: z.string(),
  paquete: paqueteSchema,
  paqueteId: z.string(),
  fechaSalida: z.string(),
  fechaRegreso: z.string().nullable(),
  cupoMaximo: z.number(),
  cupoMinimo: z.number(),
  cupoDisponible: z.number(),
  activo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const fechasSalidaListSchema = z.array(fechaSalidaCalendarioSchema);

export interface DestinoCalendarioDTO extends z.infer<typeof destinoSchema> {}
export interface ServicioCalendarioDTO extends z.infer<typeof servicioSchema> {}
export interface PaqueteCalendarioDTO extends z.infer<typeof paqueteSchema> {}
export interface FechaSalidaCalendarioDTO extends z.infer<typeof fechaSalidaCalendarioSchema> {}
