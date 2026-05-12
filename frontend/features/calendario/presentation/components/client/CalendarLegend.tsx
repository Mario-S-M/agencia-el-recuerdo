'use client';

import { cn } from '@/lib/utils';
import { SERVICIO_CONFIG } from '../../../domain/entities/calendario.types';
import type { TipoServicio } from '../../../domain/entities/calendario.types';

const TIPOS: TipoServicio[] = [
  'paquete_mar',
  'vuelo',
  'excursion',
  'transporte',
  'crucero',
  'boda_xv',
];

export function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {TIPOS.map((tipo) => {
        const cfg = SERVICIO_CONFIG[tipo];
        return (
          <div key={tipo} className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 rounded-full shrink-0', cfg.dot)} />
            <span className="text-xs text-white/50">{cfg.label}</span>
          </div>
        );
      })}
    </div>
  );
}
