'use client';

/**
 * Re-exports character creation draft store (Zustand + persist).
 * Prefer importing from `@/stores/character-creation-store` in new code.
 */
export type {
    CharacterDraft,
    CharacterCreationData,
} from '@/stores/character-creation-store';
import {
    useCharacterCreationStore,
    clearCharacterCreationData,
    getDraftSnapshot,
} from '@/stores/character-creation-store';

export {
    useCharacterCreationStore,
    clearCharacterCreationData,
    getDraftSnapshot,
};

/** @deprecated use `getDraftSnapshot()` or the store */
export function getCharacterCreationData() {
    return getDraftSnapshot();
}

/** @deprecated use `useCharacterCreationStore.getState().patchDraft` */
export function updateCharacterCreationData(updates: Partial<import('@/stores/character-creation-store').CharacterDraft>) {
    useCharacterCreationStore.getState().patchDraft(updates);
}
