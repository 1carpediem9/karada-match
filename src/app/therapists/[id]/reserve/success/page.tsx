import Link from "next/link";
import { CheckCircle2, Home, Search } from "lucide-react";

export default function ReservationSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">
          予約申し込みが完了しました
        </h1>
        
        <p className="text-foreground/60 leading-relaxed mb-10">
          この度はご予約ありがとうございます。<br />
          ご入力いただいたメールアドレス宛に、確認のメッセージをお送りしました。<br />
          後ほどセラピストより折り返しのご連絡をさせていただきます。
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary-light transition-all"
          >
            <Home className="w-4 h-4" />
            トップページへ戻る
          </Link>
          
          <Link
            href="/therapists"
            className="flex items-center justify-center gap-2 w-full h-12 bg-zinc-50 text-zinc-600 font-bold rounded-xl hover:bg-zinc-100 transition-all border border-zinc-200"
          >
            <Search className="w-4 h-4" />
            他のセラピストを探す
          </Link>
        </div>
      </div>
    </div>
  );
}
