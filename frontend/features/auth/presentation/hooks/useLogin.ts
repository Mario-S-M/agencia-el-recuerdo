'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthRepository } from '../../data/repositories/auth.repository';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginFormData } from '../schemas/login-form.schema';

const authRepository = new AuthRepository();

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  submit: (data: LoginFormData) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  async function submit(data: LoginFormData): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authRepository.login(data);
      setAuth(response.access_token, response.user);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, submit };
}
