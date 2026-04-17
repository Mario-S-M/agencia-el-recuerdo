import { Injectable } from '@nestjs/common';
import { ILike, IsNull } from 'typeorm';
import { AppDataSource } from '../config/database.config';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  private get repository() {
    return AppDataSource.getRepository(User);
  }

  // Find all active users
  async findAll(): Promise<User[]> {
    return this.repository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id, deletedAt: IsNull() },
    });
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  // Search users by term
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

  // Find users by role
  async findByRole(rol: string): Promise<User[]> {
    return this.repository.find({
      where: { rol, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  // Find active users
  async findActiveUsers(): Promise<User[]> {
    return this.repository.find({
      where: { activo: true, deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  // Count all users
  async countAll(): Promise<number> {
    return this.repository.count({ where: { deletedAt: IsNull() } });
  }

  // Count active users
  async countActive(): Promise<number> {
    return this.repository.count({ where: { activo: true, deletedAt: IsNull() } });
  }

  async save(entity: Partial<User>): Promise<User> {
    const created = this.repository.create(entity);
    return this.repository.save(created);
  }

  async update(id: string, entity: Partial<User>): Promise<User> {
    await this.repository.update(id, entity);
    const updatedUser = await this.findById(id);

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.update(id, { deletedAt: new Date() });
  }

  async restore(id: string): Promise<void> {
    await this.repository.update(id, { deletedAt: null });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
