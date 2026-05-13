import type { Metadata } from 'next';
import { AdminMunicipiosPage } from '@/features/ubicaciones/presentation/components/client/AdminMunicipiosPage';

export const metadata: Metadata = {
  title: 'Municipios | Panel Admin | El Recuerdo',
};

export default function MunicipiosPage(): React.ReactElement {
  return <AdminMunicipiosPage />;
}
