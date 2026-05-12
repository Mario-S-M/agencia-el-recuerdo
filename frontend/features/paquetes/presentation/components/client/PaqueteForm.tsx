'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { paqueteFormSchema, type PaqueteFormData } from '../../schemas/paquete-form.schema';
import type { Paquete } from '../../../domain/entities/paquete.types';
import type { Destino } from '@/features/destinos/domain/entities';
import type { HotelResumenDTO, ServicioResumenDTO } from '../../../data/dto/paquete.schemas';

interface PaqueteFormProps {
  initial?: Paquete | null;
  destinos: Destino[];
  hoteles: HotelResumenDTO[];
  servicios: ServicioResumenDTO[];
  isLoading: boolean;
  onSubmit: (data: PaqueteFormData) => Promise<void>;
  onCancel: () => void;
}

const inputCls = 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50';

export function PaqueteForm({ initial, destinos, hoteles, servicios, isLoading, onSubmit, onCancel }: PaqueteFormProps): React.ReactElement {
  const form = useForm<PaqueteFormData>({
    resolver: zodResolver(paqueteFormSchema),
    defaultValues: {
      nombre: '', descripcion: '', destinoId: '',
      hotelId: '', servicioIds: [],
      destacado: false, activo: true,
    },
  });

  const selectedDestinoId = form.watch('destinoId');

  const hotelesFiltrados = selectedDestinoId
    ? hoteles.filter((h) => h.destinoId === selectedDestinoId)
    : hoteles;

  useEffect(() => {
    if (initial) {
      form.reset({
        nombre: initial.nombre,
        descripcion: initial.descripcion ?? '',
        destinoId: initial.destinoId,
        hotelId: initial.hotelId ?? '',
        servicioIds: initial.servicios.map((s) => s.id),
        destacado: initial.destacado,
        activo: initial.activo,
      });
    } else {
      form.reset({
        nombre: '', descripcion: '', destinoId: '',
        hotelId: '', servicioIds: [],
        destacado: false, activo: true,
      });
    }
  }, [initial, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Nombre del paquete</FormLabel>
            <FormControl>
              <Input placeholder="Ej. Viaje Ixtapa 5 Noches" disabled={isLoading} className={inputCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="destinoId" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Destino</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 text-white [&>svg]:text-white/50">
                  <SelectValue placeholder="Selecciona un destino…" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {destinos.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.nombre} — {d.pais}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="hotelId" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Hotel</FormLabel>
            <Select onValueChange={field.onChange} value={field.value} key={selectedDestinoId ?? ''}>
              <FormControl>
                <SelectTrigger className="bg-white/5 border-white/10 text-white [&>svg]:text-white/50">
                  <SelectValue placeholder={selectedDestinoId ? 'Selecciona un hotel…' : 'Selecciona un destino primero'} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {hotelesFiltrados.length === 0 && (
                  <p className="text-white/40 text-sm px-2 py-4 text-center">No hay hoteles para este destino</p>
                )}
                {hotelesFiltrados.map((h) => (
                  <SelectItem key={h.id} value={h.id}>{h.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="servicioIds" render={({ field }) => {
          const groups: Record<string, { label: string; servicios: ServicioResumenDTO[] }> = {
            transporte: { label: 'Transporte', servicios: [] },
            alimentacion: { label: 'Alimentación', servicios: [] },
            general: { label: 'Generales', servicios: [] },
          };
          for (const s of servicios) {
            const key = s.categoria in groups ? s.categoria : 'general';
            groups[key].servicios.push(s);
          }
          const hasAny = servicios.length > 0;
          return (
            <FormItem>
              <FormLabel className="text-white/80">Servicios incluidos</FormLabel>
              <FormControl>
                <div className="rounded-md border border-white/10 bg-white/5">
                  {!hasAny && (
                    <p className="text-white/40 text-sm px-3 py-4 text-center">No hay servicios disponibles</p>
                  )}
                  <Accordion type="single" collapsible>
                    {Object.entries(groups).map(([key, group]) =>
                      group.servicios.length === 0 ? null : (
                        <AccordionItem key={key} value={key}>
                          <AccordionTrigger>{group.label}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-0.5 px-1 pb-1">
                              {group.servicios.map((s) => {
                                const checked = field.value.includes(s.id);
                                return (
                                  <Label key={s.id} className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-white/10 text-sm text-white/80 has-data-checked:bg-orange-500/10">
                                    <Checkbox checked={checked}
                                      onCheckedChange={() => {
                                        const next = checked
                                          ? field.value.filter((id: string) => id !== s.id)
                                          : [...field.value, s.id];
                                        field.onChange(next);
                                      }}
                                      className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500" />
                                    {s.nombre}
                                  </Label>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }} />

        <FormField control={form.control} name="descripcion" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white/80">Descripción <span className="text-white/40">(opcional)</span></FormLabel>
            <FormControl>
              <Textarea placeholder="Descripción del paquete…" rows={3} disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-orange-500/50 resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex flex-wrap items-center gap-6 pt-1">
          <FormField control={form.control} name="destacado" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} disabled={isLoading}
                  className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500" />
              </FormControl>
              <FormLabel className="text-white/70 font-normal cursor-pointer">Destacado</FormLabel>
            </FormItem>
          )} />
          <FormField control={form.control} name="activo" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} disabled={isLoading}
                  className="border-white/30 data-checked:bg-orange-500 data-checked:border-orange-500" />
              </FormControl>
              <FormLabel className="text-white/70 font-normal cursor-pointer">Activo</FormLabel>
            </FormItem>
          )} />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}
            className="text-white/60 hover:text-white hover:bg-white/5">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-400 text-white">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initial ? 'Guardar cambios' : 'Crear paquete'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
