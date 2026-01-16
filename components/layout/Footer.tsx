import Link from 'next/link';

export function Footer() {
    return (
        <footer style={{ backgroundColor: 'white', borderTop: '1px solid #F3F4F6', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--primary)' }}>🐾</span> PetCare
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Conectando dueños amorosos con cuidadores de confianza en todo Costa Rica.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Descubrir</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/search" style={{ color: 'var(--text-secondary)' }}>Buscar Cuidadores</Link></li>
                            <li><Link href="/services" style={{ color: 'var(--text-secondary)' }}>Servicios de Paseo</Link></li>
                            <li><Link href="/services" style={{ color: 'var(--text-secondary)' }}>Alojamiento</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Comunidad</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/become-sitter" style={{ color: 'var(--text-secondary)' }}>Conviértete en Cuidador</Link></li>
                            <li><Link href="/blog" style={{ color: 'var(--text-secondary)' }}>Blog</Link></li>
                            <li><Link href="/reviews" style={{ color: 'var(--text-secondary)' }}>Reseñas</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    © {new Date().getFullYear()} PetCare App. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
