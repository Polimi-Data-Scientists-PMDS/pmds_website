export const IMAGE_SIZES = { sm: 640, md: 1080, lg: 1920 } as const;
export type ImageSize = keyof typeof IMAGE_SIZES;
export const IMAGE_SIZE_ORDER: readonly ImageSize[] = ['sm', 'md', 'lg'];

export const DEFAULT_IMAGE_SIZE: ImageSize = 'md';

export const PROXY_IMAGE_PREFIX = '/api/image/';

export function isImageSize(value: unknown): value is ImageSize {
  return typeof value === 'string' && Object.hasOwn(IMAGE_SIZES, value);
}

export function resolveImageSize(value: string | null | undefined): ImageSize {
  return isImageSize(value) ? value : DEFAULT_IMAGE_SIZE;
}

export function capImageSize(size: ImageSize, max: ImageSize): ImageSize {
  return IMAGE_SIZE_ORDER.indexOf(size) <= IMAGE_SIZE_ORDER.indexOf(max)
    ? size
    : max;
}

export function isProxyImage(url: string | undefined | null): url is string {
  return !!url && url.startsWith(PROXY_IMAGE_PREFIX);
}

export function withImageSize(
  url: string | undefined | null,
  size: ImageSize,
): string | undefined {
  if (!url) return undefined;
  if (!isProxyImage(url)) return url;

  const [path, hash] = url.split('#');
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}size=${size}${hash ? `#${hash}` : ''}`;
}

/**
 * Builds a `srcset` with one entry per preset up to `maxSize`
 * (e.g. `…?size=sm 640w, …?size=md 1080w`), so the browser picks
 * the right variant from `sizes` and the device pixel ratio.
 */
export function imageSrcSet(url: string, maxSize: ImageSize = 'lg'): string {
  const last = IMAGE_SIZE_ORDER.indexOf(maxSize);
  return IMAGE_SIZE_ORDER.slice(0, last + 1)
    .map((size) => `${withImageSize(url, size)} ${IMAGE_SIZES[size]}w`)
    .join(', ');
}
