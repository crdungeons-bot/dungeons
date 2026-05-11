'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link                             from 'next/link';
import { STATIC_BACKGROUNDS }           from '@/data/backgrounds';
import type { SpellEntry }              from '@/data/spells';
import type { SpellSlots, PactMagicSlots } from '@/data/spell-slots';
import { usesPactMagic }                from '@/data/spell-slots';
import LevelUpModal                     from '@/components/sections/levelup-modal';
import SpellSlotsDisplay                from '@/components/ui/spell-slots-display';
import { useCharacterInventory, type EnrichedInventoryItem } from '@/hooks/use-character-inventory';
import ItemTooltip from '@/components/ui/item-tooltip';
import AddItemModal from '@/components/ui/add-item-modal';

/* ═══════════════════════════════════════════════════════════════════
   Types
═══════════════════════════════════════════════════════════════════ */

type Stats    = { str: number; dex: number; con: number; int: number; wis: number; cha: number };
type Story    = { backstory?: string; personality?: string; ideals?: string; bonds?: string; flaws?: string; appearance?: string };
type Currency = { pp: number; gp: number; sp: number; cp: number };

type ItemCategory = 'weapon' | 'armor' | 'shield' | 'magic' | 'potion' | 'scroll' | 'tool' | 'clothing' | 'trinket' | 'ammunition' | 'misc';
type ItemRarity   = 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary' | 'artifact';

type InventoryItem = {
    id:                  string;
    name:                string;
    category:            ItemCategory;
    rarity?:             ItemRarity;
    quantity:            number;
    equipped?:           boolean;
    requiresAttunement?: boolean;
    attuned?:            boolean;
    weight?:             number;
    value?:              string;
    properties?:         string;
    description?:        string;
    source?:             'background' | 'purchased' | 'loot' | 'crafted';
};

type CharacterData = {
    id:            string;
    name:          string;
    race:          string;
    class:         string;
    background:    string;
    alignment:     string;
    level:         number;
    hp:            number | null;
    currency:      Currency;
    height:        string | null;
    weight:        string | null;
    age:           string | null;
    proficiencies: string[];
    stats:         Stats;
    story:         Story;
    feats?:        Array<{ name: string; benefit: string; level: number; statChoice: string | null }>;
    spellSlots:    SpellSlots | PactMagicSlots | null;
    createdAt:     string;
};

type Tab = 'overview' | 'magic' | 'gear' | 'loadouts' | 'lore';

/* ═══════════════════════════════════════════════════════════════════
   Static reference data
═══════════════════════════════════════════════════════════════════ */

const STAT_DEFS = [
    { key: 'str' as const, label: 'STR', full: 'Strength'     },
    { key: 'dex' as const, label: 'DEX', full: 'Dexterity'    },
    { key: 'con' as const, label: 'CON', full: 'Constitution' },
    { key: 'int' as const, label: 'INT', full: 'Intelligence' },
    { key: 'wis' as const, label: 'WIS', full: 'Wisdom'       },
    { key: 'cha' as const, label: 'CHA', full: 'Charisma'     },
];

const SKILL_GROUPS = [
    { ability: 'STR', color: 'rgba(228,90,74,0.85)',    skills: [{ index: 'skill-athletics',       name: 'Athletics'       }] },
    { ability: 'DEX', color: 'rgba(228,160,74,0.85)',   skills: [{ index: 'skill-acrobatics',       name: 'Acrobatics'      }, { index: 'skill-sleight-of-hand', name: 'Sleight of Hand' }, { index: 'skill-stealth',           name: 'Stealth'         }] },
    { ability: 'INT', color: 'rgba(93,142,232,0.85)',   skills: [{ index: 'skill-arcana',           name: 'Arcana'          }, { index: 'skill-history',         name: 'History'         }, { index: 'skill-investigation',     name: 'Investigation'   }, { index: 'skill-nature',            name: 'Nature'          }, { index: 'skill-religion',          name: 'Religion'        }] },
    { ability: 'WIS', color: 'rgba(80,200,100,0.85)',   skills: [{ index: 'skill-animal-handling',  name: 'Animal Handling' }, { index: 'skill-insight',         name: 'Insight'         }, { index: 'skill-medicine',          name: 'Medicine'        }, { index: 'skill-perception',        name: 'Perception'      }, { index: 'skill-survival',          name: 'Survival'        }] },
    { ability: 'CHA', color: 'rgba(193,93,232,0.85)',   skills: [{ index: 'skill-deception',        name: 'Deception'       }, { index: 'skill-intimidation',    name: 'Intimidation'    }, { index: 'skill-performance',       name: 'Performance'     }, { index: 'skill-persuasion',        name: 'Persuasion'      }] },
];

const ALIGNMENTS: Record<string, { label: string; desc: string }> = {
    'lawful-good':    { label: 'Lawful Good',    desc: 'Principled and compassionate. Acts with a strict code and genuine care for others.' },
    'neutral-good':   { label: 'Neutral Good',   desc: 'Does the best they can without being bound by rules or chaos,   acts from the heart.' },
    'chaotic-good':   { label: 'Chaotic Good',   desc: 'Follows their conscience regardless of law. Values freedom and kindness above order.' },
    'lawful-neutral': { label: 'Lawful Neutral',  desc: 'Order and tradition above all else,   not good or evil, just bound to a code.' },
    'true-neutral':   { label: 'True Neutral',    desc: 'Acts without strong moral preference, maintaining balance or living for themselves.' },
    'chaotic-neutral':{ label: 'Chaotic Neutral', desc: 'Values personal freedom above all. Follows whims, avoids authority, resists control.' },
    'lawful-evil':    { label: 'Lawful Evil',     desc: 'Uses order and structure as a tool for domination. Methodical, patient, and ruthless.' },
    'neutral-evil':   { label: 'Neutral Evil',    desc: 'Does whatever serves their interests. No loyalty to anyone,   utterly self-interested.' },
    'chaotic-evil':   { label: 'Chaotic Evil',    desc: 'Driven by destructive impulse and contempt for order. Dangerous, unpredictable, violent.' },
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
    const mod   = getMod(value);
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

function EmptyStory() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
            <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>📜</span>
            <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.35)' }}>No Story Written</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic', maxWidth: '300px', lineHeight: '1.6' }}>Every legend starts somewhere. This character's story has yet to be told.</p>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Spell slot progression table
   Full casters: wizard, sorcerer, cleric, druid, bard
   Half casters: paladin, ranger  (slots start at char level 2)
   Non-casters:  barbarian, fighter, monk, rogue, etc. → no leveled spells
═══════════════════════════════════════════════════════════════════ */

/* ── Combat stat lookups ── */

const RACE_SPEED: Record<string, number> = {
    dwarf: 25, gnome: 25, halfling: 25,
};

const UNARMORED_BONUS: Record<string, (s: Stats) => number> = {
    barbarian: s => Math.floor((s.con - 10) / 2),
    monk:      s => Math.floor((s.wis - 10) / 2),
};

function calcAC(charClass: string, stats: Stats): number {
    const dexMod  = Math.floor((stats.dex - 10) / 2);
    const extra   = UNARMORED_BONUS[charClass]?.(stats) ?? 0;
    return 10 + dexMod + extra;
}

function profBonus(level: number): string {
    return `+${Math.ceil(level / 4) + 1}`;
}

/* ── CombatStatsBar ── */

type CombatStat = { label: string; value: string; sub?: string; accent: string };

function CombatStatsBar({ char }: { char: CharacterData }) {
    const stats   = char.stats;
    const hasStats = stats && Object.keys(stats).length > 0;

    const dexMod  = hasStats ? Math.floor((stats.dex - 10) / 2) : 0;
    const initStr = dexMod >= 0 ? `+${dexMod}` : `${dexMod}`;
    const speed   = RACE_SPEED[char.race] ?? 30;
    const ac      = hasStats ? calcAC(char.class, stats) : 10;

    const combatStats: CombatStat[] = [
        {
            label:  'Max HP',
            value:  char.hp !== null ? `${char.hp}` : ', ',
            sub:    'Hit Points',
            accent: 'rgba(220,80,80,0.85)',
        },
        {
            label:  'AC',
            value:  hasStats ? `${ac}` : ', ',
            sub:    char.class === 'barbarian' ? 'Unarmored (CON)' : char.class === 'monk' ? 'Unarmored (WIS)' : 'Unarmored',
            accent: 'rgba(93,142,232,0.85)',
        },
        {
            label:  'Speed',
            value:  `${speed}`,
            sub:    'feet / turn',
            accent: 'rgba(80,200,120,0.85)',
        },
        {
            label:  'Initiative',
            value:  hasStats ? initStr : ', ',
            sub:    'DEX modifier',
            accent: dexMod >= 0 ? 'rgba(240,200,80,0.85)' : 'rgba(220,80,80,0.85)',
        },
        {
            label:  'Prof. Bonus',
            value:  profBonus(char.level),
            sub:    `Level ${char.level}`,
            accent: 'rgba(160,100,240,0.85)',
        },
    ];

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {combatStats.map(stat => (
                <div
                    key={stat.label}
                    style={{
                        flex:          '1 1 80px',
                        minWidth:      '72px',
                        background:    `${stat.accent.replace('0.85', '0.06')}`,
                        border:        `1px solid ${stat.accent.replace('0.85', '0.22')}`,
                        borderRadius:  '10px',
                        padding:       '0.55rem 0.7rem 0.5rem',
                        display:       'flex',
                        flexDirection: 'column',
                        alignItems:    'center',
                        gap:           '0.05rem',
                        textAlign:     'center',
                    }}
                >
                    <span style={{
                        fontSize:      '0.55rem',
                        fontWeight:    '800',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color:         stat.accent,
                        opacity:       0.75,
                        whiteSpace:    'nowrap',
                    }}>
                        {stat.label}
                    </span>
                    <span style={{
                        fontSize:   '1.6rem',
                        fontWeight: '900',
                        lineHeight: 1,
                        color:      '#fff',
                        marginTop:  '0.1rem',
                    }}>
                        {stat.value}
                    </span>
                    {stat.sub && (
                        <span style={{
                            fontSize:   '0.6rem',
                            color:      'rgba(244,232,208,0.3)',
                            marginTop:  '0.1rem',
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

const FULL_CASTERS  = new Set(['wizard','sorcerer','cleric','druid','bard','warlock']);
const HALF_CASTERS  = new Set(['paladin','ranger']);

const FULL_SLOT_TABLE: Record<number, number> = {
    1:1, 2:1, 3:2, 4:2, 5:3, 6:3, 7:4, 8:4, 9:5, 10:5,
    11:6, 12:6, 13:7, 14:7, 15:8, 16:8, 17:9, 18:9, 19:9, 20:9,
};

const HALF_SLOT_TABLE: Record<number, number> = {
    1:0, 2:1, 3:1, 4:1, 5:2, 6:2, 7:3, 8:3, 9:4, 10:4,
    11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5, 19:5, 20:5,
};

function maxSpellLevel(charClass: string, charLevel: number): number {
    if (FULL_CASTERS.has(charClass))  return FULL_SLOT_TABLE[charLevel]  ?? 1;
    if (HALF_CASTERS.has(charClass))  return HALF_SLOT_TABLE[charLevel]  ?? 0;
    return 0; // non-casters
}

const SCHOOL_COLORS: Record<string, string> = {
    abjuration:'rgba(80,180,240,0.85)', conjuration:'rgba(130,200,80,0.85)',
    divination:'rgba(240,230,80,0.85)', enchantment:'rgba(240,80,160,0.85)',
    evocation:'rgba(240,120,60,0.85)',  illusion:'rgba(160,100,240,0.85)',
    necromancy:'rgba(80,200,140,0.85)', transmutation:'rgba(240,180,60,0.85)',
};

const TYPE_BG: Record<string,string> = {
    'class-ability':  'rgba(212,175,55,0.07)',
    'racial-ability': 'rgba(80,200,100,0.07)',
    'spell':          'rgba(93,142,232,0.07)',
};
const TYPE_BORDER: Record<string,string> = {
    'class-ability':  'rgba(212,175,55,0.18)',
    'racial-ability': 'rgba(80,200,100,0.18)',
    'spell':          'rgba(93,142,232,0.18)',
};

function MagicCard({ entry, locked }: { entry: SpellEntry; locked?: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const type = entry.type ?? 'spell';

    return (
        <div
            onClick={() => !locked && setExpanded(v => !v)}
            style={{
                background:   locked ? 'rgba(0,0,0,0.15)' : TYPE_BG[type],
                border:       `1px solid ${locked ? 'rgba(255,255,255,0.05)' : TYPE_BORDER[type]}`,
                borderRadius: '9px',
                padding:      '0.75rem 1rem',
                cursor:       locked ? 'default' : 'pointer',
                opacity:      locked ? 0.45 : 1,
                transition:   'opacity 0.15s, border-color 0.15s',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ flex: 1, minWidth: '120px', fontSize: '0.88rem', fontWeight: '700', color: locked ? 'rgba(244,232,208,0.5)' : '#fff', lineHeight: '1.3' }}>
                    {entry.name}
                </span>
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
                    {/* Level */}
                    {type === 'spell' && entry.level !== undefined && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '800', background: 'rgba(93,142,232,0.2)', color: 'rgba(93,142,232,0.9)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {entry.level === 0 ? 'Cantrip' : `Lv ${entry.level}`}
                        </span>
                    )}
                    {type !== 'spell' && entry.levelGained !== undefined && locked && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '800', color: 'rgba(244,232,208,0.3)', borderRadius: '999px', padding: '0.05rem 0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            Unlocks lv{entry.levelGained}
                        </span>
                    )}
                    {/* School */}
                    {entry.school && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', background: `${SCHOOL_COLORS[entry.school] ?? 'rgba(200,200,200,0.2)'}33`, color: SCHOOL_COLORS[entry.school] ?? 'rgba(200,200,200,0.7)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {fmt(entry.school)}
                        </span>
                    )}
                    {/* Action type */}
                    <span style={{ fontSize: '0.62rem', color: 'rgba(244,232,208,0.4)', whiteSpace: 'nowrap' }}>{fmt(entry.actionType)}</span>
                    {/* C = concentration */}
                    {entry.concentration && (
                        <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'rgba(240,180,60,0.85)', border: '1px solid rgba(240,180,60,0.3)', borderRadius: '4px', padding: '0.02rem 0.25rem' }}>C</span>
                    )}
                    {/* R = ritual */}
                    {entry.ritual && (
                        <span style={{ fontSize: '0.58rem', fontWeight: '800', color: 'rgba(160,100,240,0.85)', border: '1px solid rgba(160,100,240,0.3)', borderRadius: '4px', padding: '0.02rem 0.25rem' }}>R</span>
                    )}
                    {!locked && (
                        <span style={{ fontSize: '0.7rem', color: 'rgba(212,175,55,0.35)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
                    )}
                </div>
            </div>

            {/* Preview */}
            {!expanded && !locked && (
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.77rem', color: 'rgba(244,232,208,0.5)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry.description.replace(/\*\*/g, '').replace(/\n/g, ' ')}
                </p>
            )}

            {/* Expanded */}
            {expanded && !locked && (
                <div style={{ marginTop: '0.65rem', borderTop: `1px solid ${TYPE_BORDER[type]}`, paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {/* Spell stats */}
                    {type === 'spell' && (entry.range || entry.duration || entry.components) && (
                        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            {entry.range      && <MiniStat label="Range"      val={entry.range} />}
                            {entry.duration   && <MiniStat label="Duration"   val={entry.duration} />}
                            {entry.components && <MiniStat label="Components" val={entry.components.map(c => c.toUpperCase()).join(', ') + (entry.material ? ` (${entry.material})` : '')} />}
                        </div>
                    )}
                    {/* Ability stats */}
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

/* ── tiny filter pill used only inside SpellsAbilitiesTab ── */
function FPill({ label, active, onClick, color }: {
    label: string; active: boolean; onClick: () => void; color?: string;
}) {
    const c = color ?? 'rgba(212,175,55,0.9)';
    return (
        <button onClick={onClick} style={{
            padding:         '0.18rem 0.6rem',
            borderRadius:    '999px',
            border:          `1.5px solid ${active ? c : 'rgba(212,175,55,0.18)'}`,
            backgroundColor: active ? c : 'transparent',
            color:           active ? '#000' : 'rgba(244,232,208,0.5)',
            fontSize:        '0.7rem',
            fontWeight:      active ? '700' : '400',
            cursor:          'pointer',
            whiteSpace:      'nowrap',
            transition:      'all 0.12s',
        }}>{label}</button>
    );
}

function SpellsAbilitiesTab({ char }: { char: CharacterData }) {
    const charClass = char.class;
    const charRace  = char.race;
    const charLevel = char.level ?? 1;
    const maxSlot   = maxSpellLevel(charClass, charLevel);
    const isCaster  = FULL_CASTERS.has(charClass) || HALF_CASTERS.has(charClass);

    /* ── Fetch entries for this character from the DB ── */
    const [allEntries,    setAllEntries]    = useState<SpellEntry[]>([]);
    const [loadingMagic,  setLoadingMagic]  = useState(true);

    useEffect(() => {
        setLoadingMagic(true);
        fetch(`/api/resources/spells-abilities?class=${encodeURIComponent(charClass)}&race=${encodeURIComponent(charRace)}`)
            .then(r => r.json())
            .then(data => { setAllEntries(data.entries ?? []); setLoadingMagic(false); })
            .catch(() => setLoadingMagic(false));
    }, [charClass, charRace]);

    /* ── Step 1: pre-filter by class / race / level ── */
    const { racialAbilities, classAbilitiesUnlocked, classAbilitiesLocked, cantrips, spellsByLevel } = useMemo(() => {
        const racial:   SpellEntry[] = [];
        const clsHave:  SpellEntry[] = [];
        const clsLater: SpellEntry[] = [];
        const cant:     SpellEntry[] = [];
        const byLvl:    Record<number, SpellEntry[]> = {};

        for (const e of allEntries) {
            const type = e.type ?? 'spell';
            if (type === 'racial-ability') {
                if (e.races?.includes(charRace) && (e.levelGained ?? 1) <= charLevel) racial.push(e);
                continue;
            }
            if (type === 'class-ability') {
                if (!e.classes?.includes(charClass)) continue;
                const gained = e.levelGained ?? 1;
                if (gained <= charLevel) clsHave.push(e);
                else                    clsLater.push(e);
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
        clsHave.sort((a, b)  => (a.levelGained ?? 1) - (b.levelGained ?? 1));
        clsLater.sort((a, b) => (a.levelGained ?? 1) - (b.levelGained ?? 1));
        return { racialAbilities: racial, classAbilitiesUnlocked: clsHave, classAbilitiesLocked: clsLater, cantrips: cant, spellsByLevel: byLvl };
    }, [allEntries, charClass, charRace, charLevel, maxSlot, isCaster]);

    /* ── Step 2: derive available filter options from the pre-filtered set ── */
    const allEligible = useMemo(() => [
        ...racialAbilities, ...classAbilitiesUnlocked, ...classAbilitiesLocked,
        ...cantrips, ...Object.values(spellsByLevel).flat(),
    ], [racialAbilities, classAbilitiesUnlocked, classAbilitiesLocked, cantrips, spellsByLevel]);

    const availableSchools      = useMemo(() => Array.from(new Set(allEligible.map(e => e.school).filter(Boolean) as string[])).sort(), [allEligible]);
    const availableActionTypes  = useMemo(() => Array.from(new Set(allEligible.map(e => e.actionType).filter(Boolean))).sort(), [allEligible]);

    /* ── Step 3: filter UI state ── */
    const [filtersOpen,  setFiltersOpen]  = useState(false);
    const [search,       setSearch]       = useState('');
    const [typeFilter,   setTypeFilter]   = useState<Set<string>>(new Set());
    const [levelFilter,  setLevelFilter]  = useState<Set<number>>(new Set());
    const [schoolFilter, setSchoolFilter] = useState<Set<string>>(new Set());
    const [actionFilter, setActionFilter] = useState<Set<string>>(new Set());
    const [compFilter,   setCompFilter]   = useState<{v:boolean;s:boolean;m:boolean}>({ v:false, s:false, m:false });
    const [concFilter,   setConcFilter]   = useState<boolean|null>(null);
    const [ritualFilter, setRitualFilter] = useState<boolean|null>(null);

    const activeCount = [
        typeFilter.size, levelFilter.size, schoolFilter.size, actionFilter.size,
        (compFilter.v || compFilter.s || compFilter.m) ? 1 : 0,
        concFilter   !== null ? 1 : 0,
        ritualFilter !== null ? 1 : 0,
        search.trim().length > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    function clearFilters() {
        setSearch(''); setTypeFilter(new Set()); setLevelFilter(new Set());
        setSchoolFilter(new Set()); setActionFilter(new Set());
        setCompFilter({ v:false, s:false, m:false }); setConcFilter(null); setRitualFilter(null);
    }

    function toggleSet<T>(s: Set<T>, v: T): Set<T> { const n = new Set(s); n.has(v) ? n.delete(v) : n.add(v); return n; }

    /* ── Step 4: apply UI filters to each bucket ── */
    function applyFilters(list: SpellEntry[]): SpellEntry[] {
        const q = search.toLowerCase();
        return list.filter(e => {
            const type = e.type ?? 'spell';
            if (q && !e.name.toLowerCase().includes(q) && !e.description.toLowerCase().includes(q)) return false;
            if (typeFilter.size > 0 && !typeFilter.has(type)) return false;
            if (levelFilter.size > 0) {
                const lvl = type === 'spell' ? e.level : e.levelGained;
                if (lvl === undefined || !levelFilter.has(lvl)) return false;
            }
            if (schoolFilter.size > 0 && (!e.school || !schoolFilter.has(e.school))) return false;
            if (actionFilter.size > 0 && !actionFilter.has(e.actionType)) return false;
            if (compFilter.v && !e.components?.includes('v')) return false;
            if (compFilter.s && !e.components?.includes('s')) return false;
            if (compFilter.m && !e.components?.includes('m')) return false;
            if (concFilter   !== null && e.concentration !== concFilter)   return false;
            if (ritualFilter !== null && e.ritual        !== ritualFilter) return false;
            return true;
        });
    }

    const fRacial       = useMemo(() => applyFilters(racialAbilities),      [racialAbilities,       search, typeFilter, levelFilter, schoolFilter, actionFilter, compFilter, concFilter, ritualFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    const fClassHave    = useMemo(() => applyFilters(classAbilitiesUnlocked),[classAbilitiesUnlocked,search, typeFilter, levelFilter, schoolFilter, actionFilter, compFilter, concFilter, ritualFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    const fClassLater   = useMemo(() => applyFilters(classAbilitiesLocked),  [classAbilitiesLocked,  search, typeFilter, levelFilter, schoolFilter, actionFilter, compFilter, concFilter, ritualFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    const fCantrips     = useMemo(() => applyFilters(cantrips),              [cantrips,              search, typeFilter, levelFilter, schoolFilter, actionFilter, compFilter, concFilter, ritualFilter]); // eslint-disable-line react-hooks/exhaustive-deps
    const fByLevel      = useMemo(() => {
        const out: Record<number, SpellEntry[]> = {};
        for (const [lvl, arr] of Object.entries(spellsByLevel)) {
            const filtered = applyFilters(arr);
            if (filtered.length > 0) out[Number(lvl)] = filtered;
        }
        return out;
    }, [spellsByLevel, search, typeFilter, levelFilter, schoolFilter, actionFilter, compFilter, concFilter, ritualFilter]); // eslint-disable-line react-hooks/exhaustive-deps

    const fSpellLevels  = Object.keys(fByLevel).map(Number).sort((a, b) => a - b);
    const totalFiltered = fRacial.length + fClassHave.length + fCantrips.length + fSpellLevels.reduce((s,l) => s + fByLevel[l].length, 0);
    const totalAll      = racialAbilities.length + classAbilitiesUnlocked.length + cantrips.length + Object.values(spellsByLevel).reduce((s,a) => s + a.length, 0);
    const hasAnything   = allEligible.length > 0;

    const spellSchoolColors: Record<string, string> = {
        abjuration:'rgba(80,180,240,0.85)', conjuration:'rgba(130,200,80,0.85)',
        divination:'rgba(240,230,80,0.85)', enchantment:'rgba(240,80,160,0.85)',
        evocation:'rgba(240,120,60,0.85)',  illusion:'rgba(160,100,240,0.85)',
        necromancy:'rgba(80,200,140,0.85)', transmutation:'rgba(240,180,60,0.85)',
    };

    if (loadingMagic) {
        return (
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ height: '60px', background: 'rgba(212,175,55,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.08)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.08}s` }} />
                ))}
                <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
            </div>
        );
    }

    if (!hasAnything) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>🔮</span>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>No spells or abilities found for this character.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* ── Filter bar (sticky) ── */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-primary)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '0.65rem 2rem' }}>

                {/* Top row: search + toggle */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search spells & abilities…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            flex:         1,
                            padding:      '0.4rem 0.7rem',
                            background:   'rgba(212,175,55,0.05)',
                            border:       '1.5px solid rgba(212,175,55,0.18)',
                            borderRadius: '7px',
                            color:        '#fff',
                            fontSize:     '0.8rem',
                            outline:      'none',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.45)'}
                        onBlur={e  => e.target.style.borderColor = 'rgba(212,175,55,0.18)'}
                    />
                    <button
                        onClick={() => setFiltersOpen(v => !v)}
                        style={{
                            padding:      '0.4rem 0.75rem',
                            background:   filtersOpen ? 'rgba(212,175,55,0.1)' : 'transparent',
                            border:       '1.5px solid rgba(212,175,55,0.22)',
                            borderRadius: '7px',
                            color:        'var(--color-gold)',
                            fontSize:     '0.75rem',
                            fontWeight:   '700',
                            cursor:       'pointer',
                            display:      'flex',
                            alignItems:   'center',
                            gap:          '0.35rem',
                            whiteSpace:   'nowrap',
                            flexShrink:   0,
                        }}
                    >
                        {filtersOpen ? '▲' : '▼'} Filters
                        {activeCount > 0 && (
                            <span style={{ background: 'var(--color-gold)', color: '#000', borderRadius: '999px', fontSize: '0.6rem', fontWeight: '800', padding: '0 0.35rem', minWidth: '16px', textAlign: 'center' }}>
                                {activeCount}
                            </span>
                        )}
                    </button>
                    {/* result count */}
                    <span style={{ fontSize: '0.72rem', color: 'rgba(244,232,208,0.3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {activeCount > 0 ? `${totalFiltered} / ${totalAll}` : totalAll}
                    </span>
                </div>

                {/* Expanded filter panel */}
                {filtersOpen && (
                    <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                        {/* Type */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', minWidth: '56px' }}>Type</span>
                            {(['spell','class-ability','racial-ability'] as const).map(t => (
                                <FPill key={t}
                                    label={t === 'spell' ? 'Spells' : t === 'class-ability' ? 'Class Abilities' : 'Racial Abilities'}
                                    active={typeFilter.has(t)}
                                    onClick={() => setTypeFilter(p => toggleSet(p, t))}
                                    color={t === 'spell' ? 'rgba(93,142,232,0.9)' : t === 'class-ability' ? 'rgba(212,175,55,0.9)' : 'rgba(80,200,100,0.9)'}
                                />
                            ))}
                        </div>

                        {/* Level */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', minWidth: '56px' }}>Level</span>
                            {[0,1,2,3,4,5,6,7,8,9].map(lvl => (
                                <FPill key={lvl}
                                    label={lvl === 0 ? 'Cantrip' : `${lvl}`}
                                    active={levelFilter.has(lvl)}
                                    onClick={() => setLevelFilter(p => toggleSet(p, lvl))}
                                />
                            ))}
                        </div>

                        {/* Action Type */}
                        {availableActionTypes.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', minWidth: '56px' }}>Action</span>
                                {availableActionTypes.map(a => (
                                    <FPill key={a}
                                        label={a.split('-').map((w:string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        active={actionFilter.has(a)}
                                        onClick={() => setActionFilter(p => toggleSet(p, a))}
                                    />
                                ))}
                            </div>
                        )}

                        {/* School */}
                        {availableSchools.length > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', minWidth: '56px' }}>School</span>
                                {availableSchools.map(s => (
                                    <FPill key={s}
                                        label={s.charAt(0).toUpperCase() + s.slice(1)}
                                        active={schoolFilter.has(s)}
                                        onClick={() => setSchoolFilter(p => toggleSet(p, s))}
                                        color={spellSchoolColors[s] ?? 'rgba(200,200,200,0.85)'}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Components + Concentration + Ritual */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', minWidth: '56px' }}>Misc</span>
                            {(['v','s','m'] as const).map(c => (
                                <FPill key={c} label={c.toUpperCase()} active={compFilter[c]} onClick={() => setCompFilter(p => ({ ...p, [c]: !p[c] }))} />
                            ))}
                            <div style={{ width: '1px', height: '16px', background: 'rgba(212,175,55,0.15)' }} />
                            <FPill label="Concentration" active={concFilter === true}  onClick={() => setConcFilter(p => p === true  ? null : true)}  color="rgba(240,180,60,0.9)" />
                            <FPill label="Non-Conc."     active={concFilter === false} onClick={() => setConcFilter(p => p === false ? null : false)} />
                            <FPill label="Ritual"        active={ritualFilter === true} onClick={() => setRitualFilter(p => p === true ? null : true)} color="rgba(160,100,240,0.9)" />
                        </div>

                        {/* Clear */}
                        {activeCount > 0 && (
                            <button onClick={clearFilters} style={{ alignSelf: 'flex-start', padding: '0.2rem 0.75rem', background: 'rgba(220,80,80,0.08)', border: '1px solid rgba(220,80,80,0.25)', borderRadius: '6px', color: 'rgba(220,80,80,0.75)', fontSize: '0.72rem', fontWeight: '700', cursor: 'pointer' }}>
                                ✕ Clear {activeCount} filter{activeCount !== 1 ? 's' : ''}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ── Content ── */}
            <div style={{ padding: '0.75rem 2rem 4rem' }}>

                {/* Spell Slots */}
                <section style={{ marginBottom: '2rem' }}>
                    <SpellSlotsDisplay
                        spellSlots={char.spellSlots}
                        className=""
                        isPactMagic={usesPactMagic(char.class)}
                    />
                </section>

                {/* Racial abilities */}
                {fRacial.length > 0 && (
                    <section>
                        <MagicGroupHeader title={`Racial Abilities,   ${fmt(charRace)}`} count={fRacial.length} color="rgba(80,200,100,0.8)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {fRacial.map((e, i) => <MagicCard key={`r-${i}`} entry={e} />)}
                        </div>
                    </section>
                )}

                {/* Class abilities – unlocked */}
                {fClassHave.length > 0 && (
                    <section>
                        <MagicGroupHeader title={`${fmt(charClass)} Abilities,   Level ${charLevel}`} count={fClassHave.length} color="rgba(212,175,55,0.8)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {fClassHave.map((e, i) => <MagicCard key={`c-${i}`} entry={e} />)}
                        </div>
                    </section>
                )}

                {/* Cantrips */}
                {isCaster && fCantrips.length > 0 && (
                    <section>
                        <MagicGroupHeader title="Cantrips" count={fCantrips.length} color="rgba(93,142,232,0.8)" />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '0.4rem' }}>
                            {fCantrips.map((e, i) => <MagicCard key={`ct-${i}`} entry={e} />)}
                        </div>
                    </section>
                )}

                {/* Leveled spells */}
                {isCaster && fSpellLevels.map(lvl => (
                    <section key={lvl}>
                        <MagicGroupHeader
                            title={`${lvl === 1 ? '1st' : lvl === 2 ? '2nd' : lvl === 3 ? '3rd' : `${lvl}th`}-Level Spells`}
                            count={fByLevel[lvl].length}
                            color="rgba(93,142,232,0.8)"
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '0.4rem' }}>
                            {fByLevel[lvl].map((e, i) => <MagicCard key={`s${lvl}-${i}`} entry={e} />)}
                        </div>
                    </section>
                ))}

                {/* No results message when filters active */}
                {activeCount > 0 && totalFiltered === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic', fontSize: '0.85rem' }}>
                        No results match your filters.{' '}
                        <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Coming abilities (locked),   always shown regardless of filters */}
                {fClassLater.length > 0 && (
                    <section>
                        <MagicGroupHeader title="Coming Soon,   Level Up to Unlock" count={fClassLater.length} color="rgba(244,232,208,0.2)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {fClassLater.map((e, i) => <MagicCard key={`cl-${i}`} entry={e} locked />)}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Tab content components
═══════════════════════════════════════════════════════════════════ */

function OverviewTab({ char }: { char: CharacterData }) {
    const profSet = new Set(char.proficiencies);
    const hasStats = char.stats && Object.keys(char.stats).length > 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1.75rem 2rem' }}>

            {/* Ability Scores */}
            {hasStats ? (
                <section>
                    <SectionHead>Ability Scores</SectionHead>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '0.6rem' }}>
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
                        {char.feats.map((feat: { name: string; benefit: string; level: number; statChoice: string | null }, idx: number) => (
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
                        { label: 'Race',       value: fmt(char.race)       },
                        { label: 'Class',      value: fmt(char.class)      },
                        { label: 'Background', value: fmt(char.background) },
                        { label: 'Alignment',  value: fmt(char.alignment)  },
                        { label: 'Level',      value: `Level ${char.level}` },
                    ].map(item => (
                        <div key={item.label} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.75rem 1rem' }}>
                            <p style={{ margin: '0 0 0.2rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>{item.label}</p>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function LoadoutsTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
            <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>⚔️</span>
            <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.35)' }}>Loadouts</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic', maxWidth: '320px', lineHeight: '1.6' }}>
                    Save and swap equipment builds,   coming in a future update.
                </p>
            </div>
        </div>
    );
}

/* ── Gear tab helpers ────────────────────────────────────────────── */

const ITEM_CATEGORY_META: Record<ItemCategory, { label: string; color: string }> = {
    weapon:     { label: 'Weapon',      color: 'rgba(228,90,74,0.85)'   },
    armor:      { label: 'Armor',       color: 'rgba(93,142,232,0.85)'  },
    shield:     { label: 'Shield',      color: 'rgba(80,180,200,0.85)'  },
    magic:      { label: 'Magic Item',  color: 'rgba(160,100,240,0.85)' },
    potion:     { label: 'Potion',      color: 'rgba(80,200,120,0.85)'  },
    scroll:     { label: 'Scroll',      color: 'rgba(240,220,80,0.85)'  },
    tool:       { label: 'Tool',        color: 'rgba(180,140,80,0.85)'  },
    clothing:   { label: 'Clothing',    color: 'rgba(200,120,180,0.85)' },
    trinket:    { label: 'Trinket',     color: 'rgba(160,180,160,0.85)' },
    ammunition: { label: 'Ammunition',  color: 'rgba(200,160,80,0.85)'  },
    misc:       { label: 'Misc',        color: 'rgba(140,140,140,0.85)' },
};

const RARITY_COLORS: Record<ItemRarity, string> = {
    common:    'rgba(180,180,180,0.8)',
    uncommon:  'rgba(80,200,120,0.9)',
    rare:      'rgba(93,142,232,0.9)',
    'very-rare':'rgba(160,100,240,0.9)',
    legendary: 'rgba(240,150,60,0.9)',
    artifact:  'rgba(212,175,55,0.9)',
};

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

const COIN_META = [
    { key: 'pp' as const, label: 'Platinum', abbr: 'PP', color: 'rgba(180,210,240,0.9)', bg: 'rgba(180,210,240,0.08)', border: 'rgba(180,210,240,0.25)', worth: '10 gp' },
    { key: 'gp' as const, label: 'Gold',     abbr: 'GP', color: 'rgba(212,175,55,0.95)', bg: 'rgba(212,175,55,0.08)',  border: 'rgba(212,175,55,0.3)',   worth: '1 gp' },
    { key: 'sp' as const, label: 'Silver',   abbr: 'SP', color: 'rgba(200,200,200,0.9)', bg: 'rgba(200,200,200,0.06)', border: 'rgba(200,200,200,0.2)',   worth: '0.1 gp' },
    { key: 'cp' as const, label: 'Copper',   abbr: 'CP', color: 'rgba(200,130,80,0.9)',  bg: 'rgba(200,130,80,0.06)',  border: 'rgba(200,130,80,0.2)',    worth: '0.01 gp' },
] as const;

/* ── Table row ── */
function ItemRow({ item, index }: { item: EnrichedInventoryItem | InventoryItem; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const meta = ITEM_CATEGORY_META[item.category as ItemCategory] ?? ITEM_CATEGORY_META.misc;
    
    // Check if this is an enriched item (has full details from database)
    const isEnriched = 'description' in item && item.description;

    return (
        <>
            <div
                onClick={() => item.description && setExpanded(v => !v)}
                style={{
                    display:       'grid',
                    gridTemplateColumns: '4px 1fr 100px 160px 56px 64px 44px 44px',
                    alignItems:    'center',
                    gap:           '0',
                    minHeight:     '42px',
                    background:    index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)',
                    cursor:        item.description ? 'pointer' : 'default',
                    transition:    'background 0.1s',
                    borderBottom:  '1px solid rgba(212,175,55,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,175,55,0.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.08)'}
            >
                {/* Category color bar */}
                <div style={{ alignSelf: 'stretch', background: meta.color, opacity: 0.7 }} />

                {/* Name */}
                <div style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                    {isEnriched ? (
                        <ItemTooltip item={item as EnrichedInventoryItem}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: (item as EnrichedInventoryItem).rarity ? RARITY_COLORS[(item as EnrichedInventoryItem).rarity as ItemRarity] ?? '#fff' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'help' }}>
                                {item.name}
                            </span>
                        </ItemTooltip>
                    ) : (
                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.name}
                        </span>
                    )}
                    {item.source === 'background' && (
                        <span style={{ fontSize: '0.55rem', fontWeight: '700', letterSpacing: '0.08em', color: 'rgba(212,175,55,0.45)', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '3px', padding: '0.05rem 0.3rem', flexShrink: 0 }}>BG</span>
                    )}
                    {'requiresAttunement' in item && item.requiresAttunement && (
                        <span title="Requires Attunement" style={{ fontSize: '0.6rem', color: item.attuned ? 'rgba(160,100,240,0.9)' : 'rgba(160,100,240,0.35)', flexShrink: 0 }}>✦</span>
                    )}
                </div>

                {/* Category */}
                <div style={{ padding: '0 0.5rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: meta.color, background: `${meta.color.replace('0.85', '0.1')}`, border: `1px solid ${meta.color.replace('0.85', '0.2')}`, borderRadius: '4px', padding: '0.1rem 0.4rem', whiteSpace: 'nowrap' }}>
                        {meta.label}
                    </span>
                </div>

                {/* Properties */}
                <div style={{ padding: '0 0.5rem', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(244,232,208,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                        {item.properties ?? ', '}
                    </span>
                </div>

                {/* Weight */}
                <div style={{ padding: '0 0.5rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(244,232,208,0.4)' }}>
                        {item.weight !== undefined ? `${item.weight} lb` : ', '}
                    </span>
                </div>

                {/* Value */}
                <div style={{ padding: '0 0.5rem', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.65)', whiteSpace: 'nowrap' }}>
                        {item.value ?? ', '}
                    </span>
                </div>

                {/* Qty */}
                <div style={{ padding: '0 0.5rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'rgba(244,232,208,0.6)' }}>
                        {item.quantity}
                    </span>
                </div>

                {/* Equipped */}
                <div style={{ padding: '0 0.5rem', textAlign: 'center' }}>
                    {item.equipped && <span title="Equipped" style={{ fontSize: '0.75rem', color: 'rgba(80,200,120,0.8)' }}>⚔</span>}
                </div>
            </div>

            {/* Expanded description */}
            {expanded && item.description && (
                <div style={{ gridColumn: '1/-1', padding: '0.6rem 1.25rem 0.75rem', background: 'rgba(212,175,55,0.04)', borderBottom: '1px solid rgba(212,175,55,0.08)', borderLeft: `3px solid ${meta.color}` }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.65)', lineHeight: '1.65', fontStyle: 'italic' }}>
                        {item.description}
                    </p>
                </div>
            )}
        </>
    );
}

/* ── Table header ── */
function TableHeader() {
    const cell = (label: string, align: 'left' | 'center' | 'right' = 'left', title?: string) => (
        <div title={title} style={{ padding: '0.45rem 0.5rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)', textAlign: align }}>
            {label}
        </div>
    );
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '4px 1fr 100px 160px 56px 64px 44px 44px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px 8px 0 0', position: 'sticky', top: 0, zIndex: 2 }}>
            <div />
            {cell('Item Name')}
            {cell('Type')}
            {cell('Properties')}
            {cell('Wt.', 'center', 'Weight (lbs)')}
            {cell('Value', 'right')}
            {cell('Qty', 'center')}
            {cell('⚔', 'center', 'Equipped')}
        </div>
    );
}

/* ── Main GearTab ── */
function GearTab({ char }: { char: CharacterData }) {
    // Fetch enriched inventory from API
    const { data: inventoryData, loading: loadingInventory, refetch } = useCharacterInventory(char.id);

    // Currency state,   editable inline
    const [currency,    setCurrency]    = useState<Currency>(char.currency);
    const [editCurrency,setEditCurrency]= useState(false);
    const [saving,      setSaving]      = useState(false);
    
    // Add item modal state
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    
    // Use enriched inventory items
    const inventoryItems: EnrichedInventoryItem[] = inventoryData?.inventory ?? [];

    async function saveCurrency() {
        setSaving(true);
        try {
            await fetch(`/api/characters/${char.id}`, {
                method:  'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ currency }),
            });
            setEditCurrency(false);
        } finally { setSaving(false); }
    }

    return (
        <div style={{ padding: '1.5rem 2rem 4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* ── Currency ── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <SectionHead>Currency</SectionHead>
                    <button
                        onClick={() => editCurrency ? saveCurrency() : setEditCurrency(true)}
                        style={{ marginLeft: 'auto', padding: '0.2rem 0.65rem', background: 'transparent', border: `1px solid ${editCurrency ? 'rgba(80,200,120,0.4)' : 'rgba(212,175,55,0.2)'}`, borderRadius: '6px', color: editCurrency ? 'rgba(80,200,120,0.8)' : 'rgba(212,175,55,0.5)', fontSize: '0.68rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                        {saving ? 'Saving…' : editCurrency ? '✓ Save' : '✏ Edit'}
                    </button>
                    {editCurrency && (
                        <button onClick={() => { setCurrency(char.currency); setEditCurrency(false); }} style={{ padding: '0.2rem 0.65rem', background: 'transparent', border: '1px solid rgba(220,80,80,0.3)', borderRadius: '6px', color: 'rgba(220,80,80,0.6)', fontSize: '0.68rem', fontWeight: '700', cursor: 'pointer' }}>✕</button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                    {COIN_META.map(coin => (
                        <div key={coin.key} style={{ flex: '1 1 90px', minWidth: '90px', background: coin.bg, border: `1px solid ${coin.border}`, borderRadius: '10px', padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.6rem', fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase', color: coin.color, opacity: 0.8 }}>{coin.label}</span>
                                <span style={{ fontSize: '0.58rem', color: 'rgba(244,232,208,0.25)' }}>{coin.worth}</span>
                            </div>
                            {editCurrency ? (
                                <input
                                    type="number"
                                    min={0}
                                    value={currency[coin.key]}
                                    onChange={e => setCurrency(p => ({ ...p, [coin.key]: Math.max(0, parseInt(e.target.value) || 0) }))}
                                    style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${coin.color}`, borderRadius: '6px', color: coin.color, fontSize: '1.3rem', fontWeight: '800', textAlign: 'center', padding: '0.1rem 0', outline: 'none', boxSizing: 'border-box' }}
                                />
                            ) : (
                                <span style={{ fontSize: '1.6rem', fontWeight: '900', color: coin.color, lineHeight: 1 }}>
                                    {currency[coin.key].toLocaleString()}
                                </span>
                            )}
                            <span style={{ fontSize: '0.7rem', fontWeight: '800', color: coin.color, opacity: 0.55 }}>{coin.abbr}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Inventory table ── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <SectionHead>Inventory</SectionHead>
                    <button
                        onClick={() => setShowAddItemModal(true)}
                        style={{
                            marginLeft: 'auto',
                            padding: '0.5rem 1rem',
                            background: 'rgba(212,175,55,0.15)',
                            border: '1.5px solid rgba(212,175,55,0.5)',
                            borderRadius: '8px',
                            color: 'var(--color-gold)',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>+</span>
                        Add Item
                    </button>
                </div>

                {loadingInventory ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244,232,208,0.4)' }}>Loading inventory...</p>
                    </div>
                ) : inventoryItems.length > 0 ? (
                    <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '8px', overflow: 'hidden', overflowX: 'auto' }}>
                        <TableHeader />
                        <div>
                            {inventoryItems.map((item, i) => (
                                <ItemRow key={item.itemId + '-' + i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ border: '1px dashed rgba(212,175,55,0.15)', borderRadius: '8px', padding: '3rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '2rem', opacity: 0.2 }}>🎒</span>
                        <p style={{ margin: '0.75rem 0 0', fontSize: '0.82rem', color: 'rgba(244,232,208,0.25)', fontStyle: 'italic' }}>
                            Your pack is empty.
                        </p>
                    </div>
                )}

                {/* Add Item Modal */}
                {showAddItemModal && (
                    <AddItemModal
                        characterId={char.id}
                        onClose={() => setShowAddItemModal(false)}
                        onItemAdded={() => {
                            refetch();
                            setShowAddItemModal(false);
                        }}
                    />
                )}

                {/* Item type legend */}
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(Object.entries(ITEM_CATEGORY_META) as [ItemCategory, typeof ITEM_CATEGORY_META[ItemCategory]][]).map(([, meta]) => (
                        <div key={meta.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: meta.color }} />
                            <span style={{ fontSize: '0.62rem', color: 'rgba(244,232,208,0.3)' }}>{meta.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Rarity reference ── */}
            <section>
                <SectionHead>Magic Item Rarity</SectionHead>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(Object.entries(RARITY_COLORS) as [ItemRarity, string][]).map(([rarity, color]) => (
                        <div key={rarity} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: `${color.replace('0.9', '0.07')}`, border: `1px solid ${color.replace('0.9', '0.2')}`, borderRadius: '6px', padding: '0.3rem 0.65rem' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: color }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: '600', color, textTransform: 'capitalize' }}>{rarity.replace('-', ' ')}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function LoreTab({ char }: { char: CharacterData }) {
    const bgData      = STATIC_BACKGROUNDS.find(b => b.index === char.background);
    const alignment   = ALIGNMENTS[char.alignment];
    const hasPhysical = char.height || char.weight || char.age;
    const story       = char.story;
    const hasStory    = story && Object.values(story).some(v => v && v.trim().length > 0);

    return (
        <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* ── Story ── */}
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
                                <StoryBlock label="Ideals"      content={story.ideals}       />
                                <StoryBlock label="Bonds"       content={story.bonds}        />
                                <StoryBlock label="Flaws"       content={story.flaws}        />
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
                <section>
                    <SectionHead>Story</SectionHead>
                    <EmptyStory />
                </section>
            )}

            {/* ── Physical Traits ── */}
            {hasPhysical && (
                <section>
                    <SectionHead>Physical Traits</SectionHead>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {char.height && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Height</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.height}</p></div>}
                        {char.weight && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Weight</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.weight}</p></div>}
                        {char.age    && <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '9px', padding: '0.7rem 1.1rem' }}><p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>Age</p><p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>{char.age}</p></div>}
                    </div>
                </section>
            )}

            {/* ── Alignment ── */}
            {alignment && (
                <section>
                    <SectionHead>Alignment</SectionHead>
                    <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                        <p style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-gold)' }}>{alignment.label}</p>
                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.65', color: 'rgba(244,232,208,0.65)', fontStyle: 'italic' }}>{alignment.desc}</p>
                    </div>
                </section>
            )}

            {/* ── Background Feature ── */}
            {bgData && (
                <section>
                    <SectionHead>Background Feature,   {bgData.name}</SectionHead>
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

/* ═══════════════════════════════════════════════════════════════════
   Loading skeleton
═══════════════════════════════════════════════════════════════════ */

function Skeleton() {
    return (
        <div style={{ padding: '0' }}>
            {/* Hero skeleton */}
            <div style={{ height: '320px', background: 'rgba(255,255,255,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[200, 120, 80, 160].map((w, i) => (
                    <div key={i} style={{ height: '18px', width: `${w}px`, borderRadius: '6px', background: 'rgba(255,255,255,0.05)' }} />
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Tab definitions
═══════════════════════════════════════════════════════════════════ */

const TABS: { id: Tab; label: string }[] = [
    { id: 'overview',  label: 'Overview'          },
    { id: 'magic',     label: 'Spells & Abilities' },
    { id: 'gear',      label: 'Gear'              },
    { id: 'loadouts',  label: 'Loadouts'          },
    { id: 'lore',      label: 'Lore'              },
];

/* ═══════════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════════ */

export default function CharacterDetailSection({ id }: { id: string }) {
    const [char,        setChar]        = useState<CharacterData | null>(null);
    const [loading,     setLoading]     = useState(true);
    const [error,       setError]       = useState('');
    const [tab,         setTab]         = useState<Tab>('overview');
    const [showLevelUp, setShowLevelUp] = useState(false);

    const fetchCharacter = useCallback(() => {
        setLoading(true);
        fetch(`/api/characters/${id}`)
            .then(r => r.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setChar(data.character);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchCharacter();
    }, [fetchCharacter]);

    if (loading) return <Skeleton />;
    if (error || !char) return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(220,80,80,0.8)' }}>{error || 'Character not found.'}</p>
            <Link href="/dashboard?section=characters" style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>← Back to Characters</Link>
        </div>
    );

    const displayRace   = fmt(char.race);
    const displayClass  = fmt(char.class);
    const displayBg     = fmt(char.background);
    const displayAlign  = fmt(char.alignment);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

            {/* ══════════ HERO ══════════ */}
            <div style={{
                position:   'relative',
                minHeight:  '320px',
                display:    'flex',
                alignItems: 'flex-end',
                flexShrink: 0,
                background: `
                    linear-gradient(to bottom, rgba(10,8,6,0.25) 0%, rgba(10,8,6,0.0) 25%),
                    linear-gradient(to right, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.6) 55%, rgba(10,8,6,0.15) 100%),
                    linear-gradient(to top,   rgba(10,8,6,1.0)  0%, rgba(10,8,6,0.0) 45%),
                    url(/images/races/${char.race}.png) top / cover no-repeat
                `,
            }}>
                <div style={{ padding: '1.5rem 2rem 2rem', width: '100%', maxWidth: '700px' }}>

                    {/* Level + back link row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                        <Link
                            href="/dashboard?section=characters"
                            style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                            ← Characters
                        </Link>
                        <span style={{ color: 'rgba(212,175,55,0.25)' }}>·</span>
                        <span style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.12em', color: 'var(--color-primary)', backgroundColor: 'var(--color-gold)', padding: '0.1rem 0.55rem', borderRadius: '999px' }}>
                            LEVEL {char.level}
                        </span>
                    </div>

                    {/* Name */}
                    <h1 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: '900', color: '#fff', lineHeight: '1.05', letterSpacing: '-0.01em', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
                        {char.name}
                    </h1>

                    {/* Tagline */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0', marginBottom: '1rem' }}>
                        {[displayRace, displayClass, displayBg, displayAlign].map((val, i, arr) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: i === 0 ? '700' : '400', color: i === 0 ? 'var(--color-gold)' : 'rgba(255,255,255,0.65)' }}>{val}</span>
                                {i < arr.length - 1 && <span style={{ margin: '0 0.45rem', color: 'rgba(212,175,55,0.3)', fontSize: '0.8rem' }}>·</span>}
                            </span>
                        ))}
                    </div>

                    {/* Level Up row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {/* Level up button */}
                        {char.level < 20 && (
                            <button
                                onClick={() => setShowLevelUp(true)}
                                style={{
                                    display:       'flex',
                                    alignItems:    'center',
                                    gap:           '0.4rem',
                                    padding:       '0.3rem 0.9rem',
                                    background:    'rgba(212,175,55,0.12)',
                                    border:        '1.5px solid rgba(212,175,55,0.45)',
                                    borderRadius:  '999px',
                                    color:         'var(--color-gold)',
                                    fontSize:      '0.78rem',
                                    fontWeight:    '700',
                                    cursor:        'pointer',
                                    letterSpacing: '0.04em',
                                    transition:    'all 0.15s',
                                    backdropFilter:'blur(4px)',
                                }}
                                onMouseEnter={e => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.background  = 'rgba(212,175,55,0.22)';
                                    b.style.borderColor = 'rgba(212,175,55,0.8)';
                                    b.style.boxShadow   = '0 0 16px rgba(212,175,55,0.25)';
                                }}
                                onMouseLeave={e => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.background  = 'rgba(212,175,55,0.12)';
                                    b.style.borderColor = 'rgba(212,175,55,0.45)';
                                    b.style.boxShadow   = 'none';
                                }}
                            >
                                ⬆ Level Up
                            </button>
                        )}
                        {char.level >= 20 && (
                            <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '999px' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'rgba(212,175,55,0.5)', letterSpacing: '0.08em' }}>MAX LEVEL</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Level Up Modal */}
            {showLevelUp && (
                <LevelUpModal
                    char={{
                        id:    char.id,
                        name:  char.name,
                        class: char.class,
                        race:  char.race,
                        level: char.level,
                        hp:    char.hp,
                        stats: char.stats,
                    }}
                    onClose={() => setShowLevelUp(false)}
                    onComplete={() => {
                        setShowLevelUp(false);
                        fetchCharacter(); // Refetch to get the updated character with feat
                    }}
                />
            )}

            {/* ══════════ TAB BAR ══════════ */}
            <div style={{ borderBottom: '1px solid rgba(212,175,55,0.15)', backgroundColor: 'var(--color-primary-dark)', flexShrink: 0, overflowX: 'auto' }}>
                <div style={{ display: 'flex', padding: '0 2rem', gap: '0', minWidth: 'max-content' }}>
                    {TABS.map(t => {
                        const isActive = tab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                style={{
                                    padding:       '0.85rem 1.1rem',
                                    background:    'transparent',
                                    border:        'none',
                                    borderBottom:  `2px solid ${isActive ? 'var(--color-gold)' : 'transparent'}`,
                                    color:         isActive ? 'var(--color-gold)' : 'rgba(244,232,208,0.5)',
                                    fontSize:      '0.82rem',
                                    fontWeight:    isActive ? '700' : '400',
                                    cursor:        'pointer',
                                    letterSpacing: '0.03em',
                                    transition:    'color 0.15s, border-color 0.15s',
                                    whiteSpace:    'nowrap',
                                }}
                                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,232,208,0.85)'; }}
                                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(244,232,208,0.5)'; }}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ══════════ TAB CONTENT ══════════ */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {tab === 'overview'  && <OverviewTab        char={char} />}
                {tab === 'magic'     && <SpellsAbilitiesTab char={char} />}
                {tab === 'gear'      && <GearTab            char={char} />}
                {tab === 'loadouts'  && <LoadoutsTab />}
                {tab === 'lore'      && <LoreTab            char={char} />}
            </div>
        </div>
    );
}
