import React from 'react';

interface PatientHeaderProps {
    name: string;
    id: string;
    bloodGroup: string;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ name, id, bloodGroup }) => {
    return (
        <div className="p-6 bg-surface border border-border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-body">
            <div>
                <span className="font-mono text-xs text-primary font-semibold">PATIENT ID: #{id}</span>
                <h2 className="font-heading text-2xl text-text-primary mt-1">{name}</h2>
            </div>
            <div className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-mono text-text-secondary">
                Blood Group: <span className="font-bold text-status-error">{bloodGroup}</span>
            </div>
        </div>
    );
};