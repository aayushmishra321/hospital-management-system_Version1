import React from 'react';
import type { BadgeProps } from '../../types/design-system';

export const Badge: React.FC<BadgeProps> = ({ status, label }) => {
    const statusStyles = {
        success: 'bg-status-success/12 text-status-success border-status-success/30',
        warning: 'bg-status-warning/12 text-status-warning border-status-warning/30',
        error: 'bg-status-error/12 text-status-error border-status-error/30',
        info: 'bg-status-info/12 text-status-info border-status-info/30',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-mono font-medium border ${statusStyles[status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {label}
        </span>
    );
};