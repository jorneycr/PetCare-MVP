'use client';

import Link from 'next/link';
import { Sitter } from '@/lib/data/sitterData';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SitterListCardProps {
    sitter: Sitter;
}

export function SitterListCard({ sitter }: SitterListCardProps) {
    const lowestPrice = Math.min(...sitter.services.map(s => s.price));

    return (
        <Card className="sitter-card" hoverEffect style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Header with Image and Badge */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ position: 'relative' }}>
                    {/* Avatar */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid white',
                        boxShadow: 'var(--shadow-md)',
                        flexShrink: 0
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
                            bottom: -5,
                            right: -5,
                            background: 'var(--accent)',
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 'bold',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '1rem',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            {sitter.badge}
                        </span>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                            {sitter.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ color: '#FCD34D' }}>★</span>
                            <span style={{ fontWeight: 600 }}>{sitter.rating}</span>
                            <span style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>({sitter.reviews})</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        📍 {sitter.location}
                    </p>
                </div>
            </div>

            {/* Services Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {sitter.services.map(s => (
                    <span key={s.type} style={{
                        background: '#F3F4F6',
                        color: 'var(--text-secondary)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                    }}>
                        {s.type === 'boarding' ? '🏠 Alojamiento' :
                            s.type === 'walking' ? '🦮 Paseo' :
                                s.type === 'daycare' ? '☀️ Guardería' : '🐱 Visitas'}
                    </span>
                ))}
            </div>

            {/* Bio Truncated */}
            <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '1.5rem',
                flex: 1, // Push footer down
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {sitter.bio}
            </p>

            {/* Footer with Price and Action */}
            <div style={{
                borderTop: '1px solid #F3F4F6',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Desde</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                        ₡{lowestPrice.toLocaleString()}
                    </span>
                </div>
                <Link href={`/sitter/${sitter.id}`}>
                    <Button size="sm">Ver Perfil</Button>
                </Link>
            </div>
        </Card>
    );
}
