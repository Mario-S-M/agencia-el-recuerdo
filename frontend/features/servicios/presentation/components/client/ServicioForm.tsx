'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { servicioFormSchema, type ServicioFormData } from '../../schemas/servicio-form.schema';
import { TIPO_SERVICIO_OPTIONS, TIPO_COLOR } from '../../schemas/servicio-constants';
import type { Servicio } from '../../../domain/entities/servicio.types';

interface ServicioFormProps {
  initial?: Servicio | null;
  isLoading: boolean;
  onSubmit: (data: ServicioFormData) => Promise<void>;
  onCancel: () => void;
}

export function ServicioForm({
  initial,
  isLoading,
  onSubmit,
  onCancel,
}: ServicioFormProps): React.ReactElement {
  const form = useForm<ServicioFormData>({
    resolver: zodResolver(servicioFormSchema),
    defaultValues: {
      nombre: '',
      tipo: 'paquete_mar',
      descripcion: '',
      icono: '',
      activo: true,
    },
  });

  useEffect(() => {
    if (initial) {
      form.reset({
        nombre: initial.nombre,
        tipo: initial.tipo,
        descripcion: initial.descripcion ?? '',
        icono: initial.icono ?? '',
        activo: initial.activo,
      });
    }
  }, [initial, form]);

  const tipoActual = form.watch('tipo');
  const colorActual = TIPO_COLOR[tipoActual];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">Tipo de servicio</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-2">
                  {TIPO_SERVICIO_OPTIONS.map((opt) => {
                    const colors = TIPO_COLOR[opt.value];
                    const selected = field.value === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        disabled={isLoading}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                          selected
                            ? `${colors.bg} ${colors.text} border-current`
                            : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-base leading-none">{opt.emoji}</span>
                        <span className="font-medium leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_80px]">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Paquetes al Mar Premium"
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Ícono</FormLabel>
                <FormControl>
                  <Input
                    placeholder={TIPO_SERVICIO_OPTIONS.find((o) => o.value === tipoActual)?.emoji ?? ''}
                    disabled={isLoading}
                    className={`bg-white/5 border-white/10 text-center text-xl placeholder:text-white/20 focus-visible:border-orange-500/50 ${colorActual.text}`}
                    maxLength={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">
                Descripción <span className="text-white/40">(opcional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve descripción del tipo de servicio…"
                  rows={3}
                  disabled={isLoading}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value ?? true}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500"
                />
              </FormControl>
              <FormLabel className="text-white/70 font-normal cursor-pointer">Activo</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="text-white/60 hover:text-white hover:bg-white/5"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-400 text-white"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initial ? 'Guardar cambios' : 'Crear servicio'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
