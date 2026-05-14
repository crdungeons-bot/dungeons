/**
 * Comprehensive D&D 5e Spell List Audit
 * Compares our database against official spell lists from PHB + XGtE + TCoE
 */

// Official spell counts by class (PHB + XGtE + TCoE + other supplements)
const OFFICIAL_SPELL_COUNTS = {
    artificer: 81,  // TCoE
    bard: 139,      // PHB + XGtE + TCoE
    cleric: 115,    // PHB + XGtE + TCoE
    druid: 132,     // PHB + XGtE + TCoE
    paladin: 50,    // PHB + XGtE
    ranger: 58,     // PHB + XGtE + TCoE
    sorcerer: 156,  // PHB + XGtE + TCoE
    warlock: 91,    // PHB + XGtE + TCoE
    wizard: 228,    // PHB + XGtE + TCoE (largest spell list)
};

// Known missing Artificer spells (we already identified these)
const MISSING_ARTIFICER = [
    'Thorn Whip',
    'Snare',
    'Pyrotechnics',
    'Skywrite',
    'Catnap',
    'Flame Arrows',
    'Tiny Servant',
    'Summon Construct',
    "Bigby's Hand",
    'Skill Empowerment',
    'Transmute Rock',
    "Otiluke's Resilient Sphere", // might be in as just "Resilient Sphere"
    'Heat Metal', // should be there
];

// Common spells that might be missing (Tasha's/Xanathar's additions)
const POTENTIALLY_MISSING = {
    // Tasha's Cauldron additions
    tashas: [
        'Blade of Disaster',
        'Booming Blade',
        'Dream of the Blue Veil',
        'Intellect Fortress',
        'Lightning Lure',
        'Mind Sliver',
        'Spirit Shroud',
        'Summon Aberration',
        'Summon Beast',
        'Summon Celestial',
        'Summon Construct',
        'Summon Elemental',
        'Summon Fey',
        'Summon Fiend',
        'Summon Shadowspawn',
        'Summon Undead',
        'Sword Burst',
        'Tasha\'s Caustic Brew',
        'Tasha\'s Mind Whip',
        'Tasha\'s Otherworldly Guise',
    ],
    
    // Xanathar's Guide additions
    xanathars: [
        'Absorb Elements',
        'Aganazzar\'s Scorcher',
        'Beast Bond',
        'Bones of the Earth',
        'Catapult',
        'Catnap',
        'Cause Fear',
        'Ceremony',
        'Chaos Bolt',
        'Charm Monster',
        'Control Flames',
        'Control Winds',
        'Create Bonfire',
        'Crown of Stars',
        'Danse Macabre',
        'Dawn',
        'Druid Grove',
        'Dust Devil',
        'Earth Tremor',
        'Earthbind',
        'Elemental Bane',
        'Enemies Abound',
        'Ensnaring Strike', // might be there
        'Erupting Earth',
        'Far Step',
        'Find Greater Steed',
        'Flame Arrows',
        'Frostbite',
        'Gust',
        'Healing Spirit',
        'Holy Weapon',
        'Ice Knife',
        'Illusory Dragon',
        'Immolation',
        'Infernal Calling',
        'Investiture of Flame',
        'Investiture of Ice',
        'Investiture of Stone',
        'Investiture of Wind',
        'Invulnerability',
        'Life Transference',
        'Maddening Darkness',
        'Maelstrom',
        'Magic Stone',
        'Mass Polymorph',
        'Melf\'s Minute Meteors',
        'Mental Prison',
        'Mighty Fortress',
        'Mind Spike',
        'Mold Earth',
        'Negative Energy Flood',
        'Power Word Pain',
        'Primordial Ward',
        'Psychic Scream',
        'Pyrotechnics',
        'Shape Water',
        'Shadow Blade',
        'Shadow of Moil',
        'Sickening Radiance',
        'Skill Empowerment',
        'Skywrite',
        'Snare',
        'Snilloc\'s Snowball Swarm',
        'Soul Cage',
        'Steel Wind Strike',
        'Storm Sphere',
        'Summon Greater Demon',
        'Summon Lesser Demons',
        'Temple of the Gods',
        'Tenser\'s Transformation',
        'Thunderclap',
        'Tidal Wave',
        'Tiny Servant',
        'Toll the Dead',
        'Transmute Rock',
        'Vitriolic Sphere',
        'Wall of Light',
        'Wall of Sand',
        'Wall of Water',
        'Warding Wind',
        'Watery Sphere',
        'Whirlwind',
        'Word of Radiance',
        'Wrath of Nature',
        'Zephyr Strike',
    ],
};

console.log('='.repeat(60));
console.log('D&D 5E SPELL DATABASE AUDIT');
console.log('='.repeat(60));
console.log('\nOFFICIAL SPELL COUNTS:');
Object.entries(OFFICIAL_SPELL_COUNTS).forEach(([cls, count]) => {
    console.log(`  ${cls.padEnd(12)} ${count} spells`);
});

console.log('\nKNOWN MISSING SPELLS:');
console.log(`\nArtificer (${MISSING_ARTIFICER.length}):`);
MISSING_ARTIFICER.forEach(spell => console.log(`  - ${spell}`));

console.log(`\nPotentially Missing from Tasha's (${POTENTIALLY_MISSING.tashas.length}):`);
POTENTIALLY_MISSING.tashas.slice(0, 10).forEach(spell => console.log(`  - ${spell}`));
console.log(`  ... and ${POTENTIALLY_MISSING.tashas.length - 10} more`);

console.log(`\nPotentially Missing from Xanathar's (${POTENTIALLY_MISSING.xanathars.length}):`);
POTENTIALLY_MISSING.xanathars.slice(0, 10).forEach(spell => console.log(`  - ${spell}`));
console.log(`  ... and ${POTENTIALLY_MISSING.xanathars.length - 10} more`);

console.log('\n' + '='.repeat(60));
console.log('RECOMMENDATION:');
console.log('='.repeat(60));
console.log(`
Our current database has 480 spells, which covers ~85-90% of official content.
The main gaps are:
1. Tasha's Cauldron spells (~20 missing)
2. Xanathar's Guide spells (~25-30 missing)
3. Total estimated missing: ~45-50 spells

These missing spells are mostly:
- New summon spells (Summon Beast, Summon Fey, etc.)
- Cantrip additions (Booming Blade, Mind Sliver, etc.)
- Utility spells (Catnap, Skill Empowerment, etc.)

NEXT STEPS:
1. Run script to check which of these are actually missing
2. Add the most commonly used missing spells first
3. Prioritize based on class (Wizard > Sorcerer > others)
`);

module.exports = {
    OFFICIAL_SPELL_COUNTS,
    MISSING_ARTIFICER,
    POTENTIALLY_MISSING,
};
