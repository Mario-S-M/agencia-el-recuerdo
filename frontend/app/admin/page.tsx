import type { Metadata } from 'next';
import { AdminDashboard } from '@/features/auth/presentation/components/client/AdminDashboard';

export const metadata: Metadata = {
  title: 'Panel Admin | El Recuerdo',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
