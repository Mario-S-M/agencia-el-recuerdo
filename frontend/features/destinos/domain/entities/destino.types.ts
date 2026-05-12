export interface Destino {
  id: string;
  nombre: string;
  pais: string;
  descripcion: string | null;
  imagenes: string[];
  destacado: boolean;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDestinoInput {
  nombre: string;
  pais: string;
  descripcion?: string;
  imagenes?: string[];
  destacado?: boolean;
  activo?: boolean;
}

export type UpdateDestinoInput = Partial<CreateDestinoInput>;
