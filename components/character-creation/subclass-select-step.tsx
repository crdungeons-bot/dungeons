'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SubclassSelectionModal from './subclass-selection-modal';
import {
    useCharacterCreationStore,
    useCharacterCreationHydrated,
} from '@/stores/character-creation-store';

const LEVEL_1_SUBCLASS_CLASSES = ['cleric', 'warlock'];

export default function SubclassSelectStep() {
    const router = useRouter();
    const hydrated = useCharacterCreationHydrated();
    const dndClass = useCharacterCreationStore(s => s.draft.dndClass);
    const subclass = useCharacterCreationStore(s => s.draft.subclass);
    const patchDraft = useCharacterCreationStore(s => s.patchDraft);

    useEffect(() => {
        if (!hydrated) return;
        if (dndClass && !LEVEL_1_SUBCLASS_CLASSES.includes(dndClass)) {
            router.replace('/create-character?step=4');
        }
    }, [hydrated, dndClass, router]);

    const handleSelect = (sub: string) => {
        patchDraft({ subclass: sub });
    };

    const handleConfirm = () => {
        if (!subclass) return;
        router.push('/create-character?step=4');
    };

    const handleBack = () => {
        router.push('/create-character?step=2');
    };

    if (!hydrated || !dndClass) {
        return (
            <div style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                flex:            1,
                color:           'var(--color-gold)',
            }}>
                Loading…
            </div>
        );
    }

    return (
        <SubclassSelectionModal
            characterClass={dndClass}
            selectedSubclass={subclass ?? null}
            onSelect={handleSelect}
            onClose={handleBack}
            onConfirm={handleConfirm}
        />
    );
}
