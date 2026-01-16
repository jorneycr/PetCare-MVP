'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            // Success - redirect to home
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)',
            padding: '2rem 0'
        }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <Card>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '2rem' }}>🐾</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PetCare</span>
                        </Link>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '1rem', marginBottom: '0.5rem' }}>
                            Bienvenido de nuevo
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Inicia sesión para continuar
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {error && (
                            <div style={{
                                padding: '0.75rem',
                                background: '#FEE2E2',
                                border: '1px solid #EF4444',
                                borderRadius: 'var(--radius-md)',
                                color: '#991B1B',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                                <span style={{ color: 'var(--text-secondary)' }}>Recordarme</span>
                            </label>
                            <Link href="/forgot-password" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <Button type="submit" fullWidth size="lg" isLoading={loading} disabled={loading}>
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>o</span>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                    </div>

                    {/* Social Login */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #E5E7EB',
                            borderRadius: 'var(--radius-full)',
                            background: 'white',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}>
                            <span>🔵</span> Continuar con Google
                        </button>
                        <button style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #E5E7EB',
                            borderRadius: 'var(--radius-full)',
                            background: 'white',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}>
                            <span>📘</span> Continuar con Facebook
                        </button>
                    </div>

                    {/* Footer */}
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        ¿No tienes cuenta?{' '}
                        <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                            Regístrate gratis
                        </Link>
                    </p>
                </Card>
            </div>
        </main>
    );
}
