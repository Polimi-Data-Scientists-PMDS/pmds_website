import { NextRequest } from 'next/server';
import { Client } from '@notionhq/client';
import sharp from 'sharp';
import { IMAGE_SIZES, resolveImageSize, type ImageSize } from '@/shared/lib/image';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const QUALITY: Record<ImageSize, number> = {
  sm: 70,
  md: 75,
  lg: 80,
};

const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  if (!token) {
    return new Response('Missing token', { status: 400 });
  }

  // Only sm | md | lg are accepted; anything else is md.
  const size = resolveImageSize(request.nextUrl.searchParams.get('size'));
  const width = IMAGE_SIZES[size];
  const quality = QUALITY[size];

  let id: string;
  let prop: string;

  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    id = decoded.id;
    prop = decoded.prop;
  } catch {
    return new Response('Invalid token', { status: 400 });
  }

  try {
    const page: any = await notion.pages.retrieve({ page_id: id });
    const files = page.properties[prop]?.files || [];
    if (files.length === 0) {
      return new Response('Image not found in page properties', {
        status: 404,
      });
    }

    const file = files[0];
    const rawUrl = file.type === 'external' ? file.external.url : file.file.url;

    const res = await fetch(rawUrl);
    if (!res.ok) {
      return new Response('Failed to fetch image from storage', {
        status: res.status,
      });
    }

    const upstreamType = res.headers.get('content-type') || 'image/jpeg';
    const rawBuffer = Buffer.from(await res.arrayBuffer());

    // ignore svgs and other vector images
    const isRaster =
      upstreamType.startsWith('image/') && !upstreamType.includes('svg');

    if (!isRaster) {
      return new Response(new Uint8Array(rawBuffer), {
        headers: {
          'Content-Type': upstreamType,
          ...CACHE_HEADERS,
        },
      });
    }

    try {
      const optimized = await sharp(rawBuffer)
        .rotate() // apply EXIF orientation
        .resize({
          width,
          height: width,
          fit: 'inside',
          withoutEnlargement: true, // never upscale a small original
        })
        .webp({ quality, effort: 4 })
        .toBuffer();

      return new Response(new Uint8Array(optimized), {
        headers: {
          'Content-Type': 'image/webp',
          ...CACHE_HEADERS,
        },
      });
    } catch (sharpError) {
      console.warn('Sharp optimization failed, serving original:', sharpError);
      return new Response(new Uint8Array(rawBuffer), {
        headers: {
          'Content-Type': upstreamType,
          ...CACHE_HEADERS,
        },
      });
    }
  } catch (error: any) {
    console.error('Image proxy error:', error);
    return new Response(error.message || 'Internal Server Error', {
      status: 500,
    });
  }
}
