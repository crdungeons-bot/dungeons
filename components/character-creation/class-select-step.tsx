'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type DndClass = { index: string; name: string; url: string };

type SavingThrow = { index: string; name: string };
type Proficiency  = { index: string; name: string };

type ClassDetail = {
    index: string;
    name: string;
    hit_die: number;
    saving_throws: SavingThrow[];
    proficiencies: Proficiency[];
    proficiency_choices: { desc: string }[];
};

const CLASS_FLAVORS: Record<string, string> = {
    barbarian: 'Barbarians charge headlong into battle, shrugging off wounds through sheer unstoppable rage.',
    bard:      'Bards inspire allies, mock enemies, and bend the world to their will with words alone. Equally at home in a royal court or a dungeon.',
    cleric:    'Clerics walk the line between mortal and divine,   smiting enemies with holy power one moment and restoring the fallen the next.',
    druid:     'Druids can call lightning from a clear sky, walk as a bear through enemy lines, or speak with the trees. Their power is ancient.',
    fighter:   'Fighters are unmatched in their ability to dish out and absorb punishment, whether wielding a greatsword or raining arrows from afar.',
    monk:      'Monks focus their ki into devastating unarmed strikes, impossible agility, and abilities that defy the laws of nature.',
    paladin:   'Paladins combine the martial prowess of a fighter with the divine power of a cleric, fuelled by a sacred oath.',
    ranger:    'Rangers are most dangerous in their favoured terrain, using cunning, speed, and a bond with nature to outlast any foe.',
    rogue:     'Rogues exploit every blind spot and moment of distraction for a devastating strike. They pick locks, pocket secrets, and vanish into shadow.',
    sorcerer:  'Magic is not something a sorcerer learns,   it is something they were born as. Wild, unpredictable, and enormously powerful.',
    warlock:   'Warlocks have made a deal, and that deal has made them dangerous. Their spells hit harder and recharge faster than any other caster\'s.',
    wizard:    'Wizards command the broadest and most devastating catalogue of spells through decades of obsessive study.',
};

// ── Individual class card ─────────────────────────────────────────────────────

function ClassSelectCard({
    dndClass,
    isSelected,
    onViewDetails,
    onSelect,
}: {
    dndClass: DndClass;
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
                    {dndClass.name}
                </h3>
            </div>

            {/* Portrait */}
            {!imgError && (
                <div style={{ position: 'relative', width: '100%', height: '200px', flexShrink: 0 }}>
                    <Image
                        src={`/images/dnd-classes/${dndClass.index}.png`}
                        alt={dndClass.name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        onError={() => setImgError(true)}
                    />
                </div>
            )}

            {/* Action buttons */}
            <div 
                className="class-card-buttons"
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

function ClassDetailModal({
    data,
    isSelected,
    onSelect,
    onClose,
}: {
    data: ClassDetail;
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
                        url(/images/dnd-classes/${data.index}.png) center top / cover no-repeat
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
                            <span>Hit Die d{data.hit_die}</span>
                            <span>·</span>
                            <span>{data.saving_throws.map(s => s.name).join(' & ')} saves</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {/* Flavor text */}
                    <p style={{
                        color: 'rgba(244,232,208,0.85)',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        lineHeight: '1.75',
                        borderLeft: '3px solid rgba(212,175,55,0.4)',
                        paddingLeft: '1.25rem',
                        margin: '0 0 2rem',
                    }}>
                        {CLASS_FLAVORS[data.index] ?? `A legendary class with a rich history in Dungeons & Dragons.`}
                    </p>

                    {/* Saving throws */}
                    <Section label="Saving Throws">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {data.saving_throws.map(st => (
                                <span key={st.index} style={{
                                    backgroundColor: 'rgba(180,50,50,0.15)',
                                    border: '1px solid rgba(180,50,50,0.35)',
                                    color: '#fca5a5',
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                }}>
                                    {st.name}
                                </span>
                            ))}
                        </div>
                    </Section>

                    {/* Proficiencies */}
                    {data.proficiencies.length > 0 && (
                        <Section label="Proficiencies">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {data.proficiencies.slice(0, 12).map(p => (
                                    <span key={p.index} style={{
                                        backgroundColor: 'rgba(212,175,55,0.08)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                        color: 'rgba(212,175,55,0.8)',
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.85rem',
                                    }}>
                                        {p.name}
                                    </span>
                                ))}
                                {data.proficiencies.length > 12 && (
                                    <span style={{
                                        color: 'rgba(212,175,55,0.4)',
                                        fontSize: '0.8rem',
                                        padding: '0.3rem 0.5rem',
                                        alignSelf: 'center',
                                    }}>
                                        +{data.proficiencies.length - 12} more
                                    </span>
                                )}
                            </div>
                        </Section>
                    )}

                    {/* Proficiency choices */}
                    {data.proficiency_choices.length > 0 && (
                        <Section label="Skill Choices">
                            {data.proficiency_choices.map((c, i) => (
                                <p key={i} style={{
                                    color: 'rgba(244,232,208,0.7)',
                                    fontStyle: 'italic',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    margin: i === 0 ? 0 : '0.5rem 0 0',
                                }}>
                                    {c.desc}
                                </p>
                            ))}
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

export default function ClassSelectStep({
    classes,
    preselect,
    race,
}: {
    classes: DndClass[];
    preselect?: string;
    race?: string;
}) {
    const router = useRouter();

    // Which class's modal is open
    const [viewingClass, setViewingClass] = useState<string | null>(null);
    const [viewingData, setViewingData]   = useState<ClassDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(preselect ?? null);

    useEffect(() => {
        if (!viewingClass) { setViewingData(null); return; }
        setLoadingDetail(true);
        fetch(`/api/resources/classes?index=${viewingClass}`)
            .then(r => r.json())
            .then((d: { results: ClassDetail[] }) => {
                setViewingData(d.results[0]);
                setLoadingDetail(false);
            })
            .catch(() => setLoadingDetail(false));
    }, [viewingClass]);

    const selectedClassName = classes.find(c => c.index === selectedClass)?.name;

    const handleBack = () => {
        const params = new URLSearchParams({ step: '1' });
        if (race) params.set('preselect', race);
        if (selectedClass) params.set('preselect_class', selectedClass);
        router.push(`/create-character?${params.toString()}`);
    };

    const handleContinue = () => {
        if (!selectedClass) return;
        const params = new URLSearchParams({ step: '3' });
        if (race) params.set('race', race);
        params.set('class', selectedClass);
        router.push(`/create-character?${params.toString()}`);
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Class grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                        gap: '1rem',
                    }} className="class-grid">
                        {classes.map(cls => (
                            <ClassSelectCard
                                key={cls.index}
                                dndClass={cls}
                                isSelected={selectedClass === cls.index}
                                onViewDetails={() => setViewingClass(cls.index)}
                                onSelect={() => setSelectedClass(cls.index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer bar */}
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
                }} className="class-footer">
                    {/* Left: back + selected info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="class-footer-left">
                        <button
                            onClick={handleBack}
                            style={{
                                padding: '0.6rem 1rem',
                                borderRadius: '0.375rem',
                                border: '1px solid rgba(212,175,55,0.25)',
                                backgroundColor: 'transparent',
                                color: 'rgba(212,175,55,0.55)',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            &#8592; Race
                        </button>

                        {selectedClass && (
                            <div>
                                <p style={{
                                    color: 'rgba(212,175,55,0.5)',
                                    fontSize: '0.62rem',
                                    fontWeight: '800',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    margin: '0 0 0.15rem',
                                }}>
                                    Class Selected
                                </p>
                                <p style={{
                                    color: 'var(--color-gold)',
                                    fontWeight: '700',
                                    fontSize: '1.05rem',
                                    margin: 0,
                                }}>
                                    {selectedClassName}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: clear + continue */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="class-footer-buttons">
                        {selectedClass && (
                            <button
                                onClick={() => setSelectedClass(null)}
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
                            disabled={!selectedClass}
                            style={{
                                padding: '0.7rem 1.75rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                backgroundColor: selectedClass ? 'var(--color-gold)' : 'rgba(212,175,55,0.2)',
                                color: selectedClass ? 'var(--color-primary)' : 'rgba(212,175,55,0.3)',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                letterSpacing: '0.04em',
                                cursor: selectedClass ? 'pointer' : 'not-allowed',
                                whiteSpace: 'nowrap',
                                transition: 'background-color 0.2s, color 0.2s',
                            }}
                        >
                            Continue to Background &#8594;
                        </button>
                    </div>
                </div>

                <style jsx>{`
                    @media (max-width: 768px) {
                        .class-grid {
                            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
                            gap: 0.75rem !important;
                        }
                        
                        .class-card-buttons {
                            flex-direction: column !important;
                            padding: 0.75rem 1rem !important;
                        }
                        
                        .class-card-buttons button {
                            width: 100% !important;
                        }
                        
                        .class-footer {
                            flex-direction: column !important;
                            align-items: stretch !important;
                            padding: 0.75rem 1rem !important;
                            gap: 0.75rem !important;
                        }
                        
                        .class-footer-left {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 0.5rem !important;
                        }
                        
                        .class-footer-buttons {
                            width: 100% !important;
                            flex-direction: column !important;
                            gap: 0.5rem !important;
                        }
                        
                        .class-footer-buttons button {
                            width: 100% !important;
                            padding: 0.75rem 1rem !important;
                        }
                    }
                `}</style>
            </div>

            {/* Full-screen modal */}
            {viewingClass && viewingData && !loadingDetail && (
                <ClassDetailModal
                    data={viewingData}
                    isSelected={selectedClass === viewingData.index}
                    onSelect={() => setSelectedClass(viewingData.index)}
                    onClose={() => setViewingClass(null)}
                />
            )}
        </>
    );
}
