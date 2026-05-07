'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Party, PartyInvite } from '@/types/party';

function PartyCard({ party, userId }: { party: Party; userId: string }) {
    const [hovered, setHovered] = useState(false);
    const isDM = party.dmUserId === userId;

    return (
        <Link
            href={`/dashboard?section=parties&item=${party._id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'block',
                padding: '1.5rem',
                backgroundColor: hovered ? 'rgba(212,175,55,0.08)' : 'var(--color-primary-light)',
                border: `1px solid ${hovered ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.15)'}`,
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem'
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: hovered ? 'var(--color-gold)' : 'var(--color-parchment)',
                    transition: 'color 0.2s'
                }}>
                    {party.name}
                </h3>
                <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: isDM ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.1)',
                    border: `1px solid ${isDM ? 'var(--color-gold)' : 'rgba(212,175,55,0.2)'}`,
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                    letterSpacing: '0.05em',
                    color: isDM ? 'var(--color-gold)' : 'rgba(244,232,208,0.6)'
                }}>
                    {isDM ? 'DM' : 'PLAYER'}
                </span>
            </div>

            {party.description && (
                <p style={{
                    margin: '0 0 1rem 0',
                    fontSize: '0.875rem',
                    color: 'rgba(244,232,208,0.5)',
                    lineHeight: '1.5'
                }}>
                    {party.description}
                </p>
            )}

            <div style={{
                display: 'flex',
                gap: '1.5rem',
                fontSize: '0.8rem',
                color: 'rgba(244,232,208,0.4)'
            }}>
                <span>
                    <strong style={{ color: 'var(--color-gold)' }}>{party.members.length}</strong> / {party.maxMembers} Members
                </span>
            </div>
        </Link>
    );
}

function InviteCard({ invite, onAccept, onDecline }: { 
    invite: PartyInvite; 
    onAccept: () => void;
    onDecline: () => void;
}) {
    return (
        <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--color-primary-light)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.25rem',
                fontWeight: '800',
                color: 'var(--color-gold)'
            }}>
                {invite.partyName}
            </h3>
            <p style={{
                margin: '0 0 1.25rem 0',
                fontSize: '0.875rem',
                color: 'rgba(244,232,208,0.5)'
            }}>
                You've been invited to join this party
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                    onClick={onAccept}
                    style={{
                        flex: 1,
                        padding: '0.625rem',
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        border: 'none',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    Accept
                </button>
                <button
                    onClick={onDecline}
                    style={{
                        flex: 1,
                        padding: '0.625rem',
                        backgroundColor: 'transparent',
                        color: 'rgba(244,232,208,0.6)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    }}
                >
                    Decline
                </button>
            </div>
        </div>
    );
}

export default function PartiesSection() {
    const [activeTab, setActiveTab] = useState<'parties' | 'invites'>('parties');
    const [parties, setParties] = useState<Party[]>([]);
    const [invites, setInvites] = useState<PartyInvite[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [selectedInvite, setSelectedInvite] = useState<PartyInvite | null>(null);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedEmail = localStorage.getItem('userEmail');
        
        if (storedUserId) setUserId(storedUserId);
        if (storedEmail) setUserEmail(storedEmail);

        if (storedUserId && storedEmail) {
            loadData(storedUserId, storedEmail);
        } else {
            setLoading(false);
        }
    }, []);

    const loadData = async (uid: string, email: string) => {
        setLoading(true);
        try {
            const [partiesRes, invitesRes] = await Promise.all([
                fetch(`/api/parties?userId=${uid}`),
                fetch(`/api/parties/invites?email=${encodeURIComponent(email)}`)
            ]);

            const partiesData = await partiesRes.json();
            const invitesData = await invitesRes.json();

            setParties(partiesData.parties || []);
            setInvites(invitesData.invites || []);
        } catch (error) {
            console.error('Load data error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAcceptInvite = (invite: PartyInvite) => {
        setSelectedInvite(invite);
        setShowAcceptModal(true);
    };

    const handleDeclineInvite = async (inviteId: string) => {
        try {
            const response = await fetch(`/api/parties/invites/${inviteId}/decline`, {
                method: 'POST'
            });

            if (response.ok) {
                loadData(userId, userEmail);
            }
        } catch (error) {
            console.error('Decline invite error:', error);
        }
    };

    return (
        <div style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
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
                        Adventuring Groups
                    </p>
                    <h1 style={{
                        margin: 0,
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: 'var(--color-gold)'
                    }}>
                        Parties
                    </h1>
                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        padding: '0.625rem 1.5rem',
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 0 12px rgba(212,175,55,0.25)',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    + Create Party
                </button>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(212,175,55,0.15)'
            }}>
                <button
                    onClick={() => setActiveTab('parties')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'parties' ? '2px solid var(--color-gold)' : '2px solid transparent',
                        color: activeTab === 'parties' ? 'var(--color-gold)' : 'rgba(244,232,208,0.5)',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    My Parties {parties.length > 0 && `(${parties.length})`}
                </button>
                <button
                    onClick={() => setActiveTab('invites')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'invites' ? '2px solid var(--color-gold)' : '2px solid transparent',
                        color: activeTab === 'invites' ? 'var(--color-gold)' : 'rgba(244,232,208,0.5)',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative'
                    }}
                >
                    Invites {invites.length > 0 && (
                        <span style={{
                            marginLeft: '0.5rem',
                            padding: '0.15rem 0.5rem',
                            backgroundColor: 'var(--color-accent)',
                            borderRadius: '999px',
                            fontSize: '0.7rem'
                        }}>
                            {invites.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Content */}
            {loading && (
                <p style={{ color: 'rgba(244,232,208,0.5)' }}>Loading...</p>
            )}

            {!loading && activeTab === 'parties' && (
                <>
                    {parties.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'rgba(244,232,208,0.4)'
                        }}>
                            <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                                You haven't joined any parties yet. Create one to get started!
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '1.25rem'
                        }}>
                            {parties.map(party => (
                                <PartyCard key={party._id} party={party} userId={userId} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {!loading && activeTab === 'invites' && (
                <>
                    {invites.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'rgba(244,232,208,0.4)'
                        }}>
                            <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                                No pending invites
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '1.25rem'
                        }}>
                            {invites.map(invite => (
                                <InviteCard
                                    key={invite._id}
                                    invite={invite}
                                    onAccept={() => handleAcceptInvite(invite)}
                                    onDecline={() => handleDeclineInvite(invite._id)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Modals will be added here */}
            {/* TODO: Create Party Modal */}
            {/* TODO: Accept Invite Modal (Character Selection) */}
        </div>
    );
}
