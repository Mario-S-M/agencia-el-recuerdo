import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Destino } from './entities/destino.entity';
import { IDestinoRepository } from './interfaces/destino-repository.interface';
import { BaseRepository } from '../common/base/base.repository';

@Injectable()
export class DestinosRepository
  extends BaseRepository<Destino>
  implements IDestinoRepository
{
  protected get entityType(): new () => Destino {
    return Destino;
  }

  async findAll(): Promise<Destino[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findAllActive(): Promise<Destino[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findAllDestacados(): Promise<Destino[]> {
    return this.repository.find({
      where: { destacado: true, activo: true, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findByPais(pais: string): Promise<Destino[]> {
    return this.repository.find({
      where: { pais, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }
}
