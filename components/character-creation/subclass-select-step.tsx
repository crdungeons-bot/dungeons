'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubclassSelectionModal from './subclass-selection-modal';

export default function SubclassSelectStep({
    characterClass,
    race,
    // Preserve all later step data
    name,
    background,
    alignment,
    height,
    weight,
    age,
    proficiencies,
}: {
    characterClass: string;
    race?: string;
    // Later step data to preserve
    name?: string;
    background?: string;
    alignment?: string;
    height?: string;
    weight?: string;
    age?: string;
    proficiencies?: string;
}) {
    const router = useRouter();
    const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);

    const handleConfirm = () => {
        if (!selectedSubclass) return;
        
        const params = new URLSearchParams({ step: '4' });
        if (race) params.set('race', race);
        params.set('class', characterClass);
        params.set('subclass', selectedSubclass);
        // Preserve all later step data if user came back
        if (name) params.set('name', name);
        if (background) params.set('background', background);
        if (alignment) params.set('alignment', alignment);
        if (height) params.set('height', height);
        if (weight) params.set('weight', weight);
        if (age) params.set('age', age);
        if (proficiencies) params.set('proficiencies', proficiencies);
        router.push(`/create-character?${params.toString()}`);
    };

    const handleBack = () => {
        const params = new URLSearchParams({ step: '2' });
        if (race) params.set('preselect', race);
        params.set('preselect_class', characterClass);
        // Preserve all later step data
        if (name) params.set('name', name);
        if (background) params.set('background', background);
        if (alignment) params.set('alignment', alignment);
        if (height) params.set('height', height);
        if (weight) params.set('weight', weight);
        if (age) params.set('age', age);
        if (proficiencies) params.set('proficiencies', proficiencies);
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
