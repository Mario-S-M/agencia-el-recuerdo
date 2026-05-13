import type { Metadata } from 'next';
import { AdminPaisesPage } from '@/features/ubicaciones/presentation/components/client/AdminPaisesPage';

export const metadata: Metadata = {
  title: 'Países | Panel Admin | El Recuerdo',
};

export default function PaisesPage(): React.ReactElement {
  return <AdminPaisesPage />;
}
