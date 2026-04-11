import React from 'react';

export const LoadingOverlay: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/20 backdrop-blur-xs">
            <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};