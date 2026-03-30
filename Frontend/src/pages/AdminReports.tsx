import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const AdminReports = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Hospital Reports & Analytics</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Export monthly financial statements, patient volume trends, and staff performance metrics.
                    </p>
                </div>
                <Button variant="primary">Export PDF Report</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Monthly Patient Inflow">
                    <div className="h-64 flex items-center justify-center bg-background border border-dashed border-border rounded-lg text-text-secondary font-body">
                        [Solid Fill Bar Chart: Jan - Mar Trends]
                    </div>
                </Card>
                <Card title="Department-wise Revenue Breakdown">
                    <div className="h-64 flex items-center justify-center bg-background border border-dashed border-border rounded-lg text-text-secondary font-body">
                        [Solid Fill Donut Chart: Cardiology, Pediatrics, General]
                    </div>
                </Card>
            </div>
        </div>
    );
};