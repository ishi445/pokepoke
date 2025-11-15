// src/app/pokemon/page.tsx

import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading';
import { getProcessedPokemonList } from '@/lib/pokeapi';
import PaginationComponent from "@/components/pagination";

// Local fallback PokemonCard component to avoid missing module error
export function PokemonCard({ pokemon }: { pokemon: any }) {
  console.log('ブラウザで表示されるポケモン:', pokemon);
  return (
    <article className="bg-white shadow rounded p-4 flex flex-col items-center">
      <img
        src={pokemon.imageUrl ?? (pokemon.sprites?.front_default ?? '/placeholder.png')}
        alt={pokemon.name}
        className="w-24 h-24 object-contain mb-2"
      />
      <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
      <h3 className="text-lg font-semibold">{pokemon.japaneseName }</h3>
      
    </article>
  );
}

// Minimal PaginationComponent added locally to avoid missing module error



interface SearchParams {
  page?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

async function PokemonListContent({ page }: { page: number }) {
  // ポケモンデータ取得
   // 💡 課題: getProcessedPokemonList()を使ってポケモンデータを取得
  // 💡 課題: PokemonCardコンポーネントでグリッド表示
  // 💡 課題: PaginationComponentでページング
  const pokemonData = await getProcessedPokemonList(page, 20);
  console.log('サーバーで取得したデータ:', pokemonData);
  const pokemonList = pokemonData.pokemon;
  const paginationInfo = pokemonData.pagination;

  // Normalize paginationInfo to the local Pagination type expected by PaginationComponent
    const pagination = {
    currentPage: page,
    totalPages: paginationInfo.totalPages,
    hasNext: page < paginationInfo.totalPages,
    hasPrev: page > 1,
  };

  return (
    <>
      <p className="text-center mb-4 text-gray-500">
        {`Fetched ${pokemonList.length} Pokémon for page ${page}.`}
      </p>

      {/* ✅ ポケモンカードをグリッドで表示 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* ✅ ページネーション */}
      <div className="mt-8 flex justify-center">
        <PaginationComponent pagination={pagination} basePath="/list" />
      </div>
    </>
  );
}

export default async function PokemonListPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">ポケモン一覧</h1>
      <p className="text-1xl text-center mb-8">画像をクリックして詳細を表示できます</p>

      <Suspense fallback={<Loading />}>
        <PokemonListContent page={currentPage} />
      </Suspense>
    </div>
  );
}