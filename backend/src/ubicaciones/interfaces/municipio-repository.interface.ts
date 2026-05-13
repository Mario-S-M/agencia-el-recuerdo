import { Municipio } from '../entities/municipio.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';

export interface IMunicipioRepository extends IBaseRepository<Municipio> {
  findAll(): Promise<Municipio[]>;
  findByEstado(estadoId: string): Promise<Municipio[]>;
  findPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
    estadoId?: string;
  }): Promise<PaginatedResult<Municipio>>;
}
