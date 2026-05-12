import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FechasSalidaRepository } from './fechas-salida.repository';
import {
  CreateFechaSalidaDto,
  UpdateFechaSalidaDto,
} from './dto/create-fecha-salida.dto';
import {
  CreateOpcionHotelDto,
  UpdateOpcionHotelDto,
} from './dto/create-opcion-hotel.dto';
import {
  CreateTransporteAdicionalDto,
  UpdateTransporteAdicionalDto,
} from './dto/create-transporte-adicional.dto';
import { FechaSalida } from './entities/fecha-salida.entity';
import { OpcionHotel } from './entities/opcion-hotel.entity';
import { TransporteAdicional } from './entities/transporte-adicional.entity';

@Injectable()
export class FechasSalidaService {
  constructor(
    private readonly fechasSalidaRepository: FechasSalidaRepository,
  ) {}

  async findAll(): Promise<FechaSalida[]> {
    return this.fechasSalidaRepository.findAll();
  }

  async findAllActive(): Promise<FechaSalida[]> {
    return this.fechasSalidaRepository.findAllActive();
  }

  async findProximas(): Promise<FechaSalida[]> {
    return this.fechasSalidaRepository.findProximas();
  }

  async findOne(id: string): Promise<FechaSalida> {
    const fecha = await this.fechasSalidaRepository.findById(id);
    if (!fecha)
      throw new NotFoundException(`Fecha de salida con ID ${id} no encontrada`);
    return fecha;
  }

  async findByPaquete(paqueteId: string): Promise<FechaSalida[]> {
    return this.fechasSalidaRepository.findByPaquete(paqueteId);
  }

  async create(dto: CreateFechaSalidaDto): Promise<FechaSalida> {
    if (
      dto.fechaRegreso &&
      new Date(dto.fechaRegreso) <= new Date(dto.fechaSalida)
    ) {
      throw new BadRequestException(
        'La fecha de regreso debe ser posterior a la fecha de salida',
      );
    }
    if (dto.cupoMinimo > dto.cupoMaximo) {
      throw new BadRequestException(
        'El cupo mínimo no puede ser mayor al cupo máximo',
      );
    }
    if (dto.cupoDisponible > dto.cupoMaximo) {
      throw new BadRequestException(
        'El cupo disponible no puede ser mayor al cupo máximo',
      );
    }
    return this.fechasSalidaRepository.save({
      paqueteId: dto.paqueteId,
      fechaSalida: new Date(dto.fechaSalida),
      fechaRegreso: dto.fechaRegreso ? new Date(dto.fechaRegreso) : null,
      cupoMaximo: dto.cupoMaximo,
      cupoMinimo: dto.cupoMinimo,
      cupoDisponible: dto.cupoDisponible,
      activo: dto.activo ?? true,
    });
  }

  async update(id: string, dto: UpdateFechaSalidaDto): Promise<FechaSalida> {
    const existing = await this.findOne(id);

    const fechaSalida = dto.fechaSalida
      ? new Date(dto.fechaSalida)
      : existing.fechaSalida;
    const fechaRegreso = dto.fechaRegreso
      ? new Date(dto.fechaRegreso)
      : existing.fechaRegreso;

    if (fechaRegreso && fechaRegreso <= fechaSalida) {
      throw new BadRequestException(
        'La fecha de regreso debe ser posterior a la fecha de salida',
      );
    }

    const cupoMaximo = dto.cupoMaximo ?? existing.cupoMaximo;
    const cupoMinimo = dto.cupoMinimo ?? existing.cupoMinimo;
    const cupoDisponible = dto.cupoDisponible ?? existing.cupoDisponible;

    if (cupoMinimo > cupoMaximo) {
      throw new BadRequestException(
        'El cupo mínimo no puede ser mayor al cupo máximo',
      );
    }
    if (cupoDisponible > cupoMaximo) {
      throw new BadRequestException(
        'El cupo disponible no puede ser mayor al cupo máximo',
      );
    }

    const updateData: Partial<FechaSalida> = {};
    if (dto.fechaSalida !== undefined)
      updateData.fechaSalida = new Date(dto.fechaSalida);
    if (dto.fechaRegreso !== undefined)
      updateData.fechaRegreso = new Date(dto.fechaRegreso);
    if (dto.cupoMaximo !== undefined) updateData.cupoMaximo = dto.cupoMaximo;
    if (dto.cupoMinimo !== undefined) updateData.cupoMinimo = dto.cupoMinimo;
    if (dto.cupoDisponible !== undefined)
      updateData.cupoDisponible = dto.cupoDisponible;
    if (dto.activo !== undefined) updateData.activo = dto.activo;

    return this.fechasSalidaRepository.update(id, updateData);
  }

  async softDelete(id: string): Promise<void> {
    await this.findOne(id);
    await this.fechasSalidaRepository.softDelete(id);
  }

  async restore(id: string): Promise<FechaSalida> {
    const fecha = await this.fechasSalidaRepository.findById(id);
    if (!fecha)
      throw new NotFoundException(`Fecha de salida con ID ${id} no encontrada`);
    await this.fechasSalidaRepository.restore(id);
    return this.findOne(id);
  }

  // ── OpcionHotel ─────────────────────────────────────────────────────────────

  async addOpcionHotel(
    fechaSalidaId: string,
    dto: CreateOpcionHotelDto,
  ): Promise<OpcionHotel> {
    await this.findOne(fechaSalidaId);
    return this.fechasSalidaRepository.saveOpcion({
      fechaSalidaId,
      hotelId: dto.hotelId,
      descripcionHabitacion: dto.descripcionHabitacion ?? null,
      precio: dto.precio,
      activo: dto.activo ?? true,
    });
  }

  async updateOpcionHotel(
    fechaSalidaId: string,
    opcionId: string,
    dto: UpdateOpcionHotelDto,
  ): Promise<OpcionHotel> {
    const opcion = await this.fechasSalidaRepository.findOpcionById(opcionId);
    if (!opcion || opcion.fechaSalidaId !== fechaSalidaId) {
      throw new NotFoundException(
        `Opción de hotel ${opcionId} no encontrada en la fecha de salida ${fechaSalidaId}`,
      );
    }
    return this.fechasSalidaRepository.updateOpcion(opcionId, { ...dto });
  }

  async removeOpcionHotel(
    fechaSalidaId: string,
    opcionId: string,
  ): Promise<void> {
    const opcion = await this.fechasSalidaRepository.findOpcionById(opcionId);
    if (!opcion || opcion.fechaSalidaId !== fechaSalidaId) {
      throw new NotFoundException(
        `Opción de hotel ${opcionId} no encontrada en la fecha de salida ${fechaSalidaId}`,
      );
    }
    await this.fechasSalidaRepository.deleteOpcion(opcionId);
  }

  // ── TransporteAdicional ──────────────────────────────────────────────────────

  async addTransporte(
    fechaSalidaId: string,
    dto: CreateTransporteAdicionalDto,
  ): Promise<TransporteAdicional> {
    await this.findOne(fechaSalidaId);
    return this.fechasSalidaRepository.saveTransporte({
      fechaSalidaId,
      descripcion: dto.descripcion,
      tipoMonto: dto.tipoMonto,
      monto: dto.monto,
      activo: dto.activo ?? true,
    });
  }

  async updateTransporte(
    fechaSalidaId: string,
    transporteId: string,
    dto: UpdateTransporteAdicionalDto,
  ): Promise<TransporteAdicional> {
    const transporte =
      await this.fechasSalidaRepository.findTransporteById(transporteId);
    if (!transporte || transporte.fechaSalidaId !== fechaSalidaId) {
      throw new NotFoundException(
        `Transporte ${transporteId} no encontrado en la fecha de salida ${fechaSalidaId}`,
      );
    }
    return this.fechasSalidaRepository.updateTransporte(transporteId, {
      ...dto,
    });
  }

  async removeTransporte(
    fechaSalidaId: string,
    transporteId: string,
  ): Promise<void> {
    const transporte =
      await this.fechasSalidaRepository.findTransporteById(transporteId);
    if (!transporte || transporte.fechaSalidaId !== fechaSalidaId) {
      throw new NotFoundException(
        `Transporte ${transporteId} no encontrado en la fecha de salida ${fechaSalidaId}`,
      );
    }
    await this.fechasSalidaRepository.deleteTransporte(transporteId);
  }
}
