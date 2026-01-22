import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Sitter from '@/models/Sitter';
import Review from '@/models/Review';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ReviewForm from '@/components/reviews/ReviewForm';

interface SitterProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

import { cookies } from 'next/headers';
import { dictionary, Language } from '@/utils/dictionaries';
import { MOCK_SITTERS } from '@/utils/mockSitters';

export default async function SitterProfilePage({ params }: SitterProfilePageProps) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Get language from cookies
    const cookieStore = await cookies();
    const language = (cookieStore.get('language')?.value || 'es') as Language;
    const dict = dictionary[language] || dictionary.es;

    // Translation helper
    const t = (path: string): string => {
        const keys = path.split('.');
        let current: any = dict;
        for (const key of keys) {
            if (!current[key]) return path;
            current = current[key];
        }
        return current;
    };

    let sitter;
    let reviews: any[] = [];

    // Check for mock ID
    if (id.startsWith('mock-')) {
        const mockSitter = MOCK_SITTERS.find(s => s.id === id);

        if (!mockSitter) {
            notFound();
        }

        // Construct full sitter object from mock data with defaults
        sitter = {
            id: mockSitter.id,
            name: mockSitter.name,
            rating: mockSitter.rating.toFixed(1),
            reviews: mockSitter.reviews,
            completedBookings: Math.floor(Math.random() * 50) + 10,
            repeatCustomers: Math.floor(Math.random() * 20) + 5,
            payments: ['cash', 'card'],
            verifications: ['identity', 'phone'],
            location: mockSitter.location,
            services: mockSitter.services,
            bio: mockSitter.bio,
            aboutSummary: 'Amante de los animales con amplia experiencia.',
            age: 25 + Math.floor(Math.random() * 10),
            experienceYears: 5,
            ownPets: '2 Perros',
            skills: ['Administración de medicamentos', 'Entrenamiento básico'],
            acceptedPetTypes: ['Perros', 'Gatos'],
            acceptedPetSizes: ['Pequeño', 'Mediano', 'Grande'],
            supervisionLevel: 'Tiempo completo',
            pottyBreaks: 'Cada 2 horas',
            walksPerDay: '3 paseos',
            emergencyTransport: true,
            lastMinuteBookings: true,
            image: mockSitter.image,
            badge: mockSitter.badge,
        };

        // Mock reviews
        reviews = Array(3).fill(null).map((_, i) => ({
            name: `Usuario ${i + 1}`,
            location: 'San José',
            rating: 5,
            date: 'Hace 1 mes',
            text: 'Excelente servicio, muy recomendado.',
            verified: true
        }));

    } else {
        // Real DB Fetch
        try {
            await connectDB();
            const sitterDoc = await Sitter.findById(id).populate('userId', 'name').lean();

            if (!sitterDoc) {
                notFound();
            }

            // Fetch real reviews
            const rawReviews = await Review.find({ sitterId: id })
                .populate('userId', 'name province canton')
                .sort({ createdAt: -1 })
                .lean();

            reviews = rawReviews.map((r: any) => ({
                name: r.userId?.name || 'Usuario',
                location: r.userId?.province && r.userId?.canton ? `${r.userId.canton}, ${r.userId.province}` : '',
                rating: r.rating,
                date: new Date(r.createdAt).toLocaleDateString('es-CR', { month: 'long', day: 'numeric', year: 'numeric' }),
                text: r.comment,
                verified: r.isVerified
            }));

            // Transform doc to plain object
            sitter = {
                id: (sitterDoc as any)._id.toString(),
                name: (sitterDoc as any).userId?.name || 'Cuidadores de mascotas',
                rating: (sitterDoc as any).rating ? Number((sitterDoc as any).rating).toFixed(1) : '0',
                reviews: (sitterDoc as any).reviewCount || 0,
                completedBookings: (sitterDoc as any).completedBookings || 0,
                repeatCustomers: (sitterDoc as any).repeatCustomers || 0,
                payments: (sitterDoc as any).payments || ['cash'],
                verifications: (sitterDoc as any).verifications || [],
                location: (sitterDoc as any).location,
                services: (sitterDoc as any).services || [],
                bio: (sitterDoc as any).bio,
                aboutSummary: (sitterDoc as any).aboutSummary,
                age: (sitterDoc as any).age,
                experienceYears: (sitterDoc as any).experienceYears,
                ownPets: (sitterDoc as any).ownPets,
                skills: (sitterDoc as any).skills || [],
                acceptedPetTypes: (sitterDoc as any).acceptedPetTypes || [],
                acceptedPetSizes: (sitterDoc as any).acceptedPetSizes || [],
                supervisionLevel: (sitterDoc as any).supervisionLevel,
                pottyBreaks: (sitterDoc as any).pottyBreaks,
                walksPerDay: (sitterDoc as any).walksPerDay,
                emergencyTransport: (sitterDoc as any).emergencyTransport,
                lastMinuteBookings: (sitterDoc as any).lastMinuteBookings,
                image: (sitterDoc as any).image,
                badge: (sitterDoc as any).badge,
            };
        } catch (error) {
            console.error('Error fetching sitter:', error);
            notFound();
        }
    }

    return (
        <main style={{ padding: '3rem 0', background: 'var(--background)', minHeight: '100vh' }}>
            <div className="container">
                {/* Breadcrumb */}
                <div style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <Link href="/" style={{ color: 'var(--primary)' }}>{t('navbar.home')}</Link>
                    {' > '}
                    <Link href="/search" style={{ color: 'var(--primary)' }}>{t('navbar.search')}</Link>
                    {' > '}
                    <span>{sitter.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Profile Header */}
                        <Card>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '4px solid white',
                                        boxShadow: 'var(--shadow-lg)',
                                    }}>
                                        <img
                                            src={sitter.image}
                                            alt={sitter.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    {sitter.badge && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            background: 'var(--accent)',
                                            color: 'white',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            boxShadow: 'var(--shadow-md)'
                                        }}>
                                            {sitter.badge}
                                        </span>
                                    )}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                                        {sitter.name}
                                    </h1>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                        📍 {sitter.location}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ color: '#FCD34D', fontSize: '1.25rem' }}>★</span>
                                            <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{sitter.rating}</span>
                                            <span style={{ color: 'var(--text-light)' }}>({sitter.reviews} {t('sitter.reviews')})</span>
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)' }}>
                                            ✓ {t('sitter.verified')}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {sitter.services.map((s: any) => (
                                            <span key={s.type} style={{
                                                background: '#F3F4F6',
                                                color: 'var(--text-secondary)',
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.875rem',
                                                fontWeight: 500
                                            }}>
                                                {s.type === 'boarding' ? t('sitter.boarding') :
                                                    s.type === 'walking' ? t('sitter.walking') :
                                                        s.type === 'daycare' ? t('sitter.daycare') :
                                                            s.type === 'taxi' ? t('sitter.taxi') :
                                                                s.type === 'grooming' ? t('sitter.grooming') :
                                                                    s.type === 'training' ? t('sitter.training') : t('sitter.visits')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Stats Banner */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            padding: '1.25rem',
                            background: '#FFFBEB',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid #FEF3C7',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ fontSize: '1.25rem' }}>🗓️</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{sitter.completedBookings}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#92400E' }}>{t('sitter.completedBookings')}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ fontSize: '1.25rem' }}>👥</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{sitter.repeatCustomers}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#92400E' }}>{t('sitter.repeatCustomers')}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ fontSize: '1.25rem' }}>📊</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>3</div>
                                    <div style={{ fontSize: '0.75rem', color: '#92400E' }}>{t('sitter.bookingsMonth')}</div>
                                </div>
                            </div>
                        </div>

                        {/* About & Person Info */}
                        <Card>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{t('sitter.about')} {sitter.name.split(' ')[0]}</h2>
                            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                {sitter.bio}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('sitter.personalInfo')}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                                        <li style={{ marginBottom: '0.5rem' }}>🎂 <b>{t('sitter.age')}:</b> {sitter.age || '28'}</li>
                                        <li style={{ marginBottom: '0.5rem' }}>⭐ <b>{t('sitter.experience')}:</b> {sitter.experienceYears || '10'}</li>
                                        <li style={{ marginBottom: '0.5rem' }}>🐾 <b>{t('sitter.ownPets')}:</b> {sitter.ownPets || '1 Perro'}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t('sitter.skills')}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {(sitter.skills as string[]).map(skill => (
                                            <span key={skill} style={{ fontSize: '0.8rem', background: '#F0F9FF', color: '#0369A1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 500 }}>
                                                {skill}
                                            </span>
                                        ))}
                                        {sitter.skills.length === 0 && (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{t('sitter.noSkills')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Detailed Preferences / Service Info */}
                        <Card>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{t('sitter.serviceDetails')}</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>🐕</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.petTypes')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.acceptedPetTypes.join(', ') || 'Perros'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>📏</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.petSizes')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.acceptedPetSizes.join(', ') || 'Pequeño, Mediano'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>🏠</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.supervision')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.supervisionLevel || 'Constante'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>💩</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.pottyBreaks')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.pottyBreaks || 'Acceso total'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>🦮</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.walksPerDay')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.walksPerDay || '3+'}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ fontSize: '1.25rem' }}>🚑</div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>{t('sitter.emergencyTransport')}</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{sitter.emergencyTransport ? 'Sí' : 'No'}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Neighbourhood / Map */}
                        <Card>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{t('sitter.locationTitle')}</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                {sitter.name} {t('sitter.locationDesc')}
                            </p>
                            <div style={{
                                height: '250px',
                                background: '#E5E7EB',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src="https://img.freepik.com/free-vector/city-map-navigation-interface-design_23-2148299443.jpg?w=800"
                                    alt="Map Placeholder"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                                />
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-md)', fontWeight: 700, color: 'var(--primary)' }}>
                                    📍 {t('sitter.serviceArea')}
                                </div>
                            </div>
                        </Card>

                        {/* Services & Pricing */}
                        <Card>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{t('sitter.servicesPricing')}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {sitter.services.map((service: any) => (
                                    <div key={service.type} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: '#F9FAFB',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid #F3F4F6'
                                    }}>
                                        <div>
                                            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                                {service.type === 'boarding' ? t('sitter.boarding') :
                                                    service.type === 'walking' ? t('sitter.walking') :
                                                        service.type === 'daycare' ? t('sitter.daycare') :
                                                            service.type === 'taxi' ? t('sitter.taxi') :
                                                                service.type === 'grooming' ? t('sitter.grooming') :
                                                                    service.type === 'training' ? t('sitter.training') : t('sitter.visits')}
                                            </h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                                {service.type === 'boarding' ? t('sitter.perNight') :
                                                    service.type === 'walking' ? t('sitter.perWalk') :
                                                        service.type === 'daycare' ? t('sitter.perDay') :
                                                            service.type === 'taxi' ? t('sitter.perTrip') :
                                                                service.type === 'grooming' ? t('sitter.perSession') :
                                                                    service.type === 'training' ? t('sitter.perClass') : t('sitter.perVisit')}
                                            </p>
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                                            ₡{service.price.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Reviews */}
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                    {t('sitter.writeReview')} ({reviews.length})
                                </h2>
                                {!session ? (
                                    <Link href={`/login?callbackUrl=/sitter/${id}`}>
                                        <Button variant="outline" size="sm">{t('sitter.writeReview')}</Button>
                                    </Link>
                                ) : (
                                    <ReviewForm sitterId={id} />
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {reviews.length > 0 ? (
                                    reviews.map((review, i) => (
                                        <div key={i} style={{ paddingBottom: '1.5rem', borderBottom: i < reviews.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600 }}>{review.name}</div>
                                                        <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>
                                                            {review.date} • {review.location || 'Costa Rica'}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: '#FCD34D' }}>
                                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                    </div>
                                                    {review.verified && (
                                                        <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 600 }}>PetCare Verified</div>
                                                    )}
                                                </div>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                {review.text}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
                                        <p>{t('sitter.noReviews')}</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                {/* Talk & Greet Section */}
                                <div style={{
                                    padding: '1rem',
                                    background: '#F0F9FF',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #E0F2FE',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ fontSize: '1.25rem' }}>🤝</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t('sitter.talkGreet')}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t('sitter.talkGreetDesc')}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem' }}>{t('sitter.free')}</div>
                                </div>

                                <Button fullWidth variant="outline" style={{
                                    borderColor: 'var(--primary)',
                                    color: 'var(--primary)',
                                    fontWeight: 700,
                                    height: '50px'
                                }}>
                                    {t('sitter.contact')}
                                </Button>

                                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                                    <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', marginBottom: '-0.65rem' }} />
                                    <span style={{ background: 'white', padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>{t('sitter.bookOption')}</span>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                        {t('sitter.selectService')}
                                    </label>
                                    <select style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        background: 'white'
                                    }}>
                                        {sitter.services.map((s: any) => (
                                            <option key={s.type} value={s.type}>
                                                {s.type === 'boarding' ? t('sitter.boarding') :
                                                    s.type === 'walking' ? t('sitter.walking') :
                                                        s.type === 'daycare' ? t('sitter.daycare') :
                                                            s.type === 'taxi' ? t('sitter.taxi') :
                                                                s.type === 'grooming' ? t('sitter.grooming') :
                                                                    s.type === 'training' ? t('sitter.training') : t('sitter.visits')}
                                                {' - ₡'}{s.price.toLocaleString()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Button fullWidth size="lg" style={{ height: '54px', fontSize: '1.125rem' }}>
                                    {t('sitter.requestBooking')}
                                </Button>
                            </div>

                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, textAlign: 'center', marginBottom: '1.5rem' }}>
                                {t('sitter.guarantee')}
                            </p>

                            {/* Payment Methods */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                padding: '1rem 0',
                                borderTop: '1px solid #F3F4F6',
                                flexWrap: 'wrap'
                            }}>
                                <span title="Visa" style={{ fontSize: '1.5rem', opacity: 0.7 }}>💳</span>
                                <span title="Mastercard" style={{ fontSize: '1.5rem', opacity: 0.7 }}>🎴</span>
                                <span title="PayPal" style={{ fontSize: '1.5rem', opacity: 0.7 }}>🅿️</span>
                                <span title="SINPE Móvil" style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    color: '#0066CC',
                                    border: '1.5px solid #0066CC',
                                    padding: '0.2rem 0.4rem',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>SINPE</span>
                                <span title="Transferencia" style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.5, display: 'flex', alignItems: 'center' }}>TRANSF.</span>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
                                {[
                                    { label: t('sitter.completedBookings'), val: sitter.completedBookings, color: '#9333EA', icon: '14' },
                                    { label: t('sitter.repeatCustomers'), val: sitter.repeatCustomers, color: '#0891B2', icon: '4' },
                                    { label: 'Fieles', val: 6, color: '#0891B2', icon: '6' },
                                    { label: 'Mobile', val: '', color: '#EA580C', icon: '📱' },
                                    { label: 'FB', val: '', color: '#1E40AF', icon: 'f' },
                                    { label: 'Email', val: '', color: '#65A30D', icon: '✉️' },
                                    { label: 'Google', val: '', color: '#DC2626', icon: 'G+' },
                                    { label: 'Id', val: '', color: '#0EA5E9', icon: '🆔' },
                                    { label: 'Business', val: '', color: '#0891B2', icon: '💼' },
                                    { label: 'Test', val: '', color: '#F59E0B', icon: '🎓' },
                                    { label: 'Intro', val: '', color: '#F59E0B', icon: '📄' },
                                    { label: 'Police', val: '', color: '#1E3A8A', icon: '🛡️' },
                                ].map((badge, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: `2px dashed ${badge.color}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: badge.color,
                                            background: 'white',
                                            fontSize: badge.icon.length > 2 ? '0.9rem' : '1.125rem',
                                            fontWeight: 800,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                        }}>
                                            {badge.icon}
                                        </div>
                                        <span style={{ fontSize: '0.625rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', textAlign: 'center' }}>
                                            {badge.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
