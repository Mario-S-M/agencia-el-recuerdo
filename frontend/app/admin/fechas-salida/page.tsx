import type { Metadata } from 'next';
import { AdminFechasSalidaPage } from '@/features/fechas-salida';

export const metadata: Metadata = {
  title: 'Fechas de Salida | Panel Admin | El Recuerdo',
};

export default function FechasSalidaPage(): React.ReactElement {
  return <AdminFechasSalidaPage />;
}
