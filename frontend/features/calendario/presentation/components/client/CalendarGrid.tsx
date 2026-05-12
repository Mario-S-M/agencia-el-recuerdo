'use client';

import { useMemo, useState } from 'react';
import {
  format,
  parseISO,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import type { FechaSalidaCalendario } from '../../../domain/entities/calendario.types';

interface CalendarGridProps {
  selectedDate: Date | null;
  fechas: FechaSalidaCalendario[];
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({
  selectedDate,
  fechas,
  onSelectDate,
}: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datesWithEvents = useMemo(
    () =>
      fechas.reduce<Set<string>>((acc, f) => {
        const d = parseISO(f.fechaSalida);
        acc.add(format(d, 'yyyy-MM-dd'));
        return acc;
      }, new Set()),
    [fechas],
  );

  const modifiers = {
    hasEvent: (date: Date) => datesWithEvents.has(format(date, 'yyyy-MM-dd')),
  };

  const modifiersStyles = {
    hasEvent: { backgroundColor: 'rgba(251, 146, 60, 0.1)', border: '1px solid rgba(251, 146, 60, 0.3)', borderRadius: '8px' },
  };

  return (
    <div className="flex flex-col h-full">
      <Calendar
        mode="single"
        month={currentMonth}
        selected={selectedDate ?? undefined}
        onSelect={(date) => date && onSelectDate(date)}
        onMonthChange={setCurrentMonth}
        locale={es}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        showOutsideDays={false}
        fixedWeeks
        className="w-full [&_table]:w-full"
        classNames={{
          root: 'w-full',
          months: 'w-full',
          month: 'w-full',
          table: 'w-full border-collapse',
          head_row: 'grid grid-cols-7 mb-1',
          head_cell: 'py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-white/30',
          row: 'grid grid-cols-7 w-full',
          cell: cn(
            'relative aspect-square p-0 text-center text-sm',
            '[&:has([aria-selected])]:bg-transparent',
            'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
            'focus-within:relative focus-within:z-20',
          ),
          day: cn(
            'h-full w-full p-0 font-normal aria-selected:opacity-100',
            'flex items-center justify-center',
          ),
          day_button: cn(
            'relative flex aspect-square h-full w-full items-center justify-center rounded-md text-sm',
            'hover:bg-white/10 transition-colors',
            'aria-selected:bg-orange-500 aria-selected:text-white aria-selected:font-bold',
            'aria-selected:hover:bg-orange-400',
          ),
          caption: 'flex items-center justify-between py-2',
          caption_label: 'text-sm font-medium text-white capitalize hidden',
          nav: 'flex items-center gap-1',
          button_previous: 'flex h-7 w-7 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors',
          button_next: 'flex h-7 w-7 items-center justify-center rounded-md bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors',
          dropdowns: 'flex items-center gap-2',
          dropdown_root: 'relative',
          dropdown: 'absolute inset-0 opacity-0 cursor-pointer',
          month_caption: 'flex items-center justify-center',
        }}
        formatters={{
          formatWeekdayName: (date) => {
            const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
            return days[date.getDay() === 0 ? 6 : date.getDay() - 1];
          },
        }}
      />
    </div>
  );
}
