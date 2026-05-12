import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  FindOneOptions,
  DeepPartial,
} from 'typeorm';
import { AppDataSource } from '../../config/database.config';
import { BaseEntity } from './base.entity';
import { IBaseRepository } from '../interfaces/base-repository.interface';

@Injectable()
export abstract class BaseRepository<
  T extends BaseEntity,
> implements IBaseRepository<T> {
  protected abstract get entityType(): new () => T;

  protected get repository(): Repository<T> {
    return AppDataSource.getRepository(this.entityType);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    const where = {
      ...options?.where,
      deletedAt: null,
    } as FindManyOptions<T>['where'];
    return this.repository.find({ ...options, where });
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    const where = {
      ...options.where,
      deletedAt: null,
    } as FindOneOptions<T>['where'];
    return this.repository.findOne({ ...options, where });
  }

  async findById(id: string): Promise<T | null> {
    return this.findOne({ where: { id } as FindOneOptions<T>['where'] });
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    const created = this.repository.create(entity);
    const saved = await this.repository.save(created);
    const result = await this.findById(saved.id);
    if (!result)
      throw new NotFoundException(`Entidad recién creada no encontrada`);
    return result;
  }

  async update(id: string, entity: DeepPartial<T>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.repository.update(id, entity as any);
    const updated = await this.findById(id);
    if (!updated) throw new NotFoundException(`Entidad ${id} no encontrada`);
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.repository.update(id, { deletedAt: new Date() } as any);
  }

  async restore(id: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.repository.update(id, { deletedAt: null } as any);
  }

  async exists(options: FindOneOptions<T>): Promise<boolean> {
    const count = await this.repository.count({ where: options.where });
    return count > 0;
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    const where = {
      ...options?.where,
      deletedAt: null,
    } as FindManyOptions<T>['where'];
    return this.repository.count({ ...options, where });
  }
}
