'use client';

import { useState, useMemo, useEffect } from 'react';
import type { SpellEntry } from '@/data/spells';

const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/* ═══════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════ */

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function entryType(e: SpellEntry): 'spell' | 'class-ability' | 'racial-ability' {
    return e.type ?? 'spell';
}

const SCHOOL_COLORS: Record<string, string> = {
    abjuration:    'rgba(80,180,240,0.8)',
    conjuration:   'rgba(130,200,80,0.8)',
    divination:    'rgba(240,230,80,0.8)',
    enchantment:   'rgba(240,80,160,0.8)',
    evocation:     'rgba(240,120,60,0.8)',
    illusion:      'rgba(160,100,240,0.8)',
    necromancy:    'rgba(80,200,140,0.8)',
    transmutation: 'rgba(240,180,60,0.8)',
};

const TYPE_COLORS = {
    'spell':          'rgba(93,142,232,0.85)',
    'class-ability':  'rgba(212,175,55,0.85)',
    'racial-ability': 'rgba(80,200,100,0.85)',
};

/* ═══════════════════════════════════════════════════════════════════
   Small components
═══════════════════════════════════════════════════════════════════ */

function Pill({ label, color, small }: { label: string; color: string; small?: boolean }) {
    return (
        <span style={{
            display:         'inline-block',
            padding:         small ? '0.05rem 0.4rem' : '0.15rem 0.55rem',
            borderRadius:    '999px',
            fontSize:        small ? '0.6rem' : '0.68rem',
            fontWeight:      '700',
            color:           '#000',
            backgroundColor: color,
            letterSpacing:   '0.04em',
            whiteSpace:      'nowrap',
        }}>{label}</span>
    );
}

function FilterLabel({ children }: { children: React.ReactNode }) {
    return (
        <p style={{
            margin:        '0 0 0.4rem',
            fontSize:      '0.58rem',
            fontWeight:    '800',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'rgba(212,175,55,0.5)',
        }}>{children}</p>
    );
}

function FilterPill({
    label, active, onClick, color,
}: { label: string; active: boolean; onClick: () => void; color?: string }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding:         '0.2rem 0.65rem',
                borderRadius:    '999px',
                border:          `1.5px solid ${active ? (color ?? 'var(--color-gold)') : 'rgba(212,175,55,0.2)'}`,
                backgroundColor: active ? `${color ?? 'rgba(212,175,55,0.9)'}` : 'transparent',
                color:           active ? '#000' : 'rgba(244,232,208,0.55)',
                fontSize:        '0.72rem',
                fontWeight:      active ? '700' : '400',
                cursor:          'pointer',
                whiteSpace:      'nowrap',
                transition:      'all 0.12s',
            }}
        >{label}</button>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Entry card
═══════════════════════════════════════════════════════════════════ */

function EntryCard({ entry }: { entry: SpellEntry }) {
    const [expanded, setExpanded] = useState(false);
    const type  = entryType(entry);
    const isSpell = type === 'spell';

    return (
        <div
            onClick={() => setExpanded(v => !v)}
            style={{
                background:   'rgba(0,0,0,0.3)',
                border:       '1px solid rgba(212,175,55,0.12)',
                borderRadius: '10px',
                padding:      '0.85rem 1.1rem',
                cursor:       'pointer',
                transition:   'border-color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.3)';
                (e.currentTarget as HTMLDivElement).style.background  = 'rgba(0,0,0,0.45)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.12)';
                (e.currentTarget as HTMLDivElement).style.background  = 'rgba(0,0,0,0.3)';
            }}
        >
            {/* ── Header row ── */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', flexWrap: 'wrap' }}>

                {/* Name */}
                <span style={{ flex: 1, minWidth: '140px', fontSize: '0.95rem', fontWeight: '700', color: '#fff', lineHeight: '1.3' }}>
                    {entry.name}
                </span>

                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
                    {/* Type */}
                    <Pill label={type === 'spell' ? 'Spell' : type === 'class-ability' ? 'Ability' : 'Racial'} color={TYPE_COLORS[type]} small />

                    {/* Level */}
                    {isSpell && entry.level !== undefined && (
                        <Pill label={entry.level === 0 ? 'Cantrip' : `Lv ${entry.level}`} color="rgba(180,180,180,0.7)" small />
                    )}
                    {!isSpell && entry.levelGained !== undefined && (
                        <Pill label={`Gain lv${entry.levelGained}`} color="rgba(180,180,180,0.7)" small />
                    )}

                    {/* School */}
                    {entry.school && (
                        <Pill label={fmt(entry.school)} color={SCHOOL_COLORS[entry.school] ?? 'rgba(200,200,200,0.7)'} small />
                    )}

                    {/* Action type */}
                    <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.45)', whiteSpace: 'nowrap' }}>
                        {fmt(entry.actionType)}
                    </span>

                    {/* Concentration */}
                    {entry.concentration && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(240,180,60,0.85)', border: '1px solid rgba(240,180,60,0.35)', borderRadius: '4px', padding: '0.05rem 0.3rem' }}>C</span>
                    )}

                    {/* Ritual */}
                    {entry.ritual && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(160,100,240,0.85)', border: '1px solid rgba(160,100,240,0.35)', borderRadius: '4px', padding: '0.05rem 0.3rem' }}>R</span>
                    )}

                    {/* Chevron */}
                    <span style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.4)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>▾</span>
                </div>
            </div>

            {/* Class/Race pills row */}
            {((entry.classes?.length ?? 0) > 0 || (entry.races?.length ?? 0) > 0) && (
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {entry.classes?.map(c => (
                        <span key={c} style={{ fontSize: '0.62rem', color: 'rgba(212,175,55,0.6)', background: 'rgba(212,175,55,0.08)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {fmt(c)}
                        </span>
                    ))}
                    {entry.races?.map(r => (
                        <span key={r} style={{ fontSize: '0.62rem', color: 'rgba(80,200,100,0.7)', background: 'rgba(80,200,100,0.08)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {fmt(r)}
                        </span>
                    ))}
                </div>
            )}

            {/* Preview description (collapsed) */}
            {!expanded && (
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: 'rgba(244,232,208,0.5)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {entry.description.replace(/\*\*/g, '').replace(/\n/g, ' ')}
                </p>
            )}

            {/* Expanded content */}
            {expanded && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

                    {/* Spell stats row */}
                    {isSpell && (
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {entry.range    && <StatItem label="Range"      value={entry.range} />}
                            {entry.duration && <StatItem label="Duration"   value={entry.duration} />}
                            {entry.components && (
                                <StatItem
                                    label="Components"
                                    value={entry.components.map(c => c.toUpperCase()).join(', ') + (entry.material ? ` (${entry.material})` : '')}
                                />
                            )}
                            {entry.castingTime && <StatItem label="Cast Time" value={entry.castingTime} />}
                        </div>
                    )}

                    {/* Ability stats row */}
                    {!isSpell && entry.recharge && (
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <StatItem label="Recharge" value={fmt(entry.recharge)} />
                        </div>
                    )}

                    {/* Full description */}
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'rgba(244,232,208,0.75)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                        {entry.description.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>

                    {/* At Higher Levels / cantrip scaling / upgrades */}
                    {(entry.cantripUpgrade || entry.higherLevelSlot || entry.upgrades) && (
                        <div style={{ padding: '0.55rem 0.75rem', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '7px' }}>
                            <p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>
                                {entry.cantripUpgrade || entry.higherLevelSlot ? 'At Higher Levels' : 'Upgrades'}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.65)', lineHeight: '1.55' }}>
                                {entry.cantripUpgrade ?? entry.higherLevelSlot ?? entry.upgrades}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p style={{ margin: '0 0 0.1rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.45)' }}>{label}</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.75)' }}>{value}</p>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Filter sidebar
═══════════════════════════════════════════════════════════════════ */

type Filters = {
    search:        string;
    entryTypes:    Set<string>;
    classes:       Set<string>;
    races:         Set<string>;
    levels:        Set<number>;
    schools:       Set<string>;
    actionTypes:   Set<string>;
    components:    { v: boolean; s: boolean; m: boolean };
    concentration: boolean | null;
    ritual:        boolean | null;
};

function initFilters(): Filters {
    return {
        search:        '',
        entryTypes:    new Set(),
        classes:       new Set(),
        races:         new Set(),
        levels:        new Set(),
        schools:       new Set(),
        actionTypes:   new Set(),
        components:    { v: false, s: false, m: false },
        concentration: null,
        ritual:        null,
    };
}

function toggleSet<T>(s: Set<T>, v: T): Set<T> {
    const n = new Set(s);
    n.has(v) ? n.delete(v) : n.add(v);
    return n;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
            <FilterLabel>{title}</FilterLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>{children}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════════ */

export default function SpellsSection() {
    const [entries,     setEntries]     = useState<SpellEntry[]>([]);
    const [loading,     setLoading]     = useState(true);
    const [fetchError,  setFetchError]  = useState('');
    const [filters,     setFilters]     = useState<Filters>(initFilters);
    const [filtersOpen, setFiltersOpen] = useState(true);

    /* ── Fetch all entries from MongoDB via API ── */
    useEffect(() => {
        setLoading(true);
        fetch('/api/resources/spells-abilities')
            .then(r => r.json())
            .then(data => {
                setEntries(data.results ?? []);  // Fixed: API returns 'results' not 'entries'
                setLoading(false);
            })
            .catch(() => {
                setFetchError('Failed to load spells & abilities.');
                setLoading(false);
            });
    }, []);

    /* ── Derive filter options from loaded data ── */
    const ALL_CLASSES = useMemo(() =>
        Array.from(new Set(entries.flatMap(e => e.classes ?? []))).sort()
   ,  [entries]);

    const ALL_RACES = useMemo(() =>
        Array.from(new Set(entries.flatMap(e => e.races ?? []))).sort()
   ,  [entries]);

    const ALL_SCHOOLS = useMemo(() =>
        Array.from(new Set(entries.map(e => e.school).filter(Boolean) as string[])).sort()
   ,  [entries]);

    const ALL_ACTION_TYPES = useMemo(() =>
        Array.from(new Set(entries.map(e => e.actionType).filter(Boolean))).sort()
   ,  [entries]);

    const filtered = useMemo(() => {
        const q = filters.search.toLowerCase();

        return entries.filter(e => {
            const type = entryType(e);

            // search
            if (q && !e.name.toLowerCase().includes(q) && !e.description.toLowerCase().includes(q)) return false;

            // entry type
            if (filters.entryTypes.size > 0 && !filters.entryTypes.has(type)) return false;

            // class
            if (filters.classes.size > 0) {
                const eClasses = e.classes ?? [];
                if (!eClasses.some(c => filters.classes.has(c))) return false;
            }

            // race
            if (filters.races.size > 0) {
                const eRaces = e.races ?? [];
                if (!eRaces.some(r => filters.races.has(r))) return false;
            }

            // level
            if (filters.levels.size > 0) {
                const lvl = type === 'spell' ? e.level : e.levelGained;
                if (lvl === undefined || !filters.levels.has(lvl)) return false;
            }

            // school
            if (filters.schools.size > 0 && (!e.school || !filters.schools.has(e.school))) return false;

            // action type
            if (filters.actionTypes.size > 0 && !filters.actionTypes.has(e.actionType)) return false;

            // components
            if (filters.components.v && !e.components?.includes('v')) return false;
            if (filters.components.s && !e.components?.includes('s')) return false;
            if (filters.components.m && !e.components?.includes('m')) return false;

            // concentration
            if (filters.concentration !== null && e.concentration !== filters.concentration) return false;

            // ritual
            if (filters.ritual !== null && e.ritual !== filters.ritual) return false;

            return true;
        });
    }, [filters, entries]);

    const activeFilterCount = [
        filters.entryTypes.size,
        filters.classes.size,
        filters.races.size,
        filters.levels.size,
        filters.schools.size,
        filters.actionTypes.size,
        filters.components.v || filters.components.s || filters.components.m ? 1 : 0,
        filters.concentration !== null ? 1 : 0,
        filters.ritual !== null ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const f = filters; // shorthand
    const set = setFilters;

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '100vh', overflow: 'hidden' }}>

            {/* ══════════ FILTER SIDEBAR ══════════ */}
            <div style={{
                width:           filtersOpen ? '260px' : '0',
                minWidth:        filtersOpen ? '260px' : '0',
                overflowY:       'auto',
                overflowX:       'hidden',
                backgroundColor: 'var(--color-primary-dark)',
                borderRight:     '1px solid rgba(212,175,55,0.15)',
                transition:      'min-width 0.25s, width 0.25s',
                flexShrink:      0,
            }}>
                {filtersOpen && (
                    <div style={{ padding: '1.25rem 1rem', minWidth: '260px' }}>

                        {/* Search */}
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Search spells & abilities…"
                                value={f.search}
                                onChange={e => set(p => ({ ...p, search: e.target.value }))}
                                style={{
                                    width:           '100%',
                                    padding:         '0.55rem 0.75rem',
                                    background:      'rgba(212,175,55,0.05)',
                                    border:          '1.5px solid rgba(212,175,55,0.2)',
                                    borderRadius:    '8px',
                                    color:           '#fff',
                                    fontSize:        '0.82rem',
                                    outline:         'none',
                                    boxSizing:       'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                                onBlur={e  => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                            />
                        </div>

                        {/* Type */}
                        <FilterSection title="Type">
                            {(['spell','class-ability','racial-ability'] as const).map(t => (
                                <FilterPill key={t}
                                    label={t === 'spell' ? 'Spells' : t === 'class-ability' ? 'Class Abilities' : 'Racial Abilities'}
                                    active={f.entryTypes.has(t)}
                                    onClick={() => set(p => ({ ...p, entryTypes: toggleSet(p.entryTypes, t) }))}
                                    color={TYPE_COLORS[t]}
                                />
                            ))}
                        </FilterSection>

                        {/* Level */}
                        <FilterSection title="Level / Gained At">
                            {SPELL_LEVELS.map(lvl => (
                                <FilterPill key={lvl}
                                    label={lvl === 0 ? 'Cantrip' : `${lvl}`}
                                    active={f.levels.has(lvl)}
                                    onClick={() => set(p => ({ ...p, levels: toggleSet(p.levels, lvl) }))}
                                />
                            ))}
                        </FilterSection>

                        {/* Class */}
                        <FilterSection title="Class">
                            {ALL_CLASSES.map(c => (
                                <FilterPill key={c}
                                    label={fmt(c)}
                                    active={f.classes.has(c)}
                                    onClick={() => set(p => ({ ...p, classes: toggleSet(p.classes, c) }))}
                                />
                            ))}
                        </FilterSection>

                        {/* Race */}
                        <FilterSection title="Race">
                            {ALL_RACES.map(r => (
                                <FilterPill key={r}
                                    label={fmt(r)}
                                    active={f.races.has(r)}
                                    onClick={() => set(p => ({ ...p, races: toggleSet(p.races, r) }))}
                                    color="rgba(80,200,100,0.85)"
                                />
                            ))}
                        </FilterSection>

                        {/* Action type */}
                        <FilterSection title="Action Type">
                            {ALL_ACTION_TYPES.map(a => (
                                <FilterPill key={a}
                                    label={fmt(a)}
                                    active={f.actionTypes.has(a)}
                                    onClick={() => set(p => ({ ...p, actionTypes: toggleSet(p.actionTypes, a) }))}
                                />
                            ))}
                        </FilterSection>

                        {/* School (spells only) */}
                        <FilterSection title="School (Spells)">
                            {ALL_SCHOOLS.map(s => (
                                <FilterPill key={s}
                                    label={fmt(s)}
                                    active={f.schools.has(s)}
                                    onClick={() => set(p => ({ ...p, schools: toggleSet(p.schools, s) }))}
                                    color={SCHOOL_COLORS[s] ?? 'rgba(200,200,200,0.8)'}
                                />
                            ))}
                        </FilterSection>

                        {/* Components */}
                        <div style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
                            <FilterLabel>Components (Spells)</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                {(['v','s','m'] as const).map(comp => (
                                    <FilterPill key={comp}
                                        label={comp.toUpperCase()}
                                        active={f.components[comp]}
                                        onClick={() => set(p => ({ ...p, components: { ...p.components, [comp]: !p.components[comp] } }))}
                                    />
                                ))}
                            </div>
                            {(f.components.v || f.components.s || f.components.m) && (
                                <p style={{ margin: '0.3rem 0 0', fontSize: '0.65rem', color: 'rgba(244,232,208,0.4)', fontStyle: 'italic' }}>
                                    Showing spells that require selected component(s)
                                </p>
                            )}
                        </div>

                        {/* Concentration */}
                        <div style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
                            <FilterLabel>Concentration</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <FilterPill label="Required" active={f.concentration === true}  onClick={() => set(p => ({ ...p, concentration: p.concentration === true  ? null : true  }))} />
                                <FilterPill label="Not Req." active={f.concentration === false} onClick={() => set(p => ({ ...p, concentration: p.concentration === false ? null : false }))} />
                            </div>
                        </div>

                        {/* Ritual */}
                        <div style={{ paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
                            <FilterLabel>Ritual</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <FilterPill label="Ritual"     active={f.ritual === true}  onClick={() => set(p => ({ ...p, ritual: p.ritual === true  ? null : true  }))} />
                                <FilterPill label="Non-Ritual" active={f.ritual === false} onClick={() => set(p => ({ ...p, ritual: p.ritual === false ? null : false }))} />
                            </div>
                        </div>

                        {/* Reset */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={() => set(initFilters)}
                                style={{
                                    width:         '100%',
                                    padding:       '0.5rem',
                                    background:    'rgba(220,80,80,0.1)',
                                    border:        '1px solid rgba(220,80,80,0.3)',
                                    borderRadius:  '8px',
                                    color:         'rgba(220,80,80,0.8)',
                                    fontSize:      '0.78rem',
                                    fontWeight:    '700',
                                    cursor:        'pointer',
                                }}
                            >
                                ✕ Clear {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* ══════════ MAIN CONTENT ══════════ */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Header bar */}
                <div style={{ padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            onClick={() => setFiltersOpen(v => !v)}
                            style={{ padding: '0.4rem 0.75rem', background: filtersOpen ? 'rgba(212,175,55,0.1)' : 'transparent', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '7px', color: 'var(--color-gold)', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                            {filtersOpen ? '◀ Filters' : '▶ Filters'}
                            {activeFilterCount > 0 && (
                                <span style={{ background: 'var(--color-gold)', color: '#000', borderRadius: '999px', fontSize: '0.6rem', fontWeight: '800', padding: '0 0.35rem', minWidth: '16px', textAlign: 'center' }}>
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Resources</p>
                            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-gold)' }}>Spells &amp; Abilities</h1>
                        </div>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: 'rgba(244,232,208,0.4)', whiteSpace: 'nowrap' }}>
                        {loading ? '…' : `${filtered.length} of ${entries.length}`}
                    </span>
                </div>

                {/* Legend */}
                <div style={{ padding: '0.6rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>Click any entry to expand details</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.62rem', color: 'rgba(240,180,60,0.7)', border: '1px solid rgba(240,180,60,0.3)', borderRadius: '4px', padding: '0.05rem 0.35rem', fontWeight: '700' }}>C</span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)' }}>Concentration</span>
                        <span style={{ fontSize: '0.62rem', color: 'rgba(160,100,240,0.7)', border: '1px solid rgba(160,100,240,0.3)', borderRadius: '4px', padding: '0.05rem 0.35rem', fontWeight: '700', marginLeft: '0.5rem' }}>R</span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)' }}>Ritual</span>
                    </div>
                </div>

                {/* Scrollable list */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem 4rem' }}>
                    {loading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} style={{ height: '64px', background: 'rgba(212,175,55,0.04)', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.08)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.07}s` }} />
                            ))}
                        </div>
                    ) : fetchError ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', opacity: 0.3 }}>⚠️</span>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(244,232,208,0.4)', fontStyle: 'italic' }}>{fetchError}</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '0.75rem', textAlign: 'center' }}>
                            <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>🔮</span>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>No results match your filters.</p>
                            <button onClick={() => set(initFilters)} style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '7px', color: 'var(--color-gold)', fontSize: '0.78rem', cursor: 'pointer' }}>
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {filtered.map((entry, i) => (
                                <EntryCard key={`${entry.name}-${i}`} entry={entry} />
                            ))}
                        </div>
                    )}
                </div>
                <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
            </div>
        </div>
    );
}
