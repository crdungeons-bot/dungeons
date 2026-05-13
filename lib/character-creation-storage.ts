'use client';

/**
 * Character creation data storage utilities
 * All data persists in localStorage, allowing users to navigate anywhere
 * and return to character creation without losing progress.
 */

export type CharacterCreationData = {
    // Step 1: Race
    race?: string;
    
    // Step 2: Class
    dndClass?: string;
    
    // Step 3: Subclass (only for Cleric/Warlock)
    subclass?: string;
    
    // Step 4: Background + Character Info
    name?: string;
    background?: string;
    alignment?: string;
    height?: string;
    weight?: string;
    age?: string;
    
    // Step 5: Proficiencies
    proficiencies?: string[]; // Array of skill indices
    
    // Step 6: Story
    backstory?: string;
    personality?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    appearance?: string;
    
    // Step 7: Stats
    stats?: {
        method: 'rolled' | 'manual';
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
        rollDetails?: any[]; // Roll results if method is 'rolled'
    };
};

const STORAGE_KEY = 'character_creation_data';

/**
 * Get all character creation data from localStorage
 */
export function getCharacterCreationData(): CharacterCreationData {
    if (typeof window === 'undefined') return {};
    
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Failed to parse character creation data:', error);
        return {};
    }
}

/**
 * Update character creation data in localStorage (merges with existing)
 */
export function updateCharacterCreationData(updates: Partial<CharacterCreationData>) {
    if (typeof window === 'undefined') return;
    
    try {
        const current = getCharacterCreationData();
        const updated = { ...current, ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save character creation data:', error);
    }
}

/**
 * Clear all character creation data from localStorage
 */
export function clearCharacterCreationData() {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.removeItem(STORAGE_KEY);
        // Also clear old keys for backwards compatibility
        localStorage.removeItem('char_stats');
        localStorage.removeItem('char_story');
    } catch (error) {
        console.error('Failed to clear character creation data:', error);
    }
}

/**
 * Check if user has any character creation data in progress
 */
export function hasCharacterCreationInProgress(): boolean {
    if (typeof window === 'undefined') return false;
    
    const data = getCharacterCreationData();
    return Object.keys(data).length > 0;
}
