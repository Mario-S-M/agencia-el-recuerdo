import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Destino } from '../../destinos/entities/destino.entity';
import { Hotel } from '../../hoteles/entities/hotel.entity';
import { Servicio } from '../../servicios/entities/servicio.entity';

@Entity('paquetes')
export class Paquete extends BaseEntity {
  @ApiProperty({ example: 'Viaje Ixtapa 5 Noches' })
  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @ApiPropertyOptional({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiProperty({ type: () => Destino })
  @ManyToOne(() => Destino, { eager: false, nullable: false })
  @JoinColumn({ name: 'destino_id' })
  destino: Destino;

  @Column({ name: 'destino_id', type: 'uuid' })
  destinoId: string;

  @ApiPropertyOptional({ type: () => Hotel, nullable: true })
  @ManyToOne(() => Hotel, { eager: false, nullable: true })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel | null;

  @Column({ name: 'hotel_id', type: 'uuid', nullable: true })
  hotelId: string | null;

  @ApiPropertyOptional({ type: () => Servicio, isArray: true })
  @ManyToMany(() => Servicio, { eager: false })
  @JoinTable({ name: 'paquetes_servicios' })
  servicios: Servicio[];

  @ApiPropertyOptional({ type: [String], nullable: true })
  @Column({ type: 'simple-array', nullable: true })
  incluye: string[] | null;

  @ApiProperty({ description: '¿El paquete es todo incluido?', example: false })
  @Column({ name: 'todo_incluido', type: 'boolean', default: false })
  todoIncluido: boolean;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  destacado: boolean;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
