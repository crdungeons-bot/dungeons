/**
 * One-time migration script to copy user data from local MongoDB to Atlas.
 * Migrates: dnd-app.users and dnd-app.characters
 */

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const LOCAL_URI = 'mongodb://localhost:27017';
const ATLAS_URI = process.env.MONGODB_URI;

if (!ATLAS_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

async function migrateUserData() {
    console.log('\n🔄 Migrating user data from localhost to Atlas...\n');

    const localClient = new MongoClient(LOCAL_URI);
    const atlasClient = new MongoClient(ATLAS_URI);

    try {
        await localClient.connect();
        console.log('✓ Connected to local MongoDB');

        await atlasClient.connect();
        console.log('✓ Connected to MongoDB Atlas');

        const localDb = localClient.db('dnd-app');
        const atlasDb = atlasClient.db('dnd-app');

        // Migrate users
        const users = await localDb.collection('users').find({}).toArray();
        if (users.length > 0) {
            await atlasDb.collection('users').insertMany(users);
            console.log(`✓ Migrated ${users.length} user(s)`);
        } else {
            console.log('  No users to migrate');
        }

        // Migrate characters
        const characters = await localDb.collection('characters').find({}).toArray();
        if (characters.length > 0) {
            await atlasDb.collection('characters').insertMany(characters);
            console.log(`✓ Migrated ${characters.length} character(s)`);
        } else {
            console.log('  No characters to migrate');
        }

        console.log('\n✅ Migration complete!\n');
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await localClient.close();
        await atlasClient.close();
    }
}

migrateUserData();
