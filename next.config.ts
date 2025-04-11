/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores TypeScript ESLint errors during build
  },
};

export default nextConfig;
