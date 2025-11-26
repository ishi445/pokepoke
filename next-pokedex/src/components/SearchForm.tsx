"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  initialQuery?: string;
}

export function SearchForm({ initialQuery = '' }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 💡 課題: 検索クエリで /search ページに遷移
  
  if (query.trim() === '') return; // 空のときは何もしない
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {/* 💡 課題: 検索用のInputとButtonを配置 */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-1 rounded"
        placeholder="ポケモン名を入力"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        検索
      </button>
    </form>
  );
}