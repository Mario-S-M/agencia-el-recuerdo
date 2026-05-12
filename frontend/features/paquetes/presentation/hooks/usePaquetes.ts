'use client';

import { useCallback, useEffect, useState } from 'react';
import { PaqueteRepository } from '../../data/repositories/paquete.repository';
import type { Paquete } from '../../domain/entities/paquete.types';
import type { CreatePaqueteDTO, UpdatePaqueteDTO } from '../../data/dto/paquete.schemas';
import type { Destino } from '@/features/destinos/domain/entities';
import type { HotelResumenDTO, ServicioResumenDTO } from '../../data/dto/paquete.schemas';

const repo = new PaqueteRepository();

export interface UsePaquetesReturn {
  paquetes: Paquete[];
  destinos: Destino[];
  hoteles: HotelResumenDTO[];
  servicios: ServicioResumenDTO[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreatePaqueteDTO) => Promise<void>;
  update: (id: string, input: UpdatePaqueteDTO) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePaquetes(): UsePaquetesReturn {
  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [hoteles, setHoteles] = useState<HotelResumenDTO[]>([]);
  const [servicios, setServicios] = useState<ServicioResumenDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const [p, d, h, s] = await Promise.all([
        repo.findAll(),
        repo.findAllDestinos(),
        repo.findAllHoteles(),
        repo.findAllServicios(),
      ]);
      setPaquetes(p);
      setDestinos(d);
      setHoteles(h);
      setServicios(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar datos');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const create = useCallback(async (input: CreatePaqueteDTO): Promise<void> => {
    const p = await repo.create(input);
    setPaquetes((prev) => [...prev, p]);
  }, []);

  const update = useCallback(async (id: string, input: UpdatePaqueteDTO): Promise<void> => {
    const updated = await repo.update(id, input);
    setPaquetes((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    await repo.delete(id);
    setPaquetes((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { paquetes, destinos, hoteles, servicios, isLoading, error, create, update, remove, refresh };
}
