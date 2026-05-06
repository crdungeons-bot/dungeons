'use client';

import { useState } from 'react';

type Props = {
    name: string;
    desc: string[];
    isLast: boolean;
};

export default function TraitAccordion({ name, desc, isLast }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div style={{
            borderBottom: isLast ? 'none' : '1px solid rgba(212,175,55,0.08)',
        }}>
            {/* Clickable header row */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.75rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    textAlign: 'left',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.04)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
                {/* Chevron */}
                <span style={{
                    color: 'rgba(212,175,55,0.5)',
                    fontSize: '0.7rem',
                    transition: 'transform 0.2s',
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                    flexShrink: 0,
                }}>
                    &#9654;
                </span>

                <span style={{
                    color: open ? 'var(--color-gold)' : 'var(--color-parchment)',
                    fontSize: '0.875rem',
                    fontWeight: open ? '600' : '500',
                    flex: 1,
                    transition: 'color 0.15s',
                }}>
                    {name}
                </span>
            </button>

            {/* Expandable description */}
            {open && (
                <div style={{
                    padding: '0 1.25rem 0.875rem 2.625rem',
                }}>
                    {desc.length > 0 ? desc.map((paragraph, i) => (
                        <p key={i} style={{
                            color: 'rgba(244,232,208,0.65)',
                            fontSize: '0.85rem',
                            lineHeight: '1.75',
                            margin: i < desc.length - 1 ? '0 0 0.5rem' : 0,
                        }}>
                            {paragraph}
                        </p>
                    )) : (
                        <p style={{ color: 'rgba(244,232,208,0.3)', fontStyle: 'italic', fontSize: '0.85rem', margin: 0 }}>
                            No description available.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
