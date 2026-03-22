import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Dummy data to simulate the live queue
const mockQueue = [
    { id: 1, token: '04', patient: 'Anjali Desai', doctor: 'Dr. Sharma', status: 'In-Consultation', type: 'warning' },
    { id: 2, token: '05', patient: 'Vikram Singh', doctor: 'Dr. Sharma', status: 'Waiting', type: 'info' },
    { id: 3, token: '06', patient: 'Priya Patel', doctor: 'Dr. Gupta', status: 'Scheduled', type: 'success' },
    { id: 4, token: '07', patient: 'Rohan Mehta', doctor: 'Dr. Sharma', status: 'Cancelled', type: 'error' },
];

export const QueueBoard = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Live Patient Queue</h1>
                    <p className="text-text-secondary font-body mt-2">
                        Monitor and manage today's walk-in and online appointments.
                    </p>
                </div>
                <Button variant="primary">Refresh Queue</Button>
            </div>

            <Card title="Today's Appointments">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Token</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Patient Name</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Doctor</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Status</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockQueue.map((item) => (
                                <tr key={item.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                    <td className="py-4 px-4 font-mono font-medium text-text-primary">#{item.token}</td>
                                    <td className="py-4 px-4 text-text-primary">{item.patient}</td>
                                    <td className="py-4 px-4 text-text-secondary">{item.doctor}</td>
                                    <td className="py-4 px-4">
                                        {/* @ts-ignore - mapping the mock type to our badge status string */}
                                        <Badge status={item.type} label={item.status} />
                                    </td>
                                    <td className="py-4 px-4 text-right space-x-2">
                                        <Button variant="secondary">Mark Done</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};