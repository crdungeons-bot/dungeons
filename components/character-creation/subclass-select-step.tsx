'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubclassSelectionModal from './subclass-selection-modal';
import { getCharacterCreationData, updateCharacterCreationData } from '@/lib/character-creation-storage';

export default function SubclassSelectStep() {
    const router = useRouter();
    const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);
    const [characterClass, setCharacterClass] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = getCharacterCreationData();
        if (saved.subclass) setSelectedSubclass(saved.subclass);
        if (saved.dndClass) setCharacterClass(saved.dndClass);
    }, []);

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

    if (!characterClass) {
        return <div>Loading...</div>;
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
