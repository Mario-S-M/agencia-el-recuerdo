import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

export class PaisesPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  continente?: string;
}

export class EstadosPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  paisId?: string;
}

export class MunicipiosPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  paisId?: string;

  @IsOptional()
  @IsString()
  estadoId?: string;
}
