/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // PokeAPIの画像がホストされているドメインを指定
        hostname: 'raw.githubusercontent.com', 
      },
    ],
  },
};

module.exports = nextConfig;