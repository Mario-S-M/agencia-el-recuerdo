'use client';

import { useState, useEffect, useCallback } from 'react';
import { ServicioRepository } from '../../data/repositories/servicio.repository';
import type { Servicio } from '../../domain/entities/servicio.types';
import type { CreateServicioDTO, UpdateServicioDTO } from '../../data/dto/servicio.schemas';

const repo = new ServicioRepository();

export interface UseServiciosReturn {
  servicios: Servicio[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateServicioDTO) => Promise<void>;
  update: (id: string, input: UpdateServicioDTO) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useServicios(): UseServiciosReturn {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServicios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await repo.findAll();
      setServicios(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar los servicios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchServicios();
  }, [fetchServicios]);

  const create = useCallback(async (input: CreateServicioDTO) => {
    const s = await repo.create(input);
    setServicios((prev) => [...prev, s]);
  }, []);

  const update = useCallback(async (id: string, input: UpdateServicioDTO) => {
    const s = await repo.update(id, input);
    setServicios((prev) => prev.map((x) => (x.id === id ? s : x)));
  }, []);

  const remove = useCallback(async (id: string) => {
    await repo.delete(id);
    setServicios((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return { servicios, isLoading, error, create, update, remove };
}
