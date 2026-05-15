/**
 * Migration Script: Move Non-SRD Content to Separate Database
 * 
 * This script:
 * 1. Copies non-SRD content from dnd-resources to dnd-non-srd-compliant
 * 2. Removes non-SRD content from dnd-resources
 * 
 * SRD 5.2 Compliant Content:
 * - Classes: Barbarian, Bard, Cleric, Druid, Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer, Warlock, Wizard
 * - Backgrounds: Acolyte, Criminal, Sage, Soldier
 * - Species: Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Human, Orc, Tiefling
 */

import { MongoClient } from 'mongodb';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Non-SRD content to migrate
const NON_SRD_CLASSES = ['artificer'];

const SRD_BACKGROUNDS = ['acolyte', 'criminal', 'sage', 'soldier'];

const SRD_SPECIES = [
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

async function migrateNonSRDContent() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const sourceDb = client.db('dnd-resources');
        const targetDb = client.db('dnd-non-srd-compliant');

        // ===================
        // 1. MIGRATE CLASSES
        // ===================
        console.log('\n📦 Migrating non-SRD classes...');
        const nonSrdClasses = await sourceDb
            .collection('classes')
            .find({ index: { $in: NON_SRD_CLASSES } })
            .toArray();

        if (nonSrdClasses.length > 0) {
            await targetDb.collection('classes').insertMany(nonSrdClasses);
            console.log(`  ✅ Copied ${nonSrdClasses.length} class(es) to dnd-non-srd-compliant`);

            const deleteClassResult = await sourceDb
                .collection('classes')
                .deleteMany({ index: { $in: NON_SRD_CLASSES } });
            console.log(`  ✅ Removed ${deleteClassResult.deletedCount} class(es) from dnd-resources`);
        } else {
            console.log('  ℹ️  No non-SRD classes found');
        }

        // ===================
        // 2. MIGRATE BACKGROUNDS
        // ===================
        console.log('\n📦 Migrating non-SRD backgrounds...');
        const nonSrdBackgrounds = await sourceDb
            .collection('backgrounds')
            .find({ index: { $nin: SRD_BACKGROUNDS } })
            .toArray();

        if (nonSrdBackgrounds.length > 0) {
            await targetDb.collection('backgrounds').insertMany(nonSrdBackgrounds);
            console.log(`  ✅ Copied ${nonSrdBackgrounds.length} background(s) to dnd-non-srd-compliant`);

            const deleteBackgroundResult = await sourceDb
                .collection('backgrounds')
                .deleteMany({ index: { $nin: SRD_BACKGROUNDS } });
            console.log(`  ✅ Removed ${deleteBackgroundResult.deletedCount} background(s) from dnd-resources`);
        } else {
            console.log('  ℹ️  No non-SRD backgrounds found');
        }

        // ===================
        // 3. MIGRATE RACES
        // ===================
        console.log('\n📦 Migrating non-SRD races...');
        const nonSrdRaces = await sourceDb
            .collection('races')
            .find({ index: { $nin: SRD_SPECIES } })
            .toArray();

        if (nonSrdRaces.length > 0) {
            await targetDb.collection('races').insertMany(nonSrdRaces);
            console.log(`  ✅ Copied ${nonSrdRaces.length} race(s) to dnd-non-srd-compliant`);

            const deleteRaceResult = await sourceDb
                .collection('races')
                .deleteMany({ index: { $nin: SRD_SPECIES } });
            console.log(`  ✅ Removed ${deleteRaceResult.deletedCount} race(s) from dnd-resources`);
        } else {
            console.log('  ℹ️  No non-SRD races found (user may have already moved them)');
        }

        // ===================
        // 4. MIGRATE SUBRACES
        // ===================
        console.log('\n📦 Migrating subraces of non-SRD races...');
        const nonSrdSubraces = await sourceDb
            .collection('subraces')
            .find({ race_index: { $nin: SRD_SPECIES } })
            .toArray();

        if (nonSrdSubraces.length > 0) {
            await targetDb.collection('subraces').insertMany(nonSrdSubraces);
            console.log(`  ✅ Copied ${nonSrdSubraces.length} subrace(s) to dnd-non-srd-compliant`);

            const deleteSubraceResult = await sourceDb
                .collection('subraces')
                .deleteMany({ race_index: { $nin: SRD_SPECIES } });
            console.log(`  ✅ Removed ${deleteSubraceResult.deletedCount} subrace(s) from dnd-resources`);
        } else {
            console.log('  ℹ️  No non-SRD subraces found');
        }

        // ===================
        // 5. MIGRATE ARTIFICER SPELLS
        // ===================
        console.log('\n📦 Migrating Artificer-specific spells...');
        const artificerSpells = await sourceDb
            .collection('spells-abilities')
            .find({
                $or: [
                    { 'classes.index': 'artificer' },
                    { index: { $regex: /^artificer-/i } }
                ]
            })
            .toArray();

        if (artificerSpells.length > 0) {
            // Check if they already exist in target
            const existingSpells = await targetDb
                .collection('spells-abilities')
                .find({ index: { $in: artificerSpells.map(s => s.index) } })
                .toArray();

            const existingIndexes = new Set(existingSpells.map(s => s.index));
            const newSpells = artificerSpells.filter(s => !existingIndexes.has(s.index));

            if (newSpells.length > 0) {
                await targetDb.collection('spells-abilities').insertMany(newSpells);
                console.log(`  ✅ Copied ${newSpells.length} Artificer spell(s) to dnd-non-srd-compliant`);
            }

            // Remove Artificer from class lists in remaining spells
            const updateResult = await sourceDb
                .collection('spells-abilities')
                .updateMany(
                    { 'classes.index': 'artificer' },
                    { $pull: { classes: { index: 'artificer' } } }
                );
            console.log(`  ✅ Removed Artificer from ${updateResult.modifiedCount} spell(s)`);

            // Delete spells that are ONLY for Artificer
            const deleteSpellResult = await sourceDb
                .collection('spells-abilities')
                .deleteMany({
                    $or: [
                        { classes: { $size: 0 } },
                        { index: { $regex: /^artificer-/i } }
                    ]
                });
            console.log(`  ✅ Deleted ${deleteSpellResult.deletedCount} Artificer-only spell(s)`);
        } else {
            console.log('  ℹ️  No Artificer spells found');
        }

        // ===================
        // SUMMARY
        // ===================
        console.log('\n' + '='.repeat(60));
        console.log('✅ MIGRATION COMPLETE');
        console.log('='.repeat(60));

        // Check remaining counts in dnd-resources
        const remainingClasses = await sourceDb.collection('classes').countDocuments();
        const remainingBackgrounds = await sourceDb.collection('backgrounds').countDocuments();
        const remainingRaces = await sourceDb.collection('races').countDocuments();
        const remainingSubraces = await sourceDb.collection('subraces').countDocuments();

        console.log('\n📊 Remaining in dnd-resources (SRD-compliant):');
        console.log(`  - Classes: ${remainingClasses} (should be 12)`);
        console.log(`  - Backgrounds: ${remainingBackgrounds} (should be 4)`);
        console.log(`  - Races: ${remainingRaces} (should be 9)`);
        console.log(`  - Subraces: ${remainingSubraces}`);

        // Check what was moved to dnd-non-srd-compliant
        const movedClasses = await targetDb.collection('classes').countDocuments();
        const movedBackgrounds = await targetDb.collection('backgrounds').countDocuments();
        const movedRaces = await targetDb.collection('races').countDocuments();
        const movedSubraces = await targetDb.collection('subraces').countDocuments();
        const movedSpells = await targetDb.collection('spells-abilities').countDocuments();

        console.log('\n📊 Moved to dnd-non-srd-compliant:');
        console.log(`  - Classes: ${movedClasses}`);
        console.log(`  - Backgrounds: ${movedBackgrounds}`);
        console.log(`  - Races: ${movedRaces}`);
        console.log(`  - Subraces: ${movedSubraces}`);
        console.log(`  - Spells: ${movedSpells}`);

    } catch (error) {
        console.error('❌ Error during migration:', error);
        throw error;
    } finally {
        await client.close();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

// Run the migration
migrateNonSRDContent()
    .then(() => {
        console.log('\n✅ All done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    });
