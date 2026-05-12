'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Loader2,
  AlertCircle,
  Users,
  Table2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFechasSalida } from '../../hooks/useFechasSalida';
import { FechaSalidaForm } from './FechaSalidaForm';
import { AdminCalendarView } from './AdminCalendarView';
import { getEstadoCupo, SERVICIO_CONFIG } from '../../../domain/entities/fechas-salida.types';
import type { FechaSalidaAdmin, CreateFechaSalidaInput, UpdateFechaSalidaInput } from '../../../domain/entities/fechas-salida.types';
import type { FechaSalidaFormData } from '../../schemas/fecha-salida-form.schema';

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'd MMM yyyy', { locale: es });
  } catch {
    return dateStr;
  }
}

function formatCupo(disp: number, max: number): string {
  return `${disp} / ${max}`;
}

function cupoBadge(disp: number, max: number, minimo: number): { label: string; cls: string } {
  const estado = getEstadoCupo(disp, max, minimo);
  const map = {
    agotado: { label: 'Agotado', cls: 'bg-red-500/15 text-red-400' },
    ultimos: { label: 'Últimos cupos', cls: 'bg-amber-500/15 text-amber-400' },
    disponible: { label: 'Disponible', cls: 'bg-green-500/15 text-green-400' },
    medio: { label: 'Medio', cls: 'bg-orange-500/15 text-orange-400' },
  } as const;
  return map[estado];
}

interface ModalState {
  mode: 'create' | 'edit';
  fecha: FechaSalidaAdmin | null;
}

export function AdminFechasSalidaPage(): React.ReactElement {
  const router = useRouter();
  const { fechas, paquetes, isLoading, error, create, update, remove } = useFechasSalida();

  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FechaSalidaAdmin | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate(): void {
    setModal({ mode: 'create', fecha: null });
    setFormError(null);
  }

  function openEdit(fecha: FechaSalidaAdmin): void {
    setModal({ mode: 'edit', fecha });
    setFormError(null);
  }

  function closeModal(): void {
    setModal(null);
    setFormError(null);
  }

  async function handleSubmit(data: FechaSalidaFormData): Promise<void> {
    setSubmitting(true);
    setFormError(null);
    try {
      const payload: UpdateFechaSalidaInput = {
        fechaSalida: data.fechaSalida,
        fechaRegreso: data.fechaRegreso || undefined,
        cupoMaximo: Number(data.cupoMaximo),
        cupoMinimo: Number(data.cupoMinimo),
        cupoDisponible: Number(data.cupoDisponible),
        activo: data.activo,
      };
      if (modal?.mode === 'edit' && modal.fecha) {
        await update(modal.fecha.id, payload);
      } else {
        await create({ ...payload, paqueteId: data.paqueteId } as CreateFechaSalidaInput);
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
    setFormError(null);
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
              <CalendarDays className="h-4 w-4 text-orange-400" />
              <span className="font-semibold">Fechas de Salida</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
              <button
                onClick={() => setView('table')}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  view === 'table' ? 'bg-orange-500 text-white' : 'text-white/50 hover:text-white hover:bg-white/5',
                )}
              >
                <Table2 className="h-3.5 w-3.5" />
                Tabla
              </button>
              <button
                onClick={() => setView('calendar')}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                  view === 'calendar' ? 'bg-orange-500 text-white' : 'text-white/50 hover:text-white hover:bg-white/5',
                )}
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Calendario
              </button>
            </div>
            <Button
              onClick={openCreate}
              className="bg-orange-500 hover:bg-orange-400 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Nueva fecha
            </Button>
          </div>
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
        ) : view === 'table' && fechas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <CalendarDays className="h-12 w-12" />
            <p className="text-lg">No hay fechas de salida configuradas.</p>
          </div>
        ) : view === 'calendar' && fechas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <CalendarDays className="h-12 w-12" />
            <p className="text-lg">No hay fechas de salida configuradas.</p>
          </div>
        ) : view === 'calendar' ? (
          <AdminCalendarView
            fechas={fechas}
            onEdit={(f) => openEdit(f)}
            onDelete={(f) => setDeleteTarget(f)}
          />
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-white/50 text-left">
                  <th className="px-4 py-3 font-medium">Paquete</th>
                  <th className="px-4 py-3 font-medium">Destino</th>
                  <th className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Salida</span>
                  </th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />Regreso</span>
                  </th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Cupos</span>
                  </th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {fechas.map((f) => {
                  const badge = cupoBadge(f.cupoDisponible, f.cupoMaximo, f.cupoMinimo);
                  return (
                    <tr key={f.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{f.paquete?.nombre ?? 'Sin paquete'}</p>
                      </td>
                      <td className="px-4 py-3 text-white/70">
                        {f.paquete?.destino?.nombre ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-white/70">{formatDate(f.fechaSalida)}</td>
                      <td className="px-4 py-3 text-white/70 hidden sm:table-cell">
                        {f.fechaRegreso ? formatDate(f.fechaRegreso) : '—'}
                      </td>
                      <td className="px-4 py-3 text-white/70 hidden md:table-cell">
                        {formatCupo(f.cupoDisponible, f.cupoMaximo)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', badge.cls)}>
                            {badge.label}
                          </span>
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                              f.activo ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40',
                            )}
                          >
                            {f.activo ? 'Activa' : 'Inactiva'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => openEdit(f)}
                            className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(f)}
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
          <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
            <div className="px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="text-lg font-semibold">
                {modal.mode === 'edit' ? 'Editar fecha de salida' : 'Nueva fecha de salida'}
              </h2>
            </div>
            <div className="px-6 py-5 overflow-y-auto">
              {formError && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}
              <FechaSalidaForm
                initial={modal.fecha}
                paquetes={paquetes}
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
            <h2 className="text-lg font-semibold mb-2">Eliminar fecha de salida</h2>
            <p className="text-white/60 text-sm mb-6">
              ¿Eliminar la salida de{' '}
              <span className="text-white font-medium">{deleteTarget.paquete?.nombre ?? 'este paquete'}</span>{' '}
              del {formatDate(deleteTarget.fechaSalida)}?
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
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
