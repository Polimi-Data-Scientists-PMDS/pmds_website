'use client';

import {
  capImageSize,
  imageSizeForDevice,
  withImageSize,
  type ImageSize,
} from '@/shared/lib/image';
import Image, { type ImageProps } from 'next/image';
import { useSyncExternalStore } from 'react';


let deviceSize: ImageSize | null = null;
const listeners = new Set<() => void>();
let listening = false;

function refresh() {
  const next = imageSizeForDevice(window.innerWidth, window.devicePixelRatio || 1);
  if (next === deviceSize) return;
  deviceSize = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!listening) {
    listening = true;
    refresh();
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh);
  }
  return () => {
    listeners.delete(listener);
  };
}

function useDeviceImageSize(fallback: ImageSize): ImageSize {
  return useSyncExternalStore(
    subscribe,
    () => deviceSize ?? fallback,
    () => fallback,
  );
}

export interface ResponsiveImageProps
  extends Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'> {
  src: string;
  blurDataUrl?: string | null;
  maxSize?: ImageSize;
  fallbackSize?: ImageSize;
}

export default function ResponsiveImage({
  src,
  blurDataUrl,
  maxSize = 'lg',
  fallbackSize = 'md',
  ...rest
}: ResponsiveImageProps) {
  const size = capImageSize(useDeviceImageSize(fallbackSize), maxSize);

  return (
    <Image
      {...rest}
      src={withImageSize(src, size) ?? src}
      {...(blurDataUrl ? { placeholder: 'blur' as const, blurDataURL: blurDataUrl } : {})}
    />
  );
}
