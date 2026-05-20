import Image from 'next/image';
import { cn } from '@/lib/utils';

type ArticleCoverImageProps = {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
};

export function ArticleCoverImage({ src, alt = '', className, priority }: ArticleCoverImageProps) {
  return (
    <div className={cn('relative max-h-[420px] w-full overflow-hidden bg-zinc-950', className)}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={630}
        className="h-auto w-full max-h-[420px] object-cover"
        sizes="(max-width: 768px) 100vw, 1152px"
        priority={priority}
        unoptimized
      />
    </div>
  );
}
