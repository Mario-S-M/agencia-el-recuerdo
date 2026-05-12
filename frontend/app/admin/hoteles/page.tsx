import type { Metadata } from 'next';
import { AdminHotelesPage } from '@/features/hoteles/presentation/components/client/AdminHotelesPage';

export const metadata: Metadata = {
  title: 'Hoteles | Panel Admin | El Recuerdo',
};

export default function HotelesPage(): React.ReactElement {
  return <AdminHotelesPage />;
}
