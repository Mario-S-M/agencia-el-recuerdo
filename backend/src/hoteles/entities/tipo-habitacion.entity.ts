import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Hotel } from './hotel.entity';
import { TarifaPeriodo } from './tarifa-periodo.entity';

export enum OcupacionHabitacion {
  SENCILLA = 'sencilla',
  DOBLE = 'doble',
  TRIPLE = 'triple',
  CUADRUPLE = 'cuadruple',
}

@Entity('tipos_habitacion')
export class TipoHabitacion extends BaseEntity {
  @ApiProperty({ type: () => Hotel })
  @ManyToOne(() => Hotel, (hotel) => hotel.tiposHabitacion, { nullable: false })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ name: 'hotel_id', type: 'uuid' })
  hotelId: string;

  @ApiProperty({ example: 'Suite Junior Vista al Mar' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({
    enum: OcupacionHabitacion,
    example: OcupacionHabitacion.DOBLE,
  })
  @Column({ type: 'enum', enum: OcupacionHabitacion })
  ocupacion: OcupacionHabitacion;

  @ApiPropertyOptional({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({ type: [String] })
  @Column({ type: 'simple-json', nullable: true, default: '[]' })
  fotos: string[];

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => TarifaPeriodo, (tarifa) => tarifa.tipoHabitacion)
  tarifas: TarifaPeriodo[];
}
