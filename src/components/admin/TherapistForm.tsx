"use client";

import { Symptom, Therapist } from "@prisma/client";
import { upsertTherapist } from "@/app/admin/actions";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  therapist?: Therapist & { symptoms: Symptom[] };
  allSymptoms: Symptom[];
};

export default function TherapistForm({ therapist, allSymptoms }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionWithId = upsertTherapist.bind(null, new FormData(), therapist?.id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // 実際の送信はServer Actionに任せるが、ボタンのローディング状態を管理するためにラップ
  };

  return (
    <form action={(formData) => upsertTherapist(formData, therapist?.id)} className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">お名前</label>
            <input
              name="name"
              defaultValue={therapist?.name}
              required
              className="w-full h-12 px-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="例: 佐藤 健一"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">役職 / 資格</label>
            <input
              name="role"
              defaultValue={therapist?.role}
              required
              className="w-full h-12 px-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="例: 柔道整復師"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">クリニック名</label>
            <input
              name="clinicName"
              defaultValue={therapist?.clinicName || ""}
              className="w-full h-12 px-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="例: 佐藤整骨院"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">所在地</label>
            <input
              name="address"
              defaultValue={therapist?.address || ""}
              className="w-full h-12 px-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="例: 東京都渋谷区..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-700">自己紹介・方針</label>
          <textarea
            name="description"
            defaultValue={therapist?.description}
            required
            rows={5}
            className="w-full p-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="施術方針や得意な治療について入力してください"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-zinc-700 block">対応可能な不調</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {allSymptoms.map((symptom) => (
              <label
                key={symptom.id}
                className="flex items-center gap-2 p-3 rounded-lg border border-zinc-100 hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  name="symptoms"
                  value={symptom.id}
                  defaultChecked={therapist?.symptoms.some((s) => s.id === symptom.id)}
                  className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-zinc-700">{symptom.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          キャンセルして戻る
        </Link>
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-all"
        >
          <Save className="w-5 h-5" />
          保存する
        </button>
      </div>
    </form>
  );
}
