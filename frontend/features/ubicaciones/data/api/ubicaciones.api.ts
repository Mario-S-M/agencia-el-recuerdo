import { getHttpClient } from '@/lib/http-client';
import type { Pais, Estado, Municipio, CreatePaisInput, CreateEstadoInput, CreateMunicipioInput, UpdatePaisInput, UpdateEstadoInput, UpdateMunicipioInput, PaginatedResult } from '../../domain/entities/ubicacion.types';

const http = getHttpClient();

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export const ubicacionesApi = {
  // Países
  findAllPaises(): Promise<Pais[]> {
    return http.get<Pais[]>('/ubicaciones/paises');
  },

  findPaisesPaginated(params: {
    page: number; limit: number; search?: string; continente?: string;
  }): Promise<PaginatedResult<Pais>> {
    return http.get<PaginatedResult<Pais>>(`/ubicaciones/paises${buildQuery(params)}`);
  },

  findOnePais(id: string): Promise<Pais> {
    return http.get<Pais>(`/ubicaciones/paises/${id}`);
  },

  createPais(input: CreatePaisInput): Promise<Pais> {
    return http.post<Pais>('/ubicaciones/paises', input);
  },

  updatePais(id: string, input: UpdatePaisInput): Promise<Pais> {
    return http.patch<Pais>(`/ubicaciones/paises/${id}`, input);
  },

  deletePais(id: string): Promise<void> {
    return http.delete(`/ubicaciones/paises/${id}`);
  },

  // Estados
  findAllEstados(): Promise<Estado[]> {
    return http.get<Estado[]>('/ubicaciones/estados');
  },

  findEstadosPaginated(params: {
    page: number; limit: number; search?: string; paisId?: string;
  }): Promise<PaginatedResult<Estado>> {
    return http.get<PaginatedResult<Estado>>(`/ubicaciones/estados${buildQuery(params)}`);
  },

  findEstadosByPais(paisId: string): Promise<Estado[]> {
    return http.get<Estado[]>(`/ubicaciones/estados/por-pais?paisId=${paisId}`);
  },

  findOneEstado(id: string): Promise<Estado> {
    return http.get<Estado>(`/ubicaciones/estados/${id}`);
  },

  createEstado(input: CreateEstadoInput): Promise<Estado> {
    return http.post<Estado>('/ubicaciones/estados', input);
  },

  updateEstado(id: string, input: UpdateEstadoInput): Promise<Estado> {
    return http.patch<Estado>(`/ubicaciones/estados/${id}`, input);
  },

  deleteEstado(id: string): Promise<void> {
    return http.delete(`/ubicaciones/estados/${id}`);
  },

  // Municipios
  findAllMunicipios(): Promise<Municipio[]> {
    return http.get<Municipio[]>('/ubicaciones/municipios');
  },

  findMunicipiosPaginated(params: {
    page: number; limit: number; search?: string; paisId?: string; estadoId?: string;
  }): Promise<PaginatedResult<Municipio>> {
    return http.get<PaginatedResult<Municipio>>(`/ubicaciones/municipios${buildQuery(params)}`);
  },

  findMunicipiosByEstado(estadoId: string): Promise<Municipio[]> {
    return http.get<Municipio[]>(`/ubicaciones/municipios/por-estado?estadoId=${estadoId}`);
  },

  findOneMunicipio(id: string): Promise<Municipio> {
    return http.get<Municipio>(`/ubicaciones/municipios/${id}`);
  },

  createMunicipio(input: CreateMunicipioInput): Promise<Municipio> {
    return http.post<Municipio>('/ubicaciones/municipios', input);
  },

  updateMunicipio(id: string, input: UpdateMunicipioInput): Promise<Municipio> {
    return http.patch<Municipio>(`/ubicaciones/municipios/${id}`, input);
  },

  deleteMunicipio(id: string): Promise<void> {
    return http.delete(`/ubicaciones/municipios/${id}`);
  },
};
