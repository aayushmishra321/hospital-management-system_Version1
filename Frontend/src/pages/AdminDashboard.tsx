import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const mockStaff = [
    { id: 1, name: 'Dr. Rajesh Sharma', role: 'Doctor', department: 'Cardiology', status: 'Active', type: 'success' },
    { id: 2, name: 'Dr. Ananya Gupta', role: 'Doctor', department: 'Pediatrics', status: 'Active', type: 'success' },
    { id: 3, name: 'Suresh Patil', role: 'Receptionist', department: 'Front Desk', status: 'On Leave', type: 'warning' },
    { id: 4, name: 'Meena Deshmukh', role: 'Cashier', department: 'Billing', status: 'Active', type: 'success' },
];

export const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Admin Command Center</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Real-time hospital oversight, analytics, and staff account management.
                    </p>
                </div>
                <Button variant="primary">+ Add New Staff Member</Button>
            </div>

            {/* Overview Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card title="Today's Revenue">
                    <p className="text-3xl font-mono text-primary mt-2">₹1,45,200</p>
                    <p className="text-xs text-text-secondary mt-1">15% increase from yesterday</p>
                </Card>
                <Card title="Total Appointments">
                    <p className="text-3xl font-mono text-text-primary mt-2">148</p>
                    <p className="text-xs text-text-secondary mt-1">12 walk-ins currently waiting</p>
                </Card>
                <Card title="Bed Occupancy">
                    <p className="text-3xl font-mono text-accent mt-2">78%</p>
                    <p className="text-xs text-text-secondary mt-1">62 of 80 beds occupied</p>
                </Card>
                <Card title="No-Show Rate">
                    <p className="text-3xl font-mono text-status-warning mt-2">5.4%</p>
                    <p className="text-xs text-text-secondary mt-1">Optimized via SMS reminders</p>
                </Card>
            </div>

            {/* Staff Management Table */}
            <Card title="Hospital Staff Directory">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Name</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Role</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Department</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary">Status</th>
                                <th className="pb-3 pt-2 px-4 font-semibold text-text-primary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStaff.map((staff) => (
                                <tr key={staff.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                    <td className="py-4 px-4 font-medium text-text-primary">{staff.name}</td>
                                    <td className="py-4 px-4 text-text-secondary">{staff.role}</td>
                                    <td className="py-4 px-4 text-text-secondary">{staff.department}</td>
                                    <td className="py-4 px-4">
                                        {/* @ts-ignore */}
                                        <Badge status={staff.type} label={staff.status} />
                                    </td>
                                    <td className="py-4 px-4 text-right space-x-2">
                                        <Button variant="secondary">Edit</Button>
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