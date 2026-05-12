'use client';

import { format, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FechaSalidaCalendario } from '../../../domain/entities/calendario.types';
import { EventCard } from './EventCard';

interface CalendarSidebarProps {
  selectedDate: Date | null;
  fechas: FechaSalidaCalendario[];
}

export function CalendarSidebar({ selectedDate, fechas }: CalendarSidebarProps) {
  const eventsForDay = selectedDate
    ? fechas.filter((f) =>
        isSameDay(parseISO(f.fechaSalida), selectedDate),
      )
    : [];

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-5 py-4 border-b border-white/8">
        {selectedDate ? (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
              Salidas programadas
            </p>
            <h3 className="text-base font-semibold text-white capitalize">
              {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </h3>
          </div>
        ) : (
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
              Detalle de salidas
            </p>
            <h3 className="text-sm text-white/50">
              Selecciona un día en el calendario
            </h3>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
        <AnimatePresence mode="wait">
          {!selectedDate ? (
            <motion.div
              key="empty-no-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-center"
            >
              <CalendarDays className="w-10 h-10 text-white/15 mb-3" />
              <p className="text-sm text-white/30">
                Haz clic en un día con eventos para ver los detalles
              </p>
            </motion.div>
          ) : eventsForDay.length === 0 ? (
            <motion.div
              key="empty-no-events"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-40 text-center"
            >
              <CalendarDays className="w-10 h-10 text-white/15 mb-3" />
              <p className="text-sm text-white/30">
                No hay salidas programadas para este día
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {eventsForDay.map((fecha) => (
                <EventCard key={fecha.id} fecha={fecha} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
