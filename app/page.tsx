'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero Section */}
      <section style={{
        padding: '8rem 0 6rem',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Blob decoration */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
              ✨ {t('home.heroTitle').split(',')[0]}
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {t('home.heroTitle')} <br />
              <span className="text-gradient">Premium</span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}>
              {t('home.heroSubtitle')}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/search">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                  {t('home.findSitter')}
                </Button>
              </Link>
              <Link href="/become-sitter">
                <Button variant="secondary" size="lg">
                  {t('navbar.becomeSitter')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Illustration Placeholder */}
          <div style={{
            marginTop: '4rem',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            background: '#E0E7FF',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: '2px dashed rgba(79, 70, 229, 0.3)'
          }}>
            [Hero Image Placeholder]
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {[
              { number: '10k+', label: 'Mascotas Felices' },
              { number: '500+', label: 'Cuidadores Verificados' },
              { number: '4.9/5', label: 'Calificación Promedio' },
              { number: '24/7', label: 'Soporte Dedicado' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{stat.number}</div>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F9FAFB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Servicios para cada necesidad</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>Personaliza el cuidado que tu mascota merece.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Alojamiento', icon: '🏠', desc: 'Tu mascota se queda en casa del cuidador. Un ambiente hogareño y seguro.', badge: 'Popular' },
              { title: 'Guardería de Día', icon: '☀️', desc: 'Cuidados durante el día para que tu mascota no se quede sola mientras trabajas.' },
              { title: 'Paseos', icon: '🦮', desc: 'Caminatas personalizadas, ejercicio y diversión en su vecindario.' },
              { title: 'Visitas a Domicilio', icon: '🐱', desc: 'Alimentación, juegos y mimos en la comodidad de tu propia casa.' },
            ].map((service, i) => (
              <Card key={i} hoverEffect>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.desc}</p>
                {service.badge && (
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'var(--secondary)', color: 'white',
                    padding: '0.25rem 0.75rem', borderRadius: '1rem',
                    fontSize: '0.75rem', fontWeight: 'bold'
                  }}>
                    {service.badge}
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="hidden-mobile">
            <div style={{
              background: 'linear-gradient(135deg, #E0E7FF 0%, #F5F3FF 100%)',
              borderRadius: '2rem',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}>
              {/* Placeholder illustration */}
              <div style={{ textAlign: 'center', color: 'var(--primary)' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📱</div>
                <div style={{ fontWeight: 'bold' }}>App Preview Mockup</div>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', lineHeight: 1.2 }}>
              {t('home.howItWorks')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { step: '01', title: t('home.step1Title'), desc: t('home.step1Desc') },
                { step: '02', title: t('home.step2Title'), desc: t('home.step2Desc') },
                { step: '03', title: t('home.step3Title'), desc: t('home.step3Desc') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{
                    fontSize: '1.5rem', fontWeight: '800', color: 'rgba(79, 70, 229, 0.2)',
                    minWidth: '3rem'
                  }}>{item.step}</div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--primary)',
            borderRadius: '2rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white',
            boxShadow: 'var(--shadow-lg)',
            backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>¿Listo para empezar?</h2>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
              Únete a nuestra comunidad hoy mismo.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup">
                <Button size="lg" style={{ background: 'white', color: 'var(--primary)' }}>
                  {t('navbar.signup')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
