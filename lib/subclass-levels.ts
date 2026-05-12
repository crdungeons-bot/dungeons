/**
 * Maps D&D class names to the level at which they choose their subclass
 */
export const SUBCLASS_LEVELS: Record<string, number> = {
    barbarian: 3,
    bard: 3,
    cleric: 1,
    druid: 2,
    fighter: 3,
    monk: 3,
    paladin: 3,
    ranger: 3,
    rogue: 3,
    sorcerer: 1,
    warlock: 1,
    wizard: 2,
};

/**
 * Helper function to determine if a character should display their subclass
 * based on their current level
 */
export function shouldDisplaySubclass(
    characterClass: string,
    characterLevel: number,
    hasSubclass: boolean
): boolean {
    if (!hasSubclass) return false;
    const requiredLevel = SUBCLASS_LEVELS[characterClass.toLowerCase()] ?? 3;
    return characterLevel >= requiredLevel;
}
