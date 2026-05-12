'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Field, FieldLabel } from '@/components/ui/field';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fechaSalidaFormSchema, type FechaSalidaFormData } from '../../schemas/fecha-salida-form.schema';
import type { FechaSalidaAdmin, PaqueteResumen } from '../../../domain/entities/fechas-salida.types';

interface FechaSalidaFormProps {
  initial?: FechaSalidaAdmin | null;
  paquetes: PaqueteResumen[];
  isLoading: boolean;
  onSubmit: (data: FechaSalidaFormData) => Promise<void>;
  onCancel: () => void;
}

function parseDateString(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : undefined;
}

function formatDateToString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';
const selectCls = 'w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50';

export function FechaSalidaForm({ initial, paquetes, isLoading, onSubmit, onCancel }: FechaSalidaFormProps): React.ReactElement {
  const [salidaOpen, setSalidaOpen] = useState(false);
  const [regresoOpen, setRegresoOpen] = useState(false);

  const form = useForm<FechaSalidaFormData>({
    resolver: zodResolver(fechaSalidaFormSchema),
    defaultValues: {
      paqueteId: '',
      fechaSalida: '',
      fechaRegreso: '',
      cupoMaximo: '',
      cupoMinimo: '',
      cupoDisponible: '',
      activo: true,
    },
  });

  useEffect(() => {
    if (initial) {
      form.reset({
        paqueteId: initial.paqueteId,
        fechaSalida: initial.fechaSalida?.slice(0, 10) ?? '',
        fechaRegreso: initial.fechaRegreso?.slice(0, 10) ?? '',
        cupoMaximo: String(initial.cupoMaximo),
        cupoMinimo: String(initial.cupoMinimo),
        cupoDisponible: String(initial.cupoDisponible),
        activo: initial.activo,
      });
    } else {
      form.reset({
        paqueteId: '',
        fechaSalida: '',
        fechaRegreso: '',
        cupoMaximo: '',
        cupoMinimo: '',
        cupoDisponible: '',
        activo: true,
      });
    }
  }, [initial, form]);

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <FormField control={form.control} name="paqueteId" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Paquete</FormLabel>
            <FormControl>
              <select disabled={isLoading} className={cn(selectCls, errors.paqueteId && 'border-red-500')} {...field}>
                <option value="">Selecciona un paquete…</option>
                {paquetes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} — {p.destino?.nombre ?? ''}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Field>
          <FieldLabel className="text-white/80 text-sm font-medium">Fecha de salida</FieldLabel>
          <Popover open={salidaOpen} onOpenChange={setSalidaOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" disabled={isLoading}
                className={cn('w-full justify-between font-normal bg-white/5 border-white/10 text-white hover:bg-white/10',
                  !form.watch('fechaSalida') && 'text-muted-foreground')}>
                {form.watch('fechaSalida')
                  ? format(parseDateString(form.watch('fechaSalida')!), 'd MMM yyyy', { locale: es })
                  : 'Selecciona fecha'}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={parseDateString(form.watch('fechaSalida') ?? '')}
                captionLayout="dropdown"
                onSelect={(date) => {
                  form.setValue('fechaSalida', date ? formatDateToString(date) : '');
                  setSalidaOpen(false);
                }}
                locale={es}
              />
            </PopoverContent>
          </Popover>
          {errors.fechaSalida && <p className="text-xs text-red-400 mt-1">{errors.fechaSalida.message}</p>}
        </Field>

        <Field>
          <FieldLabel className="text-white/80 text-sm font-medium">
            Fecha de regreso <span className="text-white/40">(opcional)</span>
          </FieldLabel>
          <Popover open={regresoOpen} onOpenChange={setRegresoOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" disabled={isLoading}
                className={cn('w-full justify-between font-normal bg-white/5 border-white/10 text-white hover:bg-white/10',
                  !form.watch('fechaRegreso') && 'text-muted-foreground')}>
                {form.watch('fechaRegreso')
                  ? format(parseDateString(form.watch('fechaRegreso')!), 'd MMM yyyy', { locale: es })
                  : 'Selecciona fecha'}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={parseDateString(form.watch('fechaRegreso') ?? '')}
                captionLayout="dropdown"
                onSelect={(date) => {
                  form.setValue('fechaRegreso', date ? formatDateToString(date) : '');
                  setRegresoOpen(false);
                }}
                disabled={(date) => {
                  const salida = parseDateString(form.watch('fechaSalida') ?? '');
                  return salida ? date < salida : false;
                }}
                locale={es}
              />
            </PopoverContent>
          </Popover>
          {errors.fechaRegreso && <p className="text-xs text-red-400 mt-1">{errors.fechaRegreso.message}</p>}
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <FormField control={form.control} name="cupoMaximo" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Cupo máximo</FormLabel>
              <FormControl>
                <Input type="number" min="1" step="1" placeholder="30" disabled={isLoading} className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="cupoMinimo" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Cupo mínimo</FormLabel>
              <FormControl>
                <Input type="number" min="1" step="1" placeholder="5" disabled={isLoading} className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="cupoDisponible" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Disponible</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="1" placeholder="30" disabled={isLoading} className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="activo" render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl>
              <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} disabled={isLoading}
                className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500" />
            </FormControl>
            <FormLabel className="text-white/70 font-normal cursor-pointer">Activa y visible</FormLabel>
          </FormItem>
        )} />

        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}
            className="text-white/60 hover:text-white hover:bg-white/5">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-400 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initial ? 'Guardar cambios' : 'Crear fecha de salida'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
