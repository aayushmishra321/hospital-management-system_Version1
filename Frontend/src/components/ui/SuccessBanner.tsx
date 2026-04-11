import React from 'react';

interface SuccessBannerProps {
    message: string;
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="p-4 bg-status-success/10 border-l-4 border-status-success text-status-success text-sm font-body font-medium rounded-r-lg">
            {message}
        </div>
    );
};