'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(()=> {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const storedFirstName = localStorage.getItem('firstName');

        if (loggedIn === 'true' && storedFirstName) {
            setIsLoggedIn(true);
            setFirstName(storedFirstName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setFirstName('');
        window.location.href = '/';
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav style={{ 
            backgroundColor: 'var(--color-primary)', 
            borderBottom: '2px solid var(--color-gold)',
            padding: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            position: 'relative'
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                maxWidth: '1280px', 
                margin: '0 auto',
                padding: '0 1rem'
            }}>
                {/* Logo / Brand */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img 
                        src="/dnd-guru-logo.svg" 
                        alt="DND Guru Logo" 
                        style={{ 
                            height: '40px',
                            width: 'auto',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div style={{ 
                    display: 'flex', 
                    gap: '1.5rem', 
                    alignItems: 'center',
                }} className="desktop-nav">
                    <Link 
                        href="/" 
                        style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about"
                        style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    >
                        About
                    </Link>
                    <Link 
                        href="/races"
                        style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    >
                        Races
                    </Link>
                    <Link 
                        href="/classes"
                        style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    >
                        Classes
                    </Link>
                    {isLoggedIn ? (
                        <Link
                            href="/dashboard"
                            style={{
                                color: 'var(--color-gold)',
                                fontWeight: '700',
                                transition: 'all 0.3s',
                                letterSpacing: '0.03em',
                                border: '1px solid rgba(212,175,55,0.4)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--color-primary)';
                                e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--color-gold)';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/ashfall-concord"
                            style={{
                                color: 'var(--color-accent-light)',
                                fontWeight: '700',
                                transition: 'color 0.3s',
                                letterSpacing: '0.03em'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
                        >
                            Ashfall Concord
                        </Link>
                    )}
                </div>

                {/* Desktop Auth Links */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} className="desktop-nav">
                    {isLoggedIn ? (
                        <>
                            <span style={{ color: 'var(--color-parchment)', fontWeight: '500', fontSize: '0.9rem' }}>
                                {firstName}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn-accent"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                Logout
                            </button>
                        </>
                    ): (
                        <>
                            <Link
                                href="/login"
                                style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn-primary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="mobile-menu-button"
                    style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: '0.35rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                    }}
                    aria-label="Toggle mobile menu"
                >
                    <span style={{
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)',
                        transition: 'all 0.3s',
                        transform: mobileMenuOpen ? 'rotate(45deg) translateY(9px)' : 'none'
                    }} />
                    <span style={{
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)',
                        transition: 'all 0.3s',
                        opacity: mobileMenuOpen ? 0 : 1
                    }} />
                    <span style={{
                        width: '1.5rem',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)',
                        transition: 'all 0.3s',
                        transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-9px)' : 'none'
                    }} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'var(--color-primary-light)',
                borderBottom: '2px solid var(--color-gold)',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
                opacity: mobileMenuOpen ? 1 : 0,
                visibility: mobileMenuOpen ? 'visible' : 'hidden',
                transition: 'all 0.3s ease-in-out',
                zIndex: 50,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }} className="mobile-menu">
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    padding: '1rem',
                    gap: '0.5rem'
                }}>
                    <Link 
                        href="/"
                        onClick={closeMobileMenu}
                        style={{ 
                            color: 'var(--color-gold)', 
                            fontWeight: '600', 
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid rgba(212,175,55,0.2)'
                        }}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about"
                        onClick={closeMobileMenu}
                        style={{ 
                            color: 'var(--color-gold)', 
                            fontWeight: '600', 
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid rgba(212,175,55,0.2)'
                        }}
                    >
                        About
                    </Link>
                    <Link 
                        href="/races"
                        onClick={closeMobileMenu}
                        style={{ 
                            color: 'var(--color-gold)', 
                            fontWeight: '600', 
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid rgba(212,175,55,0.2)'
                        }}
                    >
                        Races
                    </Link>
                    <Link 
                        href="/classes"
                        onClick={closeMobileMenu}
                        style={{ 
                            color: 'var(--color-gold)', 
                            fontWeight: '600', 
                            padding: '0.75rem 1rem',
                            borderBottom: '1px solid rgba(212,175,55,0.2)'
                        }}
                    >
                        Classes
                    </Link>
                    {isLoggedIn ? (
                        <Link
                            href="/dashboard"
                            onClick={closeMobileMenu}
                            style={{
                                color: 'var(--color-gold)',
                                fontWeight: '700',
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid rgba(212,175,55,0.2)'
                            }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/ashfall-concord"
                            onClick={closeMobileMenu}
                            style={{
                                color: 'var(--color-accent-light)',
                                fontWeight: '700',
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid rgba(212,175,55,0.2)'
                            }}
                        >
                            Ashfall Concord
                        </Link>
                    )}
                    
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.75rem',
                        padding: '1rem',
                        marginTop: '0.5rem'
                    }}>
                        {isLoggedIn ? (
                            <>
                                <span style={{ color: 'var(--color-parchment)', fontWeight: '500', textAlign: 'center' }}>
                                    Welcome, {firstName}!
                                </span>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}
                                    className="btn-accent"
                                    style={{ width: '100%' }}
                                >
                                    Logout
                                </button>
                            </>
                        ): (
                            <>
                                <Link
                                    href="/login"
                                    onClick={closeMobileMenu}
                                    style={{ 
                                        color: 'var(--color-gold)', 
                                        fontWeight: '600', 
                                        textAlign: 'center',
                                        padding: '0.75rem'
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={closeMobileMenu}
                                    className="btn-primary"
                                    style={{ textAlign: 'center' }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-menu-button {
                        display: flex !important;
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu {
                        display: none !important;
                    }
                }
            `}</style>
        </nav>
    )
}
