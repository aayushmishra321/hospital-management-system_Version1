import React from 'react';
import { Card } from './Card';

interface BillItem {
    description: string;
    amount: number;
}

export const BillingTable: React.FC<{ items: BillItem[]; total: number }> = ({ items, total }) => {
    return (
        <Card title="Invoice Itemized Breakdown">
            <div className="space-y-3 font-body">
                <div className="divide-y divide-border">
                    {items.map((item, index) => (
                        <div key={index} className="py-2.5 flex justify-between text-sm">
                            <span className="text-text-primary">{item.description}</span>
                            <span className="font-mono font-medium text-text-primary">₹{item.amount}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center font-heading text-lg">
                    <span>Total Amount</span>
                    <span className="font-mono text-primary font-bold">₹{total}</span>
                </div>
            </div>
        </Card>
    );
};