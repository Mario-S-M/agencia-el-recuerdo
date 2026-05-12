'use client';

import { useRef, useState } from 'react';
import { ImageIcon, VideoIcon, UploadCloud, X, Loader2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadMedia, mediaUrl } from '../../../data/api/uploads.api';
import { useAuthStore } from '@/features/auth/presentation/store/useAuthStore';

interface MediaUploaderProps {
  value: string[];
  onChange: (paths: string[]) => void;
  disabled?: boolean;
}

interface UploadingItem {
  id: string;
  name: string;
}

const ACCEPTED = '.jpg,.jpeg,.png,.mp4';

function isVideo(path: string): boolean {
  return path.toLowerCase().endsWith('.mp4');
}

function MediaThumb({ path, onRemove, disabled }: { path: string; onRemove: () => void; disabled?: boolean }): React.ReactElement {
  return (
    <div className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5">
      {isVideo(path) ? (
        <video src={mediaUrl(path)} className="h-full w-full object-cover" muted />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaUrl(path)} alt="" className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
        {isVideo(path) ? <VideoIcon className="h-2.5 w-2.5" /> : <ImageIcon className="h-2.5 w-2.5" />}
        {isVideo(path) ? 'Video' : 'Imagen'}
      </div>
    </div>
  );
}

export function MediaUploader({ value, onChange, disabled }: MediaUploaderProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<UploadingItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((s) => s.token);

  async function handleFiles(files: FileList): Promise<void> {
    setError(null);
    const items: UploadingItem[] = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
    }));
    setUploading((prev) => [...prev, ...items]);

    const results = await Promise.allSettled(
      Array.from(files).map((file, i) =>
        uploadMedia(file, token ?? '').then((r) => ({ id: items[i].id, url: r.url })),
      ),
    );

    const succeeded: string[] = [];
    const failedNames: string[] = [];
    let firstError: string | null = null;

    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        succeeded.push(r.value.url);
      } else {
        failedNames.push(items[i].name);
        if (!firstError) {
          const msg = r.reason instanceof Error ? r.reason.message : String(r.reason);
          firstError = msg === 'Unauthorized' ? 'Sesión expirada — vuelve a iniciar sesión' : msg;
        }
      }
    });

    if (succeeded.length > 0) onChange([...value, ...succeeded]);
    if (failedNames.length > 0) {
      setError(`No se pudieron subir: ${failedNames.join(', ')}${firstError ? ` — ${firstError}` : ''}`);
    }

    setUploading((prev) => prev.filter((u) => !items.find((i) => i.id === u.id)));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files?.length) void handleFiles(e.target.files);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.dataTransfer.files.length) void handleFiles(e.dataTransfer.files);
  }

  function handleRemove(path: string): void {
    onChange(value.filter((p) => p !== path));
  }

  const hasMedia = value.length > 0 || uploading.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {hasMedia && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {value.map((path) => (
            <MediaThumb
              key={path}
              path={path}
              onRemove={() => handleRemove(path)}
              disabled={disabled}
            />
          ))}
          {uploading.map((u) => (
            <div
              key={u.id}
              className="flex aspect-video items-center justify-center rounded-lg border border-white/10 bg-white/5"
            >
              <div className="flex flex-col items-center gap-1.5">
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                <p className="max-w-[90px] truncate text-[10px] text-white/40">{u.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!disabled && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            'flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 bg-white/5 px-4 py-5 text-sm transition-colors cursor-pointer',
            'hover:border-orange-500/50 hover:bg-white/[0.07]',
          )}
        >
          {hasMedia ? (
            <>
              <Plus className="h-4 w-4 text-white/40" />
              <span className="text-white/50">Agregar más archivos</span>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <UploadCloud className="h-7 w-7 text-white/30" />
              <div className="text-center">
                <p className="font-medium text-white/60">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="mt-0.5 text-xs text-white/30">JPG, PNG o MP4 · máx. 50 MB por archivo</p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
}
