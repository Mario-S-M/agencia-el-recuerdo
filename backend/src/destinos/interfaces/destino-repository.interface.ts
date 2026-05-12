import { Destino } from '../entities/destino.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';

export interface IDestinoRepository extends IBaseRepository<Destino> {
  findAll(): Promise<Destino[]>;
  findAllActive(): Promise<Destino[]>;
  findAllDestacados(): Promise<Destino[]>;
  findByPais(pais: string): Promise<Destino[]>;
}
