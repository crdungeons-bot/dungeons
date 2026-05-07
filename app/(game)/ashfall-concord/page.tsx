import { Navigation } from '@/components';
import Image from 'next/image';

const kingdoms = [
    {
        name: 'High Aurel',
        subtitle: 'The Breadbasket of Calthera',
        description: 'A vast kingdom of rolling farmlands and prosperous trade routes, High Aurel sits at the heart of Calthera. Its capital city hums with commerce and political intrigue. Once the dominant power of the continent, its influence has begun to fracture as old alliances crumble under the weight of broken promises and rising tensions.',
        traits: ['Agricultural Powerhouse', 'Political Center', 'Trade Hub'],
        color: 'var(--color-gold)',
    },
    {
        name: 'Eldwyn',
        subtitle: 'The Ancient Forest Kingdom',
        description: 'Stretching across the northern reaches, Eldwyn is a primordial land of towering trees, hidden groves, and ancient magic. Its people are fierce guardians of the natural world, slow to trust outsiders but unbreakable in loyalty to those who earn it. Whispers from the deep woods speak of something stirring,  something that has not walked the land in a thousand years.',
        traits: ['Ancient Magic', 'Druidic Culture', 'Isolationist'],
        color: '#4a7c59',
    },
    {
        name: 'Nyssara',
        subtitle: 'The Jewel of the Eastern Sea',
        description: 'A seafaring nation of merchants, scholars, and spies, Nyssara controls the eastern coastline and dominates maritime trade. Its port cities are cosmopolitan and lawless in equal measure. Behind its gleaming facade of wealth, Nyssara\'s ruling council plays a dangerous game,  financing both sides of every conflict to ensure no single power grows strong enough to threaten their monopoly.',
        traits: ['Maritime Empire', 'Mercantile Society', 'Intelligence Network'],
        color: '#4a90a4',
    },
    {
        name: 'Skarhold',
        subtitle: 'The Smoldering Wastes',
        description: 'A harsh and unforgiving land of volcanic rock, red dunes, and iron-willed survivors, Skarhold is the kingdom the rest of Calthera hopes to forget. Its people were driven underground by the Ashfall,  a catastrophic eruption two centuries ago that scarred the southern lands beyond recognition. They have not forgotten who left them to burn. And they are ready to collect.',
        traits: ['Volcanic Wasteland', 'Survivor Culture', 'Deep Grudge'],
        color: 'var(--color-accent)',
    },
];

export default function AshfallConcord() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary)' }}>
            <Navigation />

            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(180deg, rgba(139,21,56,0.3) 0%, var(--color-primary) 100%)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                padding: '4rem 1.5rem',
                textAlign: 'center',
            }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontWeight: '700',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    marginBottom: '1rem'
                }}>
                    A Campaign World
                </p>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    color: 'var(--color-gold)',
                    marginBottom: '1.5rem',
                    textShadow: '0 2px 20px rgba(212,175,55,0.3)'
                }}>
                    The Ashfall Concord
                </h1>
                <p style={{
                    color: 'rgba(244, 232, 208, 0.7)',
                    fontSize: '1.2rem',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.8'
                }}>
                    Two hundred years have passed since the Ashfall scorched the southern reaches of Calthera. 
                    The Concord, a fragile peace treaty between the four kingdoms, is unraveling. 
                    Old wounds have not healed. They have only hardened.
                </p>
            </div>

            {/* World Map Section */}
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '4rem 1.5rem',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                        The World of Calthera
                    </h2>
                    <p style={{ color: 'rgba(244, 232, 208, 0.5)', fontSize: '0.9rem' }}>
                        Four kingdoms. One broken agreement. Countless stories.
                    </p>
                </div>

                {/* Map */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    border: '2px solid rgba(212, 175, 55, 0.4)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}>
                    <Image
                        src="/images/maps/world-map.png"
                        alt="Map of Calthera"
                        width={1920}
                        height={1080}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        priority
                    />
                </div>
            </div>

            {/* Kingdoms Section */}
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 1.5rem 6rem',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                        The Four Kingdoms
                    </h2>
                    <p style={{ color: 'rgba(244, 232, 208, 0.5)', fontSize: '0.9rem' }}>
                        Each with their own agenda. None fully trustworthy.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {kingdoms.map((kingdom, index) => (
                        <div
                            key={kingdom.name}
                            style={{
                                backgroundColor: 'var(--color-primary-light)',
                                border: '1px solid rgba(212, 175, 55, 0.2)',
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                                display: 'grid',
                                gridTemplateColumns: '4px 1fr',
                            }}
                        >
                            {/* Colored accent bar */}
                            <div style={{ backgroundColor: kingdom.color }} />

                            <div style={{ padding: '2rem' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    gap: '1rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div>
                                        <p style={{
                                            color: kingdom.color,
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            marginBottom: '0.25rem'
                                        }}>
                                            Kingdom {index + 1}
                                        </p>
                                        <h3 style={{ 
                                            color: 'var(--color-parchment)', 
                                            fontSize: '1.75rem',
                                            fontWeight: '700',
                                            margin: 0
                                        }}>
                                            {kingdom.name}
                                        </h3>
                                        <p style={{ 
                                            color: 'rgba(244, 232, 208, 0.5)', 
                                            fontStyle: 'italic',
                                            marginTop: '0.25rem',
                                            fontSize: '0.95rem'
                                        }}>
                                            {kingdom.subtitle}
                                        </p>
                                    </div>

                                    {/* Trait badges */}
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {kingdom.traits.map((trait) => (
                                            <span key={trait} style={{
                                                backgroundColor: 'rgba(0,0,0,0.3)',
                                                border: `1px solid ${kingdom.color}`,
                                                color: kingdom.color,
                                                padding: '0.2rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                            }}>
                                                {trait}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p style={{ 
                                    color: 'rgba(244, 232, 208, 0.7)', 
                                    lineHeight: '1.8',
                                    fontSize: '1rem',
                                    margin: 0
                                }}>
                                    {kingdom.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lore Footer */}
                <div style={{
                    marginTop: '4rem',
                    padding: '2rem',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(139, 21, 56, 0.08)'
                }}>
                    <p style={{
                        color: 'var(--color-gold-dark)',
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: '1.8'
                    }}>
                        "The Concord was never a peace. It was a ceasefire. 
                        And ceasefires always end."
                    </p>
                    <p style={{ 
                        color: 'rgba(244, 232, 208, 0.3)', 
                        fontSize: '0.8rem',
                        marginTop: '0.75rem'
                    }}>
                        - Recovered inscription, The Broken Oath Oasis
                    </p>
                </div>
            </div>
        </div>
    );
}
