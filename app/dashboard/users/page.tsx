import React from 'react';
import connectMongoose from '@/lib/mongoose';
import clientPromise from '@/lib/mongodb';
import { UsersManagement } from '@/components/dashboard/UsersManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function UsersPage() {
  await connectMongoose();
  const client = await clientPromise;
  const db = client.db();
  const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();

  const sanitizedUsers = users.map((user: any) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? 'user',
    disabled: !!user.disabled
  }));

  return <UsersManagement initialUsers={sanitizedUsers} />;
}

function UserCreateForm() {
  'use client';
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'user' | 'admin'>('user');
  const [status, setStatus] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    const text = await res.text();
    if (res.ok) {
      setStatus('Created');
      setName(''); setEmail(''); setPassword('');
      // refresh the page
      window.location.reload();
    } else {
      setStatus('Error: ' + text);
    }
  };

  return (
    <form className="grid gap-3" onSubmit={submit}>
      <div className="grid sm:grid-cols-3 gap-2">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Label>Роль</Label>
        <select className="rounded-md border px-2 py-1" value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="user">Пользователь</option>
          <option value="admin">Администратор</option>
        </select>
        <div className="flex-1" />
        <Button type="submit">Создать пользователя</Button>
      </div>
      {status ? <p className="text-sm text-rose-600">{status}</p> : null}
    </form>
  );
}

function UserControls({ userId, currentRole, disabled }: { userId: string; currentRole: string; disabled: boolean }) {
  'use client';
  const [loading, setLoading] = React.useState(false);

  const toggleRole = async () => {
    setLoading(true);
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    await fetch(`/api/admin/users/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: nextRole }) });
    window.location.reload();
  };

  const toggleDisabled = async () => {
    setLoading(true);
    await fetch(`/api/admin/users/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ disabled: !disabled }) });
    window.location.reload();
  };

  const remove = async () => {
    if (!confirm('Удалить пользователя?')) return;
    setLoading(true);
    await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm" onClick={toggleRole} disabled={loading}>{currentRole === 'admin' ? 'Сделать пользователем' : 'Сделать администратором'}</Button>
      <Button variant="ghost" size="sm" onClick={toggleDisabled} disabled={loading}>{disabled ? 'Включить' : 'Отключить'}</Button>
      <Button variant="destructive" size="sm" onClick={remove} disabled={loading}>Удалить</Button>
    </div>
  );
}
