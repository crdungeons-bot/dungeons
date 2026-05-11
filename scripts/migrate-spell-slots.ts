/**
 * Migration Script: Add Spell Slots to Existing Characters
 * 
 * This script updates all existing characters in the database to include
 * spell slots based on their class and level.
 * 
 * Run with: npx tsx scripts/migrate-spell-slots.ts
 */

import clientPromise from '../lib/mongo';
import { getSpellSlots } from '../data/spell-slots';

async function migrateSpellSlots() {
    console.log('🔄 Starting spell slots migration...\n');

    try {
        const client = await clientPromise;
        const db = client.db('dnd-app');
        const charactersCollection = db.collection('characters');

        // Find all characters that don't have spell slots
        const characters = await charactersCollection
            .find({ spellSlots: { $exists: false } })
            .toArray();

        console.log(`📊 Found ${characters.length} characters without spell slots\n`);

        if (characters.length === 0) {
            console.log('✅ All characters already have spell slots!');
            return;
        }

        let updated = 0;
        let skipped = 0;

        for (const char of characters) {
            const charClass = char.class as string;
            const charLevel = (char.level as number) ?? 1;
            const charName = char.name as string;

            // Calculate spell slots for this character
            const spellSlots = getSpellSlots(charClass, charLevel);

            try {
                await charactersCollection.updateOne(
                    { _id: char._id },
                    { $set: { spellSlots: spellSlots } }
                );

                const slotInfo = spellSlots 
                    ? ('slots' in spellSlots 
                        ? `${spellSlots.slots} pact magic slots (lvl ${spellSlots.level})`
                        : `spell slots up to level ${Object.entries(spellSlots).reverse().find(([_, count]) => count > 0)?.[0] ?? 0}`)
                    : 'no spellcasting';

                console.log(`✓ ${charName} (${charClass}, level ${charLevel}): ${slotInfo}`);
                updated++;
            } catch (error) {
                console.error(`✗ Failed to update ${charName}:`, error);
                skipped++;
            }
        }

        console.log(`\n📈 Migration complete!`);
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⚠️  Skipped: ${skipped}`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run the migration
migrateSpellSlots()
    .then(() => {
        console.log('\n✨ Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Error:', error);
        process.exit(1);
    });
