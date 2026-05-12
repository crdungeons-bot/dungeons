'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ── Constants & utilities ─────────────────────────────────────────────────────

const STATS = [
    { key: 'str', label: 'STR', full: 'Strength' },
    { key: 'dex', label: 'DEX', full: 'Dexterity' },
    { key: 'con', label: 'CON', full: 'Constitution' },
    { key: 'int', label: 'INT', full: 'Intelligence' },
    { key: 'wis', label: 'WIS', full: 'Wisdom' },
    { key: 'cha', label: 'CHA', full: 'Charisma' },
] as const;

type StatKey = typeof STATS[number]['key'];

type RollResult = {
    dice: number[];     // all 4 dice values
    droppedIdx: number; // index of the lowest die (dropped)
    total: number;
};

function rollStat(): RollResult {
    const dice = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    const min = Math.min(...dice);
    const droppedIdx = dice.indexOf(min);
    const total = dice.reduce((sum, d, i) => (i === droppedIdx ? sum : sum + d), 0);
    return { dice, droppedIdx, total };
}

function rollAll(): RollResult[] {
    return Array.from({ length: 6 }, rollStat);
}

function getMod(score: number): string {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
}

type Mode = 'choose' | 'rolled' | 'manual';
type AssignMap = Record<StatKey, number | null>; // stat → roll index (or null)

const EMPTY_ASSIGN: AssignMap = {
    str: null, dex: null, con: null, int: null, wis: null, cha: null,
};
const EMPTY_MANUAL: Record<StatKey, string> = {
    str: '', dex: '', con: '', int: '', wis: '', cha: '',
};

// ── Sub-components ────────────────────────────────────────────────────────────

/** One rolled-values chip in the pool */
function RollChip({
    result,
    idx,
    isSelected,
    isAssigned,
    onClick,
}: {
    result: RollResult;
    idx: number;
    isSelected: boolean;
    isAssigned: boolean;
    onClick: () => void;
}) {
    return (
        <button
            key={idx}
            onClick={onClick}
            title={isAssigned ? 'Click to un-assign' : isSelected ? 'Click again to deselect' : 'Click to select, then click a stat'}
            style={{
                background: isSelected
                    ? 'var(--color-gold)'
                    : isAssigned
                        ? 'rgba(212,175,55,0.06)'
                        : 'rgba(212,175,55,0.1)',
                border: `2px solid ${isSelected ? 'var(--color-gold)' : isAssigned ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.35)'}`,
                borderRadius: '0.5rem',
                padding: '0.625rem 0.875rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem',
                opacity: isAssigned && !isSelected ? 0.45 : 1,
                transition: 'all 0.15s',
                minWidth: '72px',
            }}
        >
            {/* Total */}
            <span style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: isSelected ? 'var(--color-primary)' : 'var(--color-gold)',
                lineHeight: 1,
            }}>
                {result.total}
            </span>
            {/* Individual dice */}
            <div style={{ display: 'flex', gap: '0.2rem' }}>
                {result.dice.map((d, di) => (
                    <span key={di} style={{
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        color: di === result.droppedIdx
                            ? (isSelected ? 'rgba(10,5,2,0.35)' : 'rgba(212,175,55,0.25)')
                            : (isSelected ? 'rgba(10,5,2,0.75)' : 'rgba(212,175,55,0.65)'),
                        textDecoration: di === result.droppedIdx ? 'line-through' : 'none',
                    }}>
                        {d}
                    </span>
                ))}
            </div>
        </button>
    );
}

/** Animated roll chip during the rolling animation */
function AnimChip({ animDice }: { animDice: number[] }) {
    const total = animDice.slice(1).reduce((a, b) => a + b, 0); // drop first (lowest-ish)
    return (
        <div style={{
            background: 'rgba(212,175,55,0.07)',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '0.5rem',
            padding: '0.625rem 0.875rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            minWidth: '72px',
            animation: 'pulse 0.5s ease-in-out infinite alternate',
        }}>
            <span style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: 'rgba(212,175,55,0.4)',
                lineHeight: 1,
            }}>
                {total}
            </span>
            <div style={{ display: 'flex', gap: '0.2rem' }}>
                {animDice.map((d, i) => (
                    <span key={i} style={{
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        color: 'rgba(212,175,55,0.25)',
                    }}>
                        {d}
                    </span>
                ))}
            </div>
        </div>
    );
}

/** One stat assignment card (roll mode) */
function StatCard({
    stat,
    value,
    isReadyToReceive,
    onClick,
}: {
    stat: typeof STATS[number];
    value: number | null;
    isReadyToReceive: boolean; // a chip is selected, this slot is a valid target
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);

    const bgColor = value !== null
        ? 'rgba(212,175,55,0.08)'
        : isReadyToReceive && hovered
            ? 'rgba(212,175,55,0.12)'
            : 'rgba(212,175,55,0.03)';

    const borderColor = value !== null
        ? 'rgba(212,175,55,0.4)'
        : isReadyToReceive
            ? hovered ? 'var(--color-gold)' : 'rgba(212,175,55,0.35)'
            : 'rgba(212,175,55,0.15)';

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={
                value !== null
                    ? 'Click to un-assign'
                    : isReadyToReceive
                        ? `Assign here`
                        : stat.full
            }
            style={{
                background: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '0.5rem',
                padding: '1.25rem 0.75rem',
                cursor: isReadyToReceive || value !== null ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.15s',
                outline: isReadyToReceive && hovered ? '2px solid rgba(212,175,55,0.3)' : 'none',
                outlineOffset: '2px',
            }}
        >
            <span style={{
                fontSize: '0.62rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: value !== null ? 'rgba(212,175,55,0.6)' : 'rgba(212,175,55,0.3)',
            }}>
                {stat.full}
            </span>
            <span style={{
                fontSize: '2.25rem',
                fontWeight: '900',
                color: value !== null ? 'var(--color-gold)' : 'rgba(212,175,55,0.18)',
                lineHeight: 1,
                minHeight: '2.5rem',
                display: 'flex',
                alignItems: 'center',
            }}>
                {value ?? ', '}
            </span>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: value !== null ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.15)',
            }}>
                {value !== null ? getMod(value) : ', '}
            </span>
            <span style={{
                fontSize: '0.7rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                color: value !== null ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.2)',
            }}>
                {stat.label}
            </span>
        </button>
    );
}

/** One stat input card (manual mode) */
function StatInputCard({
    stat,
    value,
    onChange,
}: {
    stat: typeof STATS[number];
    value: string;
    onChange: (v: string) => void;
}) {
    const num = parseInt(value);
    const valid = !isNaN(num) && num >= 1 && num <= 30;

    return (
        <div style={{
            background: 'rgba(212,175,55,0.05)',
            border: `2px solid ${value && !valid ? 'rgba(200,60,60,0.5)' : valid ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
            borderRadius: '0.5rem',
            padding: '1.25rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'border-color 0.15s',
        }}>
            <span style={{
                fontSize: '0.62rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(212,175,55,0.5)',
            }}>
                {stat.full}
            </span>
            <input
                type="number"
                min={1}
                max={30}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder=", "
                style={{
                    width: '64px',
                    textAlign: 'center',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '2.25rem',
                    fontWeight: '900',
                    color: valid ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)',
                    lineHeight: 1,
                    fontFamily: 'inherit',
                    padding: 0,
                    MozAppearance: 'textfield' as never,
                }}
            />
            <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: valid ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.15)',
            }}>
                {valid ? getMod(num) : ', '}
            </span>
            <span style={{
                fontSize: '0.7rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                color: valid ? 'rgba(212,175,55,0.8)' : 'rgba(212,175,55,0.2)',
            }}>
                {stat.label}
            </span>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

type StatsStepProps = {
    race?: string;
    dndClass?: string;
    subclass?: string;
    name?: string;
    background?: string;
    alignment?: string;
    height?: string;
    weight?: string;
    age?: string;
    proficiencies?: string;
};

export default function StatsStep(props: StatsStepProps) {
    const router = useRouter();

    const [mode, setMode]               = useState<Mode>('choose');
    const [isRolling, setIsRolling]     = useState(false);
    const [rolled, setRolled]           = useState<RollResult[]>([]);
    const [rerolled, setRerolled]       = useState(false);

    // Roll assignment state
    const [statToRoll, setStatToRoll]   = useState<AssignMap>({ ...EMPTY_ASSIGN });
    const [selectedPool, setSelected]   = useState<number | null>(null); // which roll chip is "held"

    // Manual entry state
    const [manualStats, setManual]      = useState<Record<StatKey, string>>({ ...EMPTY_MANUAL });

    // Animation: rapidly changing dice during roll sequence
    const [animDice, setAnimDice]       = useState<number[][]>([]);

    // Kick off the dice animation while isRolling
    useEffect(() => {
        if (!isRolling) return;
        const id = setInterval(() => {
            setAnimDice(Array.from({ length: 6 }, () =>
                Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
            ));
        }, 80);
        return () => clearInterval(id);
    }, [isRolling]);

    const executeRoll = useCallback(() => {
        setIsRolling(true);
        setStatToRoll({ ...EMPTY_ASSIGN });
        setSelected(null);
        setTimeout(() => {
            setRolled(rollAll());
            setIsRolling(false);
            setMode('rolled');
        }, 1400);
    }, []);

    const handleReroll = () => {
        setRerolled(true);
        setIsRolling(true);
        setMode('rolled');
        setStatToRoll({ ...EMPTY_ASSIGN });
        setSelected(null);
        setTimeout(() => {
            setRolled(rollAll());
            setIsRolling(false);
        }, 1400);
    };

    // Which roll indices are currently assigned to some stat
    const assignedIndices = new Set(
        Object.values(statToRoll).filter((v): v is number => v !== null)
    );

    const handlePoolClick = (idx: number) => {
        if (selectedPool === idx) {
            setSelected(null);
            return;
        }
        // If this chip is assigned to a stat, un-assign it
        const newMap = { ...statToRoll };
        for (const key of Object.keys(newMap) as StatKey[]) {
            if (newMap[key] === idx) newMap[key] = null;
        }
        setStatToRoll(newMap);
        setSelected(idx);
    };

    const handleStatClick = (statKey: StatKey) => {
        if (selectedPool !== null) {
            // Place the held chip here
            const newMap = { ...statToRoll };
            // Remove held chip from wherever it was
            for (const key of Object.keys(newMap) as StatKey[]) {
                if (newMap[key] === selectedPool) newMap[key] = null;
            }
            // Slot already filled? The displaced chip just returns to the unselected pool
            newMap[statKey] = selectedPool;
            setStatToRoll(newMap);
            setSelected(null);
        } else if (statToRoll[statKey] !== null) {
            // Pick up the chip from this stat
            const rollIdx = statToRoll[statKey]!;
            setStatToRoll({ ...statToRoll, [statKey]: null });
            setSelected(rollIdx);
        }
    };

    // Readiness checks
    const allAssigned    = STATS.every(s => statToRoll[s.key] !== null);
    const allManualValid = STATS.every(s => {
        const n = parseInt(manualStats[s.key]);
        return !isNaN(n) && n >= 1 && n <= 30;
    });
    // User must choose a mode first, then complete it
    const canContinue    = mode === 'choose'  ? false :
                           mode === 'rolled'  ? allAssigned  :
                           mode === 'manual'  ? allManualValid :
                           false;

    // Determine correct step numbers based on whether class has level 1 subclass
    const LEVEL_1_SUBCLASS_CLASSES = ['cleric', 'warlock'];
    const needsSubclassStep = props.dndClass && LEVEL_1_SUBCLASS_CLASSES.includes(props.dndClass);
    const prevStepNumber = needsSubclassStep ? '6' : '5';
    const nextStepNumber = needsSubclassStep ? '8' : '7';

    const handleBack = () => {
        const params = new URLSearchParams({ step: prevStepNumber });
        const { race, dndClass, subclass, name, background, alignment, height, weight, age, proficiencies } = props;
        if (race)           params.set('race',          race);
        if (dndClass)       params.set('class',         dndClass);
        if (subclass)       params.set('subclass',      subclass);
        if (name)           params.set('name',          name);
        if (background)     params.set('background',    background);
        if (alignment)      params.set('alignment',     alignment);
        if (height)         params.set('height',        height);
        if (weight)         params.set('weight',        weight);
        if (age)            params.set('age',           age);
        if (proficiencies)  params.set('proficiencies', proficiencies);
        router.push(`/create-character?${params.toString()}`);
    };

    const handleContinue = () => {
        // Collect final stat values
        const finalStats: Record<StatKey, number> = {} as Record<StatKey, number>;
        if (mode === 'rolled') {
            for (const s of STATS) {
                finalStats[s.key] = rolled[statToRoll[s.key]!].total;
            }
        } else {
            for (const s of STATS) {
                finalStats[s.key] = parseInt(manualStats[s.key]);
            }
        }

        // Save to localStorage (stats can be large with dice details)
        if (typeof window !== 'undefined') {
            localStorage.setItem('char_stats', JSON.stringify(finalStats));
        }

        // Navigate to review / save step
        const params = new URLSearchParams({ step: nextStepNumber });
        const { race, dndClass, subclass, name, background, alignment, height, weight, age, proficiencies } = props;
        if (race)           params.set('race',          race);
        if (dndClass)       params.set('class',         dndClass);
        if (subclass)       params.set('subclass',      subclass);
        if (name)           params.set('name',          name);
        if (background)     params.set('background',    background);
        if (alignment)      params.set('alignment',     alignment);
        if (height)         params.set('height',        height);
        if (weight)         params.set('weight',        weight);
        if (age)            params.set('age',           age);
        if (proficiencies)  params.set('proficiencies', proficiencies);
        router.push(`/create-character?${params.toString()}`);
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="stats-content" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                {/* ── MODE: CHOOSE ───────────────────────────────── */}
                {mode === 'choose' && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        gap: '2rem',
                    }}>
                        {/* Roll option */}
                        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                            <button
                                onClick={executeRoll}
                                style={{
                                    backgroundColor: 'var(--color-gold)',
                                    color: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '1.1rem 2.75rem',
                                    fontSize: '1.2rem',
                                    fontWeight: '900',
                                    letterSpacing: '0.04em',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 24px rgba(212,175,55,0.35)',
                                    transition: 'opacity 0.15s, transform 0.15s',
                                    marginBottom: '0.75rem',
                                    display: 'block',
                                    width: '100%',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.opacity = '0.9';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.opacity = '1';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                🎲 Roll Your Stats!
                            </button>
                            <p style={{
                                color: 'rgba(244,232,208,0.45)',
                                fontSize: '0.825rem',
                                fontStyle: 'italic',
                                lineHeight: '1.65',
                                margin: 0,
                            }}>
                                Roll 4d6, drop the lowest die,   repeated 6 times. Then assign each result to a stat of your choice.
                            </p>
                        </div>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '360px' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
                            <span style={{ color: 'rgba(212,175,55,0.3)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>
                                OR
                            </span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(212,175,55,0.15)' }} />
                        </div>

                        {/* Manual option */}
                        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                            <button
                                onClick={() => setMode('manual')}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1.5px solid rgba(212,175,55,0.3)',
                                    borderRadius: '0.5rem',
                                    padding: '0.75rem 2rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: 'rgba(212,175,55,0.7)',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    marginBottom: '0.625rem',
                                    display: 'block',
                                    width: '100%',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
                                    e.currentTarget.style.color = 'var(--color-gold)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                                    e.currentTarget.style.color = 'rgba(212,175,55,0.7)';
                                }}
                            >
                                Enter Stats Manually
                            </button>
                            <p style={{
                                color: 'rgba(244,232,208,0.3)',
                                fontSize: '0.8rem',
                                fontStyle: 'italic',
                                margin: 0,
                                lineHeight: '1.6',
                            }}>
                                Already rolled your dice at the table? Type your values directly.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── MODE: ROLLING (animation) or ROLLED ─────────── */}
                {(mode === 'rolled' || (mode === 'choose' && isRolling)) && (
                    <div>
                        {/* Section: rolled values pool */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.875rem' }}>
                                <div>
                                    <p style={{
                                        color: 'rgba(212,175,55,0.5)',
                                        fontSize: '0.63rem',
                                        fontWeight: '800',
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        margin: '0 0 0.25rem',
                                    }}>
                                        Rolled Values
                                    </p>
                                    <p style={{
                                        color: 'rgba(244,232,208,0.4)',
                                        fontSize: '0.82rem',
                                        fontStyle: 'italic',
                                        margin: 0,
                                    }}>
                                        {isRolling
                                            ? 'Rolling…'
                                            : selectedPool !== null
                                                ? `${rolled[selectedPool].total} selected,   now click a stat below to assign it`
                                                : allAssigned
                                                    ? '✓ All stats assigned!'
                                                    : 'Click a value to pick it up, then click a stat slot to place it'}
                                    </p>
                                </div>

                                {!isRolling && !rerolled && mode === 'rolled' && (
                                    <button
                                        onClick={handleReroll}
                                        style={{
                                            padding: '0.45rem 0.875rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid rgba(212,175,55,0.3)',
                                            backgroundColor: 'transparent',
                                            color: 'rgba(212,175,55,0.6)',
                                            fontSize: '0.78rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            flexShrink: 0,
                                        }}
                                    >
                                        ↺ Reroll All
                                    </button>
                                )}
                            </div>

                            {/* The chips */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                                {isRolling
                                    ? animDice.map((dice, i) => <AnimChip key={i} animDice={dice} />)
                                    : rolled.map((r, i) => (
                                        <RollChip
                                            key={i}
                                            result={r}
                                            idx={i}
                                            isSelected={selectedPool === i}
                                            isAssigned={assignedIndices.has(i)}
                                            onClick={() => handlePoolClick(i)}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        {/* Section: stat cards */}
                        {!isRolling && (
                            <div>
                                <p style={{
                                    color: 'rgba(212,175,55,0.5)',
                                    fontSize: '0.63rem',
                                    fontWeight: '800',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    margin: '0 0 0.875rem',
                                }}>
                                    Stat Assignment
                                </p>
                                <div 
                                    className="stat-grid"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(6, 1fr)',
                                        gap: '0.625rem',
                                    }}
                                >
                                    {STATS.map(stat => {
                                        const rollIdx = statToRoll[stat.key];
                                        const value   = rollIdx !== null ? rolled[rollIdx].total : null;
                                        return (
                                            <StatCard
                                                key={stat.key}
                                                stat={stat}
                                                value={value}
                                                isReadyToReceive={selectedPool !== null}
                                                onClick={() => handleStatClick(stat.key)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── MODE: MANUAL ──────────────────────────────────── */}
                {mode === 'manual' && (
                    <div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <p style={{
                                color: 'rgba(212,175,55,0.5)',
                                fontSize: '0.63rem',
                                fontWeight: '800',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                margin: '0 0 0.375rem',
                            }}>
                                Manual Entry
                            </p>
                            <p style={{
                                color: 'rgba(244,232,208,0.4)',
                                fontSize: '0.85rem',
                                fontStyle: 'italic',
                                margin: 0,
                            }}>
                                Enter any value between 1 and 30. The modifier will calculate automatically.
                            </p>
                        </div>

                        <div 
                            className="stat-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(6, 1fr)',
                                gap: '0.625rem',
                            }}
                        >
                            {STATS.map(stat => (
                                <StatInputCard
                                    key={stat.key}
                                    stat={stat}
                                    value={manualStats[stat.key]}
                                    onChange={v => setManual(prev => ({ ...prev, [stat.key]: v }))}
                                />
                            ))}
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={() => { setMode('choose'); setManual({ ...EMPTY_MANUAL }); }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(212,175,55,0.4)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    fontStyle: 'italic',
                                    padding: 0,
                                }}
                            >
                                ← Switch to dice rolling instead
                            </button>
                        </div>
                    </div>
                )}

                <div style={{ height: '5rem' }} />
            </div>

            {/* ── Sticky footer ── */}
            <div className="stats-footer" style={{
                flexShrink: 0,
                borderTop: '1px solid rgba(212,175,55,0.25)',
                backgroundColor: 'rgba(10,5,2,0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '0.875rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <div className="stats-footer-left" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '0.375rem',
                            border: '1px solid rgba(212,175,55,0.25)',
                            backgroundColor: 'transparent',
                            color: 'rgba(212,175,55,0.55)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        &#8592; Story
                    </button>

                    {/* Stat total summary once values exist */}
                    {(allAssigned || allManualValid) && (
                        <div className="stats-summary" style={{ display: 'flex', gap: '1rem' }}>
                            {STATS.map(s => {
                                const val = mode === 'rolled'
                                    ? (statToRoll[s.key] !== null ? rolled[statToRoll[s.key]!].total : null)
                                    : parseInt(manualStats[s.key]);
                                if (!val) return null;
                                return (
                                    <div key={s.key} style={{ textAlign: 'center' }}>
                                        <p style={{ color: 'rgba(212,175,55,0.45)', fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.1em', margin: '0 0 0.1rem', textTransform: 'uppercase' }}>
                                            {s.label}
                                        </p>
                                        <p style={{ color: 'var(--color-gold)', fontWeight: '800', fontSize: '0.95rem', margin: 0 }}>
                                            {val} <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{getMod(val)}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    style={{
                        padding: '0.7rem 1.75rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        backgroundColor: canContinue ? 'var(--color-gold)' : 'rgba(212,175,55,0.2)',
                        color: canContinue ? 'var(--color-primary)' : 'rgba(212,175,55,0.3)',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        cursor: canContinue ? 'pointer' : 'not-allowed',
                        whiteSpace: 'nowrap',
                        transition: 'background-color 0.2s, color 0.2s',
                    }}
                >
                    Finish &#8594;
                </button>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .stat-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .stats-content {
                        padding: 1rem !important;
                    }
                    
                    .stat-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.5rem !important;
                    }
                    
                    .stats-footer {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        padding: 0.75rem 1rem !important;
                        gap: 0.75rem !important;
                    }
                    
                    .stats-footer-left {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 0.75rem !important;
                    }
                    
                    .stats-footer-left button {
                        width: 100% !important;
                    }
                    
                    .stats-summary {
                        display: none !important;
                    }
                    
                    .stats-footer > button {
                        width: 100% !important;
                        padding: 0.75rem 1rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .stat-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
}
