
// 基本的な名前とURL構造
export type NamedApiResource = {
  name: string;
  url: string;
};

// 多言語対応の名前
export type Name = {
  name: string;
  language: NamedApiResource;
};

// ポケモン一覧のレスポンス
export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
};

// 💡 課題: 以下の型も定義してください

// - Pokemon（ポケモンの基本情報）
export type Pokemon = {
  id: number; // 番号
  name: string; // 名前
  types: PokemonType[]; // タイプ
  sprites: PokemonSprites; // 画像情報
  height: number; // 高さ
  weight: number; // 重さ
  abilities: ProcessedAbility[]; // 特性
};

// - PokemonType（タイプ情報）
export type PokemonType = {
  slot: number; // タイプの順番
  type: NamedApiResource; // タイプの名前とURL
};

// - PokemonSprites（画像情報）
export type PokemonSprites = {
  front_default: string | null;
  back_default?: string | null;
  other?: {
    home?: {
      front_default?: string | null;
    };
    ["official-artwork"]?: {
      front_default?: string | null;
    };
  };
};

// - PokemonSpeciesDetail（種別詳細情報）
export type ProcessedAbility = {
  name: string;
  ability: NamedApiResource;
  is_Hidden: boolean;
};

// アプリ内で使用する処理済みポケモンデータ
export type ProcessedPokemon = {
  id: number;
  name: string;
  japaneseName: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  genus: string;
  abilities: ProcessedAbility[];
};

// ページネーション情報
export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalCount: number;
};