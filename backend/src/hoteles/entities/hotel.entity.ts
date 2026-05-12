import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Destino } from '../../destinos/entities/destino.entity';
import { TipoHabitacion } from './tipo-habitacion.entity';
import { PeriodoHotel } from './periodo-hotel.entity';

@Entity('hoteles')
export class Hotel extends BaseEntity {
  @ApiProperty({ example: 'Grand Palladium Cancún' })
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ApiPropertyOptional({
    example: 'Blvd. Kukulcán Km 14.5, Cancún, Q.R.',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string | null;

  @ApiPropertyOptional({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({
    example: 'https://maps.google.com/?q=...',
    nullable: true,
  })
  @Column({
    name: 'google_maps_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  googleMapsUrl: string | null;

  @ApiPropertyOptional({ type: [String] })
  @Column({ type: 'simple-json', nullable: true, default: '[]' })
  fotos: string[];

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiPropertyOptional({ type: () => Destino, nullable: true })
  @ManyToOne(() => Destino, { eager: false, nullable: true })
  @JoinColumn({ name: 'destino_id' })
  destino: Destino | null;

  @Column({ name: 'destino_id', type: 'uuid', nullable: true })
  destinoId: string | null;

  @ApiProperty({ type: () => TipoHabitacion, isArray: true })
  @OneToMany(() => TipoHabitacion, (tipo) => tipo.hotel, { cascade: true })
  tiposHabitacion: TipoHabitacion[];

  @ApiProperty({ type: () => PeriodoHotel, isArray: true })
  @OneToMany(() => PeriodoHotel, (periodo) => periodo.hotel, { cascade: true })
  periodos: PeriodoHotel[];
}
