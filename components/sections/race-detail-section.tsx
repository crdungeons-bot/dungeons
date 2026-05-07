import Link from 'next/link';
import { RaceDetail } from '@/types';
import TraitHoverBadge from '@/components/ui/trait-hover-badge';

type TraitDetail = { index: string; name: string; desc: string[] };

export default async function RaceDetailSection({ race }: { race: string }) {
    const response = await fetch(`https://www.dnd5eapi.co/api/races/${race}`);
    const data: RaceDetail = await response.json();

    // Fetch descriptions for every trait in parallel
    const traitDetails: TraitDetail[] = await Promise.all(
        data.traits.map((t) =>
            fetch(`https://www.dnd5eapi.co/api/traits/${t.index}`).then((r) => r.json())
        )
    );
    const traitMap = new Map(traitDetails.map((t) => [t.index, t]));

    return (
        <div style={{
            // 4 gradient layers stacked in front of the image:
            // Layer 1: left fade    ,  wide (0–42%) so it fully covers the image edge
            // Layer 2: right fade   ,  same, mirrored
            // Layer 3: dark overlay ,  keeps text readable, heavier at top/bottom
            // Layer 4 (back): image ,  'contain' = full body, no cropping
            background: `
                linear-gradient(to right,  var(--color-primary) 0%, rgba(10,5,2,0) 42%),
                linear-gradient(to left,   var(--color-primary) 0%, rgba(10,5,2,0) 42%),
                linear-gradient(to bottom, rgba(10,5,2,0.55) 0%, rgba(10,5,2,0.20) 30%, rgba(10,5,2,0.55) 75%, rgba(10,5,2,0.92) 100%),
                url(/images/races/${race}.png)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, contain',
            backgroundPosition: 'center, center, center, center top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'var(--color-primary)',
            minHeight: '100vh',
        }}>
            {/* ── HERO TEXT ── */}
            <div style={{ padding: '2.5rem 2.5rem 2rem', maxWidth: '800px' }}>
                <Link href="/dashboard?section=races" className="back-link" style={{ marginBottom: '1.25rem' }}>
                    &#8592; Back to Races
                </Link>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    color: 'var(--color-gold)',
                    textShadow: '2px 2px 16px rgba(0,0,0,0.9)',
                    margin: '0 0 0.75rem',
                    lineHeight: 1.1,
                }}>
                    {data.name}
                </h1>
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '1.25rem',
                    color: 'rgba(244,232,208,0.6)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                }}>
                    <span>Speed {data.speed} ft</span>
                    <span style={{ color: 'rgba(212,175,55,0.4)' }}>|</span>
                    <span>Size {data.size}</span>
                </div>
                <p style={{
                    color: 'rgba(244,232,208,0.85)',
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                    maxWidth: '580px',
                    margin: 0,
                    textShadow: '1px 1px 8px rgba(0,0,0,0.9)',
                }}>
                    {data.alignment}
                </p>
            </div>

            {/* Gold divider */}
            <div style={{
                margin: '0 2.5rem 2rem',
                height: '1px',
                background: 'linear-gradient(to right, var(--color-gold), rgba(212,175,55,0.1))',
            }} />

            {/* ── DETAIL CARDS ── */}
            <div style={{ padding: '0 2.5rem 3rem', maxWidth: '620px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <GlassCard title="Ability Score Bonuses">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.ability_bonuses.map((bonus) => (
                            <div key={bonus.ability_score.index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: 'rgba(212,175,55,0.06)',
                                padding: '0.6rem 1rem',
                                borderRadius: '0.375rem',
                                border: '1px solid rgba(212,175,55,0.12)',
                            }}>
                                <span style={{ color: 'var(--color-parchment)', fontWeight: '500' }}>
                                    {bonus.ability_score.name}
                                </span>
                                <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '1.25rem' }}>
                                    +{bonus.bonus}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                    <GlassCard title="Racial Traits">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                            {data.traits.map((trait) => (
                                <TraitHoverBadge
                                    key={trait.index}
                                    name={trait.name}
                                    desc={traitMap.get(trait.index)?.desc ?? []}
                                    variant="dark"
                                />
                            ))}
                        </div>
                    </GlassCard>

                <GlassCard title="Languages">
                    <p style={{
                        color: 'rgba(244,232,208,0.5)',
                        fontStyle: 'italic',
                        fontSize: '0.875rem',
                        marginBottom: '0.75rem',
                        lineHeight: '1.7',
                    }}>
                        {data.language_desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.languages.map((language) => (
                            <span key={language.index} style={{
                                backgroundColor: 'rgba(74,124,89,0.2)',
                                border: '1px solid rgba(74,124,89,0.4)',
                                color: '#86efac',
                                padding: '0.2rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                            }}>
                                {language.name}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <GlassCard title="Lifespan">
                        <p style={{ color: 'rgba(244,232,208,0.7)', lineHeight: '1.75', fontSize: '0.9rem', margin: 0 }}>
                            {data.age}
                        </p>
                    </GlassCard>
                    <GlassCard title="Size & Build">
                        <p style={{ color: 'rgba(244,232,208,0.7)', lineHeight: '1.75', fontSize: '0.9rem', margin: 0 }}>
                            {data.size_description}
                        </p>
                    </GlassCard>
                </div>
            </div>

            {/* Sticky bar ,  sticks to the bottom of <main> as the user scrolls */}
            <div style={{
                position: 'sticky',
                bottom: 0,
                backgroundColor: 'rgba(10,5,2,0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(212,175,55,0.25)',
                padding: '1rem 2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
            }}>
                <div>
                    <p style={{ color: 'var(--color-gold)', fontWeight: '700', margin: '0 0 0.1rem', fontSize: '0.95rem' }}>
                        {data.name}
                    </p>
                    <p style={{ color: 'rgba(244,232,208,0.4)', fontSize: '0.78rem', margin: 0 }}>
                        Speed {data.speed} ft &nbsp;·&nbsp; {data.size} size &nbsp;·&nbsp; {data.traits.length} racial traits
                    </p>
                </div>
                <Link
                    href={`/create-character?preselect=${race}`}
                    style={{
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        padding: '0.75rem 1.75rem',
                        borderRadius: '0.375rem',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        display: 'inline-block',
                        transition: 'opacity 0.15s',
                    }}
                >
                    Create a {data.name} &#8594;
                </Link>
            </div>
        </div>
    );
}

function GlassCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{
            backgroundColor: 'rgba(10,5,2,0.62)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(212,175,55,0.18)',
            borderRadius: '0.5rem',
            padding: '1.25rem 1.5rem',
        }}>
            <h2 style={{
                color: 'var(--color-gold)',
                fontSize: '0.8rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.875rem',
            }}>
                {title}
            </h2>
            {children}
        </div>
    );
}
