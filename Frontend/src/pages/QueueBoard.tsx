import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api } from '../api/axios';

export const QueueBoard = () => {
    const [queue, setQueue] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueue = async () => {
        setLoading(true);
        try {
            const res = await api.get('/appointments/today');
            setQueue(res.data.data || []);
        } catch (err) {
            console.error('Failed to fetch queue:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchQueue(); }, []);

    const updateStatus = async (appointmentId: string, status: string) => {
        try {
            await api.put('/appointments/status', { appointmentId, status });
            setQueue(prev => prev.map(q => q._id === appointmentId ? { ...q, status } : q));
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'In-Progress': return 'warning';
            case 'Completed': return 'success';
            case 'Cancelled': return 'error';
            default: return 'info';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Live Patient Queue</h1>
                    <p className="text-text-secondary font-body mt-1">
                        {queue.length} appointment{queue.length !== 1 ? 's' : ''} scheduled today
                    </p>
                </div>
                <Button variant="primary" onClick={fetchQueue}>Refresh Queue</Button>
            </div>

            <Card title="Today's Appointments">
                {queue.length === 0 ? (
                    <p className="text-center text-text-secondary py-12">No appointments scheduled for today.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">#</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Patient Name</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Doctor</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Time</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Status</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queue.map((item, i) => (
                                    <tr key={item._id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                        <td className="py-4 px-4 font-mono font-bold text-primary">#{String(i + 1).padStart(2, '0')}</td>
                                        <td className="py-4 px-4">
                                            <p className="text-text-primary font-medium">{item.patient?.name || '—'}</p>
                                            <p className="text-xs text-text-secondary">{item.patient?.phone || ''}</p>
                                        </td>
                                        <td className="py-4 px-4 text-text-secondary">{item.doctor?.name || '—'}</td>
                                        <td className="py-4 px-4 font-mono text-text-secondary">{item.timeSlot || '—'}</td>
                                        <td className="py-4 px-4">
                                            <Badge status={getStatusBadge(item.status)} label={item.status} />
                                        </td>
                                        <td className="py-4 px-4 text-right space-x-2">
                                            {item.status === 'Scheduled' && (
                                                <Button variant="secondary" className="text-xs py-1" onClick={() => updateStatus(item._id, 'In-Progress')}>
                                                    Start
                                                </Button>
                                            )}
                                            {item.status === 'In-Progress' && (
                                                <Button variant="primary" className="text-xs py-1" onClick={() => updateStatus(item._id, 'Completed')}>
                                                    Mark Done
                                                </Button>
                                            )}
                                            {(item.status === 'Scheduled' || item.status === 'In-Progress') && (
                                                <Button variant="destructive" className="text-xs py-1" onClick={() => updateStatus(item._id, 'Cancelled')}>
                                                    Cancel
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};