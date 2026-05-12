import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { HotelesService } from './hoteles.service';
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
import { Hotel } from './entities/hotel.entity';
import { TipoHabitacion } from './entities/tipo-habitacion.entity';
import { PeriodoHotel } from './entities/periodo-hotel.entity';
import { TarifaPeriodo } from './entities/tarifa-periodo.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('hoteles')
@Controller('hoteles')
export class HotelesController {
  constructor(private readonly hotelesService: HotelesService) {}

  // ── Hoteles ──────────────────────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Listar todos los hoteles' })
  @ApiOkResponse({ type: Hotel, isArray: true })
  findAll(): Promise<Hotel[]> {
    return this.hotelesService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Listar hoteles activos' })
  @ApiOkResponse({ type: Hotel, isArray: true })
  findAllActive(): Promise<Hotel[]> {
    return this.hotelesService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener hotel con todas sus relaciones' })
  @ApiParam({ name: 'id', description: 'UUID del hotel' })
  @ApiOkResponse({ type: Hotel })
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Hotel> {
    return this.hotelesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear hotel (admin)' })
  @ApiCreatedResponse({ type: Hotel })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  create(@Body() dto: CreateHotelDto): Promise<Hotel> {
    return this.hotelesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar hotel (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del hotel' })
  @ApiOkResponse({ type: Hotel })
  @ApiNotFoundResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar hotel (soft delete, admin)' })
  @ApiParam({ name: 'id', description: 'UUID del hotel' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  softDelete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.hotelesService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar hotel eliminado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del hotel' })
  @ApiOkResponse({ type: Hotel })
  restore(@Param('id', ParseUUIDPipe) id: string): Promise<Hotel> {
    return this.hotelesService.restore(id);
  }

  // ── Tipos de habitación ──────────────────────────────────────────────────

  @Post(':hotelId/tipos-habitacion')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar tipo de habitación al hotel (admin)' })
  @ApiParam({ name: 'hotelId', description: 'UUID del hotel' })
  @ApiCreatedResponse({ type: TipoHabitacion })
  createTipoHabitacion(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Body() dto: CreateTipoHabitacionDto,
  ): Promise<TipoHabitacion> {
    return this.hotelesService.createTipoHabitacion(hotelId, dto);
  }

  @Patch(':hotelId/tipos-habitacion/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar tipo de habitación (admin)' })
  updateTipoHabitacion(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTipoHabitacionDto,
  ): Promise<TipoHabitacion> {
    return this.hotelesService.updateTipoHabitacion(hotelId, id, dto);
  }

  @Delete(':hotelId/tipos-habitacion/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar tipo de habitación (admin)' })
  deleteTipoHabitacion(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.hotelesService.deleteTipoHabitacion(hotelId, id);
  }

  // ── Periodos ─────────────────────────────────────────────────────────────

  @Post(':hotelId/periodos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear periodo tarifario (admin)' })
  @ApiParam({ name: 'hotelId', description: 'UUID del hotel' })
  @ApiCreatedResponse({ type: PeriodoHotel })
  createPeriodo(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Body() dto: CreatePeriodoHotelDto,
  ): Promise<PeriodoHotel> {
    return this.hotelesService.createPeriodo(hotelId, dto);
  }

  @Patch(':hotelId/periodos/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar periodo tarifario (admin)' })
  updatePeriodo(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePeriodoHotelDto,
  ): Promise<PeriodoHotel> {
    return this.hotelesService.updatePeriodo(hotelId, id, dto);
  }

  @Delete(':hotelId/periodos/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar periodo tarifario (admin)' })
  deletePeriodo(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.hotelesService.deletePeriodo(hotelId, id);
  }

  // ── Tarifas ──────────────────────────────────────────────────────────────

  @Post(':hotelId/periodos/:periodoId/tarifas')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar tarifa a un periodo (admin)' })
  @ApiCreatedResponse({ type: TarifaPeriodo })
  createTarifa(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('periodoId', ParseUUIDPipe) periodoId: string,
    @Body() dto: CreateTarifaPeriodoDto,
  ): Promise<TarifaPeriodo> {
    return this.hotelesService.createTarifa(hotelId, periodoId, dto);
  }

  @Patch(':hotelId/periodos/:periodoId/tarifas/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar tarifa (admin)' })
  updateTarifa(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('periodoId', ParseUUIDPipe) periodoId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTarifaPeriodoDto,
  ): Promise<TarifaPeriodo> {
    return this.hotelesService.updateTarifa(hotelId, periodoId, id, dto);
  }

  @Delete(':hotelId/periodos/:periodoId/tarifas/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar tarifa (admin)' })
  deleteTarifa(
    @Param('hotelId', ParseUUIDPipe) hotelId: string,
    @Param('periodoId', ParseUUIDPipe) periodoId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.hotelesService.deleteTarifa(hotelId, periodoId, id);
  }
}
