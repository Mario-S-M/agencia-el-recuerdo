import {
  IsUUID,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFechaSalidaDto {
  @ApiProperty({
    description: 'UUID del paquete al que pertenece esta fecha',
    example: 'c1d2e3f4-a5b6-7890-cdef-ab1234567890',
  })
  @IsUUID()
  paqueteId: string;

  @ApiProperty({
    description: 'Fecha de salida en formato ISO 8601 (YYYY-MM-DD)',
    example: '2026-07-15',
  })
  @IsDateString()
  fechaSalida: string;

  @ApiPropertyOptional({
    description: 'Fecha de regreso en formato ISO 8601 (YYYY-MM-DD)',
    example: '2026-07-22',
  })
  @IsOptional()
  @IsDateString()
  fechaRegreso?: string;

  @ApiProperty({
    description: 'Número máximo de cupos disponibles',
    example: 30,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  cupoMaximo: number;

  @ApiProperty({
    description: 'Cupo mínimo requerido para confirmar la salida',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  cupoMinimo: number;

  @ApiProperty({
    description: 'Cupos disponibles al momento de crear',
    example: 30,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  cupoDisponible: number;

  @ApiPropertyOptional({
    description: 'Fecha activa/visible para el público',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateFechaSalidaDto {
  @ApiPropertyOptional({ description: 'Fecha de salida (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaSalida?: string;

  @ApiPropertyOptional({ description: 'Fecha de regreso (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fechaRegreso?: string;

  @ApiPropertyOptional({ description: 'Cupo máximo', minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  cupoMaximo?: number;

  @ApiPropertyOptional({
    description: 'Cupo mínimo para confirmar',
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  cupoMinimo?: number;

  @ApiPropertyOptional({ description: 'Cupos disponibles', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  cupoDisponible?: number;

  @ApiPropertyOptional({ description: '¿Activa?' })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
