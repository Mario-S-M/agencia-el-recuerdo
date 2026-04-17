import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../dto/create-user.dto';

@Entity('usuarios')
export class User {
  @ApiProperty({
    description: 'ID del usuario',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2026-04-14T08:45:11.785Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de actualización',
    example: '2026-04-14T08:45:11.785Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Fecha de eliminación (nullable)',
    example: null,
    nullable: true,
  })
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
