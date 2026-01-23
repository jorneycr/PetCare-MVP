import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
    const { t } = useLanguage();

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
                            {t('footer.desc')}
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>{t('footer.discover')}</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/search" style={{ color: 'var(--text-secondary)' }}>{t('footer.searchSitters')}</Link></li>
                            <li><Link href="/services" style={{ color: 'var(--text-secondary)' }}>{t('footer.walkingServices')}</Link></li>
                            <li><Link href="/services" style={{ color: 'var(--text-secondary)' }}>{t('footer.boarding')}</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>{t('footer.community')}</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li><Link href="/become-sitter" style={{ color: 'var(--text-secondary)' }}>{t('footer.becomeSitter')}</Link></li>
                            <li><Link href="/blog" style={{ color: 'var(--text-secondary)' }}>{t('footer.blog')}</Link></li>
                            <li><Link href="/reviews" style={{ color: 'var(--text-secondary)' }}>{t('footer.reviews')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    © {new Date().getFullYear()} PetCare App. {t('footer.rights')}
                </div>
            </div>
        </footer>
    );
}
