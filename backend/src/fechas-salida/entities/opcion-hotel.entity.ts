import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { FechaSalida } from './fecha-salida.entity';
import { Hotel } from '../../hoteles/entities/hotel.entity';

@Entity('opciones_hotel')
export class OpcionHotel extends BaseEntity {
  @ManyToOne(() => FechaSalida, (f) => f.opcionesHotel, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'fecha_salida_id' })
  fechaSalida: FechaSalida;

  @Column({ name: 'fecha_salida_id', type: 'uuid' })
  fechaSalidaId: string;

  @ApiProperty({ type: () => Hotel })
  @ManyToOne(() => Hotel, { eager: false, nullable: false })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ name: 'hotel_id', type: 'uuid' })
  hotelId: string;

  @ApiPropertyOptional({
    description: 'Descripción del tipo de habitación ofrecida',
    example: 'Habitación doble vista al mar',
    nullable: true,
  })
  @Column({
    name: 'descripcion_habitacion',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcionHabitacion: string | null;

  @ApiProperty({ description: 'Precio por persona', example: 12500.0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
