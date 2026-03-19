import React from 'react';
import type { InputProps } from '../../types/design-system';

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', id, ...props }) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={inputId} className="text-sm font-body font-medium text-text-primary">
                {label}
            </label>
            <input
                id={inputId}
                className={`min-h-[44px] px-3.5 py-2 bg-surface text-text-primary border rounded-[8px] text-sm font-body transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent ${error ? 'border-status-error focus:ring-status-error' : 'border-border focus:border-accent'
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs font-body text-status-error mt-0.5">{error}</span>}
            {!error && helperText && <span className="text-xs font-body text-text-secondary mt-0.5">{helperText}</span>}
        </div>
    );
};