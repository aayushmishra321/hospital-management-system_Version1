import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col justify-between text-text-primary antialiased">
            <Navbar />
            <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};