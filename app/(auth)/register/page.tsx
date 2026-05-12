'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [humanCheck, setHumanCheck] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [formLoadTime] = useState(Date.now());
    const router = useRouter();

    const validateEmail = (email: string) => {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        
        // Check that @ exists, . exists, and @ comes before .
        if (atIndex === -1 || dotIndex === -1 || atIndex > dotIndex) {
            return false;
        }
        
        // Also check that @ is not first character and . is not last
        if (atIndex === 0 || dotIndex === email.length - 1) {
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        // Check honeypot (if filled, it's likely a bot)
        if (honeypot) {
            setIsError(true);
            setMessage('Invalid submission detected');
            return;
        }

        // Check human verification checkbox
        if (!humanCheck) {
            setIsError(true);
            setMessage('Please confirm you are human');
            return;
        }

        // Check if form was filled too quickly (less than 2 seconds = likely bot)
        const timeTaken = Date.now() - formLoadTime;
        if (timeTaken < 2000) {
            setIsError(true);
            setMessage('Please take your time filling out the form');
            return;
        }

        // Validate email before submitting
        if (!validateEmail(email)) {
            setIsError(true);
            setMessage('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    email, 
                    password,
                    humanCheck,
                    timestamp: formLoadTime 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsError(false);
                setMessage(`Welcome, ${data.user.firstName}! Your account has been created.`);

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setIsError(true);
                setMessage(data.error || 'Registration failed');
                
                // If email already exists, automatically redirect to login after showing message
                if (response.status === 409) {
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                }
            }
        } catch (error) {
            setIsError(true);
            setMessage('Error connecting to server');
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
                        Your Legend Begins Here
                    </p>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--color-gold)',
                        margin: 0
                    }}>
                        Create Account
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

                        {/* Honeypot field - hidden from users, bots will fill it */}
                        <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            style={{
                                position: 'absolute',
                                left: '-9999px',
                                width: '1px',
                                height: '1px',
                                opacity: 0
                            }}
                        />

                        {/* Reusable input style */}
                        {[
                            { label: 'First Name', type: 'text', value: firstName, setter: setFirstName, placeholder: 'Your first name' },
                            { label: 'Last Name', type: 'text', value: lastName, setter: setLastName, placeholder: 'Your last name' },
                            { label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'your.email@example.com' },
                            { label: 'Password (min 6 characters)', type: 'password', value: password, setter: setPassword, placeholder: 'Create a strong password' },
                        ].map((field) => (
                            <div key={field.label}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(244, 232, 208, 0.6)',
                                    marginBottom: '0.5rem'
                                }}>
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder={field.placeholder}
                                    required
                                    minLength={field.type === 'password' ? 6 : undefined}
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
                        ))}

                        {/* Human verification checkbox */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            backgroundColor: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '0.375rem',
                            border: '1px solid rgba(212, 175, 55, 0.2)'
                        }}>
                            <input
                                type="checkbox"
                                id="humanCheck"
                                checked={humanCheck}
                                onChange={(e) => setHumanCheck(e.target.checked)}
                                required
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer',
                                    accentColor: 'var(--color-gold)'
                                }}
                            />
                            <label 
                                htmlFor="humanCheck" 
                                style={{
                                    color: 'rgba(244, 232, 208, 0.8)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                }}
                            >
                                I am a human adventurer, not a bot
                            </label>
                        </div>

                        {message && (
                            <div style={{
                                backgroundColor: isError ? 'rgba(139, 21, 56, 0.2)' : 'rgba(21, 139, 56, 0.2)',
                                border: `1px solid ${isError ? 'var(--color-accent)' : '#2d8a4e'}`,
                                borderRadius: '0.375rem',
                                padding: '0.75rem 1rem',
                                color: isError ? '#f4a0b0' : '#86efac',
                                fontSize: '0.9rem'
                            }}>
                                {message}
                                {isError && message.includes('already registered') && (
                                    <>
                                        {' '}
                                        <a 
                                            href="/login" 
                                            style={{
                                                color: 'var(--color-gold)',
                                                fontWeight: '600',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            Go to Login →
                                        </a>
                                    </>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', marginTop: '0.5rem' }}
                        >
                            Forge Your Legend
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
                        Already have an account?{' '}
                        <a href="/login" style={{
                            color: 'var(--color-gold)',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Sign in here
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}