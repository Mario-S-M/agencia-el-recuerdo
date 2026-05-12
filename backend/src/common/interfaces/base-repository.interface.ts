import { FindManyOptions, FindOneOptions, DeepPartial } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

export interface IBaseRepository<T extends BaseEntity> {
  find(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  save(entity: DeepPartial<T>): Promise<T>;
  update(id: string, entity: DeepPartial<T>): Promise<T>;
  softDelete(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  exists(options: FindOneOptions<T>): Promise<boolean>;
  count(options?: FindManyOptions<T>): Promise<number>;
}
