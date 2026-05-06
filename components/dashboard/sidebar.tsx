'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type SidebarItem = {
    label: string;
    section?: string;
    comingSoon?: boolean;
};

type SidebarGroup = {
    title: string;
    items: SidebarItem[];
};

const sidebarGroups: SidebarGroup[] = [
    {
        title: 'My Adventure',
        items: [
            { label: 'Dashboard', section: 'home' },
            { label: 'Characters', section: 'characters' },
            { label: 'Parties', comingSoon: true },
            { label: 'Saved Items', comingSoon: true },
        ]
    },
    {
        title: 'Active Session',
        items: [
            { label: 'Live Play', comingSoon: true },
            { label: 'Dice Roller', comingSoon: true },
            { label: 'Session Notes', comingSoon: true },
        ]
    },
    {
        title: 'Resources',
        items: [
            { label: 'Races', section: 'races' },
            { label: 'Classes', section: 'classes' },
            { label: 'Spells & Abilities', section: 'spells' },
            { label: 'Backgrounds', section: 'backgrounds' },
            { label: 'Lore Book', section: 'lore' },
        ]
    },
    {
        title: 'Dungeon Master',
        items: [
            { label: 'Campaign Manager', comingSoon: true },
            { label: 'NPC Builder', comingSoon: true },
            { label: 'Encounter Builder', comingSoon: true },
        ]
    },
];

function CreateBtn({ collapsed }: { collapsed?: boolean }) {
    return (
        <Link
            href="/create-character"
            title="Create New Character"
            style={{
                flex: collapsed ? undefined : 1,
                width: collapsed ? '36px' : undefined,
                height: collapsed ? '36px' : undefined,
                padding: collapsed ? 0 : '0.5rem 0.75rem',
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-primary)',
                fontWeight: '800',
                fontSize: collapsed ? '1.1rem' : '0.82rem',
                letterSpacing: '0.02em',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 10px rgba(212,175,55,0.25)',
                transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
            {collapsed ? '+' : '+ Create New Character'}
        </Link>
    );
}

function ArrowBtn({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean; setIsCollapsed: (v: boolean) => void }) {
    return (
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{
                width: '32px',
                height: '32px',
                flexShrink: 0,
                backgroundColor: 'transparent',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '0.375rem',
                color: 'var(--color-gold)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                lineHeight: 1,
                transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            {isCollapsed ? '›' : '‹'}
        </button>
    );
}

function SidebarInner({ isCollapsed, setIsCollapsed }: { 
    isCollapsed: boolean; 
    setIsCollapsed: (v: boolean) => void 
}) {
    const searchParams = useSearchParams();
    const activeSection = searchParams.get('section') || 'home';

    return (
        <aside style={{
            width: isCollapsed ? '60px' : '260px',
            minHeight: '100%',
            backgroundColor: 'var(--color-primary-dark)',
            borderRight: '1px solid rgba(212, 175, 55, 0.2)',
            transition: 'width 0.25s ease',
            overflow: 'hidden',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Header: Create button + collapse toggle on one line */}
            <div style={{
                borderBottom: '1px solid rgba(212,175,55,0.15)',
                padding: isCollapsed ? '0.625rem' : '0.75rem',
                display: 'flex',
                flexDirection: isCollapsed ? 'column' : 'row',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                {/* Expanded: Create first, arrow second. Collapsed: arrow first, + second. */}
                {!isCollapsed && <CreateBtn />}
                <ArrowBtn isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                {isCollapsed && <CreateBtn collapsed />}
            </div>

            {/* Sidebar Groups */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
                {sidebarGroups.map((group) => (
                    <div key={group.title} style={{ marginBottom: '0.25rem' }}>
                        {/* Group Title */}
                        {!isCollapsed && (
                            <div style={{
                                padding: '0.875rem 1rem 0.375rem',
                                fontSize: '0.65rem',
                                fontWeight: '800',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'rgba(212, 175, 55, 0.4)',
                            }}>
                                {group.title}
                            </div>
                        )}

                        {isCollapsed && (
                            <div style={{
                                height: '1px',
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                margin: '0.75rem 0.5rem 0.25rem',
                            }} />
                        )}

                        {/* Group Items */}
                        {group.items.map((item) => {
                            const isActive = !item.comingSoon && item.section === activeSection;

                            if (item.comingSoon) {
                                return (
                                    <div
                                        key={item.label}
                                        title={isCollapsed ? `${item.label} (Coming Soon)` : undefined}
                                        style={{
                                            padding: isCollapsed ? '0.625rem' : '0.625rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: isCollapsed ? 'center' : 'space-between',
                                            gap: '0.5rem',
                                            cursor: 'not-allowed',
                                            opacity: 0.35,
                                        }}
                                    >
                                        {!isCollapsed && (
                                            <>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--color-parchment)' }}>
                                                    {item.label}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.6rem',
                                                    fontWeight: '700',
                                                    letterSpacing: '0.05em',
                                                    color: 'var(--color-gold-dark)',
                                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                                    padding: '0.1rem 0.4rem',
                                                    borderRadius: '9999px',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    SOON
                                                </span>
                                            </>
                                        )}
                                        {isCollapsed && (
                                            <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)' }}>•</span>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={item.label}
                                    href={`/dashboard?section=${item.section}`}
                                    title={isCollapsed ? item.label : undefined}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: isCollapsed ? '0.625rem' : '0.625rem 1rem',
                                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                                        gap: '0.5rem',
                                        textDecoration: 'none',
                                        backgroundColor: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                                        borderLeft: isActive && !isCollapsed ? '2px solid var(--color-gold)' : '2px solid transparent',
                                        transition: 'background-color 0.15s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.07)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    {!isCollapsed && (
                                        <span style={{
                                            fontSize: '0.875rem',
                                            fontWeight: isActive ? '600' : '400',
                                            color: isActive ? 'var(--color-gold)' : 'rgba(244, 232, 208, 0.7)',
                                        }}>
                                            {item.label}
                                        </span>
                                    )}
                                    {isCollapsed && (
                                        <span style={{
                                            fontSize: '0.65rem',
                                            color: isActive ? 'var(--color-gold)' : 'rgba(244, 232, 208, 0.5)',
                                            fontWeight: '600',
                                        }}>
                                            {item.label.slice(0, 2).toUpperCase()}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Sidebar Footer */}
            {!isCollapsed && (
                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                    fontSize: '0.7rem',
                    color: 'rgba(244, 232, 208, 0.2)',
                    letterSpacing: '0.05em',
                }}>
                    Ashfall Concord v0.1
                </div>
            )}
        </aside>
    );
}

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Suspense fallback={
            <aside style={{
                width: '260px',
                minHeight: '100%',
                backgroundColor: 'var(--color-primary-dark)',
                borderRight: '1px solid rgba(212, 175, 55, 0.2)',
                flexShrink: 0,
            }} />
        }>
            <SidebarInner isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Suspense>
    );
}
