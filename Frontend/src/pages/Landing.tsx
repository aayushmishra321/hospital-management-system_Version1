import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FlickeringFooter } from '../components/ui/flickering-footer';

export const Landing = () => {
    return (
        <div className="min-h-screen bg-surface flex flex-col font-body">
            {/* Header / Navbar */}
            <header className="px-8 py-6 border-b border-border flex justify-between items-center bg-surface sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                        <span className="text-surface font-heading font-bold">H</span>
                    </div>
                    <span className="font-heading text-xl font-bold text-text-primary tracking-tight">HMS Enterprise</span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <Button variant="secondary">Sign In</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="primary">Get Started</Button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col">
                <section className="relative px-8 py-24 md:py-32 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 animate-slide-up opacity-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success/10 text-status-success font-mono text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                            System fully operational
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading text-text-primary leading-[1.1] tracking-tight">
                            Modernizing <br />
                            <span className="text-primary">Healthcare</span> <br />
                            Operations.
                        </h1>
                        <p className="text-xl text-text-secondary max-w-xl leading-relaxed">
                            A highly secure, DPDP-compliant management system designed to reduce patient wait times, unify medical records, and empower medical staff.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/login">
                                <Button variant="primary" className="text-lg px-8 py-4">Access Portal</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full aspect-square max-w-md lg:max-w-none animate-slide-in-right opacity-0">
                        {/* Abstract visual representation instead of image placeholder */}
                        <div className="absolute inset-0 bg-background border border-border rounded-2xl overflow-hidden shadow-2xl transform rotate-3 transition-transform hover:rotate-0 duration-500">
                            <div className="absolute top-0 left-0 w-full h-12 border-b border-border bg-surface flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-status-error/80" />
                                <div className="w-3 h-3 rounded-full bg-status-warning/80" />
                                <div className="w-3 h-3 rounded-full bg-status-success/80" />
                            </div>
                            <div className="p-8 mt-12 space-y-6">
                                <div className="h-8 w-1/3 bg-border rounded" />
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-border/50 rounded" />
                                    <div className="h-4 w-5/6 bg-border/50 rounded" />
                                    <div className="h-4 w-4/6 bg-border/50 rounded" />
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="h-24 bg-primary/10 rounded-lg border border-primary/20" />
                                    <div className="h-24 bg-accent/10 rounded-lg border border-accent/20" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute -bottom-8 -left-8 bg-surface border border-border p-6 rounded-xl shadow-xl animate-slide-up opacity-0 stagger-3">
                            <p className="font-mono text-sm text-text-secondary mb-1">Total Patients</p>
                            <p className="font-heading text-4xl text-primary">12,450+</p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-background border-t border-border py-24">
                    <div className="max-w-7xl mx-auto px-8 w-full">
                        <div className="text-center mb-16 animate-fade-in opacity-0 stagger-2">
                            <h2 className="text-4xl font-heading text-text-primary mb-4">Unified Healthcare Ecosystem</h2>
                            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                Everything your hospital needs to operate efficiently, from patient intake to billing and reporting.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Patient Records", desc: "Securely store and manage patient history, vitals, and prescriptions with DPDP compliance." },
                                { title: "Smart Scheduling", desc: "Reduce wait times with optimized appointment booking and live queue management." },
                                { title: "Integrated Billing", desc: "Seamless invoicing, payment processing, and financial reporting across all departments." }
                            ].map((feature, i) => (
                                <div key={i} className={`bg-surface border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-slide-up opacity-0 stagger-${i+2}`}>
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg border border-primary/20 mb-6" />
                                    <h3 className="text-xl font-heading text-text-primary mb-3">{feature.title}</h3>
                                    <p className="text-text-secondary">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <FlickeringFooter />
        </div>
    );
};
