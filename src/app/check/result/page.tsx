export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MapPin, User, ArrowLeft, Star, HeartHandshake } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const symptomsParam = params.symptoms as string;
  const userSymptoms = symptomsParam ? symptomsParam.split(",") : [];

  // セラピスト一覧を取得し、不調タグを含める
  const allTherapists = await prisma.therapist.findMany({
    include: {
      symptoms: true,
    },
  });

  // スコアリング：ユーザーが選んだ症状と一致する数をカウント
  const scoredTherapists = allTherapists
    .map((therapist) => {
      const matchCount = therapist.symptoms.filter((s) =>
        userSymptoms.includes(s.name)
      ).length;

      return {
        ...therapist,
        matchCount,
        // スコア（一致数 / ユーザーが選んだ数）のパーセンテージ。最低でも0%
        matchRate:
          userSymptoms.length > 0
            ? Math.round((matchCount / userSymptoms.length) * 100)
            : 0,
      };
    })
    .filter((t) => t.matchCount > 0) // 少なくとも1つは一致している人を表示
    .sort((a, b) => b.matchCount - a.matchCount);

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Star className="text-accent fill-accent h-8 w-8" />
              あなたへのおすすめのセラピスト
            </h1>
            <p className="text-foreground/70 mt-2">
              選択された不調：
              <span className="font-medium text-primary ml-1">
                {userSymptoms.join("、")}
              </span>
            </p>
          </div>
          <Link
            href="/check"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            チェックをやり直す
          </Link>
        </div>

        {scoredTherapists.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-zinc-100">
            <HeartHandshake className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              該当するセラピストが見つかりませんでした
            </h2>
            <p className="text-zinc-500">
              選択した不調に対応できるセラピストが現在登録されていません。
              条件を変えて再度お試しください。
            </p>
            <Link
              href="/check"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-white hover:bg-primary-light transition-colors"
            >
              条件を変更する
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {scoredTherapists.map((therapist, index) => (
              <div
                key={therapist.id}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* おすすめバッジ (1位のみ) */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-4 py-2 rounded-bl-xl z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    BEST MATCH
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-6">
                  {/* アバター/アイコン部分 */}
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-10 h-10" />
                    </div>
                    <div className="bg-zinc-100 px-3 py-1 rounded-full text-xs font-medium text-zinc-600">
                      マッチ度 {therapist.matchRate}%
                    </div>
                  </div>

                  {/* 詳細情報 */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <div className="text-sm font-semibold text-primary mb-1">
                          {therapist.role}
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                          {therapist.name}
                        </h2>
                        {therapist.clinicName && (
                          <div className="text-foreground/80 text-sm mt-1 flex items-center gap-1">
                            {therapist.clinicName}
                          </div>
                        )}
                        {therapist.address && (
                          <div className="text-foreground/60 text-sm mt-1 flex items-start gap-1">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{therapist.address}</span>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/therapists/${therapist.id}`}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-primary/10 px-6 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                      >
                        詳細を見る
                      </Link>
                    </div>

                    <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                      {therapist.description}
                    </p>

                    <div>
                      <div className="text-xs font-medium text-zinc-500 mb-2">
                        対応可能な不調：
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {therapist.symptoms.map((symptom) => {
                          const isMatched = userSymptoms.includes(symptom.name);
                          return (
                            <span
                              key={symptom.id}
                              className={`text-xs px-2.5 py-1 rounded-md border ${
                                isMatched
                                  ? "bg-accent/10 border-accent/20 text-accent font-medium"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-600"
                              }`}
                            >
                              {symptom.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
