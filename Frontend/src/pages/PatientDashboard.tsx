import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { api } from '../api/axios';

export const PatientDashboard = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [bills, setBills] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const userName = localStorage.getItem('hms_name') || 'Patient';

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [apptRes, rxRes, billRes] = await Promise.all([
                    api.get('/appointments'),
                    api.get('/prescriptions'),
                    api.get('/billing'),
                ]);
                setAppointments(apptRes.data.data || []);
                setPrescriptions(rxRes.data.data || []);
                setBills(billRes.data.data || []);
            } catch (error) {
                console.error('Failed to fetch patient data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, []);

    const handleCancel = async (appointmentId: string) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            await api.delete(`/appointments/${appointmentId}`);
            setAppointments(prev => prev.filter(a => a._id !== appointmentId));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to cancel appointment.');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Cancelled': return 'error';
            case 'In-Progress': return 'warning';
            default: return 'info';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-body">Loading your health data...</p>
                </div>
            </div>
        );
    }

    const upcoming = appointments.filter(a => a.status === 'Scheduled' || a.status === 'In-Progress');
    const past = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');
    const pendingBills = bills.filter(b => b.status === 'Pending');

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Patient Portal</h1>
                    <p className="text-text-secondary font-body mt-1">Welcome back, {userName}!</p>
                </div>
                <Link to="/patient/booking">
                    <Button variant="primary">+ Book Appointment</Button>
                </Link>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Upcoming', value: upcoming.length, color: 'text-primary' },
                    { label: 'Completed', value: past.filter(a => a.status === 'Completed').length, color: 'text-status-success' },
                    { label: 'Prescriptions', value: prescriptions.length, color: 'text-accent' },
                    { label: 'Pending Bills', value: pendingBills.length, color: 'text-status-warning' },
                ].map(s => (
                    <div key={s.label} className="bg-surface border border-border rounded-xl p-4">
                        <p className="text-xs text-text-secondary uppercase tracking-wide">{s.label}</p>
                        <p className={`text-3xl font-heading font-bold mt-1 ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Upcoming Appointments */}
            <Card title="Upcoming Appointments">
                {upcoming.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-text-secondary mb-4">No upcoming appointments.</p>
                        <Link to="/patient/booking">
                            <Button variant="primary">Book Your First Visit</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {upcoming.map((app) => (
                            <div key={app._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background border border-border rounded-lg gap-4">
                                <div>
                                    <p className="font-mono text-xs text-text-secondary">
                                        {new Date(app.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                                        {app.timeSlot && ` at ${app.timeSlot}`}
                                    </p>
                                    <h4 className="font-heading text-base text-text-primary mt-1">
                                        {app.doctor?.name || 'Doctor'}
                                    </h4>
                                    <p className="text-sm text-text-secondary">{app.department}</p>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                    <Badge status={getStatusColor(app.status)} label={app.status} />
                                    {app.status === 'Scheduled' && (
                                        <Button
                                            variant="destructive"
                                            className="text-xs py-1 px-3"
                                            onClick={() => handleCancel(app._id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Prescriptions */}
            <Card title="My Prescriptions">
                {prescriptions.length === 0 ? (
                    <p className="py-8 text-center text-text-secondary">No prescriptions yet. They appear here after a consultation.</p>
                ) : (
                    <div className="space-y-3">
                        {prescriptions.map((rx) => (
                            <div key={rx._id} className="p-4 bg-background border border-border rounded-lg">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-xs text-primary font-medium">
                                                RX-{rx._id.slice(-6).toUpperCase()}
                                            </span>
                                            <span className="text-xs text-text-secondary">
                                                · {new Date(rx.createdAt).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                        <h4 className="font-heading text-sm text-text-primary">{rx.diagnosis}</h4>
                                        <p className="text-xs text-text-secondary mt-0.5">
                                            Prescribed by Dr. {rx.doctor?.name || '—'}
                                        </p>
                                        {rx.medications?.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {rx.medications.map((med: any, i: number) => (
                                                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        {med.name} {med.dosage && `(${med.dosage})`}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Badge status="success" label="Active" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Bills */}
            {bills.length > 0 && (
                <Card title="My Bills">
                    <div className="space-y-3">
                        {bills.map((bill) => (
                            <div key={bill._id} className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                                <div>
                                    <p className="font-mono text-xs text-text-secondary">INV-{bill._id.slice(-6).toUpperCase()}</p>
                                    <p className="font-heading text-base text-text-primary mt-0.5">
                                        ₹{bill.amount?.toLocaleString('en-IN') || '0'}
                                    </p>
                                    <p className="text-xs text-text-secondary">{new Date(bill.createdAt).toLocaleDateString('en-IN')}</p>
                                </div>
                                <Badge
                                    status={bill.status === 'Paid' ? 'success' : bill.status === 'Overdue' ? 'error' : 'warning'}
                                    label={bill.status}
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Past Appointments */}
            {past.length > 0 && (
                <Card title="Past Appointments">
                    <div className="space-y-3">
                        {past.map((app) => (
                            <div key={app._id} className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
                                <div>
                                    <p className="font-mono text-xs text-text-secondary">
                                        {new Date(app.date).toLocaleDateString('en-IN')} {app.timeSlot && `at ${app.timeSlot}`}
                                    </p>
                                    <h4 className="font-heading text-sm text-text-primary">{app.doctor?.name || '—'}</h4>
                                    <p className="text-xs text-text-secondary">{app.department}</p>
                                </div>
                                <Badge status={getStatusColor(app.status)} label={app.status} />
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};