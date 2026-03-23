import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const mockBills = [
    { id: 'INV-2026-001', patient: 'Anjali Desai', amount: '₹1,200.00', status: 'Pending', type: 'warning' },
    { id: 'INV-2026-002', patient: 'Rahul Mehta', amount: '₹450.00', status: 'Paid', type: 'success' },
    { id: 'INV-2026-003', patient: 'Vikram Singh', amount: '₹2,100.00', status: 'Failed', type: 'error' },
];

export const BillingDashboard = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Billing & Payments</h1>
                    <p className="text-text-secondary font-body mt-2">
                        Process patient payments and generate invoices.
                    </p>
                </div>
                <Button variant="primary">+ Create Custom Invoice</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card title="Today's Revenue">
                    <p className="text-3xl font-mono text-primary mt-2">₹14,500.00</p>
                </Card>
                <Card title="Pending Payments">
                    <p className="text-3xl font-mono text-status-warning mt-2">12</p>
                </Card>
                <Card title="Completed Transactions">
                    <p className="text-3xl font-mono text-status-success mt-2">34</p>
                </Card>
            </div>

            <Card title="Recent Invoices">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Invoice ID</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Patient Name</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Amount</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Status</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBills.map((bill) => (
                                <tr key={bill.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                    <td className="py-4 px-4 font-mono font-medium text-text-primary">{bill.id}</td>
                                    <td className="py-4 px-4 text-text-primary">{bill.patient}</td>
                                    <td className="py-4 px-4 text-text-secondary">{bill.amount}</td>
                                    <td className="py-4 px-4">
                                        {/* @ts-ignore */}
                                        <Badge status={bill.type} label={bill.status} />
                                    </td>
                                    <td className="py-4 px-4">
                                        {/* This div forces the buttons to sit side-by-side aligned to the right */}
                                        <div className="flex justify-end items-center gap-2">
                                            <Button variant="secondary">Print</Button>
                                            {bill.status === 'Pending' && <Button variant="primary">Collect</Button>}
                                        </div>
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