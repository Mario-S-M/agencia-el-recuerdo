import type { FechaSalidaAdmin, PaqueteResumen, CreateFechaSalidaInput, UpdateFechaSalidaInput, OpcionHotel, CreateOpcionHotelInput, TransporteAdicional, CreateTransporteAdicionalInput } from '../entities/fechas-salida.types';

export interface IFechasSalidaRepository {
  findAll(): Promise<FechaSalidaAdmin[]>;
  getPaquetes(): Promise<PaqueteResumen[]>;
  create(input: CreateFechaSalidaInput): Promise<FechaSalidaAdmin>;
  update(id: string, input: UpdateFechaSalidaInput): Promise<FechaSalidaAdmin>;
  delete(id: string): Promise<void>;
  createOpcionHotel(fechaSalidaId: string, input: CreateOpcionHotelInput): Promise<OpcionHotel>;
  deleteOpcionHotel(fechaSalidaId: string, id: string): Promise<void>;
  createTransporte(fechaSalidaId: string, input: CreateTransporteAdicionalInput): Promise<TransporteAdicional>;
  deleteTransporte(fechaSalidaId: string, id: string): Promise<void>;
}
