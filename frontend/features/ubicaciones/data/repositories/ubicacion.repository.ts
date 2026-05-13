import { ubicacionesApi } from '../api/ubicaciones.api';
import type { Pais, Estado, Municipio, CreatePaisInput, CreateEstadoInput, CreateMunicipioInput, UpdatePaisInput, UpdateEstadoInput, UpdateMunicipioInput, PaginatedResult } from '../../domain/entities/ubicacion.types';

export class UbicacionRepository {
  async findAllPaises(): Promise<Pais[]> {
    return ubicacionesApi.findAllPaises();
  }

  async findPaisesPaginated(params: {
    page: number; limit: number; search?: string; continente?: string;
  }): Promise<PaginatedResult<Pais>> {
    return ubicacionesApi.findPaisesPaginated(params);
  }

  async findAllEstados(): Promise<Estado[]> {
    return ubicacionesApi.findAllEstados();
  }

  async findEstadosPaginated(params: {
    page: number; limit: number; search?: string; paisId?: string;
  }): Promise<PaginatedResult<Estado>> {
    return ubicacionesApi.findEstadosPaginated(params);
  }

  async findEstadosByPais(paisId: string): Promise<Estado[]> {
    return ubicacionesApi.findEstadosByPais(paisId);
  }

  async findAllMunicipios(): Promise<Municipio[]> {
    return ubicacionesApi.findAllMunicipios();
  }

  async findMunicipiosPaginated(params: {
    page: number; limit: number; search?: string; paisId?: string; estadoId?: string;
  }): Promise<PaginatedResult<Municipio>> {
    return ubicacionesApi.findMunicipiosPaginated(params);
  }

  async findMunicipiosByEstado(estadoId: string): Promise<Municipio[]> {
    return ubicacionesApi.findMunicipiosByEstado(estadoId);
  }

  async createPais(input: CreatePaisInput): Promise<Pais> {
    return ubicacionesApi.createPais(input);
  }

  async updatePais(id: string, input: UpdatePaisInput): Promise<Pais> {
    return ubicacionesApi.updatePais(id, input);
  }

  async deletePais(id: string): Promise<void> {
    return ubicacionesApi.deletePais(id);
  }

  async createEstado(input: CreateEstadoInput): Promise<Estado> {
    return ubicacionesApi.createEstado(input);
  }

  async updateEstado(id: string, input: UpdateEstadoInput): Promise<Estado> {
    return ubicacionesApi.updateEstado(id, input);
  }

  async deleteEstado(id: string): Promise<void> {
    return ubicacionesApi.deleteEstado(id);
  }

  async createMunicipio(input: CreateMunicipioInput): Promise<Municipio> {
    return ubicacionesApi.createMunicipio(input);
  }

  async updateMunicipio(id: string, input: UpdateMunicipioInput): Promise<Municipio> {
    return ubicacionesApi.updateMunicipio(id, input);
  }

  async deleteMunicipio(id: string): Promise<void> {
    return ubicacionesApi.deleteMunicipio(id);
  }
}
