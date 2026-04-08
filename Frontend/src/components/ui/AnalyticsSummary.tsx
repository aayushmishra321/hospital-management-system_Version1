import React from 'react';
import { Card } from './Card';

interface AnalyticsProps {
    title: string;
    total: string;
    subtext: string;
}

export const AnalyticsSummary: React.FC<AnalyticsProps> = ({ title, total, subtext }) => {
    return (
        <Card title={title}>
            <div className="space-y-1 font-body">
                <p className="text-3xl font-mono text-primary font-bold">{total}</p>
                <p className="text-xs text-text-secondary">{subtext}</p>
            </div>
        </Card>
    );
};