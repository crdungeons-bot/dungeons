'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ─── types ─────────────────────────────────────────────────────── */

type Stats = { str: number; dex: number; con: number; int: number; wis: number; cha: number };
type Story = {
    backstory: string; personality: string; ideals: string;
    bonds: string; flaws: string; appearance: string;
};

/* D&D 5e hit dice by class */
const HIT_DICE: Record<string, number> = {
    barbarian: 12,
    fighter: 10, paladin: 10, ranger: 10,
    bard: 8, cleric: 8, druid: 8, monk: 8, rogue: 8, warlock: 8,
    sorcerer: 6, wizard: 6,
};

function calcStartingHp(dndClass: string, stats: Stats): number {
    const hitDie = HIT_DICE[dndClass] ?? 8;
    const conMod = Math.floor(((stats.con ?? 10) - 10) / 2);
    return Math.max(1, hitDie + conMod);
}

const STAT_DEFS = [
    { key: 'str', label: 'STR', full: 'Strength'     },
    { key: 'dex', label: 'DEX', full: 'Dexterity'    },
    { key: 'con', label: 'CON', full: 'Constitution' },
    { key: 'int', label: 'INT', full: 'Intelligence' },
    { key: 'wis', label: 'WIS', full: 'Wisdom'       },
    { key: 'cha', label: 'CHA', full: 'Charisma'     },
] as const;

/* ─── helpers ────────────────────────────────────────────────────── */

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getMod(score: number): string {
    const m = Math.floor((score - 10) / 2);
    return m >= 0 ? `+${m}` : `${m}`;
}

function getModColor(score: number): string {
    const m = Math.floor((score - 10) / 2);
    if (m > 0)  return 'rgba(134,198,120,0.9)';
    if (m < 0)  return 'rgba(220,80,80,0.9)';
    return 'rgba(212,175,55,0.7)';
}

/* ─── sub-components ─────────────────────────────────────────────── */

function StatBlock({ def, value }: { def: typeof STAT_DEFS[number]; value: number }) {
    const mod      = getMod(value);
    const modColor = getModColor(value);

    return (
        <div style={{
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            background:      'rgba(0,0,0,0.55)',
            border:          '1px solid rgba(212,175,55,0.25)',
            borderRadius:    '10px',
            padding:         '1rem 0.5rem 0.85rem',
            gap:             '0.2rem',
            position:        'relative',
            overflow:        'hidden',
        }}>
            {/* faint emboss top bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)',
            }} />

            <span style={{
                fontSize:      '0.6rem',
                fontWeight:    '800',
                letterSpacing: '0.15em',
                color:         'rgba(212,175,55,0.6)',
                textTransform: 'uppercase',
            }}>{def.full}</span>

            <span style={{
                fontSize:   '2.4rem',
                fontWeight: '900',
                lineHeight: '1',
                color:      '#fff',
                marginTop:  '0.15rem',
            }}>{value}</span>

            <div style={{
                marginTop:    '0.3rem',
                background:   'rgba(0,0,0,0.5)',
                border:       `1.5px solid ${modColor}`,
                borderRadius: '999px',
                padding:      '0.1rem 0.75rem',
                fontSize:     '0.8rem',
                fontWeight:   '800',
                color:        modColor,
                letterSpacing:'0.05em',
            }}>{mod}</div>
        </div>
    );
}

function InfoCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
    return (
        <div style={{
            background:   'rgba(0,0,0,0.45)',
            border:       `1px solid ${accent ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
            borderRadius: '10px',
            padding:      '1rem 1.25rem',
        }}>
            <p style={{
                margin:        0,
                fontSize:      '0.6rem',
                fontWeight:    '800',
                letterSpacing: '0.13em',
                color:         'rgba(212,175,55,0.5)',
                textTransform: 'uppercase',
                marginBottom:  '0.3rem',
            }}>{label}</p>
            <p style={{
                margin:     0,
                fontSize:   '1.05rem',
                fontWeight: '700',
                color:      '#fff',
            }}>{value}</p>
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <span style={{
                fontSize:      '0.62rem',
                fontWeight:    '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'rgba(212,175,55,0.55)',
            }}>{children}</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.12)' }} />
        </div>
    );
}

/* ─── main component ─────────────────────────────────────────────── */

export default function SummaryStep({
    race,
    dndClass,
    subclass,
    name,
    background,
    alignment,
    height,
    weight,
    age,
    proficiencies,
}: {
    race?:          string;
    dndClass?:      string;
    subclass?:      string;
    name?:          string;
    background?:    string;
    alignment?:     string;
    height?:        string;
    weight?:        string;
    age?:           string;
    proficiencies?: string;
}) {
    const router = useRouter();

    const [stats, setStats]   = useState<Stats | null>(null);
    const [story, setStory]   = useState<Story | null>(null);
    const [creating, setCreating] = useState(false);
    const [error, setError]   = useState('');
    const [bgDetail, setBgDetail] = useState<{ feature: { name: string; desc: string[] } } | null>(null);

    /* read localStorage after mount */
    useEffect(() => {
        try {
            const s = localStorage.getItem('char_stats');
            if (s) setStats(JSON.parse(s));
        } catch { /* ignore */ }

        try {
            const st = localStorage.getItem('char_story');
            if (st) setStory(JSON.parse(st));
        } catch { /* ignore */ }
    }, []);

    /* fetch background data */
    useEffect(() => {
        if (!background) {
            setBgDetail(null);
            return;
        }
        
        fetch(`/api/resources/backgrounds/${background}`)
            .then(res => res.json())
            .then(data => setBgDetail(data))
            .catch(err => {
                console.error('Failed to fetch background:', err);
                setBgDetail(null);
            });
    }, [background]);

    /* ── derived display values ── */
    const displayName       = name       ? fmt(name)       : 'Unnamed Hero';
    const displayRace       = race       ? fmt(race)       : ', ';
    const displayClass      = dndClass && subclass 
        ? `${fmt(dndClass)} (${fmt(subclass)})`
        : dndClass 
            ? fmt(dndClass) 
            : ', ';
    const displayBackground = background ? fmt(background) : ', ';
    const displayAlignment  = alignment  ? fmt(alignment)  : ', ';

    const hasPhysical = height || weight || age;
    const hasStory    = story && (story.backstory || story.personality || story.appearance);

    /* ── create handler ── */
    async function handleCreate() {
        setCreating(true);
        setError('');

        const userId = localStorage.getItem('userId') ?? '';

        const hp = stats && dndClass ? calcStartingHp(dndClass, stats) : null;

        const payload = {
            userId,
            name:           name ?? '',
            race:           race ?? '',
            dndClass:       dndClass ?? '',
            background:     background ?? '',
            alignment:      alignment ?? '',
            height:         height ?? null,
            weight:         weight ?? null,
            age:            age ?? null,
            proficiencies:  proficiencies ? proficiencies.split(',') : [],
            stats:          stats ?? {},
            story:          story ?? {},
            hp,
            subclass:       subclass ? { name: subclass, class: dndClass ?? '', level_chosen: 1 } : null,
        };

        try {
            const res = await fetch('/api/characters', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Something went wrong');
            }

            /* clean up localStorage */
            localStorage.removeItem('char_stats');
            localStorage.removeItem('char_story');

            router.push('/dashboard?created=1');
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Failed to create character');
            setCreating(false);
        }
    }

    /* ── back handler ── */
    function handleBack() {
        // Determine correct previous step based on whether class has level 1 subclass
        const LEVEL_1_SUBCLASS_CLASSES = ['cleric', 'warlock'];
        const needsSubclassStep = dndClass && LEVEL_1_SUBCLASS_CLASSES.includes(dndClass);
        const prevStepNumber = needsSubclassStep ? '7' : '6';
        
        const p = new URLSearchParams({ step: prevStepNumber });
        if (race)           p.set('race',          race);
        if (dndClass)       p.set('class',         dndClass);
        if (subclass)       p.set('subclass',      subclass);
        if (name)           p.set('name',          name);
        if (background)     p.set('background',    background);
        if (alignment)      p.set('alignment',     alignment);
        if (height)         p.set('height',        height);
        if (weight)         p.set('weight',        weight);
        if (age)            p.set('age',           age);
        if (proficiencies)  p.set('proficiencies', proficiencies);
        router.push(`/create-character?${p.toString()}`);
    }

    /* ── layout ── */
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

            {/* ══════════════ HERO ══════════════ */}
            <div style={{
                position:   'relative',
                minHeight:  '520px',
                display:    'flex',
                alignItems: 'flex-end',
                flexShrink: 0,
                background: race
                    ? `
                        linear-gradient(to bottom,  rgba(10,8,6,0.3)  0%,  rgba(10,8,6,0.0)  20%),
                        linear-gradient(to right,   rgba(10,8,6,0.92) 0%,  rgba(10,8,6,0.55) 55%, rgba(10,8,6,0.1) 100%),
                        linear-gradient(to top,     rgba(10,8,6,1.0)  0%,  rgba(10,8,6,0.0)  50%),
                        url(/images/races/${race}.png) top / cover no-repeat
                    `
                    : 'linear-gradient(135deg, rgba(10,8,6,1) 0%, rgba(30,20,10,1) 100%)',
            }}>
                <div style={{ padding: '2rem 2.5rem 2.5rem', width: '100%', maxWidth: '680px' }}>
                    <p style={{
                        margin:        '0 0 0.35rem',
                        fontSize:      '0.62rem',
                        fontWeight:    '800',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color:         'rgba(212,175,55,0.55)',
                    }}>
                        Your Character
                    </p>

                    <h1 style={{
                        margin:      '0 0 0.6rem',
                        fontSize:    'clamp(2rem, 5vw, 3.2rem)',
                        fontWeight:  '900',
                        color:       '#fff',
                        lineHeight:  '1.05',
                        letterSpacing: '-0.01em',
                        textShadow:  '0 2px 24px rgba(0,0,0,0.7)',
                    }}>
                        {displayName}
                    </h1>

                    {/* tagline: Race · Class · Background · Alignment */}
                    <div style={{
                        display:    'flex',
                        flexWrap:   'wrap',
                        gap:        '0',
                        alignItems: 'center',
                    }}>
                        {[displayRace, displayClass, displayBackground, displayAlignment].map((val, i, arr) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{
                                    fontSize:   '0.9rem',
                                    fontWeight: i === 0 ? '700' : '500',
                                    color:      i === 0 ? 'var(--color-gold)' : 'rgba(255,255,255,0.75)',
                                }}>{val}</span>
                                {i < arr.length - 1 && (
                                    <span style={{
                                        margin: '0 0.5rem',
                                        color: 'rgba(212,175,55,0.3)',
                                        fontSize: '0.85rem',
                                    }}>·</span>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════════ CONTENT ══════════════ */}
            <div style={{ flex: 1, padding: '2rem 2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* ── Stats ── */}
                {stats && (
                    <section>
                        <SectionLabel>Ability Scores</SectionLabel>
                        <div style={{
                            display:             'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)',
                            gap:                 '0.65rem',
                        }}>
                            {STAT_DEFS.map(def => (
                                <StatBlock
                                    key={def.key}
                                    def={def}
                                    value={stats[def.key] ?? 10}
                                />
                            ))}
                        </div>

                        {/* Starting HP callout */}
                        {dndClass && (() => {
                            const hitDie = HIT_DICE[dndClass] ?? 8;
                            const conMod = Math.floor(((stats.con ?? 10) - 10) / 2);
                            const hp     = calcStartingHp(dndClass, stats);
                            return (
                                <div style={{
                                    marginTop:    '0.75rem',
                                    display:      'flex',
                                    alignItems:   'center',
                                    gap:          '0.65rem',
                                    padding:      '0.7rem 1.1rem',
                                    background:   'rgba(220,60,60,0.08)',
                                    border:       '1px solid rgba(220,60,60,0.25)',
                                    borderRadius: '10px',
                                }}>
                                    <span style={{ fontSize: '1.3rem' }}>❤️</span>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(220,120,120,0.6)', marginBottom: '0.1rem' }}>
                                            Starting Hit Points
                                        </p>
                                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'rgba(240,160,160,0.9)' }}>
                                            {hp} HP
                                        </p>
                                    </div>
                                    <p style={{ margin: '0 0 0 auto', fontSize: '0.75rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic' }}>
                                        d{hitDie} max {conMod >= 0 ? `+ ${conMod}` : `− ${Math.abs(conMod)}`} (CON)
                                    </p>
                                </div>
                            );
                        })()}
                    </section>
                )}

                {!stats && (
                    <section>
                        <SectionLabel>Ability Scores</SectionLabel>
                        <div style={{
                            padding:      '1.25rem',
                            background:   'rgba(0,0,0,0.3)',
                            border:       '1px dashed rgba(212,175,55,0.2)',
                            borderRadius: '10px',
                            textAlign:    'center',
                            color:        'rgba(212,175,55,0.4)',
                            fontSize:     '0.85rem',
                            fontStyle:    'italic',
                        }}>
                            No stats recorded,   you can assign them later.
                        </div>
                    </section>
                )}

                {/* ── Skill Proficiencies ── */}
                {proficiencies && proficiencies.length > 0 && (() => {
                    const skills = proficiencies.split(',').filter(s => s.startsWith('skill-'));
                    if (skills.length === 0) return null;
                    return (
                        <section>
                            <SectionLabel>Skill Proficiencies</SectionLabel>
                            <div style={{
                                display:   'flex',
                                flexWrap:  'wrap',
                                gap:       '0.45rem',
                            }}>
                                {skills.map(s => {
                                    const label = s.replace('skill-', '').split('-')
                                        .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                                    return (
                                        <span key={s} style={{
                                            padding:       '0.3rem 0.8rem',
                                            borderRadius:  '999px',
                                            fontSize:      '0.78rem',
                                            fontWeight:    '600',
                                            color:         '#fff',
                                            background:    'rgba(212,175,55,0.12)',
                                            border:        '1px solid rgba(212,175,55,0.3)',
                                        }}>
                                            ● {label}
                                        </span>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })()}

                {/* ── Identity grid ── */}
                <section>
                    <SectionLabel>Character Identity</SectionLabel>
                    <div style={{
                        display:             'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap:                 '0.65rem',
                    }}>
                        <InfoCard label="Race"       value={displayRace}       accent />
                        <InfoCard label="Class"      value={displayClass}      accent />
                        <InfoCard label="Background" value={displayBackground} />
                        <InfoCard label="Alignment"  value={displayAlignment} />
                    </div>

                    {/* Background feature callout */}
                    {bgDetail && (
                        <div style={{
                            marginTop:    '0.65rem',
                            background:   'rgba(212,175,55,0.05)',
                            border:       '1px solid rgba(212,175,55,0.15)',
                            borderRadius: '10px',
                            padding:      '0.9rem 1.25rem',
                            display:      'flex',
                            gap:          '0.75rem',
                            alignItems:   'flex-start',
                        }}>
                            <span style={{ color: 'var(--color-gold)', fontSize: '1rem', marginTop: '0.05rem' }}>★</span>
                            <div>
                                <p style={{
                                    margin:        '0 0 0.2rem',
                                    fontSize:      '0.62rem',
                                    fontWeight:    '800',
                                    letterSpacing: '0.13em',
                                    textTransform: 'uppercase',
                                    color:         'rgba(212,175,55,0.55)',
                                }}>Background Feature</p>
                                <p style={{
                                    margin:     '0 0 0.15rem',
                                    fontSize:   '0.9rem',
                                    fontWeight: '700',
                                    color:      '#fff',
                                }}>{bgDetail.feature.name}</p>
                                <p style={{
                                    margin:     0,
                                    fontSize:   '0.8rem',
                                    color:      'rgba(255,255,255,0.6)',
                                    lineHeight: '1.5',
                                }}>
                                    {bgDetail.feature.desc[0]?.slice(0, 160)}{(bgDetail.feature.desc[0]?.length ?? 0) > 160 ? '…' : ''}
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* ── Physical traits ── */}
                {hasPhysical && (
                    <section>
                        <SectionLabel>Physical Traits</SectionLabel>
                        <div style={{
                            display:             'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap:                 '0.65rem',
                        }}>
                            {height && <InfoCard label="Height" value={height} />}
                            {weight && <InfoCard label="Weight" value={weight} />}
                            {age    && <InfoCard label="Age"    value={age}    />}
                        </div>
                    </section>
                )}

                {/* ── Story preview ── */}
                {hasStory && (
                    <section>
                        <SectionLabel>Character Story</SectionLabel>
                        <div style={{
                            background:    'rgba(0,0,0,0.45)',
                            border:        '1px solid rgba(212,175,55,0.15)',
                            borderRadius:  '10px',
                            padding:       '1.25rem',
                            display:       'flex',
                            flexDirection: 'column',
                            gap:           '0.85rem',
                        }}>
                            {story?.backstory && (
                                <div>
                                    <p style={{
                                        margin:        '0 0 0.3rem',
                                        fontSize:      '0.6rem',
                                        fontWeight:    '800',
                                        letterSpacing: '0.13em',
                                        textTransform: 'uppercase',
                                        color:         'rgba(212,175,55,0.5)',
                                    }}>Backstory</p>
                                    <p style={{
                                        margin:     0,
                                        fontSize:   '0.85rem',
                                        color:      'rgba(255,255,255,0.7)',
                                        lineHeight: '1.6',
                                        fontStyle:  'italic',
                                    }}>
                                        "{story.backstory.slice(0, 280)}{story.backstory.length > 280 ? '…' : ''}"
                                    </p>
                                </div>
                            )}

                            {/* inline personality / appearance chips */}
                            {(story?.personality || story?.appearance) && (
                                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                                    {story?.personality && (
                                        <div style={{
                                            flex:         '1',
                                            minWidth:     '200px',
                                            background:   'rgba(255,255,255,0.04)',
                                            borderRadius: '8px',
                                            padding:      '0.65rem 0.85rem',
                                        }}>
                                            <p style={{
                                                margin:        '0 0 0.2rem',
                                                fontSize:      '0.58rem',
                                                fontWeight:    '800',
                                                letterSpacing: '0.13em',
                                                textTransform: 'uppercase',
                                                color:         'rgba(212,175,55,0.45)',
                                            }}>Personality</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                                {story.personality.slice(0, 120)}{story.personality.length > 120 ? '…' : ''}
                                            </p>
                                        </div>
                                    )}
                                    {story?.appearance && (
                                        <div style={{
                                            flex:         '1',
                                            minWidth:     '200px',
                                            background:   'rgba(255,255,255,0.04)',
                                            borderRadius: '8px',
                                            padding:      '0.65rem 0.85rem',
                                        }}>
                                            <p style={{
                                                margin:        '0 0 0.2rem',
                                                fontSize:      '0.58rem',
                                                fontWeight:    '800',
                                                letterSpacing: '0.13em',
                                                textTransform: 'uppercase',
                                                color:         'rgba(212,175,55,0.45)',
                                            }}>Appearance</p>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5' }}>
                                                {story.appearance.slice(0, 120)}{story.appearance.length > 120 ? '…' : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* spacer above footer */}
                <div style={{ height: '5rem' }} />
            </div>

            {/* ══════════════ FOOTER ══════════════ */}
            <div className="summary-footer" style={{
                position:        'sticky',
                bottom:          0,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
                padding:         '1rem 2rem',
                backgroundColor: 'var(--color-primary-dark)',
                borderTop:       '1px solid rgba(212,175,55,0.15)',
                gap:             '1rem',
                zIndex:          10,
            }}>
                {/* back */}
                <button
                    onClick={handleBack}
                    style={{
                        padding:       '0.7rem 1.4rem',
                        background:    'transparent',
                        border:        '1.5px solid rgba(212,175,55,0.3)',
                        borderRadius:  '8px',
                        color:         'rgba(212,175,55,0.7)',
                        fontSize:      '0.82rem',
                        fontWeight:    '700',
                        cursor:        'pointer',
                        letterSpacing: '0.04em',
                        flexShrink:    0,
                        transition:    'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,175,55,0.7)';
                        (e.currentTarget as HTMLButtonElement).style.color       = 'var(--color-gold)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,175,55,0.3)';
                        (e.currentTarget as HTMLButtonElement).style.color       = 'rgba(212,175,55,0.7)';
                    }}
                >
                    ← Stats
                </button>

                <div className="summary-footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    {error && (
                        <p style={{
                            margin:     0,
                            fontSize:   '0.75rem',
                            color:      'rgba(220,80,80,0.9)',
                            fontWeight: '600',
                        }}>{error}</p>
                    )}

                    {/* ⚔ THE BUTTON ⚔ */}
                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        style={{
                            padding:         '0.85rem 2.5rem',
                            background:      creating
                                ? 'rgba(212,175,55,0.25)'
                                : 'linear-gradient(135deg, #c9a227 0%, #e8c84a 45%, #c9a227 100%)',
                            border:          creating
                                ? '1.5px solid rgba(212,175,55,0.3)'
                                : '1.5px solid rgba(255,220,100,0.6)',
                            borderRadius:    '10px',
                            color:           creating ? 'rgba(212,175,55,0.5)' : '#1a1000',
                            fontSize:        '1.05rem',
                            fontWeight:      '900',
                            letterSpacing:   '0.08em',
                            textTransform:   'uppercase',
                            cursor:          creating ? 'not-allowed' : 'pointer',
                            boxShadow:       creating
                                ? 'none'
                                : '0 0 20px rgba(212,175,55,0.35), 0 4px 12px rgba(0,0,0,0.5)',
                            transition:      'all 0.2s ease',
                            minWidth:        '220px',
                            textAlign:       'center',
                        }}
                        onMouseEnter={e => {
                            if (!creating) {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                    '0 0 32px rgba(212,175,55,0.55), 0 6px 20px rgba(0,0,0,0.6)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!creating) {
                                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                    '0 0 20px rgba(212,175,55,0.35), 0 4px 12px rgba(0,0,0,0.5)';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {creating ? '⏳  Forging your legend…' : '⚔  Create Character'}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .summary-footer {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        padding: 0.75rem 1rem !important;
                        gap: 0.75rem !important;
                    }
                    
                    .summary-footer > button {
                        width: 100% !important;
                    }
                    
                    .summary-footer-right {
                        width: 100% !important;
                        align-items: stretch !important;
                    }
                    
                    .summary-footer-right p {
                        text-align: center !important;
                    }
                    
                    .summary-footer-right button {
                        width: 100% !important;
                        min-width: 0 !important;
                        padding: 0.85rem 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}
