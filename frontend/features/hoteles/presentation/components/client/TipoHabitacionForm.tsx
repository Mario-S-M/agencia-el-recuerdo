'use client';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { tipoHabitacionFormSchema, type TipoHabitacionFormData } from '../../schemas/hotel-form.schema';
import { OCUPACION_LABELS } from '../../../domain/entities/hotel.types';
import type { TipoHabitacion } from '../../../domain/entities/hotel.types';

const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';
const selectCls = 'w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50';

interface TipoHabitacionFormProps {
  initial?: TipoHabitacion | null;
  isLoading: boolean;
  onSubmit: (data: TipoHabitacionFormData) => Promise<void>;
  onCancel: () => void;
}

export function TipoHabitacionForm({
  initial,
  isLoading,
  onSubmit,
  onCancel,
}: TipoHabitacionFormProps): React.ReactElement {
  const form = useForm<TipoHabitacionFormData>({
    resolver: zodResolver(tipoHabitacionFormSchema),
    defaultValues: {
      nombre: initial?.nombre ?? '',
      ocupacion: initial?.ocupacion ?? 'doble',
      descripcion: initial?.descripcion ?? '',
      activo: initial?.activo ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Nombre</FormLabel>
            <FormControl>
              <Input placeholder="Ej. Suite Junior Vista al Mar" disabled={isLoading} className={inputCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="ocupacion" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Tipo de ocupación</FormLabel>
            <FormControl>
              <select disabled={isLoading} className={selectCls} {...field}>
                {(Object.keys(OCUPACION_LABELS) as Array<keyof typeof OCUPACION_LABELS>).map((k) => (
                  <option key={k} value={k}>{OCUPACION_LABELS[k]}</option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="descripcion" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Descripción <span className="text-white/40">(opcional)</span></FormLabel>
            <FormControl>
              <Textarea rows={2} disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-white/60 hover:text-white">Cancelar</Button>
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-400 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initial ? 'Guardar' : 'Agregar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
