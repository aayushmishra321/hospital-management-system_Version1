import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api } from '../api/axios';

export const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'patients' | 'hospitals'>('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const [statsRes, usersRes, appointmentsRes, hospitalsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users'),
                api.get('/admin/appointments'),
                api.get('/admin/hospitals?city=Mumbai&country=IN'),
            ]);
            setStats(statsRes.data.data);
            setUsers(usersRes.data.data || []);
            setAppointments(appointmentsRes.data.data || []);
            setHospitals(hospitalsRes.data.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load admin data.');
            console.error('Admin fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers(prev => prev.filter(u => u._id !== userId));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to delete user.');
        }
    };

    const handleUpdateStatus = async (appointmentId: string, status: string) => {
        try {
            await api.put('/appointments/status', { appointmentId, status });
            setAppointments(prev => prev.map(a => a._id === appointmentId ? { ...a, status } : a));
        } catch (err) {
            alert('Failed to update appointment status.');
        }
    };

    const doctors = users.filter(u => u.role === 'Doctor');
    const patients = users.filter(u => u.role === 'Patient');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Scheduled': return 'info';
            case 'In-Progress': return 'warning';
            case 'Cancelled': return 'error';
            default: return 'info';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-body">Loading admin data from database...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 pb-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-4xl font-heading text-text-primary tracking-tight">Admin Command Center</h1>
                    <p className="text-text-secondary font-body mt-2 max-w-2xl">
                        Real-time hospital oversight. Manage users, appointments, and monitor system health.
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    className="px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            {error && (
                <div className="p-4 bg-status-error/10 border border-status-error/30 rounded-lg text-status-error text-sm">
                    ⚠️ {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Total Doctors', value: stats?.totalDoctors ?? '—', color: 'text-primary' },
                    { label: 'Total Patients', value: stats?.totalPatients ?? '—', color: 'text-accent' },
                    { label: 'Total Appointments', value: stats?.totalAppointments ?? '—', color: 'text-primary' },
                    { label: 'Pending', value: stats?.pendingAppointments ?? '—', color: 'text-status-warning' },
                    { label: 'Total Revenue', value: stats?.totalRevenue ? `₹${stats.totalRevenue.toLocaleString('en-IN')}` : '₹0', color: 'text-status-success' },
                ].map((s) => (
                    <div key={s.label} className="bg-surface p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-1">
                        <span className="text-text-secondary text-xs font-medium uppercase tracking-wide">{s.label}</span>
                        <span className={`text-3xl font-heading font-bold ${s.color}`}>{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-background p-1 rounded-xl border border-border w-fit">
                {(['overview', 'doctors', 'patients', 'hospitals'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                            activeTab === tab
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-heading text-text-primary">All Appointments</h2>
                            <p className="text-sm text-text-secondary mt-0.5">{appointments.length} total appointments in the system</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-background border-b border-border">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Patient</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Doctor</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Department</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Date & Time</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Status</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-12 text-text-secondary">No appointments found in the system.</td></tr>
                                ) : appointments.map((appt) => (
                                    <tr key={appt._id} className="border-b border-border hover:bg-background/50 transition-colors">
                                        <td className="py-4 px-6 text-text-primary font-medium">{appt.patient?.name || '—'}</td>
                                        <td className="py-4 px-6 text-text-secondary">{appt.doctor?.name || '—'}</td>
                                        <td className="py-4 px-6 text-text-secondary">{appt.department}</td>
                                        <td className="py-4 px-6">
                                            <span className="text-text-primary">{new Date(appt.date).toLocaleDateString('en-IN')}</span>
                                            <span className="text-text-secondary ml-2 text-xs">{appt.timeSlot || ''}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <Badge status={getStatusBadge(appt.status)} label={appt.status} />
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            {appt.status === 'Scheduled' && (
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="primary" className="py-1 px-3 text-xs" onClick={() => handleUpdateStatus(appt._id, 'Completed')}>
                                                        Complete
                                                    </Button>
                                                    <Button variant="destructive" className="py-1 px-3 text-xs" onClick={() => handleUpdateStatus(appt._id, 'Cancelled')}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
                <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-xl font-heading text-text-primary">Registered Doctors ({doctors.length})</h2>
                        <p className="text-sm text-text-secondary mt-0.5">All doctors registered on the platform</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-background border-b border-border">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Name</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Email</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Phone</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Joined</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-12 text-text-secondary">No doctors registered yet.</td></tr>
                                ) : doctors.map((doc) => (
                                    <tr key={doc._id} className="border-b border-border hover:bg-background/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-text-primary">{doc.name}</td>
                                        <td className="py-4 px-6 text-text-secondary">{doc.email}</td>
                                        <td className="py-4 px-6 font-mono text-text-secondary">{doc.phone || '—'}</td>
                                        <td className="py-4 px-6 text-text-secondary">{new Date(doc.createdAt).toLocaleDateString('en-IN')}</td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="destructive" className="py-1 px-3 text-xs" onClick={() => handleDeleteUser(doc._id, doc.name)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Patients Tab */}
            {activeTab === 'patients' && (
                <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-xl font-heading text-text-primary">Registered Patients ({patients.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-background border-b border-border">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Name</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Email</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Phone</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Joined</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-12 text-text-secondary">No patients registered yet.</td></tr>
                                ) : patients.map((p) => (
                                    <tr key={p._id} className="border-b border-border hover:bg-background/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-text-primary">{p.name}</td>
                                        <td className="py-4 px-6 text-text-secondary">{p.email}</td>
                                        <td className="py-4 px-6 font-mono text-text-secondary">{p.phone || '—'}</td>
                                        <td className="py-4 px-6 text-text-secondary">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="destructive" className="py-1 px-3 text-xs" onClick={() => handleDeleteUser(p._id, p.name)}>
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Hospitals Tab */}
            {activeTab === 'hospitals' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-heading text-text-primary">Nearby Hospitals</h2>
                        <span className="text-xs text-text-secondary font-mono">via API Ninjas</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {hospitals.length === 0 ? (
                            <p className="text-text-secondary col-span-3 text-center py-8">No hospital data available. Configure API_NINJAS_KEY in backend .env</p>
                        ) : hospitals.map((h: any, i: number) => (
                            <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-heading text-text-primary font-semibold truncate">{h.name}</h3>
                                        <p className="text-sm text-text-secondary mt-1">{h.address || h.city || '—'}</p>
                                        {h.phone && <p className="text-xs font-mono text-text-secondary mt-1">{h.phone}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};