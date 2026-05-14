/**
 * Check which spells from Xanathar's and Tasha's are actually missing
 * Run with: node scripts/check-missing-spells.js
 */

const fs = require('fs');
const path = require('path');

// Read the spells file
const spellsPath = path.join(__dirname, '../data/spells.ts');
const spellsContent = fs.readFileSync(spellsPath, 'utf8');

// Extract all spell names from the file
const spellNames = new Set();
const nameMatches = spellsContent.matchAll(/^\s*"name":\s*"([^"]+)"/gm);
for (const match of nameMatches) {
    spellNames.add(match[1].toLowerCase());
}

console.log(`Found ${spellNames.size} spells in database\n`);

// High-priority missing spells (most commonly used)
const HIGH_PRIORITY_SPELLS = [
    // Tasha's additions
    { name: 'Booming Blade', level: 0, classes: ['sorcerer', 'warlock', 'wizard'] },
    { name: 'Green-Flame Blade', level: 0, classes: ['sorcerer', 'warlock', 'wizard'] },
    { name: 'Lightning Lure', level: 0, classes: ['sorcerer', 'warlock', 'wizard'] },
    { name: 'Mind Sliver', level: 0, classes: ['sorcerer', 'warlock', 'wizard'] },
    { name: 'Sword Burst', level: 0, classes: ['sorcerer', 'warlock', 'wizard'] },
    
    // Xanathar's cantrips
    { name: 'Toll the Dead', level: 0, classes: ['cleric', 'warlock', 'wizard'] },
    { name: 'Word of Radiance', level: 0, classes: ['cleric'] },
    { name: 'Create Bonfire', level: 0, classes: ['druid', 'sorcerer', 'warlock', 'wizard'] },
    { name: 'Frostbite', level: 0, classes: ['druid', 'sorcerer', 'warlock', 'wizard'] },
    { name: 'Thunderclap', level: 0, classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'] },
    { name: 'Gust', level: 0, classes: ['druid', 'sorcerer', 'wizard'] },
    { name: 'Mold Earth', level: 0, classes: ['druid', 'sorcerer', 'wizard'] },
    { name: 'Shape Water', level: 0, classes: ['druid', 'sorcerer', 'wizard'] },
    { name: 'Control Flames', level: 0, classes: ['druid', 'sorcerer', 'wizard'] },
    { name: 'Magic Stone', level: 0, classes: ['druid', 'warlock'] },
    
    // 1st level
    { name: 'Absorb Elements', level: 1, classes: ['artificer', 'druid', 'ranger', 'sorcerer', 'wizard'] },
    { name: 'Cause Fear', level: 1, classes: ['warlock', 'wizard'] },
    { name: 'Chaos Bolt', level: 1, classes: ['sorcerer'] },
    { name: 'Ice Knife', level: 1, classes: ['druid', 'sorcerer', 'wizard'] },
    { name: 'Snare', level: 1, classes: ['artificer', 'druid', 'ranger', 'wizard'] },
    { name: 'Zephyr Strike', level: 1, classes: ['ranger'] },
    
    // 2nd level
    { name: 'Shadow Blade', level: 2, classes: ['sorcerer', 'warlock', 'wizard'] },
    { name: 'Healing Spirit', level: 2, classes: ['druid', 'ranger'] },
    { name: 'Mind Spike', level: 2, classes: ['sorcerer', 'warlock', 'wizard'] },
    
    // 3rd level
    { name: 'Catnap', level: 3, classes: ['artificer', 'bard', 'sorcerer', 'wizard'] },
    { name: 'Flame Arrows', level: 3, classes: ['artificer', 'druid', 'ranger', 'sorcerer', 'wizard'] },
    { name: 'Tiny Servant', level: 3, classes: ['artificer', 'wizard'] },
    
    // 4th level
    { name: 'Summon Construct', level: 4, classes: ['artificer', 'wizard'] },
    
    // 5th level+
    { name: 'Skill Empowerment', level: 5, classes: ['artificer', 'bard', 'sorcerer', 'wizard'] },
    { name: 'Steel Wind Strike', level: 5, classes: ['ranger', 'wizard'] },
];

// Check which ones are missing
const missing = [];
const found = [];

for (const spell of HIGH_PRIORITY_SPELLS) {
    const normalizedName = spell.name.toLowerCase();
    
    // Check various name formats
    const variations = [
        normalizedName,
        normalizedName.replace(/'/g, ''),
        normalizedName.replace(/'/g, "'"),
        normalizedName.replace(/-/g, ' '),
    ];
    
    const exists = variations.some(v => spellNames.has(v));
    
    if (exists) {
        found.push(spell.name);
    } else {
        missing.push(spell);
    }
}

console.log('HIGH-PRIORITY SPELL CHECK');
console.log('='.repeat(60));
console.log(`\n✅ Found: ${found.length}/${HIGH_PRIORITY_SPELLS.length}`);
console.log(`❌ Missing: ${missing.length}/${HIGH_PRIORITY_SPELLS.length}\n`);

if (missing.length > 0) {
    console.log('MISSING SPELLS:');
    console.log('='.repeat(60));
    
    // Group by level
    const byLevel = {};
    missing.forEach(spell => {
        if (!byLevel[spell.level]) byLevel[spell.level] = [];
        byLevel[spell.level].push(spell);
    });
    
    Object.keys(byLevel).sort((a, b) => Number(a) - Number(b)).forEach(level => {
        console.log(`\nLevel ${level === '0' ? 'Cantrip' : level}:`);
        byLevel[level].forEach(spell => {
            console.log(`  - ${spell.name} (${spell.classes.join(', ')})`);
        });
    });
}

if (found.length > 0) {
    console.log(`\n\n✅ Already in database: ${found.slice(0, 10).join(', ')}${found.length > 10 ? ` ... and ${found.length - 10} more` : ''}`);
}

console.log('\n' + '='.repeat(60));
console.log('RECOMMENDATION:');
console.log('='.repeat(60));
console.log(`
Add the ${missing.length} missing high-priority spells to reach ~95% coverage.
These are the most commonly used spells from Xanathar's and Tasha's.

To add them:
1. Create spell entries following the existing format in data/spells.ts
2. Run npm run seed:spells to update the database
`);
