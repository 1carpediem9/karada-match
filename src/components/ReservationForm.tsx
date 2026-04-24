"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Mail, Phone, FileText, Loader2 } from "lucide-react";

type Props = {
  therapistId: string;
};

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

export default function ReservationForm({ therapistId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      therapistId,
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      userPhone: formData.get("userPhone"),
      date: formData.get("date"),
      timeSlot: formData.get("timeSlot"),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "予約に失敗しました。");
      }

      router.push(`/therapists/${therapistId}/reserve/success`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 日付 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            希望日
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* 時間 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            希望時間
          </label>
          <select
            name="timeSlot"
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
          >
            <option value="">選択してください</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-zinc-100">
        {/* 名前 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <User className="w-4 h-4" />
            お名前
          </label>
          <input
            type="text"
            name="userName"
            placeholder="山田 太郎"
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* メール */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            メールアドレス
          </label>
          <input
            type="email"
            name="userEmail"
            placeholder="example@mail.com"
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* 電話 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            電話番号
          </label>
          <input
            type="tel"
            name="userPhone"
            placeholder="090-0000-0000"
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* 備考 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            ご相談内容・備考（任意）
          </label>
          <textarea
            name="notes"
            rows={4}
            placeholder="気になる症状などがあればご記入ください"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-primary hover:bg-primary-light disabled:bg-zinc-300 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "予約を確定する"
        )}
      </button>

      <p className="text-center text-xs text-zinc-400">
        ※予約はまだ確定しません。セラピストからの連絡をお待ちください。
      </p>
    </form>
  );
}
