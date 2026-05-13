import { Entity, Column, ManyToOne, OneToOne, OneToMany, ManyToMany, JoinColumn, JoinTable, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Estado } from './estado.entity';
import { Pais } from './pais.entity';
import { Destino } from '../../destinos/entities/destino.entity';
import { Servicio } from '../../servicios/entities/servicio.entity';

@Index('idx_municipios_estado_id', ['estadoId'])
@Index('idx_municipios_deleted_at_nombre', ['deletedAt', 'nombre'])
@Entity('municipios')
export class Municipio extends BaseEntity {
  @ApiProperty({
    description: 'Nombre del municipio/ciudad',
    example: 'Cancún',
  })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiPropertyOptional({ description: 'Latitud', example: 21.1619 })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitud: number | null;

  @ApiPropertyOptional({ description: 'Longitud', example: -86.8515 })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitud: number | null;

  @ApiProperty({ description: 'ID del estado al que pertenece' })
  @Column({ name: 'estado_id', type: 'uuid' })
  estadoId: string;

  @ManyToOne(() => Estado, (estado) => estado.municipios)
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @ApiPropertyOptional({ description: 'Es capital del país' })
  @OneToOne(() => Pais, (pais) => pais.capital)
  esCapitalDe: Pais | null;

  @OneToMany(() => Destino, (destino) => destino.municipioRef)
  destinos: Destino[];

  @ManyToMany(() => Servicio, (servicio) => servicio.municipios)
  @JoinTable({ name: 'municipios_servicios' })
  servicios: Servicio[];
}
