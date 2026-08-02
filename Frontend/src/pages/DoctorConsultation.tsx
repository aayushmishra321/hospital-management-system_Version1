import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { api } from '../api/axios';

export const DoctorConsultation = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppt, setSelectedAppt] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '' }]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get('/appointments');
                const active = (res.data.data || []).filter(
                    (a: any) => a.status === 'Scheduled' || a.status === 'In-Progress'
                );
                setAppointments(active);
                if (active.length > 0) setSelectedAppt(active[0]);
            } catch (err) {
                console.error('Failed to load appointments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const addMedication = () => {
        setMedications(prev => [...prev, { name: '', dosage: '', frequency: '' }]);
    };

    const updateMedication = (index: number, field: string, value: string) => {
        setMedications(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
    };

    const handleSubmitPrescription = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAppt) return;

        setSubmitting(true);
        setSuccessMsg('');
        try {
            await api.post('/prescriptions/create', {
                appointmentId: selectedAppt._id,
                patientId: selectedAppt.patient?._id,
                medications: medications.filter(m => m.name.trim()),
                diagnosis: `${symptoms} — ${diagnosis}`,
                notes,
            });

            // Mark appointment as completed
            await api.put('/appointments/status', {
                appointmentId: selectedAppt._id,
                status: 'Completed',
            });

            setSuccessMsg('Prescription created and appointment marked as completed!');
            setAppointments(prev => prev.filter(a => a._id !== selectedAppt._id));
            setSelectedAppt(appointments.find(a => a._id !== selectedAppt._id) || null);

            // Reset form
            setSymptoms(''); setDiagnosis(''); setNotes('');
            setMedications([{ name: '', dosage: '', frequency: '' }]);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to create prescription.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Consultation Room</h1>
                    <p className="text-text-secondary font-body mt-1">
                        {appointments.length > 0
                            ? `${appointments.length} patient(s) in queue`
                            : 'No active patients in queue'}
                    </p>
                </div>
                <Badge status="warning" label="Doctor View" />
            </div>

            {successMsg && (
                <div className="p-4 bg-status-success/10 border border-status-success/30 rounded-lg text-status-success font-medium text-sm">
                    ✅ {successMsg}
                </div>
            )}

            {appointments.length === 0 ? (
                <Card title="Queue Empty">
                    <p className="text-text-secondary py-8 text-center">All appointments have been completed for today. Check back later.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Queue List */}
                    <div className="space-y-3">
                        <h2 className="font-heading text-lg text-text-primary">Today's Queue</h2>
                        {appointments.map((appt, i) => (
                            <button
                                key={appt._id}
                                onClick={() => setSelectedAppt(appt)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${
                                    selectedAppt?._id === appt._id
                                        ? 'border-primary bg-primary/5 shadow-md'
                                        : 'border-border bg-surface hover:border-primary/50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-heading font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <p className="font-medium text-text-primary text-sm">{appt.patient?.name || 'Unknown'}</p>
                                        <p className="text-xs text-text-secondary">{appt.timeSlot} · {appt.department}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Consultation Form */}
                    <div className="lg:col-span-2">
                        {selectedAppt && (
                            <div className="space-y-5">
                                {/* Patient Card */}
                                <Card title="Patient Information">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Patient Name', value: selectedAppt.patient?.name || '—' },
                                            { label: 'Email', value: selectedAppt.patient?.email || '—' },
                                            { label: 'Phone', value: selectedAppt.patient?.phone || '—' },
                                            { label: 'Department', value: selectedAppt.department || '—' },
                                            { label: 'Date', value: new Date(selectedAppt.date).toLocaleDateString('en-IN') },
                                            { label: 'Time Slot', value: selectedAppt.timeSlot || '—' },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <p className="text-xs text-text-secondary uppercase tracking-wide">{label}</p>
                                                <p className="font-medium text-text-primary mt-0.5">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                {/* Prescription Form */}
                                <Card title="Clinical Notes & Prescription">
                                    <form onSubmit={handleSubmitPrescription} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Presenting Symptoms"
                                                placeholder="e.g. Severe headache, mild fever"
                                                value={symptoms}
                                                onChange={(e) => setSymptoms(e.target.value)}
                                                required
                                            />
                                            <Input
                                                label="Diagnosis"
                                                placeholder="e.g. Viral infection"
                                                value={diagnosis}
                                                onChange={(e) => setDiagnosis(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-primary mb-1">Additional Notes</label>
                                            <textarea
                                                className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary resize-none"
                                                rows={2}
                                                placeholder="Rest advice, follow-up instructions..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                            />
                                        </div>

                                        {/* Medications */}
                                        <div className="border-t border-border pt-5">
                                            <h3 className="font-heading text-base text-text-primary mb-3">Medications</h3>
                                            <div className="space-y-3">
                                                {medications.map((med, index) => (
                                                    <div key={index} className="grid grid-cols-3 gap-3">
                                                        <Input
                                                            label={index === 0 ? 'Medicine' : ''}
                                                            placeholder="Paracetamol 500mg"
                                                            value={med.name}
                                                            onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                                        />
                                                        <Input
                                                            label={index === 0 ? 'Dosage' : ''}
                                                            placeholder="500mg"
                                                            value={med.dosage}
                                                            onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                                        />
                                                        <Input
                                                            label={index === 0 ? 'Frequency' : ''}
                                                            placeholder="1-0-1"
                                                            value={med.frequency}
                                                            onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addMedication}
                                                className="mt-3 text-sm text-primary hover:underline font-medium"
                                            >
                                                + Add Another Medicine
                                            </button>
                                        </div>

                                        <div className="flex justify-end gap-3 border-t border-border pt-5">
                                            <Button variant="secondary" type="button" onClick={() => setSelectedAppt(null)}>
                                                Skip
                                            </Button>
                                            <Button variant="primary" type="submit" isLoading={submitting}>
                                                Complete & Generate E-Prescription
                                            </Button>
                                        </div>
                                    </form>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};