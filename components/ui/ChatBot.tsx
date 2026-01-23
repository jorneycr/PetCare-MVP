'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { useLanguage } from '@/context/LanguageContext';

export function ChatBot() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {/* Chat Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        boxShadow: 'var(--shadow-lg)',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    💬
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card
                    className="chatbot-window"
                    style={{
                        width: '350px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 0,
                        overflow: 'hidden',
                        border: '1px solid #E5E7EB',
                        boxShadow: 'var(--shadow-xl)',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '1rem',
                            background: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>🐾</span>
                            <span style={{ fontWeight: 600 }}>{t('chatbot.title')}</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            background: '#F9FAFB',
                        }}
                    >
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👋</div>
                                <p>{t('chatbot.welcome')}</p>
                            </div>
                        )}
                        {messages.map((m: any) => (
                            <div
                                key={m.id}
                                style={{
                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '1rem',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    background: m.role === 'user' ? 'var(--primary)' : 'white',
                                    color: m.role === 'user' ? 'white' : 'var(--text-main)',
                                    boxShadow: m.role === 'user' ? 'none' : 'var(--shadow-sm)',
                                    border: m.role === 'user' ? 'none' : '1px solid #E5E7EB',
                                }}
                            >
                                {m.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                                {t('chatbot.typing')}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            padding: '1rem',
                            background: 'white',
                            borderTop: '1px solid #E5E7EB',
                            display: 'flex',
                            gap: '0.5rem',
                        }}
                    >
                        <input
                            value={input}
                            onChange={handleInputChange}
                            placeholder={t('chatbot.placeholder')}
                            style={{
                                flex: 1,
                                padding: '0.5rem 0.75rem',
                                border: '1px solid #D1D5DB',
                                borderRadius: '0.5rem',
                                outline: 'none',
                                fontSize: '0.9rem',
                            }}
                        />
                        <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                            ➤
                        </Button>
                    </form>
                </Card>
            )}


        </div>
    );
}
