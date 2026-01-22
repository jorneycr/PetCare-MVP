'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AMERICAN_COUNTRIES } from '@/utils/countries';
import { getLanguageFromCountry } from '@/utils/languageMapping';
import { useLanguage } from '@/context/LanguageContext';

export default function SignupPage() {
    const router = useRouter();
    const { setLanguage } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'owner' as 'owner' | 'sitter' | 'both',
        country: '',
        province: '',
        canton: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Success - redirect to login
            alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Error al crear la cuenta');
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
                            Crea tu cuenta
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Únete a nuestra comunidad de amantes de mascotas
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
                            <label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Juan Pérez"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                placeholder="Mínimo 8 caracteres"
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

                        <div>
                            <label htmlFor="country" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                País
                            </label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={(e) => {
                                    const newCountry = e.target.value;
                                    setFormData({ ...formData, country: newCountry });
                                    setLanguage(getLanguageFromCountry(newCountry));
                                }}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    background: 'white',
                                    outline: 'none',
                                }}
                            >
                                <option value="" disabled>Selecciona tu país</option>
                                {AMERICAN_COUNTRIES.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label htmlFor="province" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    Provincia
                                </label>
                                <input
                                    type="text"
                                    id="province"
                                    placeholder="San José"
                                    value={formData.province}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="canton" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    Cantón
                                </label>
                                <input
                                    type="text"
                                    id="canton"
                                    placeholder="Escazú"
                                    value={formData.canton}
                                    onChange={(e) => setFormData({ ...formData, canton: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userType" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Quiero registrarme como
                            </label>
                            <select
                                id="userType"
                                value={formData.userType}
                                onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'owner' | 'sitter' | 'both' })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    background: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="owner">Dueño de Mascota</option>
                                <option value="sitter">Cuidador</option>
                                <option value="both">Ambos</option>
                            </select>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                            <input type="checkbox" style={{ accentColor: 'var(--primary)', marginTop: '0.25rem' }} />
                            <span style={{ color: 'var(--text-secondary)' }}>
                                Acepto los{' '}
                                <Link href="/terms" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                    Términos y Condiciones
                                </Link>
                                {' '}y la{' '}
                                <Link href="/privacy" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                    Política de Privacidad
                                </Link>
                            </span>
                        </label>

                        <Button type="submit" fullWidth size="lg" isLoading={loading} disabled={loading}>
                            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                        <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>o</span>
                        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
                    </div>

                    {/* Social Signup */}
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
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                            Inicia sesión
                        </Link>
                    </p>
                </Card>
            </div>
        </main>
    );
}
