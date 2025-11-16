/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // PokeAPIの画像がホストされているドメインを指定
        hostname: 'raw.githubusercontent.com',
        // パス全体を許可
        pathname: '/PokeAPI/sprites/**',
      },
      // 追加で許可しておきたいドメイン（必要なら有効化）
      // {
      //   protocol: 'https',
      //   hostname: 'assets.pokemon.com',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;