# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

---

## Principios de Arquitectura Obligatorios

### SOLID en React / Next.js

| Letra | Aplicación concreta |
|-------|---------------------|
| **S** — Single Responsibility | Cada componente, hook, action o servicio hace UNA sola cosa. Un componente no mezcla UI + lógica de negocio + llamadas a API. |
| **O** — Open/Closed | Extender comportamiento mediante composición y props, no modificando el componente existente. |
| **L** — Liskov Substitution | Componentes que reciben la misma interfaz de props son intercambiables sin romper la app (ej. distintos `<Button>` variants). |
| **I** — Interface Segregation | Props interfaces pequeñas y enfocadas. No pasar un objeto gigante cuando el componente solo usa 2 campos. |
| **D** — Dependency Inversion | Los componentes dependen de hooks/abstracciones, nunca llaman directamente a `fetch` o al store. |

### STUPID — Anti-patrones Prohibidos

- **S**ingleton descontrolado — No usar variables de módulo mutables como estado global; usar Zustand.
- **T**ight Coupling — No importar servicios o `fetch` directamente dentro de componentes UI; siempre a través de un hook o action.
- **U**ntestability — Evitar side effects en el cuerpo del componente fuera de `useEffect`; preferir funciones puras.
- **P**remature Optimization — No crear abstracciones genéricas para un solo caso de uso.
- **I**ndescriptive Naming — Nombres que describan el dominio (`useCartTotal`, no `useData`).
- **D**uplication — Si la misma lógica aparece en dos lugares, extraerla a un hook o utility antes de escribirla por tercera vez.

### DRY

- Lógica de negocio compartida → `hooks/` o `lib/`
- Tipos reutilizables → `types/` del feature o `lib/types/`
- Zod schemas reutilizados entre features → `lib/schemas/`
- Clases CSS repetidas → extraer a un componente o a una variable `const styles = cn(...)`

---

## Estructura por Features (obligatorio)

Organizar por **dominio/feature**, no por tipo de archivo. Cada feature es autocontenida.

```
features/
├── auth/
│   ├── components/        # Componentes UI exclusivos de auth
│   ├── hooks/             # Custom hooks (useAuth, useSession…)
│   ├── actions/           # Next.js Server Actions
│   ├── services/          # Llamadas HTTP al backend (client-side)
│   ├── schemas/           # Zod schemas (forms + API responses)
│   ├── store/             # Zustand store del feature
│   └── types/             # Interfaces y tipos TypeScript
├── [feature]/
│   └── ...misma estructura
│
app/                       # Solo routing y layouts (App Router)
├── (auth)/
│   └── login/page.tsx     # Importa de features/auth/, no contiene lógica
├── layout.tsx
└── globals.css
│
components/
└── ui/                    # Componentes genéricos reutilizables (shadcn + MagicUI)
│
lib/
├── schemas/               # Schemas Zod compartidos entre features
├── types/                 # Tipos globales
└── utils.ts               # cn() y utilidades puras globales
│
store/                     # Solo stores Zustand verdaderamente globales (ej. theme)
hooks/                     # Solo hooks verdaderamente globales
```

> **Regla:** Si algo es usado por un solo feature, vive dentro de ese feature. Solo sube a `lib/`, `store/` o `hooks/` globales si lo usan ≥2 features.

---

## Server Actions

Toda mutación de datos pasa por **Server Actions** en `features/[feature]/actions/`.

```typescript
// features/auth/actions/login.action.ts
'use server'
import { loginSchema } from '../schemas/login.schema'
import { redirect } from 'next/navigation'

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: Record<string, string[]> }

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = loginSchema.safeParse(raw)

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors }
  }

  // llamada al backend, manejo de sesión…
  redirect('/dashboard')
}
```

- Siempre validar con Zod al inicio de la action antes de cualquier operación
- Usar `useActionState` (React 19) en el cliente para manejar el estado de la action
- Las actions solo mutan datos; las lecturas van en Server Components o en `services/`

---

## State Management — Zustand

Stores por feature en `features/[feature]/store/`. Solo estado verdaderamente global en `store/` raíz.

```typescript
// features/cart/store/useCartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)
```

- Tipar siempre la interfaz explícitamente (cero `any`)
- Selectores para evitar re-renders: `const items = useCartStore(s => s.items)`
- Nunca llamar stores fuera de componentes React o custom hooks

---

## Validación — Zod

Zod es la **única** librería de validación. Dos contextos:

### 1. Formularios — con react-hook-form

```typescript
// features/auth/schemas/login.schema.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
```

```typescript
// En el componente cliente
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'

const form = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })
```

### 2. Respuestas de API — en services/

```typescript
// features/products/services/products.service.ts
import { productSchema, type Product } from '../schemas/product.schema'

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  const data: unknown = await res.json()
  return productSchema.parse(data) // lanza ZodError si la forma no coincide
}
```

- `.parse()` en server-side (lanza excepción controlada)
- `.safeParse()` en client-side (manejar error sin try/catch)
- Exportar siempre el tipo inferido junto al schema

---

## Component Libraries

### shadcn/ui

- `npx shadcn add <component>` → `components/ui/`
- Para elementos interactivos de formulario: Input, Select, Dialog, etc.
- Usar la prop `asChild` para rendering polimórfico

### MagicUI

- `npx magicui-cli add <component>` → `components/ui/`
- Para elementos animados y decorativos: Globe, AnimatedText, Shimmer, etc.
- Comparte el mismo sistema de tokens CSS con shadcn/ui

---

## Tipado Estricto (CERO `any`)

- ❌ `any` → usar `unknown` + type guards
- ❌ `@ts-ignore` → resolver el error de tipos correctamente
- ❌ `as any` → usar type predicates o Zod parse

```typescript
// Type guard example
function isApiError(data: unknown): data is { message: string } {
  return typeof data === 'object' && data !== null && 'message' in data
}
```

---

## Styling

- Tailwind v4 — configurado vía `@tailwindcss/postcss` (sin `tailwind.config.js`)
- Variables CSS en `app/globals.css` (colores, radius, animaciones) — extender ahí
- Dark mode via clase `.dark`
- Usar siempre `cn()` de `lib/utils.ts` para combinar clases
- Animaciones: `tw-animate-css` para utilidades CSS, `motion` para animaciones JS
  - En Client Components: `import { motion } from 'motion/react-client'`

---

## Checklist para Nuevo Feature

- [ ] Crear `features/[feature]/` con subdirectorios: `components`, `hooks`, `actions`, `services`, `schemas`, `store`, `types`
- [ ] Definir tipos en `types/` antes de escribir lógica
- [ ] Crear schemas Zod en `schemas/` (forms + API)
- [ ] Implementar services para llamadas HTTP (validar respuesta con Zod)
- [ ] Crear Server Actions en `actions/` (validar input con Zod al inicio)
- [ ] Store Zustand en `store/` solo si el feature tiene estado global
- [ ] Hooks custom en `hooks/` que encapsulan lógica del store/services
- [ ] Componentes UI en `components/` que solo reciben props y llaman hooks
- [ ] Pages en `app/` solo importan de `features/` — sin lógica propia
- [ ] Verificar 0 `any` con `npm run lint`
