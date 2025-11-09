// src/components/pokemon-card.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcessedPokemon } from '@/lib/types';

interface PokemonCardProps {
pokemon: ProcessedPokemon;
}

const typeTranslations: Record<string, string> = {
Normal: "ノーマル",
Fire: "ほのお",
Water: "みず",
Electric: "でんき",
Grass: "くさ",
Ice: "こおり",
Fighting: "かくとう",
Poison: "どく",
Ground: "じめん",
Flying: "ひこう",
Psychic: "エスパー",
Bug: "むし",
Rock: "いわ",
Ghost: "ゴースト",
Dark: "あく",
Dragon: "ドラゴン",
Steel: "はがね",
Fairy: "フェアリー",
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
    console.log("ポケモンID:", pokemon.id);
    // 画像が出ないときはここで URL を確認
    console.log("画像URL:", pokemon.imageUrl);
    console.log("pokemonオブジェクト:", pokemon);
// id が undefined/null の場合は 0 を使って "No.000" 表示にする
const formattedId = String(pokemon.id ?? 0).padStart(3, "0");

return (
    <Link href={`/pokemon/${pokemon.id}`}>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-4">
        <div className="text-center">
            {/* 💡 課題: ポケモン画像を表示してください */}
            {/* - Imageコンポーネントを使用 */}
            {/* - pokemon.imageUrl を src に設定 */}
            {/* - レスポンシブ対応 */}
            {/* ポケモン画像 */}
            {/* //9-04.アプリの実装を読み解くから持ってきた */}
            <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            width={120}
            height={120}
            className="mx-auto"
            />
            
            {/* 💡 課題: ポケモン番号を3桁で表示してください（例: No. 001） */}
            <p className="text-gray-700 mt-2">No.{formattedId}</p>
                
            {/* 💡 課題: ポケモンの日本語名を表示してください */}
            <p className="font-bold text-lg">{pokemon.japaneseName || pokemon.name}</p>
            
            {/* 💡 課題: タイプをBadgeで表示してください */}
            {/* - pokemon.types をmap()で処理 */}
            {/* - typeTranslations で日本語変換 */}
            <div className="flex justify-center gap-2 mt-2">
            {pokemon.types.map((type) => (
                <Badge key={type} variant="outline">
                {typeTranslations[type] || type}
                </Badge>
            ))}
            </div>
        </div>
            
    
    
    </CardContent>
    </Card>
    </Link>
);
}