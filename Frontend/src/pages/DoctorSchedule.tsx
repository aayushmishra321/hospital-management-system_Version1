import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../api/axios';
import { Input } from '../components/ui/Input';

export const DoctorSchedule = () => {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const res = await api.get('/schedules');
            setSchedule(res.data.data);
        } catch (err) {
            console.error('Error fetching schedule', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/schedules/update', { schedules: schedule });
            setEditMode(false);
            alert('Schedule updated successfully!');
        } catch (err) {
            console.error('Error saving schedule', err);
            alert('Failed to save schedule');
        } finally {
            setSaving(false);
        }
    };

    const updateDay = (index: number, field: string, value: any) => {
        setSchedule(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-heading text-text-primary">Doctor Schedule Management</h1>
                    <p className="text-text-secondary font-body mt-1">
                        Configure weekly consulting hours and block time off.
                    </p>
                </div>
                {!editMode ? (
                    <Button variant="primary" onClick={() => setEditMode(true)}>Update Availability</Button>
                ) : (
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => { setEditMode(false); fetchSchedule(); }}>Cancel</Button>
                        <Button variant="primary" onClick={handleSave} isLoading={saving}>Save Changes</Button>
                    </div>
                )}
            </div>

            <Card title="Weekly Timings">
                <div className="space-y-4">
                    {schedule.map((sch, idx) => (
                        <div key={idx} className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-lg border transition-all ${sch.isAvailable ? 'bg-background border-border' : 'bg-surface border-dashed border-border'}`}>
                            <div className="flex-1">
                                <h4 className={`font-heading text-lg ${sch.isAvailable ? 'text-text-primary' : 'text-text-secondary'}`}>
                                    {sch.dayOfWeek}
                                </h4>
                                
                                {editMode ? (
                                    <div className="mt-3 flex items-center gap-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 text-primary rounded focus:ring-primary"
                                                checked={sch.isAvailable} 
                                                onChange={(e) => updateDay(idx, 'isAvailable', e.target.checked)}
                                            />
                                            <span className="text-sm font-medium text-text-secondary">Available</span>
                                        </label>
                                        
                                        {sch.isAvailable && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <input 
                                                    type="time" 
                                                    value={sch.startTime.replace(' AM', '').replace(' PM', '')} // Simplified for demo
                                                    onChange={(e) => updateDay(idx, 'startTime', e.target.value)}
                                                    className="px-2 py-1 bg-surface border border-border rounded text-sm font-mono focus:border-primary focus:outline-none" 
                                                />
                                                <span className="text-text-secondary">to</span>
                                                <input 
                                                    type="time" 
                                                    value={sch.endTime.replace(' AM', '').replace(' PM', '')} // Simplified for demo
                                                    onChange={(e) => updateDay(idx, 'endTime', e.target.value)}
                                                    className="px-2 py-1 bg-surface border border-border rounded text-sm font-mono focus:border-primary focus:outline-none" 
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="font-mono text-sm text-text-secondary mt-0.5">
                                        {sch.isAvailable ? `${sch.startTime} - ${sch.endTime}` : 'Off Duty'}
                                    </p>
                                )}
                            </div>
                            
                            {!editMode && (
                                <div className="mt-3 sm:mt-0">
                                    <Badge 
                                        status={sch.isAvailable ? 'success' : 'error'} 
                                        label={sch.isAvailable ? 'Active' : 'Unavailable'} 
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};