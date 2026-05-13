'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Pencil, Trash2, Globe, Loader2, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchableSelect } from '@/components/ui/searchable-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePaises, usePaisesPaginados } from '../../hooks/useUbicaciones';
import type { Pais, CreatePaisInput, UpdatePaisInput } from '../../../domain/entities/ubicacion.types';

const PAGE_SIZE = 10;

export function AdminPaisesPage(): React.ReactElement {
  const router = useRouter();
  const { items: todosPaises } = usePaises();
  const [search, setSearch] = useState('');
  const [filterContinente, setFilterContinente] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paises, total, totalPages, isLoading, error, create, update, remove } = usePaisesPaginados(
    currentPage, PAGE_SIZE, search || undefined, filterContinente || undefined,
  );

  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Pais | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Pais | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState<CreatePaisInput>({
    nombre: '', codigoIso2: '', codigoIso3: '', codigoTelefono: '', nombreNativo: '', continente: '',
  });

  const continentes = [...new Set(todosPaises.map((p) => p.continente).filter(Boolean))].sort();

  function openCreate() {
    setEditing(null);
    setForm({ nombre: '', codigoIso2: '', codigoIso3: '', codigoTelefono: '', nombreNativo: '', continente: '' });
    setFormError(null);
    setModal('create');
  }

  function openEdit(p: Pais) {
    setEditing(p);
    setForm({
      nombre: p.nombre, codigoIso2: p.codigoIso2, codigoIso3: p.codigoIso3,
      codigoTelefono: p.codigoTelefono ?? '', nombreNativo: p.nombreNativo ?? '', continente: p.continente ?? '',
    });
    setFormError(null);
    setModal('edit');
  }

  function closeModal() { setModal(null); setEditing(null); setFormError(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const payload = { ...form, codigoTelefono: form.codigoTelefono || undefined, nombreNativo: form.nombreNativo || undefined, continente: form.continente || undefined };
      if (modal === 'edit' && editing) {
        await update(editing.id, payload as UpdatePaisInput);
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
              <Globe className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">Países</span>
            </div>
          </div>
          <Button onClick={openCreate} className="bg-orange-500 hover:bg-orange-400 text-white gap-2">
            <Plus className="h-4 w-4" /> Nuevo país
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Buscar país..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <SearchableSelect
            options={continentes.map((c) => ({ value: c, label: c }))}
            value={filterContinente}
            onValueChange={(v) => { setFilterContinente(v); setCurrentPage(1); }}
            placeholder="Todos los continentes"
            searchPlaceholder="Buscar continente..."
            className="w-56"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : paises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <Globe className="h-12 w-12" />
            <p className="text-lg">Sin resultados.</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-white/50 text-left">
                    <th className="px-4 py-3 font-medium">País</th>
                    <th className="px-4 py-3 font-medium">ISO2</th>
                    <th className="px-4 py-3 font-medium">ISO3</th>
                    <th className="px-4 py-3 font-medium">Teléfono</th>
                    <th className="px-4 py-3 font-medium">Continente</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paises.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{p.nombre}</p>
                        {p.nombreNativo && <p className="text-white/40 text-xs">{p.nombreNativo}</p>}
                      </td>
                      <td className="px-4 py-3 text-white/60">{p.codigoIso2}</td>
                      <td className="px-4 py-3 text-white/60">{p.codigoIso3}</td>
                      <td className="px-4 py-3 text-white/60">{p.codigoTelefono}</td>
                      <td className="px-4 py-3 text-white/60">{p.continente}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(p)} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors" title="Editar"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                  <Select value={String(currentPage)} onValueChange={(v) => setCurrentPage(Number(v))}>
                    <SelectTrigger className="ml-2 h-7 w-16 border border-white/10 bg-white/5 text-xs text-white/60 focus:ring-2 focus:ring-orange-500/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border border-white/10 bg-[#0d1117] text-white text-xs max-h-60">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <SelectItem key={p} value={String(p)} className="text-xs">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-lg font-semibold">{modal === 'edit' ? 'Editar país' : 'Nuevo país'}</h2>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              {formError && <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"><AlertCircle className="h-4 w-4 shrink-0" />{formError}</div>}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input placeholder="Nombre del país" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" required />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="ISO2 (MX)" maxLength={2} value={form.codigoIso2} onChange={e => setForm({ ...form, codigoIso2: e.target.value.toUpperCase() })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 uppercase" required />
                  <Input placeholder="ISO3 (MEX)" maxLength={3} value={form.codigoIso3} onChange={e => setForm({ ...form, codigoIso3: e.target.value.toUpperCase() })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 uppercase" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Teléfono (+52)" value={form.codigoTelefono ?? ''} onChange={e => setForm({ ...form, codigoTelefono: e.target.value })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  <Input placeholder="Continente" value={form.continente ?? ''} onChange={e => setForm({ ...form, continente: e.target.value })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                </div>
                <Input placeholder="Nombre nativo" value={form.nombreNativo ?? ''} onChange={e => setForm({ ...form, nombreNativo: e.target.value })} disabled={submitting} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                  <Button type="button" variant="ghost" onClick={closeModal} disabled={submitting} className="text-white/60 hover:text-white">Cancelar</Button>
                  <Button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-400 text-white">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editing ? 'Guardar cambios' : 'Crear país'}
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
            <h2 className="text-lg font-semibold mb-2">Eliminar país</h2>
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
