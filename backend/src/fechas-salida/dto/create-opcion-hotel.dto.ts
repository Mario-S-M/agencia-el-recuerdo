import {
  IsUUID,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOpcionHotelDto {
  @ApiProperty({ example: 'uuid-del-hotel' })
  @IsUUID()
  hotelId: string;

  @ApiPropertyOptional({ example: 'Habitación doble vista al mar' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcionHabitacion?: string;

  @ApiProperty({ example: 12500 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateOpcionHotelDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  descripcionHabitacion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precio?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
