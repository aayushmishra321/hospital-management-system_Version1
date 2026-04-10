import React from 'react';
import { Button } from './Button';

interface Action {
    label: string;
    onClick: () => void;
}

export const QuickActions: React.FC<{ actions: Action[] }> = ({ actions }) => {
    return (
        <div className="p-4 bg-surface border border-border rounded-lg flex flex-wrap gap-3 font-body">
            {actions.map((act, index) => (
                <Button key={index} variant="secondary" onClick={act.onClick}>
                    {act.label}
                </Button>
            ))}
        </div>
    );
};