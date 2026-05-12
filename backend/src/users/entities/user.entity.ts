import { Entity, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseEntity } from '../../common/base/base.entity';
import { UserRole } from '../dto/create-user.dto';

@Entity('usuarios')
export class User extends BaseEntity {
  @ApiProperty({
    description: 'Correo electrónico',
    example: 'ana.garcia@demo.elrecuerdo',
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @ApiProperty({ description: 'Nombre', example: 'Ana' })
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ApiPropertyOptional({
    description: 'Apellidos',
    example: 'García López',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  apellidos: string | null;

  @ApiPropertyOptional({
    description: 'Teléfono',
    example: '+56 9 8765 4321',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string | null;

  @ApiPropertyOptional({
    description: 'Rol',
    enum: UserRole,
    example: 'admin',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  rol: string | null;

  @ApiPropertyOptional({
    description: 'URL del avatar',
    example: 'https://images.example.com/usuarios/ana-garcia.png',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string | null;

  @ApiProperty({ description: 'Estado activo', example: true })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  password: string | null;
}
