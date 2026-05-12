'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/features/auth/presentation/store/useAuthStore';
import { DestinoRepository } from '../../data/repositories/destino.repository';
import type { Destino } from '../../domain/entities/destino.types';
import type { CreateDestinoDTO, UpdateDestinoDTO } from '../../data/dto/destino.schemas';

const repo = new DestinoRepository();

export interface UseDestinosReturn {
  destinos: Destino[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateDestinoDTO) => Promise<void>;
  update: (id: string, input: UpdateDestinoDTO) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useDestinos(): UseDestinosReturn {
  useAuthStore((s) => s.token);
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      setDestinos(await repo.findAll());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar destinos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(async (input: CreateDestinoDTO): Promise<void> => {
    await repo.create(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateDestinoDTO): Promise<void> => {
    await repo.update(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string): Promise<void> => {
    await repo.delete(id);
    await refresh();
  }, [refresh]);

  return { destinos, isLoading, error, create, update, remove, refresh };
}
