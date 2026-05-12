'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  MapPin,
  Package,
  Wrench,
  Calendar,
  Users,
  LayoutDashboard,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const sections = [
  {
    title: 'Destinos',
    description: 'Administrar destinos turísticos',
    icon: MapPin,
    href: '/admin/destinos',
  },
  {
    title: 'Paquetes',
    description: 'Gestión de paquetes de viaje',
    icon: Package,
    href: '/admin/paquetes',
  },
  {
    title: 'Servicios',
    description: 'Configurar servicios incluidos',
    icon: Wrench,
    href: '/admin/servicios',
  },
  {
    title: 'Fechas de salida',
    description: 'Calendario de salidas disponibles',
    icon: Calendar,
    href: '/admin/fechas-salida',
  },
  {
    title: 'Usuarios',
    description: 'Gestión de cuentas de acceso',
    icon: Users,
    href: '/admin/usuarios',
  },
];

export function AdminDashboard(): React.ReactElement {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  function handleLogout(): void {
    logout();
    router.push('/login');
  }

  if (!isAuthenticated || !user) {
    return <div className="min-h-screen bg-[#030712]" />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-teal-600">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Panel Admin — El Recuerdo</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              {user.nombre} · <span className="capitalize">{user.rol ?? 'admin'}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white/70 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Bienvenido, {user.nombre}
          </h1>
          <p className="mt-1 text-white/50">
            Selecciona una sección para administrar el contenido.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ title, description, icon: Icon, href }) => (
            <Card
              key={href}
              className="cursor-pointer border-white/10 bg-white/5 transition-all hover:border-orange-500/40 hover:bg-white/10"
              onClick={() => router.push(href)}
            >
              <CardHeader className="flex flex-row items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base text-white">{title}</CardTitle>
                  <CardDescription className="text-white/50">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
