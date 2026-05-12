import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { FechaSalida } from './fecha-salida.entity';

export enum TipoMontoTransporte {
  POR_PERSONA = 'por_persona',
  FIJO = 'fijo',
}

@Entity('transportes_adicionales')
export class TransporteAdicional extends BaseEntity {
  @ManyToOne(() => FechaSalida, (f) => f.transportesAdicionales, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'fecha_salida_id' })
  fechaSalida: FechaSalida;

  @Column({ name: 'fecha_salida_id', type: 'uuid' })
  fechaSalidaId: string;

  @ApiProperty({ example: 'Traslado aeropuerto-hotel redondo' })
  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @ApiProperty({
    enum: TipoMontoTransporte,
    example: TipoMontoTransporte.POR_PERSONA,
  })
  @Column({ name: 'tipo_monto', type: 'varchar', length: 20 })
  tipoMonto: TipoMontoTransporte;

  @ApiProperty({ example: 850.0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
