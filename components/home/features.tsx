'use client'

import Link from 'next/link';

const features = [
    {
        title: "Choose Your Race",
        subtitle: "Who Are You?",
        description: "From the cunning Tiefling to the fierce Half-Orc, every race carries centuries of lore, unique abilities, and a story waiting to be written. Your bloodline shapes your destiny.",
        stat: "9 Races",
        href: "/races",
        accentColor: 'var(--color-accent)',
    },
    {
        title: "Master Your Class",
        subtitle: "What Do You Do?",
        description: "Wield arcane fire as a Wizard, strike from the shadows as a Rogue, or stand unbreakable as a Fighter. Your class defines how you face every challenge the world throws at you.",
        stat: "12 Classes",
        href: "/classes",
        accentColor: 'var(--color-gold)',
    },
    {
        title: "Build Your Legend",
        subtitle: "What Will They Say?",
        description: "Every great campaign starts with a single character. Forge yours, rally your party, and carve your name into the annals of history. The tavern is waiting. The dungeon is dark.",
        stat: "Your Story",
        href: "/register",
        accentColor: 'var(--color-accent)',
    }
];

export default function Features() {
    return (
        <section style={{ 
            padding: 'clamp(3rem, 8vw, 6rem) 0',
            backgroundColor: 'var(--color-primary)',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1.5rem'
            }}>

                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
                    <p style={{ 
                        color: 'var(--color-accent)', 
                        fontWeight: '700',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        marginBottom: '1rem'
                    }}>
                        The Adventure Awaits
                    </p>
                    <h2 style={{ 
                        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                        fontWeight: '800', 
                        color: 'var(--color-parchment)',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                        padding: '0 1rem'
                    }}>
                        Every Legend Begins With<br />
                        <span style={{ color: 'var(--color-gold)' }}>A Single Choice</span>
                    </h2>
                    <p style={{ 
                        color: 'rgba(244, 232, 208, 0.6)',
                        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                        padding: '0 1rem'
                    }}>
                        The world of D&D is vast, dangerous, and endlessly rewarding. 
                        Here is everything you need to step into it.
                    </p>
                </div>

                {/* Feature Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(1rem, 3vw, 1.5rem)'
                }}>
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            style={{
                                backgroundColor: 'var(--color-primary-light)',
                                border: '1px solid rgba(212, 175, 55, 0.25)',
                                borderRadius: '0.5rem',
                                padding: 'clamp(1.5rem, 4vw, 2rem)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                transition: 'border-color 0.3s, transform 0.3s',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-gold)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Accent top bar */}
                            <div style={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                backgroundColor: feature.accentColor
                            }} />

                            {/* Stat badge */}
                            <div style={{
                                display: 'inline-block',
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                borderRadius: '9999px',
                                padding: '0.25rem 0.875rem',
                                fontSize: 'clamp(0.75rem, 2vw, 0.8rem)',
                                fontWeight: '700',
                                color: 'var(--color-gold)',
                                letterSpacing: '0.05em',
                                alignSelf: 'flex-start'
                            }}>
                                {feature.stat}
                            </div>

                            {/* Text */}
                            <div>
                                <p style={{ 
                                    color: 'var(--color-accent-light)', 
                                    fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                                    fontWeight: '700',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem'
                                }}>
                                    {feature.subtitle}
                                </p>
                                <h3 style={{ 
                                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                                    fontWeight: '700',
                                    color: 'var(--color-parchment)',
                                    marginBottom: '0.75rem'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ 
                                    color: 'rgba(244, 232, 208, 0.65)',
                                    lineHeight: '1.7',
                                    fontSize: 'clamp(0.875rem, 2vw, 0.95rem)'
                                }}>
                                    {feature.description}
                                </p>
                            </div>

                            {/* Link */}
                            <Link 
                                href={feature.href}
                                style={{ 
                                    color: 'var(--color-gold)',
                                    fontWeight: '600',
                                    fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: 'auto',
                                    transition: 'gap 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.gap = '0.875rem'}
                                onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}
                            >
                                Explore {feature.title} <span>&#8594;</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom divider with quote */}
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: 'clamp(3rem, 6vw, 5rem)',
                    padding: '0 1.5rem'
                }}>
                    <p style={{ 
                        color: 'rgba(212, 175, 55, 0.5)', 
                        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                        fontStyle: 'italic',
                        letterSpacing: '0.05em',
                        lineHeight: '1.6'
                    }}>
                        "Not all those who wander are lost... some are just looking for a dungeon."
                    </p>
                </div>

            </div>
        </section>
    );
}
