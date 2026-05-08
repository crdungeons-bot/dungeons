'use client';

import { useState, useEffect } from 'react';

export type EnrichedInventoryItem = {
    // Item database fields
    name: string;
    category: string;
    subcategory: string;
    rarity: string;
    magical?: boolean;
    requiresAttunement?: boolean;
    attunementBy?: string;
    weight?: number;
    value?: string;
    valueCp?: number;
    damage?: string;
    damageType?: string;
    twoHandedDamage?: string;
    ac?: string;
    stealthDisadvantage?: boolean;
    strengthRequirement?: number;
    properties?: string[];
    range?: string;
    charges?: string;
    description: string;
    source?: string;
    
    // Character-specific fields
    itemId: string;
    quantity: number;
    equipped: boolean;
    attuned: boolean;
};

export type Currency = {
    pp: number;
    gp: number;
    sp: number;
    cp: number;
};

export type InventoryData = {
    inventory: EnrichedInventoryItem[];
    currency: Currency;
};

export function useCharacterInventory(characterId: string | null) {
    const [data, setData] = useState<InventoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!characterId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`/api/characters/${characterId}/inventory`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch inventory');
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [characterId]);

    const refetch = () => {
        if (!characterId) return;
        
        fetch(`/api/characters/${characterId}/inventory`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => setError(err.message));
    };

    return { data, loading, error, refetch };
}
