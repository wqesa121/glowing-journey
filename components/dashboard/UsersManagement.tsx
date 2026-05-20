"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { panel, panelInset, eyebrow, heading, headingSm, body, selectInput } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

type User = {
  id: string;
  name?: string;
  email: string;
  role: string;
  disabled: boolean;
};

type StatusVariant = 'default' | 'success' | 'destructive' | 'warning';

type EditState = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  disabled: boolean;
};

type Props = {
  initialUsers: User[];
};

export function UsersManagement({ initialUsers }: Props) {
  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [status, setStatus] = React.useState<string | null>(null);
  const [statusVariant, setStatusVariant] = React.useState<StatusVariant>('default');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'user' | 'admin'>('user');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editData, setEditData] = React.useState<EditState>({ name: '', email: '', role: 'user', disabled: false });
  const [loading, setLoading] = React.useState(false);

  const refreshUsers = async () => {
    const res = await fetch('/api/admin/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users.map((u: any) => ({ ...u, id: u._id })));
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({
      name: user.name || '',
      email: user.email,
      role: user.role as 'user' | 'admin',
      disabled: user.disabled
    });
    setStatus(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setStatus(null);
  };

  const saveEdit = async (id: string) => {
    await updateUser(id, {
      name: editData.name,
      email: editData.email,
      role: editData.role,
      disabled: editData.disabled
    });
    setEditingId(null);
  };

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setStatusVariant('default');
    setLoading(true);

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Пользователь успешно создан.');
      setStatusVariant('success');
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
      refreshUsers();
    } else {
      setStatus(data.error || 'Ошибка создания пользователя.');
      setStatusVariant('destructive');
    }

    setLoading(false);
  };

  const updateUser = async (id: string, payload: { role?: 'user' | 'admin'; disabled?: boolean; name?: string; email?: string }) => {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      setStatus('Пользователь обновлён.');
      setStatusVariant('success');
      refreshUsers();
    } else {
      setStatus(data.error || 'Ошибка обновления');
      setStatusVariant('destructive');
    }
    setLoading(false);
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    setLoading(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok) {
      setStatus('Пользователь удалён.');
      setStatusVariant('success');
      refreshUsers();
    } else {
      setStatus(data.error || 'Ошибка удаления');
      setStatusVariant('destructive');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <section className={cn(panel, 'grid gap-4 p-6')}>
        <div className="space-y-3">
          <p className={eyebrow}>Создать пользователя</p>
          <h2 className={headingSm}>Пригласить нового пользователя</h2>
        </div>
        <form className="grid gap-4" onSubmit={createUser}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <Label htmlFor="role" className="mb-0">Роль</Label>
              <select id="role" className={selectInput} value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')}>
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Создание…' : 'Создать пользователя'}</Button>
          </div>
          {status ? <Alert variant={statusVariant}>{status}</Alert> : null}
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={eyebrow}>Пользователи</p>
            <h2 className={heading}>Управление аккаунтами</h2>
          </div>
          <Button variant="secondary" onClick={refreshUsers} disabled={loading}>Обновить</Button>
        </div>
        {status ? <Alert variant={statusVariant}>{status}</Alert> : null}
        <div className="grid gap-3">
          {users.map((user) => (
            <div key={user.id} className={cn(panelInset, 'grid gap-4 p-4 sm:grid-cols-[1.2fr_0.8fr] sm:items-center')}>
              {editingId === user.id ? (
                <div className="grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`name-${user.id}`}>Имя</Label>
                      <Input
                        id={`name-${user.id}`}
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`email-${user.id}`}>Email</Label>
                      <Input
                        id={`email-${user.id}`}
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3 sm:items-end">
                    <div>
                      <Label htmlFor={`role-${user.id}`}>Роль</Label>
                      <select
                        id={`role-${user.id}`}
                        className="w-full rounded-md border px-3 py-2"
                        value={editData.role}
                        onChange={(e) => setEditData({ ...editData, role: e.target.value as 'user' | 'admin' })}
                      >
                        <option value="user">Пользователь</option>
                        <option value="admin">Администратор</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id={`disabled-${user.id}`}
                        type="checkbox"
                        checked={editData.disabled}
                        onChange={(e) => setEditData({ ...editData, disabled: e.target.checked })}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
                      />
                      <Label htmlFor={`disabled-${user.id}`} className="mb-0">Отключён</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="secondary" size="sm" onClick={() => saveEdit(user.id)} disabled={loading}>Сохранить</Button>
                      <Button variant="ghost" size="sm" onClick={cancelEdit} disabled={loading}>Отмена</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  <div>
                    <p className="font-semibold text-zinc-100">{user.name || user.email}</p>
                    <p className="text-sm text-zinc-600">{user.email}</p>
                  </div>
                  <p className="text-sm text-zinc-500">Роль: {user.role === 'admin' ? 'Администратор' : 'Пользователь'} {user.disabled ? '· отключён' : ''}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 justify-end">
                {editingId !== user.id ? (
                  <>
                    <Button variant="secondary" size="sm" onClick={() => startEdit(user)} disabled={loading}>Редактировать</Button>
                    <Button variant="secondary" size="sm" onClick={() => updateUser(user.id, { role: user.role === 'admin' ? 'user' : 'admin' })} disabled={loading}>
                      {user.role === 'admin' ? 'Сделать пользователем' : 'Сделать администратором'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => updateUser(user.id, { disabled: !user.disabled })} disabled={loading}>
                      {user.disabled ? 'Включить' : 'Отключить'}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteUser(user.id)} disabled={loading}>Удалить</Button>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
