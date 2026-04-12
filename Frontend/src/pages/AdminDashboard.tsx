import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Mocking the data based on the Django API structure provided
const mockDoctorApprovals = [
    { id: "d6e19da5", username: "doctor3", name: "Dr. Three", status: false, department: "CL", mobile: "12312343424" },
    { id: "2ad1ebd7", username: "doctor4", name: "Dr. Four", status: false, department: "Cardiology", mobile: "12312343424" },
];

const mockPatientApprovals = [
    { id: "5b6926d3", username: "patient10", name: "Patient New", status: false, age: "45", mobile: "342423423" }
];

const mockAppointments = [
    { id: 13, date: "2021-07-06", time: "05:51:59", status: true, patient_id: 9, doctor_id: 9 },
    { id: 15, date: "2021-07-24", time: "06:00:00", status: false, patient_id: 9, doctor_id: 8 }
];

export const AdminDashboard = () => {
    // In a real application, these would be fetched from the Django endpoints:
    // GET api/admin/approve/doctors/
    // GET api/admin/approve/patients/
    // GET api/admin/appointments/
    
    return (
        <div className="w-full space-y-8 pb-12 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-4xl font-heading text-text-primary tracking-tight">Admin Command Center</h1>
                    <p className="text-text-secondary font-body mt-2 max-w-2xl">
                        Comprehensive hospital oversight system. Manage system users, approve incoming registration requests for doctors and patients, and monitor global appointment scheduling across all departments.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">Register Patient</Button>
                    <Button variant="primary">Register Doctor</Button>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
                
                {/* 1. Global Metrics (Spans full width top) */}
                <div className="col-span-1 md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                        <span className="text-text-secondary text-sm font-medium">Pending Doctors</span>
                        <span className="text-4xl font-heading text-status-warning mt-2">2</span>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                        <span className="text-text-secondary text-sm font-medium">Pending Patients</span>
                        <span className="text-4xl font-heading text-status-warning mt-2">1</span>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                        <span className="text-text-secondary text-sm font-medium">Active Appointments</span>
                        <span className="text-4xl font-heading text-primary mt-2">148</span>
                    </div>
                    <div className="bg-primary p-6 rounded-2xl shadow-sm flex flex-col justify-between text-surface">
                        <span className="text-surface/80 text-sm font-medium">System Status</span>
                        <span className="text-2xl font-heading mt-2 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-status-success animate-pulse"></span>
                            Operational
                        </span>
                    </div>
                </div>

                {/* 2. Doctor Approvals (Spans 8 columns) */}
                <div className="col-span-1 md:col-span-8 bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-[400px]">
                    <div className="p-6 border-b border-border bg-background/50">
                        <h2 className="text-xl font-heading text-text-primary">Doctor Approval Queue</h2>
                        <p className="text-sm text-text-secondary">Requires manual verification of credentials before platform access is granted.</p>
                    </div>
                    <div className="p-0 overflow-y-auto flex-1">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-background sticky top-0">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Username / Name</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Department</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Mobile</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockDoctorApprovals.map((doc) => (
                                    <tr key={doc.id} className="border-b border-border hover:bg-background/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-text-primary">{doc.name}</div>
                                            <div className="text-text-secondary text-xs">@{doc.username}</div>
                                        </td>
                                        <td className="py-4 px-6"><Badge status="info" label={doc.department} /></td>
                                        <td className="py-4 px-6 font-mono text-text-secondary">{doc.mobile}</td>
                                        <td className="py-4 px-6 text-right">
                                            <Button variant="primary" className="py-1 px-3 text-xs">Approve</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Patient Approvals (Spans 4 columns) */}
                <div className="col-span-1 md:col-span-4 bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-[400px]">
                    <div className="p-6 border-b border-border bg-background/50">
                        <h2 className="text-xl font-heading text-text-primary">Patient Approvals</h2>
                        <p className="text-sm text-text-secondary">Verify patient details.</p>
                    </div>
                    <div className="p-6 space-y-4 overflow-y-auto flex-1">
                        {mockPatientApprovals.map((patient) => (
                            <div key={patient.id} className="p-4 rounded-xl border border-border bg-background space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-text-primary">{patient.name}</div>
                                        <div className="text-text-secondary text-xs">@{patient.username}</div>
                                    </div>
                                    <Badge status="warning" label="Pending" />
                                </div>
                                <div className="text-xs text-text-secondary flex justify-between">
                                    <span>Age: {patient.age}</span>
                                    <span className="font-mono">{patient.mobile}</span>
                                </div>
                                <Button variant="secondary" className="w-full py-2 text-sm mt-2">Review & Approve</Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Global Appointment Overview (Full width) */}
                <div className="col-span-1 md:col-span-12 bg-surface rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-border bg-background/50 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-heading text-text-primary">Global Appointments</h2>
                            <p className="text-sm text-text-secondary">Monitor all upcoming appointments and their approval statuses.</p>
                        </div>
                        <Button variant="secondary" className="text-sm py-1.5 px-4">View All API Data</Button>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="bg-background">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">ID</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Date & Time</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Patient Ref</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Doctor Ref</th>
                                    <th className="py-3 px-6 font-semibold text-text-secondary">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockAppointments.map((appt) => (
                                    <tr key={appt.id} className="border-b border-border hover:bg-background/50 transition-colors">
                                        <td className="py-4 px-6 font-mono text-text-secondary">#{appt.id}</td>
                                        <td className="py-4 px-6">
                                            <span className="text-text-primary">{appt.date}</span>
                                            <span className="text-text-secondary ml-2">{appt.time}</span>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-text-secondary">P-{appt.patient_id}</td>
                                        <td className="py-4 px-6 font-mono text-text-secondary">D-{appt.doctor_id}</td>
                                        <td className="py-4 px-6">
                                            <Badge 
                                                status={appt.status ? "success" : "warning"} 
                                                label={appt.status ? "Approved" : "Pending"} 
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};