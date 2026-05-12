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

import { destinoFormSchema, type DestinoFormData } from '../../schemas/destino-form.schema';
import type { Destino } from '../../../domain/entities/destino.types';
import { MediaUploader } from './MediaUploader';

interface DestinoFormProps {
  initial?: Destino | null;
  isLoading: boolean;
  onSubmit: (data: DestinoFormData) => Promise<void>;
  onCancel: () => void;
}

export function DestinoForm({
  initial,
  isLoading,
  onSubmit,
  onCancel,
}: DestinoFormProps): React.ReactElement {
  const form = useForm<DestinoFormData>({
    resolver: zodResolver(destinoFormSchema),
    defaultValues: {
      nombre: '',
      pais: '',
      descripcion: '',
      imagenes: [],
      destacado: false,
      activo: true,
    },
  });

  useEffect(() => {
    if (initial) {
      form.reset({
        nombre: initial.nombre,
        pais: initial.pais,
        descripcion: initial.descripcion ?? '',
        imagenes: initial.imagenes ?? [],
        destacado: initial.destacado,
        activo: initial.activo,
      });
    }
  }, [initial, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Lugar / Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. Cancún"
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
            name="pais"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">País</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. México"
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50"
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
                  placeholder="Descripción del destino…"
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
          name="imagenes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80">
                Imágenes / Videos <span className="text-white/40">(opcional)</span>
              </FormLabel>
              <FormControl>
                <div>
                  <MediaUploader
                    value={field.value ?? []}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-6 pt-1">
          <FormField
            control={form.control}
            name="destacado"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500"
                  />
                </FormControl>
                <FormLabel className="text-white/70 font-normal cursor-pointer">Destacado</FormLabel>
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
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                    className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500"
                  />
                </FormControl>
                <FormLabel className="text-white/70 font-normal cursor-pointer">Activo</FormLabel>
              </FormItem>
            )}
          />
        </div>

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
            {initial ? 'Guardar cambios' : 'Crear destino'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
