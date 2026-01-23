'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/utils/dictionaries';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code: Language) => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative', zIndex: 100 }}>
            {/* Combobox Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-main)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s',
                    minWidth: '120px',
                    justifyContent: 'space-between'
                }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{currentLang.flag}</span>
                    <span>{currentLang.label}</span>
                </div>
                <span style={{
                    fontSize: '0.7rem',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem',
                    margin: 0,
                    listStyle: 'none',
                    minWidth: '150px',
                    animation: 'fadeIn 0.2s ease-out'
                }} role="listbox">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.6rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: language === lang.code ? 'var(--primary)' : 'var(--text-main)',
                                background: language === lang.code ? '#F3F4F6' : 'transparent',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (language !== lang.code) e.currentTarget.style.background = '#F9FAFB';
                            }}
                            onMouseLeave={(e) => {
                                if (language !== lang.code) e.currentTarget.style.background = 'transparent';
                            }}
                            role="option"
                            aria-selected={language === lang.code}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                            <span style={{ fontWeight: language === lang.code ? 600 : 400 }}>{lang.label}</span>
                        </li>
                    ))}
                </ul>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
