export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Calendar, User, Mail, Phone, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      therapist: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/admin"
            className="p-2 bg-white rounded-full shadow-sm border border-zinc-100 text-zinc-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-foreground">予約一覧</h1>
        </div>

        <div className="space-y-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100">
              <div className="flex flex-col md:flex-row gap-6">
                {/* 予約基本情報 */}
                <div className="md:w-1/3 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full">
                    <Calendar className="w-3 h-3" />
                    {new Date(res.date).toLocaleDateString('ja-JP')} {res.timeSlot}
                  </div>
                  
                  <div>
                    <div className="text-xs font-bold text-zinc-400 mb-1">担当セラピスト</div>
                    <div className="font-bold text-foreground">{res.therapist.name}</div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-zinc-400 mb-1">ステータス</div>
                    <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      res.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 
                      res.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 
                      'bg-zinc-100 text-zinc-600'
                    }`}>
                      {res.status === 'PENDING' ? '確認中' : res.status === 'CONFIRMED' ? '確定済み' : 'キャンセル'}
                    </div>
                  </div>
                </div>

                {/* ユーザー情報 */}
                <div className="md:w-1/3 space-y-3">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <User className="w-4 h-4 text-zinc-400" />
                    {res.userName} 様
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    {res.userEmail}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Phone className="w-4 h-4 text-zinc-400" />
                    {res.userPhone}
                  </div>
                </div>

                {/* 備考・メッセージ */}
                <div className="md:w-1/3">
                  <div className="flex items-start gap-2 text-sm text-zinc-600 bg-zinc-50 p-4 rounded-2xl h-full">
                    <MessageSquare className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div className="whitespace-pre-wrap">
                      {res.notes || <span className="text-zinc-300 italic">備考なし</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {reservations.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-100">
              <p className="text-zinc-500">まだ予約はありません。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
