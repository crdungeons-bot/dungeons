'use client';

import { useState } from 'react';

type ItemTooltipProps = {
    children: React.ReactNode;
    item: {
        name: string;
        category?: string;
        subcategory?: string;
        rarity?: string;
        damage?: string;
        damageType?: string;
        twoHandedDamage?: string;
        ac?: string;
        range?: string;
        weight?: number;
        value?: string;
        properties?: string[];
        requiresAttunement?: boolean;
        attunementBy?: string;
        magical?: boolean;
        charges?: string;
        stealthDisadvantage?: boolean;
        strengthRequirement?: number;
        description: string;
        source?: string;
    };
};

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

export default function ItemTooltip({ children, item }: ItemTooltipProps) {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: rect.left + rect.width / 2,
            y: rect.bottom + 8,
        });
        setShow(true);
    };

    const handleMouseLeave = () => {
        setShow(false);
    };

    const rarityColor = RARITY_COLORS[item.rarity ?? 'common'] ?? 'rgba(200,200,200,0.75)';

    return (
        <>
            <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-block' }}
            >
                {children}
            </span>

            {show && (
                <div
                    style={{
                        position: 'fixed',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        maxWidth: '400px',
                        minWidth: '300px',
                        background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(30, 25, 35, 0.98))',
                        border: `2px solid ${rarityColor}`,
                        borderRadius: '12px',
                        padding: '1rem',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212,175,55,0.1) inset',
                        pointerEvents: 'none',
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: rarityColor, lineHeight: 1.2 }}>
                                {item.name}
                            </h3>
                            {item.magical && (
                                <span style={{ fontSize: '0.9rem', color: 'rgba(160,100,240,0.85)' }}>✦</span>
                            )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            {item.rarity && (
                                <span style={{ fontSize: '0.62rem', fontWeight: '700', color: rarityColor, background: `${rarityColor.replace(/[\d.]+\)$/, '0.12)')}`, border: `1px solid ${rarityColor.replace(/[\d.]+\)$/, '0.3)')}`, borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                                    {fmt(item.rarity)}
                                </span>
                            )}
                            {item.category && (
                                <span style={{ fontSize: '0.62rem', color: 'rgba(212,175,55,0.6)', background: 'rgba(212,175,55,0.08)', borderRadius: '999px', padding: '0.05rem 0.4rem' }}>
                                    {fmt(item.category)}
                                </span>
                            )}
                            {item.subcategory && (
                                <span style={{ fontSize: '0.6rem', color: 'rgba(180,180,180,0.5)' }}>
                                    {fmt(item.subcategory)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stats grid */}
                    {(item.damage || item.ac || item.range || item.weight !== undefined || item.value) && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.75rem', background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '8px' }}>
                            {item.damage && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Damage</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.85)', fontWeight: '600' }}>{item.damage}</p>
                                    {item.damageType && <p style={{ margin: '0.05rem 0 0', fontSize: '0.65rem', color: 'rgba(244,232,208,0.45)' }}>{fmt(item.damageType)}</p>}
                                </div>
                            )}
                            {item.twoHandedDamage && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Two-Handed</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.85)', fontWeight: '600' }}>{item.twoHandedDamage}</p>
                                </div>
                            )}
                            {item.ac && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>AC</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.85)', fontWeight: '600' }}>{item.ac}</p>
                                </div>
                            )}
                            {item.range && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Range</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.85)' }}>{item.range} ft</p>
                                </div>
                            )}
                            {item.weight !== undefined && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Weight</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(244,232,208,0.75)' }}>{item.weight} lb</p>
                                </div>
                            )}
                            {item.value && (
                                <div>
                                    <p style={{ margin: '0 0 0.1rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Value</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(212,175,55,0.8)', fontWeight: '600' }}>{item.value}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Properties */}
                    {item.properties && item.properties.length > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                            <p style={{ margin: '0 0 0.3rem', fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.5)' }}>Properties</p>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                {item.properties.map(prop => (
                                    <span key={prop} style={{ fontSize: '0.65rem', color: 'rgba(180,180,180,0.7)', background: 'rgba(180,180,180,0.1)', border: '1px solid rgba(180,180,180,0.2)', borderRadius: '4px', padding: '0.1rem 0.4rem' }}>
                                        {prop}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Special attributes */}
                    {(item.requiresAttunement || item.charges || item.strengthRequirement || item.stealthDisadvantage) && (
                        <div style={{ marginBottom: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(240,180,60,0.06)', border: '1px solid rgba(240,180,60,0.15)', borderRadius: '7px' }}>
                            {item.requiresAttunement && (
                                <p style={{ margin: '0 0 0.25rem', fontSize: '0.72rem', color: 'rgba(240,180,60,0.85)' }}>
                                    ⚡ Requires Attunement{item.attunementBy ? ` (${item.attunementBy})` : ''}
                                </p>
                            )}
                            {item.charges && (
                                <p style={{ margin: '0 0 0.25rem', fontSize: '0.72rem', color: 'rgba(160,100,240,0.85)' }}>
                                    🔮 {item.charges}
                                </p>
                            )}
                            {item.strengthRequirement && (
                                <p style={{ margin: '0 0 0.25rem', fontSize: '0.72rem', color: 'rgba(228,90,74,0.85)' }}>
                                    💪 STR {item.strengthRequirement}+ required
                                </p>
                            )}
                            {item.stealthDisadvantage && (
                                <p style={{ margin: 0, fontSize: '0.72rem', color: 'rgba(180,180,180,0.7)' }}>
                                    👁️ Stealth Disadvantage
                                </p>
                            )}
                        </div>
                    )}

                    {/* Description */}
                    <div style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '0.75rem' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.6', color: 'rgba(244,232,208,0.8)', fontStyle: 'italic' }}>
                            {item.description}
                        </p>
                    </div>

                    {/* Source */}
                    {item.source && (
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.6rem', color: 'rgba(212,175,55,0.35)', textAlign: 'right' }}>
                            {item.source}
                        </p>
                    )}

                    {/* Arrow pointer */}
                    <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: `8px solid ${rarityColor}`,
                    }} />
                </div>
            )}
        </>
    );
}
