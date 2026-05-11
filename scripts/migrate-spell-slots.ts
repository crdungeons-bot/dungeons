/**
 * Migration Script: Add Spell Slots to Existing Characters
 * 
 * This script updates all existing characters in the database to include
 * spell slots based on their class and level.
 * 
 * Run with: npx tsx scripts/migrate-spell-slots.ts
 */

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { resolve } from 'path';
import { getSpellSlots } from '../data/spell-slots';

// Load .env.local (Next.js convention) so MONGODB_URI is available
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') }); // fallback

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

async function migrateSpellSlots() {
    console.log('🔄 Starting spell slots migration...\n');

    // Configuration - adjust these if needed
    const BATCH_SIZE = 10;          // Process 10 characters at a time
    const DELAY_BETWEEN_BATCHES = 500; // Wait 500ms between batches

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log(`  Connected to: ${MONGODB_URI}\n`);

        const db = client.db('dnd-app');
        const charactersCollection = db.collection('characters');

        // First, count how many characters need updating (without loading them all)
        const totalCount = await charactersCollection.countDocuments({ 
            spellSlots: { $exists: false } 
        });

        console.log(`📊 Found ${totalCount} characters without spell slots\n`);

        if (totalCount === 0) {
            console.log('✅ All characters already have spell slots!');
            return;
        }

        let updated = 0;
        let skipped = 0;
        let processed = 0;

        // Process in batches using MongoDB cursor
        const cursor = charactersCollection.find({ 
            spellSlots: { $exists: false } 
        }).batchSize(BATCH_SIZE);

        let batch: any[] = [];
        
        for await (const char of cursor) {
            batch.push(char);

            // When batch is full, process it
            if (batch.length >= BATCH_SIZE) {
                const result = await processBatch(batch, charactersCollection);
                updated += result.updated;
                skipped += result.skipped;
                processed += batch.length;

                // Progress indicator
                const percent = Math.round((processed / totalCount) * 100);
                console.log(`\n📊 Progress: ${processed}/${totalCount} (${percent}%)\n`);

                // Clear batch
                batch = [];

                // Pause between batches to avoid overwhelming the system
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
            }
        }

        // Process any remaining characters in the final batch
        if (batch.length > 0) {
            const result = await processBatch(batch, charactersCollection);
            updated += result.updated;
            skipped += result.skipped;
            processed += batch.length;
        }

        console.log(`\n📈 Migration complete!`);
        console.log(`   ✅ Updated: ${updated}`);
        console.log(`   ⚠️  Skipped: ${skipped}`);
        console.log(`   📊 Total processed: ${processed}`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

/**
 * Process a batch of characters
 */
async function processBatch(
    batch: any[], 
    collection: any
): Promise<{ updated: number; skipped: number }> {
    let updated = 0;
    let skipped = 0;

    for (const char of batch) {
        const charClass = char.class as string;
        const charLevel = (char.level as number) ?? 1;
        const charName = char.name as string;

        // Calculate spell slots for this character
        const spellSlots = getSpellSlots(charClass, charLevel);

        try {
            await collection.updateOne(
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

    return { updated, skipped };
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
