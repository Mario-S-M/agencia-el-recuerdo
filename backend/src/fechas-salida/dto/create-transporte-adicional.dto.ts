import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TipoMontoTransporte } from '../entities/transporte-adicional.entity';

export class CreateTransporteAdicionalDto {
  @ApiProperty({ example: 'Traslado aeropuerto-hotel redondo' })
  @IsString()
  @MaxLength(255)
  descripcion: string;

  @ApiProperty({
    enum: TipoMontoTransporte,
    example: TipoMontoTransporte.POR_PERSONA,
  })
  @IsEnum(TipoMontoTransporte)
  tipoMonto: TipoMontoTransporte;

  @ApiProperty({ example: 850 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  monto: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateTransporteAdicionalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcion?: string;

  @ApiPropertyOptional({ enum: TipoMontoTransporte })
  @IsOptional()
  @IsEnum(TipoMontoTransporte)
  tipoMonto?: TipoMontoTransporte;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  monto?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
