import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaisDto {
  @ApiProperty({ description: 'Nombre del país', example: 'México' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ description: 'Código ISO 3166-1 alfa-2', example: 'MX' })
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  codigoIso2: string;

  @ApiProperty({ description: 'Código ISO 3166-1 alfa-3', example: 'MEX' })
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  codigoIso3: string;

  @ApiPropertyOptional({ description: 'Código telefónico', example: '+52' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigoTelefono?: string;

  @ApiPropertyOptional({ description: 'Nombre nativo', example: 'México' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombreNativo?: string;

  @ApiPropertyOptional({ description: 'Continente', example: 'North America' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  continente?: string;
}

export class UpdatePaisDto {
  @ApiPropertyOptional({ description: 'Nombre del país' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional({ description: 'Código ISO 3166-1 alfa-2' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  codigoIso2?: string;

  @ApiPropertyOptional({ description: 'Código ISO 3166-1 alfa-3' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  codigoIso3?: string;

  @ApiPropertyOptional({ description: 'Código telefónico' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigoTelefono?: string;

  @ApiPropertyOptional({ description: 'Nombre nativo' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombreNativo?: string;

  @ApiPropertyOptional({ description: 'Continente' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  continente?: string;
}
