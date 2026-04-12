import React from 'react';
import type { ButtonProps } from '../../types/design-system';

export const Button: React.FC<ButtonProps & { isLoading?: boolean }> = ({
  variant = 'primary',
  children,
  className = '',
  isLoading,
  ...props
}) => {
  const baseStyles = 'min-h-[44px] px-5 py-2.5 text-sm font-body font-medium transition-colors duration-150 flex items-center justify-center rounded-[8px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white border border-transparent shadow-sm',
    secondary: 'bg-surface hover:bg-background text-primary border-[1.5px] border-primary shadow-sm',
    destructive: 'bg-status-error hover:opacity-90 text-white border border-transparent shadow-sm',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            Loading...
          </span>
      ) : children}
    </button>
  );
};
