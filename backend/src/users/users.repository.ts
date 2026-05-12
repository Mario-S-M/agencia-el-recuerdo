import { Injectable } from '@nestjs/common';
import { ILike, IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseRepository } from '../common/base/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  protected get entityType(): new () => User {
    return User;
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
      select: [
        'id',
        'email',
        'nombre',
        'apellidos',
        'telefono',
        'rol',
        'avatar',
        'activo',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'password',
      ],
    });
  }

  async searchUsers(term: string): Promise<User[]> {
    const pattern = `%${term}%`;

    return this.repository.find({
      where: [
        { nombre: ILike(pattern), deletedAt: IsNull() },
        { apellidos: ILike(pattern), deletedAt: IsNull() },
        { email: ILike(pattern), deletedAt: IsNull() },
        { rol: ILike(pattern), deletedAt: IsNull() },
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async findByRole(rol: string): Promise<User[]> {
    return this.repository.find({
      where: { rol, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async countAll(): Promise<number> {
    return this.repository.count({ where: { deletedAt: IsNull() } });
  }

  async countActive(): Promise<number> {
    return this.repository.count({
      where: { activo: true, deletedAt: IsNull() },
    });
  }
}
