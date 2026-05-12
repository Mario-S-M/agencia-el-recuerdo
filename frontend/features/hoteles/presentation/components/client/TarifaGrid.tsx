'use client';

import { DollarSign, X, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { tarifaFormSchema, type TarifaFormData } from '../../schemas/hotel-form.schema';
import { OCUPACION_LABELS } from '../../../domain/entities/hotel.types';
import type { PeriodoHotel, TipoHabitacion } from '../../../domain/entities/hotel.types';

const selectCls = 'w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50';
const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';

function formatPrecio(p: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(p);
}

interface TarifaGridProps {
  periodo: PeriodoHotel;
  tiposHabitacion: TipoHabitacion[];
  onAddTarifa: (tipoId: string, precio: number) => Promise<void>;
  onRemoveTarifa: (tarifaId: string) => Promise<void>;
  busy: boolean;
}

export function TarifaGrid({
  periodo,
  tiposHabitacion,
  onAddTarifa,
  onRemoveTarifa,
  busy,
}: TarifaGridProps): React.ReactElement {
  const form = useForm<TarifaFormData>({
    resolver: zodResolver(tarifaFormSchema),
    defaultValues: { tipoHabitacionId: '', precio: 0 },
  });

  const tiposDisponibles = tiposHabitacion.filter(
    (t) => t.activo && !periodo.tarifas.some((tarifa) => tarifa.tipoHabitacionId === t.id),
  );

  async function handleAdd(data: TarifaFormData): Promise<void> {
    await onAddTarifa(data.tipoHabitacionId, data.precio);
    form.reset({ tipoHabitacionId: '', precio: 0 });
  }

  return (
    <div className="px-4 py-3 bg-[#030712] space-y-3">
      <p className="text-xs text-white/40 flex items-center gap-1">
        <DollarSign className="h-3 w-3" /> Tarifas por tipo de habitación
      </p>

      {periodo.tarifas.length > 0 && (
        <div className="space-y-1.5">
          {periodo.tarifas.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-sm py-1.5 px-3 rounded-md bg-white/5">
              <span className="text-white/70">
                {t.tipoHabitacion?.nombre ?? '—'}
                <span className="text-white/30 ml-1.5 text-xs">({OCUPACION_LABELS[t.tipoHabitacion?.ocupacion ?? 'doble']})</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-400">{formatPrecio(Number(t.precio))}</span>
                <button onClick={() => onRemoveTarifa(t.id)} disabled={busy}
                  className="p-1 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded">
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tiposDisponibles.length > 0 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAdd)} className="flex items-end gap-2">
            <FormField control={form.control} name="tipoHabitacionId" render={({ field }) => (
              <FormItem className="flex-1">
                <select disabled={busy} className={selectCls + ' text-xs py-1.5'} {...field}>
                  <option value="">Selecciona tipo…</option>
                  {tiposDisponibles.map((t) => (
                    <option key={t.id} value={t.id}>{t.nombre} ({OCUPACION_LABELS[t.ocupacion]})</option>
                  ))}
                </select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="precio" render={({ field }) => (
              <FormItem className="w-28">
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="Precio" disabled={busy}
                    className={inputCls + ' text-xs h-9'}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" size="sm" disabled={busy}
              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 h-9">
              <Check className="h-3.5 w-3.5" />
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
