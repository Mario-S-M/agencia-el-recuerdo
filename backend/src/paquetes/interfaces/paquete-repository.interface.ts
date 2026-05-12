import { Paquete } from '../entities/paquete.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';

export interface IPaqueteRepository extends IBaseRepository<Paquete> {
  findAll(): Promise<Paquete[]>;
  findAllActive(): Promise<Paquete[]>;
  findAllDestacados(): Promise<Paquete[]>;
  findByDestino(destinoId: string): Promise<Paquete[]>;
}
