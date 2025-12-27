import React from 'react';
import clsx from 'clsx';

const LoadingSpinner = ({ size = 'md', color = 'primary', className }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const colorClasses = {
        primary: 'border-primary-200 border-t-primary-600',
        white: 'border-white/30 border-t-white',
        gray: 'border-gray-200 border-t-gray-600',
    };

    return (
        <div className={clsx('inline-flex items-center justify-center', className)}>
            <div
                className={clsx(
                    'rounded-full animate-spin',
                    sizeClasses[size],
                    colorClasses[color]
                )}
            />
        </div>
    );
};

export default LoadingSpinner;
