import React from 'react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
    const bgClass = type === 'success' ? 'bg-status-success text-surface' : 'bg-status-error text-surface';

    return (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg font-body text-sm z-50 ${bgClass}`}>
            {message}
        </div>
    );
};