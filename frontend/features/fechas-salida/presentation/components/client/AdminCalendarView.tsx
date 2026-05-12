'use client';

import { useState, useMemo } from 'react';
import {
  format,
  parseISO,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Pencil, Trash2, MapPin, Users, CalendarDays, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FechaSalidaAdmin } from '../../../domain/entities/fechas-salida.types';
import { getEstadoCupo } from '../../../domain/entities/fechas-salida.types';

const DAY_HEADERS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MAX_VISIBLE = 3;

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'd MMM yyyy', { locale: es });
  } catch {
    return dateStr;
  }
}

const CUPO_STYLES: Record<string, { label: string; cls: string; dot: string }> = {
  agotado: { label: 'Agotado', cls: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-400' },
  ultimos: { label: 'Últimos', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30', dot: 'bg-amber-400' },
  disponible: { label: 'Disponible', cls: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  medio: { label: 'Medio', cls: 'bg-orange-500/15 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' },
};

interface AdminCalendarViewProps {
  fechas: FechaSalidaAdmin[];
  onEdit: (fecha: FechaSalidaAdmin) => void;
  onDelete: (fecha: FechaSalidaAdmin) => void;
}

export function AdminCalendarView({ fechas, onEdit, onDelete }: AdminCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const eventsForDay = selectedDate
    ? fechas.filter((f) => isSameDay(parseISO(f.fechaSalida), selectedDate))
    : [];

  function getEventsForDay(day: Date): FechaSalidaAdmin[] {
    return fechas.filter((f) => isSameDay(parseISO(f.fechaSalida), day));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setCurrentMonth((d) => subMonths(d, 1)); setSelectedDate(null); }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-white capitalize min-w-[180px] text-center">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h2>
          <button
            onClick={() => { setCurrentMonth((d) => addMonths(d, 1)); setSelectedDate(null); }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => { setCurrentMonth(new Date()); setSelectedDate(new Date()); }}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          Hoy
        </button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Calendar grid */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 divide-x divide-white/5 border-b border-white/10">
            {DAY_HEADERS.map((h) => (
              <div key={h} className="py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-white/30">
                {h}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 divide-x divide-white/5">
            {days.map((day) => {
              const events = getEventsForDay(day);
              const inMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
              const today = isToday(day);
              const visibleEvents = events.slice(0, MAX_VISIBLE);
              const overflow = events.length - MAX_VISIBLE;

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(isSameDay(selectedDate, day) ? null : day)}
                  className={cn(
                    'flex flex-col gap-0.5 p-1 min-h-[90px] text-left transition-colors border-t border-white/5',
                    inMonth ? 'bg-[#0a0f1a] cursor-pointer hover:bg-white/[0.04]' : 'bg-[#060a12] cursor-default',
                    isSelected && 'bg-orange-500/10 ring-1 ring-inset ring-orange-500/50',
                    !isSelected && today && 'bg-white/[0.03]',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                      !inMonth && 'text-white/15',
                      inMonth && !isSelected && !today && 'text-white/60',
                      today && !isSelected && 'bg-orange-500 text-white font-bold',
                      isSelected && 'bg-orange-500 text-white font-bold',
                    )}
                  >
                    {day.getDate()}
                  </span>

                  {inMonth && visibleEvents.map((ev) => {
                    const badge = getEstadoCupo(ev.cupoDisponible, ev.cupoMaximo, ev.cupoMinimo);
                    const st = CUPO_STYLES[badge];
                    return (
                      <div
                        key={ev.id}
                        className="flex items-center gap-1 rounded px-1 py-0.5 bg-white/5 border border-white/8 truncate"
                      >
                        <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', st.dot)} />
                        <span className="truncate text-[10px] text-white/60 leading-tight">
                          {ev.paquete?.nombre ?? ev.paquete?.destino?.nombre ?? ''}
                        </span>
                      </div>
                    );
                  })}

                  {inMonth && overflow > 0 && (
                    <span className="text-[10px] text-white/35 pl-1">+{overflow} más</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] flex flex-col min-h-[300px]">
          <div className="px-5 py-4 border-b border-white/10">
            {selectedDate ? (
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Salidas programadas</p>
                <h3 className="text-base font-semibold text-white capitalize">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </h3>
              </div>
            ) : (
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Detalle de salidas</p>
                <p className="text-sm text-white/50">Selecciona un día en el calendario</p>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {!selectedDate ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <CalendarDays className="w-10 h-10 text-white/15 mb-3" />
                <p className="text-sm text-white/30">Haz clic en un día para ver las salidas</p>
              </div>
            ) : eventsForDay.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <CalendarDays className="w-10 h-10 text-white/15 mb-3" />
                <p className="text-sm text-white/30">No hay salidas para este día</p>
              </div>
            ) : (
              eventsForDay.map((f) => {
                const badge = getEstadoCupo(f.cupoDisponible, f.cupoMaximo, f.cupoMinimo);
                const est = CUPO_STYLES[badge];
                return (
                  <div key={f.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{f.paquete?.nombre ?? 'Sin paquete'}</p>
                        {f.paquete?.destino && (
                          <p className="text-xs text-white/50 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {f.paquete.destino.nombre}
                          </p>
                        )}
                      </div>
                      <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold', est.cls)}>
                        {est.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(f.fechaSalida)}
                      </span>
                      {f.fechaRegreso && (
                        <>
                          <ArrowRight className="w-3 h-3" />
                          <span>{formatDate(f.fechaRegreso)}</span>
                        </>
                      )}
                      <span className="flex items-center gap-1 ml-auto">
                        <Users className="w-3 h-3" />
                        {f.cupoDisponible}/{f.cupoMaximo}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-end border-t border-white/10 pt-2">
                      <button onClick={() => onEdit(f)} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors" title="Editar">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => onDelete(f)} className="p-1.5 rounded-md text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Eliminar">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
