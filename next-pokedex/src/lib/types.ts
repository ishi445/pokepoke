// src/lib/types.ts

// 基本的な名前とURL構造
export interface NamedApiResource {
  name: string;
  url: string;
}

// 多言語対応の名前
export interface Name {
  name: string;
  language: NamedApiResource;
}

// ポケモン一覧のレスポンス
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

// 💡 課題: 以下の型も定義してください

// - Pokemon（ポケモンの基本情報）
export  interface Pokemon{
id:number;//番号
name:string;//名前
types:string;//タイプ
sprites:PokemonSprites;//画像情報
height:number;//高さ
weight:number;//重さ
abilities:string;//特性
}

// - PokemonType（タイプ情報）
export interface Pokemon{
    slot:number; //タイプの順番
    type:NamedApiResource;//タイプの名前とURL
}

// - PokemonSprites（画像情報）
export interface PokemonSprites{
  front_default:string | null;//正面画像
  back_default?:string | null;//後ろ向き画像(あれば)
}

// - PokemonSpeciesDetail（種別詳細情報）


// アプリ内で使用する処理済みポケモンデータ
export interface ProcessedPokemon {
  id: number;
  name: string;
  japaneseName: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  genus: string;
  abilities: ProcessedAbility[];
}

// ページネーション情報
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalCount: number;
}