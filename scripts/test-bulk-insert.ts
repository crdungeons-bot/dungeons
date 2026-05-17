// Test insertMany with all 9 SRD races
import { MongoClient } from 'mongodb';
import RACES from './races-data.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function testBulkInsert() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('dnd-resources');
    const collection = db.collection('races');
    
    // Drop and recreate
    await collection.drop().catch(() => console.log('Collection does not exist yet'));
    
    // Filter to SRD races
    const SRD_RACES = ['dragonborn', 'dwarf', 'elf', 'gnome', 'goliath', 'halfling', 'human', 'orc', 'half-orc', 'tiefling'];
    const srdRaces = RACES.filter((race: any) => {
        const index = race.index || '';
        return SRD_RACES.includes(index.toLowerCase());
    });
    
    console.log(`\n📊 Filtered ${RACES.length} → ${srdRaces.length} SRD races`);
    console.log('🔍 Races to insert:', srdRaces.map((r: any) => `${r.name} (${r.index})`).join(', '));
    
    // Check for duplicate indices
    const indices = srdRaces.map((r: any) => r.index);
    const duplicates = indices.filter((item: string, index: number) => indices.indexOf(item) !== index);
    if (duplicates.length > 0) {
        console.error('\n❌ DUPLICATE INDICES FOUND:', duplicates);
    }
    
    try {
        // Try insertMany
        const result = await collection.insertMany(srdRaces as object[], { ordered: false });
        console.log(`\n✅ Successfully inserted ${result.insertedCount} races`);
    } catch (error: any) {
        console.error('\n❌ insertMany failed:', error.message);
        if (error.writeErrors) {
            console.error('Write errors:', error.writeErrors.map((e: any) => ({
                index: e.err.index,
                code: e.err.code,
                msg: e.err.errmsg
            })));
        }
    }
    
    const finalCount = await collection.countDocuments();
    const names = await collection.find({}).project({ name: 1, index: 1, _id: 0 }).toArray();
    console.log(`\n📊 Final count: ${finalCount}`);
    console.log('📋 In DB:', names.map(r => r.name).join(', '));
    
    await client.close();
}

testBulkInsert();
