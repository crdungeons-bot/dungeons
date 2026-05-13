/**
 * Script to fix actionType inconsistency in spells-abilities collection
 * Changes 'bonusAction' and 'BonusAction' to 'Bonus Action'
 */

import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
}

async function fixActionTypes() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db('dnd-resources');
        const collection = db.collection('spells-abilities');

        // Check current state
        console.log('\n📊 Checking current state...');
        const bonusActionCamel = await collection.countDocuments({ actionType: 'bonusAction' });
        const bonusActionPascal = await collection.countDocuments({ actionType: 'BonusAction' });
        const bonusActionLower = await collection.countDocuments({ actionType: 'bonus action' });
        const bonusActionCorrect = await collection.countDocuments({ actionType: 'Bonus Action' });

        console.log(`   - 'bonusAction' (camelCase): ${bonusActionCamel}`);
        console.log(`   - 'BonusAction' (PascalCase): ${bonusActionPascal}`);
        console.log(`   - 'bonus action' (lowercase): ${bonusActionLower}`);
        console.log(`   - 'Bonus Action' (correct): ${bonusActionCorrect}`);

        if (bonusActionCamel === 0 && bonusActionPascal === 0 && bonusActionLower === 0) {
            console.log('\n✅ No inconsistencies found! All action types are already correct.');
            return;
        }

        // Fix 'bonusAction' -> 'Bonus Action'
        if (bonusActionCamel > 0) {
            console.log(`\n🔧 Fixing ${bonusActionCamel} documents with 'bonusAction'...`);
            const result1 = await collection.updateMany(
                { actionType: 'bonusAction' },
                { $set: { actionType: 'Bonus Action' } }
            );
            console.log(`   ✓ Updated ${result1.modifiedCount} documents`);
        }

        // Fix 'BonusAction' -> 'Bonus Action'
        if (bonusActionPascal > 0) {
            console.log(`\n🔧 Fixing ${bonusActionPascal} documents with 'BonusAction'...`);
            const result2 = await collection.updateMany(
                { actionType: 'BonusAction' },
                { $set: { actionType: 'Bonus Action' } }
            );
            console.log(`   ✓ Updated ${result2.modifiedCount} documents`);
        }

        // Fix 'bonus action' -> 'Bonus Action'
        if (bonusActionLower > 0) {
            console.log(`\n🔧 Fixing ${bonusActionLower} documents with 'bonus action'...`);
            const result3 = await collection.updateMany(
                { actionType: 'bonus action' },
                { $set: { actionType: 'Bonus Action' } }
            );
            console.log(`   ✓ Updated ${result3.modifiedCount} documents`);
        }

        // Verify fix
        console.log('\n📊 Verifying fix...');
        const finalCamel = await collection.countDocuments({ actionType: 'bonusAction' });
        const finalPascal = await collection.countDocuments({ actionType: 'BonusAction' });
        const finalLower = await collection.countDocuments({ actionType: 'bonus action' });
        const finalCorrect = await collection.countDocuments({ actionType: 'Bonus Action' });

        console.log(`   - 'bonusAction': ${finalCamel}`);
        console.log(`   - 'BonusAction': ${finalPascal}`);
        console.log(`   - 'bonus action': ${finalLower}`);
        console.log(`   - 'Bonus Action': ${finalCorrect}`);

        if (finalCamel === 0 && finalPascal === 0 && finalLower === 0) {
            console.log('\n✅ All action types have been standardized to "Bonus Action"!');
        } else {
            console.log('\n⚠️ Warning: Some inconsistencies may still exist.');
        }

        // Show all unique action types
        console.log('\n📋 All unique action types in database:');
        const actionTypes = await collection.distinct('actionType');
        actionTypes.sort().forEach(type => {
            console.log(`   - "${type}"`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await client.close();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

console.log('🚀 Starting action type fix...\n');
fixActionTypes()
    .then(() => {
        console.log('\n✅ Script completed successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('\n❌ Script failed:', err);
        process.exit(1);
    });
