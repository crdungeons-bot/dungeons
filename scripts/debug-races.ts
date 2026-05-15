// Debug script to see which races are being filtered
import RACES from './races-data.js';

const SRD_RACES = ['dragonborn', 'dwarf', 'elf', 'gnome', 'goliath', 'halfling', 'human', 'orc', 'tiefling'];

console.log(`\n📊 Total races in file: ${RACES.length}\n`);

RACES.forEach((race, i) => {
    const index = race.index || race.Index || '';
    const name = race.name || 'Unknown';
    const isSRD = SRD_RACES.includes(index.toLowerCase());
    
    if (isSRD || index.toLowerCase().includes('goliath') || index.toLowerCase().includes('orc')) {
        console.log(`${isSRD ? '✅' : '❌'} [${i}] ${name} (index: "${index}")`);
    }
});

console.log('\n📋 Expected SRD races:');
SRD_RACES.forEach(r => {
    const found = RACES.some(race => (race.index || '').toLowerCase() === r);
    console.log(`${found ? '✅' : '❌'} ${r}`);
});
