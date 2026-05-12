import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoServicio, CategoriaServicio } from '../entities/servicio.entity';

export class CreateServicioDto {
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Paquetes al Mar',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'Tipo de servicio',
    enum: TipoServicio,
    example: TipoServicio.PAQUETE_MAR,
  })
  @IsEnum(TipoServicio)
  tipo: TipoServicio;

  @ApiPropertyOptional({
    description: 'Categoría del servicio',
    enum: CategoriaServicio,
    example: CategoriaServicio.GENERAL,
  })
  @IsOptional()
  @IsEnum(CategoriaServicio)
  categoria?: CategoriaServicio;

  @ApiPropertyOptional({ description: 'Descripción del servicio' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Ícono o emoji representativo',
    example: '🌊🏖️',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icono?: string;

  @ApiPropertyOptional({ description: 'Estado activo', example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateServicioDto {
  @ApiPropertyOptional({ description: 'Nombre del servicio' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ description: 'Tipo de servicio', enum: TipoServicio })
  @IsOptional()
  @IsEnum(TipoServicio)
  tipo?: TipoServicio;

  @ApiPropertyOptional({
    description: 'Categoría del servicio',
    enum: CategoriaServicio,
  })
  @IsOptional()
  @IsEnum(CategoriaServicio)
  categoria?: CategoriaServicio;

  @ApiPropertyOptional({ description: 'Descripción' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Ícono o emoji' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icono?: string;

  @ApiPropertyOptional({ description: '¿Activo?' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
