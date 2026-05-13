import { Entity, Column, OneToMany, OneToOne, JoinColumn, Index } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { Estado } from './estado.entity';
import { Municipio } from './municipio.entity';
import { Destino } from '../../destinos/entities/destino.entity';

@Index('idx_paises_deleted_at', ['deletedAt'])
@Entity('paises')
export class Pais extends BaseEntity {
  @ApiProperty({ description: 'Nombre del país', example: 'México' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiProperty({ description: 'Código ISO 3166-1 alfa-2', example: 'MX' })
  @Column({ type: 'varchar', length: 2, unique: true })
  codigoIso2: string;

  @ApiProperty({ description: 'Código ISO 3166-1 alfa-3', example: 'MEX' })
  @Column({ type: 'varchar', length: 3, unique: true })
  codigoIso3: string;

  @ApiProperty({ description: 'Código telefónico', example: '+52' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  codigoTelefono: string | null;

  @ApiProperty({ description: 'Nombre nativo', example: 'México' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  nombreNativo: string | null;

  @ApiProperty({ description: 'Continente', example: 'North America' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  continente: string | null;

  @ApiPropertyOptional({ description: 'Capital del país (municipio)' })
  @OneToOne(() => Municipio, (municipio) => municipio.esCapitalDe, { nullable: true })
  @JoinColumn({ name: 'capital_id' })
  capital: Municipio | null;

  @OneToMany(() => Estado, (estado) => estado.pais)
  estados: Estado[];

  @OneToMany(() => Destino, (destino) => destino.paisRef)
  destinos: Destino[];
}
