'use client';

import { useEffect } from 'react';

/**
 * Hook to clean up character creation data from localStorage
 * when the user closes the window or tab.
 */
export function useCharacterCreationCleanup() {
    useEffect(() => {
        const handleBeforeUnload = () => {
            // Clear character creation data when window closes
            if (typeof window !== 'undefined') {
                localStorage.removeItem('char_stats');
                localStorage.removeItem('char_story');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
}

/**
 * Function to manually clear character creation data.
 * Call this when the user explicitly exits character creation.
 */
export function clearCharacterCreationData() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('char_stats');
        localStorage.removeItem('char_story');
    }
}
