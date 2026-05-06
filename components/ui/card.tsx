'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Card({ title, description, url, image, showCreate, createUrl }: { 
    title: string; 
    description: string; 
    url?: string;
    image?: string;
    showCreate?: boolean;
    /** If provided, the Create button becomes a real link to this URL */
    createUrl?: string;
}) {
    const [imgError, setImgError] = useState(false);
    return (
        <div style={{
            border: '2px solid var(--color-gold)',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-primary-light)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Title at the top */}
            <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-primary-dark)',
                borderBottom: '1px solid var(--color-gold)'
            }}>
                <h3 style={{ 
                    color: 'var(--color-gold)', 
                    margin: 0,
                    fontSize: '1.25rem'
                }}>
                    {title}
                </h3>
            </div>

            {/* Image - only shows if image exists and didn't error */}
            {image && !imgError && (
                <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        onError={() => setImgError(true)}
                    />
                </div>
            )}

            {/* Description and link at the bottom */}
            <div style={{ 
                padding: '0.75rem 1rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.75rem',
                flexGrow: 1,
                justifyContent: 'space-between'
            }}>
                <p style={{ color: 'var(--color-parchment)', fontStyle: 'italic', margin: 0 }}>
                    {description}
                </p>
                {url && !showCreate && (
                    <Link href={url} className="btn-primary" style={{ textAlign: 'center' }}>
                        View More Info
                    </Link>
                )}

                {url && showCreate && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link
                            href={url}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.375rem',
                                border: '1px solid var(--color-gold)',
                                color: 'var(--color-gold)',
                                backgroundColor: 'transparent',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                transition: 'background-color 0.15s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            View Details
                        </Link>
                        {createUrl ? (
                            <Link
                                href={createUrl}
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '0.375rem',
                                    border: 'none',
                                    backgroundColor: 'var(--color-gold)',
                                    color: 'var(--color-primary)',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'opacity 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                Create
                            </Link>
                        ) : (
                            <button
                                disabled
                                style={{
                                    flex: 1,
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '0.375rem',
                                    border: 'none',
                                    backgroundColor: 'var(--color-gold)',
                                    color: 'var(--color-primary)',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    cursor: 'not-allowed',
                                    opacity: 0.7,
                                }}
                            >
                                Create
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
