import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // Find all users
  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  // Find user by ID
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find user by email
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Search users
  async search(term: string): Promise<User[]> {
    if (!term.trim()) {
      return this.findAll();
    }
    return this.usersRepository.searchUsers(term.trim());
  }

  // Find active users
  async findActive(): Promise<User[]> {
    return this.usersRepository.findActiveUsers();
  }

  // Find by role
  async findByRole(rol: string): Promise<User[]> {
    return this.usersRepository.findByRole(rol);
  }

  // Create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    // Generar ID si no se proporcionó
    const userId = createUserDto.id || this.generateUUID();

    const newUser = {
      ...createUserDto,
      id: userId,
    };
    if (newUser.rol === undefined) {
      delete newUser.rol;
    }

    await this.usersRepository.save(newUser);
    return this.findOne(userId);
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update allowed fields
    const allowedFields = ['nombre', 'apellidos', 'telefono', 'rol', 'avatar', 'activo'];
    const updateData: Partial<User> = {};

    for (const field of allowedFields) {
      if (updateUserDto[field] !== undefined) {
        updateData[field] = updateUserDto[field];
      }
    }

    const updatedUser = await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Soft delete user
  async softDelete(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.softDelete(id);
  }

  // Restore deleted user
  async restore(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.restore(id);
    return this.findOne(id);
  }

  // Permanent delete user
  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }

  // Get statistics
  async getStats(): Promise<any> {
    return {
      total: await this.usersRepository.countAll(),
      active: await this.usersRepository.countActive(),
    };
  }

  // Helper method to generate UUID
  private generateUUID(): string {
    function s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}`;
  }
}
