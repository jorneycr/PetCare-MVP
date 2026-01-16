'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface ReviewFormProps {
    sitterId: string;
    onSuccess?: () => void;
}

export default function ReviewForm({ sitterId, onSuccess }: ReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sitterId,
                    rating,
                    comment,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al enviar la reseña');
            }

            setComment('');
            setRating(5);
            setShowForm(false);
            if (onSuccess) onSuccess();
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!showForm) {
        return (
            <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                Escribir Reseña
            </Button>
        );
    }

    return (
        <div style={{
            background: '#F9FAFB',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E5E7EB',
            marginTop: '1rem'
        }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>Tu Reseña</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Calificación
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                style={{
                                    fontSize: '1.5rem',
                                    color: star <= rating ? '#FCD34D' : '#E5E7EB',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Comentario
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        placeholder="Comparte tu experiencia..."
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid #E5E7EB',
                            minHeight: '100px',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>

                {error && <p style={{ color: '#DC2626', fontSize: '0.875rem' }}>{error}</p>}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Publicar Reseña'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
