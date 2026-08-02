import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api } from '../api/axios';

export const BillingDashboard = () => {
    const [bills, setBills] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [billsRes, statsRes] = await Promise.all([
                api.get('/billing'),
                api.get('/billing/stats'),
            ]);
            setBills(billsRes.data.data || []);
            setStats(statsRes.data.data);
        } catch (err) {
            console.error('Failed to load billing data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const markPaid = async (billId: string) => {
        try {
            await api.put(`/billing/${billId}/pay`);
            setBills(prev => prev.map(b => b._id === billId ? { ...b, status: 'Paid' } : b));
        } catch (err) {
            alert('Failed to mark bill as paid.');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Paid': return 'success';
            case 'Pending': return 'warning';
            case 'Overdue': return 'error';
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
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Billing & Payments</h1>
                    <p className="text-text-secondary font-body mt-1">Process patient payments and track invoices.</p>
                </div>
                <Button variant="primary" onClick={fetchData}>Refresh</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card title="Total Revenue">
                    <p className="text-3xl font-mono text-status-success mt-2">
                        ₹{stats?.totalRevenue?.toLocaleString('en-IN') || '0'}
                    </p>
                </Card>
                <Card title="Pending Payments">
                    <p className="text-3xl font-mono text-status-warning mt-2">{stats?.pendingCount ?? 0}</p>
                </Card>
                <Card title="Completed Transactions">
                    <p className="text-3xl font-mono text-status-success mt-2">{stats?.paidCount ?? 0}</p>
                </Card>
            </div>

            <Card title="All Invoices">
                {bills.length === 0 ? (
                    <p className="text-center text-text-secondary py-12">No invoices found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="border-b border-border">
                                <tr>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Invoice ID</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Patient</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Amount</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary">Status</th>
                                    <th className="pb-3 pt-2 px-4 font-semibold text-text-secondary text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((bill) => (
                                    <tr key={bill._id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                        <td className="py-4 px-4 font-mono font-medium text-text-primary text-xs">
                                            {bill._id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-text-primary font-medium">{bill.patient?.name || '—'}</p>
                                            <p className="text-xs text-text-secondary">{bill.patient?.email || ''}</p>
                                        </td>
                                        <td className="py-4 px-4 text-text-secondary font-mono">
                                            ₹{bill.amount?.toLocaleString('en-IN') || '0'}
                                        </td>
                                        <td className="py-4 px-4">
                                            <Badge status={getStatusBadge(bill.status)} label={bill.status} />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="secondary" className="text-xs py-1">Print</Button>
                                                {bill.status === 'Pending' && (
                                                    <Button variant="primary" className="text-xs py-1" onClick={() => markPaid(bill._id)}>
                                                        Collect
                                                    </Button>
                                                )}
                                            </div>
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