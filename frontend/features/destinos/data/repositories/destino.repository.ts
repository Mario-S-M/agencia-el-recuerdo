import { destinoApi } from '../api/destinos.api';
import type { DestinoDTO, CreateDestinoDTO, UpdateDestinoDTO } from '../dto/destino.schemas';
import type { Destino } from '../../domain/entities/destino.types';

function toDomain(dto: DestinoDTO): Destino {
  return {
    id: dto.id,
    nombre: dto.nombre,
    pais: dto.pais,
    descripcion: dto.descripcion,
    imagenes: dto.imagenes,
    destacado: dto.destacado,
    activo: dto.activo,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export class DestinoRepository {
  async findAll(): Promise<Destino[]> {
    const dtos = await destinoApi.findAll();
    return dtos.map(toDomain);
  }

  async findOne(id: string): Promise<Destino> {
    const dto = await destinoApi.findOne(id);
    return toDomain(dto);
  }

  async create(input: CreateDestinoDTO): Promise<Destino> {
    const dto = await destinoApi.create(input);
    return toDomain(dto);
  }

  async update(id: string, input: UpdateDestinoDTO): Promise<Destino> {
    const dto = await destinoApi.update(id, input);
    return toDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await destinoApi.delete(id);
  }
}
