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
import { PaquetesService } from './paquetes.service';
import { CreatePaqueteDto, UpdatePaqueteDto } from './dto/create-paquete.dto';
import { Paquete } from './entities/paquete.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

const notFoundExample = {
  statusCode: 404,
  message: 'Paquete con ID ... no encontrado',
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

@ApiTags('paquetes')
@Controller('paquetes')
export class PaquetesController {
  constructor(private readonly paquetesService: PaquetesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los paquetes' })
  @ApiOkResponse({ type: Paquete, isArray: true })
  findAll(): Promise<Paquete[]> {
    return this.paquetesService.findAll();
  }

  @Get('activos')
  @ApiOperation({ summary: 'Listar paquetes activos' })
  @ApiOkResponse({ type: Paquete, isArray: true })
  findAllActive(): Promise<Paquete[]> {
    return this.paquetesService.findAllActive();
  }

  @Get('destacados')
  @ApiOperation({ summary: 'Listar paquetes destacados (para portada)' })
  @ApiOkResponse({ type: Paquete, isArray: true })
  findAllDestacados(): Promise<Paquete[]> {
    return this.paquetesService.findAllDestacados();
  }

  @Get('por-destino')
  @ApiOperation({ summary: 'Filtrar paquetes por destino' })
  @ApiQuery({ name: 'destinoId', required: true })
  @ApiOkResponse({ type: Paquete, isArray: true })
  findByDestino(@Query('destinoId') destinoId: string): Promise<Paquete[]> {
    return this.paquetesService.findByDestino(destinoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener paquete por ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Paquete })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  findOne(@Param('id') id: string): Promise<Paquete> {
    return this.paquetesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear paquete (admin)' })
  @ApiCreatedResponse({ type: Paquete })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  create(@Body() dto: CreatePaqueteDto): Promise<Paquete> {
    return this.paquetesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar paquete (admin)' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Paquete })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaqueteDto,
  ): Promise<Paquete> {
    return this.paquetesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar paquete (soft delete, admin)' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  softDelete(@Param('id') id: string): Promise<void> {
    return this.paquetesService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar paquete eliminado (admin)' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Paquete })
  @ApiNotFoundResponse({ schema: { example: notFoundExample } })
  @ApiUnauthorizedResponse({ schema: { example: unauthorizedExample } })
  @ApiForbiddenResponse({ schema: { example: forbiddenExample } })
  restore(@Param('id') id: string): Promise<Paquete> {
    return this.paquetesService.restore(id);
  }
}
