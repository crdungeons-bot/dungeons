/**
 * D&D 5e Class Type Definitions
 * 
 * Comprehensive type definitions for all D&D 5e classes including features,
 * spell progression, multiclassing rules, and level-by-level progressions.
 */

import type { Sourcebook, ResourcePool } from './subclass';

/**
 * Spell slot progression for full/half casters
 */
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

/**
 * Pact Magic slots for Warlocks
 */
export type PactMagicSlots = {
    slots: number;
    level: number;
};

/**
 * Spellcasting progression for a caster class
 */
export type SpellcastingProgression = {
    /** Type of caster */
    type: 'full' | 'half' | 'pact' | 'third';
    
    /** Spellcasting ability score */
    ability: 'int' | 'wis' | 'cha';
    
    /** Spell slots available at each character level */
    spellSlotsPerLevel: {
        [level: number]: SpellSlots | PactMagicSlots;
    };
    
    /** Number of spells known at each level (for known-spells casters) */
    spellsKnownPerLevel?: {
        [level: number]: number;
    };
    
    /** Number of cantrips known at each level */
    cantripsKnownPerLevel?: {
        [level: number]: number;
    };
    
    /** Whether this class prepares spells daily (vs knowing spells) */
    prepareSpells?: boolean;
    
    /** Formula for prepared spells if applicable (e.g., "level + ability_modifier") */
    preparedSpellsFormula?: string;
};

/**
 * A single feature granted by a class at a specific level
 */
export type ClassFeature = {
    /** Feature name (e.g., "Rage", "Extra Attack", "Spellcasting") */
    name: string;
    
    /** Character level when this feature is gained */
    level: number;
    
    /** Full mechanical description */
    description: string;
    
    /** Action economy type */
    actionType?: 'action' | 'bonus action' | 'reaction' | 'free' | 'special' | 'passive';
    
    /** Number of uses per rest (can be formula like "proficiency_bonus") */
    usesPerRest?: string;
    
    /** Rest type required to recover uses */
    restType?: 'short' | 'long';
    
    /** Whether this feature improves at higher levels */
    improvesAtLevels?: number[];
    
    /** Scaling information */
    scaling?: string;
    
    /** Whether this feature provides choices (e.g., Fighting Style, Metamagic) */
    providesChoice?: boolean;
    
    /** Available options if this provides a choice */
    choices?: string[];
    
    /** Number of choices if applicable */
    chooseCount?: number;
};

/**
 * Multiclassing requirements and gains for a class
 */
export type MulticlassingRules = {
    /** Minimum ability scores required to multiclass INTO this class */
    prerequisites: {
        [stat: string]: number;  // e.g., { "str": 13, "dex": 13 }
    };
    
    /** Proficiencies gained when multiclassing INTO this class */
    proficienciesGained: {
        armor?: string[];
        weapons?: string[];
        tools?: string[];
    };
};

/**
 * Hit points calculation for a class
 */
export type HitPoints = {
    /** Hit die (e.g., 6, 8, 10, 12) */
    hitDie: number;
    
    /** Hit points at 1st level */
    firstLevel: string;  // e.g., "12 + Constitution modifier"
    
    /** Hit points at higher levels */
    higherLevels: string;  // e.g., "1d12 (or 7) + Constitution modifier per level"
};

/**
 * Basic proficiency reference
 */
export type Proficiency = {
    index: string;
    name: string;
};

/**
 * Proficiency choice structure
 */
export type ProficiencyChoice = {
    desc: string;
    choose: number;
    type?: string;
    from: {
        option_set_type?: string;
        options: {
            option_type?: string;
            item: Proficiency;
        }[];
    };
};

/**
 * Saving throw proficiency
 */
export type SavingThrow = {
    index: string;
    name: string;
};

/**
 * Starting equipment item
 */
export type StartingEquipment = {
    equipment: {
        index: string;
        name: string;
    };
    quantity: number;
};

/**
 * Starting equipment choices (choose one option)
 */
export type EquipmentChoice = {
    desc: string;
    choose: number;
    from: {
        options: {
            equipment?: {
                index: string;
                name: string;
            };
            quantity?: number;
            choice?: {
                choose: number;
                from: {
                    options: unknown[];
                };
            };
        }[];
    };
};

/**
 * Complete class definition with all features and mechanics
 * This is the enhanced database schema for `dnd-resources.classes` collection
 */
export type ClassComplete = {
    /** Class index (e.g., "barbarian", "wizard") */
    index: string;
    
    /** Class name (e.g., "Barbarian", "Wizard") */
    name: string;
    
    /** Official sourcebook where this class appears */
    sourcebook: Sourcebook;
    
    /** Hit die size */
    hit_die: number;
    
    /** Hit points calculation */
    hitPoints?: HitPoints;
    
    /** Proficiency choices (e.g., choose 2 skills from list) */
    proficiency_choices: ProficiencyChoice[];
    
    /** Base proficiencies (armor, weapons, saves) */
    proficiencies: Proficiency[];
    
    /** Saving throw proficiencies */
    saving_throws: SavingThrow[];
    
    /** Starting equipment */
    starting_equipment: StartingEquipment[];
    
    /** Starting equipment choices */
    starting_equipment_options?: EquipmentChoice[];
    
    /** All class features organized by level */
    features: {
        [level: number]: ClassFeature[];
    };
    
    /** Spellcasting progression (if applicable) */
    spellcasting?: SpellcastingProgression;
    
    /** Multiclassing rules */
    multiclassing?: MulticlassingRules;
    
    /** Resource pools (e.g., Rage, Ki, Sorcery Points) */
    resources?: ResourcePool[];
    
    /** Level at which subclass is chosen */
    subclass_level: number;
    
    /** Ability Score Improvement levels */
    asi_levels?: number[];
    
    /** Optional URL for backwards compatibility */
    url?: string;
};

/**
 * Simplified class for basic references
 * @deprecated Use ClassComplete for full data
 */
export type DndClass = {
    index: string;
    name: string;
    url?: string;
};

/**
 * Legacy class detail type
 * @deprecated Use ClassComplete instead
 */
export type ClassDetail = {
    index: string;
    name: string;
    hit_die: number;
    proficiency_choices: ProficiencyChoice[];
    proficiencies: Proficiency[];
    saving_throws: SavingThrow[];
    starting_equipment: StartingEquipment[];
    url?: string;
};

/**
 * API response for class queries
 */
export type ClassesResponse = {
    count: number;
    results: ClassComplete[];
};
