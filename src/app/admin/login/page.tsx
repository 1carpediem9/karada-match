"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("パスワードが正しくありません。");
      }
    } catch (err) {
      setError("エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">管理者ログイン</h1>
          <p className="text-zinc-500 mt-2">管理画面にアクセスするにはパスワードを入力してください</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-accent text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-light transition-all disabled:opacity-50"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
        
        <p className="text-center text-xs text-zinc-400 mt-8">
          ※デモ用のパスワードは 「admin123」 です。
        </p>
      </div>
    </div>
  );
}
