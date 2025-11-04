"use client";

import { useEffect, useState } from "react";
import { getProcessedPokemonList } from "@/lib/pokeapi";
import { PokemonCard } from "@/components/PokemonCard";
import type { ProcessedPokemon, PaginationInfo } from "@/lib/types";

export default function PokemonListPage() {
const [pokemonList, setPokemonList] = useState<ProcessedPokemon[]>([]);
const [pagination, setPagination] = useState<PaginationInfo | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchData() {
    try {
        const data = await getProcessedPokemonList(1, 20); // ← 1ページ目・20匹
        setPokemonList(data.pokemon);
        setPagination(data.pagination);
    } catch (error) {
        console.error("ポケモン一覧の取得に失敗しました:", error);
    } finally {
        setLoading(false);
    }
    }
    fetchData();
}, []);

return (
    <main className="min-h-screen bg-white text-black p-10 font-sans">
    <h1 className="text-4xl font-bold mb-8 border-b-2 border-black pb-2">
        ポケモン一覧
    </h1>

    <p className="text-gray-700 mb-6">
        下にポケモンの一覧が表示されます（APIから取得しています）。
    </p>

      {/* 🔽 データ状態によって表示切り替え */}
    {loading ? (
        <p className="text-gray-500 text-center">読み込み中...</p>
    ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
    )}

      {/* 🔽 ページ情報（あれば） */}
    {pagination && (
        <div className="mt-10 text-center text-gray-600">
        <p>
            ページ {pagination.currentPage} / {pagination.totalPages}
        </p>
        </div>
    )}
    </main>
);
}