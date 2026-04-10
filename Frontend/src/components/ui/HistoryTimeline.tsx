import React from 'react';
import { Card } from './Card';

interface HistoryItem {
    id: string;
    date: string;
    diagnosis: string;
    doctorName: string;
}

export const HistoryTimeline: React.FC<{ items: HistoryItem[] }> = ({ items }) => {
    return (
        <Card title="Medical History Timeline">
            <div className="space-y-4 font-body">
                {items.map((item) => (
                    <div key={item.id} className="p-4 bg-background border border-border rounded-lg space-y-1">
                        <span className="font-mono text-xs text-primary">{item.date}</span>
                        <h4 className="font-heading text-base text-text-primary">{item.diagnosis}</h4>
                        <p className="text-xs text-text-secondary">Attending Doctor: Dr. {item.doctorName}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};