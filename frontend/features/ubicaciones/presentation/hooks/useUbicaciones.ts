'use client';

import { useState, useEffect, useCallback } from 'react';
import { UbicacionRepository } from '../../data/repositories/ubicacion.repository';
import type { Pais, Estado, Municipio, CreatePaisInput, CreateEstadoInput, CreateMunicipioInput, UpdatePaisInput, UpdateEstadoInput, UpdateMunicipioInput } from '../../domain/entities/ubicacion.types';

const repo = new UbicacionRepository();

export function usePaises() {
  const [items, setItems] = useState<Pais[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setItems(await repo.findAllPaises());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar países');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = useCallback(async (input: CreatePaisInput) => {
    await repo.createPais(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdatePaisInput) => {
    await repo.updatePais(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteMunicipio(id);
    await refresh();
  }, [refresh]);

  return { items, isLoading, error, create, update, remove, refresh };
}

// ── Paginadas ──

export function usePaisesPaginados(
  page: number,
  limit: number,
  search?: string,
  continente?: string,
) {
  const [data, setData] = useState<Pais[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = `${page}-${limit}-${search ?? ''}-${continente ?? ''}`;

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await repo.findPaisesPaginated({ page, limit, search, continente });
      setData(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar países');
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => { void fetch(); }, [fetch]);

  const create = useCallback(async (input: CreatePaisInput) => {
    await repo.createPais(input);
    await fetch();
  }, [fetch]);

  const update = useCallback(async (id: string, input: UpdatePaisInput) => {
    await repo.updatePais(id, input);
    await fetch();
  }, [fetch]);

  const remove = useCallback(async (id: string) => {
    await repo.deletePais(id);
    await fetch();
  }, [fetch]);

  return { data, total, totalPages, isLoading, error, create, update, remove };
}

export function useEstadosPaginados(
  page: number,
  limit: number,
  search?: string,
  paisId?: string,
) {
  const [data, setData] = useState<Estado[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = `${page}-${limit}-${search ?? ''}-${paisId ?? ''}`;

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await repo.findEstadosPaginated({ page, limit, search, paisId });
      setData(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar estados');
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => { void fetch(); }, [fetch]);

  const create = useCallback(async (input: CreateEstadoInput) => {
    await repo.createEstado(input);
    await fetch();
  }, [fetch]);

  const update = useCallback(async (id: string, input: UpdateEstadoInput) => {
    await repo.updateEstado(id, input);
    await fetch();
  }, [fetch]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteEstado(id);
    await fetch();
  }, [fetch]);

  return { data, total, totalPages, isLoading, error, create, update, remove };
}

export function useMunicipiosPaginados(
  page: number,
  limit: number,
  search?: string,
  paisId?: string,
  estadoId?: string,
) {
  const [data, setData] = useState<Municipio[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paramsKey = `${page}-${limit}-${search ?? ''}-${paisId ?? ''}-${estadoId ?? ''}`;

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await repo.findMunicipiosPaginated({ page, limit, search, paisId, estadoId });
      setData(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar municipios');
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => { void fetch(); }, [fetch]);

  const create = useCallback(async (input: CreateMunicipioInput) => {
    await repo.createMunicipio(input);
    await fetch();
  }, [fetch]);

  const update = useCallback(async (id: string, input: UpdateMunicipioInput) => {
    await repo.updateMunicipio(id, input);
    await fetch();
  }, [fetch]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteMunicipio(id);
    await fetch();
  }, [fetch]);

  return { data, total, totalPages, isLoading, error, create, update, remove };
}

export function useAllEstados() {
  const [items, setItems] = useState<Estado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setItems(await repo.findAllEstados());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar estados');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = useCallback(async (input: CreateEstadoInput) => {
    await repo.createEstado(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateEstadoInput) => {
    await repo.updateEstado(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteEstado(id);
    await refresh();
  }, [refresh]);

  return { items, isLoading, error, create, update, remove, refresh };
}

export function useAllMunicipios() {
  const [items, setItems] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setItems(await repo.findAllMunicipios());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar municipios');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = useCallback(async (input: CreateMunicipioInput) => {
    await repo.createMunicipio(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateMunicipioInput) => {
    await repo.updateMunicipio(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteMunicipio(id);
    await refresh();
  }, [refresh]);

  return { items, isLoading, error, create, update, remove, refresh };
}

export function useEstados(paisId?: string) {
  const [items, setItems] = useState<Estado[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!paisId) { setItems([]); setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);
    try {
      setItems(await repo.findEstadosByPais(paisId));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar estados');
    } finally {
      setIsLoading(false);
    }
  }, [paisId]);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = useCallback(async (input: CreateEstadoInput) => {
    await repo.createEstado(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateEstadoInput) => {
    await repo.updateEstado(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteEstado(id);
    await refresh();
  }, [refresh]);

  return { items, isLoading, error, create, update, remove, refresh };
}

export function useMunicipios(estadoId?: string) {
  const [items, setItems] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!estadoId) { setItems([]); setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);
    try {
      setItems(await repo.findMunicipiosByEstado(estadoId));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar municipios');
    } finally {
      setIsLoading(false);
    }
  }, [estadoId]);

  useEffect(() => { void refresh(); }, [refresh]);

  const create = useCallback(async (input: CreateMunicipioInput) => {
    await repo.createMunicipio(input);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, input: UpdateMunicipioInput) => {
    await repo.updateMunicipio(id, input);
    await refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await repo.deleteMunicipio(id);
    await refresh();
  }, [refresh]);

  return { items, isLoading, error, create, update, remove, refresh };
}
