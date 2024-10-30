/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/leksehjelp/' : '',
  basePath: isProd ? '/leksehjelp' : '',
  output: 'export'
};

export default nextConfig;
