'use client';

import { useState } from 'react';
import {
  Pencil, Trash2, AlertCircle, X, Bed, Calendar, ImageIcon, MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHoteles } from '../../hooks/useHoteles';
import { TipoHabitacionForm } from './TipoHabitacionForm';
import { PeriodoForm } from './PeriodoForm';
import { TarifaGrid } from './TarifaGrid';
import { OCUPACION_LABELS } from '../../../domain/entities/hotel.types';
import type { Hotel, TipoHabitacion, PeriodoHotel } from '../../../domain/entities/hotel.types';
import type { TipoHabitacionFormData, PeriodoHotelFormData } from '../../schemas/hotel-form.schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function formatFecha(f: string): string {
  return format(new Date(f + 'T00:00:00'), "d 'de' MMM yyyy", { locale: es });
}

interface HotelDetailPanelProps {
  hotel: Hotel;
  onClose: () => void;
}

export function HotelDetailPanel({ hotel, onClose }: HotelDetailPanelProps): React.ReactElement {
  const { addTipo, editTipo, removeTipo, addPeriodo, editPeriodo, removePeriodo, addTarifa, removeTarifa } = useHoteles();
  const [tipoModal, setTipoModal] = useState<'create' | TipoHabitacion | null>(null);
  const [periodoModal, setPeriodoModal] = useState<'create' | PeriodoHotel | null>(null);
  const [expandedPeriodo, setExpandedPeriodo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleTipoSubmit(data: TipoHabitacionFormData): Promise<void> {
    setBusy(true); setErr(null);
    try {
      if (tipoModal === 'create') {
        await addTipo(hotel.id, { ...data, descripcion: data.descripcion || undefined });
      } else if (tipoModal) {
        await editTipo(hotel.id, tipoModal.id, { ...data, descripcion: data.descripcion || undefined });
      }
      setTipoModal(null);
    } catch (e) { setErr(e instanceof Error ? e.message : 'Error'); }
    finally { setBusy(false); }
  }

  async function handlePeriodoSubmit(data: PeriodoHotelFormData): Promise<void> {
    setBusy(true); setErr(null);
    try {
      if (periodoModal === 'create') {
        await addPeriodo(hotel.id, { ...data, descripcion: data.descripcion || undefined });
      } else if (periodoModal) {
        await editPeriodo(hotel.id, periodoModal.id, { ...data, descripcion: data.descripcion || undefined });
      }
      setPeriodoModal(null);
    } catch (e) { setErr(e instanceof Error ? e.message : 'Error'); }
    finally { setBusy(false); }
  }

  async function handleAddTarifa(periodoId: string, tipoHabitacionId: string, precio: number): Promise<void> {
    setBusy(true); setErr(null);
    try { await addTarifa(hotel.id, periodoId, { tipoHabitacionId, precio }); }
    catch (e) { setErr(e instanceof Error ? e.message : 'Error'); }
    finally { setBusy(false); }
  }

  async function handleRemoveTarifa(periodoId: string, tarifaId: string): Promise<void> {
    setBusy(true); setErr(null);
    try { await removeTarifa(hotel.id, periodoId, tarifaId); }
    catch (e) { setErr(e instanceof Error ? e.message : 'Error'); }
    finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="h-full w-full max-w-2xl bg-[#0d1117] border-l border-white/10 overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d1117]">
          <div>
            <h2 className="text-lg font-semibold">{hotel.nombre}</h2>
            {hotel.direccion && <p className="text-sm text-white/40">{hotel.direccion}</p>}
            {hotel.googleMapsUrl && (
              <a href={hotel.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> Ver en Google Maps
              </a>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-8">
          {err && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {err}
            </div>
          )}

          {hotel.fotos?.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 font-semibold text-white/80 mb-3">
                <ImageIcon className="h-4 w-4 text-orange-400" /> Fotos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {hotel.fotos.map((foto) => (
                  <img
                    key={foto}
                    src={`${API}${foto}`}
                    alt=""
                    className="w-full aspect-video object-cover rounded-lg border border-white/10"
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2 font-semibold text-white/80">
                <Bed className="h-4 w-4 text-orange-400" /> Tipos de habitación
              </h3>
              <Button size="sm" onClick={() => setTipoModal('create')}
                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 h-7 text-xs gap-1">
                Agregar
              </Button>
            </div>

            {hotel.tiposHabitacion.length === 0 ? (
              <p className="text-sm text-white/30 py-3">Sin tipos de habitación registrados.</p>
            ) : (
              <div className="space-y-2">
                {hotel.tiposHabitacion.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{t.nombre}</p>
                      <p className="text-xs text-white/40">{OCUPACION_LABELS[t.ocupacion]}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.activo ? 'bg-green-500/15 text-green-400' : 'bg-white/10 text-white/40'}`}>
                        {t.activo ? 'Activo' : 'Inactivo'}
                      </span>
                      <button onClick={() => setTipoModal(t)} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => removeTipo(hotel.id, t.id)} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tipoModal !== null && (
              <div className="mt-4 rounded-xl border border-white/10 bg-[#030712] p-4">
                <h4 className="text-sm font-medium mb-4">{tipoModal === 'create' ? 'Nuevo tipo de habitación' : 'Editar tipo'}</h4>
                <TipoHabitacionForm
                  initial={tipoModal === 'create' ? null : tipoModal}
                  isLoading={busy}
                  onSubmit={handleTipoSubmit}
                  onCancel={() => setTipoModal(null)}
                />
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2 font-semibold text-white/80">
                <Calendar className="h-4 w-4 text-orange-400" /> Periodos tarifarios
              </h3>
              <Button size="sm" onClick={() => setPeriodoModal('create')}
                className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 h-7 text-xs gap-1">
                Nuevo periodo
              </Button>
            </div>

            {hotel.periodos.length === 0 ? (
              <p className="text-sm text-white/30 py-3">Sin periodos registrados.</p>
            ) : (
              <div className="space-y-2">
                {hotel.periodos.map((p) => (
                  <div key={p.id} className="rounded-lg border border-white/10 overflow-hidden">
                    <div
                      className="flex items-center justify-between px-4 py-3 bg-white/5 cursor-pointer hover:bg-white/8"
                      onClick={() => setExpandedPeriodo(expandedPeriodo === p.id ? null : p.id)}
                    >
                      <div>
                        <p className="font-medium text-sm">{p.nombre}</p>
                        <p className="text-xs text-white/40">{formatFecha(p.fechaInicio)} — {formatFecha(p.fechaFin)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">{p.tarifas.length} tarifa{p.tarifas.length !== 1 ? 's' : ''}</span>
                        <button onClick={(e) => { e.stopPropagation(); setPeriodoModal(p); }} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); removePeriodo(hotel.id, p.id); }} className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {expandedPeriodo === p.id && (
                      <TarifaGrid
                        periodo={p}
                        tiposHabitacion={hotel.tiposHabitacion}
                        onAddTarifa={(tipoId, precio) => handleAddTarifa(p.id, tipoId, precio)}
                        onRemoveTarifa={(tarifaId) => handleRemoveTarifa(p.id, tarifaId)}
                        busy={busy}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {periodoModal !== null && (
              <div className="mt-4 rounded-xl border border-white/10 bg-[#030712] p-4">
                <h4 className="text-sm font-medium mb-4">{periodoModal === 'create' ? 'Nuevo periodo' : 'Editar periodo'}</h4>
                <PeriodoForm
                  initial={periodoModal === 'create' ? null : periodoModal}
                  isLoading={busy}
                  onSubmit={handlePeriodoSubmit}
                  onCancel={() => setPeriodoModal(null)}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
