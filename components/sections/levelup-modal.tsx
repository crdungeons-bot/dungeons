'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   D&D 5e constants
═══════════════════════════════════════════════════════════════════ */

const HIT_DICE: Record<string, number> = {
    barbarian: 12,
    fighter: 10, paladin: 10, ranger: 10,
    bard: 8, cleric: 8, druid: 8, monk: 8, rogue: 8, warlock: 8,
    sorcerer: 6, wizard: 6,
};

// Levels at which each class gets an ASI (Ability Score Improvement)
const ASI_LEVELS: Record<string, number[]> = {
    fighter:  [4, 6, 8, 12, 14, 16, 19],
    rogue:    [4, 8, 10, 12, 16, 18],
    _default: [4, 8, 12, 16, 19],
};

function getAsiLevels(charClass: string): number[] {
    return ASI_LEVELS[charClass] ?? ASI_LEVELS._default;
}

const STAT_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
type StatKey = typeof STAT_KEYS[number];
type Stats   = Record<StatKey, number>;

const STAT_LABELS: Record<StatKey, string> = {
    str: 'Strength', dex: 'Dexterity', con: 'Constitution',
    int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma',
};

function getMod(score: number): string {
    const m = Math.floor((score - 10) / 2);
    return m >= 0 ? `+${m}` : `${m}`;
}
function getModNum(score: number): number {
    return Math.floor((score - 10) / 2);
}

/* ═══════════════════════════════════════════════════════════════════
   Types
═══════════════════════════════════════════════════════════════════ */

export type LevelUpCharacter = {
    id: string;
    name: string;
    class: string;
    race: string;
    level: number;
    hp: number | null;
    stats: Stats;
};

type Step = 'announce' | 'hp' | 'asi' | 'features' | 'summary';

type LevelUpResult = {
    level: number;
    hp: number;
    stats: Stats;
};

/* ═══════════════════════════════════════════════════════════════════
   CSS keyframe injection
═══════════════════════════════════════════════════════════════════ */

const KEYFRAMES = `
@keyframes lu-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@keyframes lu-scale-up {
    0%   { opacity: 0; transform: scale(0.4); }
    60%  { opacity: 1; transform: scale(1.1); }
    100% { transform: scale(1); }
}
@keyframes lu-glow-pulse {
    0%, 100% { text-shadow: 0 0 20px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3); }
    50%       { text-shadow: 0 0 40px rgba(212,175,55,1),   0 0 100px rgba(212,175,55,0.6), 0 0 160px rgba(212,175,55,0.3); }
}
@keyframes lu-particle {
    0%   { opacity: 1; transform: translate(0,0) scale(1); }
    100% { opacity: 0; transform: var(--lu-dx, 80px), var(--lu-dy, -80px) scale(0); }
}
@keyframes lu-particle-fly {
    0%   { opacity: 0.9; transform: translate(0px, 0px) scale(1); }
    80%  { opacity: 0.6; }
    100% { opacity: 0;   transform: translate(var(--lu-tx), var(--lu-ty)) scale(0.3); }
}
@keyframes lu-rays {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}
@keyframes lu-slide-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
}
@keyframes lu-slide-in-right {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
}
@keyframes lu-dice-roll {
    0%   { transform: rotateX(0deg)   rotateY(0deg);   }
    20%  { transform: rotateX(360deg) rotateY(180deg); }
    40%  { transform: rotateX(180deg) rotateY(360deg); }
    60%  { transform: rotateX(270deg) rotateY(90deg);  }
    80%  { transform: rotateX(90deg)  rotateY(270deg); }
    100% { transform: rotateX(0deg)   rotateY(0deg);   }
}
@keyframes lu-num-tick {
    0%   { opacity: 0; transform: translateY(-8px); }
    15%  { opacity: 1; transform: translateY(0); }
    85%  { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(8px); }
}
@keyframes lu-bounce {
    0%, 100% { transform: scale(1);    }
    30%       { transform: scale(1.25); }
    60%       { transform: scale(0.92); }
}
@keyframes lu-shine {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
}
@keyframes lu-level-counter {
    0%   { opacity: 0; transform: scale(0.2) rotate(-15deg); }
    50%  { opacity: 1; transform: scale(1.15) rotate(5deg); }
    75%  { transform: scale(0.97) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); }
}
@keyframes lu-bar-fill {
    from { width: 0%; }
    to   { width: 100%; }
}
`;

/* ═══════════════════════════════════════════════════════════════════
   Particle burst
═══════════════════════════════════════════════════════════════════ */

function ParticleBurst({ active }: { active: boolean }) {
    const particles = useMemo(() => (
        Array.from({ length: 32 }, (_, i) => {
            const angle   = (i / 32) * Math.PI * 2;
            const dist    = 90 + Math.random() * 140;
            const tx      = Math.round(Math.cos(angle) * dist);
            const ty      = Math.round(Math.sin(angle) * dist);
            const size    = 3 + Math.random() * 6;
            const delay   = Math.random() * 0.4;
            const dur     = 0.7 + Math.random() * 0.5;
            const colors  = ['#D4AF37','#FFD700','#FFF8DC','#F0C040','#FF6B00'];
            const color   = colors[Math.floor(Math.random() * colors.length)];
            return { tx, ty, size, delay, dur, color };
        })
    ), []);

    if (!active) return null;

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none', zIndex: 5 }}>
            {particles.map((p, i) => (
                <div key={i} style={{
                    position:        'absolute',
                    width:           `${p.size}px`,
                    height:          `${p.size}px`,
                    borderRadius:    '50%',
                    backgroundColor: p.color,
                    top:             `-${p.size / 2}px`,
                    left:            `-${p.size / 2}px`,
                    boxShadow:       `0 0 ${p.size * 2}px ${p.color}`,
                    // @ts-expect-error css custom properties
                    '--lu-tx':       `${p.tx}px`,
                    '--lu-ty':       `${p.ty}px`,
                    animation:       `lu-particle-fly ${p.dur}s ${p.delay}s ease-out forwards`,
                }} />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Step 1: Announcement
═══════════════════════════════════════════════════════════════════ */

function AnnounceScreen({ char, newLevel, onNext }: {
    char: LevelUpCharacter; newLevel: number; onNext: () => void;
}) {
    const [showParticles, setShowParticles] = useState(false);
    const [phase, setPhase] = useState<'pre' | 'text' | 'level' | 'ready'>('pre');

    useEffect(() => {
        const t1 = setTimeout(() => { setPhase('text'); setShowParticles(true); }, 200);
        const t2 = setTimeout(() => setPhase('level'), 800);
        const t3 = setTimeout(() => setPhase('ready'), 1600);
        const t4 = setTimeout(() => onNext(), 3500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            onClick={phase === 'ready' ? onNext : undefined}
            style={{
                position:       'relative',
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                minHeight:      '100%',
                padding:        '3rem 2rem',
                cursor:         phase === 'ready' ? 'pointer' : 'default',
                overflow:       'hidden',
                textAlign:      'center',
                userSelect:     'none',
            }}
        >
            {/* Rotating rays background */}
            <div style={{
                position:        'absolute',
                inset:           '-50%',
                background:      'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.06) 10deg, transparent 20deg, transparent 40deg, rgba(212,175,55,0.04) 50deg, transparent 60deg)',
                animation:       'lu-rays 12s linear infinite',
                pointerEvents:   'none',
            }} />

            {/* Radial glow */}
            <div style={{
                position:      'absolute',
                inset:         0,
                background:    'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <ParticleBurst active={showParticles} />

            {/* "LEVEL UP!" text */}
            {phase !== 'pre' && (
                <div style={{
                    animation:     'lu-slide-up 0.5s ease-out forwards',
                    marginBottom:  '1.5rem',
                    position:      'relative',
                    zIndex:        10,
                }}>
                    <p style={{
                        margin:        0,
                        fontSize:      'clamp(0.9rem, 3vw, 1.1rem)',
                        fontWeight:    '800',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color:         'rgba(212,175,55,0.6)',
                        marginBottom:  '0.5rem',
                    }}>
                        {char.name}
                    </p>
                    <p style={{
                        margin:        0,
                        fontSize:      'clamp(2.5rem, 8vw, 4.5rem)',
                        fontWeight:    '900',
                        letterSpacing: '0.08em',
                        color:         '#FFD700',
                        animation:     'lu-glow-pulse 1.5s ease-in-out infinite',
                        lineHeight:    1,
                        background:    'linear-gradient(135deg, #FFD700 0%, #FFF8DC 40%, #D4AF37 70%, #FFD700 100%)',
                        backgroundSize:'200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor:  'transparent',
                        backgroundClip:       'text',
                    }}>
                        LEVEL UP!
                    </p>
                </div>
            )}

            {/* New level number */}
            {phase === 'level' || phase === 'ready' ? (
                <div style={{
                    position:   'relative',
                    zIndex:     10,
                    animation:  'lu-level-counter 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}>
                    <div style={{
                        width:          '140px',
                        height:         '140px',
                        borderRadius:   '50%',
                        border:         '3px solid rgba(212,175,55,0.4)',
                        background:     'radial-gradient(ellipse at 40% 35%, rgba(212,175,55,0.18) 0%, rgba(0,0,0,0.6) 70%)',
                        display:        'flex',
                        flexDirection:  'column',
                        alignItems:     'center',
                        justifyContent: 'center',
                        boxShadow:      '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1), inset 0 0 30px rgba(212,175,55,0.05)',
                        position:       'relative',
                    }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.6)', marginBottom: '0.1rem' }}>LEVEL</span>
                        <span style={{ fontSize: '4rem', fontWeight: '900', color: '#FFD700', lineHeight: 1, textShadow: '0 0 20px rgba(212,175,55,0.8)' }}>{newLevel}</span>
                    </div>
                </div>
            ) : (
                <div style={{ width: '140px', height: '140px' }} />
            )}

            {phase === 'ready' && (
                <p style={{
                    marginTop:     '2rem',
                    fontSize:      '0.78rem',
                    color:         'rgba(244,232,208,0.35)',
                    letterSpacing: '0.1em',
                    animation:     'lu-fade-in 0.5s ease-out forwards',
                    position:      'relative',
                    zIndex:        10,
                }}>
                    Click to continue
                </p>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Step 2: HP Roll
═══════════════════════════════════════════════════════════════════ */

function HPScreen({ char, newLevel, onAccept }: {
    char: LevelUpCharacter; newLevel: number; onAccept: (hpGain: number) => void;
}) {
    const hitDie      = HIT_DICE[char.class] ?? 8;
    const conMod      = getModNum(char.stats.con ?? 10);
    const avgRoll     = Math.floor(hitDie / 2) + 1;
    const avgGain     = Math.max(1, avgRoll + conMod);

    const [rolling,   setRolling]   = useState(false);
    const [rolled,    setRolled]    = useState<number | null>(null);
    const [displayNum, setDisplay]  = useState<number>(hitDie);
    const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null);

    const startRoll = () => {
        if (rolling || rolled !== null) return;
        setRolling(true);

        let ticks = 0;
        const totalTicks = 18;
        intervalRef.current = setInterval(() => {
            setDisplay(Math.floor(Math.random() * hitDie) + 1);
            ticks++;
            if (ticks >= totalTicks) {
                clearInterval(intervalRef.current!);
                const result = Math.floor(Math.random() * hitDie) + 1;
                setDisplay(result);
                setRolled(result);
                setRolling(false);
            }
        }, 60);
    };

    useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

    const gain = rolled !== null ? Math.max(1, rolled + conMod) : null;

    return (
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center', animation: 'lu-fade-in 0.4s ease-out' }}>

            <div>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>
                    Roll for Hit Points
                </p>
                <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>
                    Level {newLevel} {char.class.charAt(0).toUpperCase() + char.class.slice(1)}
                </p>
            </div>

            {/* Die face */}
            <div
                onClick={rolled === null ? startRoll : undefined}
                style={{
                    width:          '140px',
                    height:         '140px',
                    background:     'rgba(0,0,0,0.6)',
                    border:         `3px solid ${rolling ? 'rgba(212,175,55,0.8)' : rolled !== null ? 'rgba(80,200,100,0.7)' : 'rgba(212,175,55,0.3)'}`,
                    borderRadius:   '20px',
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    cursor:         rolled !== null ? 'default' : 'pointer',
                    boxShadow:      rolling
                        ? '0 0 30px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.08)'
                        : rolled !== null
                            ? '0 0 30px rgba(80,200,100,0.3)'
                            : '0 0 20px rgba(212,175,55,0.1)',
                    transform:      'perspective(400px)',
                    animation:      rolling ? 'lu-dice-roll 0.36s ease-in-out infinite' : undefined,
                    transition:     'border-color 0.25s, box-shadow 0.25s',
                    userSelect:     'none',
                }}
            >
                <span style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', marginBottom: '0.2rem' }}>d{hitDie}</span>
                <span style={{
                    fontSize:   '3.5rem',
                    fontWeight: '900',
                    lineHeight: 1,
                    color:      rolled !== null ? 'rgba(80,200,100,0.95)' : rolling ? '#FFD700' : 'rgba(244,232,208,0.5)',
                    textShadow: rolling ? '0 0 15px rgba(212,175,55,0.6)' : undefined,
                    transition: 'color 0.2s',
                }}>
                    {displayNum}
                </span>
            </div>

            {/* Calculation breakdown */}
            {rolled !== null && gain !== null && (
                <div style={{ animation: 'lu-scale-up 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards', background: 'rgba(80,200,100,0.08)', border: '1px solid rgba(80,200,100,0.25)', borderRadius: '12px', padding: '1rem 1.5rem', minWidth: '220px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>
                        <span style={{ color: 'rgba(244,232,208,0.7)' }}>{rolled}</span>
                        <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.9rem' }}> (roll) </span>
                        <span style={{ color: 'rgba(244,232,208,0.4)' }}>+</span>
                        <span style={{ color: conMod >= 0 ? 'rgba(80,200,100,0.9)' : 'rgba(220,80,80,0.9)' }}>{conMod >= 0 ? `+${conMod}` : conMod}</span>
                        <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.9rem' }}>(CON)</span>
                        <span style={{ color: 'rgba(244,232,208,0.4)' }}>=</span>
                        <span style={{ color: 'rgba(80,200,100,0.95)', fontSize: '1.3rem' }}>+{gain} HP</span>
                    </div>
                    {gain === 1 && rolled + conMod < 1 && (
                        <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic' }}>Minimum 1 HP gained per level.</p>
                    )}
                </div>
            )}

            {/* Stat info row */}
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'rgba(244,232,208,0.45)' }}>
                <span>Hit Die: <strong style={{ color: 'rgba(212,175,55,0.7)' }}>d{hitDie}</strong></span>
                <span>CON Mod: <strong style={{ color: conMod >= 0 ? 'rgba(80,200,100,0.7)' : 'rgba(220,80,80,0.7)' }}>{getMod(char.stats.con ?? 10)}</strong></span>
                <span>Average: <strong style={{ color: 'rgba(244,232,208,0.6)' }}>+{avgGain}</strong></span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: '280px' }}>
                {rolled === null ? (
                    <>
                        <button
                            onClick={startRoll}
                            disabled={rolling}
                            style={{
                                padding:         '0.8rem 1.5rem',
                                background:      'linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(240,200,80,0.9) 50%, rgba(212,175,55,0.9) 100%)',
                                border:          'none',
                                borderRadius:    '10px',
                                color:           '#1a1206',
                                fontSize:        '0.95rem',
                                fontWeight:      '800',
                                cursor:          rolling ? 'default' : 'pointer',
                                letterSpacing:   '0.05em',
                                boxShadow:       '0 4px 20px rgba(212,175,55,0.3)',
                                opacity:         rolling ? 0.7 : 1,
                                transition:      'opacity 0.15s',
                            }}
                        >
                            {rolling ? 'Rolling…' : '🎲 Roll the Die'}
                        </button>
                        <button
                            onClick={() => onAccept(avgGain)}
                            style={{
                                padding:       '0.65rem 1.5rem',
                                background:    'transparent',
                                border:        '1px solid rgba(212,175,55,0.25)',
                                borderRadius:  '10px',
                                color:         'rgba(244,232,208,0.5)',
                                fontSize:      '0.82rem',
                                cursor:        'pointer',
                            }}
                        >
                            Take Average (+{avgGain} HP)
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onAccept(gain!)}
                        style={{
                            padding:         '0.8rem 1.5rem',
                            background:      'linear-gradient(135deg, rgba(80,200,100,0.9) 0%, rgba(100,220,120,0.9) 50%, rgba(80,200,100,0.9) 100%)',
                            border:          'none',
                            borderRadius:    '10px',
                            color:           '#0d1f12',
                            fontSize:        '0.95rem',
                            fontWeight:      '800',
                            cursor:          'pointer',
                            boxShadow:       '0 4px 20px rgba(80,200,100,0.3)',
                            animation:       'lu-bounce 0.5s ease-out',
                        }}
                    >
                        Accept +{gain} HP →
                    </button>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Step 3: Ability Score Improvement
═══════════════════════════════════════════════════════════════════ */

function ASIScreen({ stats, onAccept }: {
    stats: Stats; onAccept: (newStats: Stats) => void;
}) {
    const [mode,     setMode]     = useState<'double' | 'split'>('double');
    const [statA,    setStatA]    = useState<StatKey | null>(null);
    const [statB,    setStatB]    = useState<StatKey | null>(null);

    const newStats = useMemo((): Stats => {
        const s = { ...stats };
        if (mode === 'double' && statA) {
            s[statA] = Math.min(20, s[statA] + 2);
        } else if (mode === 'split') {
            if (statA) s[statA] = Math.min(20, s[statA] + 1);
            if (statB) s[statB] = Math.min(20, s[statB] + 1);
        }
        return s;
    }, [stats, mode, statA, statB]);

    const isValid = mode === 'double' ? statA !== null : (statA !== null && statB !== null && statA !== statB);

    const handleStatClick = (key: StatKey) => {
        if (mode === 'double') {
            setStatA(key);
        } else {
            if (statA === null)        { setStatA(key); return; }
            if (statA === key)         { setStatA(statB); setStatB(null); return; }
            if (statB === null)        { setStatB(key); return; }
            if (statB === key)         { setStatB(null); return; }
            setStatA(key); setStatB(null);
        }
    };

    const isSelected = (key: StatKey) => key === statA || (mode === 'split' && key === statB);
    const gainFor    = (key: StatKey) => isSelected(key) ? (mode === 'double' ? 2 : 1) : 0;

    return (
        <div style={{ padding: '2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'lu-fade-in 0.4s ease-out' }}>

            <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Ability Score Improvement</p>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>Choose how to improve your character</p>
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.82rem', color: 'rgba(244,232,208,0.4)', fontStyle: 'italic' }}>Ability scores cannot exceed 20.</p>
            </div>

            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {(['double','split'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setStatA(null); setStatB(null); }} style={{
                        padding:       '0.55rem 1.25rem',
                        background:    mode === m ? 'rgba(212,175,55,0.15)' : 'transparent',
                        border:        `1.5px solid ${mode === m ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.2)'}`,
                        borderRadius:  '8px',
                        color:         mode === m ? 'var(--color-gold)' : 'rgba(244,232,208,0.4)',
                        fontSize:      '0.82rem',
                        fontWeight:    mode === m ? '700' : '400',
                        cursor:        'pointer',
                    }}>
                        {m === 'double' ? '+2 to One Stat' : '+1 to Two Stats'}
                    </button>
                ))}
            </div>

            {/* Stat grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {STAT_KEYS.map(key => {
                    const current  = stats[key] ?? 10;
                    const capped   = current >= 20;
                    const selected = isSelected(key);
                    const gain     = gainFor(key);

                    return (
                        <button
                            key={key}
                            onClick={() => !capped && handleStatClick(key)}
                            style={{
                                padding:       '0.9rem 0.5rem',
                                background:    selected ? 'rgba(212,175,55,0.12)' : 'rgba(0,0,0,0.4)',
                                border:        `2px solid ${selected ? 'rgba(212,175,55,0.7)' : capped ? 'rgba(255,255,255,0.06)' : 'rgba(212,175,55,0.15)'}`,
                                borderRadius:  '10px',
                                cursor:        capped ? 'not-allowed' : 'pointer',
                                display:       'flex',
                                flexDirection: 'column',
                                alignItems:    'center',
                                gap:           '0.2rem',
                                opacity:       capped ? 0.4 : 1,
                                transition:    'all 0.15s',
                                boxShadow:     selected ? '0 0 15px rgba(212,175,55,0.2)' : 'none',
                                position:      'relative',
                                overflow:      'hidden',
                            }}
                        >
                            {selected && (
                                <div style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(212,175,55,0.8)', color: '#000', borderRadius: '50%', width: '16px', height: '16px', fontSize: '0.7rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    +{gain}
                                </div>
                            )}
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.55)' }}>
                                {key.toUpperCase()}
                            </span>
                            <span style={{ fontSize: '2rem', fontWeight: '900', lineHeight: 1, color: selected ? '#FFD700' : '#fff', transition: 'color 0.15s' }}>
                                {gain > 0 ? current + gain : current}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(244,232,208,0.4)' }}>
                                {getMod(gain > 0 ? current + gain : current)}
                            </span>
                            {gain === 0 && (
                                <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.25)' }}>
                                    {STAT_LABELS[key].slice(0, 3)}
                                </span>
                            )}
                            {capped && (
                                <span style={{ fontSize: '0.6rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic' }}>MAX</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => isValid && onAccept(newStats)}
                disabled={!isValid}
                style={{
                    padding:       '0.8rem',
                    background:    isValid
                        ? 'linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(240,200,80,0.9) 50%, rgba(212,175,55,0.9) 100%)'
                        : 'rgba(255,255,255,0.05)',
                    border:        'none',
                    borderRadius:  '10px',
                    color:         isValid ? '#1a1206' : 'rgba(255,255,255,0.2)',
                    fontSize:      '0.9rem',
                    fontWeight:    '800',
                    cursor:        isValid ? 'pointer' : 'not-allowed',
                    boxShadow:     isValid ? '0 4px 20px rgba(212,175,55,0.3)' : 'none',
                    transition:    'all 0.2s',
                }}
            >
                {isValid ? 'Confirm Improvement →' : mode === 'double' ? 'Select a stat' : 'Select two different stats'}
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Step 4: New Features
═══════════════════════════════════════════════════════════════════ */

function FeaturesScreen({ charClass, charRace, newLevel, onNext, onFeaturesLoaded }: {
    charClass: string; charRace: string; newLevel: number;
    onNext: () => void;
    onFeaturesLoaded: (count: number) => void;
}) {
    const [features, setFeatures] = useState<{ name: string; type?: string; actionType: string; description: string }[]>([]);
    const [loadingFeatures, setLoadingFeatures] = useState(true);

    useEffect(() => {
        const url = `/api/resources/spells-abilities?class=${encodeURIComponent(charClass)}&race=${encodeURIComponent(charRace)}&levelGained=${newLevel}`;
        fetch(url)
            .then(r => r.json())
            .then(data => {
                const entries = (data.entries ?? []).filter((e: { type?: string }) =>
                    e.type === 'class-ability' || e.type === 'racial-ability'
                );
                setFeatures(entries);
                onFeaturesLoaded(entries.length);
                setLoadingFeatures(false);
            })
            .catch(() => { setLoadingFeatures(false); onFeaturesLoaded(0); });
    }, [charClass, charRace, newLevel]); // eslint-disable-line react-hooks/exhaustive-deps

    const TYPE_COLOR = { 'class-ability': 'rgba(212,175,55,0.8)', 'racial-ability': 'rgba(80,200,100,0.8)' } as const;

    if (loadingFeatures) {
        return (
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'lu-fade-in 0.4s ease-out' }}>
                <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                    <p style={{ margin: '0 0 0.3rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Level {newLevel} Features</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic' }}>Consulting the ancient tomes…</p>
                </div>
                {[1, 2].map(i => (
                    <div key={i} style={{ height: '80px', background: 'rgba(212,175,55,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.1)', animation: 'lu-pulse 1.4s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
                ))}
                <style>{`@keyframes lu-pulse{0%,100%{opacity:.35}50%{opacity:.7}}`}</style>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'lu-fade-in 0.4s ease-out' }}>

            <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Level {newLevel} Features</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
                    {features.length > 0 ? `${features.length} New ${features.length === 1 ? 'Feature' : 'Features'} Unlocked!` : 'Ready to level up!'}
                </p>
            </div>

            {features.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
                    {features.map((f, i) => (
                        <div key={i} style={{
                            background:    f.type === 'class-ability' ? 'rgba(212,175,55,0.06)' : 'rgba(80,200,100,0.06)',
                            border:        `1px solid ${f.type === 'class-ability' ? 'rgba(212,175,55,0.2)' : 'rgba(80,200,100,0.2)'}`,
                            borderRadius:  '10px',
                            padding:       '1rem 1.15rem',
                            animation:     `lu-slide-in-right 0.4s ${i * 0.1}s ease-out both`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#fff' }}>{f.name}</span>
                                <span style={{ fontSize: '0.6rem', fontWeight: '700', background: `${TYPE_COLOR[f.type as keyof typeof TYPE_COLOR] ?? 'rgba(200,200,200,0.7)'}22`, color: TYPE_COLOR[f.type as keyof typeof TYPE_COLOR] ?? 'rgba(200,200,200,0.7)', borderRadius: '999px', padding: '0.05rem 0.5rem', border: `1px solid ${TYPE_COLOR[f.type as keyof typeof TYPE_COLOR] ?? 'rgba(200,200,200,0.3)'}55` }}>
                                    {f.type === 'class-ability' ? 'Class Feature' : 'Racial Feature'}
                                </span>
                                {f.actionType && f.actionType !== 'passive' && (
                                    <span style={{ fontSize: '0.6rem', color: 'rgba(244,232,208,0.4)' }}>
                                        {f.actionType.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </span>
                                )}
                            </div>
                            <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.65', color: 'rgba(244,232,208,0.7)', fontStyle: 'italic' }}>
                                {f.description.replace(/\*\*(.*?)\*\*/g, '$1').slice(0, 240)}{f.description.length > 240 ? '…' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                    No new class features at this level — but your power grows all the same.
                </div>
            )}

            <button
                onClick={onNext}
                style={{
                    padding:       '0.8rem',
                    background:    'linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(240,200,80,0.9) 50%, rgba(212,175,55,0.9) 100%)',
                    border:        'none',
                    borderRadius:  '10px',
                    color:         '#1a1206',
                    fontSize:      '0.9rem',
                    fontWeight:    '800',
                    cursor:        'pointer',
                    boxShadow:     '0 4px 20px rgba(212,175,55,0.3)',
                }}
            >
                Continue →
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Step 5: Summary + Confirm
═══════════════════════════════════════════════════════════════════ */

function SummaryScreen({ char, newLevel, hpGain, newHp, statsChanged, newStats, newFeatureCount, onConfirm, saving }: {
    char: LevelUpCharacter;
    newLevel: number;
    hpGain: number;
    newHp: number;
    statsChanged: boolean;
    newStats: Stats;
    newFeatureCount: number;
    onConfirm: () => void;
    saving: boolean;
}) {
    const changedStats = STAT_KEYS.filter(k => newStats[k] !== char.stats[k]);

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'lu-fade-in 0.4s ease-out' }}>

            <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Ready to Level Up</p>
                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
                    {char.name} → Level {newLevel}
                </p>
            </div>

            {/* Changes list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {/* HP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: 'rgba(80,200,100,0.07)', border: '1px solid rgba(80,200,100,0.2)', borderRadius: '9px' }}>
                    <span style={{ fontSize: '1.1rem' }}>❤️</span>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: '#fff' }}>+{hpGain} Hit Points</p>
                        <p style={{ margin: 0, fontSize: '0.73rem', color: 'rgba(244,232,208,0.45)' }}>
                            {char.hp !== null ? `${char.hp} → ${newHp} max HP` : `Starting at ${newHp} max HP`}
                        </p>
                    </div>
                </div>

                {/* ASI changes */}
                {changedStats.map(k => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '9px' }}>
                        <span style={{ fontSize: '1.1rem' }}>⬆️</span>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: '#fff' }}>
                                {STAT_LABELS[k]}: {char.stats[k]} → {newStats[k]}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.73rem', color: 'rgba(244,232,208,0.45)' }}>
                                Modifier {getMod(char.stats[k])} → {getMod(newStats[k])}
                            </p>
                        </div>
                    </div>
                ))}

                {/* New features */}
                {newFeatureCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: 'rgba(93,142,232,0.07)', border: '1px solid rgba(93,142,232,0.2)', borderRadius: '9px' }}>
                        <span style={{ fontSize: '1.1rem' }}>✨</span>
                        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: '#fff' }}>
                            {newFeatureCount} new class/racial {newFeatureCount === 1 ? 'feature' : 'features'} unlocked
                        </p>
                    </div>
                )}

                {/* Level */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '9px' }}>
                    <span style={{ fontSize: '1.1rem' }}>🎖️</span>
                    <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-gold)' }}>
                        Level {char.level} → Level {newLevel}
                    </p>
                </div>
            </div>

            <button
                onClick={onConfirm}
                disabled={saving}
                style={{
                    padding:       '0.9rem',
                    background:    saving
                        ? 'rgba(212,175,55,0.3)'
                        : 'linear-gradient(135deg, rgba(212,175,55,0.95) 0%, rgba(255,215,0,0.95) 50%, rgba(212,175,55,0.95) 100%)',
                    border:        'none',
                    borderRadius:  '10px',
                    color:         saving ? 'rgba(255,255,255,0.4)' : '#1a1206',
                    fontSize:      '1rem',
                    fontWeight:    '900',
                    cursor:        saving ? 'default' : 'pointer',
                    boxShadow:     saving ? 'none' : '0 4px 25px rgba(212,175,55,0.4)',
                    letterSpacing: '0.04em',
                    transition:    'all 0.2s',
                }}
            >
                {saving ? 'Saving…' : `⚔ Confirm Level Up to ${newLevel}!`}
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Main modal
═══════════════════════════════════════════════════════════════════ */

export default function LevelUpModal({ char, onClose, onComplete }: {
    char: LevelUpCharacter;
    onClose: () => void;
    onComplete: (result: LevelUpResult) => void;
}) {
    const newLevel = char.level + 1;
    const isAsiLevel = getAsiLevels(char.class).includes(newLevel);

    // inject CSS keyframes once
    useEffect(() => {
        const el = document.createElement('style');
        el.id   = 'lu-keyframes';
        if (!document.getElementById('lu-keyframes')) {
            el.textContent = KEYFRAMES;
            document.head.appendChild(el);
        }
        return () => { const s = document.getElementById('lu-keyframes'); if (s) s.remove(); };
    }, []);

    const [step,         setStep]         = useState<Step>('announce');
    const [hpGain,       setHpGain]       = useState(0);
    const [newStats,     setNewStats]     = useState<Stats>({ ...char.stats });
    const [saving,       setSaving]       = useState(false);
    const [featureCount, setFeatureCount] = useState(0);

    const hitDie     = HIT_DICE[char.class] ?? 8;
    const conMod     = getModNum(char.stats.con ?? 10);
    const baseHp     = char.hp ?? (hitDie + Math.max(conMod, 0)); // existing or calculated level-1 hp
    const newHp      = baseHp + hpGain;
    const statsChanged = STAT_KEYS.some(k => newStats[k] !== char.stats[k]);

    const stepFlow: Step[] = useMemo(() => {
        const flow: Step[] = ['announce', 'hp'];
        if (isAsiLevel) flow.push('asi');
        flow.push('features', 'summary');
        return flow;
    }, [isAsiLevel]);

    const goNext = () => {
        const idx = stepFlow.indexOf(step);
        if (idx < stepFlow.length - 1) setStep(stepFlow[idx + 1]);
    };

    const handleConfirm = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/characters/${char.id}`, {
                method:  'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ level: newLevel, hp: newHp, stats: newStats }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Save failed');
            onComplete({ level: newLevel, hp: newHp, stats: newStats });
        } catch (e) {
            console.error(e);
            setSaving(false);
        }
    };

    return (
        /* Backdrop */
        <div
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position:        'fixed',
                inset:           0,
                zIndex:          1000,
                backgroundColor: 'rgba(5,3,2,0.92)',
                backdropFilter:  'blur(6px)',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         '1rem',
                animation:       'lu-fade-in 0.25s ease-out',
            }}
        >
            {/* Modal panel */}
            <div style={{
                width:           '100%',
                maxWidth:        '520px',
                maxHeight:       '90vh',
                overflowY:       'auto',
                background:      'linear-gradient(160deg, rgba(20,14,6,0.98) 0%, rgba(10,8,4,0.99) 100%)',
                border:          '1px solid rgba(212,175,55,0.25)',
                borderRadius:    '18px',
                boxShadow:       '0 20px 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.1)',
                position:        'relative',
                overflow:        'hidden',
            }}>
                {/* Top gold line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), rgba(255,215,0,0.9), rgba(212,175,55,0.7), transparent)' }} />

                {/* Close button */}
                {step !== 'announce' && (
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '12px', right: '14px', background: 'transparent', border: 'none', color: 'rgba(244,232,208,0.25)', fontSize: '1.2rem', cursor: 'pointer', zIndex: 20, lineHeight: 1, padding: '4px 8px', borderRadius: '6px' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,232,208,0.6)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,232,208,0.25)')}
                    >
                        ✕
                    </button>
                )}

                {/* Step indicator (skip for announce) */}
                {step !== 'announce' && (
                    <div style={{ padding: '1rem 1.5rem 0', display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                        {stepFlow.filter(s => s !== 'announce').map((s, i) => (
                            <div key={s} style={{
                                height:       '3px',
                                flex:         1,
                                borderRadius: '999px',
                                background:   stepFlow.indexOf(step) > stepFlow.indexOf(s)
                                    ? 'rgba(212,175,55,0.8)'
                                    : step === s
                                        ? 'rgba(212,175,55,0.5)'
                                        : 'rgba(255,255,255,0.07)',
                                transition:   'background 0.3s',
                                maxWidth:     '60px',
                            }} />
                        ))}
                    </div>
                )}

                {/* Step content */}
                {step === 'announce' && (
                    <AnnounceScreen char={char} newLevel={newLevel} onNext={goNext} />
                )}
                {step === 'hp' && (
                    <HPScreen
                        char={char}
                        newLevel={newLevel}
                        onAccept={gain => { setHpGain(gain); goNext(); }}
                    />
                )}
                {step === 'asi' && (
                    <ASIScreen
                        stats={newStats}
                        onAccept={s => { setNewStats(s); goNext(); }}
                    />
                )}
                {step === 'features' && (
                    <FeaturesScreen
                        charClass={char.class}
                        charRace={char.race}
                        newLevel={newLevel}
                        onNext={goNext}
                        onFeaturesLoaded={count => setFeatureCount(count)}
                    />
                )}
                {step === 'summary' && (
                    <SummaryScreen
                        char={char}
                        newLevel={newLevel}
                        hpGain={hpGain}
                        newHp={newHp}
                        statsChanged={statsChanged}
                        newStats={newStats}
                        newFeatureCount={featureCount}
                        onConfirm={handleConfirm}
                        saving={saving}
                    />
                )}
            </div>
        </div>
    );
}
