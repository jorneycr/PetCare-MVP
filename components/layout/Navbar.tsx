'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

import { useSession, signOut } from 'next-auth/react';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
    const { data: session, status } = useSession();
    const { t, language, setLanguage } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            borderBottom: isScrolled ? '1px solid #F3F4F6' : '1px solid transparent',
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{
                height: 'var(--header-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo */}
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '1.75rem' }}>🐾</span>
                    <span>PetCare</span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
                    <Link href="/search" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{t('navbar.search')}</Link>
                    <Link href="/services" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{t('navbar.home')}</Link>
                    <Link href="/become-sitter" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{t('navbar.becomeSitter')}</Link>
                </nav>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            background: 'none',
                            border: '1px solid #E5E7EB',
                            borderRadius: '20px',
                            padding: '0.25rem 0.75rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}
                    >
                        {language === 'es' ? '🇺🇸 EN' : '🇨🇷 ES'}
                    </button>

                    {status === 'authenticated' ? (
                        <>
                            <Link href="/profile" style={{ fontWeight: 600, color: 'var(--text-main)' }}>{t('navbar.welcome')}, {session.user?.name?.split(' ')[0]}</Link>
                            <Button variant="outline" size="sm" onClick={() => signOut()}>{t('navbar.logout')}</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ fontWeight: 600, color: 'var(--primary)' }}>{t('navbar.login')}</Link>
                            <Link href="/signup">
                                <Button variant="primary" size="sm">{t('navbar.signup')}</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
