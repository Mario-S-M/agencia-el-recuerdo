import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || process.env.DATABASE_PORT || '5432'),
  username: process.env.POSTGRES_USER || process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || process.env.DATABASE_NAME || 'el_recuerdo',
  entities: [User],
  synchronize: true,
  logging: false,
});
