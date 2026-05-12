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
import CLASSES              from './classes-data.js';
import SUBCLASSES_DATA      from './subclasses-data.js';
import { STATIC_BACKGROUNDS } from './backgrounds-data.js';

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

    await collection.insertMany(RACES as object[]);
    log(`Inserted ${RACES.length} races`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ size: 1 },                           { name: 'size' });
    await collection.createIndex({ name: 'text', alignment: 'text' },   { name: 'text_search' });

    log('Indexes created for races');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed classes
═══════════════════════════════════════════════════════════════════ */

async function seedClasses(db: ReturnType<MongoClient['db']>) {
    const col = 'classes';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(CLASSES as object[]);
    log(`Inserted ${CLASSES.length} classes`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ hit_die: 1 },                        { name: 'hit_die' });
    await collection.createIndex({ name: 'text' },                      { name: 'text_search' });

    log('Indexes created for classes');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed subclasses
═══════════════════════════════════════════════════════════════════ */

async function seedSubclasses(db: ReturnType<MongoClient['db']>) {
    const col = 'subclasses';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    // Convert the nested object structure into individual documents
    // Each document represents one subclass with its parent class info
    const subclassDocs = [];
    
    for (const [className, classData] of Object.entries(SUBCLASSES_DATA)) {
        for (const subclass of classData.subclasses) {
            subclassDocs.push({
                name: subclass.name,
                description: subclass.description,
                class: className,
                subclass_level: classData.subclass_level,
            });
        }
    }

    await collection.insertMany(subclassDocs);
    log(`Inserted ${subclassDocs.length} subclasses across ${Object.keys(SUBCLASSES_DATA).length} classes`);

    // Indexes for efficient querying
    await collection.createIndex({ class: 1 },                          { name: 'class' });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ subclass_level: 1 },                 { name: 'subclass_level' });
    await collection.createIndex({ class: 1, name: 1 },                 { name: 'class_name', unique: true });
    await collection.createIndex({ name: 'text', description: 'text' }, { name: 'text_search' });

    log('Indexes created for subclasses');
}

/* ═══════════════════════════════════════════════════════════════════
   Seed backgrounds
═══════════════════════════════════════════════════════════════════ */

async function seedBackgrounds(db: ReturnType<MongoClient['db']>) {
    const col = 'backgrounds';
    await dropIfExists(db, col);

    const collection = db.collection(col);

    await collection.insertMany(STATIC_BACKGROUNDS as object[]);
    log(`Inserted ${STATIC_BACKGROUNDS.length} backgrounds`);

    await collection.createIndex({ index: 1 },                          { name: 'index', unique: true });
    await collection.createIndex({ name: 1 },                           { name: 'name' });
    await collection.createIndex({ name: 'text' },                      { name: 'text_search' });

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
