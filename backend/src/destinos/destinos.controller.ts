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
import { DestinosService } from './destinos.service';
import { CreateDestinoDto, UpdateDestinoDto } from './dto/create-destino.dto';
import { Destino } from './entities/destino.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

const notFoundExample = {
  statusCode: 404,
  message: 'Destino con ID ... no encontrado',
  error: 'Not Found',
};
const badUuidExample = {
  statusCode: 400,
  message: 'Validation failed (uuid is expected)',
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

@ApiTags('destinos')
@Controller('destinos')
export class DestinosController {
  constructor(private readonly destinosService: DestinosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los destinos' })
  @ApiOkResponse({
    description: 'Lista de destinos',
    type: Destino,
    isArray: true,
  })
  findAll(): Promise<Destino[]> {
    return this.destinosService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Listar destinos activos' })
  @ApiOkResponse({
    description: 'Destinos con activo=true',
    type: Destino,
    isArray: true,
  })
  findAllActive(): Promise<Destino[]> {
    return this.destinosService.findAllActive();
  }

  @Get('destacados')
  @ApiOperation({ summary: 'Listar destinos destacados (para portada)' })
  @ApiOkResponse({
    description: 'Destinos destacados y activos',
    type: Destino,
    isArray: true,
  })
  findAllDestacados(): Promise<Destino[]> {
    return this.destinosService.findAllDestacados();
  }

  @Get('por-pais')
  @ApiOperation({ summary: 'Filtrar destinos por país' })
  @ApiQuery({ name: 'pais', required: true, example: 'México' })
  @ApiOkResponse({
    description: 'Destinos del país indicado',
    type: Destino,
    isArray: true,
  })
  findByPais(@Query('pais') pais: string): Promise<Destino[]> {
    return this.destinosService.findByPais(pais);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un destino por ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del destino',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @ApiOkResponse({ description: 'Destino encontrado', type: Destino })
  @ApiNotFoundResponse({
    description: 'No existe el destino',
    schema: { example: notFoundExample },
  })
  @ApiBadRequestResponse({
    description: 'UUID inválido',
    schema: { example: badUuidExample },
  })
  findOne(@Param('id') id: string): Promise<Destino> {
    return this.destinosService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear nuevo destino (admin)' })
  @ApiCreatedResponse({ description: 'Destino creado', type: Destino })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  create(@Body() dto: CreateDestinoDto): Promise<Destino> {
    return this.destinosService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar destino (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del destino' })
  @ApiOkResponse({ description: 'Destino actualizado', type: Destino })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDestinoDto,
  ): Promise<Destino> {
    return this.destinosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar destino (soft delete, admin)' })
  @ApiParam({ name: 'id', description: 'UUID del destino' })
  @ApiNoContentResponse({ description: 'Destino eliminado lógicamente' })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  softDelete(@Param('id') id: string): Promise<void> {
    return this.destinosService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar destino eliminado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID del destino' })
  @ApiOkResponse({ description: 'Destino restaurado', type: Destino })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  restore(@Param('id') id: string): Promise<Destino> {
    return this.destinosService.restore(id);
  }
}
