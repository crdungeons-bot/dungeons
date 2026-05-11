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

// ── Individual race card ──────────────────────────────────────────────────────

function RaceSelectCard({
    race,
    isSelected,
    onViewDetails,
    onSelect,
}: {
    race: Race;
    isSelected: boolean;
    onViewDetails: () => void;
    onSelect: () => void;
}) {
    const [imgError, setImgError] = useState(false);

    return (
        <div style={{
            border: `2px solid ${isSelected ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)'}`,
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

            {/* Action buttons */}
            <div 
                className="race-card-buttons"
                style={{
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    gap: '0.5rem',
                }}
            >
                <button
                    onClick={onViewDetails}
                    className="view-details-btn"
                    style={{
                        flex: 1,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '0.375rem',
                        border: '1px solid rgba(212,175,55,0.35)',
                        color: 'rgba(212,175,55,0.65)',
                        backgroundColor: 'transparent',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                        e.currentTarget.style.color = 'var(--color-gold)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(212,175,55,0.65)';
                    }}
                >
                    View Details
                </button>
                <button
                    onClick={onSelect}
                    className="select-btn"
                    style={{
                        flex: 1,
                        padding: '0.65rem 0.5rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        backgroundColor: isSelected ? 'rgba(212,175,55,0.85)' : 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s',
                    }}
                >
                    {isSelected ? '✓ Selected' : 'Select'}
                </button>
            </div>
        </div>
    );
}

// ── Full-screen detail modal ──────────────────────────────────────────────────

function RaceDetailModal({
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
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                overflow: 'auto',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-gold)',
                    borderRadius: '0.75rem',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Image header */}
                <div style={{
                    height: '280px',
                    flexShrink: 0,
                    position: 'relative',
                    background: `
                        linear-gradient(to bottom, rgba(10,5,2,0.25) 0%, rgba(10,5,2,0.75) 100%),
                        url(/images/races/${data.index}.png) center top / cover no-repeat
                    `,
                    backgroundColor: 'var(--color-primary)',
                }}>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid rgba(212,175,55,0.5)',
                            backgroundColor: 'rgba(10,5,2,0.85)',
                            color: 'var(--color-gold)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            lineHeight: 1,
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'rgba(10,5,2,0.85)';
                        }}
                    >
                        ×
                    </button>

                    {/* Name overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        left: '2rem',
                        right: '4rem',
                    }}>
                        <h2 style={{
                            color: 'var(--color-gold)',
                            fontSize: '2.25rem',
                            fontWeight: '800',
                            margin: '0 0 0.3rem',
                            textShadow: '2px 2px 12px rgba(0,0,0,0.95)',
                        }}>
                            {data.name}
                        </h2>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            color: 'rgba(244,232,208,0.7)',
                            fontSize: '0.85rem',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            textShadow: '1px 1px 6px rgba(0,0,0,0.9)',
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
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {/* Personality / alignment flavor */}
                    <p style={{
                        color: 'rgba(244,232,208,0.85)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        lineHeight: '1.75',
                        borderLeft: '3px solid rgba(212,175,55,0.4)',
                        paddingLeft: '1.25rem',
                        margin: '0 0 2rem',
                    }}>
                        {data.alignment}
                    </p>

                    {/* Ability bonuses */}
                    <Section label="Ability Bonuses">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {data.ability_bonuses.map(b => (
                                <span key={b.ability_score.index} style={{
                                    backgroundColor: 'rgba(212,175,55,0.12)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    color: 'var(--color-gold)',
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.9rem',
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {data.traits.map(t => (
                                    <div key={t.index} style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'rgba(212,175,55,0.05)',
                                        border: '1px solid rgba(212,175,55,0.1)',
                                        borderRadius: '0.375rem',
                                        color: 'rgba(244,232,208,0.8)',
                                        fontSize: '0.9rem',
                                    }}>
                                        {t.name}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Languages */}
                    <Section label="Languages">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {data.languages.map(l => (
                                <span key={l.index} style={{
                                    backgroundColor: 'rgba(74,124,89,0.15)',
                                    border: '1px solid rgba(74,124,89,0.35)',
                                    color: '#86efac',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.85rem',
                                }}>
                                    {l.name}
                                </span>
                            ))}
                        </div>
                    </Section>
                </div>

                {/* Action buttons */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex',
                    gap: '1rem',
                    flexShrink: 0,
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '0.85rem',
                            borderRadius: '0.375rem',
                            border: '1px solid rgba(212,175,55,0.3)',
                            backgroundColor: 'transparent',
                            color: 'rgba(212,175,55,0.7)',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onSelect();
                            onClose();
                        }}
                        style={{
                            flex: 2,
                            padding: '0.85rem',
                            borderRadius: '0.375rem',
                            border: isSelected ? '2px solid var(--color-gold)' : 'none',
                            backgroundColor: isSelected ? 'rgba(212,175,55,0.1)' : 'var(--color-gold)',
                            color: isSelected ? 'var(--color-gold)' : 'var(--color-primary)',
                            fontWeight: '700',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}
                    >
                        {isSelected ? `✓ ${data.name} Selected` : `Select ${data.name}`}
                    </button>
                </div>
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

// ── Main exported component ───────────────────────────────────────────────────

export default function RaceSelectStep({
    races,
    preselect,
    preselectClass,
}: {
    races: Race[];
    preselect?: string;
    /** Class index pre-selected from a class detail page,   carried forward to step 2 */
    preselectClass?: string;
}) {
    const router = useRouter();

    // Which race's modal is open
    const [viewingRace, setViewingRace] = useState<string | null>(null);
    const [viewingData, setViewingData] = useState<RaceDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    // The confirmed selection
    const [selectedRace, setSelectedRace] = useState<string | null>(preselect ?? null);

    // Fetch detail data whenever the modal race changes
    useEffect(() => {
        if (!viewingRace) {
            setViewingData(null);
            return;
        }
        setLoadingDetail(true);
        fetch(`/api/resources/races?index=${viewingRace}`)
            .then(r => r.json())
            .then((d: { results: RaceDetail[] }) => {
                setViewingData(d.results[0]);
                setLoadingDetail(false);
            })
            .catch(() => setLoadingDetail(false));
    }, [viewingRace]);

    const selectedRaceName = races.find(r => r.index === selectedRace)?.name;

    const handleContinue = () => {
        if (!selectedRace) return;
        const params = new URLSearchParams({ step: '2', race: selectedRace });
        // Carry a pre-selected class forward so step 2 auto-selects it
        if (preselectClass) params.set('preselect_class', preselectClass);
        router.push(`/create-character?${params.toString()}`);
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Race grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                        gap: '1rem',
                    }} className="race-grid">
                        {races.map(race => (
                            <RaceSelectCard
                                key={race.index}
                                race={race}
                                isSelected={selectedRace === race.index}
                                onViewDetails={() => setViewingRace(race.index)}
                                onSelect={() => setSelectedRace(race.index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sticky footer,   appears when a race is confirmed */}
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
                    }} className="race-footer">
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

                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="race-footer-buttons">
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

                <style jsx>{`
                    @media (max-width: 768px) {
                        .race-grid {
                            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
                            gap: 0.75rem !important;
                        }
                        
                        .race-card-buttons {
                            flex-direction: column !important;
                            padding: 0.75rem 1rem !important;
                        }
                        
                        .race-card-buttons button {
                            width: 100% !important;
                        }
                        
                        .race-footer {
                            flex-direction: column !important;
                            align-items: stretch !important;
                            padding: 0.75rem 1rem !important;
                            gap: 0.75rem !important;
                        }
                        
                        .race-footer > div:first-child {
                            text-align: center;
                        }
                        
                        .race-footer-buttons {
                            width: 100%;
                            flex-direction: column !important;
                            gap: 0.5rem !important;
                        }
                        
                        .race-footer-buttons button {
                            width: 100% !important;
                            padding: 0.75rem 1rem !important;
                        }
                    }
                `}</style>
            </div>

            {/* Full-screen modal */}
            {viewingRace && viewingData && !loadingDetail && (
                <RaceDetailModal
                    data={viewingData}
                    isSelected={selectedRace === viewingData.index}
                    onSelect={() => setSelectedRace(viewingData.index)}
                    onClose={() => setViewingRace(null)}
                />
            )}
        </>
    );
}
