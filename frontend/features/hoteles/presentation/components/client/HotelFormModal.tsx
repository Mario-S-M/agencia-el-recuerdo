'use client';

import { Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { hotelFormSchema, type HotelFormData } from '../../schemas/hotel-form.schema';
import { MediaUploader } from '@/features/destinos/presentation/components/client/MediaUploader';
import type { Hotel } from '../../../domain/entities/hotel.types';
import type { Destino } from '@/features/destinos/domain/entities';

const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';

interface HotelFormModalProps {
  initial?: Hotel | null;
  destinos: Destino[];
  isLoading: boolean;
  error: string | null;
  onSubmit: (data: HotelFormData) => Promise<void>;
  onCancel: () => void;
}

export function HotelFormModal({
  initial,
  destinos,
  isLoading,
  error,
  onSubmit,
  onCancel,
}: HotelFormModalProps): React.ReactElement {
  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      nombre: initial?.nombre ?? '',
      direccion: initial?.direccion ?? '',
      descripcion: initial?.descripcion ?? '',
      googleMapsUrl: initial?.googleMapsUrl ?? '',
      destinoId: initial?.destinoId ?? '',
      fotos: initial?.fotos ?? [],
      activo: initial?.activo ?? true,
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">{initial ? 'Editar hotel' : 'Nuevo hotel'}</h2>
        </div>
        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField control={form.control} name="nombre" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Nombre del hotel</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Grand Palladium Cancún" disabled={isLoading} className={inputCls} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="direccion" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Dirección <span className="text-white/40">(opcional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Blvd. Kukulcán Km 14.5, Cancún" disabled={isLoading} className={inputCls} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="googleMapsUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Link de Google Maps <span className="text-white/40">(opcional)</span></FormLabel>
                  <FormControl>
                    <Input placeholder="https://maps.app.goo.gl/..." disabled={isLoading} className={inputCls} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="destinoId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Destino <span className="text-white/40">(opcional)</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Seleccionar destino…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0d1117] border-white/10 text-white">
                      {destinos.map((d) => (
                        <SelectItem key={d.id} value={d.id} className="focus:bg-white/10 focus:text-white">
                          {d.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="descripcion" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Descripción <span className="text-white/40">(opcional)</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción del hotel…" rows={3} disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="fotos" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Fotos del hotel <span className="text-white/40">(opcional)</span></FormLabel>
                  <FormControl>
                    <MediaUploader value={field.value ?? []} onChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="activo" render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} disabled={isLoading}
                      className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500" />
                  </FormControl>
                  <FormLabel className="text-white/70 font-normal cursor-pointer">Activo</FormLabel>
                </FormItem>
              )} />

              <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading} className="text-white/60 hover:text-white">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-400 text-white">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {initial ? 'Guardar cambios' : 'Crear hotel'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
