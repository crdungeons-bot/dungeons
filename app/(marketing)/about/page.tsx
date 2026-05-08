import { Navigation } from "@/components";

export default function About() {
    return (
        <div style={{ 
            minHeight: '100vh',
            backgroundColor: 'var(--color-primary)'
        }}>
            <Navigation />
            
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '3rem 1.5rem'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                    color: 'var(--color-gold)',
                    marginBottom: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    About DND Guru
                </h1>

                <div style={{
                    backgroundColor: 'var(--color-secondary)',
                    border: '2px solid var(--color-gold)',
                    borderRadius: '8px',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    color: 'var(--color-parchment)',
                    lineHeight: '1.8',
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--color-gold)',
                        marginBottom: '1.5rem'
                    }}>
                        What is DND Guru?
                    </h2>
                    
                    <p style={{ marginBottom: '1.5rem' }}>
                        DND Guru is a free toolset designed to help Dungeon Masters and players bring their campaigns to life. 
                        Whether you are rolling your first character or managing an epic adventure, this site provides everything 
                        you need to dive into the world of Ashfall Concord and beyond.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                        The world has been created. The lore is written. The stage is set. Now it is your turn to build your story 
                        within it. Create memorable characters, track your progress, manage your party, and explore the rich tapestry 
                        of races, classes, and abilities that make every adventure unique.
                    </p>

                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--color-gold)',
                        marginBottom: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        Why is it Free?
                    </h2>

                    <p style={{ marginBottom: '1.5rem' }}>
                        This project started as a passion project, a way to combine a love for D&D with the joy of building something 
                        useful. There are no subscriptions, no hidden fees, and no paywalls. Just a set of tools to make your tabletop 
                        experience smoother and more enjoyable.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                        DND Guru is built for the community, by someone who understands the thrill of rolling dice and the satisfaction 
                        of a well-planned campaign. It is here to support your adventures, not to profit from them.
                    </p>

                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--color-gold)',
                        marginBottom: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        Features
                    </h2>

                    <ul style={{ 
                        marginBottom: '1.5rem',
                        paddingLeft: '1.5rem'
                    }}>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>Character Creation:</strong> Build detailed characters 
                            with races, classes, backgrounds, and abilities
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>Party Management:</strong> Create and manage adventuring 
                            parties with your friends
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>Dice Roller:</strong> Roll any dice you need right in 
                            your browser
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>World Lore:</strong> Explore the rich history and 
                            geography of Ashfall Concord
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <strong style={{ color: 'var(--color-gold)' }}>Resource Library:</strong> Browse spells, items, and 
                            abilities to enhance your gameplay
                        </li>
                    </ul>

                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--color-gold)',
                        marginBottom: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        Get Started
                    </h2>

                    <p style={{ marginBottom: '1.5rem' }}>
                        Ready to begin your adventure? Create an account, build your first character, and step into a world where 
                        your choices shape the story. The realm of Ashfall Concord awaits.
                    </p>

                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center'
                    }}>
                        <a 
                            href="/register" 
                            className="btn-primary"
                            style={{
                                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)'
                            }}
                        >
                            Create Your Character
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}