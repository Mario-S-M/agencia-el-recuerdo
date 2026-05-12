import type { IHotelRepository } from '../../domain/repositories/hotel.repository.interface';
import type { Hotel, TipoHabitacion, PeriodoHotel, TarifaPeriodo, HotelResumen } from '../../domain/entities/hotel.types';
import type { HotelDTO, HotelResumenDTO } from '../dto/hotel.schemas';
import type { CreateHotelDTO, UpdateHotelDTO } from '../dto/hotel.schemas';
import type { CreateTipoHabitacionDTO, UpdateTipoHabitacionDTO } from '../dto/hotel.schemas';
import type { CreatePeriodoHotelDTO, UpdatePeriodoHotelDTO } from '../dto/hotel.schemas';
import type { CreateTarifaPeriodoDTO, UpdateTarifaPeriodoDTO } from '../dto/hotel.schemas';
import type { Destino } from '@/features/destinos/domain/entities';
import { hotelApi } from '../api/hotel.api';

function toHotelDomain(dto: HotelDTO): Hotel {
  return {
    id: dto.id,
    nombre: dto.nombre,
    direccion: dto.direccion,
    descripcion: dto.descripcion,
    googleMapsUrl: dto.googleMapsUrl,
    fotos: dto.fotos,
    activo: dto.activo,
    destinoId: dto.destinoId,
    tiposHabitacion: dto.tiposHabitacion.map((t) => ({
      id: t.id,
      hotelId: t.hotelId,
      nombre: t.nombre,
      ocupacion: t.ocupacion,
      descripcion: t.descripcion,
      fotos: t.fotos,
      activo: t.activo,
    })),
    periodos: dto.periodos.map((p) => ({
      id: p.id,
      hotelId: p.hotelId,
      nombre: p.nombre,
      fechaInicio: p.fechaInicio,
      fechaFin: p.fechaFin,
      descripcion: p.descripcion,
      activo: p.activo,
      tarifas: p.tarifas,
    })),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

function toResumenDomain(dto: HotelResumenDTO): HotelResumen {
  return { id: dto.id, nombre: dto.nombre, destinoId: dto.destinoId };
}

export class HotelRepository implements IHotelRepository {
  async findAll(): Promise<Hotel[]> {
    const dtos = await hotelApi.findAll();
    return dtos.map(toHotelDomain);
  }

  async findAllActive(): Promise<HotelResumen[]> {
    const dtos = await hotelApi.findAllActive();
    return dtos.map(toResumenDomain);
  }

  async findOne(id: string): Promise<Hotel> {
    const dto = await hotelApi.findOne(id);
    return toHotelDomain(dto);
  }

  async create(input: CreateHotelDTO): Promise<Hotel> {
    const dto = await hotelApi.create(input);
    return toHotelDomain(dto);
  }

  async update(id: string, input: UpdateHotelDTO): Promise<Hotel> {
    const dto = await hotelApi.update(id, input);
    return toHotelDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await hotelApi.delete(id);
  }

  async createTipoHabitacion(hotelId: string, input: CreateTipoHabitacionDTO): Promise<TipoHabitacion> {
    const dto = await hotelApi.createTipoHabitacion(hotelId, input);
    const hotel = toHotelDomain(dto);
    const created = hotel.tiposHabitacion.find(
      (t) => t.nombre === input.nombre && t.hotelId === hotelId,
    );
    if (!created) throw new Error('Error al crear tipo de habitación');
    return created;
  }

  async updateTipoHabitacion(hotelId: string, id: string, input: UpdateTipoHabitacionDTO): Promise<TipoHabitacion> {
    const dto = await hotelApi.updateTipoHabitacion(hotelId, id, input);
    const hotel = toHotelDomain(dto);
    const updated = hotel.tiposHabitacion.find((t) => t.id === id);
    if (!updated) throw new Error('Error al actualizar tipo de habitación');
    return updated;
  }

  async deleteTipoHabitacion(hotelId: string, id: string): Promise<void> {
    await hotelApi.deleteTipoHabitacion(hotelId, id);
  }

  async createPeriodo(hotelId: string, input: CreatePeriodoHotelDTO): Promise<PeriodoHotel> {
    const dto = await hotelApi.createPeriodo(hotelId, input);
    const hotel = toHotelDomain(dto);
    const created = hotel.periodos.find(
      (p) => p.nombre === input.nombre && p.hotelId === hotelId,
    );
    if (!created) throw new Error('Error al crear periodo');
    return created;
  }

  async updatePeriodo(hotelId: string, id: string, input: UpdatePeriodoHotelDTO): Promise<PeriodoHotel> {
    const dto = await hotelApi.updatePeriodo(hotelId, id, input);
    const hotel = toHotelDomain(dto);
    const updated = hotel.periodos.find((p) => p.id === id);
    if (!updated) throw new Error('Error al actualizar periodo');
    return updated;
  }

  async deletePeriodo(hotelId: string, id: string): Promise<void> {
    await hotelApi.deletePeriodo(hotelId, id);
  }

  async createTarifa(hotelId: string, periodoId: string, input: CreateTarifaPeriodoDTO): Promise<TarifaPeriodo> {
    const dto = await hotelApi.createTarifa(hotelId, periodoId, input);
    const hotel = toHotelDomain(dto);
    const periodo = hotel.periodos.find((p) => p.id === periodoId);
    if (!periodo) throw new Error('Error al crear tarifa');
    const tarifa = periodo.tarifas.find(
      (t) => t.tipoHabitacionId === input.tipoHabitacionId,
    );
    if (!tarifa) throw new Error('Error al crear tarifa');
    return tarifa;
  }

  async updateTarifa(hotelId: string, periodoId: string, id: string, input: UpdateTarifaPeriodoDTO): Promise<TarifaPeriodo> {
    const dto = await hotelApi.updateTarifa(hotelId, periodoId, id, input);
    const hotel = toHotelDomain(dto);
    const periodo = hotel.periodos.find((p) => p.id === periodoId);
    if (!periodo) throw new Error('Error al actualizar tarifa');
    const tarifa = periodo.tarifas.find((t) => t.id === id);
    if (!tarifa) throw new Error('Error al actualizar tarifa');
    return tarifa;
  }

  async deleteTarifa(hotelId: string, periodoId: string, id: string): Promise<void> {
    await hotelApi.deleteTarifa(hotelId, periodoId, id);
  }

  async findAllDestinos(): Promise<Destino[]> {
    return hotelApi.findAllDestinos();
  }
}
