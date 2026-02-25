
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ size = 'default' }: { size?: 'default' | 'lg' }) {
  const isLarge = size === 'lg';
  return (
    <div className={cn("flex items-center", isLarge && "flex-col gap-1")}>
       <Image
        src="https://storage.googleapis.com/aif-stg-testing-images/samir-hidevs-logo.png"
        alt="Samir HiDev's Logo"
        width={isLarge ? 160 : 140}
        height={isLarge ? 53 : 47}
        className="object-contain"
        priority
      />
    </div>
  );
}
