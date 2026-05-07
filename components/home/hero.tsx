import Link from 'next/link';

export default function Hero() {
    return (
        <section style={{
            position: 'relative',
            backgroundImage: 'url(/images/home/hero-background-dragon-showdown.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'var(--color-parchment)',
            padding: 'clamp(4rem, 10vw, 8rem) 0',
            borderBottom: '4px solid var(--color-gold)',
            minHeight: 'clamp(400px, 70vh, 600px)'
        }}>
            {/* Dark overlay so text is readable over the image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }} />

            {/* Content sits on top of the overlay */}
            <div style={{ 
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1.5rem',
                textAlign: 'center',
                position: 'relative', 
                zIndex: 1 
            }}>
                <h1 style={{ 
                    fontSize: 'clamp(2rem, 7vw, 3.75rem)',
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: 'var(--color-gold)',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                    lineHeight: '1.2'
                }}>
                    Your D&D Adventure Starts Here
                </h1>
                <p style={{ 
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    marginBottom: '2rem', 
                    color: 'var(--color-parchment)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.9)',
                    maxWidth: '700px',
                    margin: '0 auto 2rem'
                }}>
                    Build your character, master your class, and forge a legend worth telling.
                </p>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '0 1rem'
                }}>
                    <Link 
                        href="/register" 
                        className="btn-primary" 
                        style={{ 
                            fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Begin Your Journey
                    </Link>
                    <Link 
                        href="/ashfall-concord" 
                        className="btn-secondary" 
                        style={{ 
                            fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)',
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Explore the World
                    </Link>
                </div>
            </div>
        </section>
    );
}
