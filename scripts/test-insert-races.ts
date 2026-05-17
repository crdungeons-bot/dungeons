// Test insertion of Goliath and Half-Orc specifically
import { MongoClient } from 'mongodb';
import RACES from './races-data.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function testInsert() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('dnd-resources');
    const collection = db.collection('races');
    
    // Find the problematic races
    const goliath = RACES.find((r: any) => r.index === 'goliath');
    const halfOrc = RACES.find((r: any) => r.index === 'half-orc');
    
    console.log('\n🔍 Testing Goliath insertion...');
    console.log('Has index:', !!goliath?.index);
    console.log('Has name:', !!goliath?.name);
    console.log('Keys:', goliath ? Object.keys(goliath).join(', ') : 'NOT FOUND');
    
    console.log('\n🔍 Testing Half-Orc insertion...');
    console.log('Has index:', !!halfOrc?.index);
    console.log('Has name:', !!halfOrc?.name);
    console.log('Keys:', halfOrc ? Object.keys(halfOrc).join(', ') : 'NOT FOUND');
    
    if (goliath) {
        try {
            const result = await collection.insertOne(goliath as object);
            console.log('\n✅ Goliath inserted successfully:', result.insertedId);
        } catch (error: any) {
            console.error('\n❌ Goliath insertion failed:', error.message);
        }
    }
    
    if (halfOrc) {
        try {
            const result = await collection.insertOne(halfOrc as object);
            console.log('\n✅ Half-Orc inserted successfully:', result.insertedId);
        } catch (error: any) {
            console.error('\n❌ Half-Orc insertion failed:', error.message);
        }
    }
    
    // Check what's in the DB now
    const count = await collection.countDocuments();
    console.log(`\n📊 Total races in DB: ${count}`);
    
    await client.close();
}

testInsert();
