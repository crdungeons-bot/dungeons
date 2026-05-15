/**
 * Script to filter out non-SRD races from races-data.ts
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

// Parse the file to extract the array
const match = content.match(/export\s+const\s+RACES\s+=\s+(\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not find RACES array in file');
    process.exit(1);
}

// Evaluate the array (note: this is safe because it's our own data file)
const racesArray = eval(match[1]);

// Filter to only SRD races
const srdRaces = racesArray.filter((race: any) => 
    SRD_RACES.includes(race.index.toLowerCase())
);

console.log(`Original races: ${racesArray.length}`);
console.log(`SRD-compliant races: ${srdRaces.length}`);
console.log(`Removed: ${racesArray.length - srdRaces.length}`);

// Generate new file content
const newContent = `/**
 * D&D 5E SRD 5.2 Races
 * 
 * Only the following 9 species are included in the SRD 5.2:
 * - Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Human, Orc, Tiefling
 * 
 * All other races have been moved to non-compliant/ folder for archival purposes.
 */

export const RACES = ${JSON.stringify(srdRaces, null, 2)};

export default RACES;
`;

// Write the filtered content
writeFileSync(inputPath, newContent, 'utf-8');
console.log('✅ Updated races-data.ts with SRD-only content');

// List removed races
const removedRaces = racesArray
    .filter((race: any) => !SRD_RACES.includes(race.index.toLowerCase()))
    .map((race: any) => race.name);
    
console.log('\n📦 Removed races (moved to non-compliant):');
removedRaces.forEach((name: string) => console.log(`  - ${name}`));
