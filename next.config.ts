import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 출력 추적 루트 설정으로 권한 문제 해결
  outputFileTracingRoot: process.cwd(),
  
  // 이미지 최적화 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.tylko.com',
        port: '',
        pathname: '/cloudinary/**',
      },
      {
        protocol: 'https',
        hostname: 'fast.wistia.com',
        port: '',
        pathname: '/embed/**',
      },
    ],
  },
  
  // 실험적 기능 비활성화
  experimental: {
    // 출력 추적 비활성화 (권한 문제 해결)
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  
  // 웹팩 설정
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
