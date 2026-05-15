// Quick script to check what races are in the database
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function checkRaces() {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('dnd-resources');
    const races = await db.collection('races').find({}).project({ index: 1, name: 1 }).toArray();
    
    console.log(`\n📊 Found ${races.length} races in database:\n`);
    races.forEach(race => console.log(`   - ${race.name} (${race.index})`));
    
    const expected = ['dragonborn', 'dwarf', 'elf', 'gnome', 'goliath', 'halfling', 'human', 'orc', 'tiefling'];
    const missing = expected.filter(e => !races.some(r => r.index === e));
    
    if (missing.length > 0) {
        console.log(`\n⚠️  Missing ${missing.length} expected races:`);
        missing.forEach(m => console.log(`   - ${m}`));
    }
    
    await client.close();
}

checkRaces();
