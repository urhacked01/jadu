'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BikeCardSkeleton({ count = 1 }: { count?: number }) {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 sm:h-56 w-full">
          <Skeleton height="100%" />
        </div>
        <div className="p-6">
          <Skeleton height={28} width="80%" className="mb-2" />
          <Skeleton count={2} className="mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton width={80} height={28} />
            <Skeleton width={100} height={36} borderRadius={8} />
          </div>
        </div>
      </div>
    ));
}
