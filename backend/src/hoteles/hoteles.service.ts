import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HotelesRepository } from './hoteles.repository';
import { Hotel } from './entities/hotel.entity';
import { TipoHabitacion } from './entities/tipo-habitacion.entity';
import { PeriodoHotel } from './entities/periodo-hotel.entity';
import { TarifaPeriodo } from './entities/tarifa-periodo.entity';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import {
  CreateTipoHabitacionDto,
  UpdateTipoHabitacionDto,
} from './dto/create-tipo-habitacion.dto';
import {
  CreatePeriodoHotelDto,
  UpdatePeriodoHotelDto,
} from './dto/create-periodo-hotel.dto';
import {
  CreateTarifaPeriodoDto,
  UpdateTarifaPeriodoDto,
} from './dto/create-tarifa-periodo.dto';

@Injectable()
export class HotelesService {
  constructor(private readonly hotelesRepository: HotelesRepository) {}

  async findAll(): Promise<Hotel[]> {
    return this.hotelesRepository.findAll();
  }

  async findAllActive(): Promise<Hotel[]> {
    return this.hotelesRepository.findAllActive();
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelesRepository.findWithRelations(id);
    if (!hotel) throw new NotFoundException(`Hotel con ID ${id} no encontrado`);
    return hotel;
  }

  async create(dto: CreateHotelDto): Promise<Hotel> {
    return this.hotelesRepository.save({
      ...dto,
      activo: dto.activo ?? true,
      fotos: dto.fotos ?? [],
    });
  }

  async update(id: string, dto: UpdateHotelDto): Promise<Hotel> {
    await this.findOne(id);
    return this.hotelesRepository.update(id, dto);
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);
    await this.hotelesRepository.softDelete(id);
  }

  async restore(id: string): Promise<Hotel> {
    const hotel = await this.hotelesRepository.findById(id);
    if (!hotel) throw new NotFoundException(`Hotel con ID ${id} no encontrado`);
    await this.hotelesRepository.restore(id);
    return this.findOne(id);
  }

  // ── Tipos de habitación ──────────────────────────────────────────────────

  async createTipoHabitacion(
    hotelId: string,
    dto: CreateTipoHabitacionDto,
  ): Promise<TipoHabitacion> {
    await this.findOne(hotelId);
    return this.hotelesRepository.saveTipoHabitacion({
      ...dto,
      hotelId,
      activo: dto.activo ?? true,
      fotos: dto.fotos ?? [],
    });
  }

  async updateTipoHabitacion(
    hotelId: string,
    id: string,
    dto: UpdateTipoHabitacionDto,
  ): Promise<TipoHabitacion> {
    const tipo = await this.hotelesRepository.findTipoHabitacionById(id);
    if (!tipo || tipo.hotelId !== hotelId) {
      throw new NotFoundException(
        `TipoHabitacion ${id} no pertenece al hotel ${hotelId}`,
      );
    }
    return this.hotelesRepository.updateTipoHabitacion(id, dto);
  }

  async deleteTipoHabitacion(hotelId: string, id: string): Promise<void> {
    const tipo = await this.hotelesRepository.findTipoHabitacionById(id);
    if (!tipo || tipo.hotelId !== hotelId) {
      throw new NotFoundException(
        `TipoHabitacion ${id} no pertenece al hotel ${hotelId}`,
      );
    }
    await this.hotelesRepository.deleteTipoHabitacion(id);
  }

  // ── Periodos ─────────────────────────────────────────────────────────────

  async createPeriodo(
    hotelId: string,
    dto: CreatePeriodoHotelDto,
  ): Promise<PeriodoHotel> {
    await this.findOne(hotelId);
    return this.hotelesRepository.savePeriodo({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      fechaInicio: new Date(dto.fechaInicio),
      fechaFin: new Date(dto.fechaFin),
      hotelId,
      activo: dto.activo ?? true,
    });
  }

  async updatePeriodo(
    hotelId: string,
    id: string,
    dto: UpdatePeriodoHotelDto,
  ): Promise<PeriodoHotel> {
    const periodo = await this.hotelesRepository.findPeriodoById(id);
    if (!periodo || periodo.hotelId !== hotelId) {
      throw new NotFoundException(
        `Periodo ${id} no pertenece al hotel ${hotelId}`,
      );
    }
    const patch: Partial<PeriodoHotel> = {
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
      ...(dto.activo !== undefined && { activo: dto.activo }),
      ...(dto.fechaInicio !== undefined && {
        fechaInicio: new Date(dto.fechaInicio),
      }),
      ...(dto.fechaFin !== undefined && { fechaFin: new Date(dto.fechaFin) }),
    };
    return this.hotelesRepository.updatePeriodo(id, patch);
  }

  async deletePeriodo(hotelId: string, id: string): Promise<void> {
    const periodo = await this.hotelesRepository.findPeriodoById(id);
    if (!periodo || periodo.hotelId !== hotelId) {
      throw new NotFoundException(
        `Periodo ${id} no pertenece al hotel ${hotelId}`,
      );
    }
    await this.hotelesRepository.deletePeriodo(id);
  }

  // ── Tarifas ──────────────────────────────────────────────────────────────

  async createTarifa(
    hotelId: string,
    periodoId: string,
    dto: CreateTarifaPeriodoDto,
  ): Promise<TarifaPeriodo> {
    const periodo = await this.hotelesRepository.findPeriodoById(periodoId);
    if (!periodo || periodo.hotelId !== hotelId) {
      throw new NotFoundException(
        `Periodo ${periodoId} no pertenece al hotel ${hotelId}`,
      );
    }
    const tipo = await this.hotelesRepository.findTipoHabitacionById(
      dto.tipoHabitacionId,
    );
    if (!tipo || tipo.hotelId !== hotelId) {
      throw new BadRequestException(
        `TipoHabitacion ${dto.tipoHabitacionId} no pertenece al hotel ${hotelId}`,
      );
    }
    return this.hotelesRepository.saveTarifa({
      periodoId,
      tipoHabitacionId: dto.tipoHabitacionId,
      precio: dto.precio,
      activo: dto.activo ?? true,
    });
  }

  async updateTarifa(
    hotelId: string,
    periodoId: string,
    id: string,
    dto: UpdateTarifaPeriodoDto,
  ): Promise<TarifaPeriodo> {
    const periodo = await this.hotelesRepository.findPeriodoById(periodoId);
    if (!periodo || periodo.hotelId !== hotelId) {
      throw new NotFoundException(
        `Periodo ${periodoId} no pertenece al hotel ${hotelId}`,
      );
    }
    const tarifa = await this.hotelesRepository.findTarifaById(id);
    if (!tarifa || tarifa.periodoId !== periodoId) {
      throw new NotFoundException(
        `Tarifa ${id} no pertenece al periodo ${periodoId}`,
      );
    }
    return this.hotelesRepository.updateTarifa(id, dto);
  }

  async deleteTarifa(
    hotelId: string,
    periodoId: string,
    id: string,
  ): Promise<void> {
    const periodo = await this.hotelesRepository.findPeriodoById(periodoId);
    if (!periodo || periodo.hotelId !== hotelId) {
      throw new NotFoundException(
        `Periodo ${periodoId} no pertenece al hotel ${hotelId}`,
      );
    }
    const tarifa = await this.hotelesRepository.findTarifaById(id);
    if (!tarifa || tarifa.periodoId !== periodoId) {
      throw new NotFoundException(
        `Tarifa ${id} no pertenece al periodo ${periodoId}`,
      );
    }
    await this.hotelesRepository.deleteTarifa(id);
  }
}
