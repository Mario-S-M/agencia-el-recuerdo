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
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ServiciosService } from './servicios.service';
import {
  CreateServicioDto,
  UpdateServicioDto,
} from './dto/create-servicio.dto';
import { Servicio, TipoServicio } from './entities/servicio.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

const notFoundExample = {
  statusCode: 404,
  message: 'Servicio con ID ... no encontrado',
  error: 'Not Found',
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

@ApiTags('servicios')
@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los tipos de servicio',
    description:
      'Retorna los 6 tipos de servicio de la agencia: ' +
      'Paquetes al Mar, Vuelos, Excursiones, Transporte, Cruceros, Bodas y XV.',
  })
  @ApiOkResponse({
    description: 'Lista de servicios',
    type: Servicio,
    isArray: true,
  })
  findAll(): Promise<Servicio[]> {
    return this.serviciosService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Listar servicios activos' })
  @ApiOkResponse({
    description: 'Servicios con activo=true',
    type: Servicio,
    isArray: true,
  })
  findAllActive(): Promise<Servicio[]> {
    return this.serviciosService.findAllActive();
  }

  @Get('por-tipo')
  @ApiOperation({ summary: 'Filtrar servicios por tipo' })
  @ApiQuery({
    name: 'tipo',
    enum: TipoServicio,
    required: true,
    example: TipoServicio.PAQUETE_MAR,
  })
  @ApiOkResponse({
    description: 'Servicios del tipo indicado',
    type: Servicio,
    isArray: true,
  })
  findByTipo(@Query('tipo') tipo: TipoServicio): Promise<Servicio[]> {
    return this.serviciosService.findByTipo(tipo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un servicio por ID' })
  @ApiParam({ name: 'id', description: 'UUID del servicio' })
  @ApiOkResponse({ description: 'Servicio encontrado', type: Servicio })
  @ApiNotFoundResponse({
    description: 'No existe el servicio',
    schema: { example: notFoundExample },
  })
  findOne(@Param('id') id: string): Promise<Servicio> {
    return this.serviciosService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear servicio (admin)' })
  @ApiCreatedResponse({ description: 'Servicio creado', type: Servicio })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  create(@Body() dto: CreateServicioDto): Promise<Servicio> {
    return this.serviciosService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar servicio (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del servicio' })
  @ApiOkResponse({ description: 'Servicio actualizado', type: Servicio })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateServicioDto,
  ): Promise<Servicio> {
    return this.serviciosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar servicio (soft delete, admin)' })
  @ApiParam({ name: 'id', description: 'UUID del servicio' })
  @ApiNoContentResponse({ description: 'Servicio eliminado lógicamente' })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  softDelete(@Param('id') id: string): Promise<void> {
    return this.serviciosService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar servicio eliminado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del servicio' })
  @ApiOkResponse({ description: 'Servicio restaurado', type: Servicio })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  restore(@Param('id') id: string): Promise<Servicio> {
    return this.serviciosService.restore(id);
  }
}
