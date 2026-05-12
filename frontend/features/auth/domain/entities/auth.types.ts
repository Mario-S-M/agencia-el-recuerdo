export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellidos: string | null;
  telefono: string | null;
  rol: string | null;
  avatar: string | null;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}
