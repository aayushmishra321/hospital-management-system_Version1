import { Routes, Route } from 'react-router-dom';
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

// Wrapper for dashboard layout
const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/design" element={<WithLayout><DesignSystemPage /></WithLayout>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<WithLayout><AdminDashboard /></WithLayout>} />
      <Route path="/admin/reports" element={<WithLayout><AdminReports /></WithLayout>} />
      
      {/* Doctor Routes */}
      <Route path="/doctor/consultation" element={<WithLayout><DoctorConsultation /></WithLayout>} />
      <Route path="/doctor/schedule" element={<WithLayout><DoctorSchedule /></WithLayout>} />
      
      {/* Patient Routes */}
      <Route path="/patient" element={<WithLayout><PatientDashboard /></WithLayout>} />
      <Route path="/patient/booking" element={<WithLayout><PatientBooking /></WithLayout>} />
      <Route path="/patient/intake" element={<WithLayout><PatientIntake /></WithLayout>} />
      
      {/* Staff Routes */}
      <Route path="/billing" element={<WithLayout><BillingDashboard /></WithLayout>} />
      <Route path="/queue" element={<WithLayout><QueueBoard /></WithLayout>} />
      
      {/* General Settings */}
      <Route path="/notifications" element={<WithLayout><NotificationPreferences /></WithLayout>} />
    </Routes>
  );
}