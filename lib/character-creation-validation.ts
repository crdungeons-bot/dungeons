import type { CharacterDraft } from '@/stores/character-creation-store';

/**
 * Validates whether a character draft has all required fields to proceed to review/summary
 */
export function isCharacterDraftComplete(draft: CharacterDraft): boolean {
    // Required fields
    const hasRace = !!draft.race;
    const hasClass = !!draft.dndClass;
    const hasName = !!draft.name?.trim();
    const hasBackground = !!draft.background;
    const hasAlignment = !!draft.alignment;
    const hasProficiencies = Array.isArray(draft.proficiencies) && draft.proficiencies.length > 0;
    const hasStats = !!draft.stats && 
        typeof draft.stats.str === 'number' &&
        typeof draft.stats.dex === 'number' &&
        typeof draft.stats.con === 'number' &&
        typeof draft.stats.int === 'number' &&
        typeof draft.stats.wis === 'number' &&
        typeof draft.stats.cha === 'number';

    return (
        hasRace &&
        hasClass &&
        hasName &&
        hasBackground &&
        hasAlignment &&
        hasProficiencies &&
        hasStats
    );
}

/**
 * Gets the validation status for each step
 */
export function getStepValidation(draft: CharacterDraft) {
    return {
        race: !!draft.race,
        class: !!draft.dndClass,
        subclass: true, // Optional for most classes
        background: !!draft.name?.trim() && !!draft.background && !!draft.alignment,
        proficiencies: Array.isArray(draft.proficiencies) && draft.proficiencies.length > 0,
        story: true, // Optional
        stats: !!draft.stats && 
            typeof draft.stats.str === 'number' &&
            typeof draft.stats.dex === 'number' &&
            typeof draft.stats.con === 'number' &&
            typeof draft.stats.int === 'number' &&
            typeof draft.stats.wis === 'number' &&
            typeof draft.stats.cha === 'number',
    };
}
