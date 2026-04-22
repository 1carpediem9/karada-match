import Link from "next/link";
import { Heart, Search, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">当サービスについて</h1>
          <p className="text-lg text-foreground/60">
            「からだ施術マッチ」は、あなたの不調と向き合い、最適な癒やしのパートナーを見つけるためのプラットフォームです。
          </p>
        </div>

        <div className="space-y-16">
          {/* サービスへの想い */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-accent" />
              私たちの想い
            </h2>
            <div className="text-foreground/80 leading-relaxed space-y-4">
              <p>
                「肩が重いけれど、どこに行けばいいのかわからない」「整体、鍼灸、マッサージ...自分に合うのはどれ？」
              </p>
              <p>
                そんな悩みを持つ方々のために、私たちはこのサービスを立ち上げました。
                体調は一人ひとり異なります。だからこそ、その時々の不調に最も適した施術方法と、信頼できるセラピストを提案したいと考えています。
              </p>
            </div>
          </section>

          {/* 3つの特徴 */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-10 text-foreground">3つの特徴</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">不調からのマッチング</h3>
                <p className="text-sm text-foreground/70">
                  今の不調（首の痛み、冷え性など）を選択するだけで、最適なアプローチを提案します。
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-3">専門家を厳選</h3>
                <p className="text-sm text-foreground/70">
                  国家資格保持者や経験豊富なセラピストのみを掲載し、安心の施術を提供します。
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3">利用料は完全無料</h3>
                <p className="text-sm text-foreground/70">
                  不調チェックやセラピストの検索はすべて無料でご利用いただけます。
                </p>
              </div>
            </div>
          </section>

          {/* 注意事項 */}
          <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              ご利用にあたっての注意点
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed">
              本サービスが提供する不調チェックは、ユーザーの入力に基づいた「施術の傾向」を提案するものであり、医療的な診断を行うものではありません。激しい痛みや急な体調不良の場合は、必ず医療機関を受診してください。
            </p>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/check" 
              className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-10 text-xl font-bold text-white shadow-lg hover:bg-primary-light transition-all hover:-translate-y-1"
            >
              不調チェックを試してみる
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
