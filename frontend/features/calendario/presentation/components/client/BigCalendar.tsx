'use client';

import { useState } from 'react';
import {
  isSameDay,
  parseISO,
} from 'date-fns';
import { RefreshCw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCalendario } from '../../hooks/useCalendario';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';
import { CalendarLegend } from './CalendarLegend';

export function BigCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { fechas, isLoading, error, refetch } = useCalendario();

  function handleSelectDate(date: Date): void {
    setSelectedDate((prev) =>
      prev && isSameDay(prev, date) ? null : date,
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <CalendarLegend />
        <button
          onClick={() => void refetch()}
          disabled={isLoading}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg',
            'bg-white/5 border border-white/10 text-white/50',
            'hover:bg-white/10 hover:text-white transition-colors',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
          aria-label="Actualizar"
        >
          {isLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error} —{' '}
          <button
            onClick={() => void refetch()}
            className="underline hover:text-red-200"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-4 flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          {isLoading && fechas.length === 0 ? (
            <div className="flex h-full min-h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-white/30">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm">Cargando fechas de salida…</p>
              </div>
            </div>
          ) : (
            <CalendarGrid
              selectedDate={selectedDate}
              fechas={fechas}
              onSelectDate={handleSelectDate}
            />
          )}
        </div>

        <div
          className={cn(
            'rounded-xl border border-white/8 bg-white/[0.02]',
            'flex flex-col min-h-[300px] lg:min-h-0',
          )}
        >
          <CalendarSidebar selectedDate={selectedDate} fechas={fechas} />
        </div>
      </div>
    </div>
  );
}
