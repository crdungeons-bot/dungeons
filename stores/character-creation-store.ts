'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

/** Single source of truth for in-progress character creation */
export type CharacterDraft = {
    race?: string;
    dndClass?: string;
    subclass?: string;
    name?: string;
    background?: string;
    alignment?: string;
    height?: string;
    weight?: string;
    age?: string;
    proficiencies?: string[];
    backstory?: string;
    personality?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    appearance?: string;
    stats?: {
        method: 'rolled' | 'manual';
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
        rollDetails?: unknown[];
        rollAssign?: Partial<Record<string, number | null>>;
    };
};

/** @deprecated use CharacterDraft */
export type CharacterCreationData = CharacterDraft;

const STORAGE_KEY = 'character_creation_data';

type PersistedSlice = { draft: CharacterDraft };

function mergeLegacyStoryStatsIntoDraft(draft: CharacterDraft) {
    if (typeof window === 'undefined') return;
    try {
        const st = localStorage.getItem('char_story');
        if (st) Object.assign(draft, JSON.parse(st) as object);
    } catch {
        /* ignore */
    }
    try {
        const s = localStorage.getItem('char_stats');
        if (s) draft.stats = JSON.parse(s) as CharacterDraft['stats'];
    } catch {
        /* ignore */
    }
}

const customPersistStorage: PersistStorage<PersistedSlice> = {
    getItem: (name): StorageValue<PersistedSlice> | null => {
        if (typeof window === 'undefined') return null;
        const raw = localStorage.getItem(name);
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw) as unknown;
            if (
                parsed &&
                typeof parsed === 'object' &&
                'state' in parsed &&
                (parsed as { state: unknown }).state &&
                typeof (parsed as { state: { draft?: unknown } }).state === 'object' &&
                'draft' in (parsed as { state: { draft: unknown } }).state
            ) {
                return parsed as StorageValue<PersistedSlice>;
            }
            const flat =
                typeof parsed === 'object' && parsed !== null
                    ? { ...(parsed as CharacterDraft) }
                    : {};
            mergeLegacyStoryStatsIntoDraft(flat);
            return { state: { draft: flat }, version: 1 };
        } catch {
            return null;
        }
    },
    setItem: (name, value) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(name, JSON.stringify(value));
        localStorage.removeItem('char_story');
        localStorage.removeItem('char_stats');
    },
    removeItem: (name) => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(name);
        localStorage.removeItem('char_story');
        localStorage.removeItem('char_stats');
    },
};

type CharacterCreationStore = {
    draft: CharacterDraft;
    patchDraft: (partial: Partial<CharacterDraft>) => void;
    resetDraft: () => void;
};

/** Deep-merge `draft` so rehydration never replaces the whole object with a stale partial snapshot. */
function mergePersistedCharacterCreation(
    persistedState: unknown,
    currentState: CharacterCreationStore,
): CharacterCreationStore {
    if (
        persistedState === null ||
        persistedState === undefined ||
        typeof persistedState !== 'object' ||
        !('draft' in persistedState)
    ) {
        return currentState;
    }
    const p = persistedState as PersistedSlice;
    // Persisted state takes priority over current state during rehydration
    return {
        ...currentState,
        draft: {
            ...currentState.draft,
            ...p.draft,
        },
    };
}

export const useCharacterCreationStore = create<CharacterCreationStore>()(
    persist(
        (set) => ({
            draft: {},
            patchDraft: (partial) => {
                set((s) => {
                    const newDraft = { ...s.draft, ...partial };
                    // Immediately sync to localStorage to avoid race conditions
                    if (typeof window !== 'undefined') {
                        try {
                            const persistKey = 'character_creation_data';
                            const value = { state: { draft: newDraft }, version: 1 };
                            localStorage.setItem(persistKey, JSON.stringify(value));
                        } catch (e) {
                            console.error('[CharacterCreation] Failed to persist:', e);
                        }
                    }
                    return { draft: newDraft };
                });
            },
            resetDraft: () => set({ draft: {} }),
        }),
        {
            name: STORAGE_KEY,
            storage: customPersistStorage,
            partialize: (state): PersistedSlice => ({ draft: state.draft }),
            merge: mergePersistedCharacterCreation,
        },
    ),
);

/** Clear persisted draft (exit wizard, after successful create, dashboard landing). */
export function clearCharacterCreationData() {
    useCharacterCreationStore.persist.clearStorage();
    useCharacterCreationStore.setState({ draft: {} });
}

/** Non-reactive read (e.g. handlers, one-off). */
export function getDraftSnapshot(): CharacterDraft {
    return useCharacterCreationStore.getState().draft;
}

export function useCharacterCreationHydrated(): boolean {
    const [hydrated, setHydrated] = useState(() =>
        useCharacterCreationStore.persist.hasHydrated(),
    );
    useEffect(() => {
        if (useCharacterCreationStore.persist.hasHydrated()) setHydrated(true);
        const unsub = useCharacterCreationStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });
        return unsub;
    }, []);
    return hydrated;
}
