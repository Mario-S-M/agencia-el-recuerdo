import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Servicio, TipoServicio } from './entities/servicio.entity';
import { IServicioRepository } from './interfaces/servicio-repository.interface';
import { BaseRepository } from '../common/base/base.repository';

@Injectable()
export class ServiciosRepository
  extends BaseRepository<Servicio>
  implements IServicioRepository
{
  protected get entityType(): new () => Servicio {
    return Servicio;
  }

  async findAll(): Promise<Servicio[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findAllActive(): Promise<Servicio[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findByTipo(tipo: TipoServicio): Promise<Servicio[]> {
    return this.repository.find({
      where: { tipo, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }
}
