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
            padding: '8rem 0',
            borderBottom: '4px solid var(--color-gold)'
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
            <div className="max-w-6xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
                <h1 style={{ 
                    fontSize: '3.75rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: 'var(--color-gold)',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)'
                }}>
                    Your D&D Adventure Starts Here
                </h1>
                <p style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '2rem', 
                    color: 'var(--color-parchment)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.9)'
                }}>
                    Build your character, master your class, and forge a legend worth telling.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/register" className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                        Begin Your Journey
                    </Link>
                    <Link href="/ashfall-concord" className="btn-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                        Explore the World
                    </Link>
                </div>
            </div>
        </section>
    );
}
