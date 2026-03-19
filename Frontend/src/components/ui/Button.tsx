import React from 'react';
import type { ButtonProps } from '../../types/design-system';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    ...props
}) => {
    const baseStyles = 'min-h-[44px] px-5 py-2.5 text-sm font-body font-medium transition-colors duration-150 flex items-center justify-center rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#1B6E9E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white border border-transparent shadow-[0_1px_2px_rgba(18,32,28,0.06)]',
        secondary: 'bg-surface hover:bg-background text-primary border-[1.5px] border-primary shadow-[0_1px_2px_rgba(18,32,28,0.06)]',
        destructive: 'bg-status-error hover:opacity-90 text-white border border-transparent shadow-[0_1px_2px_rgba(18,32,28,0.06)]',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};