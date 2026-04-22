export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Edit, User, ExternalLink } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminDashboard() {
  const therapists = await prisma.therapist.findMany({
    include: {
      symptoms: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">管理者ダッシュボード</h1>
            <p className="text-zinc-500 mt-1">セラピスト情報の管理・編集が行えます</p>
          </div>
          <Link
            href="/admin/therapists/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-light transition-all"
          >
            <Plus className="w-5 h-5" />
            新規セラピスト登録
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">セラピスト</th>
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">役職 / クリニック</th>
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">対応可能な不調</th>
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {therapists.map((therapist) => (
                  <tr key={therapist.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-foreground">{therapist.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-foreground">{therapist.role}</div>
                        <div className="text-zinc-500">{therapist.clinicName || "-"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {therapist.symptoms.slice(0, 3).map((s) => (
                          <span key={s.id} className="text-[10px] px-2 py-0.5 bg-zinc-100 rounded text-zinc-600">
                            {s.name}
                          </span>
                        ))}
                        {therapist.symptoms.length > 3 && (
                          <span className="text-[10px] text-zinc-400">+{therapist.symptoms.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/therapists/${therapist.id}/edit`}
                          className="p-2 text-zinc-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="編集"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/therapists/${therapist.id}`}
                          target="_blank"
                          className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-all"
                          title="プレビュー"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <DeleteButton id={therapist.id} name={therapist.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {therapists.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-zinc-500">登録されているセラピストはいません。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
