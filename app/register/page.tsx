"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { pageBackground, heading, body, accentLink, eyebrow } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        const signin = await signIn('credentials', {
          redirect: false,
          email,
          password
        });

        if (signin && (signin as any).error) {
          setError('Пользователь создан, но вход не удался. Войдите вручную.');
          setLoading(false);
          return;
        }

        router.push('/dashboard/articles');
        return;
      }

      const data = await res.json();
      setError(data?.error || 'Регистрация не удалась.');
    } catch (err) {
      setError('Регистрация не удалась. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
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
            <p className={eyebrow}>Создать аккаунт</p>
            <h1 className={heading}>Регистрация в NeuraCMS</h1>
            <p className={cn('text-sm', body)}>Создайте пользователя. После регистрации вам будет назначена роль «пользователь». Админ может изменить роли позже.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>
            {error ? <Alert variant="destructive">{error}</Alert> : null}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Регистрация…' : 'Создать аккаунт'}</Button>
          </form>
          <div className="pt-4 text-center">
            <p className={cn('text-sm', body)}>Уже есть аккаунт? <a href="/signin" className={accentLink}>Войти</a>.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
