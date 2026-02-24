
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="flex items-center h-16 px-6 border-b bg-background shrink-0 z-10">
      <Logo />
    </header>
  );
}
