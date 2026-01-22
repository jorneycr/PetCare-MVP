'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/utils/dictionaries';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
    ];

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    style={{
                        background: language === lang.code ? 'var(--primary)' : 'transparent',
                        color: language === lang.code ? 'white' : 'var(--text-secondary)',
                        border: language === lang.code ? 'none' : '1px solid #E5E7EB',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transition: 'all 0.2s'
                    }}
                    title={lang.label}
                >
                    <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                    <span className="hidden-mobile">{lang.code.toUpperCase()}</span>
                </button>
            ))}
        </div>
    );
}
