'use client';

import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FechaSalidaCalendario } from '../../../domain/entities/calendario.types';
import {
  SERVICIO_CONFIG,
  getEstadoCupo,
} from '../../../domain/entities/calendario.types';

interface EventCardProps {
  fecha: FechaSalidaCalendario;
}

const ESTADO_STYLES = {
  disponible: {
    badge: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    bar: 'bg-emerald-400',
    label: 'Disponible',
  },
  ultimos: {
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    bar: 'bg-amber-400',
    label: 'Últimos lugares',
  },
  agotado: {
    badge: 'bg-red-500/15 text-red-300 border border-red-500/30',
    bar: 'bg-red-400',
    label: 'Agotado',
  },
};

export function EventCard({ fecha }: EventCardProps) {
  const { paquete, fechaSalida, fechaRegreso, cupoMaximo, cupoMinimo, cupoDisponible } =
    fecha;
  const { destino, servicios } = paquete;
  const primerServicio = servicios[0];
  const config = primerServicio ? SERVICIO_CONFIG[primerServicio.tipo] : SERVICIO_CONFIG.paquete_mar;
  const estado = getEstadoCupo(cupoDisponible, cupoMinimo);
  const estadoStyle = ESTADO_STYLES[estado];

  const ocupados = cupoMaximo - cupoDisponible;
  const porcentajeOcupado = cupoMaximo > 0 ? (ocupados / cupoMaximo) * 100 : 0;
  const porcentajeMinimo = cupoMaximo > 0 ? (cupoMinimo / cupoMaximo) * 100 : 0;

  const salida = parseISO(fechaSalida);
  const regreso = fechaRegreso ? parseISO(fechaRegreso) : null;

  return (
    <div
      className={cn(
        'rounded-xl border bg-white/[0.03] p-4 transition-all duration-200',
        'hover:bg-white/[0.06] hover:border-white/20',
        config.border,
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl leading-none shrink-0">{config.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {paquete.nombre}
            </p>
            <p className={cn('text-xs font-medium', config.color)}>
              {config.label}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
            estadoStyle.badge,
          )}
        >
          {estadoStyle.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-3 text-white/60">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="text-xs truncate">
          {destino.nombre}, {destino.pais}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-4 text-white/60">
        <Calendar className="w-3 h-3 shrink-0" />
        <span className="text-xs">
          {format(salida, "d 'de' MMMM", { locale: es })}
          {regreso && (
            <>
              <ArrowRight className="inline w-3 h-3 mx-1" />
              {format(regreso, "d 'de' MMMM", { locale: es })}
            </>
          )}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white/50">
            <Users className="w-3 h-3" />
            <span className="text-xs">Cupo</span>
          </div>
          <span className="text-xs font-medium text-white/80">
            {cupoDisponible} / {cupoMaximo}
          </span>
        </div>

        <div className="relative h-1.5 rounded-full bg-white/10 overflow-visible">
          <div
            className={cn('h-full rounded-full transition-all', estadoStyle.bar)}
            style={{ width: `${Math.min(porcentajeOcupado, 100)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white/40 rounded-full"
            style={{ left: `${porcentajeMinimo}%` }}
            title={`Mínimo: ${cupoMinimo}`}
          />
        </div>

        <p className="text-[10px] text-white/35">
          Mín. {cupoMinimo} para confirmar
        </p>
      </div>

      {paquete.incluye && paquete.incluye.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/8">
          <p className="text-[10px] text-white/40 uppercase tracking-wide mb-1.5">
            Incluye
          </p>
          <div className="flex flex-wrap gap-1">
            {paquete.incluye.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50 border border-white/8"
              >
                {item}
              </span>
            ))}
            {paquete.incluye.length > 3 && (
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                +{paquete.incluye.length - 3} más
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
