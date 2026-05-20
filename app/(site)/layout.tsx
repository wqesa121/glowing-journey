import { ReactNode } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { ScrollToTop } from '@/components/site/ScrollToTop';
import { pageBackground } from '@/lib/uiStyles';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex min-h-screen flex-col ${pageBackground}`}>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
