import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl font-bold mb-4">ポケモン図鑑へようこそ</h1>
      <p>お気に入りのポケモンを探してみましょう！</p>

      <ul className="mt-4 space-y-2">
        <li>
          <Link href="/pokemon/1">フシギダネ</Link>
        </li>
        <li>
          <Link href="/pokemon/4">ヒトカゲ</Link>
        </li>
        <li>
          <Link href="/pokemon/7">ゼニガメ</Link>
        </li>
      </ul>
    </div>
  );
}