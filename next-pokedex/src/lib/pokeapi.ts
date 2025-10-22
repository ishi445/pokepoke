// src/lib/pokeapi.ts

const BASE_URL = 'https://pokeapi.co/api/v2';
const SAFE_POKEMON_LIMIT = 1010;

/**
 * ポケモン一覧を取得する
 */
export async function fetchPokemonList(
limit: number = 20, 
offset: number = 0
): Promise<PokemonListResponse> {
  // 💡 課題: fetch()を使ってAPIからデータを取得してください
  // エンドポイント: `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
}

/**
 * 個別のポケモン詳細情報を取得する
 */
export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  // 💡 課題: ポケモンの詳細情報を取得してください
  // エンドポイント: `${BASE_URL}/pokemon/${idOrName}`
}

/**
 * 多言語名前配列から日本語名を取得する
 */
export function getJapaneseName(names: Name[]): string {
  // 💡 課題: 'ja-Hrkt' または 'ja' の言語コードを持つ名前を探してください
}

/**
 * ポケモンの画像URLを取得する
 */
export function getPokemonImageUrl(sprites: Pokemon['sprites']): string {
  // 💡 課題: official-artwork → home → front_default の優先順位で画像URLを取得
}

// タイプ名の日本語変換テーブル
export const typeTranslations: Record<string, string> = {
normal: 'ノーマル',
fire: 'ほのお',
water: 'みず',
  // 💡 課題: 他のタイプも追加してください
};

/**
 * ポケモン一覧を処理済みデータとして取得する
 */
export async function getProcessedPokemonList(
page: number = 1, 
limit: number = 20
): Promise<{
  pokemon: ProcessedPokemon[];
  pagination: PaginationInfo;
}> {
  // 💡 課題: ページングを考慮してポケモンデータを取得し、
  // ProcessedPokemon形式に変換してください
}