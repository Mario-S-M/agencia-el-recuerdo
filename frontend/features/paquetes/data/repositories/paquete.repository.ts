import { paqueteApi } from '../api/paquetes.api';
import type { PaqueteDTO, CreatePaqueteDTO, UpdatePaqueteDTO } from '../dto/paquete.schemas';
import type { Paquete } from '../../domain/entities/paquete.types';
import type { Destino } from '@/features/destinos/domain/entities';
import type { HotelResumenDTO, ServicioResumenDTO } from '../dto/paquete.schemas';

function toDomain(dto: PaqueteDTO): Paquete {
  return {
    id: dto.id,
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    destinoId: dto.destinoId,
    destino: dto.destino,
    hotelId: dto.hotelId,
    hotel: dto.hotel,
    servicios: dto.servicios,
    incluye: dto.incluye,
    todoIncluido: dto.todoIncluido,
    destacado: dto.destacado,
    activo: dto.activo,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export class PaqueteRepository {
  async findAll(): Promise<Paquete[]> {
    const dtos = await paqueteApi.findAll();
    return dtos.map(toDomain);
  }

  async findOne(id: string): Promise<Paquete> {
    const dto = await paqueteApi.findOne(id);
    return toDomain(dto);
  }

  async create(input: CreatePaqueteDTO): Promise<Paquete> {
    const dto = await paqueteApi.create(input);
    return toDomain(dto);
  }

  async update(id: string, input: UpdatePaqueteDTO): Promise<Paquete> {
    const dto = await paqueteApi.update(id, input);
    return toDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await paqueteApi.delete(id);
  }

  async findAllDestinos(): Promise<Destino[]> {
    return paqueteApi.findAllDestinos();
  }

  async findAllHoteles(): Promise<HotelResumenDTO[]> {
    return paqueteApi.findAllHoteles();
  }

  async findAllServicios(): Promise<ServicioResumenDTO[]> {
    return paqueteApi.findAllServicios();
  }
}
