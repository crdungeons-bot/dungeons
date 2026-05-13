'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearCharacterCreationData } from '@/hooks/use-character-creation-cleanup';

export default function CharacterCreationWrapper({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const router = useRouter();

    // Clean up localStorage when window closes
    useEffect(() => {
        const handleBeforeUnload = () => {
            clearCharacterCreationData();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleExit = () => {
        if (confirm('Are you sure you want to exit? All progress will be lost.')) {
            clearCharacterCreationData();
            router.push('/dashboard');
        }
    };

    return (
        <>
            {/* Exit button in top-right corner */}
            <button
                onClick={handleExit}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: '1.5px solid rgba(212,175,55,0.3)',
                    borderRadius: '0.375rem',
                    color: 'rgba(212,175,55,0.6)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    letterSpacing: '0.03em',
                    transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.7)';
                    e.currentTarget.style.color = 'var(--color-gold)';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                    e.currentTarget.style.color = 'rgba(212,175,55,0.6)';
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                ✕ Exit
            </button>
            {children}
        </>
    );
}
