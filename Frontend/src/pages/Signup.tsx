import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api/axios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Patient');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', { name, email, phone, password, role });
            const { token, role: userRole } = response.data;
            
            localStorage.setItem('hms_token', token);
            localStorage.setItem('hms_role', userRole);

            if (userRole === 'Admin') navigate('/admin');
            else if (userRole === 'Doctor') navigate('/doctor/consultation');
            else navigate('/patient');
        } catch (err: any) {
            console.error('Signup error:', err.response?.data);
            setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-surface p-8 rounded-2xl shadow-xl w-full max-w-md border border-border">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                        <span className="text-surface font-heading text-2xl font-bold">H</span>
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-text-primary">Create an Account</h2>
                    <p className="text-text-secondary mt-2">Join HMS Enterprise</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-status-error/10 border border-status-error/20 rounded-lg">
                        <p className="text-status-error text-sm text-center font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@hms.com"
                        required
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-text-primary">Account Type</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full h-10 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary"
                        >
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-6"
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-text-secondary border-t border-border pt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
};
