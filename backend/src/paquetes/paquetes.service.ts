import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { PaquetesRepository } from './paquetes.repository';
import { CreatePaqueteDto, UpdatePaqueteDto } from './dto/create-paquete.dto';
import { Paquete } from './entities/paquete.entity';
import { Servicio } from '../servicios/entities/servicio.entity';

@Injectable()
export class PaquetesService {
  constructor(private readonly paquetesRepository: PaquetesRepository) {}

  async findAll(): Promise<Paquete[]> {
    return this.paquetesRepository.findAll();
  }

  async findAllActive(): Promise<Paquete[]> {
    return this.paquetesRepository.findAllActive();
  }

  async findAllDestacados(): Promise<Paquete[]> {
    return this.paquetesRepository.findAllDestacados();
  }

  async findOne(id: string): Promise<Paquete> {
    const paquete = await this.paquetesRepository.findById(id);
    if (!paquete)
      throw new NotFoundException(`Paquete con ID ${id} no encontrado`);
    return paquete;
  }

  async findByDestino(destinoId: string): Promise<Paquete[]> {
    return this.paquetesRepository.findByDestino(destinoId);
  }

  async create(dto: CreatePaqueteDto): Promise<Paquete> {
    const { servicioIds, ...rest } = dto;
    const repo = AppDataSource.getRepository(Servicio);
    const servicios = await repo.findBy({ id: In(servicioIds) });
    return this.paquetesRepository.save({
      ...rest,
      hotelId: dto.hotelId,
      servicios,
      todoIncluido: dto.todoIncluido ?? false,
      destacado: dto.destacado ?? false,
      activo: dto.activo ?? true,
    });
  }

  async update(id: string, dto: UpdatePaqueteDto): Promise<Paquete> {
    const paquete = await this.findOne(id);
    const { servicioIds, ...rest } = dto;
    let servicios: Servicio[] | undefined;
    if (servicioIds !== undefined) {
      const repo = AppDataSource.getRepository(Servicio);
      servicios =
        servicioIds.length > 0
          ? await repo.findBy({ id: In(servicioIds) })
          : [];
    }
    return this.paquetesRepository.update(id, {
      ...rest,
      hotelId: dto.hotelId !== undefined ? dto.hotelId : paquete.hotelId,
      servicios: servicios ?? paquete.servicios,
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);
    await this.paquetesRepository.softDelete(id);
  }

  async restore(id: string): Promise<Paquete> {
    const paquete = await this.paquetesRepository.findById(id);
    if (!paquete)
      throw new NotFoundException(`Paquete con ID ${id} no encontrado`);
    await this.paquetesRepository.restore(id);
    return this.findOne(id);
  }
}
