import { Entity, Column, ManyToMany, ManyToOne, OneToMany, JoinColumn, JoinTable } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Paquete } from '../../paquetes/entities/paquete.entity';
import { Pais } from '../../ubicaciones/entities/pais.entity';
import { Estado } from '../../ubicaciones/entities/estado.entity';
import { Municipio } from '../../ubicaciones/entities/municipio.entity';
import { Servicio } from '../../servicios/entities/servicio.entity';

@Entity('destinos')
export class Destino extends BaseEntity {
  @ApiProperty({ description: 'Nombre del destino', example: 'Cancún' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'País del destino', example: 'México' })
  @Column({ type: 'varchar', length: 100 })
  pais: string;

  @ApiPropertyOptional({ description: 'ID del país' })
  @Column({ name: 'pais_id', type: 'uuid', nullable: true })
  paisId: string | null;

  @ApiPropertyOptional({ description: 'ID del estado/provincia' })
  @Column({ name: 'estado_id', type: 'uuid', nullable: true })
  estadoId: string | null;

  @ApiPropertyOptional({ description: 'ID del municipio/ciudad' })
  @Column({ name: 'municipio_id', type: 'uuid', nullable: true })
  municipioId: string | null;

  @ManyToOne(() => Pais, (pais) => pais.destinos, { nullable: true })
  @JoinColumn({ name: 'pais_id' })
  paisRef: Pais | null;

  @ManyToOne(() => Estado, (estado) => estado.destinos, { nullable: true })
  @JoinColumn({ name: 'estado_id' })
  estadoRef: Estado | null;

  @ManyToOne(() => Municipio, (municipio) => municipio.destinos, { nullable: true })
  @JoinColumn({ name: 'municipio_id' })
  municipioRef: Municipio | null;

  @ApiPropertyOptional({
    description: 'Descripción del destino',
    example: 'Paraíso caribeño con playas de arena blanca y mar turquesa.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @ApiPropertyOptional({
    description: 'Rutas de archivos multimedia del destino',
    example: ['/uploads/media/abc.jpg', '/uploads/media/def.mp4'],
    type: [String],
  })
  @Column({
    name: 'imagenes',
    type: 'simple-json',
    nullable: true,
    default: [],
  })
  imagenes: string[];

  @ApiProperty({
    description: '¿Destino destacado en portada?',
    example: true,
  })
  @Column({ type: 'boolean', default: false })
  destacado: boolean;

  @ApiProperty({ description: 'Destino activo', example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    description: 'Paquetes disponibles en este destino',
    type: () => Paquete,
    isArray: true,
  })
  @OneToMany(() => Paquete, (paquete) => paquete.destino)
  paquetes: Paquete[];

  @ApiProperty({
    description: 'Servicios disponibles en este destino',
    type: () => Servicio,
    isArray: true,
  })
  @ManyToMany(() => Servicio, (servicio) => servicio.destinos)
  @JoinTable({ name: 'destinos_servicios' })
  servicios: Servicio[];
}
