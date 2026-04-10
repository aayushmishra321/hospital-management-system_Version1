import React from 'react';
import { Card } from './Card';

interface ScheduleSlot {
    day: string;
    time: string;
    status: 'Available' | 'Booked' | 'Off';
}

export const ScheduleCalendar: React.FC<{ schedule: ScheduleSlot[] }> = ({ schedule }) => {
    return (
        <Card title="Doctor Availability Calendar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body">
                {schedule.map((slot, index) => (
                    <div key={index} className="p-3 bg-background border border-border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-text-primary">{slot.day}</p>
                            <p className="text-xs font-mono text-text-secondary">{slot.time}</p>
                        </div>
                        <span className={`text-xs font-mono px-2 py-1 rounded ${slot.status === 'Available' ? 'bg-status-success/10 text-status-success' : 'bg-status-error/10 text-status-error'
                            }`}>
                            {slot.status}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    );
};