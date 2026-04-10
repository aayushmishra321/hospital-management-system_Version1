import React from 'react';
import { Card } from './Card';
import { Button } from './Button';

interface AppointmentCardProps {
    doctorName: string;
    department: string;
    date: string;
    timeSlot: string;
    status: string;
    onCancel?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ doctorName, department, date, timeSlot, status, onCancel }) => {
    return (
        <Card title={`Dr. ${doctorName}`}>
            <div className="space-y-2 font-body text-sm">
                <p><span className="text-text-secondary">Department:</span> <span className="font-medium text-text-primary">{department}</span></p>
                <p><span className="text-text-secondary">Date & Slot:</span> <span className="font-mono text-primary font-bold">{date} ({timeSlot})</span></p>
                <p><span className="text-text-secondary">Status:</span> <span className="font-semibold text-status-success">{status}</span></p>
                {onCancel && (
                    <div className="pt-2 flex justify-end">
                        <Button variant="secondary" onClick={onCancel}>Cancel Appointment</Button>
                    </div>
                )}
            </div>
        </Card>
    );
};