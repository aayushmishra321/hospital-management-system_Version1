import React from 'react';

interface ClinicalBadgeProps {
    status: 'active' | 'pending' | 'urgent' | 'completed';
    label: string;
}

export const ClinicalBadge: React.FC<ClinicalBadgeProps> = ({ status, label }) => {
    const styles = {
        active: 'bg-status-success/10 text-status-success border-status-success/20',
        pending: 'bg-status-warning/10 text-status-warning border-status-warning/20',
        urgent: 'bg-status-error/10 text-status-error border-status-error/20',
        completed: 'bg-status-info/10 text-status-info border-status-info/20',
    };

    return (
        <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-full border ${styles[status]}`}>
            {label}
        </span>
    );
};