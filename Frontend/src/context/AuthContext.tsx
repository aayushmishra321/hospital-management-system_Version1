import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    token: string | null;
    role: string;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('hms_token'));
    const [role, setRole] = useState<string>(localStorage.getItem('hms_role') || 'Patient');

    const login = (newToken: string, newRole: string) => {
        localStorage.setItem('hms_token', newToken);
        localStorage.setItem('hms_role', newRole);
        setToken(newToken);
        setRole(newRole);
    };

    const logout = () => {
        localStorage.removeItem('hms_token');
        localStorage.removeItem('hms_role');
        setToken(null);
        setRole('Patient');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};