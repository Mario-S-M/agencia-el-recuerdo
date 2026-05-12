import type { z } from 'zod';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export class HttpClient {
  constructor(private readonly getToken: () => string | null) {}

  async get<T>(path: string, schema?: z.ZodType): Promise<T> {
    return this.request<T>('GET', path, undefined, schema);
  }

  async post<T>(path: string, body?: unknown, schema?: z.ZodType): Promise<T> {
    return this.request<T>('POST', path, body, schema);
  }

  async patch<T>(path: string, body?: unknown, schema?: z.ZodType): Promise<T> {
    return this.request<T>('PATCH', path, body, schema);
  }

  async delete<T = void>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    schema?: z.ZodType,
  ): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) return undefined as T;

    const data: unknown = await res.json();

    if (!res.ok) {
      const msg =
        typeof data === 'object' && data !== null && 'message' in data
          ? String((data as Record<string, unknown>).message)
          : `Error ${res.status}`;
      throw new Error(msg);
    }

    if (schema) {
      const result = schema.safeParse(data);
      if (!result.success) {
        console.error(`[HttpClient] Validación Zod falló para ${method} ${path}:`, result.error.format());
        return data as T;
      }
      return result.data as T;
    }

    return data as T;
  }
}

let httpClientInstance: HttpClient | null = null;

export function getHttpClient(): HttpClient {
  if (!httpClientInstance) {
    httpClientInstance = new HttpClient(() => {
      if (typeof window === 'undefined') return null;
      const raw = localStorage.getItem('auth-storage');
      if (!raw) return null;
      try {
        return (JSON.parse(raw) as { state?: { token?: string } })?.state?.token ?? null;
      } catch {
        return null;
      }
    });
  }
  return httpClientInstance;
}
