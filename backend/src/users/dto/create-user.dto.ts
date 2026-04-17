import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo único del usuario',
    example: 'ana.garcia@demo.elrecuerdo',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre principal del usuario',
    example: 'Ana',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nombre: string;

  @ApiPropertyOptional({
    description: 'Apellidos del usuario',
    example: 'García López',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidos?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+56 9 8765 4321',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario dentro del sistema',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;

  @ApiPropertyOptional({
    description: 'URL pública del avatar del usuario',
    example: 'https://images.example.com/usuarios/ana-garcia.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Indica si el usuario queda activo al crearse',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({
    description: 'UUID opcional del usuario. Si no se envía, el backend lo genera.',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsOptional()
  @IsString()
  id?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre principal del usuario',
    example: 'Ana Maria',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Apellidos del usuario',
    example: 'García López',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidos?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+56 9 1234 5678',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario dentro del sistema',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;

  @ApiPropertyOptional({
    description: 'URL pública del avatar del usuario',
    example: 'https://images.example.com/usuarios/ana-garcia-nueva.png',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Indica si el usuario sigue activo',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'UUID del usuario',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @ApiProperty({
    description: 'Correo único del usuario',
    example: 'ana.garcia@demo.elrecuerdo',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre principal del usuario',
    example: 'Ana',
  })
  nombre: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'García López',
  })
  apellidos: string | null;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+56 9 8765 4321',
  })
  telefono: string | null;

  @ApiProperty({
    description: 'Rol del usuario dentro del sistema',
    example: 'admin',
  })
  rol: string | null;

  @ApiProperty({
    description: 'URL pública del avatar',
    example: 'https://images.example.com/usuarios/ana-garcia.png',
  })
  avatar: string | null;

  @ApiProperty({
    description: 'Estado de actividad del usuario',
    example: true,
  })
  activo: boolean;

  @ApiProperty({
    description: 'Fecha de creación en formato ISO 8601',
    example: '2026-04-14T08:45:11.785Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización en formato ISO 8601',
    example: '2026-04-14T08:45:11.785Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Fecha de eliminación suave. Null cuando sigue activo.',
    example: null,
    nullable: true,
  })
  deletedAt?: Date | null;
}

export class UserStatsDto {
  @ApiProperty({
    description: 'Total de usuarios existentes en la base de datos',
    example: 12,
  })
  total: number;

  @ApiProperty({
    description: 'Total de usuarios activos',
    example: 9,
  })
  active: number;
}
