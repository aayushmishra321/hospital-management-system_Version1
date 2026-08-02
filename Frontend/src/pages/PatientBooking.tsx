import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/axios';

export const PatientBooking = () => {
    const navigate = useNavigate();
    const [selectedDept, setSelectedDept] = useState('Cardiology');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    const timeSlots = ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM'];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
                if (response.data.length > 0) {
                    setSelectedDoctorId(response.data[0]._id);
                }
            } catch (error) {
                console.error('Failed to fetch doctors', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedDoctorId) {
            alert("No doctors available to book.");
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');
        
        try {
            await api.post('/appointments/book', {
                doctorId: selectedDoctorId, 
                department: selectedDept,
                date,
                timeSlot: selectedSlot
            });
            
            setSuccessMessage('Appointment booked successfully!');
            setTimeout(() => {
                navigate('/patient');
            }, 2000);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book appointment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-heading text-text-primary">Book Appointment</h1>
                <p className="text-text-secondary font-body mt-1">
                    Select your preferred department, doctor, and consultation slot.
                </p>
            </div>

            <Card title="Appointment Details">
                {successMessage ? (
                    <div className="p-4 bg-status-success/10 border border-status-success/20 rounded-lg text-center py-12">
                        <div className="w-16 h-16 bg-status-success rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-heading text-text-primary mb-2">{successMessage}</h3>
                        <p className="text-text-secondary">Redirecting to your dashboard...</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleBooking}>
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
                                <option value="Neurology">Neurology</option>
                                <option value="Dermatology">Dermatology</option>
                            </select>
                        </div>

                        {/* Doctor Cards */}
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-3">Select Doctor</label>
                            {doctors.length === 0 ? (
                                <div className="p-6 border border-dashed border-border rounded-xl text-center text-text-secondary text-sm">
                                    No doctors are currently registered. Please check back later.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {doctors.map((doc) => {
                                        const initials = doc.name
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase();
                                        const isSelected = selectedDoctorId === doc._id;
                                        return (
                                            <button
                                                key={doc._id}
                                                type="button"
                                                onClick={() => setSelectedDoctorId(doc._id)}
                                                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                                                    isSelected
                                                        ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                                                        : 'border-border bg-surface hover:border-primary/40 hover:bg-background'
                                                }`}
                                            >
                                                {/* Avatar */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm ${
                                                    isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                                                }`}>
                                                    {initials}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`font-medium text-sm truncate ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-xs text-text-secondary mt-0.5">{selectedDept}</p>
                                                </div>
                                                {/* Selected check */}
                                                {isSelected && (
                                                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Date Picker */}
                        <Input 
                            label="Consultation Date" 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required 
                        />

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
                            <Button variant="primary" type="submit" className="w-full md:w-auto" isLoading={isLoading}>
                                Confirm & Book Slot
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
};