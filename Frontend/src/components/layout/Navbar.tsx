import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('hms_token');
        navigate('/');
    };

    const role = localStorage.getItem('hms_role');

    return (
        <header className="bg-primary text-surface px-8 py-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3">
                    <span className="font-heading text-2xl font-bold tracking-tight">HMS</span>
                    <span className="px-2 py-0.5 bg-primary-dark text-xs font-mono rounded">v1.0 Enterprise</span>
                </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 font-body text-sm">
                {role === 'Admin' && (
                    <>
                        <Link to="/admin" className="hover:text-accent transition-colors">Admin Dashboard</Link>
                        <Link to="/admin/reports" className="hover:text-accent transition-colors">Reports</Link>
                    </>
                )}
                {role === 'Doctor' && (
                    <>
                        <Link to="/doctor/consultation" className="hover:text-accent transition-colors">Consultations</Link>
                        <Link to="/doctor/schedule" className="hover:text-accent transition-colors">Schedule</Link>
                    </>
                )}
                {role === 'Patient' && (
                    <>
                        <Link to="/patient" className="hover:text-accent transition-colors">My Dashboard</Link>
                        <Link to="/patient/booking" className="hover:text-accent transition-colors">Book Appointment</Link>
                    </>
                )}
                {(role === 'Receptionist' || role === 'Admin') && (
                    <>
                        <Link to="/queue" className="hover:text-accent transition-colors">Queue</Link>
                        <Link to="/billing" className="hover:text-accent transition-colors">Billing</Link>
                    </>
                )}
                <Link to="/notifications" className="hover:text-accent transition-colors">Settings</Link>
            </nav>
            <div>
                <button 
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-surface text-primary font-medium rounded-lg text-sm hover:bg-background transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
};