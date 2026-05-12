export type TipoServicio =
  | 'paquete_mar'
  | 'vuelo'
  | 'excursion'
  | 'transporte'
  | 'crucero'
  | 'boda_xv'
  | 'transporte_aereo'
  | 'transporte_van'
  | 'transporte_autobus'
  | 'transporte_maritimo'
  | 'todo_incluido'
  | 'solo_almuerzo'
  | 'media_pension'
  | 'solo_desayuno';

export type CategoriaServicio = 'general' | 'transporte' | 'alimentacion';

export interface Servicio {
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

export interface CreateServicioInput {
  nombre: string;
  tipo: TipoServicio;
  categoria?: CategoriaServicio;
  descripcion?: string;
  icono?: string;
  activo?: boolean;
}

export type UpdateServicioInput = Partial<CreateServicioInput>;
