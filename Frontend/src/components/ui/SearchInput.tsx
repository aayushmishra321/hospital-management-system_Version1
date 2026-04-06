import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = 'Search records...' }) => {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-11 px-4 bg-surface border border-border rounded-lg text-text-primary font-body focus:outline-none focus:border-primary text-sm shadow-sm"
            />
        </div>
    );
};