import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Paquete } from '../../paquetes/entities/paquete.entity';
import { OpcionHotel } from './opcion-hotel.entity';
import { TransporteAdicional } from './transporte-adicional.entity';

@Entity('fechas_salida')
export class FechaSalida extends BaseEntity {
  @ApiProperty({ type: () => Paquete })
  @ManyToOne(() => Paquete, { eager: false, nullable: false })
  @JoinColumn({ name: 'paquete_id' })
  paquete: Paquete;

  @Column({ name: 'paquete_id', type: 'uuid' })
  paqueteId: string;

  @ApiProperty({ example: '2026-07-15' })
  @Column({ name: 'fecha_salida', type: 'date' })
  fechaSalida: Date;

  @ApiPropertyOptional({ nullable: true })
  @Column({ name: 'fecha_regreso', type: 'date', nullable: true })
  fechaRegreso: Date | null;

  @ApiProperty({ example: 30 })
  @Column({ name: 'cupo_maximo', type: 'int' })
  cupoMaximo: number;

  @ApiProperty({ example: 1 })
  @Column({ name: 'cupo_minimo', type: 'int', default: 1 })
  cupoMinimo: number;

  @ApiProperty({ example: 18 })
  @Column({ name: 'cupo_disponible', type: 'int' })
  cupoDisponible: number;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({ type: () => OpcionHotel, isArray: true })
  @OneToMany(() => OpcionHotel, (o) => o.fechaSalida, { cascade: true })
  opcionesHotel: OpcionHotel[];

  @ApiProperty({ type: () => TransporteAdicional, isArray: true })
  @OneToMany(() => TransporteAdicional, (t) => t.fechaSalida, { cascade: true })
  transportesAdicionales: TransporteAdicional[];
}
