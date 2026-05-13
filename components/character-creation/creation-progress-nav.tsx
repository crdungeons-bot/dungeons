'use client';

import { useCharacterCreationStore } from '@/stores/character-creation-store';
import { characterCreationNeedsSubclassStep } from '@/lib/subclass-levels';
import { isCharacterDraftComplete } from '@/lib/character-creation-validation';

export default function CharacterCreationProgressNav({
    steps,
    currentStep,
}: {
    steps: readonly string[];
    currentStep: number;
}) {
    const draft = useCharacterCreationStore((s) => s.draft);
    const dndClass = draft.dndClass;
    const isComplete = isCharacterDraftComplete(draft);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                gap: '0.5rem',
                flexWrap: 'wrap',
            }}
        >
            {steps.map((label, i) => {
                const stepNum = i + 1;
                const isDone = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                // Block Review step if character is incomplete
                const isReviewStep = stepNum === 8;
                const isBlocked = isReviewStep && !isComplete;

                const href =
                    stepNum === 3 &&
                    dndClass &&
                    !characterCreationNeedsSubclassStep(dndClass)
                        ? '/create-character?step=4'
                        : isBlocked
                            ? '#'
                            : `/create-character?step=${stepNum}`;

                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (isBlocked) {
                        e.preventDefault();
                        alert('Please complete all required steps before reviewing your character.');
                    }
                };

                return (
                    <a
                        key={label}
                        href={href}
                        onClick={handleClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '1rem',
                            backgroundColor: isActive
                                ? 'rgba(212,175,55,0.12)'
                                : isDone
                                    ? 'rgba(212,175,55,0.05)'
                                    : 'transparent',
                            border: `1.5px solid ${
                                isActive
                                    ? 'var(--color-gold)'
                                    : isDone
                                        ? 'rgba(212,175,55,0.35)'
                                        : 'rgba(212,175,55,0.15)'
                            }`,
                            textDecoration: 'none',
                            cursor: isBlocked ? 'not-allowed' : 'pointer',
                            opacity: isBlocked ? 0.5 : 1,
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive && !isBlocked) {
                                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
                                e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive && !isBlocked) {
                                e.currentTarget.style.borderColor = isDone
                                    ? 'rgba(212,175,55,0.35)'
                                    : 'rgba(212,175,55,0.15)';
                                e.currentTarget.style.backgroundColor = isDone
                                    ? 'rgba(212,175,55,0.05)'
                                    : 'transparent';
                            }
                        }}
                    >
                        <div
                            style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: isDone || isActive ? 'var(--color-gold)' : 'transparent',
                                border: `1.5px solid ${isDone || isActive ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.65rem',
                                fontWeight: '800',
                                color: isDone || isActive ? 'var(--color-primary)' : 'rgba(212,175,55,0.25)',
                                flexShrink: 0,
                            }}
                        >
                            {isDone ? '✓' : stepNum}
                        </div>
                        <span
                            style={{
                                fontSize: '0.72rem',
                                color: isActive
                                    ? 'var(--color-gold)'
                                    : isDone
                                        ? 'rgba(212,175,55,0.7)'
                                        : 'rgba(212,175,55,0.4)',
                                fontWeight: isActive ? '700' : '600',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {label}
                        </span>
                    </a>
                );
            })}
        </div>
    );
}
