'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function SearchFilters() {
    return (
        <Card style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Filtros</h3>

            {/* Service Type Filter */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Tipo de Servicio</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['Alojamiento', 'Paseos', 'Guardería', 'Visitas', 'Pet Taxi', 'Pet Grooming', 'Entrenamiento'].map((label, i) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '1rem', height: '1rem' }} />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Precio / Noche</h4>
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
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-main)' }}>Ordenar por</h4>
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
                    <option>Recomendados</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                    <option>Mejor Calificación</option>
                </select>
            </div>

            <Button fullWidth>Aplicar Filtros</Button>
        </Card>
    );
}
