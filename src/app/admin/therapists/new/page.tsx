import { prisma } from "@/lib/prisma";
import TherapistForm from "@/components/admin/TherapistForm";

export default async function NewTherapistPage() {
  const allSymptoms = await prisma.symptom.findMany();

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">新規セラピスト登録</h1>
          <p className="text-zinc-500 mt-1">新しいセラピスト情報を入力してください</p>
        </div>

        <TherapistForm allSymptoms={allSymptoms} />
      </div>
    </div>
  );
}
