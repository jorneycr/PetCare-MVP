'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';

export default function BecomeSitterPage() {
    const { t } = useLanguage();

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
                        💼 {t('becomeSitter.cta')}
                    </span>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '1rem' }}>
                        {t('becomeSitter.title')}
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        {t('becomeSitter.subtitle')}
                    </p>
                    <Link href="/signup">
                        <Button size="lg">{t('navbar.signup')}</Button>
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>
                        {t('becomeSitter.benefits.title')}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.earn.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.earn.desc')}
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.home.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.home.desc')}
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.protection.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.protection.desc')}
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.flexibility.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.flexibility.desc')}
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>❤️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.love.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.love.desc')}
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⭐</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('becomeSitter.benefits.reputation.title')}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {t('becomeSitter.benefits.reputation.desc')}
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section style={{ padding: '4rem 0', background: 'white' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem' }}>
                        {t('becomeSitter.steps.title')}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { step: '01', title: t('becomeSitter.steps.step1.title'), desc: t('becomeSitter.steps.step1.desc') },
                            { step: '02', title: t('becomeSitter.steps.step2.title'), desc: t('becomeSitter.steps.step2.desc') },
                            { step: '03', title: t('becomeSitter.steps.step3.title'), desc: t('becomeSitter.steps.step3.desc') },
                            { step: '04', title: t('becomeSitter.steps.step4.title'), desc: t('becomeSitter.steps.step4.desc') },
                            { step: '05', title: t('becomeSitter.steps.step5.title'), desc: t('becomeSitter.steps.step5.desc') },
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
                            {t('becomeSitter.ctaCard.title')}
                        </h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
                            {t('becomeSitter.ctaCard.subtitle')}
                        </p>
                        <Link href="/signup">
                            <Button size="lg" style={{ background: 'white', color: 'var(--primary)' }}>
                                {t('becomeSitter.ctaCard.button')}
                            </Button>
                        </Link>
                    </Card>
                </div>
            </section>
        </main>
    );
}
