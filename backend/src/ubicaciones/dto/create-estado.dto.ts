import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEstadoDto {
  @ApiProperty({
    description: 'Nombre del estado/provincia',
    example: 'Quintana Roo',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional({ description: 'Código del estado', example: 'ROO' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigo?: string;

  @ApiProperty({ description: 'UUID del país' })
  @IsUUID()
  paisId: string;
}

export class UpdateEstadoDto {
  @ApiPropertyOptional({ description: 'Nombre del estado/provincia' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ description: 'Código del estado' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigo?: string;

  @ApiPropertyOptional({ description: 'UUID del país' })
  @IsOptional()
  @IsUUID()
  paisId?: string;
}
