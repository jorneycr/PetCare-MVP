'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Language, Dictionary } from '@/utils/dictionaries';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        const storedLang = getCookie('language') as Language;
        if (storedLang && dictionary[storedLang]) {
            setLanguage(storedLang);
        } else {
            const lsLang = localStorage.getItem('language') as Language;
            if (lsLang && dictionary[lsLang]) {
                setLanguage(lsLang);
                setCookie('language', lsLang);
            }
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        setCookie('language', lang);
    };

    // Helper to set cookie
    function setCookie(name: string, value: string) {
        document.cookie = `${name}=${value}; path=/; max-age=${365 * 24 * 60 * 60}`;
    }

    // Helper to get cookie
    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = dictionary[language];

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`);
                return path;
            }
            current = current[key];
        }

        return current as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
