'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, MapPin, Package, Wrench, CalendarDays,
  Hotel, LogOut, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/presentation/store/useAuthStore';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/destinos', label: 'Destinos', icon: MapPin },
  { href: '/admin/hoteles', label: 'Hoteles', icon: Hotel },
  { href: '/admin/paquetes', label: 'Paquetes', icon: Package },
  { href: '/admin/servicios', label: 'Servicios', icon: Wrench },
  { href: '/admin/fechas-salida', label: 'Fechas de salida', icon: CalendarDays },
];

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  onClick?: () => void;
}): React.ReactElement {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-orange-500/15 text-orange-400'
          : 'text-white/50 hover:text-white hover:bg-white/8',
      )}
    >
      <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-orange-400' : 'text-white/40')} />
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/10 bg-[#060b12]">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-xs uppercase tracking-widest text-white/30 font-semibold">El Recuerdo</p>
          <p className="text-sm text-white/60 mt-0.5">Panel admin</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 flex flex-col w-72 bg-[#060b12] border-r border-white/10">
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30 font-semibold">El Recuerdo</p>
                <p className="text-sm text-white/60 mt-0.5">Panel admin</p>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.href} {...item} onClick={() => setMobileOpen(false)} />
              ))}
            </nav>
            <div className="px-3 py-4 border-t border-white/10">
              <button
                onClick={() => logout()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Mobile header */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#060b12]">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-white/10 text-white/60">
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-medium text-white/70">Panel admin</p>
          <div className="w-9" />
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
