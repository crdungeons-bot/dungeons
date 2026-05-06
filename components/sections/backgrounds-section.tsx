'use client';

import { useState } from 'react';
import { STATIC_BACKGROUNDS, type StaticBackground } from '@/data/backgrounds';

// ── Left column: compact row for each background ──────────────────────────────

function BackgroundRow({
    bg,
    isSelected,
    onSelect,
}: {
    bg: StaticBackground;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const skills = bg.starting_proficiencies.map(p => p.name.replace('Skill: ', ''));

    return (
        <button
            onClick={onSelect}
            style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderLeft: `3px solid ${isSelected ? 'var(--color-gold)' : 'transparent'}`,
                borderRadius: '0 0.375rem 0.375rem 0',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                backgroundColor: isSelected ? 'rgba(212,175,55,0.08)' : 'transparent',
                transition: 'background-color 0.15s, border-color 0.15s',
                textAlign: 'left',
            }}
            onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)';
            }}
            onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            {/* Name + skills */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    color: isSelected ? 'var(--color-gold)' : 'rgba(244,232,208,0.85)',
                    fontWeight: isSelected ? '700' : '500',
                    fontSize: '0.9rem',
                    margin: '0 0 0.3rem',
                    transition: 'color 0.15s',
                }}>
                    {bg.name}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {skills.map(s => (
                        <span key={s} style={{
                            backgroundColor: 'rgba(212,175,55,0.08)',
                            border: '1px solid rgba(212,175,55,0.18)',
                            color: 'rgba(212,175,55,0.7)',
                            padding: '0.1rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.68rem',
                            fontWeight: '600',
                        }}>
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            {/* Arrow */}
            <span style={{
                color: isSelected ? 'var(--color-gold)' : 'rgba(212,175,55,0.3)',
                fontSize: '1rem',
                flexShrink: 0,
                transition: 'color 0.15s',
            }}>
                ›
            </span>
        </button>
    );
}

// ── Right column: full detail for the selected background ─────────────────────

function BackgroundDetail({ bg }: { bg: StaticBackground }) {
    const skills = bg.starting_proficiencies.map(p => p.name.replace('Skill: ', ''));

    return (
        <div style={{
            height: '100%',
            overflowY: 'auto',
            padding: '1.75rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        }}>
            {/* Name + feature label */}
            <div>
                <p style={{
                    color: 'rgba(212,175,55,0.45)',
                    fontSize: '0.63rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    margin: '0 0 0.25rem',
                }}>
                    Background
                </p>
                <h2 style={{
                    color: 'var(--color-gold)',
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    margin: '0 0 0.375rem',
                }}>
                    {bg.name}
                </h2>
                <p style={{
                    color: 'rgba(212,175,55,0.5)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    margin: 0,
                }}>
                    Feature: {bg.feature.name}
                </p>
            </div>

            {/* Skill proficiencies */}
            <Section label="Skill Proficiencies">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {skills.map(s => (
                        <span key={s} style={{
                            backgroundColor: 'rgba(212,175,55,0.1)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            color: 'var(--color-gold)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                        }}>
                            {s}
                        </span>
                    ))}
                </div>
            </Section>

            {/* Feature description */}
            <Section label={`Feature: ${bg.feature.name}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {bg.feature.desc.map((para, i) => (
                        <p key={i} style={{
                            color: 'rgba(244,232,208,0.78)',
                            fontSize: '0.875rem',
                            lineHeight: '1.8',
                            margin: 0,
                            borderLeft: '2px solid rgba(212,175,55,0.25)',
                            paddingLeft: '0.875rem',
                        }}>
                            {para}
                        </p>
                    ))}
                </div>
            </Section>

            {/* Starting equipment */}
            {bg.starting_equipment.length > 0 && (
                <Section label="Starting Equipment">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {bg.starting_equipment.map((item, i) => (
                            <span key={i} style={{
                                backgroundColor: 'rgba(212,175,55,0.05)',
                                border: '1px solid rgba(212,175,55,0.12)',
                                color: 'rgba(244,232,208,0.65)',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.8rem',
                            }}>
                                {item.equipment.name}
                                {item.quantity > 1 && (
                                    <span style={{ color: 'var(--color-gold)', marginLeft: '0.3rem', fontWeight: '700' }}>
                                        ×{item.quantity}
                                    </span>
                                )}
                            </span>
                        ))}
                    </div>
                </Section>
            )}

            {/* Personality trait sample */}
            {bg.personality_traits && bg.personality_traits.from.length > 0 && (
                <Section label="Sample Personality Trait">
                    <p style={{
                        color: 'rgba(244,232,208,0.55)',
                        fontStyle: 'italic',
                        fontSize: '0.875rem',
                        lineHeight: '1.75',
                        margin: 0,
                    }}>
                        "{bg.personality_traits.from[0].desc}"
                    </p>
                </Section>
            )}

        </div>
    );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <p style={{
                color: 'rgba(212,175,55,0.45)',
                fontSize: '0.62rem',
                fontWeight: '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                margin: '0 0 0.625rem',
            }}>
                {label}
            </p>
            {children}
        </div>
    );
}

// ── Empty state for right panel ───────────────────────────────────────────────

function EmptyDetail() {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '2rem',
        }}>
            <p style={{
                color: 'rgba(212,175,55,0.2)',
                fontSize: '2.5rem',
                margin: 0,
                lineHeight: 1,
            }}>
                ⚔
            </p>
            <p style={{
                color: 'rgba(244,232,208,0.25)',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0,
                maxWidth: '200px',
                lineHeight: '1.6',
            }}>
                Select a background to read its details
            </p>
        </div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function BackgroundsSection() {
    const [selected, setSelected] = useState<string | null>(null);

    const backgrounds = STATIC_BACKGROUNDS;
    const selectedBg  = backgrounds.find(b => b.index === selected) ?? null;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '1.5rem',
            height: '100%',
        }}>
            {/* ── Page header ── */}
            <div>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.375rem',
                }}>
                    Resources
                </p>
                <h1 style={{ color: 'var(--color-gold)', margin: '0 0 0.375rem' }}>
                    Backgrounds ({backgrounds.length})
                </h1>
                <p style={{
                    color: 'rgba(244,232,208,0.4)',
                    fontSize: '0.85rem',
                    lineHeight: '1.7',
                    margin: 0,
                }}>
                    Select a background to explore its feature, skills, and equipment.
                </p>
            </div>

            {/* ── Split panel ── */}
            <div style={{
                display: 'flex',
                flex: 1,
                gap: 0,
                border: '1px solid rgba(212,175,55,0.18)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                backgroundColor: 'var(--color-primary-dark)',
                minHeight: '460px',
            }}>
                {/* Left: background list */}
                <div style={{
                    width: '260px',
                    flexShrink: 0,
                    borderRight: '1px solid rgba(212,175,55,0.15)',
                    overflowY: 'auto',
                    padding: '0.5rem 0',
                }}>
                    {backgrounds.map(bg => (
                        <BackgroundRow
                            key={bg.index}
                            bg={bg}
                            isSelected={selected === bg.index}
                            onSelect={() => setSelected(bg.index)}
                        />
                    ))}
                </div>

                {/* Right: detail */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {selectedBg ? <BackgroundDetail bg={selectedBg} /> : <EmptyDetail />}
                </div>
            </div>
        </div>
    );
}
