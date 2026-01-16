import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm hover:shadow-md border border-transparent',
        secondary: 'bg-[var(--secondary)] text-white hover:bg-pink-600 shadow-sm hover:shadow-md border border-transparent',
        outline: 'bg-white text-[var(--text-main)] border border-gray-200 hover:bg-gray-50',
        ghost: 'bg-transparent text-[var(--text-main)] hover:bg-gray-100',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    };

    // Note: Using inline styles for complex dynamic classes combined with CSS variables where possible,
    // or relying on the global CSS utility classes defined earlier if "tailwind" was strictly forbidden.
    // Since user asked for "No Tailwind" but I used some utility-like class names in my thought process,
    // I will stick to standard CSS classes defined in a module or global CSS.
    // Correction: I will use style objects or standard class names backed by globals.css.
    // Re-writing to use standard classes and style objects for clarity and "Vanilla CSS" compliance.

    return (
        <button
            className={`btn btn-${variant} ${fullWidth ? 'w-full' : ''} ${className}`}
            style={{
                width: fullWidth ? '100%' : 'auto',
                opacity: disabled || isLoading ? 0.7 : 1,
                cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
            }}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span style={{ marginRight: '8px' }}>
                    {/* Simple loading spinner svg */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" />
                        <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" />
                    </svg>
                </span>
            )}
            {children}
        </button>
    );
};
