import Link from 'next/link';
import Image from 'next/image';

const kingdoms = [
    {
        name: 'High Aurel',
        subtitle: 'The Breadbasket of Calthera',
        description: 'A vast kingdom of rolling farmlands and prosperous trade routes, High Aurel sits at the heart of Calthera. Once the dominant power of the continent, its influence has begun to fracture as old alliances crumble.',
        color: 'var(--color-gold)',
    },
    {
        name: 'Eldwyn',
        subtitle: 'The Ancient Forest Kingdom',
        description: 'Stretching across the northern reaches, Eldwyn is a primordial land of towering trees and ancient magic. Whispers from the deep woods speak of something stirring.',
        color: '#4a7c59',
    },
    {
        name: 'Nyssara',
        subtitle: 'The Jewel of the Eastern Sea',
        description: 'A seafaring nation of merchants, scholars, and spies. Behind its gleaming facade of wealth, Nyssara\'s ruling council plays a dangerous game.',
        color: '#4a90a4',
    },
    {
        name: 'Skarhold',
        subtitle: 'The Smoldering Wastes',
        description: 'A harsh land of volcanic rock and iron-willed survivors. Driven underground by the Ashfall two centuries ago. They have not forgotten who left them to burn.',
        color: 'var(--color-accent)',
    },
];

export default function LoreSection() {
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                }}>
                    Lore Book
                </p>
                <h1 style={{ color: 'var(--color-gold)', margin: 0 }}>
                    The Ashfall Concord
                </h1>
                <p style={{
                    color: 'rgba(244, 232, 208, 0.5)',
                    marginTop: '0.5rem',
                    fontStyle: 'italic'
                }}>
                    Two hundred years have passed since the Ashfall scorched the southern reaches of Calthera.
                </p>
            </div>

            {/* Map */}
            <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                marginBottom: '2rem',
            }}>
                <Image
                    src="/images/maps/world-map.png"
                    alt="Map of Calthera"
                    width={1920}
                    height={1080}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </div>

            {/* Kingdoms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {kingdoms.map((kingdom) => (
                    <div
                        key={kingdom.name}
                        style={{
                            backgroundColor: 'var(--color-primary-light)',
                            border: '1px solid rgba(212, 175, 55, 0.15)',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: '4px 1fr',
                        }}
                    >
                        <div style={{ backgroundColor: kingdom.color }} />
                        <div style={{ padding: '1.25rem' }}>
                            <h3 style={{ color: 'var(--color-parchment)', margin: '0 0 0.25rem' }}>
                                {kingdom.name}
                            </h3>
                            <p style={{ color: kingdom.color, fontSize: '0.8rem', fontStyle: 'italic', margin: '0 0 0.5rem' }}>
                                {kingdom.subtitle}
                            </p>
                            <p style={{ color: 'rgba(244, 232, 208, 0.6)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
                                {kingdom.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <Link href="/ashfall-concord" style={{
                    color: 'var(--color-gold)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    Read the full lore page &#8594;
                </Link>
            </div>
        </div>
    );
}
