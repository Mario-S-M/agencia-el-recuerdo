import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, DeepPartial } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { Hotel } from './entities/hotel.entity';
import { TipoHabitacion } from './entities/tipo-habitacion.entity';
import { PeriodoHotel } from './entities/periodo-hotel.entity';
import { TarifaPeriodo } from './entities/tarifa-periodo.entity';
import { IHotelRepository } from './interfaces/hotel-repository.interface';
import { BaseRepository } from '../common/base/base.repository';

@Injectable()
export class HotelesRepository
  extends BaseRepository<Hotel>
  implements IHotelRepository
{
  protected get entityType(): new () => Hotel {
    return Hotel;
  }

  private get tipoRepo() {
    return AppDataSource.getRepository(TipoHabitacion);
  }
  private get periodoRepo() {
    return AppDataSource.getRepository(PeriodoHotel);
  }
  private get tarifaRepo() {
    return AppDataSource.getRepository(TarifaPeriodo);
  }

  async findAll(): Promise<Hotel[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { nombre: 'ASC' },
      relations: {
        tiposHabitacion: true,
        periodos: { tarifas: { tipoHabitacion: true } },
      },
    });
  }

  async findAllActive(): Promise<Hotel[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      order: { nombre: 'ASC' },
    });
  }

  async findWithRelations(id: string): Promise<Hotel | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: {
        tiposHabitacion: true,
        periodos: { tarifas: { tipoHabitacion: true } },
      },
    });
  }

  async save(entity: DeepPartial<Hotel>): Promise<Hotel> {
    const created = this.repository.create(entity);
    const saved = await this.repository.save(created);
    const result = await this.findWithRelations(saved.id);
    if (!result)
      throw new NotFoundException(`Hotel recién creado no encontrado`);
    return result;
  }

  async update(id: string, entity: DeepPartial<Hotel>): Promise<Hotel> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.repository.update(id, entity as any);
    const updated = await this.findWithRelations(id);
    if (!updated) throw new NotFoundException(`Hotel ${id} no encontrado`);
    return updated;
  }

  // ── Tipos de habitación ──────────────────────────────────────────────────

  async findTipoHabitacionById(id: string): Promise<TipoHabitacion | null> {
    return this.tipoRepo.findOne({ where: { id, deletedAt: IsNull() } });
  }

  async saveTipoHabitacion(
    entity: Partial<TipoHabitacion>,
  ): Promise<TipoHabitacion> {
    const created = this.tipoRepo.create(entity);
    return this.tipoRepo.save(created);
  }

  async updateTipoHabitacion(
    id: string,
    entity: Partial<TipoHabitacion>,
  ): Promise<TipoHabitacion> {
    await this.tipoRepo.update(id, entity);
    const updated = await this.findTipoHabitacionById(id);
    if (!updated)
      throw new NotFoundException(`TipoHabitacion ${id} no encontrado`);
    return updated;
  }

  async deleteTipoHabitacion(id: string): Promise<void> {
    await this.tipoRepo.update(id, {
      deletedAt: new Date(),
    } as Partial<TipoHabitacion>);
  }

  // ── Periodos ─────────────────────────────────────────────────────────────

  async findPeriodoById(id: string): Promise<PeriodoHotel | null> {
    return this.periodoRepo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: { tarifas: { tipoHabitacion: true } },
    });
  }

  async savePeriodo(entity: Partial<PeriodoHotel>): Promise<PeriodoHotel> {
    const created = this.periodoRepo.create(entity);
    const saved = await this.periodoRepo.save(created);
    return this.findPeriodoById(saved.id) as Promise<PeriodoHotel>;
  }

  async updatePeriodo(
    id: string,
    entity: Partial<PeriodoHotel>,
  ): Promise<PeriodoHotel> {
    await this.periodoRepo.update(id, entity);
    const updated = await this.findPeriodoById(id);
    if (!updated) throw new NotFoundException(`Periodo ${id} no encontrado`);
    return updated;
  }

  async deletePeriodo(id: string): Promise<void> {
    await this.periodoRepo.update(id, {
      deletedAt: new Date(),
    } as Partial<PeriodoHotel>);
  }

  // ── Tarifas ──────────────────────────────────────────────────────────────

  async findTarifaById(id: string): Promise<TarifaPeriodo | null> {
    return this.tarifaRepo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: { tipoHabitacion: true },
    });
  }

  async saveTarifa(entity: Partial<TarifaPeriodo>): Promise<TarifaPeriodo> {
    const created = this.tarifaRepo.create(entity);
    const saved = await this.tarifaRepo.save(created);
    return this.findTarifaById(saved.id) as Promise<TarifaPeriodo>;
  }

  async updateTarifa(
    id: string,
    entity: Partial<TarifaPeriodo>,
  ): Promise<TarifaPeriodo> {
    await this.tarifaRepo.update(id, entity);
    const updated = await this.findTarifaById(id);
    if (!updated) throw new NotFoundException(`Tarifa ${id} no encontrada`);
    return updated;
  }

  async deleteTarifa(id: string): Promise<void> {
    await this.tarifaRepo.update(id, {
      deletedAt: new Date(),
    } as Partial<TarifaPeriodo>);
  }
}
