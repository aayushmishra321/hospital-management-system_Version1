import React from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
    return (
        <div className="p-8 bg-surface border border-dashed border-border rounded-lg text-center space-y-2 font-body">
            <h3 className="font-heading text-lg text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary max-w-sm mx-auto">{description}</p>
        </div>
    );
};