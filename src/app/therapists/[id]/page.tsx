export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MapPin, User, ArrowLeft, ExternalLink, CalendarDays } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TherapistDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const therapist = await prisma.therapist.findUnique({
    where: { id },
    include: {
      symptoms: true,
    },
  });

  if (!therapist) {
    notFound();
  }

  // 不調カテゴリごとにグループ化
  const groupedSymptoms = therapist.symptoms.reduce((acc, symptom) => {
    const cat = symptom.category || "その他";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(symptom);
    return acc;
  }, {} as Record<string, typeof therapist.symptoms>);

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link 
          href="/therapists"
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          セラピスト一覧に戻る
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
          {/* Header Area */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-8 pt-12 pb-8 flex flex-col md:flex-row items-center md:items-end gap-6 border-b border-primary/10">
            <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center text-primary/40 shrink-0 border-4 border-white">
              <User className="w-16 h-16" />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="inline-block px-3 py-1 bg-primary text-white text-sm font-bold rounded-full mb-3">
                {therapist.role}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {therapist.name}
              </h1>
              {therapist.clinicName && (
                <div className="text-lg font-medium text-foreground/80">
                  {therapist.clinicName}
                </div>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* メッセージ・自己紹介 */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                ご挨拶・方針
              </h2>
              <div className="bg-zinc-50 p-6 rounded-2xl text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {therapist.description}
              </div>
            </section>

            {/* 対応可能な不調 */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span>
                対応可能な不調
              </h2>
              <div className="space-y-6">
                {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
                  <div key={category}>
                    <h3 className="text-sm font-bold text-zinc-400 mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map(s => (
                        <span key={s.id} className="px-3 py-1.5 bg-accent/5 border border-accent/20 text-accent font-medium rounded-lg text-sm">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* アクセス・詳細情報 */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-light rounded-full"></span>
                アクセス・詳細
              </h2>
              <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
                {therapist.address && (
                  <div className="flex items-start gap-4 p-5 border-b border-zinc-100">
                    <MapPin className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-zinc-500 mb-1">所在地</div>
                      <div className="text-foreground">{therapist.address}</div>
                    </div>
                  </div>
                )}
                {/* MVP用ダミーデータ項目 */}
                <div className="flex items-start gap-4 p-5 border-b border-zinc-100">
                  <CalendarDays className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-zinc-500 mb-1">営業時間</div>
                    <div className="text-foreground">9:00 - 20:00 (休診日: 日・祝) <br/><span className="text-xs text-zinc-400">※サンプルデータ</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="pt-6 flex justify-center">
              <button className="group flex h-14 w-full md:w-auto md:min-w-[320px] items-center justify-center gap-2 rounded-full bg-primary px-8 text-lg font-bold text-white shadow-lg hover:bg-primary-light transition-all hover:-translate-y-1">
                <ExternalLink className="w-5 h-5" />
                <span>予約ページへ進む</span>
              </button>
            </div>
            <p className="text-center text-xs text-zinc-400">※MVP版のため、実際の予約機能は接続されていません。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
