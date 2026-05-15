/**
 * Seed script for the `dnd-resources` MongoDB database.
 * Run with: npm run seed:spells
 *
 * Populates:
 *   dnd-resources.spells-abilities ,   all spells, class abilities, racial abilities
 *   dnd-resources.items            ,   placeholder (schema only, ready for data)
 *   dnd-resources.feats            ,   placeholder (schema only, ready for data)
 */

import { MongoClient } from 'mongodb';
import { config }     from 'dotenv';
import { resolve }    from 'path';
import SPELLS_AND_ABILITIES from '../data/spells.js';
import ITEMS                from './items-data.js';
import { FEATS }            from './feats-data.js';
import RACES                from './races-data.js';
import SUBRACES             from './subraces-data.js';
import CLASSES_COMPLETE      from './classes-complete-data.js';
import SUBCLASSES_COMPLETE   from './subclasses-complete-data.js';
import { BACKGROUNDS_2024 } from './backgrounds-data-2024.js';

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
        subclasses: e.subclasses ?? [],
        components: e.components ?? [],
    }));

    const result = await collection.insertMany(docs);
    log(`Inserted ${result.insertedCount} spells/abilities`);

    // ── Indexes ────────────────────────────────────────────────────
    await collection.createIndex({ name: 1 },                                 { name: 'name' });
    await collection.createIndex({ type: 1 },                                 { name: 'type' });
    await collection.createIndex({ classes: 1 },                              { name: 'classes' });
    await collection.createIndex({ races: 1 },                                { name: 'races' });
    await collection.createIndex({ subclasses: 1 },                           { name: 'subclasses' });
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
    // Compound: subclass spell list
    await collection.createIndex({ subclasses: 1, level: 1 },                 { name: 'spell_subclass_level' });

    log('Indexes created for spells-abilities');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed items,   full D&D 5e catalogue from items-data.ts
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

    await collection.insertMany(FEATS);
    log(`Inserted ${FEATS.length} feats`);

    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ prerequisite: 1 },                   { name: 'prerequisite' });
    await collection.createIndex({ name: 'text', benefit: 'text' },     { name: 'text_search' });

    log('Indexes created for feats');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed races
═══════════════════════════════════════════════════════════════════ */

async function seedRaces(db: ReturnType<MongoClient['db']>) {
    const col = 'races';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    // SRD 5.2 includes these 9 species (Note: using half-orc until full Orc data is added)
    const SRD_RACES = ['dragonborn', 'dwarf', 'elf', 'gnome', 'goliath', 'halfling', 'human', 'orc', 'half-orc', 'tiefling'];
    const srdRaces = RACES.filter((race: any) => {
        const index = race.index || race.Index || '';
        return SRD_RACES.includes(index.toLowerCase());
    });

    console.log(`  📊 Filtered ${RACES.length} → ${srdRaces.length} SRD races`);
    console.log(`  📋 Selected: ${srdRaces.map((r: any) => r.name || r.index).join(', ')}`);
    
    const result = await collection.insertMany(srdRaces as object[]);
    log(`Inserted ${result.insertedCount} races (SRD 5.2 compliant)`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ size: 1 },                           { name: 'size' });
    await collection.createIndex({ 'subraces.index': 1 },               { name: 'subrace_index' });
    await collection.createIndex({ name: 'text', alignment: 'text' },   { name: 'text_search' });

    log('Indexes created for races');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed subraces
═══════════════════════════════════════════════════════════════════ */

async function seedSubraces(db: ReturnType<MongoClient['db']>) {
    const col = 'subraces';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(SUBRACES as object[]);
    log(`Inserted ${SUBRACES.length} subraces`);

    await collection.createIndex({ index: 1 },                           { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                            { name: 'name' });
    await collection.createIndex({ race: 1 },                            { name: 'race' });
    await collection.createIndex({ race: 1, name: 1 },                   { name: 'race_name', unique: true });
    await collection.createIndex({ source: 1 },                          { name: 'source' });
    await collection.createIndex({ name: 'text', desc: 'text' },         { name: 'text_search' });

    log('Indexes created for subraces');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed classes
═══════════════════════════════════════════════════════════════════ */

async function seedClasses(db: ReturnType<MongoClient['db']>) {
    const col = 'classes';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(CLASSES_COMPLETE as object[]);
    log(`Inserted ${CLASSES_COMPLETE.length} classes with comprehensive feature data`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name', unique: true });
    await collection.createIndex({ hit_die: 1 },                        { name: 'hit_die' });
    await collection.createIndex({ 'sourcebook.name': 1 },              { name: 'sourcebook' });
    await collection.createIndex({ name: 'text' },                      { name: 'text_search' });
    // Index for querying features by level
    await collection.createIndex({ 'features_by_level': 1 },            { name: 'features_by_level' });

    log('Indexes created for classes');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed subclasses
═══════════════════════════════════════════════════════════════════ */

async function seedSubclasses(db: ReturnType<MongoClient['db']>) {
    const col = 'subclasses';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    // New structure: already an array of complete subclass documents
    await collection.insertMany(SUBCLASSES_COMPLETE as object[]);
    log(`Inserted ${SUBCLASSES_COMPLETE.length} subclasses with comprehensive feature data`);

    // Indexes for efficient querying
    await collection.createIndex({ class: 1 },                           { name: 'class' });
    await collection.createIndex({ name: 1 },                            { name: 'name' });
    await collection.createIndex({ subclass_level: 1 },                  { name: 'subclass_level' });
    await collection.createIndex({ class: 1, name: 1 },                  { name: 'class_name', unique: true });
    await collection.createIndex({ 'sourcebook.name': 1 },               { name: 'sourcebook' });
    await collection.createIndex({ name: 'text', description: 'text' },  { name: 'text_search' });
    // Index for querying features by level
    await collection.createIndex({ 'features_by_level': 1 },             { name: 'features_by_level' });

    log('Indexes created for subclasses');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed backgrounds
═══════════════════════════════════════════════════════════════════ */

async function seedBackgrounds(db: ReturnType<MongoClient['db']>) {
    const col = 'backgrounds';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(BACKGROUNDS_2024 as object[]);
    log(`Inserted ${BACKGROUNDS_2024.length} backgrounds (2024 5.5e rules)`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ 'ability_scores': 1 },               { name: 'ability_scores' });
    await collection.createIndex({ 'feat.name': 1 },                    { name: 'feat_name' });
    await collection.createIndex({ name: 'text', desc: 'text' },        { name: 'text_search' });

    log('Indexes created for backgrounds');
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

        console.log('\n─── races ──────────────────────────────────────────');
        await seedRaces(db);

        console.log('\n─── subraces ───────────────────────────────────────');
        await seedSubraces(db);

        console.log('\n─── classes ────────────────────────────────────────');
        await seedClasses(db);

        console.log('\n─── subclasses ─────────────────────────────────────');
        await seedSubclasses(db);

        console.log('\n─── backgrounds ────────────────────────────────────');
        await seedBackgrounds(db);

        console.log('\n✅  Seed complete.\n');
    } finally {
        await client.close();
    }
}

main().catch(err => { console.error('\n❌  Seed failed:', err); process.exit(1); });
