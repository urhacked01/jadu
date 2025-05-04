'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholder.jpg',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setImgSrc(src);
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <Image
        src={imgSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300 ease-in-out',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
