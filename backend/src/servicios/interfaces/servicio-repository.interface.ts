import { Servicio, TipoServicio } from '../entities/servicio.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';

export interface IServicioRepository extends IBaseRepository<Servicio> {
  findAll(): Promise<Servicio[]>;
  findAllActive(): Promise<Servicio[]>;
  findByTipo(tipo: TipoServicio): Promise<Servicio[]>;
}
