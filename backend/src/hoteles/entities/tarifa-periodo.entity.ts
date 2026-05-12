import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { PeriodoHotel } from './periodo-hotel.entity';
import { TipoHabitacion } from './tipo-habitacion.entity';

@Entity('tarifas_periodo')
export class TarifaPeriodo extends BaseEntity {
  @ApiProperty({ type: () => PeriodoHotel })
  @ManyToOne(() => PeriodoHotel, (periodo) => periodo.tarifas, {
    nullable: false,
  })
  @JoinColumn({ name: 'periodo_id' })
  periodo: PeriodoHotel;

  @Column({ name: 'periodo_id', type: 'uuid' })
  periodoId: string;

  @ApiProperty({ type: () => TipoHabitacion })
  @ManyToOne(() => TipoHabitacion, (tipo) => tipo.tarifas, { nullable: false })
  @JoinColumn({ name: 'tipo_habitacion_id' })
  tipoHabitacion: TipoHabitacion;

  @Column({ name: 'tipo_habitacion_id', type: 'uuid' })
  tipoHabitacionId: string;

  @ApiProperty({ example: 6500.0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
