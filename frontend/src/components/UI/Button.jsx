import React from 'react';
import clsx from 'clsx';

const Button = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon = null,
    onClick,
    className,
    children,
    type = 'button',
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2';

    const sizeClasses = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-4 px-8 text-lg',
    };

    const variantClasses = {
        primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600',
        ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
    };

    const disabledClasses = 'opacity-60 cursor-not-allowed pointer-events-none';

    const buttonClass = clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        {
            [disabledClasses]: disabled || loading,
        },
        className
    );

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
            {...props}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {icon && <span className="flex items-center">{icon}</span>}
            <span>{children}</span>
        </button>
    );
};

export default Button;
