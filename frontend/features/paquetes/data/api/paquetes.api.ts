import { getHttpClient } from '@/lib/http-client';
import { paqueteResponseSchema } from '../dto/paquete.schemas';
import type { PaqueteDTO, CreatePaqueteDTO, UpdatePaqueteDTO } from '../dto/paquete.schemas';
import type { Destino } from '@/features/destinos/domain/entities';
import type { HotelResumenDTO } from '../dto/paquete.schemas';
import type { ServicioResumenDTO } from '../dto/paquete.schemas';

const http = getHttpClient();

export const paqueteApi = {
  findAll(): Promise<PaqueteDTO[]> {
    return http.get<PaqueteDTO[]>('/paquetes', paqueteResponseSchema.array());
  },

  findOne(id: string): Promise<PaqueteDTO> {
    return http.get<PaqueteDTO>(`/paquetes/${id}`, paqueteResponseSchema);
  },

  create(input: CreatePaqueteDTO): Promise<PaqueteDTO> {
    return http.post<PaqueteDTO>('/paquetes', input, paqueteResponseSchema);
  },

  update(id: string, input: UpdatePaqueteDTO): Promise<PaqueteDTO> {
    return http.patch<PaqueteDTO>(`/paquetes/${id}`, input, paqueteResponseSchema);
  },

  delete(id: string): Promise<void> {
    return http.delete(`/paquetes/${id}`);
  },

  findAllDestinos(): Promise<Destino[]> {
    return http.get<Destino[]>('/destinos');
  },

  findAllHoteles(): Promise<HotelResumenDTO[]> {
    return http.get<HotelResumenDTO[]>('/hoteles');
  },

  findAllServicios(): Promise<ServicioResumenDTO[]> {
    return http.get<ServicioResumenDTO[]>('/servicios');
  },
};
