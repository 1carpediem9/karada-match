import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 text-white mb-4">
            <Heart className="h-6 w-6 text-accent-light" />
            <span className="font-bold text-xl tracking-wider">からだ施術マッチ</span>
          </Link>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm">
            あなたの不調に寄り添い、最適な施術者との出会いをサポートする自己診断＆マッチングサービスです。
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">サービス</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/check" className="hover:text-white transition-colors">不調チェックを始める</Link></li>
            <li><Link href="/therapists" className="hover:text-white transition-colors">セラピスト一覧</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">当サービスについて</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">サポート</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/faq" className="hover:text-white transition-colors">よくある質問</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
        <p>&copy; {new Date().getFullYear()} からだ施術マッチ. All rights reserved.</p>
        <p className="mt-2 text-xs">※本サービスは医療機関における診断を代替するものではありません。</p>
      </div>
    </footer>
  );
}
