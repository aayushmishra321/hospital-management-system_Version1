import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const DoctorConsultation = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Consultation Room</h1>
                    <p className="text-text-secondary font-body mt-2">
                        Currently Consulting: Token #04
                    </p>
                </div>
                <Badge status="warning" label="In-Consultation" />
            </div>

            <Card title="Patient Profile">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <div>
                        <p className="text-sm text-text-secondary font-body">Name</p>
                        <p className="font-medium text-text-primary">Anjali Desai</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary font-body">Age / Gender</p>
                        <p className="font-medium text-text-primary">32 / F</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary font-body">Blood Group</p>
                        <p className="font-medium text-text-primary">O+</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-secondary font-body">Vitals</p>
                        <p className="font-medium text-text-primary">BP: 120/80 | Temp: 98.6°F</p>
                    </div>
                </div>
            </Card>

            <Card title="Clinical Notes & Prescription">
                <form className="space-y-6">
                    <div className="space-y-4">
                        <Input label="Symptoms" placeholder="e.g. Severe headache, mild fever for 2 days" />
                        <Input label="Diagnosis" placeholder="e.g. Viral infection" />
                    </div>

                    <div className="border-t border-border pt-6 mt-6">
                        <h3 className="font-heading text-lg text-text-primary mb-4">Medications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                            <div className="md:col-span-2">
                                <Input label="Medicine Name" placeholder="e.g. Paracetamol 500mg" />
                            </div>
                            <Input label="Frequency" placeholder="1-0-1 (Morning-Night)" />
                            <Input label="Duration" placeholder="5 Days" />
                        </div>
                        <div className="mt-4">
                            <Button variant="secondary" type="button">+ Add Another Medicine</Button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 border-t border-border pt-6 mt-6">
                        <Button variant="secondary" type="button">Hold Consultation</Button>
                        <Button variant="primary" type="submit">Complete & Generate E-Prescription</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};