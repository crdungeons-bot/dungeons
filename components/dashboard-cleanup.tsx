'use client';

import { useEffect } from 'react';
import { clearCharacterCreationData } from '@/lib/character-creation-storage';

/**
 * Wrapper component that clears any lingering character creation data
 * when the user navigates to the dashboard from outside the character creation flow.
 */
export default function DashboardCleanup() {
    useEffect(() => {
        // Clear any character creation data when dashboard loads
        // This handles cases where user navigated away from character creation
        // without completing it
        clearCharacterCreationData();
    }, []);

    return null;
}
