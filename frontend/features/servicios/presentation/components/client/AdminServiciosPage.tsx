'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Wrench,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useServicios } from '../../hooks/useServicios';
import { ServicioForm } from './ServicioForm';
import { TIPO_SERVICIO_OPTIONS, TIPO_COLOR } from '../../schemas/servicio-constants';
import type { Servicio } from '../../../domain/entities/servicio.types';
import type { ServicioFormData } from '../../schemas/servicio-form.schema';

export function AdminServiciosPage(): React.ReactElement {
  const router = useRouter();
  const { servicios, isLoading, error, create, update, remove } = useServicios();

  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Servicio | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Servicio | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate(): void {
    setEditing(null);
    setFormError(null);
    setModal('create');
  }

  function openEdit(s: Servicio): void {
    setEditing(s);
    setFormError(null);
    setModal('edit');
  }

  function closeModal(): void {
    setModal(null);
    setEditing(null);
    setFormError(null);
  }

  async function handleSubmit(data: ServicioFormData): Promise<void> {
    setSubmitting(true);
    setFormError(null);
    try {
      const payload = {
        ...data,
        descripcion: data.descripcion || undefined,
        icono: data.icono || undefined,
      };
      if (modal === 'edit' && editing) {
        await update(editing.id, payload);
      } else {
        await create(payload);
      }
      closeModal();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(): Promise<void> {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error al eliminar');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Panel Admin
            </button>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">Servicios</span>
            </div>
          </div>
          <Button
            onClick={openCreate}
            className="bg-orange-500 hover:bg-orange-400 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo servicio
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TIPO_SERVICIO_OPTIONS.map((opt) => {
            const count = servicios.filter((s) => s.tipo === opt.value).length;
            const colors = TIPO_COLOR[opt.value];
            return (
              <div
                key={opt.value}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center ${colors.bg} border-current/20`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className={`text-xs font-medium leading-tight ${colors.text}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-white/40">{count} registro{count !== 1 ? 's' : ''}</span>
              </div>
            );
          })}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : servicios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <Wrench className="h-12 w-12" />
            <p className="text-lg">Aún no hay servicios registrados.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/50 text-left">
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Descripción</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {servicios.map((s) => {
                  const tipoInfo = TIPO_SERVICIO_OPTIONS.find((o) => o.value === s.tipo);
                  const colors = TIPO_COLOR[s.tipo];
                  const iconoDisplay = s.icono || tipoInfo?.emoji || '?';
                  return (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
                        >
                          <span>{iconoDisplay}</span>
                          {tipoInfo?.label ?? s.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-white">{s.nombre}</td>
                      <td className="px-4 py-3 text-white/50 hidden md:table-cell max-w-xs truncate">
                        {s.descripcion ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            s.activo
                              ? 'bg-green-500/15 text-green-400'
                              : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {s.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => openEdit(s)}
                            className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(s)}
                            className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-lg font-semibold">
                {modal === 'edit' ? 'Editar servicio' : 'Nuevo servicio'}
              </h2>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              {formError && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}
              <ServicioForm
                initial={editing}
                isLoading={submitting}
                onSubmit={handleSubmit}
                onCancel={closeModal}
              />
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Eliminar servicio</h2>
            <p className="text-white/60 text-sm mb-6">
              ¿Eliminar{' '}
              <span className="text-white font-medium">{deleteTarget.nombre}</span>?
              Los paquetes vinculados a este servicio podrían verse afectados.
            </p>
            {formError && <p className="mb-3 text-sm text-red-400">{formError}</p>}
            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setDeleteTarget(null)}
                disabled={submitting}
                className="text-white/60 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                disabled={submitting}
                className="bg-red-500 hover:bg-red-400 text-white"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
