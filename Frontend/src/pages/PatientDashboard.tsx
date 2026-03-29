import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const mockAppointments = [
    { id: 1, date: '2026-03-29', doctor: 'Dr. Rajesh Sharma', department: 'Cardiology', status: 'Confirmed', type: 'success' },
    { id: 2, date: '2026-02-15', doctor: 'Dr. Ananya Gupta', department: 'Pediatrics', status: 'Completed', type: 'info' },
];

const mockPrescriptions = [
    { id: 'RX-8891', date: '2026-02-15', doctor: 'Dr. Ananya Gupta', diagnosis: 'Viral Upper Respiratory Infection' },
];

export const PatientDashboard = () => {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            {/* Patient Greeting Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Patient Portal</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Welcome back, Vikram Sharma (ID: #PAT-2026-0894)
                    </p>
                </div>
                <Button variant="primary">Book New Visit</Button>
            </div>

            {/* Upcoming & Past Appointments */}
            <Card title="My Appointments">
                <div className="space-y-4">
                    {mockAppointments.map((app) => (
                        <div key={app.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background border border-border rounded-lg gap-4">
                            <div>
                                <p className="font-mono text-xs text-text-secondary">{app.date}</p>
                                <h4 className="font-heading text-lg text-text-primary mt-1">{app.doctor}</h4>
                                <p className="text-sm text-text-secondary font-body">{app.department}</p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                {/* @ts-ignore */}
                                <Badge status={app.type} label={app.status} />
                                <Button variant="secondary">View Details</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Medical History & Prescriptions */}
            <Card title="Medical History & E-Prescriptions">
                <div className="space-y-4">
                    {mockPrescriptions.map((rx) => (
                        <div key={rx.id} className="p-4 bg-background border border-border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm text-primary font-medium">{rx.id}</span>
                                    <span className="text-xs text-text-secondary">• {rx.date}</span>
                                </div>
                                <h4 className="font-heading text-base text-text-primary mt-1">{rx.diagnosis}</h4>
                                <p className="text-sm text-text-secondary font-body">Prescribed by {rx.doctor}</p>
                            </div>
                            <Button variant="secondary">Download PDF</Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};