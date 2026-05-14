/**
 * Subclass Type Definitions
 * 
 * Comprehensive type definitions for D&D 5e subclasses including features,
 * spells, abilities, proficiencies, and resource modifications.
 * 
 * Sources: PHB, XGtE, TCoE, SCAG, Eberron, Fizban's, and all official sourcebooks
 */

/**
 * D&D 5e Official Sourcebooks
 */
export type Sourcebook = 
    | 'PHB'      // Player's Handbook (2014)
    | 'PHB2024'  // Player's Handbook (2024)
    | 'XGtE'     // Xanathar's Guide to Everything
    | 'TCoE'     // Tasha's Cauldron of Everything
    | 'SCAG'     // Sword Coast Adventurer's Guide
    | 'ERLW'     // Eberron: Rising from the Last War
    | 'EGtW'     // Explorer's Guide to Wildemount
    | 'FToD'     // Fizban's Treasury of Dragons
    | 'GGtR'     // Guildmaster's Guide to Ravnica
    | 'MOoT'     // Mythic Odysseys of Theros
    | 'VRGtR'    // Van Richten's Guide to Ravenloft
    | 'DSotDQ'   // Dragonlance: Shadow of the Dragon Queen
    | 'BGDiA'    // Baldur's Gate: Descent into Avernus
    | 'BPGotG'   // Bigby Presents: Glory of the Giants
    | 'DMG';     // Dungeon Master's Guide

/**
 * Resource usage tracking for subclass/class features
 */
export type ResourcePool = {
    /** Resource name (e.g., "Channel Divinity: Turn Undead") */
    name: string;
    
    /** Resource type for categorization */
    type: 'channel_divinity' | 'ki' | 'sorcery_points' | 'rage' | 'bardic_inspiration' | 'superiority_dice' | 'wild_shape' | 'spell_slot' | 'psionic_energy' | 'rune' | 'short' | 'long' | 'other';
    
    /** Number of uses per rest (can be formula like "proficiency_bonus" or "1") */
    usesPerRest?: string;
    
    /** For resources that scale by level (can be number or formula) */
    uses?: { [level: number]: number | string };
    
    /** Type of rest required to recover */
    restType: 'short' | 'long';
    
    /** Level at which this resource is gained */
    levelGained: number;
    
    /** Optional: dice type for resources like Superiority Dice */
    diceType?: string;
    
    /** Optional: description of what this resource does */
    description?: string;
};

/**
 * A single feature granted by a subclass at a specific level
 */
export type SubclassFeature = {
    /** Feature name (e.g., "Frenzy", "Arcane Ward", "Bladesong") */
    name: string;
    
    /** Character level when this feature is gained */
    level: number;
    
    /** Full mechanical description including damage, scaling, limitations */
    description: string;
    
    /** Action economy type */
    actionType?: 'action' | 'bonus action' | 'reaction' | 'free' | 'special' | 'passive';
    
    /** Number of uses per rest (can be formula) */
    usesPerRest?: string;
    
    /** Rest type required to recover uses */
    restType?: 'short' | 'long';
    
    /** Reference to a spell if this feature grants spell-like ability */
    spellReference?: string;
    
    /** Scaling information (e.g., "1d6 at 3rd level, 2d6 at 6th level") */
    scaling?: string;
    
    /** Whether this feature provides a choice (e.g., Maneuvers, Invocations) */
    providesChoice?: boolean;
    
    /** Available options if this provides a choice */
    choices?: string[];
    
    /** Damage dice if applicable */
    damage?: {
        dice: string;        // e.g., "1d6", "2d8"
        type: string;        // e.g., "fire", "necrotic", "radiant"
        scaling?: string;    // How it scales with level
    };
};

/**
 * Spell list expansion for caster subclasses
 * Organized by character level when spells become available
 */
export type SubclassSpells = {
    /** Spells organized by character level */
    byCharacterLevel?: {
        [characterLevel: number]: string[];  // Array of spell names
    };
    
    /** Whether these spells are always prepared (don't count against prepared limit) */
    alwaysPrepared?: boolean;
    
    /** Bonus cantrips granted by this subclass (can be array or scaling object) */
    cantripsKnown?: string[] | { [level: number]: number };
    
    /** For 1/3 casters like Eldritch Knight: spells known by level */
    spellsKnown?: { [level: number]: number };
    
    /** For 1/3 casters: spell slots by level */
    spellSlots?: {
        [level: number]: {
            [spellLevel: number]: number;
        };
    };
    
    /** Spellcasting ability for this subclass */
    spellcastingAbility?: 'int' | 'wis' | 'cha';
    
    /** Spellcasting progression (full, half, third) */
    progression?: 'full' | 'half' | 'third';
    
    /** Spell selection restrictions */
    restriction?: string;
    
    /** Alternative: flat structure for backwards compatibility */
    [characterLevel: number]: string[] | boolean | number | string | string[] | { [key: number]: string[] | number | { [key: number]: number } } | undefined;
};

/**
 * Additional proficiencies granted by a subclass
 */
export type SubclassProficiencies = {
    /** Armor proficiencies gained */
    armor?: string[];
    
    /** Weapon proficiencies gained */
    weapons?: string[];
    
    /** Tool proficiencies gained */
    tools?: string[];
    
    /** Skill proficiencies gained (can be array or choices) */
    skills?: string[] | {
        choose: number;
        from: string[];
    };
    
    /** Language proficiencies gained */
    languages?: {
        choose: number;
        from: string[];
    };
};

/**
 * Complete subclass definition with all features and mechanics
 * This is the database schema for the `dnd-resources.subclasses` collection
 */
export type SubclassComplete = {
    /** Subclass name (e.g., "Path of the Berserker", "College of Lore") */
    name: string;
    
    /** Flavorful description of the subclass theme and playstyle */
    description: string;
    
    /** Parent class (e.g., "barbarian", "wizard") */
    class: string;
    
    /** Level at which this subclass is chosen (1, 2, or 3) */
    subclass_level: number;
    
    /** Official sourcebook where this subclass appears */
    sourcebook: Sourcebook;
    
    /** All features granted by this subclass, organized by level */
    features: {
        [level: number]: SubclassFeature[];
    };
    
    /** Expanded spell list (for caster subclasses like Cleric domains, Warlock patrons) */
    spells?: SubclassSpells;
    
    /** Additional proficiencies granted by this subclass */
    proficiencies?: SubclassProficiencies;
    
    /** Resource pools or modifications (e.g., extra Channel Divinity uses) */
    resources?: ResourcePool[];
    
    /** Special notes or restrictions (e.g., "Dwarf only" for Battlerager) */
    restrictions?: {
        race?: string[];
        alignment?: string[];
        other?: string;
    };
};

/**
 * Simplified subclass for lists and selection
 * @deprecated Use SubclassComplete for full data
 */
export type Subclass = {
    name: string;
    description: string;
};

/**
 * Class information with all available subclasses
 * @deprecated Use SubclassComplete[] queried from database
 */
export type ClassSubclasses = {
    subclass_level: number;
    subclasses: Subclass[];
};

/**
 * Complete subclasses data structure organized by class
 * @deprecated Use database queries instead
 */
export type SubclassesData = {
    [className: string]: ClassSubclasses;
};

/**
 * Character's selected subclass information
 * Stored as part of the character document
 */
export type CharacterSubclass = {
    /** The name of the chosen subclass */
    name: string;
    
    /** The parent class for this subclass (e.g., "barbarian") */
    class: string;
    
    /** The character level when this subclass was chosen */
    level_chosen: number;
};
