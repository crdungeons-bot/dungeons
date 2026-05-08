'use client';

import { useState, useEffect } from 'react';

type ItemSearchResult = {
    name: string;
    category: string;
    subcategory: string;
    rarity: string;
    magical?: boolean;
    weight?: number;
    value?: string;
    description: string;
};

type AddItemModalProps = {
    characterId: string;
    onClose: () => void;
    onItemAdded: () => void;
};

function fmt(s: string): string {
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const CATEGORY_COLORS: Record<string, string> = {
    weapon: 'rgba(228,90,74,0.8)',
    armor: 'rgba(93,142,232,0.8)',
    shield: 'rgba(93,142,232,0.75)',
    wondrous: 'rgba(160,100,240,0.8)',
    ring: 'rgba(240,180,60,0.8)',
    rod: 'rgba(212,175,55,0.8)',
    staff: 'rgba(130,200,80,0.8)',
    wand: 'rgba(240,80,160,0.8)',
    potion: 'rgba(80,200,140,0.8)',
    scroll: 'rgba(240,230,80,0.8)',
    tool: 'rgba(200,160,100,0.75)',
    ammunition: 'rgba(180,140,100,0.75)',
    gear: 'rgba(160,160,160,0.7)',
    clothing: 'rgba(193,93,232,0.75)',
    trinket: 'rgba(240,120,180,0.75)',
    misc: 'rgba(180,180,180,0.7)',
};

export default function AddItemModal({ characterId, onClose, onItemAdded }: AddItemModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ItemSearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [adding, setAdding] = useState(false);
    const [showCustomForm, setShowCustomForm] = useState(false);

    // Custom item form state
    const [customItem, setCustomItem] = useState({
        name: '',
        category: 'misc',
        description: '',
        quantity: 1,
    });

    // Search items from database
    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(() => {
            setSearching(true);
            fetch(`/api/resources/items?q=${encodeURIComponent(searchQuery)}`)
                .then(r => r.json())
                .then(data => {
                    setSearchResults(data.items?.slice(0, 20) ?? []);
                    setSearching(false);
                })
                .catch(() => {
                    setSearching(false);
                });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    async function addItemToInventory(itemName: string, quantity: number = 1) {
        setAdding(true);
        try {
            const response = await fetch(`/api/characters/${characterId}/inventory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemId: itemName,
                    quantity,
                    equipped: false,
                    attuned: false,
                    source: 'purchased',
                }),
            });

            if (response.ok) {
                onItemAdded();
                onClose();
            } else {
                alert('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item');
        } finally {
            setAdding(false);
        }
    }

    async function createCustomItem() {
        if (!customItem.name.trim()) {
            alert('Item name is required');
            return;
        }

        await addItemToInventory(customItem.name, customItem.quantity);
    }

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '700px',
                    maxHeight: '85vh',
                    background: 'linear-gradient(135deg, #1a1525 0%, #2d1b3d 100%)',
                    border: '2px solid rgba(212,175,55,0.3)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'var(--color-gold)' }}>
                        Add Item
                    </h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: 'rgba(244,232,208,0.5)', fontSize: '2rem', cursor: 'pointer', lineHeight: 1, padding: 0 }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {!showCustomForm ? (
                        <>
                            {/* Search */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    autoFocus
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '2px solid rgba(212,175,55,0.3)',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.6)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(212,175,55,0.3)'}
                                />
                            </div>

                            {/* Results */}
                            {searching ? (
                                <div style={{ padding: '2rem', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(244,232,208,0.5)' }}>Searching...</p>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {searchResults.map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                background: 'rgba(0,0,0,0.3)',
                                                border: '1px solid rgba(212,175,55,0.15)',
                                                borderRadius: '10px',
                                                padding: '1rem',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '1rem',
                                                transition: 'border-color 0.15s',
                                            }}
                                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.4)'}
                                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.15)'}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                                                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#fff' }}>
                                                        {item.name}
                                                    </h3>
                                                    <span style={{
                                                        fontSize: '0.65rem',
                                                        fontWeight: '700',
                                                        color: CATEGORY_COLORS[item.category] ?? 'rgba(180,180,180,0.7)',
                                                        background: `${CATEGORY_COLORS[item.category] ?? 'rgba(180,180,180,0.7)'}`.replace(/[\d.]+\)$/, '0.12)'),
                                                        border: `1px solid ${CATEGORY_COLORS[item.category] ?? 'rgba(180,180,180,0.7)'}`.replace(/[\d.]+\)$/, '0.3)'),
                                                        borderRadius: '999px',
                                                        padding: '0.1rem 0.5rem',
                                                    }}>
                                                        {fmt(item.category)}
                                                    </span>
                                                    {item.magical && (
                                                        <span style={{ fontSize: '0.8rem', color: 'rgba(160,100,240,0.85)' }}>✦</span>
                                                    )}
                                                </div>
                                                <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'rgba(244,232,208,0.5)', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                    {item.description}
                                                </p>
                                                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'rgba(244,232,208,0.4)' }}>
                                                    {item.weight !== undefined && <span>Weight: {item.weight} lb</span>}
                                                    {item.value && <span>Value: {item.value}</span>}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addItemToInventory(item.name)}
                                                disabled={adding}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: 'rgba(212,175,55,0.15)',
                                                    border: '1.5px solid rgba(212,175,55,0.5)',
                                                    borderRadius: '8px',
                                                    color: 'var(--color-gold)',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '700',
                                                    cursor: adding ? 'not-allowed' : 'pointer',
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {adding ? 'Adding...' : '+ Add'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : searchQuery.trim().length >= 2 ? (
                                <div style={{ padding: '2rem', textAlign: 'center' }}>
                                    <span style={{ fontSize: '2rem', opacity: 0.2 }}>🔍</span>
                                    <p style={{ margin: '0.75rem 0 1rem', fontSize: '0.9rem', color: 'rgba(244,232,208,0.4)', fontStyle: 'italic' }}>
                                        No items found matching "{searchQuery}"
                                    </p>
                                    <button
                                        onClick={() => {
                                            setCustomItem(prev => ({ ...prev, name: searchQuery }));
                                            setShowCustomForm(true);
                                        }}
                                        style={{
                                            padding: '0.65rem 1.25rem',
                                            background: 'rgba(160,100,240,0.15)',
                                            border: '1.5px solid rgba(160,100,240,0.5)',
                                            borderRadius: '8px',
                                            color: 'rgba(160,100,240,0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✨ Create Custom Item
                                    </button>
                                </div>
                            ) : (
                                <div style={{ padding: '2rem', textAlign: 'center' }}>
                                    <span style={{ fontSize: '2.5rem', opacity: 0.2 }}>⚔️</span>
                                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: 'rgba(244,232,208,0.3)', fontStyle: 'italic' }}>
                                        Search for items by name or description
                                    </p>
                                </div>
                            )}

                            {/* Custom item button */}
                            {searchQuery.trim().length === 0 && (
                                <div style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '1px solid rgba(212,175,55,0.15)', textAlign: 'center' }}>
                                    <button
                                        onClick={() => setShowCustomForm(true)}
                                        style={{
                                            padding: '0.65rem 1.25rem',
                                            background: 'rgba(160,100,240,0.15)',
                                            border: '1.5px solid rgba(160,100,240,0.5)',
                                            borderRadius: '8px',
                                            color: 'rgba(160,100,240,0.9)',
                                            fontSize: '0.9rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✨ Create Custom Item
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Custom Item Form */
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <button
                                    onClick={() => setShowCustomForm(false)}
                                    style={{ background: 'none', border: 'none', color: 'rgba(212,175,55,0.6)', fontSize: '1.5rem', cursor: 'pointer', padding: 0 }}
                                >
                                    ←
                                </button>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-gold)' }}>
                                    Create Custom Item
                                </h3>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Item Name *
                                </label>
                                <input
                                    type="text"
                                    value={customItem.name}
                                    onChange={e => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., Dragon Tooth Necklace"
                                    style={{
                                        width: '100%',
                                        padding: '0.65rem 0.85rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1.5px solid rgba(212,175,55,0.3)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Category
                                </label>
                                <select
                                    value={customItem.category}
                                    onChange={e => setCustomItem(prev => ({ ...prev, category: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.65rem 0.85rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1.5px solid rgba(212,175,55,0.3)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {Object.keys(CATEGORY_COLORS).map(cat => (
                                        <option key={cat} value={cat}>{fmt(cat)}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Description
                                </label>
                                <textarea
                                    value={customItem.description}
                                    onChange={e => setCustomItem(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe your item..."
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '0.65rem 0.85rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1.5px solid rgba(212,175,55,0.3)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(212,175,55,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={customItem.quantity}
                                    onChange={e => setCustomItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.65rem 0.85rem',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1.5px solid rgba(212,175,55,0.3)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <button
                                onClick={createCustomItem}
                                disabled={adding || !customItem.name.trim()}
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '0.85rem',
                                    background: adding || !customItem.name.trim() ? 'rgba(212,175,55,0.1)' : 'rgba(212,175,55,0.15)',
                                    border: `2px solid ${adding || !customItem.name.trim() ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.5)'}`,
                                    borderRadius: '10px',
                                    color: adding || !customItem.name.trim() ? 'rgba(212,175,55,0.4)' : 'var(--color-gold)',
                                    fontSize: '1rem',
                                    fontWeight: '800',
                                    cursor: adding || !customItem.name.trim() ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {adding ? 'Adding...' : '+ Add to Inventory'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
