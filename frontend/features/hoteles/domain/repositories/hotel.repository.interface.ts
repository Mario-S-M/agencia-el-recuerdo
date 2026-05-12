import type { Hotel, TipoHabitacion, PeriodoHotel, TarifaPeriodo, HotelResumen } from '../entities/hotel.types';
import type { Destino } from '@/features/destinos/domain/entities';
import type { CreateHotelDTO, UpdateHotelDTO, CreateTipoHabitacionDTO, UpdateTipoHabitacionDTO, CreatePeriodoHotelDTO, UpdatePeriodoHotelDTO, CreateTarifaPeriodoDTO, UpdateTarifaPeriodoDTO } from '../../data/dto/hotel.schemas';

export interface IHotelRepository {
  findAll(): Promise<Hotel[]>;
  findAllActive(): Promise<HotelResumen[]>;
  findOne(id: string): Promise<Hotel>;
  create(input: CreateHotelDTO): Promise<Hotel>;
  update(id: string, input: UpdateHotelDTO): Promise<Hotel>;
  delete(id: string): Promise<void>;

  createTipoHabitacion(hotelId: string, input: CreateTipoHabitacionDTO): Promise<TipoHabitacion>;
  updateTipoHabitacion(hotelId: string, id: string, input: UpdateTipoHabitacionDTO): Promise<TipoHabitacion>;
  deleteTipoHabitacion(hotelId: string, id: string): Promise<void>;

  createPeriodo(hotelId: string, input: CreatePeriodoHotelDTO): Promise<PeriodoHotel>;
  updatePeriodo(hotelId: string, id: string, input: UpdatePeriodoHotelDTO): Promise<PeriodoHotel>;
  deletePeriodo(hotelId: string, id: string): Promise<void>;

  createTarifa(hotelId: string, periodoId: string, input: CreateTarifaPeriodoDTO): Promise<TarifaPeriodo>;
  updateTarifa(hotelId: string, periodoId: string, id: string, input: UpdateTarifaPeriodoDTO): Promise<TarifaPeriodo>;
  deleteTarifa(hotelId: string, periodoId: string, id: string): Promise<void>;

  findAllDestinos(): Promise<Destino[]>;
}
