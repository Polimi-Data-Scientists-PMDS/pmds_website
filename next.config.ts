import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

// Suppress the annoying url.parse() deprecation warning from Next.js internal dependencies
const originalEmit = process.emitWarning;
// @ts-ignore
process.emitWarning = function (
  warning: any,
  type?: any,
  code?: any,
  ...args: any[]
) {
  if (code === 'DEP0169') return;
  // @ts-ignore
  return originalEmit.call(process, warning, type, code, ...args);
};

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    minimumCacheTTL: 2678400, // Cache optimized images for 31 days (recommended by Vercel)
    formats: ['image/webp'], // Single modern format to prevent duplicate transformations
    deviceSizes: [640, 1080, 1920], // Reduced from 8 default sizes to 3 standard breakpoints
    imageSizes: [32, 48, 64, 128, 256], // Specific sizes for avatars and thumbnails
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // Notion images
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com', // Legacy Notion public images
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com', // AWS S3 standard format
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google avatars
      },
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'polimidatascientists.it', // Legacy WP images
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
