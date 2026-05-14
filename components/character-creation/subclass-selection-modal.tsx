'use client';

import { useState, useEffect } from 'react';

/**
 * Subclass feature from the database
 */
type SubclassFeature = {
    name: string;
    level: number;
    description: string;
    actionType?: string;
    usesPerRest?: string;
    restType?: string;
    damage?: {
        dice: string;
        type: string;
        scaling?: string;
    };
};

/**
 * Subclass data structure (now with full feature data)
 */
type Subclass = {
    name: string;
    description: string;
    class: string;
    subclass_level: number;
    sourcebook?: string;
    features?: {
        [level: number]: SubclassFeature[];
    };
    spells?: {
        byCharacterLevel?: {
            [level: number]: string[];
        };
        alwaysPrepared?: boolean;
        spellcastingAbility?: string;
    };
    proficiencies?: {
        armor?: string[];
        weapons?: string[];
        tools?: string[];
        skills?: string[] | { choose: number; from: string[] };
    };
    resources?: Array<{
        name: string;
        type: string;
        usesPerRest?: string;
        restType: string;
        levelGained: number;
        description?: string;
    }>;
};

/**
 * Reusable Subclass Selection Modal
 * 
 * Used in both character creation and level-up flows
 */
export default function SubclassSelectionModal({
    characterClass,
    selectedSubclass,
    onSelect,
    onClose,
    onConfirm,
}: {
    characterClass: string;
    selectedSubclass: string | null;
    onSelect: (subclassName: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}) {
    const [subclasses, setSubclasses] = useState<Subclass[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewingSubclass, setViewingSubclass] = useState<string | null>(null);

    // Fetch subclasses for this class
    useEffect(() => {
        setLoading(true);
        fetch(`/api/resources/subclasses?class=${characterClass}`)
            .then(r => r.json())
            .then(data => {
                setSubclasses(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch subclasses:', err);
                setLoading(false);
            });
    }, [characterClass]);

    const classDisplayName = characterClass.charAt(0).toUpperCase() + characterClass.slice(1);

    return (
        <>
            {/* Main Modal */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 2000,
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
                        maxWidth: '1200px',
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
                        padding: '1.5rem 2rem',
                        borderBottom: '1px solid rgba(212,175,55,0.2)',
                        backgroundColor: 'var(--color-primary-dark)',
                    }}>
                        <p style={{
                            color: 'rgba(212,175,55,0.5)',
                            fontSize: '0.65rem',
                            fontWeight: '800',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            margin: '0 0 0.3rem',
                        }}>
                            Choose Your Path
                        </p>
                        <h2 style={{
                            color: 'var(--color-gold)',
                            fontSize: '1.75rem',
                            fontWeight: '800',
                            margin: 0,
                        }}>
                            {classDisplayName} Subclass
                        </h2>
                        <p style={{
                            color: 'rgba(244,232,208,0.6)',
                            fontSize: '0.9rem',
                            margin: '0.5rem 0 0',
                        }}>
                            Select the specialization that defines your character's path
                        </p>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(212,175,55,0.5)' }}>
                                Loading subclasses...
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1rem',
                            }}                            >
                                {subclasses.map(subclass => {
                                    const isSelected = selectedSubclass === subclass.name;
                                    
                                    // Get first 3 features for preview
                                    const featurePreview: Array<{ name: string; level: number }> = [];
                                    if (subclass.features) {
                                        const sortedLevels = Object.keys(subclass.features)
                                            .map(Number)
                                            .sort((a, b) => a - b);
                                        
                                        for (const level of sortedLevels) {
                                            const features = subclass.features[level];
                                            for (const feature of features) {
                                                if (featurePreview.length < 3) {
                                                    featurePreview.push({ name: feature.name, level });
                                                }
                                            }
                                            if (featurePreview.length >= 3) break;
                                        }
                                    }

                                    return (
                                        <div
                                            key={subclass.name}
                                            style={{
                                                border: `2px solid ${isSelected ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)'}`,
                                                borderRadius: '0.5rem',
                                                backgroundColor: isSelected ? 'rgba(212,175,55,0.07)' : 'var(--color-primary-light)',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                boxShadow: isSelected ? '0 0 18px rgba(212,175,55,0.18)' : 'none',
                                                transition: 'all 0.2s',
                                                position: 'relative',
                                            }}
                                        >
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

                                            {/* Title */}
                                            <div style={{
                                                padding: '1rem',
                                                backgroundColor: 'var(--color-primary-dark)',
                                                borderBottom: '1px solid rgba(212,175,55,0.15)',
                                            }}>
                                                <h3 style={{
                                                    color: 'var(--color-gold)',
                                                    margin: 0,
                                                    fontSize: '1.1rem',
                                                    fontWeight: '700',
                                                }}>
                                                    {subclass.name}
                                                </h3>
                                            </div>

                                            {/* Description */}
                                            <div style={{ padding: '1rem', flex: 1 }}>
                                                <p style={{
                                                    color: 'rgba(244,232,208,0.75)',
                                                    fontSize: '0.88rem',
                                                    lineHeight: '1.5',
                                                    margin: '0 0 1rem',
                                                }}>
                                                    {subclass.description}
                                                </p>

                                                {/* Feature preview */}
                                                {featurePreview.length > 0 && (
                                                    <div>
                                                        <p style={{
                                                            color: 'rgba(212,175,55,0.5)',
                                                            fontSize: '0.7rem',
                                                            fontWeight: '800',
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            margin: '0 0 0.5rem',
                                                        }}>
                                                            Key Features
                                                        </p>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {featurePreview.map((feature, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    style={{
                                                                        padding: '0.5rem',
                                                                        backgroundColor: 'rgba(212,175,55,0.05)',
                                                                        border: '1px solid rgba(212,175,55,0.15)',
                                                                        borderRadius: '0.25rem',
                                                                    }}
                                                                >
                                                                    <p style={{
                                                                        color: 'rgba(212,175,55,0.85)',
                                                                        fontSize: '0.82rem',
                                                                        fontWeight: '600',
                                                                        margin: 0,
                                                                    }}>
                                                                        {feature.name}
                                                                        <span style={{
                                                                            marginLeft: '0.4rem',
                                                                            color: 'rgba(212,175,55,0.4)',
                                                                            fontSize: '0.75rem',
                                                                        }}>
                                                                            Lv{feature.level}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div style={{
                                                padding: '0.75rem 1rem',
                                                display: 'flex',
                                                gap: '0.5rem',
                                                borderTop: '1px solid rgba(212,175,55,0.1)',
                                            }}>
                                                <button
                                                    onClick={() => setViewingSubclass(subclass.name)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.6rem',
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
                                                    onClick={() => onSelect(subclass.name)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.6rem',
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
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
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
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={!selectedSubclass}
                            style={{
                                flex: 2,
                                padding: '0.85rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                backgroundColor: selectedSubclass ? 'var(--color-gold)' : 'rgba(212,175,55,0.2)',
                                color: selectedSubclass ? 'var(--color-primary)' : 'rgba(212,175,55,0.3)',
                                fontWeight: '700',
                                fontSize: '1rem',
                                cursor: selectedSubclass ? 'pointer' : 'not-allowed',
                                transition: 'all 0.15s',
                            }}
                        >
                            {selectedSubclass ? `Confirm ${selectedSubclass}` : 'Select a Subclass'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Full Detail Modal */}
            {viewingSubclass && (
                <SubclassDetailModal
                    subclass={subclasses.find(s => s.name === viewingSubclass)!}
                    characterClass={characterClass}
                    onClose={() => setViewingSubclass(null)}
                    onSelect={() => {
                        onSelect(viewingSubclass);
                        setViewingSubclass(null);
                    }}
                    isSelected={selectedSubclass === viewingSubclass}
                />
            )}
        </>
    );
}

/**
 * Full-screen detail modal for a single subclass
 */
function SubclassDetailModal({
    subclass,
    characterClass,
    onClose,
    onSelect,
    isSelected,
}: {
    subclass: Subclass;
    characterClass: string;
    onClose: () => void;
    onSelect: () => void;
    isSelected: boolean;
}) {
    // Sort features by level
    const featuresByLevel: Array<{ level: number; features: SubclassFeature[] }> = [];
    if (subclass.features) {
        const sortedLevels = Object.keys(subclass.features)
            .map(Number)
            .sort((a, b) => a - b);
        
        for (const level of sortedLevels) {
            featuresByLevel.push({
                level,
                features: subclass.features[level],
            });
        }
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 3000,
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
                    maxWidth: '900px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid rgba(212,175,55,0.2)',
                    backgroundColor: 'var(--color-primary-dark)',
                    position: 'relative',
                }}>
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
                        margin: '0 0 0.5rem',
                    }}>
                        {subclass.name}
                    </h2>
                    <p style={{
                        color: 'rgba(244,232,208,0.8)',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        margin: '0 0 0.5rem',
                    }}>
                        {subclass.description}
                    </p>
                    {subclass.sourcebook && (
                        <p style={{
                            color: 'rgba(212,175,55,0.5)',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: 0,
                        }}>
                            Source: {subclass.sourcebook}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {/* Proficiencies */}
                    {subclass.proficiencies && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                color: 'rgba(212,175,55,0.5)',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                margin: '0 0 1rem',
                            }}>
                                Bonus Proficiencies
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {subclass.proficiencies.armor?.map((armor, idx) => (
                                    <span key={idx} style={{
                                        backgroundColor: 'rgba(180,50,50,0.15)',
                                        border: '1px solid rgba(180,50,50,0.35)',
                                        color: '#fca5a5',
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                    }}>
                                        {armor}
                                    </span>
                                ))}
                                {subclass.proficiencies.weapons?.map((weapon, idx) => (
                                    <span key={idx} style={{
                                        backgroundColor: 'rgba(212,175,55,0.08)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                        color: 'rgba(212,175,55,0.8)',
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                    }}>
                                        {weapon}
                                    </span>
                                ))}
                                {subclass.proficiencies.tools?.map((tool, idx) => (
                                    <span key={idx} style={{
                                        backgroundColor: 'rgba(100,150,200,0.15)',
                                        border: '1px solid rgba(100,150,200,0.35)',
                                        color: '#93c5fd',
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                    }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Expanded Spell List */}
                    {subclass.spells?.byCharacterLevel && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                color: 'rgba(212,175,55,0.5)',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                margin: '0 0 1rem',
                            }}>
                                Expanded Spell List {subclass.spells.alwaysPrepared && '(Always Prepared)'}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {Object.entries(subclass.spells.byCharacterLevel)
                                    .sort(([a], [b]) => Number(a) - Number(b))
                                    .map(([level, spells]) => (
                                        <div key={level} style={{
                                            padding: '0.75rem',
                                            backgroundColor: 'rgba(212,175,55,0.05)',
                                            border: '1px solid rgba(212,175,55,0.15)',
                                            borderRadius: '0.5rem',
                                        }}>
                                            <p style={{
                                                color: 'var(--color-gold)',
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                margin: '0 0 0.5rem',
                                            }}>
                                                Level {level}
                                            </p>
                                            <p style={{
                                                color: 'rgba(244,232,208,0.8)',
                                                fontSize: '0.9rem',
                                                margin: 0,
                                            }}>
                                                {spells.join(', ')}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Features by Level */}
                    <h3 style={{
                        color: 'rgba(212,175,55,0.5)',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        margin: '0 0 1rem',
                    }}>
                        Subclass Features
                    </h3>

                    {featuresByLevel.length === 0 ? (
                        <p style={{ color: 'rgba(244,232,208,0.5)', fontStyle: 'italic' }}>
                            No features available.
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {featuresByLevel.map(({ level, features }) => (
                                <div key={level}>
                                    {features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '1rem',
                                                backgroundColor: 'rgba(212,175,55,0.05)',
                                                border: '1px solid rgba(212,175,55,0.2)',
                                                borderRadius: '0.5rem',
                                                marginBottom: idx < features.length - 1 ? '0.75rem' : 0,
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                                <h4 style={{
                                                    color: 'var(--color-gold)',
                                                    fontSize: '1rem',
                                                    fontWeight: '700',
                                                    margin: 0,
                                                }}>
                                                    {feature.name}
                                                </h4>
                                                <span style={{
                                                    backgroundColor: 'rgba(212,175,55,0.15)',
                                                    color: 'rgba(212,175,55,0.8)',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                }}>
                                                    Level {level}
                                                </span>
                                                {feature.actionType && (
                                                    <span style={{
                                                        backgroundColor: 'rgba(100,150,200,0.15)',
                                                        color: '#93c5fd',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '9999px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '600',
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {feature.actionType}
                                                    </span>
                                                )}
                                                {feature.usesPerRest && (
                                                    <span style={{
                                                        color: 'rgba(212,175,55,0.5)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                    }}>
                                                        {feature.usesPerRest} / {feature.restType} rest
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{
                                                color: 'rgba(244,232,208,0.8)',
                                                fontSize: '0.9rem',
                                                lineHeight: '1.6',
                                                margin: 0,
                                                whiteSpace: 'pre-line',
                                            }}>
                                                {feature.description}
                                            </p>
                                            {feature.damage && (
                                                <p style={{
                                                    color: '#fca5a5',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    margin: '0.5rem 0 0',
                                                }}>
                                                    Damage: {feature.damage.dice} {feature.damage.type}
                                                    {feature.damage.scaling && ` (${feature.damage.scaling})`}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resources */}
                    {subclass.resources && subclass.resources.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{
                                color: 'rgba(212,175,55,0.5)',
                                fontSize: '0.7rem',
                                fontWeight: '800',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                margin: '0 0 1rem',
                            }}>
                                Resource Pools
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {subclass.resources.map((resource, idx) => (
                                    <div key={idx} style={{
                                        padding: '0.75rem',
                                        backgroundColor: 'rgba(212,175,55,0.05)',
                                        border: '1px solid rgba(212,175,55,0.15)',
                                        borderRadius: '0.5rem',
                                    }}>
                                        <p style={{
                                            color: 'var(--color-gold)',
                                            fontSize: '0.9rem',
                                            fontWeight: '700',
                                            margin: '0 0 0.25rem',
                                        }}>
                                            {resource.name}
                                        </p>
                                        <p style={{
                                            color: 'rgba(244,232,208,0.6)',
                                            fontSize: '0.8rem',
                                            margin: 0,
                                        }}>
                                            {resource.usesPerRest} / {resource.restType} rest · Gained at level {resource.levelGained}
                                        </p>
                                        {resource.description && (
                                            <p style={{
                                                color: 'rgba(244,232,208,0.7)',
                                                fontSize: '0.85rem',
                                                margin: '0.5rem 0 0',
                                            }}>
                                                {resource.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
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
                        {isSelected ? `✓ ${subclass.name} Selected` : `Select ${subclass.name}`}
                    </button>
                </div>
            </div>
        </div>
    );
}
