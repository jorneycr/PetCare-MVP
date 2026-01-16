import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ServicesPage() {
    return (
        <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                padding: '6rem 0 4rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
                        Servicios para tu Mascota
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Encuentra el cuidado perfecto para cada necesidad de tu mejor amigo
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Boarding */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Alojamiento</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Tu mascota se queda en casa del cuidador. Un ambiente hogareño, seguro y lleno de amor mientras estás fuera.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Ambiente familiar</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Actualizaciones diarias con fotos</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Cobertura veterinaria incluida</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡12,000/noche
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Cuidador</Button>
                            </Link>
                        </Card>

                        {/* Dog Walking */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦮</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Paseos</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Caminatas personalizadas para que tu perro haga ejercicio, socialice y explore su vecindario.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Paseos de 30 o 60 minutos</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Paseadores verificados</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ GPS tracking en tiempo real</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡4,500/paseo
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Paseador</Button>
                            </Link>
                        </Card>

                        {/* Daycare */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☀️</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Guardería de Día</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Cuidado durante el día para que tu mascota no esté sola mientras trabajas. Juegos, socialización y mimos.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Supervisión constante</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Actividades y juegos</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Horarios flexibles</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡10,000/día
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Guardería</Button>
                            </Link>
                        </Card>

                        {/* Home Visits */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐱</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Visitas a Domicilio</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Ideal para gatos y mascotas que prefieren quedarse en casa. Alimentación, juegos y compañía.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ En la comodidad de tu hogar</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Visitas de 30 o 60 minutos</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Cuidado de plantas incluido</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡5,000/visita
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Cuidador</Button>
                            </Link>
                        </Card>

                        {/* Pet Taxi */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Pet Taxi</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Transporte seguro para tu mascota hacia la veterinaria, al grooming o a cualquier lugar que necesite.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Vehículos acondicionados</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Conductores amantes de animales</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Acompañamiento opcional</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡8,000/trayecto
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Taxi</Button>
                            </Link>
                        </Card>

                        {/* Pet Grooming */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✂️</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Pet Grooming</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Servicios de estética profesional a domicilio o en casa del cuidador. Baño, corte y cuidados.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Estilistas caninos certificados</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Productos de alta calidad</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Experiencia sin estrés</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡15,000/sesión
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Groomer</Button>
                            </Link>
                        </Card>

                        {/* Pet Training */}
                        <Card hoverEffect>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Entrenamiento</h2>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Mejora el comportamiento de tu perro con entrenadores profesionales. Obediencia, socialización y más.
                            </p>
                            <ul style={{ listStyle: 'none', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Refuerzo positivo</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Clases personalizadas</li>
                                <li style={{ marginBottom: '0.5rem' }}>✓ Todas las razas y edades</li>
                            </ul>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>
                                Desde ₡18,000/clase
                            </div>
                            <Link href="/search">
                                <Button fullWidth>Buscar Entrenador</Button>
                            </Link>
                        </Card>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <Card style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                        color: 'white',
                        textAlign: 'center',
                        padding: '3rem 2rem'
                    }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>
                            ¿No estás seguro qué servicio necesitas?
                        </h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem' }}>
                            Nuestro equipo puede ayudarte a encontrar el cuidado perfecto para tu mascota
                        </p>
                        <Link href="/search">
                            <Button size="lg" style={{ background: 'white', color: 'var(--primary)' }}>
                                Explorar Cuidadores
                            </Button>
                        </Link>
                    </Card>
                </div>
            </section>
        </main>
    );
}
