import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { FechasSalidaService } from './fechas-salida.service';
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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

const notFoundExample = {
  statusCode: 404,
  message: 'Fecha de salida con ID ... no encontrada',
  error: 'Not Found',
};
const badRequestExample = {
  statusCode: 400,
  message: 'La fecha de regreso debe ser posterior a la fecha de salida',
  error: 'Bad Request',
};
const unauthorizedExample = {
  statusCode: 401,
  message: 'Unauthorized',
  error: 'Unauthorized',
};
const forbiddenExample = {
  statusCode: 403,
  message: 'Forbidden resource',
  error: 'Forbidden',
};

@ApiTags('fechas-salida')
@Controller('fechas-salida')
export class FechasSalidaController {
  constructor(private readonly fechasSalidaService: FechasSalidaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las fechas de salida' })
  @ApiOkResponse({ type: FechaSalida, isArray: true })
  findAll(): Promise<FechaSalida[]> {
    return this.fechasSalidaService.findAll();
  }

  @Get('activas')
  @ApiOperation({ summary: 'Listar fechas de salida activas' })
  @ApiOkResponse({ type: FechaSalida, isArray: true })
  findAllActive(): Promise<FechaSalida[]> {
    return this.fechasSalidaService.findAllActive();
  }

  @Get('proximas')
  @ApiOperation({
    summary: 'Fechas de salida próximas (desde hoy en adelante)',
  })
  @ApiOkResponse({ type: FechaSalida, isArray: true })
  findProximas(): Promise<FechaSalida[]> {
    return this.fechasSalidaService.findProximas();
  }

  @Get('por-paquete')
  @ApiOperation({ summary: 'Filtrar fechas de salida por paquete' })
  @ApiQuery({ name: 'paqueteId', required: true })
  @ApiOkResponse({ type: FechaSalida, isArray: true })
  findByPaquete(@Query('paqueteId') paqueteId: string): Promise<FechaSalida[]> {
    return this.fechasSalidaService.findByPaquete(paqueteId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una fecha de salida por ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: FechaSalida })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  findOne(@Param('id') id: string): Promise<FechaSalida> {
    return this.fechasSalidaService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear fecha de salida (admin)' })
  @ApiCreatedResponse({ type: FechaSalida })
  @ApiBadRequestResponse({ schema: { example: badRequestExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  create(@Body() dto: CreateFechaSalidaDto): Promise<FechaSalida> {
    return this.fechasSalidaService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar fecha de salida (admin)' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: FechaSalida })
  @ApiBadRequestResponse({ schema: { example: badRequestExample } })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFechaSalidaDto,
  ): Promise<FechaSalida> {
    return this.fechasSalidaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar fecha de salida (soft delete, admin)' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  softDelete(@Param('id') id: string): Promise<void> {
    return this.fechasSalidaService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar fecha eliminada (admin)' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: FechaSalida })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  restore(@Param('id') id: string): Promise<FechaSalida> {
    return this.fechasSalidaService.restore(id);
  }

  // ── OpcionHotel ─────────────────────────────────────────────────────────────

  @Post(':id/opciones-hotel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agregar opción de hotel a una fecha de salida (admin)',
  })
  @ApiParam({ name: 'id', description: 'UUID de la fecha de salida' })
  @ApiCreatedResponse({ type: OpcionHotel })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  addOpcionHotel(
    @Param('id') id: string,
    @Body() dto: CreateOpcionHotelDto,
  ): Promise<OpcionHotel> {
    return this.fechasSalidaService.addOpcionHotel(id, dto);
  }

  @Patch(':id/opciones-hotel/:opcionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar opción de hotel (admin)' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'opcionId' })
  @ApiOkResponse({ type: OpcionHotel })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  updateOpcionHotel(
    @Param('id') id: string,
    @Param('opcionId') opcionId: string,
    @Body() dto: UpdateOpcionHotelDto,
  ): Promise<OpcionHotel> {
    return this.fechasSalidaService.updateOpcionHotel(id, opcionId, dto);
  }

  @Delete(':id/opciones-hotel/:opcionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar opción de hotel (admin)' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'opcionId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  removeOpcionHotel(
    @Param('id') id: string,
    @Param('opcionId') opcionId: string,
  ): Promise<void> {
    return this.fechasSalidaService.removeOpcionHotel(id, opcionId);
  }

  // ── TransporteAdicional ──────────────────────────────────────────────────────

  @Post(':id/transportes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agregar transporte adicional a una fecha de salida (admin)',
  })
  @ApiParam({ name: 'id', description: 'UUID de la fecha de salida' })
  @ApiCreatedResponse({ type: TransporteAdicional })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  addTransporte(
    @Param('id') id: string,
    @Body() dto: CreateTransporteAdicionalDto,
  ): Promise<TransporteAdicional> {
    return this.fechasSalidaService.addTransporte(id, dto);
  }

  @Patch(':id/transportes/:transporteId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar transporte adicional (admin)' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'transporteId' })
  @ApiOkResponse({ type: TransporteAdicional })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  updateTransporte(
    @Param('id') id: string,
    @Param('transporteId') transporteId: string,
    @Body() dto: UpdateTransporteAdicionalDto,
  ): Promise<TransporteAdicional> {
    return this.fechasSalidaService.updateTransporte(id, transporteId, dto);
  }

  @Delete(':id/transportes/:transporteId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar transporte adicional (admin)' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'transporteId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  removeTransporte(
    @Param('id') id: string,
    @Param('transporteId') transporteId: string,
  ): Promise<void> {
    return this.fechasSalidaService.removeTransporte(id, transporteId);
  }
}
