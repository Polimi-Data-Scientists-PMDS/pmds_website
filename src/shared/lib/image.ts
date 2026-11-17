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

// Get preset for device type
export function imageSizeForDevice(viewportWidth: number, pixelRatio = 1): ImageSize {
  const needed = viewportWidth * Math.min(Math.max(pixelRatio, 1), 2);
  if (needed <= IMAGE_SIZES.sm) return 'sm';
  if (needed <= IMAGE_SIZES.md) return 'md';
  return 'lg';
}

export function withImageSize(
  url: string | undefined | null,
  size: ImageSize,
): string | undefined {
  if (!url) return undefined;
  if (!url.startsWith(PROXY_IMAGE_PREFIX)) return url;

  const [path, hash] = url.split('#');
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}size=${size}${hash ? `#${hash}` : ''}`;
}
