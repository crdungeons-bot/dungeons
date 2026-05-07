import Link from 'next/link';
import { ClassDetail } from '@/types';

const CLASS_DESCRIPTIONS: Record<string, string> = {
    barbarian:
        'Primal fury incarnate. Barbarians charge headlong into battle, shrugging off wounds that would fell lesser warriors. Their rage is not mere anger ,  it is a battle-trance that transforms pain into power, turning the tide of any fight through sheer unstoppable force.',
    bard:
        'Masters of magic woven through music and story. Bards inspire allies, mock enemies, and bend the world to their will with words alone. Equally at home in a royal court or a dungeon, they collect secrets and songs the way others collect scars.',
    cleric:
        'Divine warriors and healers who channel the raw power of their god. Clerics walk the line between mortal and divine, smiting enemies with holy power one moment and restoring the fallen the next. Their faith is their weapon, and their weapon is absolute.',
    druid:
        'Guardians of the natural world and wielders of wild magic. Druids can call lightning from a clear sky, walk as a bear through enemy lines, or speak with the trees. Their power is ancient ,  older than kingdoms, older than gods.',
    fighter:
        "The supreme masters of martial combat. Fighters are unmatched in their ability to dish out and absorb punishment. Whether wielding a greatsword with bone-crushing precision or peppering enemies with arrows from afar, a fighter's discipline and training make them a force that never stops coming.",
    monk:
        'Weapons are unnecessary when your body is the deadliest instrument in the room. Monks focus their ki into devastating unarmed strikes, impossible agility, and abilities that defy the laws of nature. They are calm, efficient, and utterly lethal.',
    paladin:
        "The oath-bound champion of justice and divine will. Paladins combine the martial prowess of a fighter with the divine power of a cleric, fuelled by a sacred oath that grants them near-supernatural resilience. Break their code and face the consequences ,  keep it and become something approaching unstoppable.",
    ranger:
        "Hunters and trackers who blend martial skill with primal magic. Rangers are most dangerous in their favoured terrain, using cunning, speed, and a deeply personal bond with nature to outmanoeuvre and outlast any foe. They strike from the shadows before the enemy even knows they're there.",
    rogue:
        'Precision over power. Rogues exploit every weakness, every blind spot, every moment of distraction for a devastating strike that leaves enemies wondering what hit them. They pick locks, pocket secrets, and vanish into shadow ,  and the ones who underestimate them rarely get a second chance.',
    sorcerer:
        'Magic is not something a sorcerer learns. It is something they were born as. Wild, unpredictable, and enormously powerful, sorcerers channel arcane energy that flows through their very bloodline. They bend the rules of magic itself, twisting spells in ways no wizard could predict.',
    warlock:
        "Power granted by a pact with something ancient and incomprehensible. Warlocks have made a deal, and that deal has made them dangerous. Their spells hit harder and recharge faster than any other caster's ,  but the patron is always watching, always waiting, and never gives something for nothing.",
    wizard:
        "The most powerful casters in existence, if they survive long enough to reach their potential. Wizards command the broadest and most devastating catalogue of spells through decades of obsessive study. Intelligence is their armour, foresight their shield, and a well-prepared spell list the most powerful weapon in any world.",
};

export default async function ClassDetailSection({ dndClass }: { dndClass: string }) {
    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${dndClass}`);
    const data: ClassDetail = await response.json();

    const description = CLASS_DESCRIPTIONS[dndClass] ?? `The ${data.name} is a legendary class with a rich history in Dungeons & Dragons. Master their abilities and forge your legend.`;

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
                url(/images/dnd-classes/${dndClass}.png)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%, contain',
            backgroundPosition: 'center, center, center, center top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'var(--color-primary)',
            minHeight: '100vh',
        }}>
            {/* ── HERO TEXT ── */}
            <div style={{ padding: '2.5rem 2.5rem 2rem', maxWidth: '800px' }}>
                <Link href="/dashboard?section=classes" className="back-link" style={{ marginBottom: '1.25rem' }}>
                    &#8592; Back to Classes
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
                    <span>Hit Die d{data.hit_die}</span>
                </div>
                <p style={{
                    color: 'rgba(244,232,208,0.85)',
                    fontSize: '1.05rem',
                    lineHeight: '1.8',
                    maxWidth: '580px',
                    margin: 0,
                    textShadow: '1px 1px 8px rgba(0,0,0,0.9)',
                }}>
                    {description}
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

                <GlassCard title="Saving Throws">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.saving_throws.map((st) => (
                            <span key={st.index} style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                padding: '0.3rem 0.875rem',
                                borderRadius: '9999px',
                                fontWeight: '600',
                                fontSize: '0.875rem',
                            }}>
                                {st.name}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard title="Proficiencies">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.proficiencies.map((prof) => (
                            <span key={prof.index} style={{
                                backgroundColor: 'rgba(212,175,55,0.07)',
                                border: '1px solid rgba(212,175,55,0.35)',
                                color: 'var(--color-gold)',
                                padding: '0.3rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                            }}>
                                {prof.name}
                            </span>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard title="Starting Equipment">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.starting_equipment.map((item) => (
                            <div key={item.equipment.index} style={{
                                backgroundColor: 'rgba(212,175,55,0.05)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                borderRadius: '0.375rem',
                                padding: '0.4rem 0.875rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}>
                                <span style={{ color: 'var(--color-parchment)', fontSize: '0.875rem' }}>
                                    {item.equipment.name}
                                </span>
                                <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: '700' }}>
                                    ×{item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {data.proficiency_choices.length > 0 && (
                    <GlassCard title="Proficiency Choices">
                        {data.proficiency_choices.map((choice, index) => (
                            <p key={index} style={{
                                color: 'rgba(244,232,208,0.6)',
                                fontStyle: 'italic',
                                fontSize: '0.9rem',
                                lineHeight: '1.7',
                                marginBottom: '0.375rem',
                            }}>
                                {choice.desc}
                            </p>
                        ))}
                    </GlassCard>
                )}
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
                        Hit Die d{data.hit_die} &nbsp;·&nbsp; {data.saving_throws.map(s => s.name).join(', ')} saves
                    </p>
                </div>
                <Link
                    href={`/create-character?preselect_class=${dndClass}`}
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
