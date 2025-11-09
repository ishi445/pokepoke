//ポケモン一覧ページ


import { Loading } from '@/components/ui/loading';
import { getProcessedPokemonList } from '@/lib/pokeapi';
import { Suspense } from 'react';

interface SearchParams {
page?: string;
}

interface Props {
searchParams: Promise<SearchParams>;
}

async function PokemonListContent({ page }: { page: number }) {
  // 💡 課題: getProcessedPokemonList()を使ってポケモンデータを取得
  // 💡 課題: PokemonCardコンポーネントでグリッド表示
  // 💡 課題: PaginationComponentでページング

  // getProcessedPokemonListを使う
  const pokemonData = await getProcessedPokemonList(page, 20);
  const pokemonList = pokemonData.pokemon;
  // ページング情報も使える
  const paginationInfo = pokemonData.pagination;  

  // Temporary placeholder UI so this async component returns JSX (not void).
  // Replace with real data fetching and rendering logic.
  return (
    <div>
      <p>Fetched {pokemonList.length} Pokémon for page {page}.</p>
      <p>Pagination Info: {JSON.stringify(paginationInfo)}</p>
      {
        /* ここにPokemonCardコンポーネントを使ったグリッド表示を実装してください */
        
      }
    </div>
  );
}

export default async function PokemonListPage({ searchParams }: Props) {
const resolvedParams = await searchParams;
const currentPage = Number(resolvedParams.page) || 1;

return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">ポケモン一覧</h1>
    
    <Suspense fallback={<Loading />}>
        <PokemonListContent page={currentPage} />
    </Suspense>
    </div>
);
}