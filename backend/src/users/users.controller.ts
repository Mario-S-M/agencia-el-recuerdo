import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
  ApiQuery,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserStatsDto,
} from './dto/create-user.dto';
import { User } from './entities/user.entity';

const demoUser = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  email: 'ana.garcia@demo.elrecuerdo',
  nombre: 'Ana',
  apellidos: 'García López',
  telefono: '+56 9 8765 4321',
  rol: 'admin',
  avatar: 'https://images.example.com/usuarios/ana-garcia.png',
  activo: true,
  createdAt: '2026-04-14T08:45:11.785Z',
  updatedAt: '2026-04-14T08:45:11.785Z',
  deletedAt: null,
};

const demoUsers = [
  demoUser,
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'carlos.mendez@demo.elrecuerdo',
    nombre: 'Carlos',
    apellidos: 'Méndez Rojas',
    telefono: '+56 9 1111 2222',
    rol: 'user',
    avatar: 'https://images.example.com/usuarios/carlos-mendez.png',
    activo: true,
    createdAt: '2026-04-14T08:40:00.000Z',
    updatedAt: '2026-04-14T08:40:00.000Z',
    deletedAt: null,
  },
];

const demoStats = {
  total: 12,
  active: 9,
};

const validationError = {
  statusCode: 400,
  message: [
    'email must be an email',
    'nombre must be longer than or equal to 3 characters',
  ],
  error: 'Bad Request',
};

const invalidUuidError = {
  statusCode: 400,
  message: 'Validation failed (uuid is expected)',
  error: 'Bad Request',
};

const notFoundError = {
  statusCode: 404,
  message: 'User with ID 550e8400-e29b-41d4-a716-446655440001 not found',
  error: 'Not Found',
};

const conflictError = {
  statusCode: 409,
  message: 'User with email ana.garcia@demo.elrecuerdo already exists',
  error: 'Conflict',
};

const serverError = {
  statusCode: 500,
  message: 'Internal server error',
  error: 'Internal Server Error',
};

@ApiTags('usuarios')
@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiOkResponse({
    description: 'Lista de usuarios activos e inactivos',
    schema: { example: demoUsers },
    type: UserResponseDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Get user by ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID del usuario a consultar',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiOkResponse({
    description: 'Usuario encontrado',
    schema: { example: demoUser },
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El ID no tiene formato UUID válido',
    schema: { example: invalidUuidError },
  })
  @ApiNotFoundResponse({
    description: 'No existe un usuario con ese ID',
    schema: { example: notFoundError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  // Search users
  @Get('search')
  @ApiOperation({ summary: 'Buscar usuarios por término' })
  @ApiQuery({
    name: 'term',
    required: true,
    description: 'Texto para buscar por nombre, apellido, correo o rol',
    example: 'Ana',
  })
  @ApiOkResponse({
    description: 'Lista de usuarios que coinciden con el término',
    schema: { example: demoUsers },
    type: UserResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Parámetros inválidos en la consulta',
    schema: { example: validationError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async search(@Query('term') term: string): Promise<User[]> {
    return this.usersService.search(term);
  }

  // Get active users
  @Get('active')
  @ApiOperation({ summary: 'Obtener solo los usuarios activos' })
  @ApiOkResponse({
    description: 'Usuarios con activo = true',
    schema: { example: demoUsers },
    type: UserResponseDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async findActive(): Promise<User[]> {
    return this.usersService.findActive();
  }

  // Get users by role
  @Get('role/:rol')
  @ApiOperation({ summary: 'Obtener usuarios por rol' })
  @ApiParam({
    name: 'rol',
    required: true,
    description: 'Rol del usuario (admin, user, guest)',
    example: 'admin',
  })
  @ApiOkResponse({
    description: 'Usuarios filtrados por rol',
    schema: { example: [demoUser] },
    type: UserResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'El rol enviado no es válido',
    schema: { example: validationError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async findByRole(@Param('rol') rol: string): Promise<User[]> {
    return this.usersService.findByRole(rol);
  }

  // Create new user (solo admin)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear nuevo usuario (solo administradores)' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Usuario creado correctamente',
    schema: { example: demoUser },
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Faltan campos obligatorios o el formato no es válido',
    schema: { example: validationError },
  })
  @ApiConflictResponse({
    description: 'Ya existe un usuario con ese correo',
    schema: { example: conflictError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al guardar en la base de datos',
    schema: { example: serverError },
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Update user (solo admin)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizar usuario (solo administradores)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID del usuario que se va a modificar',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiOkResponse({
    description: 'Usuario actualizado',
    schema: { example: { ...demoUser, nombre: 'Ana María', activo: false } },
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El ID no tiene formato UUID válido o el cuerpo es inválido',
    schema: { example: invalidUuidError },
  })
  @ApiNotFoundResponse({
    description: 'No existe un usuario con ese ID',
    schema: { example: notFoundError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al actualizar la base de datos',
    schema: { example: serverError },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  // Soft delete user (solo admin)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar usuario (soft delete, solo administradores)',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID del usuario a eliminar lógicamente',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiNoContentResponse({
    description: 'Usuario marcado como eliminado',
  })
  @ApiBadRequestResponse({
    description: 'El ID no tiene formato UUID válido',
    schema: { example: invalidUuidError },
  })
  @ApiNotFoundResponse({
    description: 'No existe un usuario con ese ID',
    schema: { example: notFoundError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al eliminar en la base de datos',
    schema: { example: serverError },
  })
  async softDelete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.softDelete(id);
  }

  // Restore user (solo admin)
  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Restaurar usuario eliminado (solo administradores)',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID del usuario a restaurar',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiOkResponse({
    description: 'Usuario restaurado',
    schema: { example: demoUser },
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'El ID no tiene formato UUID válido',
    schema: { example: invalidUuidError },
  })
  @ApiNotFoundResponse({
    description: 'No existe un usuario con ese ID',
    schema: { example: notFoundError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al restaurar en la base de datos',
    schema: { example: serverError },
  })
  async restore(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.restore(id);
  }

  // Permanent delete user (solo admin)
  @Delete(':id/permanent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar usuario definitivamente (solo administradores)',
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID del usuario que se va a borrar por completo',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @ApiNoContentResponse({
    description: 'Usuario eliminado de forma permanente',
  })
  @ApiBadRequestResponse({
    description: 'El ID no tiene formato UUID válido',
    schema: { example: invalidUuidError },
  })
  @ApiNotFoundResponse({
    description: 'No existe un usuario con ese ID',
    schema: { example: notFoundError },
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al borrar en la base de datos',
    schema: { example: serverError },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // Get statistics
  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de usuarios' })
  @ApiOkResponse({
    description: 'Conteo total y activos',
    schema: { example: demoStats },
    type: UserStatsDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Falla inesperada al consultar la base de datos',
    schema: { example: serverError },
  })
  async getStats(): Promise<UserStatsDto> {
    return this.usersService.getStats();
  }
}
