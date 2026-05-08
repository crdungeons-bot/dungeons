'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Check if animation has already been shown in this session
        const hasSeenAnimation = sessionStorage.getItem('logoAnimationShown');
        if (hasSeenAnimation) {
            setAnimationComplete(true);
        } else {
            // Mark animation as shown after it completes
            const timer = setTimeout(() => {
                setAnimationComplete(true);
                sessionStorage.setItem('logoAnimationShown', 'true');
            }, 3500); // Total animation duration

            return () => clearTimeout(timer);
        }
    }, []);

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
                {/* Logo */}
                <div style={{ marginBottom: '2rem' }}>
                    <img 
                        src="/dnd-guru-logo-transparent.png" 
                        alt="DND Guru Logo" 
                        className={animationComplete ? 'logo-static' : 'logo-animated'}
                        style={{ 
                            width: 'clamp(200px, 40vw, 350px)',
                            height: 'auto',
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))'
                        }}
                    />
                </div>
                
                <h1 style={{ 
                    fontSize: 'clamp(2rem, 7vw, 3.75rem)',
                    fontWeight: 'bold', 
                    marginBottom: '1.5rem',
                    color: 'var(--color-gold)',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.9)',
                    lineHeight: '1.2',
                    opacity: animationComplete ? 1 : 0,
                    animation: animationComplete ? 'none' : 'fadeInContent 0.8s ease-out 2s forwards'
                }}>
                    Your D&D Adventure Starts Here
                </h1>
                <p style={{ 
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    marginBottom: '2rem', 
                    color: 'var(--color-parchment)',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.9)',
                    maxWidth: '700px',
                    margin: '0 auto 2rem',
                    opacity: animationComplete ? 1 : 0,
                    animation: animationComplete ? 'none' : 'fadeInContent 0.8s ease-out 2.3s forwards'
                }}>
                    Build your character, master your class, and forge a legend worth telling.
                </p>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '0 1rem',
                    opacity: animationComplete ? 1 : 0,
                    animation: animationComplete ? 'none' : 'fadeInContent 0.8s ease-out 2.6s forwards'
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

            <style jsx>{`
                @keyframes logoFlyIn {
                    0% {
                        transform: translate(-100vw, 50vh) scale(0.5);
                        opacity: 0;
                    }
                    40% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    60% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(50vw - 50%), calc(-50vh - 2rem)) scale(0.15);
                        opacity: 0;
                    }
                }

                @keyframes fadeInContent {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .logo-animated {
                    animation: logoFlyIn 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                .logo-static {
                    animation: none;
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    @keyframes logoFlyIn {
                        0% {
                            transform: translate(-100vw, 30vh) scale(0.4);
                            opacity: 0;
                        }
                        40% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        60% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(50vw - 50%), calc(-40vh - 1rem)) scale(0.2);
                            opacity: 0;
                        }
                    }
                }
            `}</style>
        </section>
    );
}
