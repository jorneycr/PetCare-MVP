'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('view'); // 'view' | 'edit' | 'sitter'
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: 'Costa Rica',
        province: '',
        canton: '',
        userType: 'owner' as 'owner' | 'sitter' | 'both',
        bio: '',
        age: 0,
        experienceYears: 0,
        ownPets: '',
        skills: '',
        services: [] as any[],
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/profile');
        } else if (status === 'authenticated') {
            fetchProfile();
        }
    }, [status]);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile');
            const data = await res.json();
            if (res.ok) {
                setFormData({
                    name: data.user.name || '',
                    email: data.user.email || '',
                    country: data.user.country || 'Costa Rica',
                    province: data.user.province || '',
                    canton: data.user.canton || '',
                    userType: data.user.userType || 'owner',
                    bio: data.sitter?.bio || '',
                    age: data.sitter?.age || 0,
                    experienceYears: data.sitter?.experienceYears || 0,
                    ownPets: data.sitter?.ownPets || '',
                    skills: data.sitter?.skills?.join(', ') || '',
                    services: data.sitter?.services || [],
                });
            } else {
                setError(data.error || 'Error al cargar el perfil');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const addService = () => {
        setFormData({
            ...formData,
            services: [...formData.services, { type: 'walking', price: 0 }]
        });
    };

    const removeService = (index: number) => {
        const newServices = [...formData.services];
        newServices.splice(index, 1);
        setFormData({ ...formData, services: newServices });
    };

    const updateService = (index: number, field: string, value: any) => {
        const newServices = [...formData.services];
        newServices[index] = { ...newServices[index], [field]: value };
        setFormData({ ...formData, services: newServices });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        const submissionData = {
            ...formData,
            skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s !== '') : []
        };

        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('¡Perfil actualizado con éxito!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Error al actualizar el perfil');
            }
        } catch (err) {
            setError('Error de conexión');
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Cargando perfil...</p>
            </div>
        );
    }

    const navItemStyle = (isActive: boolean) => ({
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
        color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
        fontWeight: isActive ? '600' : '400',
        transition: 'all 0.2s'
    });

    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)',
            padding: '4rem 1rem'
        }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Card>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            margin: '0 auto 1rem'
                        }}>
                            {formData.name.charAt(0)}
                        </div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Mi Perfil</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Bienvenido de nuevo a tu panel de control</p>
                    </div>

                    {/* Sub-Navigation */}
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #E5E7EB',
                        marginBottom: '2rem',
                        overflowX: 'auto'
                    }}>
                        <div onClick={() => setActiveTab('view')} style={navItemStyle(activeTab === 'view')}>Ver Perfil</div>
                        <div onClick={() => setActiveTab('edit')} style={navItemStyle(activeTab === 'edit')}>Editar Datos</div>
                        {(formData.userType === 'sitter' || formData.userType === 'both') && (
                            <div onClick={() => setActiveTab('sitter')} style={navItemStyle(activeTab === 'sitter')}>Info Cuidador</div>
                        )}
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: '#FEE2E2',
                            border: '1px solid #EF4444',
                            borderRadius: 'var(--radius-md)',
                            color: '#991B1B',
                            fontSize: '0.875rem',
                            marginBottom: '1.5rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            padding: '0.75rem',
                            background: '#DCFCE7',
                            border: '1px solid #22C55E',
                            borderRadius: 'var(--radius-md)',
                            color: '#166534',
                            fontSize: '0.875rem',
                            marginBottom: '1.5rem'
                        }}>
                            {success}
                        </div>
                    )}

                    {activeTab === 'view' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: 'var(--radius-lg)' }}>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Información Básica</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <span style={{ fontWeight: 600 }}>Nombre:</span> <span>{formData.name}</span>
                                    <span style={{ fontWeight: 600 }}>Email:</span> <span>{formData.email}</span>
                                    <span style={{ fontWeight: 600 }}>Tipo:</span> <span style={{ textTransform: 'capitalize' }}>{formData.userType === 'owner' ? 'Dueño de Mascota' : formData.userType === 'sitter' ? 'Cuidador' : 'Ambos'}</span>
                                    <span style={{ fontWeight: 600 }}>Ubicación:</span> <span>{formData.canton}, {formData.province}</span>
                                </div>
                            </div>

                            {(formData.userType === 'sitter' || formData.userType === 'both') && (
                                <>
                                    <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: 'var(--radius-lg)' }}>
                                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Sobre {formData.name.split(' ')[0]}</h3>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: formData.bio ? 'normal' : 'italic', whiteSpace: 'pre-wrap' }}>
                                            {formData.bio || 'No has escrito una biografía aún.'}
                                        </p>

                                        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Información Personal</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                                                    <div>🎂 <strong>Edad:</strong> {formData.age || '--'} años</div>
                                                    <div>⭐ <strong>Experiencia:</strong> {formData.experienceYears || '--'} años</div>
                                                    <div>🐾 <strong>Mascotas propias:</strong> {formData.ownPets || 'Ninguna'}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Habilidades</h4>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                                    {formData.skills ? formData.skills.split(',').map((skill, i) => (
                                                        <span key={i} style={{ padding: '0.2rem 0.5rem', background: '#EFF6FF', color: 'var(--primary)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 500 }}>
                                                            {skill.trim()}
                                                        </span>
                                                    )) : <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>Sin habilidades</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem', background: '#F9FAFB', borderRadius: 'var(--radius-lg)' }}>
                                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Servicios y Precios</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {formData.services && formData.services.length > 0 ? formData.services.map((s, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #F3F4F6' }}>
                                                    <span style={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>{s.type}</span>
                                                    <span style={{ fontWeight: 600 }}>₡{s.price.toLocaleString()}</span>
                                                </div>
                                            )) : <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontStyle: 'italic' }}>No hay servicios configurados</p>}
                                        </div>
                                    </div>
                                </>
                            )}

                            <Button onClick={() => setActiveTab('edit')} variant="outline">Editar Perfil</Button>
                        </div>
                    )}

                    {activeTab === 'edit' && (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Tipo de Usuario</label>
                                <select
                                    value={formData.userType}
                                    onChange={(e) => setFormData({ ...formData, userType: e.target.value as any })}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem',
                                        background: 'white'
                                    }}
                                >
                                    <option value="owner">Dueño de Mascota</option>
                                    <option value="sitter">Cuidador</option>
                                    <option value="both">Ambos (Dueño y Cuidador)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Nombre Completo</label>
                                <input
                                    type="text"
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
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Provincia</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: San José"
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
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Cantón</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Escazú"
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

                            <Button type="submit" fullWidth isLoading={saving} disabled={saving}>Guardar Cambios</Button>
                        </form>
                    )}

                    {activeTab === 'sitter' && (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <section>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Sobre Ti</h3>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Biografía del Cuidador</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Cuéntanos sobre ti y tu experiencia cuidando mascotas..."
                                        rows={5}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.9rem',
                                            outline: 'none',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Edad</label>
                                        <input
                                            type="number"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Experiencia (años)</label>
                                        <input
                                            type="number"
                                            value={formData.experienceYears}
                                            onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Mascotas propias</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: 1 Perro, 2 Gatos"
                                            value={formData.ownPets}
                                            onChange={(e) => setFormData({ ...formData, ownPets: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1rem',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Habilidades (separadas por coma)</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Primeros Auxilios, Entrenamiento, Medicación Oral"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                </div>
                            </section>

                            <section>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Servicios y Precios</h3>
                                    <Button type="button" onClick={addService} variant="outline" size="sm">+ Agregar Servicio</Button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {formData.services.map((service, index) => (
                                        <div key={index} style={{ padding: '1rem', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                                            <div>
                                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tipo de Servicio</label>
                                                <select
                                                    value={service.type}
                                                    onChange={(e) => updateService(index, 'type', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '1px solid #D1D5DB',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    <option value="boarding">Hospedaje</option>
                                                    <option value="walking">Paseo</option>
                                                    <option value="daycare">Guardería</option>
                                                    <option value="visits">Visitas a Domicilio</option>
                                                    <option value="taxi">Pet Taxi</option>
                                                    <option value="grooming">Peluquería</option>
                                                    <option value="training">Entrenamiento</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Precio (₡)</label>
                                                <input
                                                    type="number"
                                                    value={service.price}
                                                    onChange={(e) => updateService(index, 'price', parseInt(e.target.value) || 0)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem',
                                                        border: '1px solid #D1D5DB',
                                                        borderRadius: 'var(--radius-sm)',
                                                        fontSize: '0.85rem'
                                                    }}
                                                />
                                            </div>
                                            <Button type="button" onClick={() => removeService(index)} variant="outline" size="sm" style={{ color: '#EF4444', borderColor: '#FEE2E2' }}>Eliminar</Button>
                                        </div>
                                    ))}
                                    {formData.services.length === 0 && (
                                        <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem', padding: '2rem', border: '2px dashed #E5E7EB', borderRadius: 'var(--radius-lg)' }}>
                                            No has agregado ningún servicio. Haz clic en "Agregar Servicio" para comenzar.
                                        </p>
                                    )}
                                </div>
                            </section>

                            <Button type="submit" fullWidth isLoading={saving} disabled={saving} size="lg">Guardar Información de Cuidador</Button>
                        </form>
                    )}

                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
                        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Volver al Inicio</Link>
                    </div>
                </Card>
            </div>
        </main>
    );
}
