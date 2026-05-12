import { getHttpClient } from '@/lib/http-client';
import { loginResponseSchema, type LoginResponseDTO } from '../dto/auth.schemas';

const http = getHttpClient();

export const authApi = {
  login(credentials: { email: string; password: string }): Promise<LoginResponseDTO> {
    return http.post<LoginResponseDTO>('/auth/login', credentials, loginResponseSchema);
  },
};
