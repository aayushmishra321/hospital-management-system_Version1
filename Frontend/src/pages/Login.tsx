import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../api/axios';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('hms_token', response.data.token);
            const role = response.data.role;
            localStorage.setItem('hms_role', role);
            localStorage.setItem('hms_name', response.data.name || '');


            if (role === 'Admin') navigate('/admin');
            else if (role === 'Doctor') navigate('/doctor/consultation');
            else if (role === 'Receptionist') navigate('/queue');
            else navigate('/patient');
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left Side: Enterprise Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-heading text-text-primary mb-2">HMS Portal</h1>
                        <p className="text-text-secondary font-body">
                            Secure clinical access for hospital staff and patients.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Advanced Error State (Left-bordered warning box) */}
                        {error && (
                            <div className="p-4 bg-status-error/10 border-l-4 border-status-error text-status-error text-sm font-body font-medium">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@hospital.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password Field with Custom Toggle */}
                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your secure password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-sm text-text-secondary hover:text-primary font-medium transition-colors"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm font-body mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-accent" />
                                <span className="text-text-secondary">Remember me</span>
                            </label>
                            <button type="button" className="text-primary hover:text-primary-dark font-medium transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        <Button variant="primary" type="submit" className="w-full py-3 text-lg mt-4">
                            {isLoading ? 'Authenticating...' : 'Secure Sign In'}
                        </Button>
                        
                        <div className="mt-6 text-center text-sm text-text-secondary border-t border-border pt-6">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline font-medium">
                                Create one here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side: Professional Branding / PRD Compliant Solid Shapes */}
            <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-16 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-heading text-surface mb-4 leading-tight">
                        Modernizing <br /> Healthcare Operations
                    </h2>
                    <p className="text-surface/80 font-body text-lg max-w-md mt-6">
                        A highly secure, DPDP-compliant management system designed to reduce patient wait times and unify medical records.
                    </p>
                </div>

                {/* System Status Indicators */}
                <div className="relative z-10 flex items-center gap-4 text-surface/90 font-mono text-sm mt-auto">
                    <div className="px-3 py-1 bg-primary-dark rounded">v1.0.0-production</div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-status-success rounded-full animate-pulse"></div>
                        System Operational
                    </div>
                </div>

                {/* Strict Solid Geometric Shapes (No Gradients, exact PRD compliance) */}
                <div className="absolute bottom-0 right-0 w-[80%] h-[70%] bg-primary-dark rounded-tl-full opacity-40 transform translate-x-1/4 translate-y-1/4"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent opacity-20 rounded-bl-full"></div>
            </div>
        </div>
    );
};