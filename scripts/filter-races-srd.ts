/**
 * Filter races-data.ts to only include SRD 5.2 species
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const SRD_RACES = [
    'dragonborn',
    'dwarf',
    'elf',
    'gnome',
    'goliath',
    'halfling',
    'human',
    'orc',
    'tiefling'
];

const inputPath = resolve(process.cwd(), 'scripts/races-data.ts');
const content = readFileSync(inputPath, 'utf-8');

// Extract the RACES array
const arrayMatch = content.match(/export const RACES = (\[[\s\S]*?\n\];)/);
if (!arrayMatch) {
    console.error('❌ Could not find RACES array');
    process.exit(1);
}

// Parse the array (using eval since it's our own trusted source file)
const racesArray = eval(arrayMatch[1]);

console.log(`📊 Original: ${racesArray.length} races`);

// Filter to only SRD races
const srdRaces = racesArray.filter((race: any) => 
    SRD_RACES.includes(race.index.toLowerCase())
);

console.log(`📊 Filtered: ${srdRaces.length} SRD races`);

// Show removed races
const removed = racesArray
    .filter((race: any) => !SRD_RACES.includes(race.index.toLowerCase()))
    .map((race: any) => race.name || race.index);

console.log(`\n🗑️  Removed (${removed.length}):`);
removed.forEach(name => console.log(`   - ${name}`));

// Generate new file
const newContent = `/**
 * D&D 5E SRD 5.2 Races/Species
 * 
 * Only the following 9 species are included in the SRD 5.2:
 * Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Human, Orc, Tiefling
 * 
 * Non-SRD races have been moved to non-compliant/ folder.
 */

export const RACES = ${JSON.stringify(srdRaces, null, 2)};

export default RACES;
`;

writeFileSync(inputPath, newContent, 'utf-8');
console.log('\n✅ Updated races-data.ts with SRD-only content');
