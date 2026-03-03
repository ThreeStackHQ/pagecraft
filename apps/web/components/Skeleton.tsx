import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

/**
 * Skeleton — animated placeholder for loading states.
 *
 * Usage:
 *   <Skeleton className="h-6 w-48" />
 *   <Skeleton lines={3} />
 */
export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-md bg-gray-200 ${i === lines - 1 ? 'w-3/4' : 'w-full'} h-4 ${className}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
}

/** Card-shaped skeleton for project cards in the dashboard */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <Skeleton className="mb-3 h-5 w-2/3" />
      <Skeleton className="mb-4 h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

/** Full-page spinner for top-level Suspense boundaries */
export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}

export default Skeleton;
