import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/presentation/components/client/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión | El Recuerdo Admin',
  description: 'Panel de administración de El Recuerdo Agencia de Viajes.',
};

export default function LoginPage(): React.ReactElement {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-teal-500/6 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
