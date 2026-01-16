'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    <Link href="/search" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Buscar Cuidador</Link>
                    <Link href="/services" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Servicios</Link>
                    <Link href="/become-sitter" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Ser Cuidador</Link>
                </nav>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {status === 'authenticated' ? (
                        <>
                            <Link href="/profile" style={{ fontWeight: 600, color: 'var(--text-main)' }}>Bienvenido, {session.user?.name?.split(' ')[0]}</Link>
                            <Button variant="outline" size="sm" onClick={() => signOut()}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ fontWeight: 600, color: 'var(--primary)' }}>Log in</Link>
                            <Link href="/signup">
                                <Button variant="primary" size="sm">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
