import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const DoctorSchedule = () => {
    const schedule = [
        { day: 'Monday', time: '10:00 AM - 04:00 PM', status: 'Active', type: 'success' },
        { day: 'Tuesday', time: 'Off Duty', status: 'Unavailable', type: 'error' },
        { day: 'Wednesday', time: '10:00 AM - 04:00 PM', status: 'Active', type: 'success' },
        { day: 'Thursday', time: '12:00 PM - 06:00 PM', status: 'Active', type: 'success' },
        { day: 'Friday', time: '10:00 AM - 02:00 PM', status: 'Active', type: 'success' },
    ];

    return (
        <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Doctor Schedule Management</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Configure weekly consulting hours and block time off.
                    </p>
                </div>
                <Button variant="primary">Update Availability</Button>
            </div>

            <Card title="Weekly Timings">
                <div className="space-y-4">
                    {schedule.map((sch, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                            <div>
                                <h4 className="font-heading text-text-primary text-lg">{sch.day}</h4>
                                <p className="font-mono text-sm text-text-secondary">{sch.time}</p>
                            </div>
                            {/* @ts-ignore */}
                            <Badge status={sch.type} label={sch.status} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};