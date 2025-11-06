import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['whiterabbit39.sakura.ne.jp', 'liginc.co.jp'],
    // または、すべての外部ホストを許可する場合（開発環境のみ推奨）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
