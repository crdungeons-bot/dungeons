/**
 * D&D 5e SRD 5.2 Spell Slot Progressions by Class
 * 
 * Spell slots represent how many spells of each level a character can cast before resting.
 * Different classes have different progression rates:
 * - Full Casters: Bard, Cleric, Druid, Sorcerer, Wizard
 * - Half Casters: Paladin, Ranger (get slots at level 2)
 * - Warlock: Uses Pact Magic (different system)
 * - Non-Casters: Barbarian, Fighter, Monk, Rogue
 */

export type SpellSlots = {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
};

// Full Caster Progression (Bard, Cleric, Druid, Sorcerer, Wizard)
const FULL_CASTER_SLOTS: Record<number, SpellSlots> = {
    1:  { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    2:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    3:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    4:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    5:  { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    6:  { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    7:  { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    8:  { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    9:  { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 },
    10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 },
    11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0 },
    12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0 },
    13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0 },
    14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0 },
    15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 0 },
    16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 0 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
};

// Half Caster Progression (Paladin, Ranger)
const HALF_CASTER_SLOTS: Record<number, SpellSlots> = {
    1:  { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, // Paladins and Rangers get slots at level 2
    2:  { 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    3:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    4:  { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    5:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    6:  { 1: 4, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    7:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    8:  { 1: 4, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    9:  { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    10: { 1: 4, 2: 3, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    11: { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    12: { 1: 4, 2: 3, 3: 3, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    13: { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    14: { 1: 4, 2: 3, 3: 3, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    15: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    16: { 1: 4, 2: 3, 3: 3, 4: 2, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 },
};

// Warlock uses Pact Magic (different from standard spell slots)
// Warlocks have fewer slots that are always cast at the highest level available
export type PactMagicSlots = {
    slots: number;      // Total number of slots
    level: number;      // Level at which all slots are cast
};

const WARLOCK_PACT_MAGIC: Record<number, PactMagicSlots> = {
    1:  { slots: 1, level: 1 },
    2:  { slots: 2, level: 1 },
    3:  { slots: 2, level: 2 },
    4:  { slots: 2, level: 2 },
    5:  { slots: 2, level: 3 },
    6:  { slots: 2, level: 3 },
    7:  { slots: 2, level: 4 },
    8:  { slots: 2, level: 4 },
    9:  { slots: 2, level: 5 },
    10: { slots: 2, level: 5 },
    11: { slots: 3, level: 5 },
    12: { slots: 3, level: 5 },
    13: { slots: 3, level: 5 },
    14: { slots: 3, level: 5 },
    15: { slots: 3, level: 5 },
    16: { slots: 3, level: 5 },
    17: { slots: 4, level: 5 },
    18: { slots: 4, level: 5 },
    19: { slots: 4, level: 5 },
    20: { slots: 4, level: 5 },
};

// Non-casters have no spell slots
const NO_SPELL_SLOTS: SpellSlots = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

/**
 * Get spell slots for a character based on their class and level
 */
export function getSpellSlots(charClass: string, level: number): SpellSlots | PactMagicSlots | null {
    const normalizedClass = charClass.toLowerCase();
    const clampedLevel = Math.max(1, Math.min(20, level));

    switch (normalizedClass) {
        // Full Casters
        case 'bard':
        case 'cleric':
        case 'druid':
        case 'sorcerer':
        case 'wizard':
            return FULL_CASTER_SLOTS[clampedLevel];

        // Half Casters
        case 'paladin':
        case 'ranger':
            return HALF_CASTER_SLOTS[clampedLevel];

        // Warlock (Pact Magic)
        case 'warlock':
            return WARLOCK_PACT_MAGIC[clampedLevel];

        // Non-Casters
        case 'barbarian':
        case 'fighter':
        case 'monk':
        case 'rogue':
            return null; // Explicitly no spell slots

        default:
            return null;
    }
}

/**
 * Check if a class is a spellcaster
 */
export function isSpellcaster(charClass: string): boolean {
    const normalizedClass = charClass.toLowerCase();
    return ['bard', 'cleric', 'druid', 'sorcerer', 'wizard', 'paladin', 'ranger', 'warlock'].includes(normalizedClass);
}

/**
 * Check if a class uses Pact Magic (Warlock)
 */
export function usesPactMagic(charClass: string): boolean {
    return charClass.toLowerCase() === 'warlock';
}

/**
 * Get the spellcasting ability for a class
 */
export function getSpellcastingAbility(charClass: string): 'int' | 'wis' | 'cha' | null {
    const normalizedClass = charClass.toLowerCase();
    
    const spellcastingAbilities: Record<string, 'int' | 'wis' | 'cha'> = {
        wizard: 'int',
        cleric: 'wis',
        druid: 'wis',
        ranger: 'wis',
        monk: 'wis',
        bard: 'cha',
        sorcerer: 'cha',
        warlock: 'cha',
        paladin: 'cha',
    };

    return spellcastingAbilities[normalizedClass] ?? null;
}
