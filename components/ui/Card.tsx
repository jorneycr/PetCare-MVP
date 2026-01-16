import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    style?: React.CSSProperties;
}

export const Card = ({ children, className = '', hoverEffect = false, style }: CardProps) => {
    return (
        <div
            className={`card ${hoverEffect ? 'card-hover' : ''} ${className}`}
            style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid #F3F4F6',
                transition: 'all 0.3s ease',
                ...style,
            }}
        >
            {children}
        </div>
    );
};
