'use client';

import { useState, useEffect } from 'react';
import { STATIC_BACKGROUNDS } from '@/data/backgrounds';

/* ═══════════════════════════════════════════════════════════════════
   Types
═══════════════════════════════════════════════════════════════════ */

type Stats = { str: number; dex: number; con: number; int: number; wis: number; cha: number };
type Story = { backstory?: string; personality?: string; ideals?: string; bonds?: string; flaws?: string; appearance?: string };
type Currency = { pp: number; gp: number; sp: number; cp: number };

type ItemCategory = 'weapon' | 'armor' | 'shield' | 'magic' | 'potion' | 'scroll' | 'tool' | 'clothing' | 'trinket' | 'ammunition' | 'misc';
type ItemRarity = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary' | 'artifact';

type InventoryItem = {
    id: string;
    name: string;
    category: ItemCategory;
    rarity?: ItemRarity;
    quantity: number;
    equipped?: boolean;
    requiresAttunement?: boolean;
    attuned?: boolean;
    weight?: number;
    value?: string;
    properties?: string;
    description?: string;
    source?: 'background' | 'purchased' | 'loot' | 'crafted';
};

type CharacterData = {
    id: string;
    name: string;
    race: string;
    class: string;
    background: string;
    alignment: string;
    level: number;
    hp: number | null;
    currency: Currency;
    height: string | null;
    weight: string | null;
    age: string | null;
    proficiencies: string[];
    stats: Stats;
    story: Story;
    createdAt: string;
};

type Tab = 'overview' | 'magic' | 'gear' | 'lore';

/* ═══════════════════════════════════════════════════════════════════
   Static reference data
═══════════════════════════════════════════════════════════════════ */

const STAT_DEFS = [
    { key: 'str' as const, label: 'STR', full: 'Strength' },
    { key: 'dex' as const, label: 'DEX', full: 'Dexterity' },
    { key: 'con' as const, label: 'CON', full: 'Constitution' },
    { key: 'int' as const, label: 'INT', full: 'Intelligence' },
    { key: 'wis' as const, label: 'WIS', full: 'Wisdom' },
    { key: 'cha' as const, label: 'CHA', full: 'Charisma' },
];

const SKILL_GROUPS = [
    { ability: 'STR', color: 'rgba(228,90,74,0.85)', skills: [{ index: 'skill-athletics', name: 'Athletics' }] },
    { ability: 'DEX', color: 'rgba(228,160,74,0.85)', skills: [{ index: 'skill-acrobatics', name: 'Acrobatics' }, { index: 'skill-sleight-of-hand', name: 'Sleight of Hand' }, { index: 'skill-stealth', name: 'Stealth' }] },
    { ability: 'INT', color: 'rgba(93,142,232,0.85)', skills: [{ index: 'skill-arcana', name: 'Arcana' }, { index: 'skill-history', name: 'History' }, { index: 'skill-investigation', name: 'Investigation' }, { index: 'skill-nature', name: 'Nature' }, { index: 'skill-religion', name: 'Religion' }] },
    { ability: 'WIS', color: 'rgba(80,200,100,0.85)', skills: [{ index: 'skill-animal-handling', name: 'Animal Handling' }, { index: 'skill-insight', name: 'Insight' }, { index: 'skill-medicine', name: 'Medicine' }, { index: 'skill-perception', name: 'Perception' }, { index: 'skill-survival', name: 'Survival' }] },
    { ability: 'CHA', color: 'rgba(193,93,232,0.85)', skills: [{ index: 'skill-deception', name: 'Deception' }, { index: 'skill-intimidation', name: 'Intimidation' }, { index: 'skill-performance', name: 'Performance' }, { index: 'skill-persuasion', name: 'Persuasion' }] },
];

const ALIGNMENTS: Record<string, { label: string; desc: string }> = {
    'lawful-good': { label: 'Lawful Good', desc: 'Principled and compassionate. Acts with a strict code and genuine care for others.' },
    'neutral-good': { label: 'Neutral Good', desc: 'Does the best they can without being bound by rules or chaos, acts from the heart.' },
    'chaotic-good': { label: 'Chaotic Good', desc: 'Follows their conscience regardless of law. Values freedom and kindness above order.' },
    'lawful-neutral': { label: 'Lawful Neutral', desc: 'Order and tradition above all else, not good or evil, just bound to a code.' },
    'true-neutral': { label: 'True Neutral', desc: 'Acts without strong moral preference, maintaining balance or living for themselves.' },
    'chaotic-neutral': { label: 'Chaotic Neutral', desc: 'Values personal freedom above all. Follows whims, avoids authority, resists control.' },
    'lawful-evil': { label: 'Lawful Evil', desc: 'Uses order and structure as a tool for domination. Methodical, patient, and ruthless.' },
    'neutral-evil': { label: 'Neutral Evil', desc: 'Does whatever serves their interests. No loyalty to anyone, utterly self-interested.' },
    'chaotic-evil': { label: 'Chaotic Evil', desc: 'Driven by destructive impulse and contempt for order. Dangerous, unpredictable, violent.' },
};

/* ═══════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════ */

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getMod(score: number): string {
    const m = Math.floor((score - 10) / 2);
    return m >= 0 ? `+${m}` : `${m}`;
}

function modColor(score: number): string {
    const m = Math.floor((score - 10) / 2);
    if (m > 0) return 'rgba(134,198,120,0.9)';
    if (m < 0) return 'rgba(220,80,80,0.9)';
    return 'rgba(212,175,55,0.7)';
}

/* ═══════════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════════ */

function SectionHead({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)', whiteSpace: 'nowrap' }}>{children}</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.12)' }} />
        </div>
    );
}

function StatBlock({ def, value }: { def: typeof STAT_DEFS[number]; value: number }) {
    const mod = getMod(value);
    const color = modColor(value);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '10px', padding: '0.9rem 0.4rem 0.75rem', gap: '0.15rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)' }} />
            <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.13em', color: 'rgba(212,175,55,0.55)', textTransform: 'uppercase' }}>{def.full}</span>
            <span style={{ fontSize: '2.2rem', fontWeight: '900', lineHeight: 1, color: '#fff', marginTop: '0.1rem' }}>{value}</span>
            <div style={{ marginTop: '0.25rem', background: 'rgba(0,0,0,0.5)', border: `1.5px solid ${color}`, borderRadius: '999px', padding: '0.08rem 0.65rem', fontSize: '0.78rem', fontWeight: '800', color }}>{mod}</div>
        </div>
    );
}

function SkillRow({ name, proficient, color }: { name: string; proficient: boolean; color: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.3rem 0' }}>
            <div style={{ width: '13px', height: '13px', borderRadius: '50%', flexShrink: 0, border: `2px solid ${proficient ? color : 'rgba(255,255,255,0.15)'}`, backgroundColor: proficient ? color : 'transparent', boxShadow: proficient ? `0 0 5px ${color}66` : 'none', transition: 'all 0.15s' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: proficient ? '600' : '400', color: proficient ? '#fff' : 'rgba(244,232,208,0.4)' }}>{name}</span>
        </div>
    );
}

function StoryBlock({ label, content }: { label: string; content?: string }) {
    if (!content) return null;
    return (
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>{label}</p>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.75', color: 'rgba(244,232,208,0.75)', fontStyle: 'italic' }}>{content}</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Tab Content Components
═══════════════════════════════════════════════════════════════════ */

function OverviewTab({ char }: { char: CharacterData }) {
    const bg = STATIC_BACKGROUNDS.find(b => b.id === char.background);
    const alignInfo = ALIGNMENTS[char.alignment] || { label: fmt(char.alignment), desc: '' };

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats */}
            <div>
                <SectionHead>Ability Scores</SectionHead>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.75rem' }}>
                    {STAT_DEFS.map(def => <StatBlock key={def.key} def={def} value={char.stats[def.key]} />)}
                </div>
            </div>

            {/* Skills */}
            <div>
                <SectionHead>Proficiencies & Skills</SectionHead>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    {SKILL_GROUPS.map(group => (
                        <div key={group.ability}>
                            <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em', color: group.color }}>{group.ability}</p>
                            {group.skills.map(skill => (
                                <SkillRow
                                    key={skill.index}
                                    name={skill.name}
                                    proficient={char.proficiencies.includes(skill.index)}
                                    color={group.color}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <SectionHead>Character Info</SectionHead>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                        <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>HP</p>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{char.hp || '—'}</p>
                    </div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Alignment</p>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{alignInfo.label}</p>
                        {alignInfo.desc && <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'rgba(244,232,208,0.5)', fontStyle: 'italic' }}>{alignInfo.desc}</p>}
                    </div>
                    <div>
                        <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Background</p>
                        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{fmt(char.background)}</p>
                        {bg && <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'rgba(244,232,208,0.5)', fontStyle: 'italic' }}>{bg.feature}</p>}
                    </div>
                    {char.age && (
                        <div>
                            <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Age</p>
                            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{char.age}</p>
                        </div>
                    )}
                    {char.height && (
                        <div>
                            <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Height</p>
                            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{char.height}</p>
                        </div>
                    )}
                    {char.weight && (
                        <div>
                            <p style={{ margin: '0 0 0.25rem', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Weight</p>
                            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{char.weight}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LoreTab({ char }: { char: CharacterData }) {
    const hasAnyStory = char.story.backstory || char.story.personality || char.story.ideals || char.story.bonds || char.story.flaws || char.story.appearance;

    if (!hasAnyStory) {
        return (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <p style={{ color: 'rgba(244,232,208,0.35)', fontSize: '0.95rem', fontStyle: 'italic' }}>No story details available.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <StoryBlock label="Backstory" content={char.story.backstory} />
            <StoryBlock label="Personality Traits" content={char.story.personality} />
            <StoryBlock label="Ideals" content={char.story.ideals} />
            <StoryBlock label="Bonds" content={char.story.bonds} />
            <StoryBlock label="Flaws" content={char.story.flaws} />
            <StoryBlock label="Appearance" content={char.story.appearance} />
        </div>
    );
}

function GearTab({ char }: { char: CharacterData }) {
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(244,232,208,0.4)' }}>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>Gear information not available in party view.</p>
            </div>
        </div>
    );
}

function MagicTab({ char }: { char: CharacterData }) {
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(244,232,208,0.4)' }}>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>Magic & abilities information not available in party view.</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Main Modal Component
═══════════════════════════════════════════════════════════════════ */

export default function CharacterViewModal({
    characterId,
    isOpen,
    onClose
}: {
    characterId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [char, setChar] = useState<CharacterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tab, setTab] = useState<Tab>('overview');

    useEffect(() => {
        if (isOpen && characterId) {
            setLoading(true);
            setError('');
            fetch(`/api/characters/${characterId}`)
                .then(r => r.json())
                .then(data => {
                    if (data.error) throw new Error(data.error);
                    setChar(data.character);
                })
                .catch(e => setError(e.message))
                .finally(() => setLoading(false));
        }
    }, [isOpen, characterId]);

    if (!isOpen) return null;

    const displayRace = char ? fmt(char.race) : '';
    const displayClass = char ? fmt(char.class) : '';
    const displayBg = char ? fmt(char.background) : '';
    const displayAlign = char ? fmt(char.alignment) : '';

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem',
                overflowY: 'auto'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '0.75rem',
                    width: '100%',
                    maxWidth: '1000px',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                    border: '2px solid var(--color-gold)'
                }}
            >
                {loading ? (
                    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(244,232,208,0.5)' }}>Loading character...</p>
                    </div>
                ) : error || !char ? (
                    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(220,80,80,0.8)' }}>{error || 'Character not found.'}</p>
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--color-gold)',
                                color: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div style={{
                            position: 'relative',
                            minHeight: '200px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            flexShrink: 0,
                            background: `
                                linear-gradient(to bottom, rgba(10,8,6,0.25) 0%, rgba(10,8,6,0.0) 25%),
                                linear-gradient(to right, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.6) 55%, rgba(10,8,6,0.15) 100%),
                                linear-gradient(to top, rgba(10,8,6,1.0) 0%, rgba(10,8,6,0.0) 45%),
                                url(/images/races/${char.race}.png) top / cover no-repeat
                            `,
                        }}>
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    color: 'var(--color-gold)',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    lineHeight: 1,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.2)';
                                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                                }}
                            >
                                ×
                            </button>

                            <div style={{ padding: '1.5rem 2rem 1.5rem', width: '100%' }}>
                                {/* Level badge */}
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.12em', color: 'var(--color-primary)', backgroundColor: 'var(--color-gold)', padding: '0.1rem 0.55rem', borderRadius: '999px' }}>
                                        LEVEL {char.level}
                                    </span>
                                </div>

                                {/* Name */}
                                <h1 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: '900', color: '#fff', lineHeight: '1.05', letterSpacing: '-0.01em', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
                                    {char.name}
                                </h1>

                                {/* Tagline */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0' }}>
                                    {[displayRace, displayClass, displayBg, displayAlign].map((val, i, arr) => (
                                        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: i === 0 ? '700' : '400', color: i === 0 ? 'var(--color-gold)' : 'rgba(255,255,255,0.65)' }}>{val}</span>
                                            {i < arr.length - 1 && <span style={{ margin: '0 0.45rem', color: 'rgba(212,175,55,0.3)', fontSize: '0.8rem' }}>·</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{
                            display: 'flex',
                            gap: '0',
                            borderBottom: '1px solid rgba(212,175,55,0.15)',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            overflowX: 'auto'
                        }}>
                            {[
                                { id: 'overview' as Tab, label: 'Overview' },
                                { id: 'magic' as Tab, label: 'Magic & Abilities' },
                                { id: 'gear' as Tab, label: 'Gear' },
                                { id: 'lore' as Tab, label: 'Lore' },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    style={{
                                        flex: '1 0 auto',
                                        padding: '1rem 1.5rem',
                                        background: tab === t.id ? 'rgba(212,175,55,0.12)' : 'transparent',
                                        border: 'none',
                                        borderBottom: tab === t.id ? '2px solid var(--color-gold)' : '2px solid transparent',
                                        color: tab === t.id ? 'var(--color-gold)' : 'rgba(244,232,208,0.5)',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {tab === 'overview' && <OverviewTab char={char} />}
                            {tab === 'magic' && <MagicTab char={char} />}
                            {tab === 'gear' && <GearTab char={char} />}
                            {tab === 'lore' && <LoreTab char={char} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
