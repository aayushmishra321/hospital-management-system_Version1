import React from 'react';

interface BannerProps {
    message: string;
    type?: 'info' | 'warning' | 'success';
}

export const NotificationBanner: React.FC<BannerProps> = ({ message, type = 'info' }) => {
    const styles = {
        info: 'bg-status-info/10 border-status-info text-status-info',
        warning: 'bg-status-warning/10 border-status-warning text-status-warning',
        success: 'bg-status-success/10 border-status-success text-status-success',
    };

    return (
        <div className={`p-4 border-l-4 rounded-r-lg font-body text-sm ${styles[type]}`}>
            {message}
        </div>
    );
};