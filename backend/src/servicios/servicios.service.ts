import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiciosRepository } from './servicios.repository';
import {
  CreateServicioDto,
  UpdateServicioDto,
} from './dto/create-servicio.dto';
import { Servicio, TipoServicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(private readonly serviciosRepository: ServiciosRepository) {}

  async findAll(): Promise<Servicio[]> {
    return this.serviciosRepository.findAll();
  }

  async findAllActive(): Promise<Servicio[]> {
    return this.serviciosRepository.findAllActive();
  }

  async findOne(id: string): Promise<Servicio> {
    const servicio = await this.serviciosRepository.findById(id);
    if (!servicio)
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    return servicio;
  }

  async findByTipo(tipo: TipoServicio): Promise<Servicio[]> {
    return this.serviciosRepository.findByTipo(tipo);
  }

  async create(dto: CreateServicioDto): Promise<Servicio> {
    return this.serviciosRepository.save({
      ...dto,
      activo: dto.activo ?? true,
    });
  }

  async update(id: string, dto: UpdateServicioDto): Promise<Servicio> {
    await this.findOne(id);
    return this.serviciosRepository.update(id, dto);
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);
    await this.serviciosRepository.softDelete(id);
  }

  async restore(id: string): Promise<Servicio> {
    const servicio = await this.serviciosRepository.findById(id);
    if (!servicio)
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    await this.serviciosRepository.restore(id);
    return this.findOne(id);
  }
}
