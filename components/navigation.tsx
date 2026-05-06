'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');

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

    return (
        <nav style={{ 
            backgroundColor: 'var(--color-primary)', 
            borderBottom: '2px solid var(--color-gold)',
            padding: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
            <div className="flex gap-6 items-center justify-between w-full px-6">
                <div className="flex gap-6">
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
                                transition: 'color 0.3s',
                                letterSpacing: '0.03em',
                                border: '1px solid rgba(212,175,55,0.4)',
                                padding: '0.3rem 0.875rem',
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

                <div className="flex gap-4 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link 
                                href="/profile"
                                style={{ color: 'var(--color-gold)', fontWeight: '600', transition: 'color 0.3s' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                            >
                                Profile
                            </Link>
                            <span style={{ color: 'var(--color-parchment)', fontWeight: '500' }}>
                                Welcome, {firstName}!
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn-accent"
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
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
