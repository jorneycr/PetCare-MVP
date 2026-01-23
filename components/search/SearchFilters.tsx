'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/context/LanguageContext';

export function SearchFilters() {
    const { t } = useLanguage();

    return (
        <Card style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>{t('search.filters.title')}</h3>

            {/* Service Type Filter */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>{t('search.filters.serviceType')}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        t('home.services.boarding'),
                        t('home.services.walking'),
                        t('home.services.daycare'),
                        t('home.services.visits'),
                        'Pet Taxi',
                        'Pet Grooming',
                        'Entrenamiento'
                    ].map((label, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '1rem', height: '1rem' }} />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>{t('search.filters.priceRange')}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="number" placeholder="Min" style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #E5E7EB',
                        borderRadius: 'var(--radius-sm)',
                        outline: 'none',
                        fontSize: '0.875rem'
                    }} />
                    <span style={{ color: 'var(--text-light)' }}>-</span>
                    <input type="number" placeholder="Max" style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #E5E7EB',
                        borderRadius: 'var(--radius-sm)',
                        outline: 'none',
                        fontSize: '0.875rem'
                    }} />
                </div>
            </div>

            {/* Sort By */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>{t('search.filters.sortBy')}</h4>
                <select style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    fontSize: '0.875rem',
                    background: 'white',
                    cursor: 'pointer'
                }}>
                    <option>{t('search.filters.sortOptions.recommended')}</option>
                    <option>{t('search.filters.sortOptions.priceLow')}</option>
                    <option>{t('search.filters.sortOptions.priceHigh')}</option>
                    <option>{t('search.filters.sortOptions.rating')}</option>
                </select>
            </div>

            <Button fullWidth>{t('search.filters.apply')}</Button>
        </Card>
    );
}
