"use client";

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { pageBackground, heading, body, accentLink, eyebrow } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export default function SignInPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState('/');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setCallbackUrl(params.get('callbackUrl') || '/');
    } catch (e) {
      setCallbackUrl('/');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl
    });

    if (!result) {
      setError('Ошибка входа. Попробуйте ещё раз.');
      return;
    }

    if (result.ok) {
      window.location.assign(result.url ?? callbackUrl);
      return;
    }

    setError(result.error ? `Ошибка: ${result.error}` : 'Invalid email or password.');
  };

  return (
    <main className={cn('px-6 py-12 sm:px-10', pageBackground)}>
      <div className="mx-auto max-w-xl">
        <p className="mb-6 text-center">
          <a href="/" className={cn('text-sm font-semibold', accentLink)}>
            ← NeuraCMS
          </a>
        </p>
        <Card className="space-y-6 p-10">
          <div className="space-y-2">
            <p className={eyebrow}>Вход</p>
            <h1 className={heading}>Войти в NeuraCMS</h1>
            <p className={cn('text-sm', body)}>Используйте email и пароль для управления контентом, статьями и AI-инструментами.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error ? <Alert variant="destructive">{error}</Alert> : null}
            <Button type="submit" className="w-full">Войти</Button>
          </form>
          <div className="pt-4 text-center">
            <p className={cn('text-sm', body)}>Нет аккаунта? <a href="/register" className={accentLink}>Создать</a></p>
          </div>
        </Card>
      </div>
    </main>
  );
}
