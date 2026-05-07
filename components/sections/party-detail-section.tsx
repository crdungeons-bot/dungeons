'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CharacterViewModal from './character-view-modal';

type PartyMember = {
    userId: string;
    characterId: string;
    joinedAt: string;
    user: {
        firstName: string;
        lastName: string;
    } | null;
    character: {
        name: string;
        race: string;
        class: string;
        level: number;
    } | null;
};

type PartyDetail = {
    _id: string;
    name: string;
    description?: string;
    dmUserId: string;
    maxMembers: number;
    members: PartyMember[];
    createdAt: string;
    dm: {
        firstName: string;
        lastName: string;
        email: string;
    } | null;
};

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function MemberCard({ member, isDM, onRemove, onViewCharacter }: { 
    member: PartyMember; 
    isDM: boolean;
    onRemove: (userId: string) => void;
    onViewCharacter: (characterId: string) => void;
}) {
    const [hovered, setHovered] = useState(false);

    if (!member.character || !member.user) return null;

    return (
        <div
            onClick={() => onViewCharacter(member.characterId)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: hovered ? 'rgba(212,175,55,0.08)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${hovered ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.15)'}`,
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
            }}
        >
            {/* Portrait */}
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                flexShrink: 0,
                background: `
                    linear-gradient(to bottom, rgba(10,8,6,0) 50%, rgba(10,8,6,0.9) 100%),
                    url(/images/races/${member.character.race}.png) center / cover no-repeat
                `,
                border: '1px solid rgba(212,175,55,0.3)'
            }} />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    margin: '0 0 0.25rem 0',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: hovered ? 'var(--color-gold)' : 'var(--color-parchment)',
                    transition: 'color 0.2s',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    {member.character.name}
                </p>
                <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'rgba(244,232,208,0.5)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>
                    Level {member.character.level} {fmt(member.character.race)} {fmt(member.character.class)}
                </p>
                <p style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.7rem',
                    color: 'rgba(244,232,208,0.35)'
                }}>
                    Player: {member.user.firstName} {member.user.lastName.charAt(0)}.
                </p>
            </div>

            {/* Remove Button (only shown for DM) */}
            {isDM && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm(`Remove ${member.character?.name} from the party?`)) {
                            onRemove(member.userId);
                        }
                    }}
                    style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(139,21,56,0.3)',
                        borderRadius: '0.375rem',
                        color: 'rgba(244,100,120,0.8)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(139,21,56,0.2)';
                        e.currentTarget.style.borderColor = 'rgba(139,21,56,0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(139,21,56,0.3)';
                    }}
                >
                    Remove
                </button>
            )}
        </div>
    );
}

export default function PartyDetailSection({ partyId }: { partyId: string }) {
    const [party, setParty] = useState<PartyDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const [showInviteInput, setShowInviteInput] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviting, setInviting] = useState(false);
    const [inviteError, setInviteError] = useState('');
    const [inviteSuccess, setInviteSuccess] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [viewingCharacterId, setViewingCharacterId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) setUserId(storedUserId);
        loadParty();
    }, [partyId]);

    const loadParty = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/parties/${partyId}`);
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to load party');
            } else {
                setParty(data.party);
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSendInvite = async () => {
        if (!inviteEmail.trim() || !party) return;

        setInviteError('');
        setInviteSuccess('');
        setInviting(true);

        try {
            const response = await fetch(`/api/parties/${partyId}/invite`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dmUserId: userId,
                    invitedEmail: inviteEmail.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setInviteError(data.error || 'Failed to send invite');
            } else {
                setInviteSuccess('Invite sent!');
                setInviteEmail('');
                setTimeout(() => {
                    setInviteSuccess('');
                    setShowInviteInput(false);
                }, 2000);
            }
        } catch (err) {
            setInviteError('An error occurred');
        } finally {
            setInviting(false);
        }
    };

    const handleRemoveMember = async (memberUserId: string) => {
        try {
            const response = await fetch(`/api/parties/${partyId}/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dmUserId: userId,
                    memberUserId
                })
            });

            if (response.ok) {
                loadParty(); // Reload party data
            }
        } catch (err) {
            console.error('Remove member error:', err);
        }
    };

    const handleDeleteParty = async () => {
        setDeleting(true);
        try {
            const response = await fetch(`/api/parties/${partyId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dmUserId: userId })
            });

            if (response.ok) {
                window.location.href = '/dashboard?section=parties';
            }
        } catch (err) {
            console.error('Delete party error:', err);
        } finally {
            setDeleting(false);
            setDeleteConfirm(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'rgba(244,232,208,0.5)' }}>Loading party...</p>
            </div>
        );
    }

    if (error || !party) {
        return (
            <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-accent)' }}>{error || 'Party not found'}</p>
                <Link
                    href="/dashboard?section=parties"
                    style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        color: 'var(--color-gold)',
                        textDecoration: 'none',
                        fontSize: '0.9rem'
                    }}
                >
                    ← Back to Parties
                </Link>
            </div>
        );
    }

    const isDM = party.dmUserId === userId;
    const dmName = party.dm 
        ? `${party.dm.firstName} ${party.dm.lastName.charAt(0)}.`
        : 'Unknown';

    return (
        <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    href="/dashboard?section=parties"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(244,232,208,0.5)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,232,208,0.5)'}
                >
                    ← Back to Parties
                </Link>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <p style={{
                            margin: '0 0 0.25rem 0',
                            fontSize: '0.65rem',
                            fontWeight: '800',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(212,175,55,0.5)'
                        }}>
                            {isDM ? 'Your Party' : 'Party'}
                        </p>
                        <h1 style={{
                            margin: 0,
                            fontSize: '2rem',
                            fontWeight: '900',
                            color: 'var(--color-gold)'
                        }}>
                            {party.name}
                        </h1>
                        {party.description && (
                            <p style={{
                                margin: '0.5rem 0 0 0',
                                fontSize: '1rem',
                                color: 'rgba(244,232,208,0.6)',
                                maxWidth: '600px',
                                lineHeight: '1.6'
                            }}>
                                {party.description}
                            </p>
                        )}
                    </div>

                    {isDM && (
                        <span style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(212,175,55,0.15)',
                            border: '1px solid var(--color-gold)',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            letterSpacing: '0.05em',
                            color: 'var(--color-gold)'
                        }}>
                            DUNGEON MASTER
                        </span>
                    )}
                </div>
            </div>

            {/* DM Info */}
            <div style={{
                padding: '1.25rem',
                backgroundColor: 'rgba(212,175,55,0.05)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '0.5rem',
                marginBottom: '2rem'
            }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: 'rgba(244,232,208,0.5)'
                }}>
                    <strong style={{ color: 'var(--color-gold)' }}>Dungeon Master:</strong> {dmName}
                </p>
            </div>

            {/* Members Section */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: 'var(--color-gold)'
                    }}>
                        Party Members ({party.members.length}/{party.maxMembers})
                    </h2>

                    {isDM && party.members.length < party.maxMembers && (
                        <button
                            onClick={() => setShowInviteInput(!showInviteInput)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--color-gold)',
                                color: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            + Invite Player
                        </button>
                    )}
                </div>

                {/* Invite Input */}
                {isDM && showInviteInput && (
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'rgba(212,175,55,0.05)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="player@email.com"
                                style={{
                                    flex: 1,
                                    padding: '0.625rem',
                                    backgroundColor: 'var(--color-primary)',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    borderRadius: '0.375rem',
                                    color: 'var(--color-parchment)',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'}
                            />
                            <button
                                onClick={handleSendInvite}
                                disabled={inviting || !inviteEmail.trim()}
                                style={{
                                    padding: '0.625rem 1.25rem',
                                    backgroundColor: inviting || !inviteEmail.trim() ? 'rgba(212,175,55,0.3)' : 'var(--color-gold)',
                                    color: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    cursor: inviting || !inviteEmail.trim() ? 'not-allowed' : 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {inviting ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                        {inviteError && (
                            <p style={{
                                margin: '0.5rem 0 0 0',
                                fontSize: '0.8rem',
                                color: '#f4a0b0'
                            }}>
                                {inviteError}
                            </p>
                        )}
                        {inviteSuccess && (
                            <p style={{
                                margin: '0.5rem 0 0 0',
                                fontSize: '0.8rem',
                                color: '#86efac'
                            }}>
                                {inviteSuccess}
                            </p>
                        )}
                    </div>
                )}

                {/* Member Cards */}
                {party.members.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem 2rem',
                        color: 'rgba(244,232,208,0.4)',
                        fontSize: '0.95rem',
                        fontStyle: 'italic'
                    }}>
                        No members yet. {isDM && 'Invite players to join your party!'}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1rem'
                    }}>
                        {party.members.map(member => (
                            <MemberCard 
                                key={member.characterId} 
                                member={member} 
                                isDM={isDM}
                                onRemove={handleRemoveMember}
                                onViewCharacter={(charId) => setViewingCharacterId(charId)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* DM Options */}
            {isDM && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'rgba(139,21,56,0.1)',
                    border: '1px solid rgba(139,21,56,0.2)',
                    borderRadius: '0.5rem'
                }}>
                    <h3 style={{
                        margin: '0 0 0.75rem 0',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: 'rgba(244,100,120,0.8)'
                    }}>
                        Danger Zone
                    </h3>
                    
                    {!deleteConfirm ? (
                        <button
                            onClick={() => setDeleteConfirm(true)}
                            style={{
                                padding: '0.625rem 1.25rem',
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(139,21,56,0.3)',
                                borderRadius: '0.375rem',
                                color: 'rgba(244,100,120,0.8)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(139,21,56,0.2)';
                                e.currentTarget.style.borderColor = 'rgba(139,21,56,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(139,21,56,0.3)';
                            }}
                        >
                            Delete Party
                        </button>
                    ) : (
                        <div>
                            <p style={{
                                margin: '0 0 1rem 0',
                                fontSize: '0.875rem',
                                color: 'rgba(244,232,208,0.7)',
                                lineHeight: '1.5'
                            }}>
                                Are you sure? This will dissolve the party for all members. This action cannot be undone.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => setDeleteConfirm(false)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid rgba(212,175,55,0.3)',
                                        borderRadius: '0.375rem',
                                        color: 'rgba(244,232,208,0.7)',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteParty}
                                    disabled={deleting}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: deleting ? 'rgba(139,21,56,0.3)' : 'var(--color-accent)',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        color: '#f4a0b0',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        cursor: deleting ? 'not-allowed' : 'pointer',
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!deleting) e.currentTarget.style.opacity = '0.85';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                >
                                    {deleting ? 'Deleting...' : 'Yes, Delete Party'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Character View Modal */}
            <CharacterViewModal
                characterId={viewingCharacterId || ''}
                isOpen={!!viewingCharacterId}
                onClose={() => setViewingCharacterId(null)}
            />
        </div>
    );
}
