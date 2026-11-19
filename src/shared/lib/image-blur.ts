import sharp from 'sharp';

/** width for the inline placeholder. */
const BLUR_WIDTH = 24;
const BLUR_QUALITY = 30;

/** Amount of attempts to fetch originals at build time. */
const CONCURRENCY = 4;

const FETCH_TIMEOUT_MS = 30_000;

export interface Blurrable {
  blurDataUrl?: string;
}

export async function generateBlurDataUrl(input: Buffer): Promise<string | null> {
  try {
    const output = await sharp(input)
      .rotate()
      .resize({ width: BLUR_WIDTH, withoutEnlargement: true })
      .webp({ quality: BLUR_QUALITY })
      .toBuffer();

    return `data:image/webp;base64,${output.toString('base64')}`;
  } catch (error) {
    console.warn('[image] blur generation failed:', (error as Error).message);
    return null;
  }
}

/** If this fails null gets returned */
export async function fetchBlurDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await generateBlurDataUrl(Buffer.from(await res.arrayBuffer()));
  } catch (error) {
    console.warn('[image] blur skipped:', (error as Error).message);
    return null;
  }
}

/** Adds `blurDataUrl` to every item */
export async function attachBlurDataUrls<T extends Blurrable>(
  items: T[],
  getSourceUrl: (item: T) => string | null | undefined,
  concurrency = CONCURRENCY,
): Promise<T[]> {
  const targets = items.filter((item) => getSourceUrl(item));
  let cursor = 0;

  const worker = async () => {
    while (cursor < targets.length) {
      const item = targets[cursor++];
      const dataUrl = await fetchBlurDataUrl(getSourceUrl(item)!);
      if (dataUrl) item.blurDataUrl = dataUrl;
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, targets.length) }, worker),
  );

  return items;
}
