'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BorderBeam } from '@/registry/magicui/border-beam';
import Link from 'next/link';

import { loginFormSchema, type LoginFormData } from '../../schemas/login-form.schema';
import { useLogin } from '../../hooks/useLogin';

export function LoginForm(): React.ReactElement {
  const { isLoading, error, submit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(data: LoginFormData): void {
    void submit(data);
  }

  return (
    <Card className="relative w-full overflow-hidden">
      <CardHeader>
        <div className="mb-2 flex flex-col items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-orange-500/30 shadow-lg shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-teal-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-black tracking-tight text-white">ER</span>
            </div>
          </div>
        </div>
        <CardTitle className="text-center">El Recuerdo</CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder al panel de administración.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}

        <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@elrecuerdo.mx"
                disabled={isLoading}
                aria-invalid={errors.email !== undefined}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-invalid={errors.password !== undefined}
                  {...register('password')}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Link
          href="/"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Volver al sitio
        </Link>
        <Button type="submit" form="login-form" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Entrando…
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </>
          )}
        </Button>
      </CardFooter>

      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
