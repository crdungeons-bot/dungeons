'use client';

import { useState, useMemo, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   Types
═══════════════════════════════════════════════════════════════════ */

type ItemEntry = {
    name:                 string;
    category:             string;
    subcategory:          string;
    rarity:               string;
    magical?:             boolean;
    requiresAttunement?:  boolean;
    attunementBy?:        string;
    weight?:              number;
    value?:               string;
    valueCp?:             number;
    damage?:              string;
    damageType?:          string;
    twoHandedDamage?:     string;
    ac?:                  string;
    stealthDisadvantage?: boolean;
    strengthRequirement?: number;
    properties?:          string[];
    range?:               string;
    charges?:             string;
    description:          string;
    source?:              string;
};

/* ═══════════════════════════════════════════════════════════════════
   Helpers & Constants
═══════════════════════════════════════════════════════════════════ */

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const RARITY_COLORS: Record<string, string> = {
    mundane:    'rgba(160,160,160,0.75)',
    common:     'rgba(200,200,200,0.75)',
    uncommon:   'rgba(80,200,100,0.8)',
    rare:       'rgba(80,150,240,0.85)',
    'very-rare': 'rgba(160,100,240,0.85)',
    legendary:  'rgba(240,180,60,0.9)',
    artifact:   'rgba(240,80,80,0.9)',
};

const CATEGORY_COLORS: Record<string, string> = {
    weapon:      'rgba(228,90,74,0.8)',
    armor:       'rgba(93,142,232,0.8)',
    shield:      'rgba(93,142,232,0.75)',
    wondrous:    'rgba(160,100,240,0.8)',
    ring:        'rgba(240,180,60,0.8)',
    rod:         'rgba(212,175,55,0.8)',
    staff:       'rgba(130,200,80,0.8)',
    wand:        'rgba(240,80,160,0.8)',
    potion:      'rgba(80,200,140,0.8)',
    scroll:      'rgba(240,230,80,0.8)',
    tool:        'rgba(200,160,100,0.75)',
    ammunition:  'rgba(180,140,100,0.75)',
    gear:        'rgba(160,160,160,0.7)',
    clothing:    'rgba(193,93,232,0.75)',
    trinket:     'rgba(240,120,180,0.75)',
    misc:        'rgba(180,180,180,0.7)',
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
   Item card
═══════════════════════════════════════════════════════════════════ */

function ItemCard({ item }: { item: ItemEntry }) {
    const [expanded, setExpanded] = useState(false);
    const categoryColor = CATEGORY_COLORS[item.category] ?? 'rgba(200,200,200,0.75)';
    const rarityColor = RARITY_COLORS[item.rarity] ?? 'rgba(200,200,200,0.75)';

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
                    {item.name}
                </span>

                {/* Badges */}
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
                    {/* Category */}
                    <Pill label={fmt(item.category)} color={categoryColor} small />

                    {/* Rarity */}
                    <Pill label={fmt(item.rarity)} color={rarityColor} small />

                    {/* Magical */}
                    {item.magical && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(160,100,240,0.85)', border: '1px solid rgba(160,100,240,0.35)', borderRadius: '4px', padding: '0.05rem 0.3rem' }}>✦</span>
                    )}

                    {/* Attunement */}
                    {item.requiresAttunement && (
                        <span style={{ fontSize: '0.6rem', fontWeight: '700', color: 'rgba(240,180,60,0.85)', border: '1px solid rgba(240,180,60,0.35)', borderRadius: '4px', padding: '0.05rem 0.3rem' }}>A</span>
                    )}

                    {/* Value */}
                    {item.value && (
                        <span style={{ fontSize: '0.65rem', color: 'rgba(212,175,55,0.6)', whiteSpace: 'nowrap' }}>
                            {item.value}
                        </span>
                    )}

                    {/* Chevron */}
                    <span style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.4)', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>▾</span>
                </div>
            </div>

            {/* Subcategory / properties row */}
            {(item.subcategory || (item.properties && item.properties.length > 0)) && (
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                    {item.subcategory && (
                        <span style={{ fontSize: '0.62rem', color: 'rgba(212,175,55,0.6)', background: 'rgba(212,175,55,0.08)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {fmt(item.subcategory)}
                        </span>
                    )}
                    {item.properties?.map(p => (
                        <span key={p} style={{ fontSize: '0.62rem', color: 'rgba(180,180,180,0.6)', background: 'rgba(180,180,180,0.08)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                            {p}
                        </span>
                    ))}
                </div>
            )}

            {/* Preview description (collapsed) */}
            {!expanded && (
                <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: 'rgba(244,232,208,0.5)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.description}
                </p>
            )}

            {/* Expanded content */}
            {expanded && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>

                    {/* Item stats grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                        {item.damage && <StatItem label="Damage" value={item.damage} />}
                        {item.twoHandedDamage && <StatItem label="Two-Handed" value={item.twoHandedDamage} />}
                        {item.ac && <StatItem label="AC" value={item.ac} />}
                        {item.range && <StatItem label="Range" value={item.range} />}
                        {item.weight !== undefined && <StatItem label="Weight" value={`${item.weight} lb`} />}
                        {item.charges && <StatItem label="Charges" value={item.charges} />}
                        {item.strengthRequirement && <StatItem label="STR Req" value={String(item.strengthRequirement)} />}
                    </div>

                    {/* Attunement details */}
                    {item.attunementBy && (
                        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(240,180,60,0.06)', border: '1px solid rgba(240,180,60,0.15)', borderRadius: '7px' }}>
                            <p style={{ margin: '0 0 0.15rem', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(240,180,60,0.5)' }}>
                                Attunement Required
                            </p>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.65)' }}>
                                {item.attunementBy}
                            </p>
                        </div>
                    )}

                    {/* Full description */}
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'rgba(244,232,208,0.75)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                        {item.description}
                    </p>

                    {/* Source */}
                    {item.source && (
                        <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(244,232,208,0.35)', fontStyle: 'italic' }}>
                            Source: {item.source}
                        </p>
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
    search:       string;
    categories:   Set<string>;
    rarities:     Set<string>;
    magical:      boolean | null;
    attunement:   boolean | null;
};

function initFilters(): Filters {
    return {
        search:       '',
        categories:   new Set(),
        rarities:     new Set(),
        magical:      null,
        attunement:   null,
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

export default function ItemsSection() {
    const [items,       setItems]       = useState<ItemEntry[]>([]);
    const [loading,     setLoading]     = useState(true);
    const [fetchError,  setFetchError]  = useState('');
    const [filters,     setFilters]     = useState<Filters>(initFilters);
    const [filtersOpen, setFiltersOpen] = useState(true);

    /* ── Fetch all items from MongoDB via API ── */
    useEffect(() => {
        setLoading(true);
        fetch('/api/resources/items')
            .then(r => r.json())
            .then(data => {
                setItems(data.items ?? []);
                setLoading(false);
            })
            .catch(() => {
                setFetchError('Failed to load items.');
                setLoading(false);
            });
    }, []);

    /* ── Derive filter options from loaded data ── */
    const ALL_CATEGORIES = useMemo(() =>
        Array.from(new Set(items.map(i => i.category))).sort()
   ,  [items]);

    const ALL_RARITIES = useMemo(() =>
        Array.from(new Set(items.map(i => i.rarity))).sort((a, b) => {
            const order = ['mundane', 'common', 'uncommon', 'rare', 'very-rare', 'legendary', 'artifact'];
            return order.indexOf(a) - order.indexOf(b);
        })
   ,  [items]);

    const filtered = useMemo(() => {
        const q = filters.search.toLowerCase();

        return items.filter(item => {
            // search
            if (q && !item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;

            // category
            if (filters.categories.size > 0 && !filters.categories.has(item.category)) return false;

            // rarity
            if (filters.rarities.size > 0 && !filters.rarities.has(item.rarity)) return false;

            // magical
            if (filters.magical !== null && (item.magical ?? false) !== filters.magical) return false;

            // attunement
            if (filters.attunement !== null && (item.requiresAttunement ?? false) !== filters.attunement) return false;

            return true;
        });
    }, [filters, items]);

    const activeFilterCount = [
        filters.categories.size,
        filters.rarities.size,
        filters.magical !== null ? 1 : 0,
        filters.attunement !== null ? 1 : 0,
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
                                placeholder="Search items…"
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

                        {/* Category */}
                        <FilterSection title="Category">
                            {ALL_CATEGORIES.map(c => (
                                <FilterPill key={c}
                                    label={fmt(c)}
                                    active={f.categories.has(c)}
                                    onClick={() => set(p => ({ ...p, categories: toggleSet(p.categories, c) }))}
                                    color={CATEGORY_COLORS[c]}
                                />
                            ))}
                        </FilterSection>

                        {/* Rarity */}
                        <FilterSection title="Rarity">
                            {ALL_RARITIES.map(r => (
                                <FilterPill key={r}
                                    label={fmt(r)}
                                    active={f.rarities.has(r)}
                                    onClick={() => set(p => ({ ...p, rarities: toggleSet(p.rarities, r) }))}
                                    color={RARITY_COLORS[r]}
                                />
                            ))}
                        </FilterSection>

                        {/* Magical */}
                        <div style={{ borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
                            <FilterLabel>Magical</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <FilterPill label="Magical" active={f.magical === true}  onClick={() => set(p => ({ ...p, magical: p.magical === true  ? null : true  }))} color="rgba(160,100,240,0.8)" />
                                <FilterPill label="Mundane" active={f.magical === false} onClick={() => set(p => ({ ...p, magical: p.magical === false ? null : false }))} />
                            </div>
                        </div>

                        {/* Attunement */}
                        <div style={{ paddingBottom: '0.9rem', marginBottom: '0.9rem' }}>
                            <FilterLabel>Attunement</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.3rem' }}>
                                <FilterPill label="Required"     active={f.attunement === true}  onClick={() => set(p => ({ ...p, attunement: p.attunement === true  ? null : true  }))} color="rgba(240,180,60,0.8)" />
                                <FilterPill label="Not Required" active={f.attunement === false} onClick={() => set(p => ({ ...p, attunement: p.attunement === false ? null : false }))} />
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
                            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-gold)' }}>Items</h1>
                        </div>
                    </div>

                    <span style={{ fontSize: '0.78rem', color: 'rgba(244,232,208,0.4)', whiteSpace: 'nowrap' }}>
                        {loading ? '…' : `${filtered.length} of ${items.length}`}
                    </span>
                </div>

                {/* Legend */}
                <div style={{ padding: '0.6rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.08)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>Click any item to expand details</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.62rem', color: 'rgba(160,100,240,0.7)', border: '1px solid rgba(160,100,240,0.3)', borderRadius: '4px', padding: '0.05rem 0.35rem', fontWeight: '700' }}>✦</span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)' }}>Magical</span>
                        <span style={{ fontSize: '0.62rem', color: 'rgba(240,180,60,0.7)', border: '1px solid rgba(240,180,60,0.3)', borderRadius: '4px', padding: '0.05rem 0.35rem', fontWeight: '700', marginLeft: '0.5rem' }}>A</span>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(244,232,208,0.3)' }}>Attunement</span>
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
                            <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>⚔️</span>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>No results match your filters.</p>
                            <button onClick={() => set(initFilters)} style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '7px', color: 'var(--color-gold)', fontSize: '0.78rem', cursor: 'pointer' }}>
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {filtered.map((item, i) => (
                                <ItemCard key={`${item.name}-${i}`} item={item} />
                            ))}
                        </div>
                    )}
                </div>
                <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }`}</style>
            </div>
        </div>
    );
}
