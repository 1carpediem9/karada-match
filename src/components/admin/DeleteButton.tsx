"use client";

import { deleteTherapist } from "@/app/admin/actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`${name} さんの情報を削除してもよろしいですか？`)) {
      setIsDeleting(true);
      try {
        await deleteTherapist(id);
      } catch (error) {
        alert("削除に失敗しました。");
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-zinc-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all disabled:opacity-50"
      title="削除"
    >
      <Trash2 className={`w-5 h-5 ${isDeleting ? "animate-pulse" : ""}`} />
    </button>
  );
}
