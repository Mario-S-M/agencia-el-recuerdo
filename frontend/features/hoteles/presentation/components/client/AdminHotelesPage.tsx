'use client';

import { useState } from 'react';
import { Plus, Hotel as HotelIcon, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useHoteles } from '../../hooks/useHoteles';
import { HotelCard } from './HotelCard';
import { HotelFormModal } from './HotelFormModal';
import { HotelDetailPanel } from './HotelDetailPanel';
import type { Hotel } from '../../../domain/entities/hotel.types';
import type { HotelFormData } from '../../schemas/hotel-form.schema';
import type { Destino } from '@/features/destinos/domain/entities';

export function AdminHotelesPage(): React.ReactElement {
  const { hoteles, destinos, isLoading, error, create, update, remove } = useHoteles();
  const [modal, setModal] = useState<'create' | Hotel | null>(null);
  const [detail, setDetail] = useState<Hotel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Hotel | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(data: HotelFormData): Promise<void> {
    setSubmitting(true);
    setFormError(null);
    try {
      const input = {
        nombre: data.nombre,
        direccion: data.direccion || undefined,
        descripcion: data.descripcion || undefined,
        googleMapsUrl: data.googleMapsUrl || undefined,
        fotos: data.fotos && data.fotos.length > 0 ? data.fotos : undefined,
        activo: data.activo ?? true,
        destinoId: data.destinoId || undefined,
      };
      if (modal === 'create') {
        await create(input);
      } else if (modal) {
        await update(modal.id, input);
      }
      setModal(null);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error');
    } finally {
      setSubmitting(false);
    }
  }

  const hotelesByDestino = destinos.reduce<{ destino: Destino; hoteles: Hotel[] }[]>((acc, d) => {
    const h = hoteles.filter((hotel) => hotel.destinoId === d.id);
    if (h.length > 0) acc.push({ destino: d, hoteles: h });
    return acc;
  }, []);
  const sinDestino = hoteles.filter((h) => !h.destinoId);
  if (sinDestino.length > 0) {
    hotelesByDestino.push({ destino: { id: '', nombre: 'Sin destino', pais: '', paisId: null, estadoId: null, municipioId: null, descripcion: null, imagenes: [], destacado: false, activo: true, createdAt: '', updatedAt: '' }, hoteles: sinDestino });
  }

  async function handleDelete(): Promise<void> {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await remove(deleteTarget.id);
      setDeleteTarget(null);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <HotelIcon className="h-5 w-5 text-orange-400" />
            <span className="font-semibold text-lg">Hoteles</span>
          </div>
          <Button onClick={() => setModal('create')} className="bg-orange-500 hover:bg-orange-400 text-white gap-2">
            <Plus className="h-4 w-4" /> Nuevo hotel
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        ) : hoteles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <HotelIcon className="h-12 w-12" />
            <p className="text-lg">Aún no hay hoteles registrados.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {hotelesByDestino.map((group) => (
              <AccordionItem key={group.destino.id || '__none__'} value={group.destino.id || '__none__'}
                className="rounded-lg border border-white/10 bg-white/5">
                <AccordionTrigger className="px-4 py-3 text-white/80 text-sm font-medium uppercase tracking-wider hover:text-white hover:no-underline [&>svg]:text-orange-400">
                  <div className="flex items-center gap-2">
                    <HotelIcon className="h-4 w-4 text-orange-400" />
                    {group.destino.nombre}
                    <span className="text-xs text-white/40 font-normal">({group.hoteles.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
                    {group.hoteles.map((h) => (
                      <HotelCard
                        key={h.id}
                        hotel={h}
                        onManage={setDetail}
                        onEdit={setModal}
                        onDelete={setDeleteTarget}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </main>

      {modal !== null && (
        <HotelFormModal
          initial={modal === 'create' ? null : modal}
          destinos={destinos}
          isLoading={submitting}
          error={formError}
          onSubmit={handleSubmit}
          onCancel={() => { setModal(null); setFormError(null); }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl p-6">
            <h2 className="text-lg font-semibold mb-2">Eliminar hotel</h2>
            <p className="text-white/60 text-sm mb-6">
              ¿Eliminar <span className="text-white font-medium">{deleteTarget.nombre}</span>? Se eliminará de forma lógica.
            </p>
            {formError && <p className="mb-3 text-sm text-red-400">{formError}</p>}
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={submitting} className="text-white/60 hover:text-white">
                Cancelar
              </Button>
              <Button onClick={handleDelete} disabled={submitting} className="bg-red-500 hover:bg-red-400 text-white">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {detail && (
        <HotelDetailPanel
          hotel={hoteles.find((h) => h.id === detail.id) ?? detail}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
