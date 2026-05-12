export interface DestinoResumen {
  id: string;
  nombre: string;
  pais: string;
}

export interface HotelResumen {
  id: string;
  nombre: string;
}

export interface ServicioResumen {
  id: string;
  nombre: string;
  tipo: string;
  categoria: string;
  icono: string | null;
}

export interface Paquete {
  id: string;
  nombre: string;
  descripcion: string | null;
  destinoId: string;
  destino: DestinoResumen;
  hotelId: string | null;
  hotel: HotelResumen | null;
  servicios: ServicioResumen[];
  incluye: string[] | null;
  todoIncluido: boolean;
  destacado: boolean;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaqueteInput {
  nombre: string;
  descripcion?: string;
  destinoId: string;
  hotelId?: string;
  servicioIds?: string[];
  incluye?: string[];
  todoIncluido?: boolean;
  destacado?: boolean;
  activo?: boolean;
}

export type UpdatePaqueteInput = Partial<CreatePaqueteInput>;
