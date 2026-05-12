import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsArray,
  Min,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDestinoDto {
  @ApiProperty({
    description: 'Nombre del destino turístico',
    example: 'Cancún',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({
    description: 'País donde se ubica el destino',
    example: 'México',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  pais: string;

  @ApiPropertyOptional({
    description: 'Descripción del destino',
    example: 'Paraíso caribeño con playas de arena blanca y mar turquesa.',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Rutas de archivos multimedia subidos',
    example: ['/uploads/media/uuid.jpg', '/uploads/media/uuid2.mp4'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes?: string[];

  @ApiPropertyOptional({
    description: '¿Mostrar en portada como destino destacado?',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  destacado?: boolean;

  @ApiPropertyOptional({
    description: 'Estado activo del destino',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateDestinoDto {
  @ApiPropertyOptional({ description: 'Nombre del destino', example: 'Cancún' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ description: 'País', example: 'México' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  pais?: string;

  @ApiPropertyOptional({ description: 'Descripción' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Rutas de archivos multimedia',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagenes?: string[];

  @ApiPropertyOptional({ description: '¿Destacado?' })
  @IsOptional()
  @IsBoolean()
  destacado?: boolean;

  @ApiPropertyOptional({ description: '¿Activo?' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
