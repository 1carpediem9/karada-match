import Link from 'next/link';
import { Menu, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Heart className="h-6 w-6 text-accent" />
          <span className="font-bold text-xl tracking-wider">からだ施術マッチ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/check" className="text-foreground/80 hover:text-primary transition-colors">不調チェック</Link>
          <Link href="/therapists" className="text-foreground/80 hover:text-primary transition-colors">セラピストを探す</Link>
          <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">はじめての方へ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/check" className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-light transition-colors">
            無料診断を始める
          </Link>
          <button className="md:hidden text-foreground p-2 hover:bg-primary/5 rounded-full">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
