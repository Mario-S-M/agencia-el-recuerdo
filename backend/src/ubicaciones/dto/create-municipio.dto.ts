import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMunicipioDto {
  @ApiProperty({
    description: 'Nombre del municipio/ciudad',
    example: 'Cancún',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional({ description: 'Latitud', example: 21.1619 })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({ description: 'Longitud', example: -86.8515 })
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiProperty({ description: 'UUID del estado' })
  @IsUUID()
  estadoId: string;
}

export class UpdateMunicipioDto {
  @ApiPropertyOptional({ description: 'Nombre del municipio/ciudad' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ description: 'Latitud' })
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional({ description: 'Longitud' })
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiPropertyOptional({ description: 'UUID del estado' })
  @IsOptional()
  @IsUUID()
  estadoId?: string;
}
