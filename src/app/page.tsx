import Link from "next/link";
import { ArrowRight, CheckCircle2, Search, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-primary/10 to-background pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            あなたに最適な施術メソッドを提案
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            体の不調、<br className="md:hidden" />
            <span className="text-primary">誰に相談</span>すればいい？
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-12 leading-relaxed">
            肩こり、腰痛、原因不明の疲れ...。あなたの症状に合わせて、整体、鍼灸、カイロプラクティックなど最適なアプローチと、専門のセラピストをマッチングします。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/check" 
              className="group relative flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-medium text-white shadow-lg hover:bg-primary-light hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">今すぐ無料チェックを始める</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </Link>
            <Link 
              href="/therapists" 
              className="flex h-14 items-center justify-center rounded-full bg-white px-8 text-lg font-medium text-primary border-2 border-primary/20 hover:border-primary/50 transition-colors"
            >
              セラピスト一覧を見る
            </Link>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 -right-64 w-[30rem] h-[30rem] bg-accent-light/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">利用の流れ</h2>
            <p className="text-foreground/60">3つの簡単なステップで、あなたにぴったりの施術が見つかります</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. 不調をチェック</h3>
              <p className="text-foreground/70 leading-relaxed">
                気になる症状や痛む部位、生活習慣などの簡単な質問にお答えいただきます。
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. 最適な施術を分析</h3>
              <p className="text-foreground/70 leading-relaxed">
                あなたの状態から、鍼灸・整体・マッサージなど最も効果が期待できるアプローチを提案します。
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. セラピストとマッチ</h3>
              <p className="text-foreground/70 leading-relaxed">
                提案された施術を得意とし、あなたの症状に対応可能な厳選されたセラピストをご紹介します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">自分の体と、正しく向き合おう</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            我慢しているその痛みや不調。専門家の力を借りて、本来の健やかな体を取り戻しませんか？
          </p>
          <Link 
            href="/check" 
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-primary shadow-lg hover:bg-gray-50 hover:scale-105 transition-all"
          >
            無料不調チェックへ進む
          </Link>
        </div>
      </section>
    </div>
  );
}
