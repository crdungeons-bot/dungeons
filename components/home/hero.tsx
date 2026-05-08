'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Check if animation has already been shown in this session
        const hasSeenAnimation = sessionStorage.getItem('logoAnimationShown');
        if (hasSeenAnimation) {
            setAnimationComplete(true);
            setShowContent(true);
        } else {
            // Show content after logo pauses in center (1.5s for fly in + 2.5s pause = 4s)
            const contentTimer = setTimeout(() => {
                setShowContent(true);
            }, 4000);

            // Mark animation as complete after it flies to nav (4s + 1s transition = 5s)
            const completeTimer = setTimeout(() => {
                setAnimationComplete(true);
                sessionStorage.setItem('logoAnimationShown', 'true');
            }, 5000);

            return () => {
                clearTimeout(contentTimer);
                clearTimeout(completeTimer);
            };
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

            {/* Flying Logo Animation - only shows on first visit */}
            {!animationComplete && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    <img 
                        src="/dnd-guru-logo-transparent.png" 
                        alt="DND Guru Logo" 
                        className="logo-flying"
                        style={{ 
                            width: 'clamp(200px, 40vw, 350px)',
                            height: 'auto',
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))'
                        }}
                    />
                </div>
            )}

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
                    lineHeight: '1.2',
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 0.8s ease-out'
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
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 0.8s ease-out 0.2s'
                }}>
                    Build your character, master your class, and forge a legend worth telling.
                </p>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '0 1rem',
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 0.8s ease-out 0.4s'
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
                        transform: translate(-150vw, 0) scale(0.8);
                        opacity: 0;
                    }
                    30% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    80% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50vw + 3rem), calc(-50vh + 2rem)) scale(0.12);
                        opacity: 0;
                    }
                }

                .logo-flying {
                    animation: logoFlyIn 5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                @media (max-width: 768px) {
                    @keyframes logoFlyIn {
                        0% {
                            transform: translate(-150vw, 0) scale(0.6);
                            opacity: 0;
                        }
                        30% {
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 1;
                        }
                        80% {
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(-50vw + 2rem), calc(-50vh + 1.5rem)) scale(0.15);
                            opacity: 0;
                        }
                    }
                }
            `}</style>
        </section>
    );
}
