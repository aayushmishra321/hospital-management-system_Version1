import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive';
    children: React.ReactNode;
}

export interface BadgeProps {
    status: 'success' | 'warning' | 'error' | 'info';
    label: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
}

export interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}