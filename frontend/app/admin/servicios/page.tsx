import type { Metadata } from 'next';
import { AdminServiciosPage } from '@/features/servicios/presentation/components/client/AdminServiciosPage';

export const metadata: Metadata = {
  title: 'Servicios | Panel Admin | El Recuerdo',
};

export default function ServiciosPage(): React.ReactElement {
  return <AdminServiciosPage />;
}
