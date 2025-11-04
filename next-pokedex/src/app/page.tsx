//ホーム画面
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans">
      <h1 className="text-5xl font-bold mb-20 tracking-tight">
        ポケモン図鑑へようこそ
      </h1>
      <p>お気に入りのポケモンを探してみましょう!</p>

      <div className="flex flex-row gap-12">
        <Link href="/list">
          <Button
            variant="outline"
            className="px-10 py-6 border-2 border-black text-black text-lg hover:bg-black hover:text-white transition"
          >
            ポケモン一覧
          </Button>
        </Link>

        <Link href="/search">
          <Button
            variant="outline"
            className="px-10 py-6 border-2 border-black text-black text-lg hover:bg-black hover:text-white transition"
          >
            ポケモン検索
          </Button>
        </Link>
      </div>
    </main>
  );
}
