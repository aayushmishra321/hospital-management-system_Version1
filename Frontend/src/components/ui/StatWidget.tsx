import React from 'react';
import { Card } from './Card';

interface StatWidgetProps {
    label: string;
    value: string | number;
    trend?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({ label, value, trend }) => {
    return (
        <Card title={label}>
            <p className="text-3xl font-mono text-primary mt-2">{value}</p>
            {trend && <p className="text-xs text-text-secondary mt-1">{trend}</p>}
        </Card>
    );
};