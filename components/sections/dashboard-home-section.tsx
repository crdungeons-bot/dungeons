'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Character = {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
};

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function CharacterQuickCard({ char }: { char: Character }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={`/dashboard?section=characters&item=${char.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: hovered ? 'rgba(212,175,55,0.08)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${hovered ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.15)'}`,
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            }}
        >
            {/* Portrait */}
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                flexShrink: 0,
                background: `
                    linear-gradient(to bottom, rgba(10,8,6,0) 50%, rgba(10,8,6,0.9) 100%),
                    url(/images/races/${char.race}.png) center / cover no-repeat
                `,
                border: '1px solid rgba(212,175,55,0.3)'
            }} />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: hovered ? 'var(--color-gold)' : 'var(--color-parchment)',
                    transition: 'color 0.2s',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {char.name}
                </p>
                <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'rgba(244,232,208,0.5)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    Level {char.level} {fmt(char.race)} {fmt(char.class)}
                </p>
            </div>

            {/* Arrow */}
            <div style={{
                color: 'var(--color-gold)',
                fontSize: '1.25rem',
                opacity: hovered ? 1 : 0.5,
                transition: 'opacity 0.2s'
            }}>
                →
            </div>
        </Link>
    );
}

export default function DashboardHomeSection() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('Adventurer');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const storedFirstName = localStorage.getItem('userFirstName');
        
        if (storedFirstName) {
            setUserName(storedFirstName);
        }

        if (!userId) {
            setLoading(false);
            return;
        }

        fetch(`/api/characters?userId=${userId}`)
            .then(r => r.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setCharacters((data.characters ?? []).slice(0, 4)); // Only first 4
            })
            .catch(e => console.error(e))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div style={{
            padding: 'clamp(2rem, 5vw, 3rem)',
            maxWidth: '1200px',
            margin: '0 auto',
        }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: '3rem' }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                }}>
                    Welcome Back
                </p>
                <h1 style={{
                    color: 'var(--color-gold)',
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: '800',
                    margin: '0 0 0.5rem 0',
                    textShadow: '0 0 20px rgba(212,175,55,0.3)'
                }}>
                    {userName}
                </h1>
                <p style={{
                    color: 'rgba(244,232,208,0.5)',
                    fontSize: '1rem',
                    margin: 0,
                    fontStyle: 'italic'
                }}>
                    Your adventure awaits
                </p>
            </div>

            {/* Quick Access Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
            }}>
                {/* Characters Section */}
                <div style={{
                    backgroundColor: 'var(--color-primary-light)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.25rem'
                    }}>
                        <div>
                            <p style={{
                                margin: '0 0 0.25rem 0',
                                fontSize: '0.65rem',
                                fontWeight: '800',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(212,175,55,0.5)'
                            }}>
                                My Characters
                            </p>
                            <h2 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: 'var(--color-gold)'
                            }}>
                                {loading ? '...' : characters.length}
                            </h2>
                        </div>
                        <Link
                            href="/create-character"
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--color-gold)',
                                color: 'var(--color-primary)',
                                fontSize: '0.75rem',
                                fontWeight: '800',
                                borderRadius: '0.375rem',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 0 10px rgba(212,175,55,0.25)'
                            }}
                        >
                            + New
                        </Link>
                    </div>

                    {loading && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            {[1, 2].map(i => (
                                <div key={i} style={{
                                    height: '80px',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(212,175,55,0.1)',
                                    borderRadius: '0.5rem',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }} />
                            ))}
                        </div>
                    )}

                    {!loading && characters.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem 1rem',
                            color: 'rgba(244,232,208,0.4)',
                            fontSize: '0.875rem',
                            fontStyle: 'italic'
                        }}>
                            No characters yet. Create your first hero!
                        </div>
                    )}

                    {!loading && characters.length > 0 && (
                        <>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                marginBottom: '1rem'
                            }}>
                                {characters.map(char => (
                                    <CharacterQuickCard key={char.id} char={char} />
                                ))}
                            </div>

                            <Link
                                href="/dashboard?section=characters"
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    padding: '0.625rem',
                                    color: 'var(--color-gold)',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    borderTop: '1px solid rgba(212,175,55,0.15)',
                                    marginTop: '1rem',
                                    paddingTop: '1rem'
                                }}
                            >
                                View All Characters →
                            </Link>
                        </>
                    )}
                </div>

                {/* Parties Section */}
                <div style={{
                    backgroundColor: 'var(--color-primary-light)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.25rem'
                    }}>
                        <div>
                            <p style={{
                                margin: '0 0 0.25rem 0',
                                fontSize: '0.65rem',
                                fontWeight: '800',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(212,175,55,0.5)'
                            }}>
                                My Parties
                            </p>
                            <h2 style={{
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: 'var(--color-gold)'
                            }}>
                                0
                            </h2>
                        </div>
                        <Link
                            href="/dashboard?section=parties"
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'rgba(212,175,55,0.15)',
                                color: 'var(--color-gold)',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                borderRadius: '0.375rem',
                                textDecoration: 'none',
                                border: '1px solid rgba(212,175,55,0.3)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            View
                        </Link>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '2rem 1rem',
                        color: 'rgba(244,232,208,0.4)',
                        fontSize: '0.875rem',
                        fontStyle: 'italic'
                    }}>
                        Join or create a party to adventure with friends!
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '0.75rem'
            }}>
                <p style={{
                    margin: '0 0 1rem 0',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,175,55,0.5)'
                }}>
                    Quick Links
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.75rem'
                }}>
                    {[
                        { label: 'Roll Dice', section: 'dice-roller' },
                        { label: 'Browse Races', section: 'races' },
                        { label: 'Browse Classes', section: 'classes' },
                        { label: 'View Spells', section: 'spells' },
                    ].map(link => (
                        <Link
                            key={link.section}
                            href={`/dashboard?section=${link.section}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.75rem 1rem',
                                backgroundColor: 'rgba(212,175,55,0.08)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                borderRadius: '0.5rem',
                                color: 'var(--color-parchment)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.15)';
                                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
