'use client';

import { useEffect, useState } from 'react';
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

interface PaisOption {
  id: string;
  nombre: string;
}

interface EstadoOption {
  id: string;
  nombre: string;
}

interface MunicipioOption {
  id: string;
  nombre: string;
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
      paisId: '',
      estadoId: '',
      municipioId: '',
      descripcion: '',
      imagenes: [],
      destacado: false,
      activo: true,
    },
  });

  const [paises, setPaises] = useState<PaisOption[]>([]);
  const [estados, setEstados] = useState<EstadoOption[]>([]);
  const [municipios, setMunicipios] = useState<MunicipioOption[]>([]);
  const [loadingPaises, setLoadingPaises] = useState(false);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

  useEffect(() => {
    async function loadPaises() {
      setLoadingPaises(true);
      try {
        const res = await fetch(`${API}/ubicaciones/paises`);
        if (res.ok) setPaises(await res.json() as PaisOption[]);
      } catch { /* ignore */ } finally { setLoadingPaises(false); }
    }
    void loadPaises();
  }, [API]);

  const paisId = form.watch('paisId');
  const estadoId = form.watch('estadoId');

  useEffect(() => {
    if (!paisId) { setEstados([]); setMunicipios([]); return; }
    async function load() {
      setLoadingEstados(true);
      try {
        const res = await fetch(`${API}/ubicaciones/estados/por-pais?paisId=${paisId}`);
        if (res.ok) setEstados(await res.json() as EstadoOption[]);
      } catch { /* ignore */ } finally { setLoadingEstados(false); }
    }
    void load();
  }, [paisId, API]);

  useEffect(() => {
    if (!estadoId) { setMunicipios([]); return; }
    async function load() {
      setLoadingMunicipios(true);
      try {
        const res = await fetch(`${API}/ubicaciones/municipios/por-estado?estadoId=${estadoId}`);
        if (res.ok) setMunicipios(await res.json() as MunicipioOption[]);
      } catch { /* ignore */ } finally { setLoadingMunicipios(false); }
    }
    void load();
  }, [estadoId, API]);

  useEffect(() => {
    if (initial) {
      form.reset({
        nombre: initial.nombre,
        pais: initial.pais,
        paisId: initial.paisId ?? '',
        estadoId: initial.estadoId ?? '',
        municipioId: initial.municipioId ?? '',
        descripcion: initial.descripcion ?? '',
        imagenes: initial.imagenes ?? [],
        destacado: initial.destacado,
        activo: initial.activo,
      });
    }
  }, [initial, form]);

  useEffect(() => {
    const selectedPais = paises.find(p => p.id === paisId);
    if (selectedPais) {
      form.setValue('pais', selectedPais.nombre);
    }
  }, [paisId, paises, form]);

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
                <FormLabel className="text-white/80">País (texto)</FormLabel>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="paisId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">País (catálogo)</FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ''}
                    onChange={(e) => { field.onChange(e.target.value); form.setValue('estadoId', ''); form.setValue('municipioId', ''); }}
                    disabled={isLoading || loadingPaises}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="">Seleccionar...</option>
                    {paises.map((p) => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estadoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Estado / Provincia</FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ''}
                    onChange={(e) => { field.onChange(e.target.value); form.setValue('municipioId', ''); }}
                    disabled={isLoading || !paisId || loadingEstados}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="">Seleccionar...</option>
                    {estados.map((e) => (
                      <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="municipioId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Municipio / Ciudad</FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={isLoading || !estadoId || loadingMunicipios}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="">Seleccionar...</option>
                    {municipios.map((m) => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                  </select>
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
