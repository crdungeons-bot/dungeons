/**
 * Character Type Definitions
 * 
 * Centralized character data structure used throughout the application
 */

import type { CharacterSubclass } from './subclass';

export type Currency = {
    pp: number;
    gp: number;
    sp: number;
    cp: number;
};

export type Stats = {
    str?: number;
    dex?: number;
    con?: number;
    int?: number;
    wis?: number;
    cha?: number;
};

export type Story = {
    background?: string;
    personality?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    appearance?: string;
    backstory?: string;
};

export type Feat = {
    name: string;
    benefit: string;
    level: number;
    statChoice: string | null;
};

export type SpellSlots = {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
    6?: number;
    7?: number;
    8?: number;
    9?: number;
};

export type PactMagicSlots = {
    slots: number;
    level: number;
};

/**
 * Complete character data structure
 */
export type Character = {
    /** Character's unique identifier (MongoDB ObjectId as string) */
    id: string;
    
    /** Character name */
    name: string;
    
    /** Race (e.g., "human", "elf", "dwarf") */
    race: string;
    
    /** Class (e.g., "fighter", "wizard", "rogue") */
    class: string;
    
    /** Background (e.g., "soldier", "acolyte") */
    background: string;
    
    /** Alignment (e.g., "chaotic good", "lawful neutral") */
    alignment: string;
    
    /** Character level (1-20) */
    level: number;
    
    /** Current hit points */
    hp: number | null;
    
    /** Currency/money */
    currency: Currency;
    
    /** Physical characteristics */
    height: string | null;
    weight: string | null;
    age: string | null;
    
    /** Proficiencies (skills, weapons, tools, etc.) */
    proficiencies: string[];
    
    /** Ability scores */
    stats: Stats;
    
    /** Character story/roleplay information */
    story: Story;
    
    /** Feats acquired */
    feats?: Feat[];
    
    /** Spell slots (for casters) */
    spellSlots: SpellSlots | PactMagicSlots | null;
    
    /** 
     * Chosen subclass information 
     * Null if the character hasn't reached their subclass level yet
     */
    subclass: CharacterSubclass | null;
    
    /** Timestamp when character was created */
    createdAt: string;
};

/**
 * Simplified character data for lists/cards
 */
export type CharacterSummary = {
    id: string;
    name: string;
    race: string;
    class: string;
    background: string;
    alignment: string;
    level: number;
    createdAt: string;
};
