import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Pais } from './pais.entity';
import { Municipio } from './municipio.entity';
import { Destino } from '../../destinos/entities/destino.entity';

@Index('idx_estados_pais_id', ['paisId'])
@Index('idx_estados_deleted_at', ['deletedAt'])
@Entity('estados')
export class Estado extends BaseEntity {
  @ApiProperty({
    description: 'Nombre del estado/provincia',
    example: 'Quintana Roo',
  })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiPropertyOptional({ description: 'Código del estado', example: 'ROO' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  codigo: string | null;

  @ApiProperty({ description: 'ID del país al que pertenece' })
  @Column({ name: 'pais_id', type: 'uuid' })
  paisId: string;

  @ManyToOne(() => Pais, (pais) => pais.estados)
  @JoinColumn({ name: 'pais_id' })
  pais: Pais;

  @OneToMany(() => Municipio, (municipio) => municipio.estado)
  municipios: Municipio[];

  @OneToMany(() => Destino, (destino) => destino.estadoRef)
  destinos: Destino[];
}
