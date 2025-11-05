/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'], // ← これが大事！画像を持ってくるのに必要
  },
};

export default nextConfig;