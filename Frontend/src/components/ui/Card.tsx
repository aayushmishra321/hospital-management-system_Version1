import React from 'react';
import type { CardProps } from '../../types/design-system';

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-surface border border-border rounded-[8px] p-6 shadow-[0_1px_2px_rgba(18,32,28,0.06)] ${className}`}>
      {title && <h3 className="font-heading text-lg font-medium text-text-primary mb-4">{title}</h3>}
      {children}
    </div>
  );
};
