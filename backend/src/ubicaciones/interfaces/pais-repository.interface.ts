import { Pais } from '../entities/pais.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

export interface IPaisRepository extends IBaseRepository<Pais> {
  findAll(): Promise<Pais[]>;
  findByContinente(continente: string): Promise<Pais[]>;
  findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    continente?: string;
  }): Promise<PaginatedResult<Pais>>;
}
