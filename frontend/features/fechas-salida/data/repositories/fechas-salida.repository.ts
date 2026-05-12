import type { IFechasSalidaRepository } from '../../domain/repositories/fechas-salida.repository.interface';
import type { FechaSalidaAdmin, PaqueteResumen, CreateFechaSalidaInput, UpdateFechaSalidaInput, OpcionHotel, CreateOpcionHotelInput, TransporteAdicional, CreateTransporteAdicionalInput } from '../../domain/entities/fechas-salida.types';
import type { FechaSalidaDTO, PaqueteResumenDTO, DestinoInfoDTO, ServicioInfoDTO, OpcionHotelDTO, TransporteAdicionalDTO } from '../dto/fechas-salida.schemas';
import type { CreateFechaSalidaDTO } from '../dto/fechas-salida.schemas';
import { fechasSalidaApi } from '../api/fechas-salida.api';

function toPaqueteResumen(dto: PaqueteResumenDTO) {
  return {
    id: dto.id,
    nombre: dto.nombre,
    destino: { id: dto.destino.id, nombre: dto.destino.nombre, pais: dto.destino.pais },
    servicios: dto.servicios.map((s) => ({ id: s.id, nombre: s.nombre, tipo: s.tipo })),
  };
}

function toOpcionHotel(dto: OpcionHotelDTO): OpcionHotel {
  return {
    id: dto.id,
    fechaSalidaId: dto.fechaSalidaId,
    hotelId: dto.hotelId,
    hotelNombre: dto.hotelNombre,
    tipoHabitacionId: dto.tipoHabitacionId,
    tipoHabitacionNombre: dto.tipoHabitacionNombre,
    regimen: dto.regimen,
    precio: dto.precio,
    activo: dto.activo,
  };
}

function toTransporte(dto: TransporteAdicionalDTO): TransporteAdicional {
  return {
    id: dto.id,
    fechaSalidaId: dto.fechaSalidaId,
    descripcion: dto.descripcion,
    tipo: dto.tipo,
    precio: dto.precio,
    activo: dto.activo,
  };
}

function toDomain(dto: FechaSalidaDTO): FechaSalidaAdmin {
  return {
    id: dto.id,
    paqueteId: dto.paqueteId,
    paquete: toPaqueteResumen(dto.paquete),
    fechaSalida: dto.fechaSalida,
    fechaRegreso: dto.fechaRegreso,
    cupoMaximo: dto.cupoMaximo,
    cupoMinimo: dto.cupoMinimo,
    cupoDisponible: dto.cupoDisponible,
    activo: dto.activo,
    opcionesHotel: dto.opcionesHotel.map(toOpcionHotel),
    transportesAdicionales: dto.transportesAdicionales.map(toTransporte),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

function toCreateDTO(input: CreateFechaSalidaInput): CreateFechaSalidaDTO {
  return {
    paqueteId: input.paqueteId,
    fechaSalida: input.fechaSalida,
    fechaRegreso: input.fechaRegreso,
    cupoMaximo: input.cupoMaximo,
    cupoMinimo: input.cupoMinimo,
    cupoDisponible: input.cupoDisponible,
    activo: input.activo,
    opcionesHotel: input.opcionesHotel,
    transportesAdicionales: input.transportesAdicionales,
  };
}

function findAddedItem<T extends { id: string }>(
  items: T[],
  filterFn: (item: T) => boolean,
): T {
  const found = items.find(filterFn);
  if (!found) throw new Error('Error al obtener el elemento creado');
  return found;
}

export class FechasSalidaRepository implements IFechasSalidaRepository {
  async findAll(): Promise<FechaSalidaAdmin[]> {
    const dtos = await fechasSalidaApi.findAll();
    return dtos.map(toDomain);
  }

  async getPaquetes(): Promise<PaqueteResumen[]> {
    const dtos = await fechasSalidaApi.getPaquetes();
    return dtos.map(toPaqueteResumen);
  }

  async create(input: CreateFechaSalidaInput): Promise<FechaSalidaAdmin> {
    const dto = await fechasSalidaApi.create(toCreateDTO(input));
    return toDomain(dto);
  }

  async update(id: string, input: UpdateFechaSalidaInput): Promise<FechaSalidaAdmin> {
    const dto = await fechasSalidaApi.update(id, input);
    return toDomain(dto);
  }

  async delete(id: string): Promise<void> {
    await fechasSalidaApi.delete(id);
  }

  async createOpcionHotel(fechaSalidaId: string, input: CreateOpcionHotelInput): Promise<OpcionHotel> {
    const dto = await fechasSalidaApi.createOpcionHotel(fechaSalidaId, input);
    const updated = toDomain(dto);
    return findAddedItem(updated.opcionesHotel, (o) => o.hotelId === input.hotelId && o.tipoHabitacionId === input.tipoHabitacionId);
  }

  async deleteOpcionHotel(fechaSalidaId: string, id: string): Promise<void> {
    await fechasSalidaApi.deleteOpcionHotel(fechaSalidaId, id);
  }

  async createTransporte(fechaSalidaId: string, input: CreateTransporteAdicionalInput): Promise<TransporteAdicional> {
    const dto = await fechasSalidaApi.createTransporte(fechaSalidaId, input);
    const updated = toDomain(dto);
    return findAddedItem(updated.transportesAdicionales, (t) => t.descripcion === input.descripcion && t.tipo === input.tipo);
  }

  async deleteTransporte(fechaSalidaId: string, id: string): Promise<void> {
    await fechasSalidaApi.deleteTransporte(fechaSalidaId, id);
  }
}
