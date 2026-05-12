import { Injectable, NotFoundException } from '@nestjs/common';
import { DestinosRepository } from './destinos.repository';
import { CreateDestinoDto, UpdateDestinoDto } from './dto/create-destino.dto';
import { Destino } from './entities/destino.entity';

@Injectable()
export class DestinosService {
  constructor(private readonly destinosRepository: DestinosRepository) {}

  async findAll(): Promise<Destino[]> {
    return this.destinosRepository.findAll();
  }

  async findAllActive(): Promise<Destino[]> {
    return this.destinosRepository.findAllActive();
  }

  async findAllDestacados(): Promise<Destino[]> {
    return this.destinosRepository.findAllDestacados();
  }

  async findOne(id: string): Promise<Destino> {
    const destino = await this.destinosRepository.findById(id);
    if (!destino)
      throw new NotFoundException(`Destino con ID ${id} no encontrado`);
    return destino;
  }

  async findByPais(pais: string): Promise<Destino[]> {
    return this.destinosRepository.findByPais(pais);
  }

  async create(dto: CreateDestinoDto): Promise<Destino> {
    return this.destinosRepository.save({
      ...dto,
      destacado: dto.destacado ?? false,
      activo: dto.activo ?? true,
    });
  }

  async update(id: string, dto: UpdateDestinoDto): Promise<Destino> {
    await this.findOne(id);
    return this.destinosRepository.update(id, {
      ...dto,
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);
    await this.destinosRepository.softDelete(id);
  }

  async restore(id: string): Promise<Destino> {
    const destino = await this.destinosRepository.findById(id);
    if (!destino)
      throw new NotFoundException(`Destino con ID ${id} no encontrado`);
    await this.destinosRepository.restore(id);
    return this.findOne(id);
  }
}
