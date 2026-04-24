import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, User, Calendar, Clock, FileText } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReservePage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const therapist = await prisma.therapist.findUnique({
    where: { id },
  });

  if (!therapist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link 
          href={`/therapists/${id}`}
          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          セラピスト詳細に戻る
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
          <div className="bg-primary/5 p-8 border-b border-primary/10">
            <h1 className="text-2xl font-bold text-foreground">予約申し込み</h1>
            <p className="text-foreground/60 mt-2">
              <span className="font-bold text-primary">{therapist.name}</span> 先生への予約を承ります。
            </p>
          </div>

          <div className="p-8">
            <ReservationForm therapistId={therapist.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
