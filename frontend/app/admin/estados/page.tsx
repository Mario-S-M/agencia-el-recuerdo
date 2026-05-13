import type { Metadata } from 'next';
import { AdminEstadosPage } from '@/features/ubicaciones/presentation/components/client/AdminEstadosPage';

export const metadata: Metadata = {
  title: 'Estados | Panel Admin | El Recuerdo',
};

export default function EstadosPage(): React.ReactElement {
  return <AdminEstadosPage />;
}
