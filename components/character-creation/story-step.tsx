'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── Styled textarea ───────────────────────────────────────────────────────────

function StoryTextarea({
    label,
    sublabel,
    placeholder,
    value,
    onChange,
    rows = 4,
}: {
    label: string;
    sublabel?: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
}) {
    const [focused, setFocused] = useState(false);
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                    <label style={{
                        color: 'rgba(212,175,55,0.7)',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: sublabel ? '0.125rem' : 0,
                    }}>
                        {label}
                    </label>
                    {sublabel && (
                        <p style={{
                            color: 'rgba(244,232,208,0.35)',
                            fontSize: '0.75rem',
                            fontStyle: 'italic',
                            margin: 0,
                        }}>
                            {sublabel}
                        </p>
                    )}
                </div>
                {wordCount > 0 && (
                    <span style={{
                        color: 'rgba(212,175,55,0.3)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.06em',
                    }}>
                        {wordCount} {wordCount === 1 ? 'word' : 'words'}
                    </span>
                )}
            </div>
            <textarea
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    backgroundColor: 'rgba(212,175,55,0.04)',
                    border: `1.5px solid ${focused ? 'var(--color-gold)' : value ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.15)'}`,
                    borderRadius: '0.375rem',
                    padding: '0.75rem 1rem',
                    color: 'var(--color-parchment)',
                    fontSize: '0.9rem',
                    lineHeight: '1.75',
                    outline: 'none',
                    width: '100%',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                    fontFamily: 'inherit',
                }}
            />
        </div>
    );
}

// ── Divider between sections ──────────────────────────────────────────────────

function SectionDivider({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div style={{ margin: '2rem 0 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: subtitle ? '0.375rem' : 0 }}>
                <h2 style={{
                    color: 'var(--color-gold)',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    margin: 0,
                    whiteSpace: 'nowrap',
                }}>
                    {title}
                </h2>
                <div style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(212,175,55,0.3), rgba(212,175,55,0))',
                }} />
            </div>
            {subtitle && (
                <p style={{
                    color: 'rgba(244,232,208,0.4)',
                    fontSize: '0.825rem',
                    fontStyle: 'italic',
                    margin: 0,
                    lineHeight: '1.6',
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

type StoryStepProps = {
    race?: string;
    dndClass?: string;
    name?: string;
    background?: string;
    alignment?: string;
    height?: string;
    weight?: string;
    age?: string;
    proficiencies?: string;
};

export default function StoryStep({
    race, dndClass, name, background, alignment, height, weight, age, proficiencies,
}: StoryStepProps) {
    const router = useRouter();

    const [backstory,    setBackstory]    = useState('');
    const [personality,  setPersonality]  = useState('');
    const [ideals,       setIdeals]       = useState('');
    const [bonds,        setBonds]        = useState('');
    const [flaws,        setFlaws]        = useState('');
    const [appearance,   setAppearance]   = useState('');

    const hasAnyContent = [backstory, personality, ideals, bonds, flaws, appearance].some(s => s.trim().length > 0);

    const handleBack = () => {
        const params = new URLSearchParams({ step: '4' });
        if (race)           params.set('race',          race);
        if (dndClass)       params.set('class',         dndClass);
        if (name)           params.set('name',          name);
        if (background)     params.set('background',    background);
        if (alignment)      params.set('alignment',     alignment);
        if (height)         params.set('height',        height);
        if (weight)         params.set('weight',        weight);
        if (age)            params.set('age',           age);
        if (proficiencies)  params.set('proficiencies', proficiencies);
        router.push(`/create-character?${params.toString()}`);
    };

    const handleContinue = () => {
        // Story is stored in localStorage so the text doesn't bloat the URL
        if (typeof window !== 'undefined') {
            const storyData = { backstory, personality, ideals, bonds, flaws, appearance };
            localStorage.setItem('char_story', JSON.stringify(storyData));
        }

        const params = new URLSearchParams({ step: '6' });
        if (race)           params.set('race',          race);
        if (dndClass)       params.set('class',         dndClass);
        if (name)           params.set('name',          name);
        if (background)     params.set('background',    background);
        if (alignment)      params.set('alignment',     alignment);
        if (height)         params.set('height',        height);
        if (weight)         params.set('weight',        weight);
        if (age)            params.set('age',           age);
        if (proficiencies)  params.set('proficiencies', proficiencies);
        router.push(`/create-character?${params.toString()}`);
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* ── Scrollable form ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                {/* Intro note */}
                <div style={{
                    padding: '1rem 1.25rem',
                    backgroundColor: 'rgba(212,175,55,0.05)',
                    border: '1px solid rgba(212,175,55,0.15)',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    gap: '0.875rem',
                    alignItems: 'flex-start',
                }}>
                    <span style={{ color: 'rgba(212,175,55,0.5)', fontSize: '1.1rem', flexShrink: 0, lineHeight: 1.4 }}>✦</span>
                    <div>
                        <p style={{
                            color: 'rgba(212,175,55,0.7)',
                            fontWeight: '700',
                            fontSize: '0.82rem',
                            margin: '0 0 0.25rem',
                        }}>
                            All fields are optional
                        </p>
                        <p style={{
                            color: 'rgba(244,232,208,0.45)',
                            fontSize: '0.825rem',
                            lineHeight: '1.65',
                            margin: 0,
                        }}>
                            This is your character's voice. Fill in as much or as little as you like ,  you can always come back and add to it later. Other players and your DM will be able to read this on your character's page.
                        </p>
                    </div>
                </div>

                {/* ── BACKSTORY ── */}
                <SectionDivider
                    title="Backstory"
                    subtitle="Where did your character come from? What events shaped who they are today?"
                />
                <StoryTextarea
                    label="Backstory"
                    placeholder={
                        `e.g. Born into a family of traveling merchants, ${name || 'your character'} spent their early years crossing trade routes between kingdoms. It was on one such journey that they witnessed a creature from the shadowfell tear through their caravan ,  the only survivor, they vowed to understand the forces that nearly claimed them...`
                    }
                    value={backstory}
                    onChange={setBackstory}
                    rows={7}
                />

                {/* ── APPEARANCE ── */}
                <SectionDivider
                    title="Appearance"
                    subtitle="How does your character look? What makes them recognizable in a crowd?"
                />
                <StoryTextarea
                    label="Physical Description"
                    placeholder="e.g. Tall and lean with pale grey skin and silver eyes that seem to catch light that isn't there. A scar runs from their left temple to the corner of their jaw ,  a souvenir they never speak of. They dress practically but always wear a single copper earring shaped like a crescent moon."
                    value={appearance}
                    onChange={setAppearance}
                    rows={4}
                />

                {/* ── CHARACTER TRAITS ── */}
                <SectionDivider
                    title="Character Traits"
                    subtitle="The four pillars of D&D character personality. Short, sharp answers work best."
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '1.25rem',
                }}>
                    <StoryTextarea
                        label="Personality Traits"
                        sublabel="How do they typically act? Any quirks or mannerisms?"
                        placeholder="e.g. I quote ancient proverbs in situations where they are not entirely appropriate. I believe that anything worth doing is worth doing right."
                        value={personality}
                        onChange={setPersonality}
                        rows={4}
                    />

                    <StoryTextarea
                        label="Ideals"
                        sublabel="What principles guide their decisions?"
                        placeholder="e.g. Knowledge ,  the path to power and self-improvement is through knowledge. (Neutral)"
                        value={ideals}
                        onChange={setIdeals}
                        rows={4}
                    />

                    <StoryTextarea
                        label="Bonds"
                        sublabel="Who or what do they care about most?"
                        placeholder="e.g. I have an ancient text that holds terrible secrets that must not fall into the wrong hands. My village was burned to the ground by soldiers of the empire ,  I will see them pay."
                        value={bonds}
                        onChange={setBonds}
                        rows={4}
                    />

                    <StoryTextarea
                        label="Flaws"
                        sublabel="What weaknesses or vices do they struggle with?"
                        placeholder="e.g. I am convinced that no one could ever fool me the way I fool others. I turn tail and run when things look bad."
                        value={flaws}
                        onChange={setFlaws}
                        rows={4}
                    />
                </div>

                {/* Spacer for footer */}
                <div style={{ height: '5rem' }} />
            </div>

            {/* ── Sticky footer ── */}
            <div style={{
                flexShrink: 0,
                borderTop: '1px solid rgba(212,175,55,0.25)',
                backgroundColor: 'rgba(10,5,2,0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '0.875rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
            }}>
                {/* Left: back + status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '0.375rem',
                            border: '1px solid rgba(212,175,55,0.25)',
                            backgroundColor: 'transparent',
                            color: 'rgba(212,175,55,0.55)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        &#8592; Background
                    </button>

                    {hasAnyContent ? (
                        <p style={{
                            color: 'rgba(212,175,55,0.5)',
                            fontSize: '0.8rem',
                            margin: 0,
                            fontStyle: 'italic',
                        }}>
                            Story in progress ,  you can keep editing after creation too.
                        </p>
                    ) : (
                        <p style={{
                            color: 'rgba(244,232,208,0.2)',
                            fontSize: '0.8rem',
                            margin: 0,
                            fontStyle: 'italic',
                        }}>
                            All fields optional ,  skip if you prefer.
                        </p>
                    )}
                </div>

                {/* Right: continue */}
                <button
                    onClick={handleContinue}
                    style={{
                        padding: '0.7rem 1.75rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        backgroundColor: 'var(--color-gold)',
                        color: 'var(--color-primary)',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {hasAnyContent ? 'Continue to Stats \u2192' : 'Skip to Stats \u2192'}
                </button>
            </div>
        </div>
    );
}
