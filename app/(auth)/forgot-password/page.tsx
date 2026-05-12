'use client';

import { useState } from 'react';
import { Navigation } from '@/components';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('If an account exists with this email, a password reset link has been sent. Please check your inbox.');
                setIsError(false);
                setEmail(''); // Clear the form
            } else {
                setMessage(data.error || 'Failed to send reset email. Please try again.');
                setIsError(true);
            }
        } catch (error) {
            setMessage('Error connecting to server. Please try again.');
            setIsError(true);
        } finally {
            setIsSubmitting(false);
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
                        Password Recovery
                    </p>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--color-gold)',
                        margin: 0
                    }}>
                        Reset Password
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
                    {!message ? (
                        <>
                            <p style={{
                                color: 'rgba(244, 232, 208, 0.7)',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                marginBottom: '1.5rem',
                                textAlign: 'center'
                            }}>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

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
                                        disabled={isSubmitting}
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
                                            opacity: isSubmitting ? 0.6 : 1
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary"
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.875rem', 
                                        fontSize: '1rem', 
                                        marginTop: '0.5rem',
                                        opacity: isSubmitting ? 0.6 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div style={{
                            backgroundColor: isError 
                                ? 'rgba(139, 21, 56, 0.2)' 
                                : 'rgba(76, 175, 80, 0.15)',
                            border: `1px solid ${isError ? 'var(--color-accent)' : 'rgba(76, 175, 80, 0.4)'}`,
                            borderRadius: '0.375rem',
                            padding: '1.5rem',
                            color: isError ? '#f4a0b0' : 'rgba(152, 251, 152, 0.9)',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            {message}
                        </div>
                    )}

                    <div style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                        fontSize: '0.9rem',
                        color: 'rgba(244, 232, 208, 0.4)'
                    }}>
                        Remember your password?{' '}
                        <a href="/login" style={{
                            color: 'var(--color-gold)',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
