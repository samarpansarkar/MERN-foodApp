import React from 'react';
import Skeleton from '../UI/Skeleton';

const FoodItemSkeleton = () => {
    return (
        <div className="w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] transition duration-300 animate-pulse bg-white">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-[260px] rounded-t-[15px]" />

            <div className="p-5">
                <div className="flex justify-between items-center mb-2.5">
                    {/* Name Skeleton */}
                    <Skeleton className="h-6 w-1/2" />
                    {/* Rating Skeleton */}
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Description Skeleton */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-2.5" />

                {/* Price Skeleton */}
                <Skeleton className="h-7 w-20 text-[22px] font-[500]" />
            </div>
        </div>
    );
};

export default FoodItemSkeleton;
