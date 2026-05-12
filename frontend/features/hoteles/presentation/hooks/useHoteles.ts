'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/features/auth/presentation/store/useAuthStore';
import { HotelRepository } from '../../data/repositories/hotel.repository';
import type { Hotel } from '../../domain/entities/hotel.types';
import type { Destino } from '@/features/destinos/domain/entities';
import type { CreateHotelDTO, UpdateHotelDTO } from '../../data/dto/hotel.schemas';
import type { CreateTipoHabitacionDTO, UpdateTipoHabitacionDTO } from '../../data/dto/hotel.schemas';
import type { CreatePeriodoHotelDTO, UpdatePeriodoHotelDTO } from '../../data/dto/hotel.schemas';
import type { CreateTarifaPeriodoDTO, UpdateTarifaPeriodoDTO } from '../../data/dto/hotel.schemas';
import type { TipoHabitacion, PeriodoHotel, TarifaPeriodo } from '../../domain/entities/hotel.types';

const repo = new HotelRepository();

export interface UseHotelesReturn {
  hoteles: Hotel[];
  destinos: Destino[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  refreshOne: (id: string) => Promise<void>;
  create: (input: CreateHotelDTO) => Promise<Hotel>;
  update: (id: string, input: UpdateHotelDTO) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addTipo: (hotelId: string, input: CreateTipoHabitacionDTO) => Promise<TipoHabitacion>;
  editTipo: (hotelId: string, id: string, input: UpdateTipoHabitacionDTO) => Promise<void>;
  removeTipo: (hotelId: string, id: string) => Promise<void>;
  addPeriodo: (hotelId: string, input: CreatePeriodoHotelDTO) => Promise<PeriodoHotel>;
  editPeriodo: (hotelId: string, id: string, input: UpdatePeriodoHotelDTO) => Promise<void>;
  removePeriodo: (hotelId: string, id: string) => Promise<void>;
  addTarifa: (hotelId: string, periodoId: string, input: CreateTarifaPeriodoDTO) => Promise<TarifaPeriodo>;
  editTarifa: (hotelId: string, periodoId: string, id: string, input: UpdateTarifaPeriodoDTO) => Promise<void>;
  removeTarifa: (hotelId: string, periodoId: string, id: string) => Promise<void>;
}

export function useHoteles(): UseHotelesReturn {
  useAuthStore((s) => s.token);
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [h, d] = await Promise.all([repo.findAll(), repo.findAllDestinos()]);
      setHoteles(h);
      setDestinos(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar hoteles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshOne = useCallback(async (id: string) => {
    try {
      const updated = await repo.findOne(id);
      setHoteles((prev) => prev.map((h) => (h.id === id ? updated : h)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al actualizar hotel');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(async (input: CreateHotelDTO) => {
    const hotel = await repo.create(input);
    await refresh();
    return hotel;
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateHotelDTO) => {
    await repo.update(id, input);
    await refreshOne(id);
  }, [refreshOne]);

  const remove = useCallback(async (id: string) => {
    await repo.delete(id);
    setHoteles((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const addTipo = useCallback(async (hotelId: string, input: CreateTipoHabitacionDTO) => {
    const tipo = await repo.createTipoHabitacion(hotelId, input);
    await refreshOne(hotelId);
    return tipo;
  }, [refreshOne]);

  const editTipo = useCallback(async (hotelId: string, id: string, input: UpdateTipoHabitacionDTO) => {
    await repo.updateTipoHabitacion(hotelId, id, input);
    await refreshOne(hotelId);
  }, [refreshOne]);

  const removeTipo = useCallback(async (hotelId: string, id: string) => {
    await repo.deleteTipoHabitacion(hotelId, id);
    await refreshOne(hotelId);
  }, [refreshOne]);

  const addPeriodo = useCallback(async (hotelId: string, input: CreatePeriodoHotelDTO) => {
    const periodo = await repo.createPeriodo(hotelId, input);
    await refreshOne(hotelId);
    return periodo;
  }, [refreshOne]);

  const editPeriodo = useCallback(async (hotelId: string, id: string, input: UpdatePeriodoHotelDTO) => {
    await repo.updatePeriodo(hotelId, id, input);
    await refreshOne(hotelId);
  }, [refreshOne]);

  const removePeriodo = useCallback(async (hotelId: string, id: string) => {
    await repo.deletePeriodo(hotelId, id);
    await refreshOne(hotelId);
  }, [refreshOne]);

  const addTarifa = useCallback(async (hotelId: string, periodoId: string, input: CreateTarifaPeriodoDTO) => {
    const tarifa = await repo.createTarifa(hotelId, periodoId, input);
    await refreshOne(hotelId);
    return tarifa;
  }, [refreshOne]);

  const editTarifa = useCallback(async (hotelId: string, periodoId: string, id: string, input: UpdateTarifaPeriodoDTO) => {
    await repo.updateTarifa(hotelId, periodoId, id, input);
    await refreshOne(hotelId);
  }, [refreshOne]);

  const removeTarifa = useCallback(async (hotelId: string, periodoId: string, id: string) => {
    await repo.deleteTarifa(hotelId, periodoId, id);
    await refreshOne(hotelId);
  }, [refreshOne]);

  return {
    hoteles, destinos, isLoading, error, refresh, refreshOne,
    create, update, remove,
    addTipo, editTipo, removeTipo,
    addPeriodo, editPeriodo, removePeriodo,
    addTarifa, editTarifa, removeTarifa,
  };
}
