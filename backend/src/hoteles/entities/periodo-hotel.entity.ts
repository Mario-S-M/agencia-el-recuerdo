import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Hotel } from './hotel.entity';
import { TarifaPeriodo } from './tarifa-periodo.entity';

@Entity('periodos_hotel')
export class PeriodoHotel extends BaseEntity {
  @ApiProperty({ type: () => Hotel })
  @ManyToOne(() => Hotel, (hotel) => hotel.periodos, { nullable: false })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ name: 'hotel_id', type: 'uuid' })
  hotelId: string;

  @ApiProperty({ example: 'Semana Santa 2026' })
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ApiProperty({ example: '2026-03-28' })
  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: Date;

  @ApiProperty({ example: '2026-04-05' })
  @Column({ name: 'fecha_fin', type: 'date' })
  fechaFin: Date;

  @ApiPropertyOptional({
    example: 'Tarifas especiales de temporada alta',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({ type: () => TarifaPeriodo, isArray: true })
  @OneToMany(() => TarifaPeriodo, (tarifa) => tarifa.periodo, { cascade: true })
  tarifas: TarifaPeriodo[];
}
