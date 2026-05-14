'use client';

import { useState, useEffect, useMemo } from 'react';
import type { SpellEntry } from '@/data/spells';
import type { SpellSlots, PactMagicSlots } from '@/data/spell-slots';
import { usesPactMagic } from '@/data/spell-slots';
import { useCharacterInventory, type EnrichedInventoryItem } from '@/hooks/use-character-inventory';
import ItemTooltip from '@/components/ui/item-tooltip';
import SpellcastingStats from '@/components/ui/spellcasting-stats';
import { shouldDisplaySubclass } from '@/lib/subclass-levels';

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
    subclass?: { name: string; class: string; level_chosen: number } | null;
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
    feats?: Array<{ name: string; benefit: string; level: number; statChoice: string | null }>;
    spellSlots: SpellSlots | PactMagicSlots | null;
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

// Combat stats helpers
const RACE_SPEED: Record<string, number> = {
    dwarf: 25, gnome: 25, halfling: 25,
};

const UNARMORED_BONUS: Record<string, (s: Stats) => number> = {
    barbarian: s => Math.floor((s.con - 10) / 2),
    monk: s => Math.floor((s.wis - 10) / 2),
};

function calcAC(charClass: string, stats: Stats): number {
    const dexMod = Math.floor((stats.dex - 10) / 2);
    const extra = UNARMORED_BONUS[charClass]?.(stats) ?? 0;
    return 10 + dexMod + extra;
}

function profBonus(level: number): string {
    return `+${Math.ceil(level / 4) + 1}`;
}

type CombatStat = { label: string; value: string; sub?: string; accent: string };

function CombatStatsBar({ char }: { char: CharacterData }) {
    const stats = char.stats;
    const hasStats = stats && Object.keys(stats).length > 0;

    const dexMod = hasStats ? Math.floor((stats.dex - 10) / 2) : 0;
    const initStr = dexMod >= 0 ? `+${dexMod}` : `${dexMod}`;
    const speed = RACE_SPEED[char.race] ?? 30;
    const ac = hasStats ? calcAC(char.class, stats) : 10;

    const combatStats: CombatStat[] = [
        {
            label: 'Max HP',
            value: char.hp !== null ? `${char.hp}` : ', ',
            sub: 'Hit Points',
            accent: 'rgba(220,80,80,0.85)',
        },
        {
            label: 'AC',
            value: hasStats ? `${ac}` : ', ',
            sub: char.class === 'barbarian' ? 'Unarmored (CON)' : char.class === 'monk' ? 'Unarmored (WIS)' : 'Unarmored',
            accent: 'rgba(93,142,232,0.85)',
        },
        {
            label: 'Speed',
            value: `${speed}`,
            sub: 'feet / turn',
            accent: 'rgba(80,200,120,0.85)',
        },
        {
            label: 'Initiative',
            value: hasStats ? initStr : ', ',
            sub: 'DEX modifier',
            accent: dexMod >= 0 ? 'rgba(240,200,80,0.85)' : 'rgba(220,80,80,0.85)',
        },
        {
            label: 'Prof. Bonus',
            value: profBonus(char.level),
            sub: `Level ${char.level}`,
            accent: 'rgba(160,100,240,0.85)',
        },
    ];

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {combatStats.map(stat => (
                <div
                    key={stat.label}
                    style={{
                        flex: '1 1 80px',
                        minWidth: '72px',
                        background: `${stat.accent.replace('0.85', '0.06')}`,
                        border: `1px solid ${stat.accent.replace('0.85', '0.22')}`,
                        borderRadius: '10px',
                        padding: '0.55rem 0.7rem 0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.05rem',
                        textAlign: 'center',
                    }}
                >
                    <span style={{
                        fontSize: '0.55rem',
                        fontWeight: '800',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: stat.accent,
                        opacity: 0.75,
                        whiteSpace: 'nowrap',
                    }}>
                        {stat.label}
                    </span>
                    <span style={{
                        fontSize: '1.6rem',
                        fontWeight: '900',
                        lineHeight: 1,
                        color: '#fff',
                        marginTop: '0.1rem',
                    }}>
                        {stat.value}
                    </span>
                    {stat.sub && (
                        <span style={{
                            fontSize: '0.6rem',
                            color: 'rgba(244,232,208,0.3)',
                            marginTop: '0.1rem',
                            whiteSpace: 'nowrap',
                        }}>
                            {stat.sub}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

function OverviewTab({ char }: { char: CharacterData }) {
    const profSet = new Set(char.proficiencies);
    const hasStats = char.stats && Object.keys(char.stats).length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.75rem 2rem' }}>
            {/* Ability Scores */}
            {hasStats ? (
                <section>
                    <SectionHead>Ability Scores</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '0.6rem' }} className="ability-scores-grid">
                        {STAT_DEFS.map(def => (
                            <StatBlock key={def.key} def={def} value={char.stats[def.key] ?? 10} />
                        ))}
                    </div>
                </section>
            ) : (
                <section>
                    <SectionHead>Ability Scores</SectionHead>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>No ability scores recorded.</p>
                </section>
            )}

            {/* Combat Stats bar */}
            <section>
                <SectionHead>Combat Stats</SectionHead>
                <CombatStatsBar char={char} />
            </section>

            {/* Skill Proficiencies */}
            <section>
                <SectionHead>Skill Proficiencies</SectionHead>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 1.5rem' }}>
                    {SKILL_GROUPS.map(group => (
                        <div key={group.ability}>
                            <p style={{ margin: '0.6rem 0 0.2rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: group.color, opacity: 0.85 }}>{group.ability}</p>
                            {group.skills.map(s => (
                                <SkillRow key={s.index} name={s.name} proficient={profSet.has(s.index)} color={group.color} />
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* Feats */}
            {char.feats && char.feats.length > 0 && (
                <section>
                    <SectionHead>Feats</SectionHead>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {char.feats.map((feat, idx) => (
                            <div key={idx} style={{
                                padding: '1rem 1.25rem',
                                background: 'rgba(93,142,232,0.06)',
                                border: '1px solid rgba(93,142,232,0.2)',
                                borderRadius: '10px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: '800', fontSize: '0.95rem', color: '#5D8EE8' }}>
                                        {feat.name}
                                    </span>
                                    <span style={{ fontSize: '0.65rem', fontWeight: '700', background: 'rgba(212,175,55,0.2)', color: 'rgba(212,175,55,0.9)', borderRadius: '999px', padding: '0.1rem 0.5rem' }}>
                                        Level {feat.level}
                                    </span>
                                    {feat.statChoice && (
                                        <span style={{ fontSize: '0.65rem', fontWeight: '700', background: 'rgba(80,200,100,0.2)', color: 'rgba(80,200,100,0.9)', borderRadius: '999px', padding: '0.1rem 0.5rem' }}>
                                            +1 {feat.statChoice.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.65', color: 'rgba(244,232,208,0.7)' }}>
                                    {feat.benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Identity quick-view */}
            <section>
                <SectionHead>Identity</SectionHead>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.6rem' }}>
                    {[
                        { label: 'Race', value: fmt(char.race) },
                        { label: 'Class', value: fmt(char.class) },
                        { label: 'Background', value: fmt(char.background) },
                        { label: 'Alignment', value: fmt(char.alignment) },
                        { label: 'Level', value: `Level ${char.level}` },
                    ].map(item => (
                        <div key={item.label} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.75rem 1rem' }}>
                            <p style={{ margin: '0 0 0.2rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>{item.label}</p>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <style>{`
                @media (max-width: 768px) {
                    .ability-scores-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
                @media (max-width: 480px) {
                    .ability-scores-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
}

function LoreTab({ char }: { char: CharacterData }) {
    const [bgData, setBgData] = useState<{ name: string; feature: { name: string; desc: string[] } } | null>(null);
    const alignment = ALIGNMENTS[char.alignment];
    const hasPhysical = char.height || char.weight || char.age;
    const story = char.story;
    const hasStory = story && Object.values(story).some(v => v && v.trim().length > 0);

    useEffect(() => {
        if (!char.background) {
            setBgData(null);
            return;
        }
        
        fetch(`/api/resources/backgrounds/${char.background}`)
            .then(res => res.json())
            .then(data => setBgData(data))
            .catch(err => {
                console.error('Failed to fetch background:', err);
                setBgData(null);
            });
    }, [char.background]);

    return (
        <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Story */}
            {hasStory ? (
                <>
                    {story.backstory && (
                        <section>
                            <SectionHead>Backstory</SectionHead>
                            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.8', color: 'rgba(244,232,208,0.8)', fontStyle: 'italic' }}>{story.backstory}</p>
                            </div>
                        </section>
                    )}
                    {(story.personality || story.ideals || story.bonds || story.flaws) && (
                        <section>
                            <SectionHead>Character Traits</SectionHead>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
                                <StoryBlock label="Personality" content={story.personality} />
                                <StoryBlock label="Ideals" content={story.ideals} />
                                <StoryBlock label="Bonds" content={story.bonds} />
                                <StoryBlock label="Flaws" content={story.flaws} />
                            </div>
                        </section>
                    )}
                    {story.appearance && (
                        <section>
                            <SectionHead>Appearance</SectionHead>
                            <StoryBlock label="Appearance" content={story.appearance} />
                        </section>
                    )}
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
                    <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>📜</span>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic', maxWidth: '300px', lineHeight: '1.6' }}>No story details available.</p>
                </div>
            )}

            {/* Physical Traits */}
            {hasPhysical && (
                <section>
                    <SectionHead>Physical Traits</SectionHead>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {char.height && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Height</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.height}</p></div>}
                        {char.weight && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Weight</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.weight}</p></div>}
                        {char.age && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Age</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.age}</p></div>}
                    </div>
                </section>
            )}

            {/* Alignment */}
            {alignment && (
                <section>
                    <SectionHead>Alignment</SectionHead>
                    <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                        <p style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-gold)' }}>{alignment.label}</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.65', color: 'rgba(244,232,208,0.65)', fontStyle: 'italic' }}>{alignment.desc}</p>
                    </div>
                </section>
            )}

            {/* Background Feature */}
            {bgData && (
                <section>
                    <SectionHead>Background Feature, {bgData.name}</SectionHead>
                    <div style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                        <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-gold)' }}>{bgData.feature.name}</p>
                        {bgData.feature.desc.map((d, i) => (
                            <p key={i} style={{ margin: i === 0 ? 0 : '0.5rem 0 0', fontSize: '0.85rem', lineHeight: '1.7', color: 'rgba(244,232,208,0.7)', fontStyle: 'italic', borderLeft: '2px solid rgba(212,175,55,0.25)', paddingLeft: '0.75rem' }}>{d}</p>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

// Spell/Magic Tab - Simplified read-only version
const FULL_CASTERS = new Set(['wizard', 'sorcerer', 'cleric', 'druid', 'bard', 'warlock']);
const HALF_CASTERS = new Set(['paladin', 'ranger']);

const FULL_SLOT_TABLE: Record<number, number> = {
    1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
    11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 9, 20: 9,
};

const HALF_SLOT_TABLE: Record<number, number> = {
    1: 0, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 4, 10: 4,
    11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5,
};

function maxSpellLevel(charClass: string, charLevel: number): number {
    if (FULL_CASTERS.has(charClass)) return FULL_SLOT_TABLE[charLevel] ?? 1;
    if (HALF_CASTERS.has(charClass)) return HALF_SLOT_TABLE[charLevel] ?? 0;
    return 0;
}

const SCHOOL_COLORS: Record<string, string> = {
    abjuration: 'rgba(80,180,240,0.85)', conjuration: 'rgba(130,200,80,0.85)',
    divination: 'rgba(240,230,80,0.85)', enchantment: 'rgba(240,80,160,0.85)',
    evocation: 'rgba(240,120,60,0.85)', illusion: 'rgba(160,100,240,0.85)',
    necromancy: 'rgba(80,200,140,0.85)', transmutation: 'rgba(240,180,60,0.85)',
};

const TYPE_BG: Record<string, string> = {
    'class-ability': 'rgba(212,175,55,0.07)',
    'racial-ability': 'rgba(80,200,100,0.07)',
    'spell': 'rgba(93,142,232,0.07)',
};
const TYPE_BORDER: Record<string, string> = {
    'class-ability': 'rgba(212,175,55,0.18)',
    'racial-ability': 'rgba(80,200,100,0.18)',
    'spell': 'rgba(93,142,232,0.18)',
};

function MagicCard({ entry, subclassTag }: { entry: SpellEntry; subclassTag?: string | null }) {
    const [expanded, setExpanded] = useState(false);
    const type = entry.type ?? 'spell';
    
    // Check if this spell/ability is granted by the character's subclass
    const isSubclassGranted = subclassTag && entry.subclasses && entry.subclasses.includes(subclassTag);

    return (
        <div
            onClick={() => setExpanded(v => !v)}
            style={{
                background: TYPE_BG[type],
                border: `1px solid ${TYPE_BORDER[type]}`,
                borderRadius: '9px',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                transition: 'opacity 0.15s, border-color 0.15s',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ flex: 1, minWidth: '120px', fontSize: '0.88rem', fontWeight: '700', color: '#fff', lineHeight: '1.3' }}>
                    {entry.name}
                </span>
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
                    {/* Subclass Badge */}
                    {isSubclassGranted && (
                        <span style={{ 
                            fontSize: '0.58rem', 
                            fontWeight: '800', 
                            background: 'rgba(160,100,240,0.2)', 
                            color: 'rgba(160,100,240,0.95)', 
                            borderRadius: '999px', 
                            padding: '0.05rem 0.45rem',
                            border: '1px solid rgba(160,100,240,0.3)',
                            letterSpacing: '0.02em'
                        }}>
                            SUBCLASS
                        </span>
                    )}
                    {type === 'spell' && entry.level !== undefined && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '800', background: 'rgba(93,142,232,0.2)', color: 'rgba(93,142,232,0.9)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {entry.level === 0 ? 'Cantrip' : `Lv ${entry.level}`}
                        </span>
                    )}
                    {entry.school && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', background: `${SCHOOL_COLORS[entry.school] ?? 'rgba(200,200,200,0.2)'}33`, color: SCHOOL_COLORS[entry.school] ?? 'rgba(200,200,200,0.7)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {fmt(entry.school)}
                        </span>
                    )}
                    <span style={{ fontSize: '0.62rem', color: 'rgba(244,232,208,0.4)', whiteSpace: 'nowrap' }}>{fmt(entry.actionType)}</span>
                    {entry.concentration && (
                        <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'rgba(240,180,60,0.85)', border: '1px solid rgba(240,180,60,0.3)', borderRadius: '4px', padding: '0.02rem 0.25rem' }}>C</span>
                    )}
                    {entry.ritual && (
                        <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'rgba(160,100,240,0.85)', border: '1px solid rgba(160,100,240,0.3)', borderRadius: '4px', padding: '0.02rem 0.25rem' }}>R</span>
                    )}
                    <span style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.35)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
            </div>

            {!expanded && (
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.77rem', color: 'rgba(244,232,208,0.5)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry.description.replace(/\*\*/g, '').replace(/\n/g, ' ')}
                </p>
            )}

            {expanded && (
                <div style={{ marginTop: '0.65rem', borderTop: `1px solid ${TYPE_BORDER[type]}`, paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {type === 'spell' && (entry.range || entry.duration || entry.components) && (
                        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            {entry.range && <MiniStat label="Range" val={entry.range} />}
                            {entry.duration && <MiniStat label="Duration" val={entry.duration} />}
                            {entry.components && <MiniStat label="Components" val={entry.components.map(c => c.toUpperCase()).join(', ') + (entry.material ? ` (${entry.material})` : '')} />}
                        </div>
                    )}
                    {type !== 'spell' && entry.recharge && (
                        <MiniStat label="Recharge" val={fmt(entry.recharge)} />
                    )}
                    <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: '1.7', color: 'rgba(244,232,208,0.75)', whiteSpace: 'pre-line' }}>
                        {entry.description.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                    {(entry.cantripUpgrade || entry.higherLevelSlot || entry.upgrades) && (
                        <div style={{ padding: '0.45rem 0.7rem', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.13)', borderRadius: '6px' }}>
                            <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>At Higher Levels</p>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(244,232,208,0.6)', lineHeight: '1.55' }}>
                                {entry.cantripUpgrade ?? entry.higherLevelSlot ?? entry.upgrades}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function MiniStat({ label, val }: { label: string; val: string }) {
    return (
        <div>
            <p style={{ margin: '0 0 0.08rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.4)' }}>{label}</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(244,232,208,0.7)' }}>{val}</p>
        </div>
    );
}

function MagicGroupHeader({ title, count, color }: { title: string; count: number; color: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 0.6rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{title}</span>
            <div style={{ flex: 1, height: '1px', background: `${color}33` }} />
            <span style={{ fontSize: '0.65rem', color: `${color}88`, fontWeight: '700' }}>{count}</span>
        </div>
    );
}

function MagicTab({ char }: { char: CharacterData }) {
    const charClass = char.class;
    const charRace = char.race;
    const charLevel = char.level ?? 1;
    const charSubclass = char.subclass;
    const subclassTag = charSubclass ? `${charSubclass.name.toLowerCase()} ${charClass}` : null;
    const maxSlot = maxSpellLevel(charClass, charLevel);
    const isCaster = FULL_CASTERS.has(charClass) || HALF_CASTERS.has(charClass);

    const [allEntries, setAllEntries] = useState<SpellEntry[]>([]);
    const [classFeatures, setClassFeatures] = useState<any[]>([]);
    const [subclassFeatures, setSubclassFeatures] = useState<any[]>([]);
    const [loadingMagic, setLoadingMagic] = useState(true);

    useEffect(() => {
        setLoadingMagic(true);
        
        // Use new unified endpoint that fetches class features, subclass features, and spells
        let url = `/api/resources/character-abilities?class=${encodeURIComponent(charClass)}&race=${encodeURIComponent(charRace)}&level=${charLevel}`;
        
        if (charSubclass) {
            url += `&subclass=${encodeURIComponent(charSubclass.name)}`;
        }
        
        fetch(url)
            .then(r => r.json())
            .then(data => {
                setClassFeatures(data.classFeatures ?? []);
                setSubclassFeatures(data.subclassFeatures ?? []);
                setAllEntries(data.spellsAndAbilities ?? []);
                setLoadingMagic(false);
            })
            .catch(() => setLoadingMagic(false));
    }, [charClass, charRace, charLevel, charSubclass]);

    const { racialAbilities, classAbilities, cantrips, spellsByLevel } = useMemo(() => {
        const racial: SpellEntry[] = [];
        const clsAbil: SpellEntry[] = [];
        const cant: SpellEntry[] = [];
        const byLvl: Record<number, SpellEntry[]> = {};

        for (const e of allEntries) {
            const type = e.type ?? 'spell';
            if (type === 'racial-ability') {
                if (e.races?.includes(charRace) && (e.levelGained ?? 1) <= charLevel) racial.push(e);
                continue;
            }
            if (type === 'class-ability') {
                if (e.classes?.includes(charClass) && (e.levelGained ?? 1) <= charLevel) clsAbil.push(e);
                continue;
            }
            if (!e.classes?.includes(charClass)) continue;
            if (e.level === 0) { cant.push(e); continue; }
            if (!isCaster) continue;
            if ((e.level ?? 99) <= maxSlot) {
                if (!byLvl[e.level!]) byLvl[e.level!] = [];
                byLvl[e.level!].push(e);
            }
        }
        return { racialAbilities: racial, classAbilities: clsAbil, cantrips: cant, spellsByLevel: byLvl };
    }, [allEntries, charClass, charRace, charLevel, maxSlot, isCaster]);

    const spellLevels = Object.keys(spellsByLevel).map(Number).sort((a, b) => a - b);

    if (loadingMagic) {
        return (
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ height: '60px', background: 'rgba(212,175,55,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.08)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.08}s` }} />
                ))}
            </div>
        );
    }

    const totalAbilities = racialAbilities.length + classAbilities.length + cantrips.length + spellLevels.reduce((s, l) => s + spellsByLevel[l].length, 0) + classFeatures.length + subclassFeatures.length;

    if (totalAbilities === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>🔮</span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>No spells or abilities found for this character.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '0.75rem 2rem 4rem' }}>
            {/* Spellcasting Stats */}
            <section style={{ marginBottom: '2rem' }}>
                <SpellcastingStats
                    spellSlots={char.spellSlots}
                    charClass={char.class}
                    charLevel={char.level}
                    stats={char.stats}
                    isPactMagic={usesPactMagic(char.class)}
                />
            </section>

            {racialAbilities.length > 0 && (
                <section>
                    <MagicGroupHeader title={`Racial Abilities, ${fmt(charRace)}`} count={racialAbilities.length} color="rgba(80,200,100,0.8)" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {racialAbilities.map((e, i) => <MagicCard key={`r-${i}`} entry={e} subclassTag={subclassTag} />)}
                    </div>
                </section>
            )}

            {classFeatures.length > 0 && (
                <section>
                    <MagicGroupHeader title={`${fmt(charClass)} Features (Level ${charLevel})`} count={classFeatures.length} color="rgba(212,175,55,0.8)" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {classFeatures.map((f, i) => <MagicCard key={`cf-${i}`} entry={f} subclassTag={subclassTag} />)}
                    </div>
                </section>
            )}

            {subclassFeatures.length > 0 && (
                <section>
                    <MagicGroupHeader title={`${charSubclass?.name} Features (Level ${charLevel})`} count={subclassFeatures.length} color="rgba(193,93,232,0.8)" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {subclassFeatures.map((f, i) => <MagicCard key={`sf-${i}`} entry={f} subclassTag={subclassTag} />)}
                    </div>
                </section>
            )}

            {classAbilities.length > 0 && (
                <section>
                    <MagicGroupHeader title={`Additional Abilities`} count={classAbilities.length} color="rgba(228,160,74,0.8)" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {classAbilities.map((e, i) => <MagicCard key={`c-${i}`} entry={e} subclassTag={subclassTag} />)}
                    </div>
                </section>
            )}

            {isCaster && cantrips.length > 0 && (
                <section>
                    <MagicGroupHeader title="Cantrips" count={cantrips.length} color="rgba(93,142,232,0.8)" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '0.4rem' }}>
                        {cantrips.map((e, i) => <MagicCard key={`ct-${i}`} entry={e} subclassTag={subclassTag} />)}
                    </div>
                </section>
            )}

            {isCaster && spellLevels.map(lvl => (
                <section key={lvl}>
                    <MagicGroupHeader
                        title={`${lvl === 1 ? '1st' : lvl === 2 ? '2nd' : lvl === 3 ? '3rd' : `${lvl}th`}-Level Spells`}
                        count={spellsByLevel[lvl].length}
                        color="rgba(93,142,232,0.8)"
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '0.4rem' }}>
                        {spellsByLevel[lvl].map((e, i) => <MagicCard key={`s${lvl}-${i}`} entry={e} subclassTag={subclassTag} />)}
                    </div>
                </section>
            ))}
        </div>
    );
}

// Gear Tab - View only version
const ITEM_CATEGORY_META: Record<ItemCategory, { label: string; color: string }> = {
    weapon: { label: 'Weapon', color: 'rgba(228,90,74,0.85)' },
    armor: { label: 'Armor', color: 'rgba(93,142,232,0.85)' },
    shield: { label: 'Shield', color: 'rgba(80,180,200,0.85)' },
    magic: { label: 'Magic Item', color: 'rgba(160,100,240,0.85)' },
    potion: { label: 'Potion', color: 'rgba(80,200,120,0.85)' },
    scroll: { label: 'Scroll', color: 'rgba(240,220,80,0.85)' },
    tool: { label: 'Tool', color: 'rgba(180,140,80,0.85)' },
    clothing: { label: 'Clothing', color: 'rgba(200,120,180,0.85)' },
    trinket: { label: 'Trinket', color: 'rgba(160,180,160,0.85)' },
    ammunition: { label: 'Ammunition', color: 'rgba(200,160,80,0.85)' },
    misc: { label: 'Misc', color: 'rgba(140,140,140,0.85)' },
};

const COIN_META = [
    { key: 'pp' as const, label: 'Platinum', abbr: 'PP', color: 'rgba(180,210,240,0.9)', bg: 'rgba(180,210,240,0.08)', border: 'rgba(180,210,240,0.25)', worth: '10 gp' },
    { key: 'gp' as const, label: 'Gold', abbr: 'GP', color: 'rgba(212,175,55,0.95)', bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.3)', worth: '1 gp' },
    { key: 'sp' as const, label: 'Silver', abbr: 'SP', color: 'rgba(200,200,200,0.9)', bg: 'rgba(200,200,200,0.06)', border: 'rgba(200,200,200,0.2)', worth: '0.1 gp' },
    { key: 'cp' as const, label: 'Copper', abbr: 'CP', color: 'rgba(200,130,80,0.9)', bg: 'rgba(200,130,80,0.06)', border: 'rgba(200,130,80,0.2)', worth: '0.01 gp' },
] as const;

function inferCategory(name: string): ItemCategory {
    const n = name.toLowerCase();
    if (/sword|dagger|axe|mace|spear|staff|club|rapier|bow|crossbow|lance|flail|halberd|pike|trident|whip|morningstar|warhammer|battleaxe|longsword|shortsword|handaxe|greataxe|greatsword|scimitar|sickle|javelin|glaive/.test(n)) return 'weapon';
    if (/armor|mail|plate|breastplate|studded|padded|ringmail|splint|cuirass/.test(n)) return 'armor';
    if (/shield/.test(n)) return 'shield';
    if (/potion|elixir/.test(n)) return 'potion';
    if (/scroll/.test(n)) return 'scroll';
    if (/tool|kit|instrument|thieves|disguise|forgery|herbalism|poisoner|navigator|cartographer|mason|smith|cobbler|cook|glassblower|jeweler|leatherworker|carpenter|weaver/.test(n)) return 'tool';
    if (/cloak|clothes|robe|boots|gloves|hat|hood|mantle|vestment|cap/.test(n)) return 'clothing';
    if (/arrow|bolt|bullet|dart|sling/.test(n)) return 'ammunition';
    if (/trinket|bauble|charm|token|keepsake/.test(n)) return 'trinket';
    return 'misc';
}

function ItemRow({ item, index }: { item: EnrichedInventoryItem | InventoryItem; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const meta = ITEM_CATEGORY_META[item.category as ItemCategory] ?? ITEM_CATEGORY_META.misc;
    
    // Check if this is an enriched item (has full details from database)
    const isEnriched = 'description' in item && item.description;

    return (
        <>
            <div
                onClick={() => setExpanded(v => !v)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    borderBottom: '1px solid rgba(212,175,55,0.06)',
                    borderLeft: `3px solid ${meta.color}`,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,175,55,0.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            >
                {/* Name + badges */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {isEnriched ? (
                            <ItemTooltip item={item as EnrichedInventoryItem}>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff', cursor: 'help' }}>
                                    {item.name}
                                </span>
                            </ItemTooltip>
                        ) : (
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>
                                {item.name}
                            </span>
                        )}
                        {item.source === 'background' && (
                            <span style={{ fontSize: '0.55rem', fontWeight: '700', letterSpacing: '0.08em', color: 'rgba(212,175,55,0.45)', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '3px', padding: '0.05rem 0.3rem' }}>BG</span>
                        )}
                        {'equipped' in item && item.equipped && (
                            <span title="Equipped" style={{ fontSize: '0.7rem', color: 'rgba(80,200,120,0.8)' }}>⚔</span>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: '700', color: meta.color, background: `${meta.color.replace('0.85', '0.1')}`, border: `1px solid ${meta.color.replace('0.85', '0.2')}`, borderRadius: '4px', padding: '0.1rem 0.4rem' }}>
                            {meta.label}
                        </span>
                        {!expanded && item.description && (
                            <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.35)' }}>
                                Click for details
                            </span>
                        )}
                    </div>
                </div>

                {/* Quantity badge */}
                <div style={{
                    background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '60px',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-gold)', lineHeight: 1 }}>
                        {item.quantity}
                    </span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(212,175,55,0.5)', marginTop: '0.1rem' }}>
                        QTY
                    </span>
                </div>

                {/* Expand arrow */}
                <div style={{
                    color: 'rgba(212,175,55,0.35)',
                    fontSize: '0.8rem',
                    transition: 'transform 0.2s',
                    transform: expanded ? 'rotate(180deg)' : 'none',
                    flexShrink: 0
                }}>
                    ▾
                </div>
            </div>

            {/* Expanded details */}
            {expanded && isEnriched && (item as EnrichedInventoryItem).description && (
                <div style={{
                    padding: '1rem 1.25rem',
                    background: 'rgba(212,175,55,0.04)',
                    borderBottom: '1px solid rgba(212,175,55,0.1)',
                    borderLeft: `3px solid ${meta.color}`
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: (item as EnrichedInventoryItem).description ? '0.75rem' : 0 }}>
                        {(item as EnrichedInventoryItem).properties && (
                            <div>
                                <p style={{ margin: '0 0 0.2rem', fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Properties</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.7)' }}>{(item as EnrichedInventoryItem).properties!.join(', ')}</p>
                            </div>
                        )}
                        {(item as EnrichedInventoryItem).weight !== undefined && (
                            <div>
                                <p style={{ margin: '0 0 0.2rem', fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Weight</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.7)' }}>{(item as EnrichedInventoryItem).weight} lb</p>
                            </div>
                        )}
                        {(item as EnrichedInventoryItem).value && (
                            <div>
                                <p style={{ margin: '0 0 0.2rem', fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Value</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(212,175,55,0.75)', fontWeight: '600' }}>{(item as EnrichedInventoryItem).value}</p>
                            </div>
                        )}
                    </div>
                    {(item as EnrichedInventoryItem).description && (
                        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                            <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(244,232,208,0.7)', lineHeight: '1.65', fontStyle: 'italic' }}>
                                {(item as EnrichedInventoryItem).description}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

function GearTab({ char }: { char: CharacterData }) {
    const [bgData, setBgData] = useState<{ feature: { name: string; desc: string[] }; starting_equipment: { equipment: { name: string }; quantity: number }[] } | null>(null);
    const currency = char.currency;
    
    // Fetch enriched inventory from API
    const { data: inventoryData, loading: loadingInventory } = useCharacterInventory(char.id);
    
    // Use enriched inventory items
    const inventoryItems: EnrichedInventoryItem[] = inventoryData?.inventory ?? [];

    useEffect(() => {
        if (!char.background) {
            setBgData(null);
            return;
        }
        
        fetch(`/api/resources/backgrounds/${char.background}`)
            .then(res => res.json())
            .then(data => setBgData(data))
            .catch(err => {
                console.error('Failed to fetch background:', err);
                setBgData(null);
            });
    }, [char.background]);

    return (
        <div style={{ padding: '1.5rem 2rem 4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Currency (read-only) */}
            <section>
                <SectionHead>Currency</SectionHead>
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    {COIN_META.map(coin => (
                        <div key={coin.key} style={{ flex: '1 1 90px', minWidth: '90px', background: coin.bg, border: `1px solid ${coin.border}`, borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase', color: coin.color, opacity: 0.8 }}>{coin.label}</span>
                                <span style={{ fontSize: '0.58rem', color: 'rgba(244,232,208,0.25)' }}>{coin.worth}</span>
                            </div>
                            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: coin.color, lineHeight: 1 }}>
                                {currency[coin.key].toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: coin.color, opacity: 0.55 }}>{coin.abbr}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Inventory (read-only) */}
            <section>
                <SectionHead>Inventory</SectionHead>
                {loadingInventory ? (
                    <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.4)' }}>Loading inventory...</p>
                    </div>
                ) : inventoryItems.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {inventoryItems.map((item, i) => (
                            <ItemRow key={item.itemId + '-' + i} item={item} index={i} />
                        ))}
                    </div>
                ) : (
                    <div style={{ border: '1px dashed rgba(212,175,55,0.15)', borderRadius: '8px', padding: '3rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '2rem', opacity: 0.2 }}>🎒</span>
                        <p style={{ margin: '0.75rem 0 0', fontSize: '0.82rem', color: 'rgba(244,232,208,0.25)', fontStyle: 'italic' }}>
                            Pack is empty.
                        </p>
                    </div>
                )}
            </section>
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
    const displayClass = char && char.subclass && shouldDisplaySubclass(char.class, char.level ?? 1, true)
        ? `${fmt(char.class)} (${char.subclass.name})`
        : char
            ? fmt(char.class)
            : '';
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
                        <div 
                            className="character-view-tabs"
                            style={{
                                display: 'flex',
                                gap: '0',
                                borderBottom: '1px solid rgba(212,175,55,0.15)',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                overflowX: 'auto',
                                flexShrink: 0
                            }}
                        >
                            {[
                                { id: 'overview' as Tab, label: 'Overview', shortLabel: 'Overview' },
                                { id: 'magic' as Tab, label: 'Spells & Abilities', shortLabel: 'Magic' },
                                { id: 'gear' as Tab, label: 'Gear', shortLabel: 'Gear' },
                                { id: 'lore' as Tab, label: 'Lore', shortLabel: 'Lore' },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    className="tab-button"
                                    style={{
                                        flex: '1 1 0',
                                        minWidth: 'fit-content',
                                        padding: '0.85rem 1.25rem',
                                        background: tab === t.id ? 'rgba(212,175,55,0.12)' : 'transparent',
                                        border: 'none',
                                        borderBottom: tab === t.id ? '2px solid var(--color-gold)' : '2px solid transparent',
                                        color: tab === t.id ? 'var(--color-gold)' : 'rgba(244,232,208,0.5)',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.03em',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    <span className="tab-label-full">{t.label}</span>
                                    <span className="tab-label-short">{t.shortLabel}</span>
                                </button>
                            ))}
                        </div>
                        <style>{`
                            .tab-label-short {
                                display: none;
                            }
                            
                            @media (max-width: 768px) {
                                .character-view-tabs {
                                    padding: 0 0.5rem;
                                }
                                
                                .tab-button {
                                    padding: 0.7rem 1rem !important;
                                    font-size: 0.75rem !important;
                                }
                            }
                            
                            @media (max-width: 550px) {
                                .tab-label-full {
                                    display: none;
                                }
                                
                                .tab-label-short {
                                    display: inline;
                                }
                                
                                .tab-button {
                                    padding: 0.65rem 0.85rem !important;
                                    font-size: 0.72rem !important;
                                }
                            }
                        `}</style>

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
