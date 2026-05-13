'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2, Loader2, AlertCircle, MapPin, Building2, Globe, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { usePaises, useEstados, useMunicipiosPaginados } from '../../hooks/useUbicaciones';
import type { Municipio, CreateMunicipioInput, UpdateMunicipioInput } from '../../../domain/entities/ubicacion.types';

const PAGE_SIZE = 10;

export function AdminMunicipiosPage(): React.ReactElement {
  const router = useRouter();
  const { items: paises } = usePaises();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setSearchDebounced(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  const [filterPaisId, setFilterPaisId] = useState('');
  const [filterEstadoId, setFilterEstadoId] = useState('');
  const { items: estadosFiltro, isLoading: loadingEstadosFiltro } = useEstados(filterPaisId || undefined);
  const { data: municipios, total, totalPages, isLoading, error, create, update, remove } = useMunicipiosPaginados(
    currentPage,
    PAGE_SIZE,
    searchDebounced || undefined,
    filterPaisId || undefined,
    filterEstadoId || undefined,
  );
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Municipio | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Municipio | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState<CreateMunicipioInput>({ nombre: '', latitud: undefined, longitud: undefined, estadoId: '' });
  const [formPaisId, setFormPaisId] = useState('');
  const { items: formEstados, isLoading: loadingFormEstados } = useEstados(formPaisId || undefined);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, Math.max(1, totalPages)));
  }, [totalPages]);

  const getPaisNombre = (id: string) => paises.find(p => p.id === id)?.nombre ?? id;

  function openCreate() {
    setEditing(null);
    setForm({ nombre: '', latitud: undefined, longitud: undefined, estadoId: '' });
    setFormPaisId('');
    setFormError(null);
    setModal('create');
  }

  function openEdit(m: Municipio) {
    setEditing(m);
    setForm({ nombre: m.nombre, latitud: m.latitud ?? undefined, longitud: m.longitud ?? undefined, estadoId: m.estadoId });
    setFormPaisId(m.estado?.paisId ?? '');
    setFormError(null);
    setModal('edit');
  }

  function closeModal() { setModal(null); setEditing(null); setFormError(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const payload = { ...form };
      if (modal === 'edit' && editing) {
        await update(editing.id, payload as UpdateMunicipioInput);
      } else {
        await create(payload);
      }
      closeModal();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error al guardar');
    } finally { setSubmitting(false); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setSubmitting(true);
    try { await remove(deleteTarget.id); setDeleteTarget(null); }
    catch (e) { setFormError(e instanceof Error ? e.message : 'Error al eliminar'); }
    finally { setSubmitting(false); }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin')} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" /> Panel Admin
            </button>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">Municipios / Ciudades</span>
            </div>
          </div>
          <Button onClick={openCreate} className="bg-orange-500 hover:bg-orange-400 text-white gap-2">
            <Plus className="h-4 w-4" /> Nuevo municipio
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Buscar municipio..."
              value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); }}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <SearchableSelect
            options={paises.map((p) => ({ value: p.id, label: p.nombre }))}
            value={filterPaisId}
            onValueChange={(v) => { setFilterPaisId(v); setFilterEstadoId(''); setCurrentPage(1); }}
            placeholder="Todos los países"
            searchPlaceholder="Buscar país..."
            className="w-56"
          />
          <SearchableSelect
            options={estadosFiltro.map((e) => ({ value: e.id, label: e.nombre }))}
            value={filterEstadoId}
            onValueChange={(v) => { setFilterEstadoId(v); setCurrentPage(1); }}
            placeholder="Todos los estados"
            searchPlaceholder="Buscar estado..."
            className="w-56"
            disabled={!filterPaisId || loadingEstadosFiltro}
          />
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : total === 0 && !searchInput && !filterPaisId ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <MapPin className="h-12 w-12" />
            <p className="text-lg">Aún no hay municipios registrados.</p>
          </div>
        ) : (
          <>
            {total === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
                <MapPin className="h-12 w-12" />
                <p className="text-lg">Sin resultados.</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white/50 text-left">
                        <th className="px-4 py-3 font-medium">Municipio</th>
                        <th className="px-4 py-3 font-medium">Estado</th>
                        <th className="px-4 py-3 font-medium">País</th>
                        <th className="px-4 py-3 font-medium">Coordenadas</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {municipios.map((m) => {
                        const lat = Number(m.latitud);
                        const lng = Number(m.longitud);
                        const coords = !isNaN(lat) && !isNaN(lng) ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : '-';
                        return (
                          <tr key={m.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-white">{m.nombre}</td>
                            <td className="px-4 py-3 text-white/60"><div className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{m.estado?.nombre ?? m.estadoId}</div></td>
                            <td className="px-4 py-3 text-white/60"><div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" />{getPaisNombre(m.estado?.paisId ?? '')}</div></td>
                            <td className="px-4 py-3 text-white/60 text-xs">{coords}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 justify-end">
                                <button onClick={() => openEdit(m)} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors" title="Editar"><Pencil className="h-4 w-4" /></button>
                                <button onClick={() => setDeleteTarget(m)} className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between text-sm text-white/50">
                    <span>
                      {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, total)} de {total}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {(() => {
                        const pages: (number | string)[] = [];
                        if (totalPages <= 5) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          pages.push(1);
                          const start = Math.max(2, currentPage - 1);
                          const end = Math.min(totalPages - 1, currentPage + 1);
                          if (start > 2) pages.push('...');
                          for (let i = start; i <= end; i++) pages.push(i);
                          if (end < totalPages - 1) pages.push('...');
                          pages.push(totalPages);
                        }
                        return pages.map((page, idx) =>
                          typeof page === 'string' ? (
                            <span key={`e${idx}`} className="px-1 text-white/20 text-xs">···</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-2.5 py-1 rounded-md text-sm transition-colors ${
                                page === currentPage
                                  ? 'bg-orange-500/20 text-orange-400 font-medium'
                                  : 'text-white/40 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {page}
                            </button>
                          ),
                        );
                      })()}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <Input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={String(currentPage)}
                        onChange={(e) => {
                          const v = parseInt(e.target.value, 10);
                          if (v >= 1 && v <= totalPages) setCurrentPage(v);
                        }}
                        className="ml-2 h-7 w-16 border border-white/10 bg-white/5 text-xs text-white/60 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-lg font-semibold">{modal === 'edit' ? 'Editar municipio' : 'Nuevo municipio'}</h2>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              {formError && <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"><AlertCircle className="h-4 w-4 shrink-0" />{formError}</div>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input placeholder="Nombre del municipio/ciudad" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" required />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Latitud (opcional)" type="number" step="any" value={form.latitud ?? ''} onChange={e => setForm({ ...form, latitud: e.target.value ? parseFloat(e.target.value) : undefined })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  <Input placeholder="Longitud (opcional)" type="number" step="any" value={form.longitud ?? ''} onChange={e => setForm({ ...form, longitud: e.target.value ? parseFloat(e.target.value) : undefined })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50">País</label>
                  <SearchableSelect
                    options={paises.map((p) => ({ value: p.id, label: p.nombre }))}
                    value={formPaisId}
                    onValueChange={(v) => { setFormPaisId(v); setForm({ ...form, estadoId: '' }); }}
                    placeholder="Seleccionar país"
                    searchPlaceholder="Buscar país..."
                    disabled={submitting}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50">Estado</label>
                  <SearchableSelect
                    options={formEstados.map((e) => ({ value: e.id, label: e.nombre }))}
                    value={form.estadoId}
                    onValueChange={(v) => setForm({ ...form, estadoId: v })}
                    placeholder="Seleccionar estado"
                    searchPlaceholder="Buscar estado..."
                    disabled={submitting || !formPaisId || loadingFormEstados}
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                  <Button type="button" variant="ghost" onClick={closeModal} disabled={submitting} className="text-white/60 hover:text-white">Cancelar</Button>
                  <Button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-400 text-white">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editing ? 'Guardar cambios' : 'Crear municipio'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Eliminar municipio</h2>
            <p className="text-white/60 text-sm mb-6">¿Eliminar <span className="text-white font-medium">{deleteTarget.nombre}</span>?</p>
            {formError && <p className="mb-3 text-sm text-red-400">{formError}</p>}
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={submitting} className="text-white/60 hover:text-white">Cancelar</Button>
              <Button onClick={handleDelete} disabled={submitting} className="bg-red-500 hover:bg-red-400 text-white">{submitting && <Loader2 className="h-4 w-4 animate-spin" />}Eliminar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
