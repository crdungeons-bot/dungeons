/**
 * Script to tag all subclass-specific spells in the database
 * Run with: npx tsx scripts/tag-subclass-spells.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Master list of all subclass spells
const SUBCLASS_SPELLS: Record<string, string[]> = {
  // CLERIC DOMAINS
  "forge domain cleric": ["Identify", "Searing Smite", "Heat Metal", "Magic Weapon", "Elemental Weapon", "Protection from Energy", "Fabricate", "Wall of Fire", "Animate Objects", "Creation"],
  "grave domain cleric": ["Bane", "False Life", "Gentle Repose", "Ray of Enfeeblement", "Revivify", "Vampiric Touch", "Blight", "Death Ward", "Antilife Shell", "Raise Dead"],
  "knowledge domain cleric": ["Command", "Identify", "Augury", "Suggestion", "Nondetection", "Speak with Dead", "Arcane Eye", "Confusion", "Legend Lore", "Scrying"],
  "life domain cleric": ["Bless", "Cure Wounds", "Lesser Restoration", "Spiritual Weapon", "Beacon of Hope", "Revivify", "Death Ward", "Guardian of Faith", "Mass Cure Wounds", "Raise Dead"],
  "light domain cleric": ["Burning Hands", "Faerie Fire", "Flaming Sphere", "Scorching Ray", "Daylight", "Fireball", "Guardian of Faith", "Wall of Fire", "Flame Strike", "Scrying"],
  "nature domain cleric": ["Animal Friendship", "Speak with Animals", "Barkskin", "Spike Growth", "Plant Growth", "Wind Wall", "Dominate Beast", "Grasping Vine", "Insect Plague", "Tree Stride"],
  "tempest domain cleric": ["Fog Cloud", "Thunderwave", "Gust of Wind", "Shatter", "Call Lightning", "Sleet Storm", "Control Water", "Ice Storm", "Destructive Wave", "Insect Plague"],
  "trickery domain cleric": ["Charm Person", "Disguise Self", "Mirror Image", "Pass without Trace", "Blink", "Dispel Magic", "Dimension Door", "Polymorph", "Dominate Person", "Modify Memory"],
  "war domain cleric": ["Divine Favor", "Shield of Faith", "Magic Weapon", "Spiritual Weapon", "Crusader's Mantle", "Spirit Guardians", "Freedom of Movement", "Stoneskin", "Flame Strike", "Hold Monster"],
  
  // PALADIN OATHS
  "oath of the ancients paladin": ["Ensnaring Strike", "Speak with Animals", "Misty Step", "Moonbeam", "Plant Growth", "Protection from Energy", "Ice Storm", "Stoneskin", "Commune with Nature", "Tree Stride"],
  "oath of conquest paladin": ["Armor of Agathys", "Command", "Hold Person", "Spiritual Weapon", "Bestow Curse", "Fear", "Dominate Beast", "Stoneskin", "Cloudkill", "Dominate Person"],
  "oath of devotion paladin": ["Protection from Evil and Good", "Sanctuary", "Lesser Restoration", "Zone of Truth", "Beacon of Hope", "Dispel Magic", "Freedom of Movement", "Guardian of Faith", "Commune", "Flame Strike"],
  "oath of redemption paladin": ["Sanctuary", "Sleep", "Calm Emotions", "Hold Person", "Counterspell", "Hypnotic Pattern", "Otiluke's Resilient Sphere", "Stoneskin", "Hold Monster", "Wall of Force"],
  "oath of vengeance paladin": ["Bane", "Hunter's Mark", "Hold Person", "Misty Step", "Haste", "Protection from Energy", "Banishment", "Dimension Door", "Hold Monster", "Scrying"],
  
  // WARLOCK PATRONS
  "archfey warlock": ["Faerie Fire", "Sleep", "Calm Emotions", "Phantasmal Force", "Blink", "Plant Growth", "Dominate Beast", "Greater Invisibility", "Dominate Person", "Seeming"],
  "celestial warlock": ["Cure Wounds", "Guiding Bolt", "Flaming Sphere", "Lesser Restoration", "Daylight", "Revivify", "Guardian of Faith", "Wall of Fire", "Flame Strike", "Greater Restoration"],
  "fiend warlock": ["Burning Hands", "Command", "Blindness/Deafness", "Scorching Ray", "Fireball", "Stinking Cloud", "Fire Shield", "Wall of Fire", "Flame Strike", "Hallow"],
  "great old one warlock": ["Dissonant Whispers", "Hideous Laughter", "Detect Thoughts", "Phantasmal Force", "Clairvoyance", "Hunger of Hadar", "Confusion", "Evard's Black Tentacles", "Modify Memory", "Telekinesis"],
  "hexblade warlock": ["Shield", "Wrathful Smite", "Blur", "Branding Smite", "Blink", "Elemental Weapon", "Phantasmal Killer", "Staggering Smite", "Banishing Smite", "Cone of Cold"],
  
  // DRUID CIRCLE OF THE LAND
  "circle of the land (arctic) druid": ["Hold Person", "Spike Growth", "Sleet Storm", "Slow", "Freedom of Movement", "Ice Storm", "Commune with Nature", "Cone of Cold"],
  "circle of the land (coast) druid": ["Mirror Image", "Misty Step", "Water Breathing", "Water Walk", "Control Water", "Freedom of Movement", "Conjure Elemental", "Scrying"],
  "circle of the land (desert) druid": ["Blur", "Silence", "Create Food and Water", "Protection from Energy", "Blight", "Hallucinatory Terrain", "Insect Plague", "Wall of Stone"],
  "circle of the land (forest) druid": ["Barkskin", "Spider Climb", "Call Lightning", "Plant Growth", "Divination", "Freedom of Movement", "Commune with Nature", "Tree Stride"],
  "circle of the land (grassland) druid": ["Invisibility", "Pass without Trace", "Daylight", "Haste", "Divination", "Freedom of Movement", "Dream", "Insect Plague"],
  "circle of the land (mountain) druid": ["Spider Climb", "Spike Growth", "Lightning Bolt", "Meld into Stone", "Stone Shape", "Stoneskin", "Passwall", "Wall of Stone"],
  "circle of the land (swamp) druid": ["Acid Arrow", "Darkness", "Water Walk", "Stinking Cloud", "Freedom of Movement", "Locate Creature", "Insect Plague", "Scrying"],
};

console.log('\n🏷️  Tagging subclass-specific spells...\n');

// Read the spells file
const spellsPath = resolve(process.cwd(), 'data', 'spells.ts');
let content = readFileSync(spellsPath, 'utf-8');

// Build a reverse mapping: spell name => array of subclasses
const spellToSubclasses: Record<string, Set<string>> = {};

for (const [subclass, spells] of Object.entries(SUBCLASS_SPELLS)) {
  for (const spell of spells) {
    if (!spellToSubclasses[spell]) {
      spellToSubclasses[spell] = new Set();
    }
    spellToSubclasses[spell].add(subclass);
  }
}

console.log(`📊 Total unique spells to tag: ${Object.keys(spellToSubclasses).length}`);
console.log(`📊 Total subclass tags to apply: ${Object.values(SUBCLASS_SPELLS).flat().length}\n`);

// Tag each spell
let tagged = 0;
let notFound = 0;
const notFoundSpells: string[] = [];

for (const [spellName, subclasses] of Object.entries(spellToSubclasses)) {
  const subclassArray = Array.from(subclasses).sort();
  const subclassesStr = JSON.stringify(subclassArray);
  
  // Try to find and update the spell entry
  // Pattern: find "name": "SpellName" and add/update subclasses field
  const namePattern = `"name": "${spellName}"`;
  const index = content.indexOf(namePattern);
  
  if (index === -1) {
    notFound++;
    notFoundSpells.push(spellName);
    console.log(`  ⚠️  Could not find spell: ${spellName}`);
    continue;
  }
  
  // Find the opening brace of this spell object
  let braceStart = content.lastIndexOf('{', index);
  // Find the closing brace of this spell object
  let braceCount = 1;
  let braceEnd = braceStart + 1;
  while (braceCount > 0 && braceEnd < content.length) {
    if (content[braceEnd] === '{') braceCount++;
    if (content[braceEnd] === '}') braceCount--;
    braceEnd++;
  }
  
  const spellBlock = content.substring(braceStart, braceEnd);
  
  // Check if subclasses field already exists
  if (spellBlock.includes('"subclasses":')) {
    // Update existing subclasses field
    const updatedBlock = spellBlock.replace(
      /"subclasses":\s*\[.*?\]/,
      `"subclasses": ${subclassesStr}`
    );
    content = content.substring(0, braceStart) + updatedBlock + content.substring(braceEnd);
  } else {
    // Add subclasses field after classes field
    const classesMatch = spellBlock.match(/"classes":\s*\[.*?\]/);
    if (classesMatch) {
      const insertPoint = braceStart + spellBlock.indexOf(classesMatch[0]) + classesMatch[0].length;
      const insertion = `,\n\t\t"subclasses": ${subclassesStr}`;
      content = content.substring(0, insertPoint) + insertion + content.substring(insertPoint);
    }
  }
  
  tagged++;
  if (tagged % 10 === 0) {
    console.log(`  ✓  Tagged ${tagged} spells...`);
  }
}

// Write the updated file
writeFileSync(spellsPath, content, 'utf-8');

console.log(`\n✅  Tagging complete!`);
console.log(`   Successfully tagged: ${tagged} spells`);
console.log(`   Not found: ${notFound} spells`);

if (notFoundSpells.length > 0) {
  console.log(`\n⚠️  Spells not found in database:`);
  notFoundSpells.forEach(spell => console.log(`   - ${spell}`));
}

console.log('\n');
