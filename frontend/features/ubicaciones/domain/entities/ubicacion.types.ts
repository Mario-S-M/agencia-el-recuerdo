export interface Pais {
  id: string;
  nombre: string;
  codigoIso2: string;
  codigoIso3: string;
  codigoTelefono: string | null;
  nombreNativo: string | null;
  continente: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Estado {
  id: string;
  nombre: string;
  codigo: string | null;
  paisId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaisMini {
  id: string;
  nombre: string;
}

export interface EstadoConPais {
  id: string;
  nombre: string;
  codigo: string | null;
  paisId: string;
  pais?: PaisMini;
}

export interface Municipio {
  id: string;
  nombre: string;
  latitud: number | null;
  longitud: number | null;
  estadoId: string;
  createdAt: string;
  updatedAt: string;
  estado?: EstadoConPais;
}

export interface CreatePaisInput {
  nombre: string;
  codigoIso2: string;
  codigoIso3: string;
  codigoTelefono?: string;
  nombreNativo?: string;
  continente?: string;
}

export interface CreateEstadoInput {
  nombre: string;
  codigo?: string;
  paisId: string;
}

export interface CreateMunicipioInput {
  nombre: string;
  latitud?: number;
  longitud?: number;
  estadoId: string;
}

export type UpdatePaisInput = Partial<CreatePaisInput>;
export type UpdateEstadoInput = Partial<CreateEstadoInput>;
export type UpdateMunicipioInput = Partial<CreateMunicipioInput>;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
