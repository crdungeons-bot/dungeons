'use client';

import type { SpellSlots, PactMagicSlots } from '@/data/spell-slots';
import { getSpellcastingAbility } from '@/data/spell-slots';

type Stats = {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
};

type SpellcastingStatsProps = {
    spellSlots: SpellSlots | PactMagicSlots | null;
    charClass: string;
    charLevel: number;
    stats: Stats;
    isPactMagic?: boolean;
};

function profBonus(level: number): number {
    return Math.ceil(level / 4) + 1;
}

function getModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

/**
 * Simple, text-based display of spellcasting stats
 * Shows spell slots, spell save DC, and spell attack bonus
 */
export default function SpellcastingStats({ 
    spellSlots, 
    charClass, 
    charLevel, 
    stats,
    isPactMagic = false 
}: SpellcastingStatsProps) {
    if (!spellSlots) {
        return null;
    }

    const hasStats = stats && Object.keys(stats).length > 0;
    
    // Calculate spellcasting stats
    const proficiencyBonus = profBonus(charLevel);
    const spellcastingAbility = getSpellcastingAbility(charClass);
    
    let spellcastingMod = 0;
    if (hasStats && spellcastingAbility) {
        spellcastingMod = getModifier(stats[spellcastingAbility]);
    }
    
    const spellSaveDC = 8 + proficiencyBonus + spellcastingMod;
    const spellAttackBonus = proficiencyBonus + spellcastingMod;
    const spellAttackStr = spellAttackBonus >= 0 ? `+${spellAttackBonus}` : `${spellAttackBonus}`;

    // Format spell slots
    let slotsDisplay = '';
    if (isPactMagic && 'slots' in spellSlots) {
        const pactSlots = spellSlots as PactMagicSlots;
        slotsDisplay = `${pactSlots.slots}×${pactSlots.level}${['st','nd','rd','th','th'][pactSlots.level - 1] || 'th'} (Pact Magic)`;
    } else {
        const standardSlots = spellSlots as SpellSlots;
        const slotLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
        const availableSlots = slotLevels
            .filter(level => standardSlots[level] > 0)
            .map(level => `${level}${['st','nd','rd','th','th','th','th','th','th'][level - 1]}: ${standardSlots[level]}`)
            .join(', ');
        slotsDisplay = availableSlots || 'None yet';
    }

    return (
        <div style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
        }}>
            <p style={{
                margin: '0 0 0.75rem',
                fontSize: '0.6rem',
                fontWeight: '800',
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: 'rgba(212,175,55,0.5)',
            }}>
                Spellcasting
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '0.5rem 1rem',
                fontSize: '0.85rem',
                color: 'rgba(244,232,208,0.75)',
            }}>
                {/* Spell Slots */}
                <div style={{ fontWeight: '600', color: 'rgba(212,175,55,0.7)' }}>
                    Slots:
                </div>
                <div>
                    {slotsDisplay}
                </div>

                {/* Spell Save DC */}
                {hasStats && spellcastingAbility && (
                    <>
                        <div style={{ fontWeight: '600', color: 'rgba(212,175,55,0.7)' }}>
                            Save DC:
                        </div>
                        <div style={{ fontWeight: '700', color: '#fff' }}>
                            {spellSaveDC}
                        </div>

                        {/* Spell Attack */}
                        <div style={{ fontWeight: '600', color: 'rgba(212,175,55,0.7)' }}>
                            Spell Attack:
                        </div>
                        <div style={{ fontWeight: '700', color: '#fff' }}>
                            {spellAttackStr}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
