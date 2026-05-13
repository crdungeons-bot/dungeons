'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter }         from 'next/navigation';
import {
    useCharacterCreationStore,
    useCharacterCreationHydrated,
} from '@/stores/character-creation-store';
import { useShallow } from 'zustand/react/shallow';

/* ═══════════════════════════════════════════════════════════════════
   Static skill data,   all 18 D&D 5e skills grouped by ability score
═══════════════════════════════════════════════════════════════════ */

const ABILITY_GROUPS = [
    {
        ability: 'STR', full: 'Strength',
        color: 'rgba(228,90,74,0.85)',
        skills: [
            { index: 'skill-athletics', name: 'Athletics' },
        ],
    },
    {
        ability: 'DEX', full: 'Dexterity',
        color: 'rgba(228,160,74,0.85)',
        skills: [
            { index: 'skill-acrobatics',      name: 'Acrobatics'      },
            { index: 'skill-sleight-of-hand', name: 'Sleight of Hand' },
            { index: 'skill-stealth',         name: 'Stealth'         },
        ],
    },
    {
        ability: 'INT', full: 'Intelligence',
        color: 'rgba(93,142,232,0.85)',
        skills: [
            { index: 'skill-arcana',         name: 'Arcana'         },
            { index: 'skill-history',        name: 'History'        },
            { index: 'skill-investigation',  name: 'Investigation'  },
            { index: 'skill-nature',         name: 'Nature'         },
            { index: 'skill-religion',       name: 'Religion'       },
        ],
    },
    {
        ability: 'WIS', full: 'Wisdom',
        color: 'rgba(80,200,100,0.85)',
        skills: [
            { index: 'skill-animal-handling', name: 'Animal Handling' },
            { index: 'skill-insight',         name: 'Insight'         },
            { index: 'skill-medicine',        name: 'Medicine'        },
            { index: 'skill-perception',      name: 'Perception'      },
            { index: 'skill-survival',        name: 'Survival'        },
        ],
    },
    {
        ability: 'CHA', full: 'Charisma',
        color: 'rgba(193,93,232,0.85)',
        skills: [
            { index: 'skill-deception',    name: 'Deception'    },
            { index: 'skill-intimidation', name: 'Intimidation' },
            { index: 'skill-performance',  name: 'Performance'  },
            { index: 'skill-persuasion',   name: 'Persuasion'   },
        ],
    },
] as const;

/* ═══════════════════════════════════════════════════════════════════
   Types
═══════════════════════════════════════════════════════════════════ */

type Source = 'Race' | 'Class' | 'Background';

// Loose type for raw D&D API JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiJson = Record<string, any> | null;

type ChoiceGroup = {
    source: Source;
    choose: number;
    pool:   string[]; // skill indices available to pick from
};

function normalizeSavedProficiencies(raw: unknown): string[] {
    if (Array.isArray(raw)) return raw.filter((p): p is string => typeof p === 'string');
    if (typeof raw === 'string') return raw.split(',').filter(Boolean);
    return [];
}

function buildSelectionsForGroups(
    groups: ChoiceGroup[],
    lockedMap: Map<string, Source[]>,
    savedProficiencies: string[],
): Set<string>[] {
    const initial = groups.map(() => new Set<string>());
    const lockedKeys = new Set(lockedMap.keys());
    const userChosen = savedProficiencies.filter(p => !lockedKeys.has(p));
    for (const prof of userChosen) {
        for (let i = 0; i < groups.length; i++) {
            const g = groups[i];
            if (g.pool.includes(prof) && initial[i].size < g.choose) {
                initial[i].add(prof);
                break;
            }
        }
    }
    return initial;
}

/* ═══════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════ */

function isSkill(index: string) { return index.startsWith('skill-'); }

function parseApiProfs(list: ApiJson[] | undefined): string[] {
    return (list ?? [])
        .filter((p) => p && p.index)
        .map((p) => p!.index as string);
}

function parseChoiceOptions(options: ApiJson[] | undefined): string[] {
    return (options ?? [])
        .filter((o) => o?.item && isSkill(o.item.index))
        .map((o) => o!.item.index as string);
}

/* ═══════════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════════ */

const SOURCE_COLORS: Record<Source, string> = {
    Race:       'rgba(228,160,74,0.9)',
    Class:      'rgba(93,142,232,0.9)',
    Background: 'rgba(80,200,100,0.9)',
};

function SourceBadge({ source }: { source: Source }) {
    return (
        <span style={{
            display:       'inline-block',
            padding:       '0.05rem 0.35rem',
            borderRadius:  '999px',
            fontSize:      '0.55rem',
            fontWeight:    '800',
            letterSpacing: '0.08em',
            color:         'var(--color-primary)',
            backgroundColor: SOURCE_COLORS[source],
            lineHeight:    '1.6',
        }}>
            {source === 'Background' ? 'BG' : source.slice(0,2).toUpperCase()}
        </span>
    );
}

function ProfBubble({
    filled,
    interactive,
    abilityColor,
}: {
    filled: boolean;
    interactive: boolean;
    abilityColor: string;
}) {
    return (
        <div style={{
            width:        '16px',
            height:       '16px',
            borderRadius: '50%',
            flexShrink:   0,
            border:       `2px solid ${filled
                ? abilityColor
                : interactive
                    ? 'rgba(212,175,55,0.45)'
                    : 'rgba(255,255,255,0.12)'}`,
            backgroundColor: filled ? abilityColor : 'transparent',
            transition:   'background-color 0.15s, border-color 0.15s',
            boxShadow:    filled ? `0 0 6px ${abilityColor}55` : 'none',
        }} />
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════════ */

export default function ProficiencyStep() {
    const router = useRouter();
    const hydrated = useCharacterCreationHydrated();
    const draft = useCharacterCreationStore(useShallow((s) => s.draft));
    const patchDraft = useCharacterCreationStore((s) => s.patchDraft);
    const [raceApiData, setRaceApiData] = useState<ApiJson>(null);
    const [classApiData, setClassApiData] = useState<ApiJson>(null);
    const [bgData, setBgData] = useState<ApiJson>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loadingRaceClass, setLoadingRaceClass] = useState(false);

    useEffect(() => {
        if (!hydrated) return;
        const bg = draft.background;
        if (!bg) {
            setBgData(null);
            return;
        }

        fetch(`/api/resources/backgrounds/${bg}`)
            .then(res => res.json())
            .then(data => setBgData(data))
            .catch(err => {
                console.error('Failed to fetch background:', err);
                setBgData(null);
            });
    }, [hydrated, draft.background]);

    // Load race + class JSON from API (needed when user jumps to this step — server no longer passes Mongo docs)
    useEffect(() => {
        if (!hydrated) return;
        const { race, dndClass } = draft;
        if (!race || !dndClass) {
            setRaceApiData(null);
            setClassApiData(null);
            setApiError(null);
            setLoadingRaceClass(false);
            return;
        }

        let cancelled = false;
        setApiError(null);
        setLoadingRaceClass(true);

        Promise.all([
            fetch(`/api/resources/races?index=${encodeURIComponent(race)}`).then(r => r.json()),
            fetch(`/api/resources/classes?index=${encodeURIComponent(dndClass)}`).then(r => r.json()),
        ])
            .then(([raceJson, classJson]) => {
                if (cancelled) return;
                const rRow = raceJson?.results?.[0] ?? null;
                const cRow = classJson?.results?.[0] ?? null;
                setRaceApiData(rRow);
                setClassApiData(cRow);
                if (!rRow || !cRow) {
                    setApiError('Could not load race or class details. Try again from Race and Class.');
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setApiError('Could not load race or class data. Check your connection and try again.');
                    setRaceApiData(null);
                    setClassApiData(null);
                }
            })
            .finally(() => {
                if (!cancelled) setLoadingRaceClass(false);
            });

        return () => {
            cancelled = true;
        };
    }, [hydrated, draft.race, draft.dndClass]);

    /* ── Derive locked proficiencies ── */
    const { lockedMap, choiceGroups } = useMemo(() => {
        const locked = new Map<string, Source[]>();

        const addLocked = (indices: string[], source: Source) => {
            for (const idx of indices) {
                if (!locked.has(idx)) locked.set(idx, []);
                locked.get(idx)!.push(source);
            }
        };

        // Race locked skills
        addLocked(parseApiProfs(raceApiData?.starting_proficiencies), 'Race');

        // Class locked skills
        addLocked(parseApiProfs(classApiData?.proficiencies), 'Class');

        // Background locked skills
        if (bgData) {
            addLocked(parseApiProfs(bgData?.starting_proficiencies), 'Background');
        }

        // Build choice groups
        const groups: ChoiceGroup[] = [];

        // Race choices (e.g. Half-Elf chooses 2 from any)
        const raceChoiceCount = raceApiData?.starting_proficiency_options?.choose ?? 0;
        const raceChoicePool  = parseChoiceOptions(
            raceApiData?.starting_proficiency_options?.from?.options
        );
        if (raceChoiceCount > 0 && raceChoicePool.length > 0) {
            groups.push({ source: 'Race', choose: raceChoiceCount, pool: raceChoicePool });
        }

        // Class choices (e.g. Fighter chooses 2 from a list)
        for (const choice of (classApiData?.proficiency_choices ?? [])) {
            const count = choice?.choose ?? 0;
            const pool  = parseChoiceOptions(choice?.from?.options);
            if (count > 0 && pool.length > 0) {
                groups.push({ source: 'Class', choose: count, pool });
                break; // most classes only have one relevant choice group
            }
        }

        return { lockedMap: locked, choiceGroups: groups };
    }, [raceApiData, classApiData, bgData]);

    /* ── User selection state,   one selected-set per choice group ── */
    const [selections, setSelections] = useState<Set<string>[]>([]);
    const [restoredFromDraft, setRestoredFromDraft] = useState(false);

    // Restore selections from draft.proficiencies on mount/hydration
    useEffect(() => {
        if (!hydrated || restoredFromDraft) return;
        if (choiceGroups.length === 0) return;

        const profList = normalizeSavedProficiencies(draft.proficiencies);
        const restored = buildSelectionsForGroups(choiceGroups, lockedMap, profList);
        setSelections(restored);
        setRestoredFromDraft(true);
    }, [hydrated, choiceGroups, lockedMap, draft.proficiencies, restoredFromDraft]);

    /* ── Which skills are in ANY available choice pool ── */
    const inPool = useMemo(() => {
        const s = new Set<string>();
        for (const g of choiceGroups) g.pool.forEach(i => s.add(i));
        return s;
    }, [choiceGroups]);

    /* ── All confirmed proficiencies (locked + selected) ── */
    const allProfs = useMemo(() => {
        const s = new Set<string>(lockedMap.keys());
        for (const sel of selections) {
            if (sel) sel.forEach(i => s.add(i));
        }
        return s;
    }, [lockedMap, selections]);

    /* ── Choice group counts ── */
    const groupsRemaining = choiceGroups.map((g, i) => g.choose - (selections[i]?.size ?? 0));
    const totalRemaining  = groupsRemaining.reduce((a, b) => a + b, 0);
    const canContinue     = totalRemaining === 0;

    /* ── Handle bubble click ── */
    function handleClick(skillIndex: string) {
        if (lockedMap.has(skillIndex)) return; // locked,   no interaction

        // Find which groups include this skill in their pool
        const eligibleGroups = choiceGroups
            .map((g, i) => ({ g, i }))
            .filter(({ g }) => g.pool.includes(skillIndex));

        if (eligibleGroups.length === 0) return;

        setSelections(prev => {
            const next = choiceGroups.map((_, i) => new Set(prev[i] ?? []));

            // If already selected in any group, deselect it
            for (const { i } of eligibleGroups) {
                if (next[i].has(skillIndex)) {
                    next[i].delete(skillIndex);
                    return next;
                }
            }

            // Try to assign to the first group with space remaining
            for (const { g, i } of eligibleGroups) {
                const alreadyInOther = next.some((s, j) => j !== i && s.has(skillIndex));
                if (!alreadyInOther && next[i].size < g.choose) {
                    next[i].add(skillIndex);
                    return next;
                }
            }

            return next;
        });
    }

    /* ── Navigation (fixed 8-step flow) ── */
    function handleBack() {
        router.push('/create-character?step=4');
    }

    function handleContinue() {
        if (!canContinue) return;
        patchDraft({ proficiencies: [...allProfs] });
        router.push('/create-character?step=6');
    }

    if (!hydrated) {
        return (
            <div style={{
                flex:            1,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         '2rem',
                color:           'rgba(212,175,55,0.6)',
                fontSize:        '0.95rem',
            }}>
                Loading…
            </div>
        );
    }

    if (!draft.race || !draft.dndClass) {
        return (
            <div style={{ flex: 1, padding: '2rem', maxWidth: '520px', margin: '0 auto' }}>
                <p style={{ color: 'rgba(244,232,208,0.75)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Choose a <strong style={{ color: 'var(--color-gold)' }}>race</strong> and{' '}
                    <strong style={{ color: 'var(--color-gold)' }}>class</strong> before picking proficiencies.
                    Your selections are saved in this browser until you finish or exit.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={() => router.push('/create-character?step=1')}
                        style={{
                            padding:       '0.55rem 1.1rem',
                            borderRadius:  '8px',
                            border:        '1.5px solid rgba(212,175,55,0.35)',
                            background:    'rgba(212,175,55,0.08)',
                            color:         'var(--color-gold)',
                            fontWeight:    '700',
                            cursor:        'pointer',
                        }}
                    >
                        Go to Race
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/create-character?step=2')}
                        style={{
                            padding:       '0.55rem 1.1rem',
                            borderRadius:  '8px',
                            border:        '1.5px solid rgba(212,175,55,0.35)',
                            background:    'rgba(212,175,55,0.08)',
                            color:         'var(--color-gold)',
                            fontWeight:    '700',
                            cursor:        'pointer',
                        }}
                    >
                        Go to Class
                    </button>
                </div>
            </div>
        );
    }

    if (apiError) {
        return (
            <div style={{ flex: 1, padding: '2rem', maxWidth: '520px', margin: '0 auto' }}>
                <p style={{ color: 'rgba(228,90,74,0.95)', marginBottom: '1rem' }}>{apiError}</p>
                <button
                    type="button"
                    onClick={() => router.push('/create-character?step=2')}
                    style={{
                        padding:       '0.55rem 1.1rem',
                        borderRadius:  '8px',
                        border:        '1.5px solid rgba(212,175,55,0.35)',
                        background:    'transparent',
                        color:         'rgba(212,175,55,0.85)',
                        fontWeight:    '700',
                        cursor:        'pointer',
                    }}
                >
                    ← Back to Class
                </button>
            </div>
        );
    }

    if (loadingRaceClass || !raceApiData || !classApiData) {
        return (
            <div style={{
                flex:            1,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         '2rem',
                color:           'rgba(212,175,55,0.65)',
                fontSize:        '0.95rem',
            }}>
                Loading skill options…
            </div>
        );
    }

    /* ── Render ── */
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                {/* ── Intro ── */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <p style={{
                        margin:     '0 0 0.4rem',
                        color:      'rgba(244,232,208,0.6)',
                        fontSize:   '0.9rem',
                        lineHeight: '1.6',
                    }}>
                        Proficiencies marked with a badge are granted automatically by your
                        race, class, or background,   they cannot be changed.{' '}
                        {totalRemaining > 0
                            ? `Choose ${totalRemaining} more skill${totalRemaining > 1 ? 's' : ''} from the highlighted options below.`
                            : 'All your proficiency choices have been made!'}
                    </p>
                </div>

                {/* ── Choice group banners (only if choices exist) ── */}
                {choiceGroups.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
                        {choiceGroups.map((g, i) => {
                            const remaining = g.choose - (selections[i]?.size ?? 0);
                            return (
                                <div key={i} style={{
                                    flex:          '1',
                                    minWidth:      '180px',
                                    padding:       '0.7rem 1rem',
                                    borderRadius:  '10px',
                                    border:        `1.5px solid ${remaining > 0 ? 'rgba(212,175,55,0.35)' : 'rgba(80,200,100,0.35)'}`,
                                    background:    remaining > 0
                                        ? 'rgba(212,175,55,0.05)'
                                        : 'rgba(80,200,100,0.05)',
                                    display:       'flex',
                                    alignItems:    'center',
                                    justifyContent:'space-between',
                                    gap:           '0.5rem',
                                }}>
                                    <div>
                                        <p style={{
                                            margin:        0,
                                            fontSize:      '0.6rem',
                                            fontWeight:    '800',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                            color:         SOURCE_COLORS[g.source],
                                        }}>{g.source} Bonus Skills</p>
                                        <p style={{
                                            margin:     '0.15rem 0 0',
                                            fontSize:   '0.82rem',
                                            color:      'rgba(244,232,208,0.75)',
                                        }}>
                                            Choose <strong style={{ color: '#fff' }}>{g.choose}</strong> from the available options
                                        </p>
                                    </div>
                                    <div style={{
                                        width:        '42px',
                                        height:       '42px',
                                        borderRadius: '50%',
                                        border:       `2px solid ${remaining > 0 ? 'rgba(212,175,55,0.4)' : 'rgba(80,200,100,0.5)'}`,
                                        display:      'flex',
                                        alignItems:   'center',
                                        justifyContent: 'center',
                                        flexShrink:   0,
                                    }}>
                                        <span style={{
                                            fontSize:   '1.1rem',
                                            fontWeight: '800',
                                            color:      remaining > 0 ? 'var(--color-gold)' : 'rgba(80,200,100,0.9)',
                                        }}>
                                            {remaining > 0 ? remaining : '✓'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Skill grid ── */}
                <div style={{
                    display:             'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap:                 '1.25rem',
                    alignItems:          'start',
                }}>
                    {ABILITY_GROUPS.map(group => (
                        <div key={group.ability} style={{
                            background:   'rgba(0,0,0,0.35)',
                            border:       `1px solid rgba(255,255,255,0.07)`,
                            borderRadius: '10px',
                            overflow:     'hidden',
                        }}>
                            {/* Ability header */}
                            <div style={{
                                padding:         '0.5rem 0.9rem',
                                background:      `linear-gradient(90deg, ${group.color}22 0%, transparent 100%)`,
                                borderBottom:    `1px solid ${group.color}33`,
                                display:         'flex',
                                alignItems:      'center',
                                gap:             '0.5rem',
                            }}>
                                <span style={{
                                    fontSize:      '0.65rem',
                                    fontWeight:    '900',
                                    letterSpacing: '0.15em',
                                    color:         group.color,
                                }}>{group.ability}</span>
                                <span style={{
                                    fontSize:   '0.7rem',
                                    color:      'rgba(244,232,208,0.35)',
                                    fontWeight: '500',
                                }}>{group.full}</span>
                            </div>

                            {/* Skills */}
                            <div style={{ padding: '0.35rem 0' }}>
                                {group.skills.map(skill => {
                                    const isLocked     = lockedMap.has(skill.index);
                                    const sources      = lockedMap.get(skill.index) ?? [];
                                    const isChosen     = selections.some(s => s.has(skill.index));
                                    const isFilled     = isLocked || isChosen;
                                    const isSelectable = !isLocked && inPool.has(skill.index);
                                    const isUnavailable= !isLocked && !inPool.has(skill.index);

                                    return (
                                        <div
                                            key={skill.index}
                                            onClick={() => isSelectable && handleClick(skill.index)}
                                            style={{
                                                display:     'flex',
                                                alignItems:  'center',
                                                gap:         '0.6rem',
                                                padding:     '0.45rem 0.9rem',
                                                cursor:      isSelectable ? 'pointer' : 'default',
                                                opacity:     isUnavailable ? 0.35 : 1,
                                                transition:  'background-color 0.1s',
                                                borderRadius:'4px',
                                                margin:      '0 0.3rem',
                                            }}
                                            onMouseEnter={e => {
                                                if (isSelectable)
                                                    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.05)';
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <ProfBubble
                                                filled={isFilled}
                                                interactive={isSelectable}
                                                abilityColor={group.color}
                                            />
                                            <span style={{
                                                flex:       1,
                                                fontSize:   '0.82rem',
                                                fontWeight: isFilled ? '600' : '400',
                                                color:      isFilled ? '#fff' : 'rgba(244,232,208,0.55)',
                                            }}>
                                                {skill.name}
                                            </span>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {sources.map(src => (
                                                    <SourceBadge key={src} source={src} />
                                                ))}
                                                {isChosen && (
                                                    <span style={{
                                                        display:       'inline-block',
                                                        padding:       '0.05rem 0.35rem',
                                                        borderRadius:  '999px',
                                                        fontSize:      '0.55rem',
                                                        fontWeight:    '800',
                                                        letterSpacing: '0.08em',
                                                        color:         'var(--color-primary)',
                                                        backgroundColor: 'rgba(212,175,55,0.85)',
                                                        lineHeight:    '1.6',
                                                    }}>PICK</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ height: '4rem' }} />
            </div>

            {/* ── Footer ── */}
            <div className="proficiency-footer" style={{
                position:        'sticky',
                bottom:          0,
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
                padding:         '0.9rem 2rem',
                backgroundColor: 'var(--color-primary-dark)',
                borderTop:       '1px solid rgba(212,175,55,0.15)',
                gap:             '1rem',
                zIndex:          10,
            }}>
                <button
                    onClick={handleBack}
                    style={{
                        padding:       '0.65rem 1.25rem',
                        background:    'transparent',
                        border:        '1.5px solid rgba(212,175,55,0.3)',
                        borderRadius:  '8px',
                        color:         'rgba(212,175,55,0.7)',
                        fontSize:      '0.82rem',
                        fontWeight:    '700',
                        cursor:        'pointer',
                        letterSpacing: '0.04em',
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
                    ← Background
                </button>

                <div className="proficiency-footer-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {totalRemaining > 0 && (
                        <p style={{
                            margin:     0,
                            fontSize:   '0.78rem',
                            color:      'rgba(212,175,55,0.6)',
                            fontStyle:  'italic',
                        }}>
                            {totalRemaining} choice{totalRemaining !== 1 ? 's' : ''} remaining
                        </p>
                    )}

                    <button
                        onClick={handleContinue}
                        disabled={!canContinue}
                        style={{
                            padding:       '0.65rem 1.5rem',
                            background:    canContinue
                                ? 'linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%)'
                                : 'rgba(212,175,55,0.15)',
                            border:        `1.5px solid ${canContinue ? 'rgba(255,220,100,0.5)' : 'rgba(212,175,55,0.2)'}`,
                            borderRadius:  '8px',
                            color:         canContinue ? '#1a1000' : 'rgba(212,175,55,0.35)',
                            fontSize:      '0.88rem',
                            fontWeight:    '800',
                            letterSpacing: '0.04em',
                            cursor:        canContinue ? 'pointer' : 'not-allowed',
                            transition:    'all 0.15s',
                        }}
                    >
                        Continue to Story →
                    </button>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .proficiency-footer {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        padding: 0.75rem 1rem !important;
                        gap: 0.75rem !important;
                    }
                    
                    .proficiency-footer > button {
                        width: 100% !important;
                    }
                    
                    .proficiency-footer-right {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 0.5rem !important;
                    }
                    
                    .proficiency-footer-right p {
                        text-align: center !important;
                    }
                    
                    .proficiency-footer-right button {
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
}
