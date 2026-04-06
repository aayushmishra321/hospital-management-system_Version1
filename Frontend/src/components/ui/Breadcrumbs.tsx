import React from 'react';

interface BreadcrumbsProps {
    items: string[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 font-body text-sm text-text-secondary mb-4">
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    {index > 0 && <span>/</span>}
                    <span className={index === items.length - 1 ? 'text-primary font-medium' : ''}>
                        {item}
                    </span>
                </React.Fragment>
            ))}
        </nav>
    );
};