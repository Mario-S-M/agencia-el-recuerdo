'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarioRepository } from '../../data/repositories/calendario.repository';
import type { FechaSalidaCalendario } from '../../domain/entities/calendario.types';

const calendarioRepository = new CalendarioRepository();

interface UseCalendarioReturn {
  fechas: FechaSalidaCalendario[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCalendario(): UseCalendarioReturn {
  const [fechas, setFechas] = useState<FechaSalidaCalendario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFechas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await calendarioRepository.getActivas();
      setFechas(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFechas();
  }, [fetchFechas]);

  return { fechas, isLoading, error, refetch: fetchFechas };
}
