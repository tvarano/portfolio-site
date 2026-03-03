/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return [
      { source: '/about',      destination: '/' },
      { source: '/experience', destination: '/' },
      { source: '/coursework', destination: '/' },
      { source: '/resume',     destination: '/' },
      { source: '/connect',    destination: '/' },
    ];
  },
};

export default nextConfig;
