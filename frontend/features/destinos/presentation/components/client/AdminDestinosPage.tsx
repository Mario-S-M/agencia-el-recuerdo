'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Loader2,
  AlertCircle,
  Star,
  ImageIcon,
} from 'lucide-react';
import { mediaUrl } from '../../../data/api/uploads.api';
import { Button } from '@/components/ui/button';
import { useDestinos } from '../../hooks/useDestinos';
import { DestinoForm } from './DestinoForm';
import type { Destino } from '../../../domain/entities/destino.types';
import type { DestinoFormData } from '../../schemas/destino-form.schema';

export function AdminDestinosPage(): React.ReactElement {
  const router = useRouter();
  const { destinos, isLoading, error, create, update, remove } = useDestinos();

  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Destino | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Destino | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate(): void {
    setEditing(null);
    setFormError(null);
    setModal('create');
  }

  function openEdit(destino: Destino): void {
    setEditing(destino);
    setFormError(null);
    setModal('edit');
  }

  function closeModal(): void {
    setModal(null);
    setEditing(null);
    setFormError(null);
  }

  async function handleSubmit(data: DestinoFormData): Promise<void> {
    setSubmitting(true);
    setFormError(null);
    try {
      const payload = {
        ...data,
        imagenes: data.imagenes ?? [],
        descripcion: data.descripcion || undefined,
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
              <MapPin className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">Destinos</span>
            </div>
          </div>
          <Button
            onClick={openCreate}
            className="bg-orange-500 hover:bg-orange-400 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Nuevo destino
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

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : destinos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <MapPin className="h-12 w-12" />
            <p className="text-lg">Aún no hay destinos registrados.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/50 text-left">
                  <th className="px-4 py-3 font-medium">Lugar</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {destinos.map((d) => (
                  <tr key={d.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 shrink-0 rounded-md overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                          {d.imagenes?.length > 0 ? (
                            d.imagenes[0].endsWith('.mp4') ? (
                              <video src={mediaUrl(d.imagenes[0])} className="h-full w-full object-cover" muted />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={mediaUrl(d.imagenes[0])} alt={d.nombre} className="h-full w-full object-cover" />
                            )
                          ) : (
                            <ImageIcon className="h-4 w-4 text-white/20" />
                          )}
                          {d.imagenes?.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 rounded bg-black/70 px-1 text-[9px] text-white leading-tight">
                              +{d.imagenes.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {d.destacado && <Star className="h-3.5 w-3.5 text-yellow-400 shrink-0" />}
                          <div>
                            <p className="font-medium text-white">{d.nombre}</p>
                            <p className="text-white/40 text-xs">{d.pais}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          d.activo
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {d.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(d)}
                          className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(d)}
                          className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-lg font-semibold">
                {modal === 'edit' ? 'Editar destino' : 'Nuevo destino'}
              </h2>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              {formError && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}
              <DestinoForm
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
            <h2 className="text-lg font-semibold mb-2">Eliminar destino</h2>
            <p className="text-white/60 text-sm mb-6">
              ¿Eliminar <span className="text-white font-medium">{deleteTarget.nombre}</span>? Esta acción es reversible desde la base de datos.
            </p>
            {formError && (
              <p className="mb-3 text-sm text-red-400">{formError}</p>
            )}
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
