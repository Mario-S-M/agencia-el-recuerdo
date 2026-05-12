import type { Metadata } from 'next';
import { BigCalendar } from '@/features/calendario/presentation/components/client/BigCalendar';

export const metadata: Metadata = {
  title: 'Calendario de Salidas | El Recuerdo',
  description:
    'Consulta las próximas fechas de salida de nuestros paquetes y reserva tu lugar.',
};

export default function CalendarioPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Fechas disponibles
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Calendario de Salidas
          </h1>
          <p className="mt-2 text-sm text-white/50 max-w-lg">
            Consulta las próximas salidas, cupos disponibles y detalles de cada
            paquete. Haz clic en un día para ver las salidas de esa fecha.
          </p>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.015] p-4 sm:p-6 backdrop-blur-sm">
          <BigCalendar />
        </div>
      </div>
    </main>
  );
}
