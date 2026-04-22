import { prisma } from "@/lib/prisma";
import TherapistForm from "@/components/admin/TherapistForm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTherapistPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [therapist, allSymptoms] = await Promise.all([
    prisma.therapist.findUnique({
      where: { id },
      include: { symptoms: true },
    }),
    prisma.symptom.findMany(),
  ]);

  if (!therapist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">セラピスト情報の編集</h1>
          <p className="text-zinc-500 mt-1">{therapist.name} さんの情報を編集します</p>
        </div>

        <TherapistForm therapist={therapist} allSymptoms={allSymptoms} />
      </div>
    </div>
  );
}
