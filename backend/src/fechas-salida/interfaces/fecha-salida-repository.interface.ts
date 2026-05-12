import { FechaSalida } from '../entities/fecha-salida.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';

export interface IFechaSalidaRepository extends IBaseRepository<FechaSalida> {
  findAll(): Promise<FechaSalida[]>;
  findAllActive(): Promise<FechaSalida[]>;
  findByPaquete(paqueteId: string): Promise<FechaSalida[]>;
  findProximas(): Promise<FechaSalida[]>;
}
