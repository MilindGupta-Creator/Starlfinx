'use client';

import { useEffect, useState } from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

// Shimmer effect component
const Shimmer = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer ${className}`} />
);

// Product card skeleton
export const ProductCardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    <div className="relative h-48 w-full">
      <Shimmer className="h-full w-full" />
    </div>
    <div className="p-4 space-y-3">
      <Shimmer className="h-6 w-3/4 rounded" />
      <Shimmer className="h-4 w-full rounded" />
      <Shimmer className="h-4 w-2/3 rounded" />
      <div className="flex justify-between items-center">
        <Shimmer className="h-8 w-20 rounded" />
        <Shimmer className="h-4 w-16 rounded" />
      </div>
      <div className="flex justify-between items-center">
        <Shimmer className="h-4 w-16 rounded" />
        <Shimmer className="h-4 w-12 rounded" />
      </div>
      <Shimmer className="h-10 w-full rounded" />
    </div>
  </div>
);

// Cart item skeleton
export const CartItemSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border ${className}`}>
    <Shimmer className="h-20 w-20 rounded-md flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Shimmer className="h-6 w-3/4 rounded" />
      <Shimmer className="h-4 w-1/2 rounded" />
      <Shimmer className="h-6 w-20 rounded" />
    </div>
    <div className="flex items-center space-x-2">
      <Shimmer className="h-8 w-8 rounded-full" />
      <Shimmer className="h-6 w-12 rounded" />
      <Shimmer className="h-8 w-8 rounded-full" />
    </div>
    <div className="text-right space-y-2">
      <Shimmer className="h-6 w-16 rounded" />
      <Shimmer className="h-4 w-12 rounded" />
    </div>
  </div>
);

// Header skeleton
export const HeaderSkeleton = ({ className = '' }: { className?: string }) => (
  <header className={`bg-white shadow-md ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-6 w-24 rounded" />
        </div>
        <div className="flex items-center space-x-8">
          <Shimmer className="h-4 w-16 rounded" />
          <Shimmer className="h-6 w-6 rounded" />
        </div>
      </div>
    </div>
  </header>
);

// Search and filter skeleton
export const SearchFilterSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
    <Shimmer className="h-12 w-full rounded-lg mb-6" />
    <div className="flex items-center justify-between mb-4">
      <Shimmer className="h-4 w-32 rounded" />
      <Shimmer className="h-4 w-20 rounded" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Shimmer className="h-4 w-16 rounded" />
          <Shimmer className="h-10 w-full rounded" />
        </div>
      ))}
    </div>
  </div>
);

// Grid skeleton for multiple items
export const GridSkeleton = ({ count = 8, className = '' }: SkeletonProps) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// List skeleton for cart items
export const ListSkeleton = ({ count = 3, className = '' }: SkeletonProps) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <CartItemSkeleton key={i} />
    ))}
  </div>
);

// Page loading skeleton
export const PageSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`min-h-screen bg-gray-50 ${className}`}>
    <HeaderSkeleton />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Shimmer className="h-8 w-48 rounded mb-2" />
        <Shimmer className="h-4 w-64 rounded" />
      </div>
      <SearchFilterSkeleton className="mb-6" />
      <GridSkeleton count={8} />
    </div>
  </div>
);

// Custom hook for staggered loading animation
export const useStaggeredLoading = (delay: number = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};

// Staggered skeleton component
export const StaggeredSkeleton = ({ 
  count = 8, 
  staggerDelay = 100, 
  className = '' 
}: SkeletonProps & { staggerDelay?: number }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < count) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, staggerDelay);

    return () => clearInterval(interval);
  }, [count, staggerDelay]);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${
            i < visibleCount 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
};

// Pulse loading spinner
export const PulseSpinner = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-ping"></div>
    </div>
  </div>
);

// Text skeleton for content loading
export const TextSkeleton = ({ 
  lines = 3, 
  className = '' 
}: { lines?: number; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Shimmer 
        key={i} 
        className={`h-4 rounded ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
      />
    ))}
  </div>
);





