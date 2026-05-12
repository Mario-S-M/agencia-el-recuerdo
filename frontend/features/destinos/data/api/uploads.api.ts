const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface UploadResult {
  url: string;
  type: 'image' | 'video';
}

export async function uploadMedia(file: File, token: string): Promise<UploadResult> {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch(`${API_URL}/uploads/media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? 'Error al subir el archivo');
  }

  return res.json() as Promise<UploadResult>;
}

export function mediaUrl(path: string): string {
  return `${API_URL}${path}`;
}
