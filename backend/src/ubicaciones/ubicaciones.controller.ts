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
} from '@nestjs/swagger';
import { UbicacionesService } from './ubicaciones.service';
import { CreatePaisDto, UpdatePaisDto } from './dto/create-pais.dto';
import { CreateEstadoDto, UpdateEstadoDto } from './dto/create-estado.dto';
import {
  CreateMunicipioDto,
  UpdateMunicipioDto,
} from './dto/create-municipio.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  // ── Países ──

  @Get('paises')
  @ApiOperation({ summary: 'Listar países (opcionalmente paginados)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'continente', required: false })
  findAllPaises(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('continente') continente?: string,
  ) {
    if (page && limit) {
      return this.ubicacionesService.findPaisesPaginated({
        page: Math.max(1, parseInt(page, 10) || 1),
        limit: Math.min(100, Math.max(1, parseInt(limit, 10) || 10)),
        search,
        continente,
      });
    }
    return this.ubicacionesService.findAllPaises();
  }

  @Get('paises/por-continente')
  @ApiOperation({ summary: 'Filtrar países por continente' })
  @ApiQuery({ name: 'continente', required: true })
  findPaisesByContinente(@Query('continente') continente: string) {
    return this.ubicacionesService.findPaisesByContinente(continente);
  }

  @Get('paises/:id')
  @ApiOperation({ summary: 'Obtener un país por ID' })
  @ApiParam({ name: 'id', description: 'UUID del país' })
  findOnePais(@Param('id') id: string) {
    return this.ubicacionesService.findOnePais(id);
  }

  @Post('paises')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear país (admin)' })
  createPais(@Body() dto: CreatePaisDto) {
    return this.ubicacionesService.createPais(dto);
  }

  @Patch('paises/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar país (admin)' })
  updatePais(@Param('id') id: string, @Body() dto: UpdatePaisDto) {
    return this.ubicacionesService.updatePais(id, dto);
  }

  @Delete('paises/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar país (soft delete, admin)' })
  deletePais(@Param('id') id: string) {
    return this.ubicacionesService.deletePais(id);
  }

  // ── Estados ──

  @Get('estados')
  @ApiOperation({ summary: 'Listar estados (opcionalmente paginados)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'paisId', required: false })
  findAllEstados(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('paisId') paisId?: string,
  ) {
    if (page && limit) {
      return this.ubicacionesService.findEstadosPaginated({
        page: Math.max(1, parseInt(page, 10) || 1),
        limit: Math.min(100, Math.max(1, parseInt(limit, 10) || 10)),
        search,
        paisId,
      });
    }
    return this.ubicacionesService.findAllEstados();
  }

  @Get('estados/por-pais')
  @ApiOperation({ summary: 'Filtrar estados por país' })
  @ApiQuery({ name: 'paisId', required: true })
  findEstadosByPais(@Query('paisId') paisId: string) {
    return this.ubicacionesService.findEstadosByPais(paisId);
  }

  @Get('estados/:id')
  @ApiOperation({ summary: 'Obtener un estado por ID' })
  @ApiParam({ name: 'id', description: 'UUID del estado' })
  findOneEstado(@Param('id') id: string) {
    return this.ubicacionesService.findOneEstado(id);
  }

  @Post('estados')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear estado (admin)' })
  createEstado(@Body() dto: CreateEstadoDto) {
    return this.ubicacionesService.createEstado(dto);
  }

  @Patch('estados/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar estado (admin)' })
  updateEstado(@Param('id') id: string, @Body() dto: UpdateEstadoDto) {
    return this.ubicacionesService.updateEstado(id, dto);
  }

  @Delete('estados/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar estado (soft delete, admin)' })
  deleteEstado(@Param('id') id: string) {
    return this.ubicacionesService.deleteEstado(id);
  }

  // ── Municipios ──

  @Get('municipios')
  @ApiOperation({ summary: 'Listar municipios (opcionalmente paginados)' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'paisId', required: false })
  @ApiQuery({ name: 'estadoId', required: false })
  findAllMunicipios(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('paisId') paisId?: string,
    @Query('estadoId') estadoId?: string,
  ) {
    if (page && limit) {
      return this.ubicacionesService.findMunicipiosPaginated({
        page: Math.max(1, parseInt(page, 10) || 1),
        limit: Math.min(100, Math.max(1, parseInt(limit, 10) || 10)),
        search,
        paisId,
        estadoId,
      });
    }
    return this.ubicacionesService.findAllMunicipios();
  }

  @Get('municipios/por-estado')
  @ApiOperation({ summary: 'Filtrar municipios por estado' })
  @ApiQuery({ name: 'estadoId', required: true })
  findMunicipiosByEstado(@Query('estadoId') estadoId: string) {
    return this.ubicacionesService.findMunicipiosByEstado(estadoId);
  }

  @Get('municipios/:id')
  @ApiOperation({ summary: 'Obtener un municipio por ID' })
  @ApiParam({ name: 'id', description: 'UUID del municipio' })
  findOneMunicipio(@Param('id') id: string) {
    return this.ubicacionesService.findOneMunicipio(id);
  }

  @Post('municipios')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear municipio (admin)' })
  createMunicipio(@Body() dto: CreateMunicipioDto) {
    return this.ubicacionesService.createMunicipio(dto);
  }

  @Patch('municipios/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar municipio (admin)' })
  updateMunicipio(@Param('id') id: string, @Body() dto: UpdateMunicipioDto) {
    return this.ubicacionesService.updateMunicipio(id, dto);
  }

  @Delete('municipios/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar municipio (soft delete, admin)' })
  deleteMunicipio(@Param('id') id: string) {
    return this.ubicacionesService.deleteMunicipio(id);
  }
}
