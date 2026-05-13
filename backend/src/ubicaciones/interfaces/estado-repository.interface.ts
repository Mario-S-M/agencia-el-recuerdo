import { Estado } from '../entities/estado.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

export interface IEstadoRepository extends IBaseRepository<Estado> {
  findAll(): Promise<Estado[]>;
  findByPais(paisId: string): Promise<Estado[]>;
  findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
  }): Promise<PaginatedResult<Estado>>;
}
