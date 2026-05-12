'use client';

import { useState, useEffect } from 'react';

/**
 * Subclass data structure
 */
type Subclass = {
    name: string;
    description: string;
    class: string;
    subclass_level: number;
};

/**
 * Sample spell/ability to display
 */
type SubclassSample = {
    name: string;
    level: number;
    description: string;
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
    const [subclassSamples, setSubclassSamples] = useState<Record<string, SubclassSample[]>>({});

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

    // Fetch sample spells for each subclass
    useEffect(() => {
        if (subclasses.length === 0) return;

        // Fetch spells for all subclasses
        const fetchSamples = async () => {
            const samples: Record<string, SubclassSample[]> = {};
            
            for (const subclass of subclasses) {
                try {
                    // Build subclass tag (e.g., "forge domain cleric")
                    const tag = `${subclass.name.toLowerCase()} ${characterClass}`;
                    
                    // Fetch spells with this subclass tag
                    const response = await fetch(`/api/resources/spells-abilities?subclass=${encodeURIComponent(tag)}&limit=3`);
                    const data = await response.json();
                    
                    samples[subclass.name] = (data.results || []).slice(0, 3).map((spell: any) => ({
                        name: spell.name,
                        level: spell.level ?? 0,
                        description: spell.description?.substring(0, 100) + '...' || '',
                    }));
                } catch (err) {
                    console.error(`Failed to fetch samples for ${subclass.name}:`, err);
                    samples[subclass.name] = [];
                }
            }
            
            setSubclassSamples(samples);
        };

        fetchSamples();
    }, [subclasses, characterClass]);

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
                            }}>
                                {subclasses.map(subclass => {
                                    const isSelected = selectedSubclass === subclass.name;
                                    const samples = subclassSamples[subclass.name] || [];

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

                                                {/* Sample spells */}
                                                {samples.length > 0 && (
                                                    <div>
                                                        <p style={{
                                                            color: 'rgba(212,175,55,0.5)',
                                                            fontSize: '0.7rem',
                                                            fontWeight: '800',
                                                            letterSpacing: '0.1em',
                                                            textTransform: 'uppercase',
                                                            margin: '0 0 0.5rem',
                                                        }}>
                                                            Sample Abilities
                                                        </p>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                            {samples.map(sample => (
                                                                <div
                                                                    key={sample.name}
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
                                                                        {sample.name}
                                                                        {sample.level > 0 && (
                                                                            <span style={{
                                                                                marginLeft: '0.4rem',
                                                                                color: 'rgba(212,175,55,0.4)',
                                                                                fontSize: '0.75rem',
                                                                            }}>
                                                                                Lv{sample.level}
                                                                            </span>
                                                                        )}
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
    const [allSpells, setAllSpells] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tag = `${subclass.name.toLowerCase()} ${characterClass}`;
        
        fetch(`/api/resources/spells-abilities?subclass=${encodeURIComponent(tag)}`)
            .then(r => r.json())
            .then(data => {
                setAllSpells(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch subclass spells:', err);
                setLoading(false);
            });
    }, [subclass.name, characterClass]);

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
                        margin: 0,
                    }}>
                        {subclass.description}
                    </p>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    <h3 style={{
                        color: 'rgba(212,175,55,0.5)',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        margin: '0 0 1rem',
                    }}>
                        Subclass Spells & Abilities
                    </h3>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(212,175,55,0.5)' }}>
                            Loading abilities...
                        </div>
                    ) : allSpells.length === 0 ? (
                        <p style={{ color: 'rgba(244,232,208,0.5)', fontStyle: 'italic' }}>
                            No specific spells found for this subclass.
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {allSpells.map((spell, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '1rem',
                                        backgroundColor: 'rgba(212,175,55,0.05)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                        <h4 style={{
                                            color: 'var(--color-gold)',
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            margin: 0,
                                        }}>
                                            {spell.name}
                                        </h4>
                                        {spell.level !== undefined && (
                                            <span style={{
                                                backgroundColor: 'rgba(212,175,55,0.15)',
                                                color: 'rgba(212,175,55,0.8)',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                            }}>
                                                Level {spell.level}
                                            </span>
                                        )}
                                        {spell.school && (
                                            <span style={{
                                                color: 'rgba(212,175,55,0.5)',
                                                fontSize: '0.8rem',
                                                textTransform: 'capitalize',
                                            }}>
                                                {spell.school}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{
                                        color: 'rgba(244,232,208,0.7)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                        margin: 0,
                                    }}>
                                        {spell.description}
                                    </p>
                                </div>
                            ))}
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
