'use client';

import { useState, useEffect, useCallback } from 'react';
import { FechasSalidaRepository } from '../../data/repositories/fechas-salida.repository';
import type { FechaSalidaAdmin, PaqueteResumen, CreateFechaSalidaInput, UpdateFechaSalidaInput } from '../../domain/entities/fechas-salida.types';

const repo = new FechasSalidaRepository();

export interface UseFechasSalidaReturn {
  fechas: FechaSalidaAdmin[];
  paquetes: PaqueteResumen[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateFechaSalidaInput) => Promise<void>;
  update: (id: string, input: UpdateFechaSalidaInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useFechasSalida(): UseFechasSalidaReturn {
  const [fechas, setFechas] = useState<FechaSalidaAdmin[]>([]);
  const [paquetes, setPaquetes] = useState<PaqueteResumen[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const [f, p] = await Promise.all([repo.findAll(), repo.getPaquetes()]);
      setFechas(f);
      setPaquetes(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar datos');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  async function create(input: CreateFechaSalidaInput): Promise<void> {
    const fecha = await repo.create(input);
    setFechas((prev) => [...prev, fecha]);
  }

  async function update(id: string, input: UpdateFechaSalidaInput): Promise<void> {
    const updated = await repo.update(id, input);
    setFechas((prev) => prev.map((f) => (f.id === id ? updated : f)));
  }

  async function remove(id: string): Promise<void> {
    await repo.delete(id);
    setFechas((prev) => prev.filter((f) => f.id !== id));
  }

  return { fechas, paquetes, isLoading, error, create, update, remove, refresh };
}
