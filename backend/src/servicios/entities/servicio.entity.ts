import { Entity, Column, ManyToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Paquete } from '../../paquetes/entities/paquete.entity';
import { Municipio } from '../../ubicaciones/entities/municipio.entity';
import { Destino } from '../../destinos/entities/destino.entity';

export enum TipoServicio {
  PAQUETE_MAR = 'paquete_mar',
  VUELO = 'vuelo',
  EXCURSION = 'excursion',
  TRANSPORTE = 'transporte',
  CRUCERO = 'crucero',
  BODA_XV = 'boda_xv',
  TRANSPORTE_AEREO = 'transporte_aereo',
  TRANSPORTE_VAN = 'transporte_van',
  TRANSPORTE_AUTOBUS = 'transporte_autobus',
  TRANSPORTE_MARITIMO = 'transporte_maritimo',
  TODO_INCLUIDO = 'todo_incluido',
  SOLO_ALUERZO = 'solo_almuerzo',
  MEDIA_PENSION = 'media_pension',
  SOLO_DESAYUNO = 'solo_desayuno',
}

export enum CategoriaServicio {
  GENERAL = 'general',
  TRANSPORTE = 'transporte',
  ALIMENTACION = 'alimentacion',
}

@Entity('servicios')
export class Servicio extends BaseEntity {
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Paquetes al Mar',
  })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({
    description: 'Tipo de servicio',
    enum: TipoServicio,
    example: TipoServicio.PAQUETE_MAR,
  })
  @Column({ type: 'varchar', length: 50 })
  tipo: TipoServicio;

  @ApiProperty({
    description: 'Categoría del servicio',
    enum: CategoriaServicio,
    example: CategoriaServicio.GENERAL,
  })
  @Column({ type: 'varchar', length: 30, default: CategoriaServicio.GENERAL })
  categoria: CategoriaServicio;

  @ApiPropertyOptional({
    description: 'Descripción detallada del servicio',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({
    description: 'Ícono o emoji representativo',
    example: '🌊🏖️',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  icono: string | null;

  @ApiProperty({ description: 'Servicio activo', example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToMany(() => Paquete, (paquete) => paquete.servicios)
  paquetes: Paquete[];

  @ManyToMany(() => Destino, (destino) => destino.servicios)
  destinos: Destino[];

  @ManyToMany(() => Municipio, (municipio) => municipio.servicios)
  municipios: Municipio[];
}
