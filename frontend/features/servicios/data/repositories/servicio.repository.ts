import { servicioApi } from '../api/servicios.api';
import type { ServicioDTO, CreateServicioDTO, UpdateServicioDTO } from '../dto/servicio.schemas';
import type { Servicio } from '../../domain/entities/servicio.types';

function toDomain(dto: ServicioDTO): Servicio {
  return {
    id: dto.id,
    nombre: dto.nombre,
    tipo: dto.tipo,
    categoria: dto.categoria,
    descripcion: dto.descripcion,
    icono: dto.icono,
    activo: dto.activo,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export class ServicioRepository {
  async findAll(): Promise<Servicio[]> {
    const dtos = await servicioApi.findAll();
    return dtos.map(toDomain);
  }

  async findOne(id: string): Promise<Servicio> {
    const dto = await servicioApi.findOne(id);
    return toDomain(dto);
  }

  async create(input: CreateServicioDTO): Promise<Servicio> {
    const dto = await servicioApi.create(input);
    return toDomain(dto);
  }

  async update(id: string, input: UpdateServicioDTO): Promise<Servicio> {
    const dto = await servicioApi.update(id, input);
    return toDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await servicioApi.delete(id);
  }
}
