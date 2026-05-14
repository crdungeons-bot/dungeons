'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCharacterCreationStore, useCharacterCreationHydrated } from '@/stores/character-creation-store';

type Subrace = {
    index: string;
    name: string;
    race: string;
    desc?: string;
    ability_bonuses: Array<{
        ability_score: { index: string; name: string };
        bonus: number;
    }>;
    racial_traits: Array<{
        index: string;
        name: string;
        desc: string;
    }>;
    starting_proficiencies?: Array<{
        index: string;
        name: string;
    }>;
    languages?: Array<{
        index: string;
        name: string;
    }>;
    source: string;
};

// ── Individual subrace card ──────────────────────────────────────────────────────

function SubraceCard({
    subrace,
    isSelected,
    onViewDetails,
    onSelect,
}: {
    subrace: Subrace;
    isSelected: boolean;
    onViewDetails: () => void;
    onSelect: () => void;
}) {
    const [imgError, setImgError] = useState(false);
    
    // Get brief description (first sentence or first 100 chars)
    const briefDesc = subrace.desc 
        ? subrace.desc.split('.')[0] + '.' 
        : subrace.racial_traits[0]?.desc?.split('.')[0] + '.' || '';

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
                    {subrace.name}
                </h3>
                {subrace.source && (
                    <p style={{
                        color: 'rgba(212,175,55,0.4)',
                        fontSize: '0.65rem',
                        margin: '0.25rem 0 0',
                        fontWeight: '600',
                        letterSpacing: '0.05em',
                    }}>
                        {subrace.source}
                    </p>
                )}
            </div>

            {/* Brief description */}
            <div style={{ padding: '1rem', flex: 1 }}>
                <p style={{
                    color: 'rgba(244,232,208,0.75)',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    margin: '0 0 1rem',
                }}>
                    {briefDesc}
                </p>

                {/* Quick stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {subrace.ability_bonuses.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                            {subrace.ability_bonuses.map(b => (
                                <span key={b.ability_score.index} style={{
                                    backgroundColor: 'rgba(212,175,55,0.12)',
                                    border: '1px solid rgba(212,175,55,0.25)',
                                    color: 'var(--color-gold)',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                }}>
                                    {b.ability_score.name} +{b.bonus}
                                </span>
                            ))}
                        </div>
                    )}
                    <p style={{
                        color: 'rgba(212,175,55,0.5)',
                        fontSize: '0.7rem',
                        margin: 0,
                    }}>
                        {subrace.racial_traits.length} special trait{subrace.racial_traits.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Action buttons */}
            <div 
                className="subrace-card-buttons"
                style={{
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    borderTop: '1px solid rgba(212,175,55,0.1)',
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
                    Full Details
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

function SubraceDetailModal({
    data,
    isSelected,
    onSelect,
    onClose,
}: {
    data: Subrace;
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
                {/* Header */}
                <div style={{
                    padding: '2rem 2rem 1.5rem',
                    borderBottom: '1px solid rgba(212,175,55,0.2)',
                    position: 'relative',
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

                    <h2 style={{
                        color: 'var(--color-gold)',
                        fontSize: '2rem',
                        fontWeight: '800',
                        margin: '0 0 0.3rem',
                    }}>
                        {data.name}
                    </h2>
                    <p style={{
                        color: 'rgba(212,175,55,0.5)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}>
                        {data.source}
                    </p>
                </div>

                {/* Scrollable content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {/* Description */}
                    {data.desc && (
                        <p style={{
                            color: 'rgba(244,232,208,0.85)',
                            fontStyle: 'italic',
                            fontSize: '1rem',
                            lineHeight: '1.75',
                            borderLeft: '3px solid rgba(212,175,55,0.4)',
                            paddingLeft: '1.25rem',
                            margin: '0 0 2rem',
                        }}>
                            {data.desc}
                        </p>
                    )}

                    {/* Ability bonuses */}
                    {data.ability_bonuses.length > 0 && (
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
                    )}

                    {/* Racial traits */}
                    {data.racial_traits.length > 0 && (
                        <Section label="Special Traits">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {data.racial_traits.map(t => (
                                    <div key={t.index} style={{
                                        padding: '1rem',
                                        backgroundColor: 'rgba(212,175,55,0.05)',
                                        border: '1px solid rgba(212,175,55,0.15)',
                                        borderRadius: '0.5rem',
                                    }}>
                                        <h4 style={{
                                            color: 'var(--color-gold)',
                                            fontSize: '0.95rem',
                                            fontWeight: '700',
                                            margin: '0 0 0.5rem',
                                        }}>
                                            {t.name}
                                        </h4>
                                        <p style={{
                                            color: 'rgba(244,232,208,0.75)',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.6',
                                            margin: 0,
                                        }}>
                                            {t.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Proficiencies */}
                    {data.starting_proficiencies && data.starting_proficiencies.length > 0 && (
                        <Section label="Bonus Proficiencies">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {data.starting_proficiencies.map(p => (
                                    <span key={p.index} style={{
                                        backgroundColor: 'rgba(139,92,246,0.12)',
                                        border: '1px solid rgba(139,92,246,0.3)',
                                        color: '#c4b5fd',
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                    }}>
                                        {p.name}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Languages */}
                    {data.languages && data.languages.length > 0 && (
                        <Section label="Languages">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {data.languages.map(l => (
                                    <span key={l.index} style={{
                                        backgroundColor: 'rgba(74,124,89,0.15)',
                                        border: '1px solid rgba(74,124,89,0.35)',
                                        color: '#86efac',
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                    }}>
                                        {l.name}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}
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
        <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
                color: 'rgba(212,175,55,0.5)',
                fontSize: '0.63rem',
                fontWeight: '800',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
            }}>
                {label}
            </p>
            {children}
        </div>
    );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function SubraceSelectStep({ raceName }: { raceName: string }) {
    const router = useRouter();
    const draftSubrace = useCharacterCreationStore(s => s.draft.subrace);
    const patchDraft = useCharacterCreationStore(s => s.patchDraft);
    const hydrated = useCharacterCreationHydrated();

    const [subraces, setSubraces] = useState<Subrace[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewingSubrace, setViewingSubrace] = useState<Subrace | null>(null);

    const selectedSubrace = draftSubrace ?? null;

    // Fetch subraces for the selected race
    useEffect(() => {
        if (!raceName) return;
        
        setLoading(true);
        fetch(`/api/resources/subraces?race=${raceName}`)
            .then(r => r.json())
            .then((d: { results: Subrace[] }) => {
                setSubraces(d.results || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [raceName]);

    const handleSelectSubrace = (subraceIndex: string) => {
        patchDraft({ subrace: subraceIndex });
    };

    const handleContinue = () => {
        if (!selectedSubrace) return;
        router.push('/create-character?step=2');
    };

    const handleSkip = () => {
        // If they don't select a subrace, clear it and continue
        patchDraft({ subrace: undefined });
        router.push('/create-character?step=2');
    };

    if (!hydrated || loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                color: 'var(--color-gold)',
            }}>
                Loading subraces…
            </div>
        );
    }

    if (subraces.length === 0) {
        // No subraces for this race, auto-continue
        router.push('/create-character?step=2');
        return null;
    }

    const selectedSubraceName = subraces.find(s => s.index === selectedSubrace)?.name;

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Subrace grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1rem',
                    }} className="subrace-grid">
                        {subraces.map(subrace => (
                            <SubraceCard
                                key={subrace.index}
                                subrace={subrace}
                                isSelected={selectedSubrace === subrace.index}
                                onViewDetails={() => setViewingSubrace(subrace)}
                                onSelect={() => handleSelectSubrace(subrace.index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sticky footer */}
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
                }} className="subrace-footer">
                    <div>
                        {selectedSubrace ? (
                            <>
                                <p style={{
                                    color: 'rgba(212,175,55,0.5)',
                                    fontSize: '0.62rem',
                                    fontWeight: '800',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    margin: '0 0 0.15rem',
                                }}>
                                    Subrace Selected
                                </p>
                                <p style={{
                                    color: 'var(--color-gold)',
                                    fontWeight: '700',
                                    fontSize: '1.05rem',
                                    margin: 0,
                                }}>
                                    {selectedSubraceName}
                                </p>
                            </>
                        ) : (
                            <p style={{
                                color: 'rgba(244,232,208,0.6)',
                                fontSize: '0.9rem',
                                margin: 0,
                            }}>
                                Choose a subrace variant for your {raceName}
                            </p>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="subrace-footer-buttons">
                        {!selectedSubrace && (
                            <button
                                onClick={handleSkip}
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
                                Skip
                            </button>
                        )}
                        {selectedSubrace && (
                            <button
                                onClick={() => patchDraft({ subrace: undefined })}
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
                        )}
                        <button
                            onClick={handleContinue}
                            disabled={!selectedSubrace}
                            style={{
                                padding: '0.7rem 1.75rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                backgroundColor: selectedSubrace ? 'var(--color-gold)' : 'rgba(212,175,55,0.3)',
                                color: selectedSubrace ? 'var(--color-primary)' : 'rgba(10,5,2,0.5)',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                letterSpacing: '0.04em',
                                cursor: selectedSubrace ? 'pointer' : 'not-allowed',
                                whiteSpace: 'nowrap',
                                opacity: selectedSubrace ? 1 : 0.6,
                            }}
                        >
                            Continue to Class &#8594;
                        </button>
                    </div>
                </div>
            </div>

            {/* Full-screen modal */}
            {viewingSubrace && (
                <SubraceDetailModal
                    data={viewingSubrace}
                    isSelected={selectedSubrace === viewingSubrace.index}
                    onSelect={() => handleSelectSubrace(viewingSubrace.index)}
                    onClose={() => setViewingSubrace(null)}
                />
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .subrace-grid {
                        grid-template-columns: 1fr !important;
                        gap: 0.75rem !important;
                    }
                    
                    .subrace-card-buttons {
                        flex-direction: column !important;
                        padding: 0.75rem 1rem !important;
                    }
                    
                    .subrace-card-buttons button {
                        width: 100% !important;
                    }
                    
                    .subrace-footer {
                        flex-direction: column !important;
                        align-items: stretch !important;
                        padding: 0.75rem 1rem !important;
                        gap: 0.75rem !important;
                    }
                    
                    .subrace-footer > div:first-child {
                        text-align: center;
                    }
                    
                    .subrace-footer-buttons {
                        width: 100%;
                        flex-direction: column !important;
                        gap: 0.5rem !important;
                    }
                    
                    .subrace-footer-buttons button {
                        width: 100% !important;
                        padding: 0.75rem 1rem !important;
                    }
                }
            `}</style>
        </>
    );
}
