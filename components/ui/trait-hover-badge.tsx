'use client';

import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    name: string;
    desc: string[];
    variant?: 'light' | 'dark'; // light = standalone page, dark = dashboard
};

export default function TraitHoverBadge({ name, desc, variant = 'light' }: Props) {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEnter = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
        timer.current = setTimeout(() => setVisible(true), 400);
    };

    const handleMove = (e: React.MouseEvent) => {
        if (!visible) setPos({ x: e.clientX, y: e.clientY });
    };

    const handleLeave = () => {
        if (timer.current) clearTimeout(timer.current);
        setVisible(false);
    };

    return (
        <>
            {variant === 'light' ? (
                <div
                    onMouseEnter={handleEnter}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="bg-purple-50 p-3 rounded hover:bg-purple-100 transition-colors"
                    style={{ cursor: 'default' }}
                >
                    <span className="font-medium text-gray-700">✨ {name}</span>
                </div>
            ) : (
                <div
                    onMouseEnter={handleEnter}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    style={{
                        padding: '0.5rem 0.875rem',
                        backgroundColor: 'rgba(139,21,56,0.15)',
                        borderRadius: '0.375rem',
                        border: '1px solid rgba(139,21,56,0.28)',
                        cursor: 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                    }}
                >
                    <span style={{ color: 'var(--color-parchment)', fontSize: '0.9rem' }}>
                        {name}
                    </span>
                </div>
            )}

            {visible && createPortal(
                <div style={{
                    position: 'fixed',
                    left: pos.x + 14,
                    top: pos.y + 14,
                    zIndex: 9999,
                    width: '300px',
                    maxWidth: 'calc(100vw - 2rem)',
                    backgroundColor: 'rgba(10,5,2,0.97)',
                    border: '1px solid rgba(212,175,55,0.35)',
                    borderRadius: '0.5rem',
                    padding: '1rem 1.125rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
                    pointerEvents: 'none',
                }}>
                    <p style={{
                        color: 'var(--color-gold)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        letterSpacing: '0.04em',
                        margin: '0 0 0.5rem',
                    }}>
                        {name}
                    </p>
                    <div style={{
                        height: '1px',
                        backgroundColor: 'rgba(212,175,55,0.2)',
                        marginBottom: '0.625rem',
                    }} />
                    {desc.length > 0 ? desc.map((paragraph, i) => (
                        <p key={i} style={{
                            color: 'rgba(244,232,208,0.78)',
                            fontSize: '0.82rem',
                            lineHeight: '1.65',
                            margin: i < desc.length - 1 ? '0 0 0.5rem' : 0,
                        }}>
                            {paragraph}
                        </p>
                    )) : (
                        <p style={{ color: 'rgba(244,232,208,0.35)', fontStyle: 'italic', fontSize: '0.82rem', margin: 0 }}>
                            No description available.
                        </p>
                    )}
                </div>,
                document.body
            )}
        </>
    );
}
