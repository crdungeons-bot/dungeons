'use client';

import type { SpellSlots, PactMagicSlots } from '@/data/spell-slots';

type SpellSlotsDisplayProps = {
    spellSlots: SpellSlots | PactMagicSlots | null;
    className: string;
    isPactMagic?: boolean;
};

/**
 * Displays spell slots in a visual grid format
 * Handles both standard spell slots and Warlock's Pact Magic
 */
export default function SpellSlotsDisplay({ spellSlots, className, isPactMagic = false }: SpellSlotsDisplayProps) {
    if (!spellSlots) {
        return (
            <div className={className}>
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#94a3b8',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚔️</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>No Spellcasting</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>
                        This class doesn't use spell slots
                    </div>
                </div>
            </div>
        );
    }

    // Warlock Pact Magic display
    if (isPactMagic && 'slots' in spellSlots) {
        const pactSlots = spellSlots as PactMagicSlots;
        return (
            <div className={className}>
                <div style={{
                    background: 'linear-gradient(135deg, #581c87 0%, #312e81 100%)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.15)',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
                            }}>🔮</div>
                            <div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e9d5ff' }}>
                                    Pact Magic
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#c4b5fd', marginTop: '0.125rem' }}>
                                    All slots cast at level {pactSlots.level}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '1rem',
                    }}>
                        {Array.from({ length: pactSlots.slots }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    height: '3rem',
                                    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                                    borderRadius: '8px',
                                    border: '2px solid rgba(233, 213, 255, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: '#fff',
                                    boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)',
                                    transition: 'transform 0.2s',
                                }}
                            >
                                {pactSlots.level}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Standard spell slots display
    const standardSlots = spellSlots as SpellSlots;
    const slotLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    
    // Filter out spell levels with 0 slots
    const availableLevels = slotLevels.filter(level => standardSlots[level] > 0);

    if (availableLevels.length === 0) {
        return (
            <div className={className}>
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#94a3b8',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '12px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>No Spell Slots Yet</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>
                        Spell slots will become available at level 2
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                }}>
                    <div style={{
                        fontSize: '1.5rem',
                        filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.6))',
                    }}>✨</div>
                    <div style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#dbeafe',
                    }}>
                        Spell Slots
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '1rem',
                }}>
                    {availableLevels.map(level => {
                        const count = standardSlots[level];
                        const colors = [
                            { from: '#ef4444', to: '#dc2626', border: '#fca5a5' }, // 1st - red
                            { from: '#f97316', to: '#ea580c', border: '#fdba74' }, // 2nd - orange
                            { from: '#eab308', to: '#ca8a04', border: '#fde047' }, // 3rd - yellow
                            { from: '#22c55e', to: '#16a34a', border: '#86efac' }, // 4th - green
                            { from: '#06b6d4', to: '#0891b2', border: '#67e8f9' }, // 5th - cyan
                            { from: '#3b82f6', to: '#2563eb', border: '#93c5fd' }, // 6th - blue
                            { from: '#8b5cf6', to: '#7c3aed', border: '#c4b5fd' }, // 7th - violet
                            { from: '#d946ef', to: '#c026d3', border: '#f0abfc' }, // 8th - fuchsia
                            { from: '#ec4899', to: '#db2777', border: '#f9a8d4' }, // 9th - pink
                        ];
                        const color = colors[level - 1];

                        return (
                            <div
                                key={level}
                                style={{
                                    background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`,
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    border: `2px solid ${color.border}40`,
                                    boxShadow: `0 2px 10px ${color.from}30`,
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>
                                    Level {level}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.25rem',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    {Array.from({ length: count }).map((_, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: '1.5rem',
                                                height: '1.5rem',
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                borderRadius: '50%',
                                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
