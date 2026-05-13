'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubclassSelectionModal from './subclass-selection-modal';
import { getCharacterCreationData, updateCharacterCreationData } from '@/lib/character-creation-storage';

const LEVEL_1_SUBCLASS_CLASSES = ['cleric', 'warlock'];

export default function SubclassSelectStep() {
    const router = useRouter();
    const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);
    const [characterClass, setCharacterClass] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = getCharacterCreationData();
        
        // Check if this class needs a subclass at level 1
        if (saved.dndClass && !LEVEL_1_SUBCLASS_CLASSES.includes(saved.dndClass)) {
            // Skip this step - go to background
            router.push('/create-character?step=4');
            return;
        }
        
        if (saved.subclass) setSelectedSubclass(saved.subclass);
        if (saved.dndClass) setCharacterClass(saved.dndClass);
        setLoading(false);
    }, [router]);

    const handleSelect = (subclass: string) => {
        setSelectedSubclass(subclass);
        updateCharacterCreationData({ subclass });
    };

    const handleConfirm = () => {
        if (!selectedSubclass) return;
        router.push('/create-character?step=4'); // Background step
    };

    const handleBack = () => {
        router.push('/create-character?step=2'); // Class step
    };

    if (loading || !characterClass) {
        return <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flex: 1,
            color: 'var(--color-gold)' 
        }}>Loading...</div>;
    }

    return (
        <SubclassSelectionModal
            characterClass={characterClass}
            selectedSubclass={selectedSubclass}
            onSelect={handleSelect}
            onClose={handleBack}
            onConfirm={handleConfirm}
        />
    );
}
