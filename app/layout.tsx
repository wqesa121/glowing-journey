import type { Metadata } from 'next';
import '../styles/globals.css';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { ThemeScript } from '@/components/ThemeScript';

export const metadata: Metadata = {
  title: {
    default: 'NeuraCMS — лента статей',
    template: '%s · NeuraCMS'
  },
  description: 'NeuraCMS — современная headless CMS с AI-контентом, лентой статей и удобным интерфейсом управления.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'NeuraCMS',
    description: 'Современная headless CMS с AI-поддержкой для управления контентом и публикациями.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
