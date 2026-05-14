'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { shouldDisplaySubclass } from '@/lib/subclass-levels';

/* ─── types ─────────────────────────────────────────────────────── */

type Character = {
    id:         string;
    name:       string;
    race:       string;
    subrace?:   string | null;
    class:      string;
    subclass?:  { name: string; class: string; level_chosen: number } | null;
    background: string;
    alignment:  string;
    level:      number;
    createdAt:  string;
};

/* ─── helpers ────────────────────────────────────────────────────── */

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/* ─── character card ─────────────────────────────────────────────── */

function CharacterCard({ char, onDelete }: { char: Character; onDelete: (id: string) => void }) {
    const [hovered, setHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const displayRace = char.subrace 
        ? fmt(char.subrace)
        : fmt(char.race);

    const displayClass = (char.subclass && shouldDisplaySubclass(char.class, char.level ?? 1, true))
        ? `${fmt(char.class)} (${char.subclass.name})`
        : fmt(char.class);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmingDelete(true);
        setMenuOpen(false);
    };

    const confirmDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await onDelete(char.id);
        setConfirmingDelete(false);
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setConfirmingDelete(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Link
                href={`/dashboard?section=characters&item=${char.id}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width:          '195px',
                    flexShrink:     0,
                    borderRadius:   '12px',
                    overflow:       'hidden',
                    border:         `1.5px solid ${hovered ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.18)'}`,
                    boxShadow:      hovered
                        ? '0 0 24px rgba(212,175,55,0.2), 0 8px 24px rgba(0,0,0,0.5)'
                        : '0 4px 12px rgba(0,0,0,0.4)',
                    transition:     'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                    transform:      hovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor:         'pointer',
                    background:     'var(--color-primary-dark)',
                    display:        'flex',
                    flexDirection:  'column',
                    textDecoration: 'none',
                }}
            >
                {/* ── Portrait image ── */}
                <div style={{
                    height:     '220px',
                    position:   'relative',
                    overflow:   'hidden',
                    flexShrink: 0,
                    background: `
                        linear-gradient(to bottom, rgba(10,8,6,0) 50%, rgba(10,8,6,0.95) 100%),
                        url(/images/races/${char.race}.png) top / cover no-repeat
                    `,
                }}>
                    {/* Level badge */}
                    <div style={{
                        position:     'absolute',
                        top:          '0.6rem',
                        right:        '0.6rem',
                        background:   'rgba(0,0,0,0.75)',
                        border:       '1.5px solid rgba(212,175,55,0.5)',
                        borderRadius: '999px',
                        padding:      '0.15rem 0.55rem',
                        fontSize:     '0.65rem',
                        fontWeight:   '800',
                        letterSpacing:'0.08em',
                        color:        'var(--color-gold)',
                        backdropFilter: 'blur(4px)',
                    }}>
                        LVL {char.level}
                    </div>

                    {/* Three-dot menu button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        style={{
                            position:       'absolute',
                            top:            '0.6rem',
                            left:           '0.6rem',
                            background:     'rgba(0,0,0,0.75)',
                            border:         '1.5px solid rgba(212,175,55,0.3)',
                            borderRadius:   '6px',
                            width:          '28px',
                            height:         '28px',
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                            color:          'rgba(212,175,55,0.7)',
                            fontSize:       '1rem',
                            cursor:         'pointer',
                            backdropFilter: 'blur(4px)',
                            transition:     'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
                            e.currentTarget.style.color = 'var(--color-gold)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                            e.currentTarget.style.color = 'rgba(212,175,55,0.7)';
                        }}
                    >
                        ⋯
                    </button>
                </div>

                {/* ── Info ── */}
                <div style={{
                    padding:       '0.75rem 0.9rem 0.9rem',
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '0.25rem',
                    flex:          1,
                }}>
                    <p style={{
                        margin:      0,
                        fontSize:    '1rem',
                        fontWeight:  '800',
                        color:       hovered ? 'var(--color-gold)' : '#fff',
                        transition:  'color 0.2s',
                        lineHeight:  '1.2',
                        overflow:    'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:  'nowrap',
                    }}>
                        {char.name}
                    </p>

                    <p style={{
                        margin:       0,
                        fontSize:     '0.75rem',
                        color:        'rgba(244,232,208,0.55)',
                        fontWeight:   '500',
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace:   'nowrap',
                    }}>
                        {displayRace} · {displayClass}
                    </p>
                </div>
            </Link>

            {/* Dropdown menu */}
            {menuOpen && (
                <div
                    style={{
                        position:       'absolute',
                        top:            '3rem',
                        left:           '0.6rem',
                        background:     'rgba(10,8,6,0.98)',
                        border:         '1px solid rgba(212,175,55,0.3)',
                        borderRadius:   '8px',
                        boxShadow:      '0 8px 24px rgba(0,0,0,0.6)',
                        zIndex:         10,
                        minWidth:       '140px',
                        backdropFilter: 'blur(8px)',
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <button
                        onClick={handleDeleteClick}
                        style={{
                            width:          '100%',
                            padding:        '0.6rem 0.9rem',
                            background:     'transparent',
                            border:         'none',
                            color:          'rgba(220,80,80,0.9)',
                            fontSize:       '0.8rem',
                            fontWeight:     '600',
                            textAlign:      'left',
                            cursor:         'pointer',
                            display:        'flex',
                            alignItems:     'center',
                            gap:            '0.5rem',
                            transition:     'background 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(220,80,80,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        🗑️ Delete Character
                    </button>
                </div>
            )}

            {/* Confirmation dialog */}
            {confirmingDelete && (
                <div
                    style={{
                        position:       'fixed',
                        top:            0,
                        left:           0,
                        right:          0,
                        bottom:         0,
                        background:     'rgba(0,0,0,0.8)',
                        display:        'flex',
                        alignItems:     'center',
                        justifyContent: 'center',
                        zIndex:         1000,
                    }}
                    onClick={cancelDelete}
                >
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        style={{
                            background:     'var(--color-primary-light)',
                            border:         '1px solid rgba(212,175,55,0.3)',
                            borderRadius:   '12px',
                            padding:        '2rem',
                            maxWidth:       '400px',
                            boxShadow:      '0 20px 60px rgba(0,0,0,0.6)',
                        }}
                    >
                        <h3 style={{ margin: '0 0 1rem', fontSize: '1.3rem', color: 'var(--color-gold)' }}>
                            Delete {char.name}?
                        </h3>
                        <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: 'rgba(244,232,208,0.7)', lineHeight: '1.5' }}>
                            This will permanently delete this character. This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    flex:         1,
                                    padding:      '0.6rem',
                                    background:   'transparent',
                                    border:       '1px solid rgba(212,175,55,0.3)',
                                    borderRadius: '6px',
                                    color:        'var(--color-gold)',
                                    fontSize:     '0.85rem',
                                    fontWeight:   '600',
                                    cursor:       'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    flex:         1,
                                    padding:      '0.6rem',
                                    background:   'rgba(220,80,80,0.2)',
                                    border:       '1px solid rgba(220,80,80,0.5)',
                                    borderRadius: '6px',
                                    color:        'rgba(220,80,80,0.9)',
                                    fontSize:     '0.85rem',
                                    fontWeight:   '700',
                                    cursor:       'pointer',
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Click away handler for menu */}
            {menuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top:      0,
                        left:     0,
                        right:    0,
                        bottom:   0,
                        zIndex:   9,
                    }}
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </div>
    );
}

/* ─── empty state ────────────────────────────────────────────────── */

function EmptyState() {
    return (
        <div style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            minHeight:      '60vh',
            gap:            '1.25rem',
            textAlign:      'center',
            padding:        '2rem',
        }}>
            <div style={{
                fontSize: '3rem',
                opacity:  0.25,
            }}>⚔</div>
            <div>
                <p style={{
                    margin:        '0 0 0.4rem',
                    fontSize:      '0.62rem',
                    fontWeight:    '800',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color:         'rgba(212,175,55,0.4)',
                }}>No Characters Yet</p>
                <p style={{
                    margin:     0,
                    fontSize:   '0.88rem',
                    color:      'rgba(244,232,208,0.35)',
                    fontStyle:  'italic',
                    maxWidth:   '300px',
                    lineHeight: '1.6',
                }}>
                    Your legend has not yet been written. Create your first character to begin.
                </p>
            </div>
            <Link
                href="/create-character"
                style={{
                    padding:       '0.6rem 1.5rem',
                    background:    'linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%)',
                    border:        'none',
                    borderRadius:  '8px',
                    color:         '#1a1000',
                    fontSize:      '0.82rem',
                    fontWeight:    '800',
                    letterSpacing: '0.05em',
                    textDecoration:'none',
                    cursor:        'pointer',
                }}
            >
                + Create Your First Character
            </Link>
        </div>
    );
}

/* ─── main section ───────────────────────────────────────────────── */

export default function CharactersSection() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState('');
    const [deleting, setDeleting]     = useState<string | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('Not logged in.');
            setLoading(false);
            return;
        }

        fetch(`/api/characters?userId=${userId}`)
            .then(r => r.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setCharacters(data.characters ?? []);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (characterId: string) => {
        setDeleting(characterId);
        try {
            const res = await fetch(`/api/characters/${characterId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete character');
            }

            // Remove from local state
            setCharacters(prev => prev.filter(c => c.id !== characterId));
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete character. Please try again.');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div style={{ padding: '2.5rem 2.5rem 4rem' }}>

            {/* ── Header ── */}
            <div style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                marginBottom:   '2rem',
                flexWrap:       'wrap',
                gap:            '1rem',
            }}>
                <div>
                    <p style={{
                        margin:        '0 0 0.2rem',
                        fontSize:      '0.62rem',
                        fontWeight:    '800',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color:         'rgba(212,175,55,0.5)',
                    }}>My Adventure</p>
                    <h1 style={{
                        margin:     0,
                        fontSize:   '1.8rem',
                        fontWeight: '900',
                        color:      'var(--color-gold)',
                    }}>Characters</h1>
                </div>

                <Link
                    href="/create-character"
                    style={{
                        padding:       '0.55rem 1.25rem',
                        background:    'linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%)',
                        border:        'none',
                        borderRadius:  '8px',
                        color:         '#1a1000',
                        fontSize:      '0.82rem',
                        fontWeight:    '800',
                        letterSpacing: '0.05em',
                        textDecoration:'none',
                        cursor:        'pointer',
                        boxShadow:     '0 0 12px rgba(212,175,55,0.25)',
                    }}
                >
                    + New Character
                </Link>
            </div>

            {/* ── States ── */}
            {loading && (
                <div style={{
                    display:   'flex',
                    gap:       '1.25rem',
                    flexWrap:  'wrap',
                }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            width:        '195px',
                            height:       '310px',
                            borderRadius: '12px',
                            background:   'rgba(255,255,255,0.04)',
                            border:       '1.5px solid rgba(212,175,55,0.1)',
                            animation:    'pulse 1.5s ease-in-out infinite',
                        }} />
                    ))}
                </div>
            )}

            {!loading && error && (
                <p style={{ color: 'rgba(220,80,80,0.8)', fontSize: '0.9rem' }}>{error}</p>
            )}

            {!loading && !error && characters.length === 0 && <EmptyState />}

            {!loading && !error && characters.length > 0 && (
                <div style={{
                    display:   'flex',
                    flexWrap:  'wrap',
                    gap:       '1.25rem',
                }}>
                    {characters.map(char => (
                        <CharacterCard key={char.id} char={char} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
