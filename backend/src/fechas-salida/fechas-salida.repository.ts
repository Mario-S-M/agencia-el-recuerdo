import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { FechaSalida } from './entities/fecha-salida.entity';
import { OpcionHotel } from './entities/opcion-hotel.entity';
import { TransporteAdicional } from './entities/transporte-adicional.entity';
import { IFechaSalidaRepository } from './interfaces/fecha-salida-repository.interface';
import { BaseRepository } from '../common/base/base.repository';

const FECHA_RELATIONS = [
  'paquete',
  'paquete.destino',
  'paquete.servicios',
  'opcionesHotel',
  'opcionesHotel.hotel',
  'transportesAdicionales',
];

@Injectable()
export class FechasSalidaRepository
  extends BaseRepository<FechaSalida>
  implements IFechaSalidaRepository
{
  protected get entityType(): new () => FechaSalida {
    return FechaSalida;
  }

  private get opcionesRepo() {
    return AppDataSource.getRepository(OpcionHotel);
  }

  private get transportesRepo() {
    return AppDataSource.getRepository(TransporteAdicional);
  }

  async findAll(): Promise<FechaSalida[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      relations: FECHA_RELATIONS,
      order: { fechaSalida: 'ASC' },
    });
  }

  async findAllActive(): Promise<FechaSalida[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      relations: FECHA_RELATIONS,
      order: { fechaSalida: 'ASC' },
    });
  }

  async findById(id: string): Promise<FechaSalida | null> {
    return this.findOne({
      where: { id },
      relations: FECHA_RELATIONS,
    });
  }

  async findByPaquete(paqueteId: string): Promise<FechaSalida[]> {
    return this.repository.find({
      where: { paqueteId, deletedAt: IsNull() },
      relations: FECHA_RELATIONS,
      order: { fechaSalida: 'ASC' },
    });
  }

  async findProximas(): Promise<FechaSalida[]> {
    const hoy = new Date();
    return this.repository.find({
      where: {
        activo: true,
        deletedAt: IsNull(),
        fechaSalida: MoreThanOrEqual(hoy),
      },
      relations: FECHA_RELATIONS,
      order: { fechaSalida: 'ASC' },
    });
  }

  // ── OpcionHotel ─────────────────────────────────────────────────────────────

  async saveOpcion(entity: Partial<OpcionHotel>): Promise<OpcionHotel> {
    const created = this.opcionesRepo.create(entity);
    const saved = await this.opcionesRepo.save(created);
    return this.opcionesRepo.findOne({
      where: { id: saved.id },
      relations: ['hotel'],
    }) as Promise<OpcionHotel>;
  }

  async findOpcionById(id: string): Promise<OpcionHotel | null> {
    return this.opcionesRepo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['hotel'],
    });
  }

  async updateOpcion(
    id: string,
    entity: Partial<OpcionHotel>,
  ): Promise<OpcionHotel> {
    await this.opcionesRepo.update(id, entity);
    const updated = await this.findOpcionById(id);
    if (!updated)
      throw new NotFoundException(`Opción de hotel ${id} no encontrada`);
    return updated;
  }

  async deleteOpcion(id: string): Promise<void> {
    await this.opcionesRepo.update(id, {
      deletedAt: new Date(),
    } as Partial<OpcionHotel>);
  }

  // ── TransporteAdicional ──────────────────────────────────────────────────────

  async saveTransporte(
    entity: Partial<TransporteAdicional>,
  ): Promise<TransporteAdicional> {
    const created = this.transportesRepo.create(entity);
    return this.transportesRepo.save(created);
  }

  async findTransporteById(id: string): Promise<TransporteAdicional | null> {
    return this.transportesRepo.findOne({ where: { id, deletedAt: IsNull() } });
  }

  async updateTransporte(
    id: string,
    entity: Partial<TransporteAdicional>,
  ): Promise<TransporteAdicional> {
    await this.transportesRepo.update(id, entity);
    const updated = await this.findTransporteById(id);
    if (!updated)
      throw new NotFoundException(`Transporte adicional ${id} no encontrado`);
    return updated;
  }

  async deleteTransporte(id: string): Promise<void> {
    await this.transportesRepo.update(id, {
      deletedAt: new Date(),
    } as Partial<TransporteAdicional>);
  }
}
