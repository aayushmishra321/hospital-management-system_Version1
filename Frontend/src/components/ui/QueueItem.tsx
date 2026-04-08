import React from 'react';
import { Button } from './Button';

interface QueueItemProps {
    tokenNumber: number;
    patientName: string;
    time: string;
    onStartConsultation: () => void;
}

export const QueueItem: React.FC<QueueItemProps> = ({ tokenNumber, patientName, time, onStartConsultation }) => {
    return (
        <div className="p-4 bg-surface border border-border rounded-lg flex items-center justify-between font-body">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-surface rounded-lg flex items-center justify-center font-mono font-bold text-lg">
                    #{tokenNumber}
                </div>
                <div>
                    <h4 className="font-heading text-lg text-text-primary">{patientName}</h4>
                    <p className="text-xs font-mono text-text-secondary">Scheduled: {time}</p>
                </div>
            </div>
            <Button variant="primary" onClick={onStartConsultation}>Start Visit</Button>
        </div>
    );
};