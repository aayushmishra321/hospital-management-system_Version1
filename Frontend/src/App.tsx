import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminDashboard } from './pages/AdminDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorConsultation } from './pages/DoctorConsultation';
import { AdminReports } from './pages/AdminReports';
import { BillingDashboard } from './pages/BillingDashboard';
import { DoctorSchedule } from './pages/DoctorSchedule';
import { QueueBoard } from './pages/QueueBoard';
import { PatientBooking } from './pages/PatientBooking';
import { PatientIntake } from './pages/PatientIntake';
import { NotificationPreferences } from './pages/NotificationPreferences';
import { DesignSystemPage } from './pages/DesignSystem';
import { DashboardLayout } from './components/layout/DashboardLayout';
import React from 'react';

// ── Guard: redirect to login if not authenticated ──
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('hms_token');
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

// ── Guard: redirect if role doesn't match ──
const RequireRole = ({
    children,
    allowedRoles,
}: {
    children: React.ReactNode;
    allowedRoles: string[];
}) => {
    const role = localStorage.getItem('hms_role') || '';
    if (!allowedRoles.includes(role)) {
        // Redirect to their own dashboard
        if (role === 'Admin') return <Navigate to="/admin" replace />;
        if (role === 'Doctor') return <Navigate to="/doctor/consultation" replace />;
        if (role === 'Patient') return <Navigate to="/patient" replace />;
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

// Layout wrapper
const WithLayout = ({ children }: { children: React.ReactNode }) => (
    <DashboardLayout>{children}</DashboardLayout>
);

export default function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin-only routes */}
            <Route path="/admin" element={
                <RequireAuth><RequireRole allowedRoles={['Admin']}>
                    <WithLayout><AdminDashboard /></WithLayout>
                </RequireRole></RequireAuth>
            } />
            <Route path="/admin/reports" element={
                <RequireAuth><RequireRole allowedRoles={['Admin']}>
                    <WithLayout><AdminReports /></WithLayout>
                </RequireRole></RequireAuth>
            } />

            {/* Doctor-only routes */}
            <Route path="/doctor/consultation" element={
                <RequireAuth><RequireRole allowedRoles={['Doctor']}>
                    <WithLayout><DoctorConsultation /></WithLayout>
                </RequireRole></RequireAuth>
            } />
            <Route path="/doctor/schedule" element={
                <RequireAuth><RequireRole allowedRoles={['Doctor']}>
                    <WithLayout><DoctorSchedule /></WithLayout>
                </RequireRole></RequireAuth>
            } />

            {/* Patient-only routes */}
            <Route path="/patient" element={
                <RequireAuth><RequireRole allowedRoles={['Patient']}>
                    <WithLayout><PatientDashboard /></WithLayout>
                </RequireRole></RequireAuth>
            } />
            <Route path="/patient/booking" element={
                <RequireAuth><RequireRole allowedRoles={['Patient']}>
                    <WithLayout><PatientBooking /></WithLayout>
                </RequireRole></RequireAuth>
            } />
            <Route path="/patient/intake" element={
                <RequireAuth><RequireRole allowedRoles={['Patient']}>
                    <WithLayout><PatientIntake /></WithLayout>
                </RequireRole></RequireAuth>
            } />

            {/* Admin + Receptionist routes */}
            <Route path="/billing" element={
                <RequireAuth><RequireRole allowedRoles={['Admin', 'Receptionist']}>
                    <WithLayout><BillingDashboard /></WithLayout>
                </RequireRole></RequireAuth>
            } />
            <Route path="/queue" element={
                <RequireAuth><RequireRole allowedRoles={['Admin', 'Receptionist', 'Doctor']}>
                    <WithLayout><QueueBoard /></WithLayout>
                </RequireRole></RequireAuth>
            } />

            {/* Authenticated users (any role) */}
            <Route path="/notifications" element={
                <RequireAuth>
                    <WithLayout><NotificationPreferences /></WithLayout>
                </RequireAuth>
            } />

            {/* Dev only */}
            <Route path="/design" element={<WithLayout><DesignSystemPage /></WithLayout>} />

            {/* Catch-all: redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}