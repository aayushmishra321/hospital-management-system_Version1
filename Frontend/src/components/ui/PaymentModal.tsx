import React, { useState } from 'react';
import { Button } from './Button';


interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
    const [method, setMethod] = useState('Cash');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm p-4">
            <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6 border border-border space-y-4 font-body">
                <h3 className="font-heading text-xl text-text-primary">Counter Checkout</h3>
                <p className="text-sm text-text-secondary">Amount Due: <span className="font-mono font-bold text-primary">₹{amount}</span></p>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-text-primary">Payment Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full h-11 px-3 bg-surface border border-border rounded-lg text-text-primary"
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Stripe">Stripe Online</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={onSuccess}>Confirm Payment</Button>
                </div>
            </div>
        </div>
    );
};