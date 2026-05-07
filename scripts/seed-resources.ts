/**
 * Seed script for the `dnd-resources` MongoDB database.
 * Run with: npm run seed:spells
 *
 * Populates:
 *   dnd-resources.spells-abilities  ,  all spells, class abilities, racial abilities
 *   dnd-resources.items             ,  placeholder (schema only, ready for data)
 *   dnd-resources.feats             ,  placeholder (schema only, ready for data)
 */

import { MongoClient } from 'mongodb';
import { config }     from 'dotenv';
import { resolve }    from 'path';
import SPELLS_AND_ABILITIES from '../data/spells.js';
import ITEMS                from './items-data.js';

// Load .env.local (Next.js convention) so MONGODB_URI is available when
// running this script outside of the Next.js server process.
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') }); // fallback

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

/* ═══════════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════════ */

function log(msg: string)  { console.log(`  ✓  ${msg}`); }
function warn(msg: string) { console.warn(`  ⚠  ${msg}`); }

async function dropIfExists(db: ReturnType<MongoClient['db']>, name: string) {
    const cols = await db.listCollections({ name }).toArray();
    if (cols.length > 0) {
        await db.collection(name).drop();
        warn(`Dropped existing collection: ${name}`);
    }
}

/* ═══════════════════════════════════════════════════════════════════
   Seed spells-abilities
═══════════════════════════════════════════════════════════════════ */

async function seedSpellsAbilities(db: ReturnType<MongoClient['db']>) {
    const col = 'spells-abilities';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    // Normalise: guarantee array fields exist
    const docs = SPELLS_AND_ABILITIES.map(e => ({
        ...e,
        classes:    e.classes    ?? [],
        races:      e.races      ?? [],
        components: e.components ?? [],
    }));

    const result = await collection.insertMany(docs);
    log(`Inserted ${result.insertedCount} spells/abilities`);

    // ── Indexes ────────────────────────────────────────────────────
    await collection.createIndex({ name: 1 },                                 { name: 'name' });
    await collection.createIndex({ type: 1 },                                 { name: 'type' });
    await collection.createIndex({ classes: 1 },                              { name: 'classes' });
    await collection.createIndex({ races: 1 },                                { name: 'races' });
    await collection.createIndex({ level: 1 },                                { name: 'spell_level' });
    await collection.createIndex({ levelGained: 1 },                          { name: 'level_gained' });
    await collection.createIndex({ school: 1 },                               { name: 'school' });
    await collection.createIndex({ actionType: 1 },                           { name: 'action_type' });
    await collection.createIndex({ concentration: 1 },                        { name: 'concentration' });
    await collection.createIndex({ ritual: 1 },                               { name: 'ritual' });
    await collection.createIndex({ name: 'text', description: 'text' },       { name: 'text_search' });
    // Compound: character page (class abilities unlocked at a level)
    await collection.createIndex({ type: 1, classes: 1, levelGained: 1 },     { name: 'class_ability_lookup' });
    // Compound: racial abilities
    await collection.createIndex({ type: 1, races: 1, levelGained: 1 },       { name: 'racial_ability_lookup' });
    // Compound: character spell list
    await collection.createIndex({ classes: 1, level: 1 },                    { name: 'spell_class_level' });

    log('Indexes created for spells-abilities');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed items ,  full D&D 5e catalogue from items-data.ts
═══════════════════════════════════════════════════════════════════ */

async function seedItems(db: ReturnType<MongoClient['db']>) {
    const col = 'items';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(ITEMS as object[]);
    log(`Inserted ${ITEMS.length} items`);

    await collection.createIndex({ name: 1 },                            { name: 'name' });
    await collection.createIndex({ category: 1 },                        { name: 'category' });
    await collection.createIndex({ subcategory: 1 },                     { name: 'subcategory' });
    await collection.createIndex({ rarity: 1 },                          { name: 'rarity' });
    await collection.createIndex({ requiresAttunement: 1 },              { name: 'attunement' });
    await collection.createIndex({ name: 'text', description: 'text' },  { name: 'text_search' });

    log('Indexes created for items');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed feats (schema placeholder)
═══════════════════════════════════════════════════════════════════ */

async function seedFeats(db: ReturnType<MongoClient['db']>) {
    const col = 'feats';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    // Representative SRD feats ,  full data to be added later
    const sampleFeats = [
        { name: 'Alert',           prerequisite: null,          benefit: '+5 to initiative. Cannot be surprised while conscious. Enemies gain no benefit from being hidden when attacking you.' },
        { name: 'Athlete',         prerequisite: null,          benefit: '+1 STR or DEX. Climbing costs no extra movement. Standing up costs only 5 ft of movement. Running long jump only needs 5 ft run-up.' },
        { name: 'Actor',           prerequisite: null,          benefit: '+1 CHA. Advantage on Deception and Performance when trying to pass as someone else. Can mimic speech or sounds you\'ve heard.' },
        { name: 'Charger',         prerequisite: null,          benefit: 'After Dash action, bonus action melee attack (+5 dmg) or shove up to 10 ft.' },
        { name: 'Dual Wielder',    prerequisite: null,          benefit: '+1 AC while dual wielding. Can dual-wield non-Light weapons. Can draw/stow two weapons at once.' },
        { name: 'Durable',         prerequisite: null,          benefit: '+1 CON. Minimum roll when spending Hit Dice equals twice your CON modifier (min 2).' },
        { name: 'Elemental Adept', prerequisite: 'Spellcasting',benefit: 'Spells of chosen damage type ignore resistance. Treat 1s on damage dice as 2s.' },
        { name: 'Grappler',        prerequisite: 'STR 13+',     benefit: 'Advantage on attack rolls against creatures you\'ve grappled. Can pin a grappled creature (both restrained).' },
        { name: 'Great Weapon Master', prerequisite: null,      benefit: 'Heavy weapon crit or kill → bonus action attack. Take -5 attack for +10 damage.' },
        { name: 'Healer',          prerequisite: null,          benefit: 'Stabilize at 1 HP with healer\'s kit. Use healer\'s kit to heal 1d6+4+max-HD HP (once per creature per short rest).' },
        { name: 'Keen Mind',       prerequisite: null,          benefit: '+1 INT. Always know N/S/E/W and hours to sunset/sunrise. Perfect memory for past month.' },
        { name: 'Linguist',        prerequisite: null,          benefit: '+1 INT. Learn 3 languages. Can create written ciphers.' },
        { name: 'Lucky',           prerequisite: null,          benefit: '3 luck points per long rest. Spend to reroll attack/ability/saving throw ,  pick either result.' },
        { name: 'Mage Slayer',     prerequisite: null,          benefit: 'Reaction attack when adjacent creature casts. Disadvantage on concentration saves from your damage. Advantage vs spells while within 5 ft of caster.' },
        { name: 'Magic Initiate',  prerequisite: null,          benefit: 'Learn 2 cantrips and 1 1st-level spell (cast once per long rest without slot) from one class list.' },
        { name: 'Mounted Combatant', prerequisite: null,        benefit: 'Advantage vs unmounted creatures smaller than mount. Force attacks targeting mount to target you. Mount auto-succeeds DEX saves vs area effects (half dmg on fail = none; fail = half).' },
        { name: 'Observant',       prerequisite: null,          benefit: '+1 INT or WIS. If you see lips move, can lip-read. +5 to passive Perception and Insight.' },
        { name: 'Polearm Master',  prerequisite: null,          benefit: 'Bonus action attack with polearm butt (1d4). Reaction attack when creature enters your reach.' },
        { name: 'Resilient',       prerequisite: null,          benefit: '+1 to chosen ability. Proficiency in saving throws with that ability.' },
        { name: 'Ritual Caster',   prerequisite: 'INT or WIS 13+', benefit: 'Choose a class. Learn 2 rituals from that class. Can learn more rituals from spellbooks. Cast rituals as rituals only.' },
        { name: 'Savage Attacker', prerequisite: null,          benefit: 'Once per turn reroll melee damage dice and use either result.' },
        { name: 'Sentinel',        prerequisite: null,          benefit: 'Opportunity attacks stop movement. Opportunity attacks on Disengage. Reaction attack when adjacent ally is attacked.' },
        { name: 'Sharpshooter',    prerequisite: null,          benefit: 'No disadvantage at long range. Ignore half/three-quarters cover. -5 attack for +10 damage.' },
        { name: 'Shield Master',   prerequisite: null,          benefit: 'Bonus action shove when you attack. Add shield AC to DEX save vs single-target spell. No damage on successful save (instead of half).' },
        { name: 'Skilled',         prerequisite: null,          benefit: 'Proficiency in any 3 skills or tools.' },
        { name: 'Skulker',         prerequisite: 'DEX 13+',     benefit: 'Can hide when lightly obscured. Missing a ranged attack doesn\'t reveal your location. Dim light doesn\'t impose Perception disadvantage.' },
        { name: 'Spell Sniper',    prerequisite: 'Spellcasting',benefit: 'Double range of attack-roll spells. Ignore half/three-quarters cover. Learn one attack-roll cantrip.' },
        { name: 'Tavern Brawler',  prerequisite: null,          benefit: '+1 STR or CON. Improvised weapons and unarmed strikes deal 1d4. Bonus action grapple after unarmed/improvised hit.' },
        { name: 'Tough',           prerequisite: null,          benefit: '+2 HP per level (including current, retroactive).' },
        { name: 'War Caster',      prerequisite: 'Spellcasting',benefit: 'Advantage on concentration saves. Somatic components with hands full. Cast spell as opportunity attack.' },
        { name: 'Weapon Master',   prerequisite: null,          benefit: '+1 STR or DEX. Proficiency with 4 weapons of your choice.' },
    ];

    await collection.insertMany(sampleFeats);
    log(`Inserted ${sampleFeats.length} feats`);

    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ prerequisite: 1 },                   { name: 'prerequisite' });
    await collection.createIndex({ name: 'text', benefit: 'text' },     { name: 'text_search' });

    log('Indexes created for feats');
}

/* ═══════════════════════════════════════════════════════════════════
   Main
═══════════════════════════════════════════════════════════════════ */

async function main() {
    console.log('\n🗡  Seeding dnd-resources database…\n');
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log(`  Connected to: ${MONGODB_URI}\n`);

        const db = client.db('dnd-resources');

        console.log('─── spells-abilities ───────────────────────────────');
        await seedSpellsAbilities(db);

        console.log('\n─── items ──────────────────────────────────────────');
        await seedItems(db);

        console.log('\n─── feats ──────────────────────────────────────────');
        await seedFeats(db);

        console.log('\n✅  Seed complete.\n');
    } finally {
        await client.close();
    }
}

main().catch(err => { console.error('\n❌  Seed failed:', err); process.exit(1); });
