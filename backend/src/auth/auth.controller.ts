import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService, LoginResponse } from './auth.service';
import { LoginDto } from './dto/login.dto';

const unauthorizedExample = {
  statusCode: 401,
  message: 'Credenciales inválidas',
  error: 'Unauthorized',
};

const validationError = {
  statusCode: 400,
  message: [
    'email must be an email',
    'password must be longer than or equal to 6 characters',
  ],
  error: 'Bad Request',
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica un usuario y devuelve un JWT. ' +
      'El registro de nuevos usuarios es exclusivo del panel de administración (POST /usuarios).',
  })
  @ApiOkResponse({
    description:
      'Login exitoso. Retorna el JWT y los datos del usuario (sin contraseña).',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440001',
          email: 'admin@elrecuerdo.mx',
          nombre: 'Admin',
          apellidos: null,
          telefono: null,
          rol: 'admin',
          avatar: null,
          activo: true,
          createdAt: '2026-04-27T10:00:00.000Z',
          updatedAt: '2026-04-27T10:00:00.000Z',
          deletedAt: null,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas o usuario desactivado',
    schema: { example: unauthorizedExample },
  })
  @ApiBadRequestResponse({
    description: 'Datos de entrada inválidos',
    schema: { example: validationError },
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
