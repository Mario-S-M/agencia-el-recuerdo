import { getHttpClient } from '@/lib/http-client';
import { fechaSalidaResponseSchema, paqueteResumenSchema } from '../dto/fechas-salida.schemas';
import type { FechaSalidaDTO, PaqueteResumenDTO, CreateFechaSalidaDTO, UpdateFechaSalidaDTO } from '../dto/fechas-salida.schemas';

const http = getHttpClient();

export const fechasSalidaApi = {
  findAll(): Promise<FechaSalidaDTO[]> {
    return http.get<FechaSalidaDTO[]>('/fechas-salida', fechaSalidaResponseSchema.array());
  },

  getPaquetes(): Promise<PaqueteResumenDTO[]> {
    return http.get<PaqueteResumenDTO[]>('/paquetes', paqueteResumenSchema.array());
  },

  create(input: CreateFechaSalidaDTO): Promise<FechaSalidaDTO> {
    return http.post<FechaSalidaDTO>('/fechas-salida', input, fechaSalidaResponseSchema);
  },

  update(id: string, input: UpdateFechaSalidaDTO): Promise<FechaSalidaDTO> {
    return http.patch<FechaSalidaDTO>(`/fechas-salida/${id}`, input, fechaSalidaResponseSchema);
  },

  delete(id: string): Promise<void> {
    return http.delete(`/fechas-salida/${id}`);
  },

  createOpcionHotel(fechaSalidaId: string, input: { hotelId: string; tipoHabitacionId: string; regimen: string; precio: number; activo?: boolean }): Promise<FechaSalidaDTO> {
    return http.post<FechaSalidaDTO>(`/fechas-salida/${fechaSalidaId}/opciones-hotel`, input, fechaSalidaResponseSchema);
  },

  deleteOpcionHotel(fechaSalidaId: string, id: string): Promise<void> {
    return http.delete(`/fechas-salida/${fechaSalidaId}/opciones-hotel/${id}`);
  },

  createTransporte(fechaSalidaId: string, input: { descripcion: string; tipo: string; precio: number; activo?: boolean }): Promise<FechaSalidaDTO> {
    return http.post<FechaSalidaDTO>(`/fechas-salida/${fechaSalidaId}/transportes`, input, fechaSalidaResponseSchema);
  },

  deleteTransporte(fechaSalidaId: string, id: string): Promise<void> {
    return http.delete(`/fechas-salida/${fechaSalidaId}/transportes/${id}`);
  },
};
