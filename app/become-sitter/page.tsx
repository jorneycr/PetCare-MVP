import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function BecomeSitterPage() {
    return (
        <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                padding: '6rem 0 4rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: 'white',
                        borderRadius: '2rem',
                        boxShadow: 'var(--shadow-sm)',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--primary)'
                    }}>
                        💼 Gana dinero haciendo lo que amas
                    </span>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
                        Conviértete en Cuidador de Mascotas
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Únete a nuestra comunidad de cuidadores verificados y empieza a ganar dinero cuidando mascotas en tu tiempo libre.
                    </p>
                    <Link href="/signup">
                        <Button size="lg">Registrarse Gratis</Button>
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>
                        ¿Por qué ser cuidador en PetCare?
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Gana Dinero Extra</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Establece tus propias tarifas y horarios. Los cuidadores ganan en promedio ₡150,000 - ₡400,000 al mes.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Trabaja desde Casa</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                No necesitas desplazarte. Cuida mascotas en tu propio hogar o visita a los clientes cerca de ti.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Protección Premium</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Cobertura veterinaria incluida en todas las reservas. Soporte 24/7 para cualquier emergencia.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Flexibilidad Total</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Tú decides cuándo y cuántas mascotas aceptar. Perfecto para estudiantes y freelancers.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❤️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Haz lo que Amas</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Si te encantan los animales, esta es la oportunidad perfecta para pasar tiempo con ellos.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Construye tu Reputación</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                Las reseñas positivas te ayudarán a conseguir más clientes y aumentar tus ingresos.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section style={{ padding: '4rem 0', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>
                        Cómo Empezar
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { step: '01', title: 'Regístrate Gratis', desc: 'Crea tu perfil en menos de 5 minutos. Es completamente gratis y sin compromiso.' },
                            { step: '02', title: 'Completa tu Perfil', desc: 'Agrega fotos, describe tu experiencia y establece tus tarifas. Cuanto más completo, mejor.' },
                            { step: '03', title: 'Verificación', desc: 'Verificamos tu identidad y experiencia para garantizar la seguridad de todos.' },
                            { step: '04', title: 'Recibe Solicitudes', desc: 'Los dueños de mascotas te contactarán. Tú decides qué reservas aceptar.' },
                            { step: '05', title: 'Cuida y Gana', desc: 'Brinda un servicio excelente, recibe reseñas positivas y cobra directamente.' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: 'rgba(79, 70, 229, 0.2)',
                                    minWidth: '3rem'
                                }}>
                                    {item.step}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <Card style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                        color: 'white',
                        textAlign: 'center',
                        padding: '3rem 2rem'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
                            ¿Listo para empezar?
                        </h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
                            Únete a cientos de cuidadores que ya están ganando dinero haciendo lo que aman
                        </p>
                        <Link href="/signup">
                            <Button size="lg" style={{ background: 'white', color: 'var(--primary)' }}>
                                Crear Cuenta de Cuidador
                            </Button>
                        </Link>
                    </Card>
                </div>
            </section>
        </main>
    );
}
