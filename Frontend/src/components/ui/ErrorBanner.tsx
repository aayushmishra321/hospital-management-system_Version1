import React from 'react';

interface ErrorBannerProps {
    message: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="p-4 bg-status-error/10 border-l-4 border-status-error text-status-error text-sm font-body font-medium rounded-r-lg">
            {message}
        </div>
    );
};