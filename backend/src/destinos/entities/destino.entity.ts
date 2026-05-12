import { Entity, Column, ManyToMany } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Paquete } from '../../paquetes/entities/paquete.entity';

@Entity('destinos')
export class Destino extends BaseEntity {
  @ApiProperty({ description: 'Nombre del destino', example: 'Cancún' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'País del destino', example: 'México' })
  @Column({ type: 'varchar', length: 100 })
  pais: string;

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
  })
  @ManyToMany(() => Paquete, { eager: false, nullable: true })
  paquetes: Paquete[];
}
