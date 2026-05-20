import { redirect } from 'next/navigation';

/** Старый URL профиля — перенаправляем в панель. */
export default function LegacyProfileRedirect() {
  redirect('/dashboard/profile');
}
