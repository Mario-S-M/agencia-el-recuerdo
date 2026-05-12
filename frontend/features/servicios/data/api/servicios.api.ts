import { getHttpClient } from '@/lib/http-client';
import { servicioResponseSchema } from '../dto/servicio.schemas';
import type { ServicioDTO, CreateServicioDTO, UpdateServicioDTO } from '../dto/servicio.schemas';

const http = getHttpClient();

export const servicioApi = {
  findAll(): Promise<ServicioDTO[]> {
    return http.get<ServicioDTO[]>('/servicios', servicioResponseSchema.array());
  },

  findOne(id: string): Promise<ServicioDTO> {
    return http.get<ServicioDTO>(`/servicios/${id}`, servicioResponseSchema);
  },

  create(input: CreateServicioDTO): Promise<ServicioDTO> {
    return http.post<ServicioDTO>('/servicios', input, servicioResponseSchema);
  },

  update(id: string, input: UpdateServicioDTO): Promise<ServicioDTO> {
    return http.patch<ServicioDTO>(`/servicios/${id}`, input, servicioResponseSchema);
  },

  delete(id: string): Promise<void> {
    return http.delete(`/servicios/${id}`);
  },
};
