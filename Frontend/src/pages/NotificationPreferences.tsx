import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const NotificationPreferences = () => {
    return (
        <div className="min-h-screen bg-background p-8 max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-heading text-text-primary">Notification Settings</h1>
                <p className="text-text-secondary font-body mt-1">
                    Manage how you receive appointment reminders and medical updates.
                </p>
            </div>

            <Card title="Communication Channels">
                <form className="space-y-6">
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-background border border-border rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-text-primary">SMS Reminders (Twilio)</p>
                                <p className="text-sm text-text-secondary font-body">Receive text alerts 24 hours and 2 hours before visits.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded border-border" />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-background border border-border rounded-lg cursor-pointer">
                            <div>
                                <p className="font-medium text-text-primary">Email Notifications (Nodemailer)</p>
                                <p className="text-sm text-text-secondary font-body">Receive PDF e-prescriptions and payment receipts via email.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded border-border" />
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                        <Button variant="primary">Save Preferences</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};