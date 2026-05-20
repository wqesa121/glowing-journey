'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function ProfileSignOutButton() {
  return (
    <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/signin' })}>
      Выйти
    </Button>
  );
}
