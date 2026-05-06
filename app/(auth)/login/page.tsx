'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId',    data.user.id.toString());
                localStorage.setItem('firstName', data.user.firstName);
                localStorage.setItem('lastName',  data.user.lastName);
                localStorage.setItem('email',     data.user.email);

                router.push('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Error connecting to server');
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary)' }}>
            <Navigation />

            <div style={{ maxWidth: '460px', margin: '5rem auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{
                        color: 'var(--color-accent-light)',
                        fontWeight: '700',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        marginBottom: '0.75rem'
                    }}>
                        Welcome Back, Adventurer
                    </p>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--color-gold)',
                        margin: 0
                    }}>
                        Sign In
                    </h1>
                </div>

                {/* Form Card */}
                <div style={{
                    backgroundColor: 'var(--color-primary-light)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '0.5rem',
                    padding: '2.5rem',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(244, 232, 208, 0.6)',
                                marginBottom: '0.5rem'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    borderRadius: '0.375rem',
                                    color: 'var(--color-parchment)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'rgba(244, 232, 208, 0.6)',
                                marginBottom: '0.5rem'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    borderRadius: '0.375rem',
                                    color: 'var(--color-parchment)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                            />
                        </div>

                        {error && (
                            <div style={{
                                backgroundColor: 'rgba(139, 21, 56, 0.2)',
                                border: '1px solid var(--color-accent)',
                                borderRadius: '0.375rem',
                                padding: '0.75rem 1rem',
                                color: '#f4a0b0',
                                fontSize: '0.9rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', marginTop: '0.5rem' }}
                        >
                            Enter the World
                        </button>
                    </form>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                        fontSize: '0.9rem',
                        color: 'rgba(244, 232, 208, 0.4)'
                    }}>
                        No account yet?{' '}
                        <a href="/register" style={{
                            color: 'var(--color-gold)',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Begin your journey
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}