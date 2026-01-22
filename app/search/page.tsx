'use client';

import { useState, useEffect } from 'react';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SitterListCard } from '@/components/search/SitterListCard';
import { useLanguage } from '@/context/LanguageContext';

interface Sitter {
    id: string;
    name: string;
    rating: number;
    reviews: number;
    location: string;
    services: Array<{ type: 'boarding' | 'walking' | 'daycare' | 'visits' | 'taxi' | 'grooming' | 'training'; price: number }>;
    bio: string;
    image: string;
    badge?: string;
}

import { MOCK_SITTERS } from '@/utils/mockSitters';

export default function SearchPage() {
    const { t } = useLanguage();
    const [sitters, setSitters] = useState<Sitter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSitters();
    }, []);

    const fetchSitters = async () => {
        try {
            setLoading(true);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

            try {
                const response = await fetch('/api/sitters', { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                setSitters(data.sitters || []);
            } catch (fetchError) {
                throw fetchError;
            }
        } catch (err: any) {
            console.warn('Network error or API failure, falling back to mock data', err);
            setSitters(MOCK_SITTERS as unknown as Sitter[]);
            setError('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: '3rem 0', background: 'var(--background)', minHeight: '100vh' }}>
            <div className="container">
                {/* Page Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        {t('search.title')}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {t('search.subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }}>

                    {/* Sidebar - Desktop Only (TODO: Mobile Drawer) */}
                    <aside className="hidden-mobile">
                        <SearchFilters />
                    </aside>

                    {/* Results Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Active Filters / Count */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                                {loading ? t('common.loading') : `${sitters.length} ${t('search.results')}`}
                            </span>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div style={{
                                padding: '2rem',
                                textAlign: 'center',
                                background: '#FEE2E2',
                                borderRadius: 'var(--radius-lg)',
                                color: '#991B1B'
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && !error && (
                            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                {t('search.loading')}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && sitters.length === 0 && (
                            <div style={{
                                padding: '3rem',
                                textAlign: 'center',
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid #E5E7EB'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐾</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                    {t('search.emptyTitle')}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    {t('search.emptyDesc')}
                                </p>
                            </div>
                        )}

                        {/* Sitters Grid */}
                        {!loading && !error && sitters.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {sitters.map((sitter: Sitter) => (
                                    <SitterListCard key={sitter.id} sitter={sitter} />
                                ))}
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        {!loading && sitters.length > 0 && (
                            <div style={{ margin: '3rem auto', textAlign: 'center' }}>
                                <button style={{
                                    padding: '0.75rem 1.5rem',
                                    border: '1px solid #E5E7EB',
                                    background: 'white',
                                    borderRadius: 'var(--radius-full)',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer'
                                }}>
                                    {t('search.loadMore')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
