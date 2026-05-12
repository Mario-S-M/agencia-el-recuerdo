import { Hotel } from '../entities/hotel.entity';
import { TipoHabitacion } from '../entities/tipo-habitacion.entity';
import { PeriodoHotel } from '../entities/periodo-hotel.entity';
import { TarifaPeriodo } from '../entities/tarifa-periodo.entity';
import { IBaseRepository } from '../../common/interfaces/base-repository.interface';

export interface IHotelRepository extends IBaseRepository<Hotel> {
  findAll(): Promise<Hotel[]>;
  findAllActive(): Promise<Hotel[]>;
  findWithRelations(id: string): Promise<Hotel | null>;

  saveTipoHabitacion(entity: Partial<TipoHabitacion>): Promise<TipoHabitacion>;
  updateTipoHabitacion(
    id: string,
    entity: Partial<TipoHabitacion>,
  ): Promise<TipoHabitacion>;
  deleteTipoHabitacion(id: string): Promise<void>;
  findTipoHabitacionById(id: string): Promise<TipoHabitacion | null>;

  savePeriodo(entity: Partial<PeriodoHotel>): Promise<PeriodoHotel>;
  updatePeriodo(
    id: string,
    entity: Partial<PeriodoHotel>,
  ): Promise<PeriodoHotel>;
  deletePeriodo(id: string): Promise<void>;
  findPeriodoById(id: string): Promise<PeriodoHotel | null>;

  saveTarifa(entity: Partial<TarifaPeriodo>): Promise<TarifaPeriodo>;
  updateTarifa(
    id: string,
    entity: Partial<TarifaPeriodo>,
  ): Promise<TarifaPeriodo>;
  deleteTarifa(id: string): Promise<void>;
  findTarifaById(id: string): Promise<TarifaPeriodo | null>;
}
