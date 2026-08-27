import type { NextConfig } from "next";
import createMDX from '@next/mdx';

// Suppress the annoying url.parse() deprecation warning from Next.js internal dependencies
const originalEmit = process.emitWarning;
// @ts-ignore
process.emitWarning = function(warning: any, type?: any, code?: any, ...args: any[]) {
  if (code === 'DEP0169') return;
  // @ts-ignore
  return originalEmit.call(process, warning, type, code, ...args);
};

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
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
        hostname: 'lh3.googleusercontent.com', // Google avatars
      }
    ]
  }
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
