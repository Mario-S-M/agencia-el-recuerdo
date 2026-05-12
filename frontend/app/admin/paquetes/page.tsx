import type { Metadata } from 'next';
import { AdminPaquetesPage } from '@/features/paquetes/presentation/components/client/AdminPaquetesPage';

export const metadata: Metadata = {
  title: 'Paquetes | Panel Admin | El Recuerdo',
};

export default function PaquetesPage(): React.ReactElement {
  return <AdminPaquetesPage />;
}
