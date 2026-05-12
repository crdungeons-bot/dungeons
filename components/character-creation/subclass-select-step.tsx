'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubclassSelectionModal from './subclass-selection-modal';

export default function SubclassSelectStep({
    characterClass,
    race,
}: {
    characterClass: string;
    race?: string;
}) {
    const router = useRouter();
    const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);

    const handleConfirm = () => {
        if (!selectedSubclass) return;
        
        const params = new URLSearchParams({ step: '4' });
        if (race) params.set('race', race);
        params.set('class', characterClass);
        params.set('subclass', selectedSubclass);
        router.push(`/create-character?${params.toString()}`);
    };

    const handleBack = () => {
        const params = new URLSearchParams({ step: '2' });
        if (race) params.set('preselect', race);
        params.set('preselect_class', characterClass);
        router.push(`/create-character?${params.toString()}`);
    };

    return (
        <SubclassSelectionModal
            characterClass={characterClass}
            selectedSubclass={selectedSubclass}
            onSelect={setSelectedSubclass}
            onClose={handleBack}
            onConfirm={handleConfirm}
        />
    );
}
