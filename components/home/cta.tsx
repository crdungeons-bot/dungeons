'use client'

import Link from 'next/link';

const stats = [
    { value: '9', label: 'Playable Species' },
    { value: '12', label: 'Classes to Master' },
    { value: '4', label: 'Kingdoms at War' },
    { value: '∞', label: 'Stories to Tell' },
];

export default function CTA() {
    return (
        <section style={{
            position: 'relative',
            backgroundColor: 'var(--color-primary)',
            padding: '7rem 0',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            overflow: 'hidden',
        }}>
            {/* Dramatic background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(139,21,56,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="max-w-5xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ marginBottom: '5rem' }}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: '800',
                                color: 'var(--color-gold)',
                                lineHeight: '1',
                                marginBottom: '0.5rem',
                                textShadow: '0 0 30px rgba(212,175,55,0.4)'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                color: 'rgba(244, 232, 208, 0.5)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gold divider */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                    marginBottom: '5rem',
                    opacity: 0.4
                }} />

                {/* Main CTA */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        color: 'var(--color-accent-light)',
                        fontWeight: '700',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        marginBottom: '1.5rem'
                    }}>
                        Your Destiny Awaits
                    </p>

                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        color: 'var(--color-parchment)',
                        lineHeight: '1.15',
                        marginBottom: '1.5rem',
                    }}>
                        The Dungeon Doesn't Care<br />
                        <span style={{ color: 'var(--color-gold)' }}>If You're Ready.</span>
                    </h2>

                    <p style={{
                        color: 'rgba(244, 232, 208, 0.6)',
                        fontSize: '1.2rem',
                        maxWidth: '580px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.8'
                    }}>
                        Thousands of adventurers have already chosen their path. 
                        Built their characters. Written their first chapter. 
                        The world of Calthera is unforgiving but it rewards the bold.
                    </p>

                    <div className="flex gap-4 justify-center" style={{ flexWrap: 'wrap' }}>
                        <Link
                            href="/register"
                            className="btn-primary"
                            style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}
                        >
                            Create Your Character
                        </Link>
                        <Link
                            href="/ashfall-concord"
                            className="btn-secondary"
                            style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}
                        >
                            Read the Lore
                        </Link>
                    </div>

                    <p style={{
                        color: 'rgba(244, 232, 208, 0.25)',
                        fontSize: '0.8rem',
                        marginTop: '1.5rem',
                        letterSpacing: '0.05em'
                    }}>
                        Free to join. No credit card required.
                    </p>
                </div>
            </div>
        </section>
    );
}
