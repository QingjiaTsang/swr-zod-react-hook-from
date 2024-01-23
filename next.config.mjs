/** @type {import('next').NextConfig} */

const baseUrl = 'http://192.168.3.10:8004';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cruip-tutorials-next.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/operate/:path*',
        destination: `${baseUrl}/operate/:path*`,
      },
    ];
  },
};

export default nextConfig;
