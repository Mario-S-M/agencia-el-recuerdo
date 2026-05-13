import { Injectable } from '@nestjs/common';
import { IsNull, Like } from 'typeorm';
import { Pais } from './entities/pais.entity';
import { Estado } from './entities/estado.entity';
import { Municipio } from './entities/municipio.entity';
import { IPaisRepository } from './interfaces/pais-repository.interface';
import { IEstadoRepository } from './interfaces/estado-repository.interface';
import { IMunicipioRepository } from './interfaces/municipio-repository.interface';
import { BaseRepository } from '../common/base/base.repository';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class PaisesRepository
  extends BaseRepository<Pais>
  implements IPaisRepository
{
  protected get entityType(): new () => Pais {
    return Pais;
  }

  async findAll(): Promise<Pais[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findByContinente(continente: string): Promise<Pais[]> {
    return this.repository.find({
      where: { continente, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    continente?: string;
  }): Promise<PaginatedResult<Pais>> {
    const qb = this.repository
      .createQueryBuilder('pais')
      .where('pais.deletedAt IS NULL')
      .orderBy('pais.nombre', 'ASC');

    if (params.search) {
      qb.andWhere(
        '(pais.nombre ILIKE :search OR pais.codigoIso2 ILIKE :search OR pais.codigoIso3 ILIKE :search OR pais.nombreNativo ILIKE :search)',
        { search: `%${params.search}%` },
      );
    }
    if (params.continente) {
      qb.andWhere('pais.continente = :continente', {
        continente: params.continente,
      });
    }

    const total = await qb.getCount();
    const data = await qb
      .skip((params.page - 1) * params.limit)
      .take(params.limit)
      .getMany();

    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }
}

@Injectable()
export class EstadosRepository
  extends BaseRepository<Estado>
  implements IEstadoRepository
{
  protected get entityType(): new () => Estado {
    return Estado;
  }

  async findAll(): Promise<Estado[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findByPais(paisId: string): Promise<Estado[]> {
    return this.repository.find({
      where: { paisId, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
  }): Promise<PaginatedResult<Estado>> {
    const qb = this.repository
      .createQueryBuilder('estado')
      .innerJoin('estado.pais', 'pais')
      .where('estado.deletedAt IS NULL')
      .orderBy('estado.nombre', 'ASC');

    if (params.search) {
      qb.andWhere(
        '(estado.nombre ILIKE :search OR estado.codigo ILIKE :search OR pais.nombre ILIKE :search)',
        { search: `%${params.search}%` },
      );
    }
    if (params.paisId) {
      qb.andWhere('estado.paisId = :paisId', { paisId: params.paisId });
    }

    const total = await qb.getCount();
    const data = await qb
      .skip((params.page - 1) * params.limit)
      .take(params.limit)
      .getMany();

    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }
}

@Injectable()
export class MunicipiosRepository
  extends BaseRepository<Municipio>
  implements IMunicipioRepository
{
  protected get entityType(): new () => Municipio {
    return Municipio;
  }

  async findAll(): Promise<Municipio[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findByEstado(estadoId: string): Promise<Municipio[]> {
    return this.repository.find({
      where: { estadoId, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
    estadoId?: string;
  }): Promise<PaginatedResult<Municipio>> {
    const qb = this.repository
      .createQueryBuilder('municipio')
      .innerJoinAndSelect('municipio.estado', 'estado')
      .leftJoin('estado.pais', 'pais')
      .addSelect(['pais.id', 'pais.nombre'])
      .where('municipio.deletedAt IS NULL')
      .orderBy('municipio.nombre', 'ASC');

    if (params.search) {
      qb.andWhere('municipio.nombre ILIKE :search', {
        search: `%${params.search}%`,
      });
    }
    if (params.estadoId) {
      qb.andWhere('municipio.estadoId = :estadoId', {
        estadoId: params.estadoId,
      });
    } else if (params.paisId) {
      qb.andWhere('pais.id = :paisId', { paisId: params.paisId });
    }

    const total = await qb.getCount();
    const data = await qb
      .skip((params.page - 1) * params.limit)
      .take(params.limit)
      .getMany();

    return {
      data,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }
}
