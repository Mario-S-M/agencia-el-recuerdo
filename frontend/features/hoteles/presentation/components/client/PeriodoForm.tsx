'use client';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { periodoHotelFormSchema, type PeriodoHotelFormData } from '../../schemas/hotel-form.schema';
import type { PeriodoHotel } from '../../../domain/entities/hotel.types';

const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';

interface PeriodoFormProps {
  initial?: PeriodoHotel | null;
  isLoading: boolean;
  onSubmit: (data: PeriodoHotelFormData) => Promise<void>;
  onCancel: () => void;
}

export function PeriodoForm({
  initial,
  isLoading,
  onSubmit,
  onCancel,
}: PeriodoFormProps): React.ReactElement {
  const form = useForm<PeriodoHotelFormData>({
    resolver: zodResolver(periodoHotelFormSchema),
    defaultValues: {
      nombre: initial?.nombre ?? '',
      fechaInicio: initial?.fechaInicio?.slice(0, 10) ?? '',
      fechaFin: initial?.fechaFin?.slice(0, 10) ?? '',
      descripcion: initial?.descripcion ?? '',
      activo: initial?.activo ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Nombre del periodo</FormLabel>
            <FormControl>
              <Input placeholder="Ej. Semana Santa 2026" disabled={isLoading} className={inputCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="fechaInicio" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Fecha inicio</FormLabel>
              <FormControl>
                <Input type="date" disabled={isLoading} className={inputCls + ' [color-scheme:dark]'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="fechaFin" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Fecha fin</FormLabel>
              <FormControl>
                <Input type="date" disabled={isLoading} className={inputCls + ' [color-scheme:dark]'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="descripcion" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Descripción <span className="text-white/40">(opcional)</span></FormLabel>
            <FormControl>
              <Input placeholder="Ej. Tarifas especiales de temporada alta" disabled={isLoading} className={inputCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-white/60 hover:text-white">Cancelar</Button>
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-400 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initial ? 'Guardar' : 'Crear periodo'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
