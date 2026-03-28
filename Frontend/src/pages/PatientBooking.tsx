import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const PatientBooking = () => {
    const [selectedDept, setSelectedDept] = useState('Cardiology');
    const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

    const timeSlots = ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM'];

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-heading text-text-primary">Book Appointment</h1>
                <p className="text-text-secondary font-body mt-1">
                    Select your preferred department, doctor, and consultation slot.
                </p>
            </div>

            <Card title="Appointment Details">
                <form className="space-y-6">
                    {/* Department Selection */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Department</label>
                        <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="w-full h-11 px-3 bg-surface border border-border rounded-lg text-text-primary font-body focus:outline-none focus:border-primary"
                        >
                            <option value="Cardiology">Cardiology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="General Medicine">General Medicine</option>
                            <option value="Orthopedics">Orthopedics</option>
                        </select>
                    </div>

                    {/* Doctor Info Card */}
                    <div className="p-4 bg-background border border-border rounded-lg space-y-1">
                        <p className="text-xs font-mono text-primary uppercase">Assigned Specialist</p>
                        <h3 className="font-heading text-lg text-text-primary">Dr. Rajesh Sharma, MBBS, MD</h3>
                        <p className="text-sm text-text-secondary font-body">Available: Mon, Wed, Fri (10:00 AM - 04:00 PM)</p>
                    </div>

                    {/* Date Picker */}
                    <Input label="Consultation Date" type="date" required />

                    {/* Time Slots Grid */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Available Time Slots</label>
                        <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`py-2.5 px-3 text-sm font-mono rounded-lg border transition-colors ${selectedSlot === slot
                                            ? 'bg-primary text-surface border-primary'
                                            : 'bg-surface text-text-primary border-border hover:border-primary'
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                        <Button variant="primary" type="submit" className="w-full md:w-auto">
                            Confirm & Book Slot
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};