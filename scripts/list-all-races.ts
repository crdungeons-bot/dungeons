// Final verification - list ALL races
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function listAll() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('dnd-resources');
    const count = await db.collection('races').countDocuments();
    const races = await db.collection('races').find({}).sort({ name: 1 }).toArray();
    
    console.log(`\n✅ ${count} races in dnd-resources.races:\n`);
    races.forEach((r,i) => console.log(`   ${i+1}. ${r.name} (${r.index})`));
    
    await client.close();
}

listAll();
