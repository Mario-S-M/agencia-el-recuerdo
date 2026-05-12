import { getHttpClient } from '@/lib/http-client';
import { destinoResponseSchema } from '../dto/destino.schemas';
import type { DestinoDTO, CreateDestinoDTO, UpdateDestinoDTO } from '../dto/destino.schemas';

const http = getHttpClient();

export const destinoApi = {
  findAll(): Promise<DestinoDTO[]> {
    return http.get<DestinoDTO[]>('/destinos', destinoResponseSchema.array());
  },

  findOne(id: string): Promise<DestinoDTO> {
    return http.get<DestinoDTO>(`/destinos/${id}`, destinoResponseSchema);
  },

  create(input: CreateDestinoDTO): Promise<DestinoDTO> {
    return http.post<DestinoDTO>('/destinos', input, destinoResponseSchema);
  },

  update(id: string, input: UpdateDestinoDTO): Promise<DestinoDTO> {
    return http.patch<DestinoDTO>(`/destinos/${id}`, input, destinoResponseSchema);
  },

  delete(id: string): Promise<void> {
    return http.delete(`/destinos/${id}`);
  },
};
