import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const privateHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
      { key: 'Cache-Control', value: 'private, no-store' },
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
    ];
    return [
      { source: '/mcfuntain-private-product-vault', headers: privateHeaders },
      { source: '/api/manuals/:path*', headers: privateHeaders },
      { source: '/api/manual-send', headers: privateHeaders },
    ];
  },
};

export default nextConfig;
