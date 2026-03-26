import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../api/axios';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Sending the request to our Express backend
            const response = await api.post('/auth/login', { email, password });

            // Save the JWT token to local storage
            localStorage.setItem('hms_token', response.data.token);

            alert(`Welcome back, ${response.data.name}! Role: ${response.data.role}`);
            // In a real app, we would redirect the user based on their role here

        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-heading text-text-primary">HMS</h1>
                    <p className="text-text-secondary font-body mt-2">Clinical Management Portal</p>
                </div>

                <Card title="Staff & Patient Login">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-status-error/10 border border-status-error text-status-error rounded text-sm font-body">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <Button variant="primary" type="submit" className="w-full">
                                {isLoading ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};