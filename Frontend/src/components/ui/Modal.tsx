import React from 'react';
import { Button } from './Button';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm p-4">
            <div className="bg-surface rounded-lg shadow-xl max-w-lg w-full p-6 border border-border space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-3">
                    <h3 className="font-heading text-xl text-text-primary">{title}</h3>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};