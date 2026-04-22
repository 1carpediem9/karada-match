export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, User, Search } from "lucide-react";

export default async function TherapistsPage() {
  const therapists = await prisma.therapist.findMany({
    include: {
      symptoms: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">セラピスト一覧</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            当サービスに登録されている専門家の一覧です。気になるセラピストを見つけて、詳細を確認してみましょう。
          </p>
        </div>

        {/* 検索・フィルターエリア（将来的な拡張用モック） */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-8 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 ml-2" />
          <input 
            type="text" 
            placeholder="お住まいの地域や資格で絞り込む（準備中）" 
            className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-zinc-400"
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist) => (
            <Link 
              href={`/therapists/${therapist.id}`} 
              key={therapist.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">{therapist.role}</div>
                  <h2 className="text-lg font-bold text-foreground line-clamp-1">{therapist.name}</h2>
                </div>
              </div>

              <div className="space-y-2 mb-4 flex-1">
                {therapist.clinicName && (
                  <div className="text-sm text-foreground/80 font-medium">
                    {therapist.clinicName}
                  </div>
                )}
                {therapist.address && (
                  <div className="text-xs text-foreground/60 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{therapist.address}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <div className="text-[10px] font-medium text-zinc-400 mb-2">対応可能な不調</div>
                <div className="flex flex-wrap gap-1.5">
                  {therapist.symptoms.slice(0, 3).map(s => (
                    <span key={s.id} className="text-[10px] px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-600">
                      {s.name}
                    </span>
                  ))}
                  {therapist.symptoms.length > 3 && (
                    <span className="text-[10px] px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-500">
                      +{therapist.symptoms.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
