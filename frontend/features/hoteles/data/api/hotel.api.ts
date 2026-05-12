import { getHttpClient } from '@/lib/http-client';

const http = getHttpClient();

import {
  hotelResponseSchema,
  hotelResumenSchema,
} from '../dto/hotel.schemas';
import type { HotelDTO, HotelResumenDTO } from '../dto/hotel.schemas';
import type { CreateHotelDTO, UpdateHotelDTO } from '../dto/hotel.schemas';
import type { CreateTipoHabitacionDTO, UpdateTipoHabitacionDTO } from '../dto/hotel.schemas';
import type { CreatePeriodoHotelDTO, UpdatePeriodoHotelDTO } from '../dto/hotel.schemas';
import type { CreateTarifaPeriodoDTO, UpdateTarifaPeriodoDTO } from '../dto/hotel.schemas';
import type { Destino } from '@/features/destinos/domain/entities';

export const hotelApi = {
  findAll(): Promise<HotelDTO[]> {
    return http.get<HotelDTO[]>('/hoteles', hotelResponseSchema.array());
  },

  findAllActive(): Promise<HotelResumenDTO[]> {
    return http.get<HotelResumenDTO[]>('/hoteles/activos', hotelResumenSchema.array());
  },

  findOne(id: string): Promise<HotelDTO> {
    return http.get<HotelDTO>(`/hoteles/${id}`, hotelResponseSchema);
  },

  create(input: CreateHotelDTO): Promise<HotelDTO> {
    return http.post<HotelDTO>('/hoteles', input, hotelResponseSchema);
  },

  update(id: string, input: UpdateHotelDTO): Promise<HotelDTO> {
    return http.patch<HotelDTO>(`/hoteles/${id}`, input, hotelResponseSchema);
  },

  delete(id: string): Promise<void> {
    return http.delete(`/hoteles/${id}`);
  },

  createTipoHabitacion(hotelId: string, input: CreateTipoHabitacionDTO): Promise<HotelDTO> {
    return http.post<HotelDTO>(`/hoteles/${hotelId}/tipos-habitacion`, input, hotelResponseSchema);
  },

  updateTipoHabitacion(hotelId: string, id: string, input: UpdateTipoHabitacionDTO): Promise<HotelDTO> {
    return http.patch<HotelDTO>(`/hoteles/${hotelId}/tipos-habitacion/${id}`, input, hotelResponseSchema);
  },

  deleteTipoHabitacion(hotelId: string, id: string): Promise<void> {
    return http.delete(`/hoteles/${hotelId}/tipos-habitacion/${id}`);
  },

  createPeriodo(hotelId: string, input: CreatePeriodoHotelDTO): Promise<HotelDTO> {
    return http.post<HotelDTO>(`/hoteles/${hotelId}/periodos`, input, hotelResponseSchema);
  },

  updatePeriodo(hotelId: string, id: string, input: UpdatePeriodoHotelDTO): Promise<HotelDTO> {
    return http.patch<HotelDTO>(`/hoteles/${hotelId}/periodos/${id}`, input, hotelResponseSchema);
  },

  deletePeriodo(hotelId: string, id: string): Promise<void> {
    return http.delete(`/hoteles/${hotelId}/periodos/${id}`);
  },

  createTarifa(hotelId: string, periodoId: string, input: CreateTarifaPeriodoDTO): Promise<HotelDTO> {
    return http.post<HotelDTO>(`/hoteles/${hotelId}/periodos/${periodoId}/tarifas`, input, hotelResponseSchema);
  },

  updateTarifa(hotelId: string, periodoId: string, id: string, input: UpdateTarifaPeriodoDTO): Promise<HotelDTO> {
    return http.patch<HotelDTO>(`/hoteles/${hotelId}/periodos/${periodoId}/tarifas/${id}`, input, hotelResponseSchema);
  },

  deleteTarifa(hotelId: string, periodoId: string, id: string): Promise<void> {
    return http.delete(`/hoteles/${hotelId}/periodos/${periodoId}/tarifas/${id}`);
  },

  findAllDestinos(): Promise<Destino[]> {
    return http.get<Destino[]>('/destinos');
  },
};
