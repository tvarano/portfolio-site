/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async rewrites() {
    return [
      { source: '/about',      destination: '/' },
      { source: '/experience', destination: '/' },
      { source: '/education',  destination: '/' },
      { source: '/resume',     destination: '/' },
      { source: '/connect',    destination: '/' },
    ];
  },
};

export default nextConfig;
