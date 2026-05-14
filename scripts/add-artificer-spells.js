/**
 * Script to add "artificer" to the classes array for all Artificer spells
 * Run with: node scripts/add-artificer-spells.js
 */

const fs = require('fs');
const path = require('path');

// Complete Artificer spell list from TCoE
const ARTIFICER_SPELLS = [
    // Cantrips (0)
    'Acid Splash', 'Dancing Lights', 'Fire Bolt', 'Guidance', 'Light', 
    'Mage Hand', 'Mending', 'Message', 'Poison Spray', 'Prestidigitation',
    'Ray of Frost', 'Resistance', 'Shocking Grasp', 'Spare the Dying', 'Thorn Whip',
    
    // 1st Level
    'Alarm', 'Cure Wounds', 'Disguise Self', 'Expeditious Retreat', 'Faerie Fire',
    'False Life', 'Feather Fall', 'Grease', 'Identify', 'Jump',
    'Longstrider', 'Purify Food and Drink', 'Sanctuary', 'Snare',
    
    // 2nd Level
    'Aid', 'Alter Self', 'Arcane Lock', 'Blur', 'Continual Flame',
    'Darkvision', 'Enhance Ability', 'Enlarge/Reduce', 'Heat Metal', 'Invisibility',
    'Lesser Restoration', 'Levitate', 'Magic Mouth', 'Magic Weapon', 'Protection from Poison',
    'Pyrotechnics', 'Rope Trick', 'See Invisibility', 'Skywrite', 'Spider Climb', 'Web',
    
    // 3rd Level
    'Blink', 'Catnap', 'Create Food and Water', 'Dispel Magic', 'Elemental Weapon',
    'Flame Arrows', 'Fly', 'Glyph of Warding', 'Haste', 'Protection from Energy',
    'Revivify', 'Tiny Servant', 'Water Breathing', 'Water Walk',
    
    // 4th Level
    'Arcane Eye', 'Fabricate', 'Freedom of Movement', 'Leomund\'s Secret Chest',
    'Mordenkainen\'s Faithful Hound', 'Mordenkainen\'s Private Sanctum',
    'Otiluke\'s Resilient Sphere', 'Stone Shape', 'Stoneskin', 'Summon Construct',
    
    // 5th Level
    'Animate Objects', 'Bigby\'s Hand', 'Creation', 'Greater Restoration',
    'Skill Empowerment', 'Transmute Rock', 'Wall of Stone',
];

// Create a Set for faster lookups (case-insensitive)
const artificerSpellsSet = new Set(ARTIFICER_SPELLS.map(s => s.toLowerCase()));

// Read the file
const filePath = path.join(__dirname, '../data/spells.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Track changes
let changesCount = 0;
const spellsFound = new Set();
const spellsNotFound = new Set(ARTIFICER_SPELLS);

// Split into lines for processing
const lines = content.split('\n');
let inSpell = false;
let currentSpellName = null;
let spellStartLine = 0;
let spellContent = [];

const processedLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is the start of a spell object
    const nameMatch = line.match(/^\s*{\s*$/);
    if (nameMatch && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const nameValueMatch = nextLine.match(/^\s*"name":\s*"([^"]+)"/);
        if (nameValueMatch) {
            inSpell = true;
            currentSpellName = nameValueMatch[1];
            spellStartLine = i;
            spellContent = [line];
            continue;
        }
    }
    
    if (inSpell) {
        spellContent.push(line);
        
        // Check if this is the end of the spell object
        if (line.match(/^\s*},?\s*$/)) {
            inSpell = false;
            
            // Check if this spell is in the Artificer list
            if (currentSpellName && artificerSpellsSet.has(currentSpellName.toLowerCase())) {
                // Find the classes line
                let classesLineIndex = -1;
                for (let j = 0; j < spellContent.length; j++) {
                    if (spellContent[j].includes('"classes":')) {
                        classesLineIndex = j;
                        break;
                    }
                }
                
                if (classesLineIndex >= 0) {
                    const classesLine = spellContent[classesLineIndex];
                    
                    // Check if artificer is already in the list
                    if (!classesLine.includes('"artificer"')) {
                        // Add artificer to the classes array
                        const updatedLine = classesLine.replace(/\["([^"]+)"/, '["artificer", "$1"');
                        spellContent[classesLineIndex] = updatedLine;
                        changesCount++;
                        spellsFound.add(currentSpellName);
                        spellsNotFound.delete(currentSpellName);
                    } else {
                        spellsFound.add(currentSpellName);
                        spellsNotFound.delete(currentSpellName);
                    }
                }
            }
            
            // Add all spell content to processed lines
            processedLines.push(...spellContent);
            spellContent = [];
            currentSpellName = null;
            continue;
        }
    } else {
        processedLines.push(line);
    }
}

// Write the updated content back
const updatedContent = processedLines.join('\n');
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log(`\n✅ Updated ${changesCount} spells with "artificer" class`);
console.log(`\n📊 Found ${spellsFound.size} out of ${ARTIFICER_SPELLS.length} Artificer spells`);

if (spellsNotFound.size > 0) {
    console.log(`\n⚠️  Could not find ${spellsNotFound.size} spells:`);
    Array.from(spellsNotFound).sort().forEach(spell => console.log(`   - ${spell}`));
}

console.log('\n✨ Done! Run `npm run seed:spells` to update the database.');
