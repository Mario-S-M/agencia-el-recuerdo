import type { Metadata } from 'next';
import { AdminDestinosPage } from '@/features/destinos/presentation/components/client/AdminDestinosPage';

export const metadata: Metadata = {
  title: 'Destinos | Panel Admin | El Recuerdo',
};

export default function DestinosPage(): React.ReactElement {
  return <AdminDestinosPage />;
}
