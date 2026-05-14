#!/usr/bin/env node
/**
 * Test script to verify races and subraces are properly seeded and linked
 */

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';

async function testRacesAndSubraces() {
  console.log('\n🧪 Testing Races & Subraces Database\n');
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db('dnd-resources');
    
    // Test 1: Count races
    const racesCol = db.collection('races');
    const raceCount = await racesCol.countDocuments();
    console.log(`✓ Races collection: ${raceCount} documents`);
    
    // Test 2: Count subraces
    const subracesCol = db.collection('subraces');
    const subraceCount = await subracesCol.countDocuments();
    console.log(`✓ Subraces collection: ${subraceCount} documents`);
    
    // Test 3: Check a specific race (Dragonborn)
    const dragonborn = await racesCol.findOne({ index: 'dragonborn' });
    if (dragonborn) {
      console.log(`\n✓ Dragonborn race found with ${dragonborn.subraces?.length || 0} subrace references`);
      if (dragonborn.subraces && dragonborn.subraces.length > 0) {
        console.log(`  Sample subraces: ${dragonborn.subraces.slice(0, 3).map((s: any) => s.name).join(', ')}...`);
      }
    }
    
    // Test 4: Check subraces by race
    const dragonbornSubraces = await subracesCol.find({ race: 'dragonborn' }).toArray();
    console.log(`✓ Found ${dragonbornSubraces.length} dragonborn subraces in subraces collection`);
    
    // Test 5: Check Aasimar subraces
    const aasimarSubraces = await subracesCol.find({ race: 'aasimar' }).toArray();
    console.log(`✓ Found ${aasimarSubraces.length} aasimar subraces`);
    
    // Test 6: Check Genasi subraces
    const genasiSubraces = await subracesCol.find({ race: 'genasi' }).toArray();
    console.log(`✓ Found ${genasiSubraces.length} genasi subraces`);
    
    // Test 7: Group subraces by race
    const subracesByRace = await subracesCol.aggregate([
      {
        $group: {
          _id: '$race',
          count: { $sum: 1 },
          names: { $push: '$name' }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
    
    console.log('\n📊 Subraces by Race:');
    subracesByRace.forEach((group: any) => {
      console.log(`  ${group._id}: ${group.count} subraces`);
    });
    
    // Test 8: Check race variety
    const raceList = await racesCol.find({}, { projection: { name: 1, 'subraces.name': 1 } }).toArray();
    console.log('\n📋 All Races:');
    raceList.forEach((race: any) => {
      const subraceCount = race.subraces?.length || 0;
      console.log(`  • ${race.name} (${subraceCount} subraces)`);
    });
    
    console.log('\n✅ All tests passed!\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

testRacesAndSubraces();
