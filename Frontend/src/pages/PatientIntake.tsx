import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const PatientIntake = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-heading text-text-primary">Patient Intake & Registration</h1>
                <p className="text-text-secondary font-body mt-2">
                    Create a new patient record and capture mandatory DPDP consent.
                </p>
            </div>

            <Card title="Personal Information">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" placeholder="e.g. Vikram Sharma" required />
                        <Input label="Date of Birth" type="date" required />
                        <Input label="Contact Number" placeholder="+91 98765 43210" required />
                        <Input label="Email Address" type="email" placeholder="vikram@example.com" />
                        <Input label="Blood Group" placeholder="e.g. O+" />
                        <Input label="Emergency Contact" placeholder="Name & Phone Number" />
                    </div>

                    <div className="border-t border-border pt-6 mt-6">
                        <h3 className="font-heading text-lg text-text-primary mb-4">DPDP Act Consent</h3>
                        <label className="flex items-start gap-3 p-4 bg-background border border-border rounded-lg cursor-pointer hover:border-accent transition-colors">
                            <input
                                type="checkbox"
                                className="mt-1 w-4 h-4 text-primary bg-surface border-border rounded focus:ring-accent"
                                required
                            />
                            <span className="text-sm font-body text-text-secondary">
                                I hereby consent to the collection, storage, and processing of my personal and medical data by HMS strictly for healthcare purposes, in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
                            </span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 border-t border-border pt-6">
                        <Button variant="secondary" type="button">Clear Form</Button>
                        <Button variant="primary" type="submit">Register Patient</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};