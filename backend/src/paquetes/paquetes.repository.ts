import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Paquete } from './entities/paquete.entity';
import { IPaqueteRepository } from './interfaces/paquete-repository.interface';
import { BaseRepository } from '../common/base/base.repository';

const PAQUETE_RELATIONS = ['destino', 'hotel', 'servicios'];

@Injectable()
export class PaquetesRepository
  extends BaseRepository<Paquete>
  implements IPaqueteRepository
{
  protected get entityType(): new () => Paquete {
    return Paquete;
  }

  async findAll(): Promise<Paquete[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      relations: PAQUETE_RELATIONS,
      order: { nombre: 'ASC' },
    });
  }

  async findAllActive(): Promise<Paquete[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      relations: PAQUETE_RELATIONS,
      order: { nombre: 'ASC' },
    });
  }

  async findAllDestacados(): Promise<Paquete[]> {
    return this.repository.find({
      where: { destacado: true, activo: true, deletedAt: IsNull() },
      relations: PAQUETE_RELATIONS,
      order: { nombre: 'ASC' },
    });
  }

  async findById(id: string): Promise<Paquete | null> {
    return this.findOne({ where: { id }, relations: PAQUETE_RELATIONS });
  }

  async findByDestino(destinoId: string): Promise<Paquete[]> {
    return this.repository.find({
      where: { destinoId, deletedAt: IsNull() },
      relations: PAQUETE_RELATIONS,
      order: { nombre: 'ASC' },
    });
  }
}
