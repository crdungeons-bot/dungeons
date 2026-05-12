'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navigation } from '@/components';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        const emailParam = searchParams.get('email');
        
        if (!tokenParam || !emailParam) {
            setMessage('Invalid or missing reset link. Please request a new password reset.');
            setIsError(true);
        } else {
            setToken(tokenParam);
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        // Validation
        if (newPassword.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            setIsError(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsError(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    email,
                    newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Your password has been reset successfully! Redirecting to login...');
                setIsError(false);
                setIsSuccess(true);
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setMessage(data.error || 'Failed to reset password. The link may be expired.');
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
                        Create New Password
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
                    {!token || !email ? (
                        <div style={{
                            backgroundColor: 'rgba(139, 21, 56, 0.2)',
                            border: '1px solid var(--color-accent)',
                            borderRadius: '0.375rem',
                            padding: '1.5rem',
                            color: '#f4a0b0',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            {message || 'Invalid reset link. Please request a new password reset.'}
                        </div>
                    ) : isSuccess ? (
                        <div style={{
                            backgroundColor: 'rgba(76, 175, 80, 0.15)',
                            border: '1px solid rgba(76, 175, 80, 0.4)',
                            borderRadius: '0.375rem',
                            padding: '1.5rem',
                            color: 'rgba(152, 251, 152, 0.9)',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            textAlign: 'center'
                        }}>
                            {message}
                        </div>
                    ) : (
                        <>
                            <p style={{
                                color: 'rgba(244, 232, 208, 0.7)',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                marginBottom: '1.5rem',
                                textAlign: 'center'
                            }}>
                                Enter your new password below. Make sure it's at least 8 characters long.
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
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
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
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
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

                                {message && !isSuccess && (
                                    <div style={{
                                        backgroundColor: 'rgba(139, 21, 56, 0.2)',
                                        border: '1px solid var(--color-accent)',
                                        borderRadius: '0.375rem',
                                        padding: '0.75rem 1rem',
                                        color: '#f4a0b0',
                                        fontSize: '0.9rem'
                                    }}>
                                        {message}
                                    </div>
                                )}

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
                                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
