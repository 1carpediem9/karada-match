"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";

// マスターデータと一致させる
const SYMPTOMS = [
  { id: "首の痛み", label: "首の痛み", category: "頭・首" },
  { id: "肩こり", label: "肩こり", category: "肩・背中" },
  { id: "背中の張り", label: "背中の張り", category: "肩・背中" },
  { id: "腰痛", label: "腰痛", category: "腰・足" },
  { id: "膝の痛み", label: "膝の痛み", category: "腰・足" },
  { id: "眼精疲労", label: "眼精疲労", category: "頭・首" },
  { id: "頭痛", label: "頭痛", category: "頭・首" },
  { id: "全身の疲れ", label: "全身の疲れ", category: "その他" },
  { id: "冷え性", label: "冷え性", category: "その他" },
  { id: "不眠", label: "不眠", category: "精神" },
];

export default function CheckPage() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;

    setIsSubmitting(true);
    const query = new URLSearchParams({
      symptoms: selectedSymptoms.join(","),
    }).toString();

    router.push(`/check/result?${query}`);
  };

  // カテゴリごとにグループ化
  const groupedSymptoms = SYMPTOMS.reduce((acc, symptom) => {
    if (!acc[symptom.category]) acc[symptom.category] = [];
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, typeof SYMPTOMS>);

  return (
    <div className="min-h-screen bg-zinc-50/50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="bg-primary/5 px-8 py-10 text-center border-b border-primary/10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              不調チェック
            </h1>
            <p className="text-foreground/70">
              現在のあなたのお悩みに当てはまるものを、すべて選択してください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="space-y-10">
              {Object.entries(groupedSymptoms).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-lg font-bold text-primary mb-4 border-b border-zinc-100 pb-2">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom.id);
                      return (
                        <button
                          key={symptom.id}
                          type="button"
                          onClick={() => toggleSymptom(symptom.id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-zinc-200 bg-white text-foreground hover:border-primary/30 hover:bg-zinc-50"
                          }`}
                        >
                          <span className="font-medium">{symptom.label}</span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                              isSelected
                                ? "bg-primary border-primary text-white"
                                : "border-zinc-300"
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col items-center">
              <button
                type="submit"
                disabled={selectedSymptoms.length === 0 || isSubmitting}
                className="group relative flex h-14 w-full md:w-auto md:min-w-[300px] items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-white shadow-lg hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "分析中..."
                ) : (
                  <>
                    <span>結果を見る</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              {selectedSymptoms.length === 0 && (
                <p className="text-accent text-sm mt-3 animate-pulse">
                  ※少なくとも1つの項目を選択してください
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
