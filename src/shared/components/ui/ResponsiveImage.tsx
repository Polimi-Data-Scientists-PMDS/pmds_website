import {
  capImageSize,
  DEFAULT_IMAGE_SIZE,
  imageSrcSet,
  isProxyImage,
  withImageSize,
  type ImageSize,
} from '@/shared/lib/image';
import Image, { type ImageProps } from 'next/image';
import { preload as preloadResource } from 'react-dom';

export interface ResponsiveImageProps
  extends Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'> {
  src: string;
  blurDataUrl?: string | null;
  maxSize?: ImageSize;
}

export default function ResponsiveImage({
  src,
  alt,
  blurDataUrl,
  maxSize = 'lg',
  sizes,
  priority,
  preload,
  loading,
  fetchPriority,
  ...rest
}: ResponsiveImageProps) {
  const blurProps = blurDataUrl
    ? { placeholder: 'blur' as const, blurDataURL: blurDataUrl }
    : {};

  // Non-proxy images (static assets, external URLs) have no presets.
  if (!isProxyImage(src)) {
    return (
      <Image
        {...rest}
        {...blurProps}
        src={src}
        alt={alt}
        sizes={sizes}
        preload={preload ?? priority}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  }

  const srcSet = imageSrcSet(src, maxSize);
  const fallbackSrc =
    withImageSize(src, capImageSize(DEFAULT_IMAGE_SIZE, maxSize)) ?? src;
  const eager = preload ?? priority ?? false;

  // next/image would preload only the fallback `src`; preload the srcset instead.
  if (eager) {
    preloadResource(fallbackSrc, {
      as: 'image',
      imageSrcSet: srcSet,
      imageSizes: sizes,
      fetchPriority: 'high',
    });
  }

  return (
    <picture>
      <source srcSet={srcSet} sizes={sizes} />
      <Image
        {...rest}
        {...blurProps}
        src={fallbackSrc}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : loading}
        fetchPriority={eager ? 'high' : fetchPriority}
      />
    </picture>
  );
}
