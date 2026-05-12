import type { LoginCredentials, LoginResponse, AuthUser } from '../../domain/entities/auth.types';
import { authApi } from '../api/auth.api';
import type { LoginResponseDTO } from '../dto/auth.schemas';

function toDomain(dto: LoginResponseDTO): LoginResponse {
  return {
    access_token: dto.access_token,
    user: dto.user as AuthUser,
  };
}

export class AuthRepository {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const dto = await authApi.login(credentials);
    return toDomain(dto);
  }
}
