'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Race = { index: string; name: string; url: string };

type AbilityBonus = {
    ability_score: { index: string; name: string };
    bonus: number;
};

type TraitRef = { index: string; name: string; url: string };

type RaceDetail = {
    index: string;
    name: string;
    speed: number;
    size: string;
    alignment: string;
    ability_bonuses: AbilityBonus[];
    traits: TraitRef[];
    languages: { index: string; name: string }[];
};

const RACE_DESCRIPTIONS: Record<string, string> = {
    dragonborn: 'Proud dragon-blooded warriors with a breath weapon and a fierce, uncompromising sense of honour.',
    dwarf:      'Stout and unyielding, masters of stone and steel forged by centuries underground.',
    elf:        'Ancient and graceful, blessed with keen senses, arcane talent, and centuries of hard-won wisdom.',
    gnome:      'Small in stature, boundless in curiosity — natural tinkerers with a gift for illusion.',
    'half-elf': 'Born of two worlds, blending human ambition with elven charm, perception, and longevity.',
    'half-orc': 'Ferocious and tenacious, they refuse to fall even when death seems certain.',
    halfling:   'Nimble and uncannily lucky, halflings slip through danger with a cheerful, unshakeable calm.',
    human:      'Endlessly adaptable and fiercely ambitious — humans shape the world through sheer determination.',
    tiefling:   'Marked by infernal heritage, cunning survivors who forge their own fate despite the world\'s suspicion.',
};

// ── Individual race card ──────────────────────────────────────────────────────

function RaceSelectCard({
    race,
    isSelected,
    isViewing,
    onViewDetails,
    onSelect,
}: {
    race: Race;
    isSelected: boolean;
    isViewing: boolean;
    onViewDetails: () => void;
    onSelect: () => void;
}) {
    const [imgError, setImgError] = useState(false);

    return (
        <div style={{
            border: `2px solid ${isSelected ? 'var(--color-gold)' : isViewing ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.25)'}`,
            borderRadius: '0.5rem',
            backgroundColor: isSelected ? 'rgba(212,175,55,0.07)' : 'var(--color-primary-light)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxShadow: isSelected ? '0 0 18px rgba(212,175,55,0.18)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            position: 'relative',
        }}>
            {/* Selected badge */}
            {isSelected && (
                <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-primary)',
                    fontSize: '0.58rem',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    zIndex: 1,
                    textTransform: 'uppercase',
                }}>
                    ✓ Selected
                </div>
            )}

            {/* Title bar */}
            <div style={{
                padding: '0.625rem 1rem',
                backgroundColor: 'var(--color-primary-dark)',
                borderBottom: '1px solid rgba(212,175,55,0.15)',
            }}>
                <h3 style={{ color: 'var(--color-gold)', margin: 0, fontSize: '1.05rem' }}>
                    {race.name}
                </h3>
            </div>

            {/* Portrait */}
            {!imgError && (
                <div style={{ position: 'relative', width: '100%', height: '200px', flexShrink: 0 }}>
                    <Image
                        src={`/images/races/${race.index}.png`}
                        alt={race.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        onError={() => setImgError(true)}
                    />
                </div>
            )}

            {/* Description + buttons */}
            <div style={{
                padding: '0.75rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                flexGrow: 1,
                justifyContent: 'space-between',
            }}>
                <p style={{
                    color: 'rgba(244,232,208,0.75)',
                    fontStyle: 'italic',
                    margin: 0,
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                }}>
                    {RACE_DESCRIPTIONS[race.index] ?? 'A proud and storied race with a rich place in the world\'s history.'}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={onViewDetails}
                        style={{
                            flex: 1,
                            padding: '0.45rem 0.5rem',
                            borderRadius: '0.375rem',
                            border: `1px solid ${isViewing ? 'var(--color-gold)' : 'rgba(212,175,55,0.35)'}`,
                            color: isViewing ? 'var(--color-gold)' : 'rgba(212,175,55,0.65)',
                            backgroundColor: isViewing ? 'rgba(212,175,55,0.08)' : 'transparent',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {isViewing ? 'Viewing ›' : 'View Details'}
                    </button>
                    <button
                        onClick={onSelect}
                        style={{
                            flex: 1,
                            padding: '0.45rem 0.5rem',
                            borderRadius: '0.375rem',
                            border: 'none',
                            backgroundColor: isSelected ? 'rgba(212,175,55,0.85)' : 'var(--color-gold)',
                            color: 'var(--color-primary)',
                            fontSize: '0.78rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {isSelected ? '✓ Selected' : 'Select'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Right-side detail panel ───────────────────────────────────────────────────

function RaceDetailPanel({
    data,
    isSelected,
    onSelect,
    onClose,
}: {
    data: RaceDetail;
    isSelected: boolean;
    onSelect: () => void;
    onClose: () => void;
}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            {/* Image header */}
            <div style={{
                height: '240px',
                flexShrink: 0,
                position: 'relative',
                background: `
                    linear-gradient(to bottom, rgba(10,5,2,0.25) 0%, rgba(10,5,2,0.75) 100%),
                    url(/images/races/${data.index}.png) center top / cover no-repeat
                `,
                backgroundColor: 'var(--color-primary)',
            }}>
                {/* Close */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid rgba(212,175,55,0.5)',
                        backgroundColor: 'rgba(10,5,2,0.75)',
                        color: 'var(--color-gold)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        lineHeight: 1,
                    }}
                >
                    ×
                </button>

                {/* Name overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.25rem',
                    right: '3rem',
                }}>
                    <h2 style={{
                        color: 'var(--color-gold)',
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        margin: '0 0 0.2rem',
                        textShadow: '1px 1px 10px rgba(0,0,0,0.95)',
                    }}>
                        {data.name}
                    </h2>
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        color: 'rgba(244,232,208,0.65)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                    }}>
                        <span>Speed {data.speed} ft</span>
                        <span>·</span>
                        <span>{data.size} size</span>
                        <span>·</span>
                        <span>{data.traits.length} traits</span>
                    </div>
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.25rem 0' }}>
                {/* Personality / alignment flavor */}
                <p style={{
                    color: 'rgba(244,232,208,0.8)',
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    lineHeight: '1.75',
                    marginBottom: '1.25rem',
                    borderLeft: '2px solid rgba(212,175,55,0.3)',
                    paddingLeft: '0.875rem',
                    margin: '0 0 1.25rem',
                }}>
                    {data.alignment}
                </p>

                {/* Ability bonuses */}
                <Section label="Ability Bonuses">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {data.ability_bonuses.map(b => (
                            <span key={b.ability_score.index} style={{
                                backgroundColor: 'rgba(212,175,55,0.12)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                color: 'var(--color-gold)',
                                padding: '0.25rem 0.7rem',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                            }}>
                                {b.ability_score.name} +{b.bonus}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Racial traits */}
                {data.traits.length > 0 && (
                    <Section label="Racial Traits">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {data.traits.map(t => (
                                <div key={t.index} style={{
                                    padding: '0.3rem 0.7rem',
                                    backgroundColor: 'rgba(212,175,55,0.05)',
                                    border: '1px solid rgba(212,175,55,0.1)',
                                    borderRadius: '0.25rem',
                                    color: 'rgba(244,232,208,0.75)',
                                    fontSize: '0.825rem',
                                }}>
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Languages */}
                <Section label="Languages">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {data.languages.map(l => (
                            <span key={l.index} style={{
                                backgroundColor: 'rgba(74,124,89,0.15)',
                                border: '1px solid rgba(74,124,89,0.35)',
                                color: '#86efac',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '9999px',
                                fontSize: '0.775rem',
                            }}>
                                {l.name}
                            </span>
                        ))}
                    </div>
                </Section>
            </div>

            {/* Select button */}
            <div style={{ padding: '1rem 1.25rem', flexShrink: 0 }}>
                <button
                    onClick={onSelect}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        border: isSelected ? '2px solid var(--color-gold)' : 'none',
                        backgroundColor: isSelected ? 'rgba(212,175,55,0.1)' : 'var(--color-gold)',
                        color: isSelected ? 'var(--color-gold)' : 'var(--color-primary)',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                    }}
                >
                    {isSelected ? `✓ ${data.name} Selected` : `Select ${data.name}`}
                </button>
            </div>
        </div>
    );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <p style={{
                color: 'rgba(212,175,55,0.5)',
                fontSize: '0.63rem',
                fontWeight: '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
            }}>
                {label}
            </p>
            {children}
        </div>
    );
}

// ── Skeleton / loading state ──────────────────────────────────────────────────

function PanelSkeleton() {
    return (
        <div style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
        }}>
            {[240, 60, 80, 120, 80].map((h, i) => (
                <div key={i} style={{
                    height: `${h}px`,
                    borderRadius: '0.375rem',
                    backgroundColor: 'rgba(212,175,55,0.06)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                }} />
            ))}
        </div>
    );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function RaceSelectStep({
    races,
    preselect,
    preselectClass,
}: {
    races: Race[];
    preselect?: string;
    /** Class index pre-selected from a class detail page — carried forward to step 2 */
    preselectClass?: string;
}) {
    const router = useRouter();

    // Which race's panel is open (can differ from selected)
    const [viewingRace, setViewingRace] = useState<string | null>(preselect ?? null);
    const [viewingData, setViewingData] = useState<RaceDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    // The confirmed selection
    const [selectedRace, setSelectedRace] = useState<string | null>(preselect ?? null);

    // Fetch detail data whenever the panel race changes
    useEffect(() => {
        if (!viewingRace) {
            setViewingData(null);
            return;
        }
        setLoadingDetail(true);
        fetch(`https://www.dnd5eapi.co/api/races/${viewingRace}`)
            .then(r => r.json())
            .then((d: RaceDetail) => {
                setViewingData(d);
                setLoadingDetail(false);
            })
            .catch(() => setLoadingDetail(false));
    }, [viewingRace]);

    const togglePanel = (index: string) =>
        setViewingRace(prev => (prev === index ? null : index));

    const selectedRaceName = races.find(r => r.index === selectedRace)?.name;

    const handleContinue = () => {
        if (!selectedRace) return;
        const params = new URLSearchParams({ step: '2', race: selectedRace });
        // Carry a pre-selected class forward so step 2 auto-selects it
        if (preselectClass) params.set('preselect_class', preselectClass);
        router.push(`/create-character?${params.toString()}`);
    };

    const panelOpen = viewingRace !== null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Grid + panel row */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                {/* Race grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: panelOpen
                            ? 'repeat(auto-fill, minmax(170px, 1fr))'
                            : 'repeat(auto-fill, minmax(210px, 1fr))',
                        gap: '1rem',
                        transition: 'grid-template-columns 0.25s',
                    }}>
                        {races.map(race => (
                            <RaceSelectCard
                                key={race.index}
                                race={race}
                                isSelected={selectedRace === race.index}
                                isViewing={viewingRace === race.index}
                                onViewDetails={() => togglePanel(race.index)}
                                onSelect={() => {
                                    setSelectedRace(race.index);
                                    // Auto-open details when selecting so user can confirm
                                    if (viewingRace !== race.index) setViewingRace(race.index);
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Detail panel */}
                {panelOpen && (
                    <div style={{
                        width: '360px',
                        flexShrink: 0,
                        borderLeft: '1px solid rgba(212,175,55,0.2)',
                        backgroundColor: 'var(--color-primary-dark)',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        {loadingDetail || !viewingData
                            ? <PanelSkeleton />
                            : (
                                <RaceDetailPanel
                                    data={viewingData}
                                    isSelected={selectedRace === viewingData.index}
                                    onSelect={() => setSelectedRace(viewingData.index)}
                                    onClose={() => setViewingRace(null)}
                                />
                            )
                        }
                    </div>
                )}
            </div>

            {/* Sticky footer — appears when a race is confirmed */}
            {selectedRace && (
                <div style={{
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
                    <div>
                        <p style={{
                            color: 'rgba(212,175,55,0.5)',
                            fontSize: '0.62rem',
                            fontWeight: '800',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            margin: '0 0 0.15rem',
                        }}>
                            Race Selected
                        </p>
                        <p style={{
                            color: 'var(--color-gold)',
                            fontWeight: '700',
                            fontSize: '1.05rem',
                            margin: 0,
                        }}>
                            {selectedRaceName}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setSelectedRace(null)}
                            style={{
                                padding: '0.6rem 1rem',
                                borderRadius: '0.375rem',
                                border: '1px solid rgba(212,175,55,0.25)',
                                backgroundColor: 'transparent',
                                color: 'rgba(212,175,55,0.5)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                            }}
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleContinue}
                            style={{
                                padding: '0.7rem 1.75rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                backgroundColor: 'var(--color-gold)',
                                color: 'var(--color-primary)',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                letterSpacing: '0.04em',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Continue to Class &#8594;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
