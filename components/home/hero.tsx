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
            // Show content after white fades and logo moves
            const contentTimer = setTimeout(() => {
                setShowContent(true);
            }, 2200);

            // Mark animation as complete
            const completeTimer = setTimeout(() => {
                setAnimationComplete(true);
                sessionStorage.setItem('logoAnimationShown', 'true');
            }, 2500);

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

            {/* White screen overlay during animation */}
            {!animationComplete && (
                <div 
                    className="white-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'white',
                        zIndex: 9998,
                        pointerEvents: 'none'
                    }}
                />
            )}

            {/* Logo appears in center then moves to nav - only shows on first visit */}
            {!animationComplete && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    <img 
                        src="/dnd-guru-logo-transparent.png"
                        alt="Tabletop Guru Logo"
                        className="logo-shrink-move"
                        style={{ 
                            width: 'clamp(200px, 40vw, 350px)',
                            height: 'auto',
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
                            display: 'block'
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
                @keyframes whiteFade {
                    0% {
                        opacity: 1;
                    }
                    40% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                @keyframes logoFadeInShrinkMove {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    20% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    40% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50vw + 3rem), calc(-50vh + 2rem)) scale(0.11);
                        opacity: 0;
                    }
                }

                .white-overlay {
                    animation: whiteFade 2.5s ease-out forwards;
                }

                .logo-shrink-move {
                    animation: logoFadeInShrinkMove 2.5s ease-in-out forwards;
                }

                @media (max-width: 768px) {
                    @keyframes logoFadeInShrinkMove {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 0;
                        }
                        20% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        40% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(-50vw + 2rem), calc(-50vh + 1.5rem)) scale(0.13);
                            opacity: 0;
                        }
                    }
                }
            `}</style>
        </section>
    );
}
