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

const CLASS_DESCRIPTIONS: Record<string, string> = {
    barbarian: 'Primal fury incarnate,   nearly impossible to kill and devastating up close.',
    bard:      'Magic through music and wit, inspiring allies and turning battles with words alone.',
    cleric:    'Divine power channeled through faith,   healer, warrior, and vessel of the gods.',
    druid:     'Shape-shifter and nature\'s champion, wielding elemental forces and wild magic.',
    fighter:   'Disciplined, versatile, and devastating,   the purest expression of martial mastery.',
    monk:      'Ki-powered unarmed combatant,   fluid, precise, and blindingly fast.',
    paladin:   'Holy warrior bound by a sacred oath, fusing heavy armour with divine magic.',
    ranger:    'Hunter and tracker who thrives in the wild, pairing archery with nature magic.',
    rogue:     'Precision striker who exploits every opening for one perfectly calculated blow.',
    sorcerer:  'Raw arcane power from within,   innate, wild, and impossible to suppress.',
    warlock:   'Pact-bound caster trading service to a dark patron for eldritch, rechargeable power.',
    wizard:    'The broadest spell arsenal in existence, earned through decades of obsessive study.',
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
    isViewing,
    onViewDetails,
    onSelect,
}: {
    dndClass: DndClass;
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

            <div style={{
                padding: '0.625rem 1rem',
                backgroundColor: 'var(--color-primary-dark)',
                borderBottom: '1px solid rgba(212,175,55,0.15)',
            }}>
                <h3 style={{ color: 'var(--color-gold)', margin: 0, fontSize: '1.05rem' }}>
                    {dndClass.name}
                </h3>
            </div>

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
                    {CLASS_DESCRIPTIONS[dndClass.index] ?? 'A legendary class with a storied history.'}
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

function ClassDetailPanel({
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Image header */}
            <div style={{
                height: '240px',
                flexShrink: 0,
                position: 'relative',
                background: `
                    linear-gradient(to bottom, rgba(10,5,2,0.25) 0%, rgba(10,5,2,0.75) 100%),
                    url(/images/dnd-classes/${data.index}.png) center top / cover no-repeat
                `,
                backgroundColor: 'var(--color-primary)',
            }}>
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
                        <span>Hit Die d{data.hit_die}</span>
                        <span>·</span>
                        <span>{data.saving_throws.map(s => s.name).join(' & ')} saves</span>
                    </div>
                </div>
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.25rem 0' }}>
                {/* Flavor text */}
                <p style={{
                    color: 'rgba(244,232,208,0.8)',
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    lineHeight: '1.75',
                    borderLeft: '2px solid rgba(212,175,55,0.3)',
                    paddingLeft: '0.875rem',
                    margin: '0 0 1.25rem',
                }}>
                    {CLASS_FLAVORS[data.index] ?? CLASS_DESCRIPTIONS[data.index] ?? `A legendary class with a rich history in Dungeons & Dragons.`}
                </p>

                {/* Saving throws */}
                <Section label="Saving Throws">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {data.saving_throws.map(st => (
                            <span key={st.index} style={{
                                backgroundColor: 'rgba(180,50,50,0.15)',
                                border: '1px solid rgba(180,50,50,0.35)',
                                color: '#fca5a5',
                                padding: '0.25rem 0.7rem',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                            }}>
                                {st.name}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Proficiencies,   first 8 to keep the panel tight */}
                {data.proficiencies.length > 0 && (
                    <Section label="Proficiencies">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {data.proficiencies.slice(0, 8).map(p => (
                                <span key={p.index} style={{
                                    backgroundColor: 'rgba(212,175,55,0.08)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    color: 'rgba(212,175,55,0.8)',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.775rem',
                                }}>
                                    {p.name}
                                </span>
                            ))}
                            {data.proficiencies.length > 8 && (
                                <span style={{
                                    color: 'rgba(212,175,55,0.35)',
                                    fontSize: '0.75rem',
                                    padding: '0.2rem 0.4rem',
                                    alignSelf: 'center',
                                }}>
                                    +{data.proficiencies.length - 8} more
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
                                color: 'rgba(244,232,208,0.65)',
                                fontStyle: 'italic',
                                fontSize: '0.825rem',
                                lineHeight: '1.6',
                                margin: i === 0 ? 0 : '0.375rem 0 0',
                            }}>
                                {c.desc}
                            </p>
                        ))}
                    </Section>
                )}
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

function PanelSkeleton() {
    return (
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[240, 60, 80, 100, 80].map((h, i) => (
                <div key={i} style={{
                    height: `${h}px`,
                    borderRadius: '0.375rem',
                    backgroundColor: 'rgba(212,175,55,0.06)',
                }} />
            ))}
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

    const [viewingClass, setViewingClass] = useState<string | null>(preselect ?? null);
    const [viewingData, setViewingData]   = useState<ClassDetail | null>(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(preselect ?? null);

    useEffect(() => {
        if (!viewingClass) { setViewingData(null); return; }
        setLoadingDetail(true);
        fetch(`https://www.dnd5eapi.co/api/classes/${viewingClass}`)
            .then(r => r.json())
            .then((d: ClassDetail) => { setViewingData(d); setLoadingDetail(false); })
            .catch(() => setLoadingDetail(false));
    }, [viewingClass]);

    const togglePanel = (index: string) =>
        setViewingClass(prev => (prev === index ? null : index));

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

    const panelOpen = viewingClass !== null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Grid + panel row */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                {/* Class grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: panelOpen
                            ? 'repeat(auto-fill, minmax(170px, 1fr))'
                            : 'repeat(auto-fill, minmax(210px, 1fr))',
                        gap: '1rem',
                    }}>
                        {classes.map(cls => (
                            <ClassSelectCard
                                key={cls.index}
                                dndClass={cls}
                                isSelected={selectedClass === cls.index}
                                isViewing={viewingClass === cls.index}
                                onViewDetails={() => togglePanel(cls.index)}
                                onSelect={() => {
                                    setSelectedClass(cls.index);
                                    if (viewingClass !== cls.index) setViewingClass(cls.index);
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
                                <ClassDetailPanel
                                    data={viewingData}
                                    isSelected={selectedClass === viewingData.index}
                                    onSelect={() => setSelectedClass(viewingData.index)}
                                    onClose={() => setViewingClass(null)}
                                />
                            )
                        }
                    </div>
                )}
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
            }}>
                {/* Left: back + selected info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
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
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
        </div>
    );
}
