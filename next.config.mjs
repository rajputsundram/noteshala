/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/login',  // Default redirect to login
        permanent:false,
        has: [
          {
            type: 'header',
            key: 'authorization',
            value: '',  // Only redirect to login if the token is missing or invalid
          },
        ],
      },
    ];
  },
};

export default nextConfig;
