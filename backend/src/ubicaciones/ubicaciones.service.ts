import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PaisesRepository,
  EstadosRepository,
  MunicipiosRepository,
} from './ubicaciones.repository';
import { CreatePaisDto, UpdatePaisDto } from './dto/create-pais.dto';
import { CreateEstadoDto, UpdateEstadoDto } from './dto/create-estado.dto';
import {
  CreateMunicipioDto,
  UpdateMunicipioDto,
} from './dto/create-municipio.dto';
import { Pais } from './entities/pais.entity';
import { Estado } from './entities/estado.entity';
import { Municipio } from './entities/municipio.entity';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class UbicacionesService {
  constructor(
    private readonly paisesRepository: PaisesRepository,
    private readonly estadosRepository: EstadosRepository,
    private readonly municipiosRepository: MunicipiosRepository,
  ) {}

  // ── Países ──

  async findAllPaises(): Promise<Pais[]> {
    return this.paisesRepository.findAll();
  }

  async findPaisesPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    continente?: string;
  }): Promise<PaginatedResult<Pais>> {
    return this.paisesRepository.findPaginated(params);
  }

  async findPaisesByContinente(continente: string): Promise<Pais[]> {
    return this.paisesRepository.findByContinente(continente);
  }

  async findOnePais(id: string): Promise<Pais> {
    const pais = await this.paisesRepository.findById(id);
    if (!pais) throw new NotFoundException(`País ${id} no encontrado`);
    return pais;
  }

  async createPais(dto: CreatePaisDto): Promise<Pais> {
    return this.paisesRepository.save({ ...dto });
  }

  async updatePais(id: string, dto: UpdatePaisDto): Promise<Pais> {
    await this.findOnePais(id);
    return this.paisesRepository.update(id, dto);
  }

  async deletePais(id: string): Promise<void> {
    await this.findOnePais(id);
    await this.paisesRepository.softDelete(id);
  }

  // ── Estados ──

  async findAllEstados(): Promise<Estado[]> {
    return this.estadosRepository.findAll();
  }

  async findEstadosPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
  }): Promise<PaginatedResult<Estado>> {
    return this.estadosRepository.findPaginated(params);
  }

  async findEstadosByPais(paisId: string): Promise<Estado[]> {
    return this.estadosRepository.findByPais(paisId);
  }

  async findOneEstado(id: string): Promise<Estado> {
    const estado = await this.estadosRepository.findById(id);
    if (!estado) throw new NotFoundException(`Estado ${id} no encontrado`);
    return estado;
  }

  async createEstado(dto: CreateEstadoDto): Promise<Estado> {
    await this.findOnePais(dto.paisId);
    return this.estadosRepository.save({ ...dto });
  }

  async updateEstado(id: string, dto: UpdateEstadoDto): Promise<Estado> {
    await this.findOneEstado(id);
    if (dto.paisId) await this.findOnePais(dto.paisId);
    return this.estadosRepository.update(id, dto);
  }

  async deleteEstado(id: string): Promise<void> {
    await this.findOneEstado(id);
    await this.estadosRepository.softDelete(id);
  }

  // ── Municipios ──

  async findAllMunicipios(): Promise<Municipio[]> {
    return this.municipiosRepository.findAll();
  }

  async findMunicipiosPaginated(params: {
    page: number;
    limit: number;
    search?: string;
    paisId?: string;
    estadoId?: string;
  }): Promise<PaginatedResult<Municipio>> {
    return this.municipiosRepository.findPaginated(params);
  }

  async findMunicipiosByEstado(estadoId: string): Promise<Municipio[]> {
    return this.municipiosRepository.findByEstado(estadoId);
  }

  async findOneMunicipio(id: string): Promise<Municipio> {
    const municipio = await this.municipiosRepository.findById(id);
    if (!municipio)
      throw new NotFoundException(`Municipio ${id} no encontrado`);
    return municipio;
  }

  async createMunicipio(dto: CreateMunicipioDto): Promise<Municipio> {
    await this.findOneEstado(dto.estadoId);
    return this.municipiosRepository.save({ ...dto });
  }

  async updateMunicipio(
    id: string,
    dto: UpdateMunicipioDto,
  ): Promise<Municipio> {
    await this.findOneMunicipio(id);
    if (dto.estadoId) await this.findOneEstado(dto.estadoId);
    return this.municipiosRepository.update(id, dto);
  }

  async deleteMunicipio(id: string): Promise<void> {
    await this.findOneMunicipio(id);
    await this.municipiosRepository.softDelete(id);
  }
}
