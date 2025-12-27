import React from 'react';
import Skeleton from '../UI/Skeleton';

const MenuSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-2.5 cursor-pointer">
            {/* Image Circle Skeleton */}
            <Skeleton className="w-[7.5vw] min-w-[80px] h-[7.5vw] min-h-[80px] rounded-full" />
            {/* Text Skeleton */}
            <Skeleton className="h-4 w-16" />
        </div>
    );
};

export default MenuSkeleton;
