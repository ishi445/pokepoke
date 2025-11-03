// src/lib/pokeapi.ts
import { PokemonListResponse } from "./types";
import type { Pokemon } from "./types";
import type { Name } from "./types";
import type{ PaginationInfo } from "./types";

async function fetchJson<T>(url: string): Promise<T> {
const res = await fetch(url);
if (!res.ok) {
    // 開発中はエラーメッセージを残すとデバッグしやすい
    throw new Error(`Fetch error ${res.status} ${res.statusText} for ${url}`);
}
const data = await res.json();
return data as T;//TypeScript用
}


const BASE_URL = 'https://pokeapi.co/api/v2';
const SAFE_POKEMON_LIMIT = 1010;

/**
 * ポケモン一覧を取得する
 */
export async function fetchPokemonList(
limit: number = 20, 
offset: number = 0
): Promise<PokemonListResponse> {
  // 💡✅ 課題: fetch()を使ってAPIからデータを取得してください
  // エンドポイント: `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`

const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
return await fetchJson<PokemonListResponse>(url);
}

/**
 * 個別のポケモン詳細情報を取得する
 */
  // 💡✅ 課題: ポケモンの詳細情報を取得してください
  // エンドポイント: `${BASE_URL}/pokemon/${idOrName}`
export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
const url = `${BASE_URL}/pokemon/${idOrName}`;
const data = await fetchJson<Pokemon>(url);
return data;
}

/**
 * 多言語名前配列から日本語名を取得する
 */
export function getJapaneseName(names: Name[]): string {
  // 💡 ✅課題: 'ja-Hrkt' または 'ja' の言語コードを持つ名前を探してください
const jp = names.find(
    (n) => n.language.name === "ja-Hrkt" || n.language.name === "ja"
);
  // 見つかったらその名前、なければ英語など
return jp ? jp.name : names[0]?.name ?? "（不明）";
}

/**
 * ポケモンの画像URLを取得する
 */
export function getPokemonImageUrl(sprites: Pokemon['sprites']): string {
  // 💡✅ 課題: official-artwork → home → front_default の優先順位で画像URLを取得
  // ① official-artwork の画像を最優先
    const official =sprites.other?.["official-artwork"]?.front_default;
      // ② なければ home の画像を使う
    const home = sprites.other?.home?.front_default;

  // ③ 最後の手段として通常の front_default を使う
    const basic = sprites.front_default;

  // 4️ どれもなければ、代わりの画像を返す（または空文字でもOK）
  return '/dummy-pokemon.png'; // ←画像パス
}

// タイプ名の日本語変換テーブル
  // 💡✅ 課題: 他のタイプも追加してください
  //今回は手で追加したけど、fetchで取ってきてもよい
export const typeTranslations: Record<string, string> = {
normal: 'ノーマル',
fire: 'ほのお',
water: 'みず',
electric: 'でんき',
grass: 'くさ',
ice: 'こおり',
fighting: 'かくとう',
poison: 'どく',
ground: 'じめん',
flying: 'ひこう',
psychic: 'エスパー',
bug: 'むし',
rock: 'いわ',
ghost: 'ゴースト',
dragon: 'ドラゴン',
dark: 'あく',
steel: 'はがね',
fairy: 'フェアリー',
};


/**
 * ポケモン一覧を処理済みデータとして取得する
 */
export async function getProcessedPokemonList(
page: number = 1, 
limit: number = 20
): Promise<{
pokemon: PokemonListResponse[];
pagination: PaginationInfo;
}> {

// 💡 課題: ページングを考慮してポケモンデータを取得し、
// ProcessedPokemon形式に変換してください
//やること６つ
//１　オフセット計算
const offset = (page -1) * limit; 

//２　ポケモンリストから取ってくる
const list = await fetchPokemonList(limit, offset);

//３　詳細情報全部持ってくる
const details = await Promise.all(
    list.results.map((p) => fetchPokemon(p.name))
);
//４　画像を処理済みデータに変換
const processed = details.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    japaneseName: pokemon.name, //  後で getJapaneseName() を使って正確に変える
    imageUrl: getPokemonImageUrl(pokemon.sprites),
    types: pokemon.types.map((t) => t.type.name),
    height: pokemon.height,
    weight: pokemon.weight,
    genus: "", //  後で species 情報を使って埋める
    abilities: pokemon.abilities.map((a) => ({
    name: a.ability.name,
    isHidden: a.is_Hidden,
    })),
}));

//５　ページ切り替え用情報作成
const pagination: PaginationInfo = {
    currentPage: page,
    totalPages: Math.ceil(list.count / limit),
    hasNext: list.next !== null,
    hasPrev: list.previous !== null,
    totalCount: list.count,
};

//６　リターン
return {
    pokemon: processed,
    pagination,
};
}
