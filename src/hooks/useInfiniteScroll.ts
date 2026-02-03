import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function useInfiniteScroll({
  threshold = 1.0,
  root = null,
  rootMargin = '0px',
  onLoadMore,
  hasMore,
  isLoading,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore, root, rootMargin, threshold]);

  return { sentinelRef };
}
