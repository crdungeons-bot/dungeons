'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Background } from '@/types/background';
import { useShallow } from 'zustand/react/shallow';
import {
    useCharacterCreationStore,
    useCharacterCreationHydrated,
} from '@/stores/character-creation-store';
import { characterCreationNeedsSubclassStep } from '@/lib/subclass-levels';

// Alias so internal code stays readable
type BgDetail = Background;

// ── Alignment data (hardcoded,   these never change in D&D 5e) ─────────────────

type Alignment = {
    id: string;
    label: string;
    abbr: string;
    desc: string;
};

const ALIGNMENTS: Alignment[] = [
    {
        id: 'lawful-good', label: 'Lawful Good', abbr: 'LG',
        desc: 'Principled and compassionate. Acts with a strict code and genuine care for others.',
    },
    {
        id: 'neutral-good', label: 'Neutral Good', abbr: 'NG',
        desc: 'Does the best they can without being bound by rules or chaos,   acts from the heart.',
    },
    {
        id: 'chaotic-good', label: 'Chaotic Good', abbr: 'CG',
        desc: 'Follows their conscience regardless of law. Values freedom and kindness above order.',
    },
    {
        id: 'lawful-neutral', label: 'Lawful Neutral', abbr: 'LN',
        desc: 'Order and tradition above all else,   not good or evil, just bound to a code.',
    },
    {
        id: 'true-neutral', label: 'True Neutral', abbr: 'N',
        desc: 'Acts without strong moral preference, maintaining balance or living for themselves.',
    },
    {
        id: 'chaotic-neutral', label: 'Chaotic Neutral', abbr: 'CN',
        desc: 'Values personal freedom above all. Follows whims, avoids authority, resists control.',
    },
    {
        id: 'lawful-evil', label: 'Lawful Evil', abbr: 'LE',
        desc: 'Uses order and structure as a tool for domination. Methodical, patient, and ruthless.',
    },
    {
        id: 'neutral-evil', label: 'Neutral Evil', abbr: 'NE',
        desc: 'Does whatever serves their interests. No loyalty to anyone,   utterly self-interested.',
    },
    {
        id: 'chaotic-evil', label: 'Chaotic Evil', abbr: 'CE',
        desc: 'Driven by destructive impulse and contempt for order. Dangerous, unpredictable, violent.',
    },
];

// ── Small shared helpers ──────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p style={{
            color: 'rgba(212,175,55,0.5)',
            fontSize: '0.63rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: '0 0 0.875rem',
        }}>
            {children}
        </p>
    );
}

function SectionDivider({ title }: { title: string }) {
    return (
        <div style={{ margin: '2rem 0 1.5rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <h2 style={{
                    color: 'var(--color-gold)',
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    margin: 0,
                    whiteSpace: 'nowrap',
                }}>
                    {title}
                </h2>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(212,175,55,0.3), rgba(212,175,55,0))',
                }} />
            </div>
        </div>
    );
}

// ── Background accordion row ──────────────────────────────────────────────────

function BackgroundAccordionRow({
    bg,
    isSelected,
    isExpanded,
    onToggle,
    onSelect,
}: {
    bg: BgDetail;
    isSelected: boolean;
    isExpanded: boolean;
    onToggle: () => void;
    onSelect: () => void;
}) {
    const skills = bg.skill_proficiencies.map(p => p.name.replace('Skill: ', ''));
    
    // Format ability scores for display
    const abilityScoreLabels: Record<string, string> = {
        str: 'STR', dex: 'DEX', con: 'CON',
        int: 'INT', wis: 'WIS', cha: 'CHA'
    };
    const abilityStr = bg.ability_scores.map(a => abilityScoreLabels[a] || a.toUpperCase()).join(', ');

    return (
        <div style={{
            borderRadius: '10px',
            border: `1.5px solid ${isSelected
                ? 'rgba(212,175,55,0.6)'
                : isExpanded
                    ? 'rgba(212,175,55,0.3)'
                    : 'rgba(212,175,55,0.14)'}`,
            background: isSelected
                ? 'rgba(212,175,55,0.06)'
                : 'rgba(0,0,0,0.25)',
            overflow: 'hidden',
            transition: 'border-color 0.2s',
            boxShadow: isSelected ? '0 0 16px rgba(212,175,55,0.1)' : 'none',
        }}>

            {/* ── Header row (always visible) ── */}
            <div
                onClick={onToggle}
                style={{
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '0.75rem',
                    padding:     '0.85rem 1rem',
                    cursor:      'pointer',
                    userSelect:  'none',
                }}
            >
                {/* Selection bubble */}
                <div style={{
                    width:           '18px',
                    height:          '18px',
                    borderRadius:    '50%',
                    flexShrink:      0,
                    border:          `2px solid ${isSelected ? 'var(--color-gold)' : 'rgba(212,175,55,0.35)'}`,
                    backgroundColor: isSelected ? 'var(--color-gold)' : 'transparent',
                    transition:      'background-color 0.15s, border-color 0.15s',
                    boxShadow:       isSelected ? '0 0 8px rgba(212,175,55,0.4)' : 'none',
                }} />

                {/* Name */}
                <span style={{
                    flex:       1,
                    fontSize:   '0.95rem',
                    fontWeight: isSelected ? '700' : '500',
                    color:      isSelected ? 'var(--color-gold)' : '#fff',
                    transition: 'color 0.15s',
                }}>
                    {bg.name}
                    {isSelected && (
                        <span style={{
                            marginLeft:    '0.5rem',
                            fontSize:      '0.6rem',
                            fontWeight:    '800',
                            letterSpacing: '0.1em',
                            color:         'var(--color-primary)',
                            backgroundColor: 'var(--color-gold)',
                            padding:       '0.1rem 0.45rem',
                            borderRadius:  '999px',
                            verticalAlign: 'middle',
                        }}>✓ SELECTED</span>
                    )}
                </span>

                {/* Skill pills (collapsed preview) */}
                <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                    {skills.map(s => (
                        <span key={s} style={{
                            fontSize:        '0.65rem',
                            fontWeight:      '600',
                            color:           'rgba(212,175,55,0.7)',
                            backgroundColor: 'rgba(212,175,55,0.08)',
                            border:          '1px solid rgba(212,175,55,0.2)',
                            padding:         '0.1rem 0.45rem',
                            borderRadius:    '999px',
                            whiteSpace:      'nowrap',
                        }}>{s}</span>
                    ))}
                </div>

                {/* Chevron */}
                <span style={{
                    fontSize:   '0.85rem',
                    color:      'rgba(212,175,55,0.5)',
                    transition: 'transform 0.25s ease',
                    transform:  isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                }}>▾</span>
            </div>

            {/* ── Expanded detail ── */}
            <div style={{
                maxHeight:  isExpanded ? '1200px' : '0',
                overflow:   'hidden',
                transition: 'max-height 0.35s ease',
            }}>
                <div style={{
                    padding:    '0 1.1rem 1.1rem',
                    borderTop:  '1px solid rgba(212,175,55,0.1)',
                    display:    'flex',
                    flexDirection: 'column',
                    gap:        '1rem',
                }}>

                    {/* Background description */}
                    <div style={{ paddingTop: '1rem' }}>
                        <p style={{
                            margin:        '0 0 0.25rem',
                            fontSize:      '0.6rem',
                            fontWeight:    '800',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color:         'rgba(212,175,55,0.5)',
                        }}>Background Story</p>
                        {bg.desc.map((para, i) => (
                            <p key={i} style={{
                                margin:      i === 0 ? '0 0 0.5rem' : '0.5rem 0',
                                fontSize:    '0.83rem',
                                lineHeight:  '1.7',
                                color:       'rgba(244,232,208,0.7)',
                                borderLeft:  '2px solid rgba(212,175,55,0.25)',
                                paddingLeft: '0.75rem',
                            }}>{para}</p>
                        ))}
                    </div>

                    {/* Ability Scores */}
                    <div>
                        <p style={{
                            margin:        '0 0 0.4rem',
                            fontSize:      '0.6rem',
                            fontWeight:    '800',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color:         'rgba(212,175,55,0.5)',
                        }}>Ability Score Increases</p>
                        <p style={{
                            margin:      '0 0 0.25rem',
                            fontSize:    '0.82rem',
                            lineHeight:  '1.6',
                            color:       'rgba(244,232,208,0.85)',
                            fontWeight:  '600',
                        }}>
                            {abilityStr}
                        </p>
                        <p style={{
                            margin:     0,
                            fontSize:   '0.73rem',
                            lineHeight: '1.6',
                            color:      'rgba(244,232,208,0.45)',
                            fontStyle:  'italic',
                        }}>
                            Choose one ability to increase by +2 and another by +1, or increase all three by +1
                        </p>
                    </div>

                    {/* Origin Feat */}
                    <div>
                        <p style={{
                            margin:        '0 0 0.25rem',
                            fontSize:      '0.6rem',
                            fontWeight:    '800',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color:         'rgba(212,175,55,0.5)',
                        }}>Origin Feat</p>
                        <p style={{
                            margin:     '0 0 0.5rem',
                            fontSize:   '0.9rem',
                            fontWeight: '700',
                            color:      'var(--color-gold)',
                        }}>{bg.feat.name}</p>
                        {bg.feat.desc.map((para, i) => (
                            <p key={i} style={{
                                margin:      i === 0 ? '0' : '0.5rem 0 0',
                                fontSize:    '0.79rem',
                                lineHeight:  '1.7',
                                color:       'rgba(244,232,208,0.65)',
                                borderLeft:  '2px solid rgba(212,175,55,0.2)',
                                paddingLeft: '0.75rem',
                            }}>{para}</p>
                        ))}
                    </div>

                    {/* Skills + Tool side by side on wider screens */}
                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>

                        {/* Skill proficiencies */}
                        {bg.skill_proficiencies.length > 0 && (
                            <div style={{ flex: '1', minWidth: '140px' }}>
                                <p style={{
                                    margin:        '0 0 0.4rem',
                                    fontSize:      '0.6rem',
                                    fontWeight:    '800',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    color:         'rgba(212,175,55,0.5)',
                                }}>Skill Proficiencies</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                    {bg.skill_proficiencies.map(p => (
                                        <span key={p.index} style={{
                                            backgroundColor: 'rgba(212,175,55,0.1)',
                                            border:          '1px solid rgba(212,175,55,0.3)',
                                            color:           'rgba(212,175,55,0.9)',
                                            padding:         '0.2rem 0.6rem',
                                            borderRadius:    '999px',
                                            fontSize:        '0.78rem',
                                            fontWeight:      '600',
                                        }}>{p.name.replace('Skill: ', '')}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tool proficiency */}
                        <div style={{ flex: '1', minWidth: '140px' }}>
                            <p style={{
                                margin:        '0 0 0.4rem',
                                fontSize:      '0.6rem',
                                fontWeight:    '800',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color:         'rgba(212,175,55,0.5)',
                            }}>Tool Proficiency</p>
                            <span style={{
                                backgroundColor: 'rgba(212,175,55,0.1)',
                                border:          '1px solid rgba(212,175,55,0.3)',
                                color:           'rgba(212,175,55,0.9)',
                                padding:         '0.2rem 0.6rem',
                                borderRadius:    '999px',
                                fontSize:        '0.78rem',
                                fontWeight:      '600',
                                display:         'inline-block',
                            }}>{bg.tool_proficiency}</span>
                        </div>
                    </div>

                    {/* Starting equipment */}
                    {bg.equipment_choice.package_a.length > 0 && (
                        <div>
                            <p style={{
                                margin:        '0 0 0.4rem',
                                fontSize:      '0.6rem',
                                fontWeight:    '800',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color:         'rgba(212,175,55,0.5)',
                            }}>Equipment Package A</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.5rem' }}>
                                {bg.equipment_choice.package_a.map((item, i) => (
                                    <span key={i} style={{
                                        fontSize:        '0.75rem',
                                        color:           'rgba(244,232,208,0.65)',
                                        backgroundColor: 'rgba(255,255,255,0.04)',
                                        border:          '1px solid rgba(255,255,255,0.08)',
                                        borderRadius:    '6px',
                                        padding:         '0.15rem 0.5rem',
                                        whiteSpace:      'nowrap',
                                    }}>
                                        {item.equipment.name}{item.quantity > 1 ? ` ×${item.quantity}` : ''}
                                    </span>
                                ))}
                            </div>
                            <p style={{
                                margin:     0,
                                fontSize:   '0.73rem',
                                color:      'rgba(244,232,208,0.4)',
                                fontStyle:  'italic',
                            }}>
                                Or choose Package B: {bg.equipment_choice.package_b_gold} GP
                            </p>
                        </div>
                    )}

                    {/* Select button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={e => { e.stopPropagation(); onSelect(); }}
                            style={{
                                padding:         '0.6rem 1.75rem',
                                borderRadius:    '8px',
                                border:          isSelected ? '1.5px solid var(--color-gold)' : 'none',
                                backgroundColor: isSelected ? 'rgba(212,175,55,0.12)' : 'var(--color-gold)',
                                color:           isSelected ? 'var(--color-gold)' : 'var(--color-primary)',
                                fontWeight:      '700',
                                fontSize:        '0.88rem',
                                cursor:          'pointer',
                                letterSpacing:   '0.03em',
                                transition:      'all 0.15s',
                            }}
                        >
                            {isSelected ? `✓ ${bg.name} Selected` : `Select ${bg.name}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Alignment 3×3 grid ────────────────────────────────────────────────────────

function AlignmentGrid({
    selected,
    onSelect,
}: {
    selected: string | null;
    onSelect: (id: string) => void;
}) {
    const selectedAlignment = ALIGNMENTS.find(a => a.id === selected);

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                maxWidth: '480px',
            }}>
                {ALIGNMENTS.map(a => {
                    const isActive = selected === a.id;
                    return (
                        <button
                            key={a.id}
                            onClick={() => onSelect(a.id)}
                            style={{
                                padding: '0.75rem 0.5rem',
                                borderRadius: '0.375rem',
                                border: `1.5px solid ${isActive ? 'var(--color-gold)' : 'rgba(212,175,55,0.2)'}`,
                                backgroundColor: isActive ? 'var(--color-gold)' : 'rgba(212,175,55,0.04)',
                                color: isActive ? 'var(--color-primary)' : 'rgba(212,175,55,0.7)',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.15s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.2rem',
                            }}
                            onMouseEnter={e => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.09)';
                            }}
                            onMouseLeave={e => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.04)';
                            }}
                        >
                            <span style={{ fontSize: '1.05rem', fontWeight: '800', lineHeight: 1 }}>
                                {a.abbr}
                            </span>
                            <span style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.04em', lineHeight: 1 }}>
                                {a.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Description of selected alignment */}
            {selectedAlignment && (
                <div style={{
                    marginTop: '0.875rem',
                    maxWidth: '480px',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(212,175,55,0.05)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '0.375rem',
                }}>
                    <span style={{
                        color: 'var(--color-gold)',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem',
                    }}>
                        {selectedAlignment.label}:
                    </span>
                    <span style={{
                        color: 'rgba(244,232,208,0.7)',
                        fontStyle: 'italic',
                        fontSize: '0.825rem',
                        lineHeight: '1.6',
                    }}>
                        {selectedAlignment.desc}
                    </span>
                </div>
            )}
        </div>
    );
}

// ── Styled text input ─────────────────────────────────────────────────────────

function StyledInput({
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    required = false,
}: {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    required?: boolean;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{
                color: 'rgba(212,175,55,0.6)',
                fontSize: '0.72rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            }}>
                {label}{required && <span style={{ color: 'var(--color-accent)', marginLeft: '0.25rem' }}>*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{
                    backgroundColor: 'rgba(212,175,55,0.05)',
                    border: `1.5px solid ${value ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.2)'}`,
                    borderRadius: '0.375rem',
                    padding: '0.65rem 0.875rem',
                    color: 'var(--color-parchment)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--color-gold)')}
                onBlur={e => (e.target.style.borderColor = value ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.2)')}
            />
        </div>
    );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function BackgroundStep({
    backgrounds,
}: {
    backgrounds: BgDetail[];
}) {
    const router = useRouter();
    const hydrated = useCharacterCreationHydrated();

    const {
        patchDraft,
        characterName,
        selectedBg,
        selectedAlignment,
        height,
        weight,
        age,
        dndClass,
    } = useCharacterCreationStore(
        useShallow((s) => ({
            patchDraft: s.patchDraft,
            characterName: s.draft.name ?? '',
            selectedBg: s.draft.background ?? null,
            selectedAlignment: s.draft.alignment ?? null,
            height: s.draft.height ?? '',
            weight: s.draft.weight ?? '',
            age: s.draft.age ?? '',
            dndClass: s.draft.dndClass,
        })),
    );

    // Accordion state,   which background row is currently expanded
    const [expandedBg, setExpandedBg] = useState<string | null>(null);

    const toggleAccordion = (index: string) =>
        setExpandedBg(prev => (prev === index ? null : index));

    const canContinue = characterName.trim().length > 0 && selectedBg !== null && selectedAlignment !== null;

    const handleBack = () => {
        const prev = characterCreationNeedsSubclassStep(dndClass) ? 3 : 2;
        router.push(`/create-character?step=${prev}`);
    };

    const handleContinue = () => {
        if (!canContinue) return;
        router.push('/create-character?step=5'); // Proficiencies
    };

    const selectedBgName = backgrounds.find(b => b.index === selectedBg)?.name;

    if (!hydrated) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                color: 'var(--color-gold)',
            }}>
                Loading…
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* ── Scrollable form body ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                {/* ── CHARACTER NAME ─────────────────────────────────── */}
                <SectionDivider title="Character Name" />
                <div style={{ maxWidth: '420px' }}>
                    <StyledInput
                        label="Name"
                        placeholder="e.g. Kael Dawnstrider"
                        value={characterName}
                        onChange={(v) => patchDraft({ name: v || undefined })}
                        required
                    />
                    <p style={{
                        color: 'rgba(244,232,208,0.35)',
                        fontSize: '0.78rem',
                        fontStyle: 'italic',
                        margin: '0.5rem 0 0',
                    }}>
                        This is how your character will appear to other players and in lore.
                    </p>
                </div>

                {/* ── BACKGROUND ─────────────────────────────────────── */}
                <SectionDivider title="Background" />
                <p style={{
                    color: 'rgba(244,232,208,0.45)',
                    fontSize: '0.85rem',
                    lineHeight: '1.7',
                    margin: '0 0 1.25rem',
                    maxWidth: '560px',
                }}>
                    Your background shapes who your character was before they became an adventurer. It grants ability score increases, an Origin feat, skill & tool proficiencies, and equipment.
                </p>

                {/* Background accordion list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {backgrounds.map(bg => (
                        <BackgroundAccordionRow
                            key={bg.index}
                            bg={bg}
                            isSelected={selectedBg === bg.index}
                            isExpanded={expandedBg === bg.index}
                            onToggle={() => toggleAccordion(bg.index)}
                            onSelect={() => {
                                patchDraft({ background: bg.index });
                                setExpandedBg(bg.index);
                            }}
                        />
                    ))}
                </div>

                {/* ── ALIGNMENT ──────────────────────────────────────── */}
                <SectionDivider title="Alignment" />
                <p style={{
                    color: 'rgba(244,232,208,0.45)',
                    fontSize: '0.85rem',
                    lineHeight: '1.7',
                    margin: '0 0 1.25rem',
                    maxWidth: '560px',
                }}>
                    Alignment describes your character's moral compass,   how they approach ethics, order, and the world around them.
                </p>
                <AlignmentGrid selected={selectedAlignment} onSelect={(id) => patchDraft({ alignment: id })} />

                {/* ── PHYSICAL TRAITS ────────────────────────────────── */}
                <SectionDivider title="Physical Traits" />
                <p style={{
                    color: 'rgba(244,232,208,0.45)',
                    fontSize: '0.85rem',
                    lineHeight: '1.7',
                    margin: '0 0 1.25rem',
                    maxWidth: '560px',
                }}>
                    Optional,   fill these in now or come back to them later.
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '1rem',
                    maxWidth: '620px',
                }}>
                    <StyledInput
                        label="Age"
                        placeholder='e.g. 32'
                        value={age}
                        onChange={(v) => patchDraft({ age: v || undefined })}
                    />
                    <StyledInput
                        label="Height"
                        placeholder={"e.g. 5'10\""}
                        value={height}
                        onChange={(v) => patchDraft({ height: v || undefined })}
                    />
                    <StyledInput
                        label="Weight"
                        placeholder="e.g. 175 lbs"
                        value={weight}
                        onChange={(v) => patchDraft({ weight: v || undefined })}
                    />
                </div>

                {/* Bottom spacer so footer doesn't cover content */}
                <div style={{ height: '5rem' }} />
            </div>

            {/* ── Sticky footer ── */}
            <div className="background-footer" style={{
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
                {/* Left: back + progress summary */}
                <div className="background-footer-left" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
                        &#8592; Subclass
                    </button>

                    {/* Quick-glance summary of what's been filled */}
                    <div className="background-status-pills" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <StatusPill label="Name" value={characterName.trim() || null} required />
                        <StatusPill label="Background" value={selectedBgName ?? null} required />
                        <StatusPill label="Alignment" value={ALIGNMENTS.find(a => a.id === selectedAlignment)?.label ?? null} required />
                    </div>
                </div>

                {/* Right: continue */}
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
                    Continue to Proficiencies &#8594;
                </button>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .background-footer {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        padding: 0.75rem 1rem !important;
                        gap: 0.75rem !important;
                    }
                    
                    .background-footer-left {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        gap: 0.75rem !important;
                    }
                    
                    .background-footer-left button {
                        width: 100% !important;
                    }
                    
                    .background-status-pills {
                        display: none !important;
                    }
                    
                    .background-footer > button {
                        width: 100% !important;
                        padding: 0.75rem 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

// Small footer pill showing completion status of a required field
function StatusPill({ label, value, required }: { label: string; value: string | null; required?: boolean }) {
    const filled = value !== null && value.length > 0;
    return (
        <div>
            <p style={{
                color: 'rgba(212,175,55,0.4)',
                fontSize: '0.58rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                margin: '0 0 0.1rem',
            }}>
                {label}{required && !filled ? ' *' : ''}
            </p>
            <p style={{
                color: filled ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)',
                fontWeight: filled ? '600' : '400',
                fontSize: '0.82rem',
                margin: 0,
                fontStyle: filled ? 'normal' : 'italic',
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                {filled ? value : ', '}
            </p>
        </div>
    );
}
