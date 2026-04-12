import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { api } from '../api/axios';

export const PatientDashboard = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/appointments');
                if (response.data && response.data.data) {
                    setAppointments(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'info';
            case 'Cancelled': return 'error';
            default: return 'success';
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            {/* Patient Greeting Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Patient Portal</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Welcome back!
                    </p>
                </div>
                <Link to="/patient/booking">
                    <Button variant="primary">Book New Visit</Button>
                </Link>
            </div>

            {/* Upcoming & Past Appointments */}
            <Card title="My Appointments">
                {isLoading ? (
                    <div className="py-8 flex justify-center text-text-secondary">Loading appointments...</div>
                ) : appointments.length === 0 ? (
                    <div className="py-8 text-center text-text-secondary">You have no booked appointments.</div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((app) => (
                            <div key={app._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-background border border-border rounded-lg gap-4">
                                <div>
                                    <p className="font-mono text-xs text-text-secondary">
                                        {new Date(app.date).toLocaleDateString()} at {app.timeSlot || '10:00 AM'}
                                    </p>
                                    <h4 className="font-heading text-lg text-text-primary mt-1">
                                        {app.doctor?.name || 'Dr. Rajesh Sharma'}
                                    </h4>
                                    <p className="text-sm text-text-secondary font-body">
                                        {app.department || 'Cardiology'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                    <Badge status={getStatusColor(app.status)} label={app.status || 'Scheduled'} />
                                    <Button variant="secondary">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Medical History & Prescriptions */}
            <Card title="Medical History & E-Prescriptions">
                <div className="py-8 text-center text-text-secondary">
                    No medical history or prescriptions available yet.
                </div>
            </Card>
        </div>
    );
};