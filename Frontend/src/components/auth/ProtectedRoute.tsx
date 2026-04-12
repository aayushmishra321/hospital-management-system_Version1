import React from 'react';

interface ProtectedRouteProps {
    allowedRoles: string[];
    userRole: string;
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, userRole, children }) => {
    if (!allowedRoles.includes(userRole)) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="p-6 bg-surface border border-border rounded-lg text-center space-y-2 font-body">
                    <h2 className="font-heading text-xl text-status-error">Access Denied</h2>
                    <p className="text-sm text-text-secondary">You do not have the required permissions to view this secure clinical module.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};