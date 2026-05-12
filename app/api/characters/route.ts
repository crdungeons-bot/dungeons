import { NextRequest, NextResponse } from 'next/server';
import { ObjectId }                  from 'mongodb';
import clientPromise                 from '@/lib/mongo';
import { getSpellSlots }             from '@/data/spell-slots';

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId || !ObjectId.isValid(userId)) {
        return NextResponse.json({ error: 'Valid userId required' }, { status: 400 });
    }

    try {
        const client     = await clientPromise;
        const db         = client.db('dnd-app');
        const characters = await db
            .collection('characters')
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            characters: characters.map(c => ({
                id:         c._id.toString(),
                name:       c.name,
                race:       c.race,
                class:      c.class,
                background: c.background,
                alignment:  c.alignment,
                level:      c.level ?? 1,
                createdAt:  c.createdAt,
            })),
        });
    } catch (error) {
        console.error('Fetch characters error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            userId,
            name,
            race,
            dndClass,
            background,
            alignment,
            height,
            weight,
            age,
            proficiencies,
            stats,
            story,
            hp,
            subclass,
        } = body;

        if (!userId || !name || !race || !dndClass || !background || !alignment || !stats) {
            return NextResponse.json(
                { error: 'Missing required character fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const appDb = client.db('dnd-app');
        const resourcesDb = client.db('dnd-resources');

        // Get background data to extract starting equipment
        const bgData = await resourcesDb.collection('backgrounds').findOne({ index: background });
        
        // Initialize inventory and currency
        const inventory: Array<{ itemId: string; quantity: number; equipped: boolean; attuned: boolean; source: string }> = [];
        const currency = { pp: 0, gp: 0, sp: 0, cp: 0 };

        if (bgData?.starting_equipment) {
            for (const equip of bgData.starting_equipment) {
                const itemName = equip.equipment.name;
                const quantity = equip.quantity;

                // Check if this is currency (gold/silver/copper pieces)
                if (itemName.toLowerCase().includes('gold pieces') || itemName.toLowerCase().includes('gp')) {
                    currency.gp += quantity;
                } else if (itemName.toLowerCase().includes('silver pieces') || itemName.toLowerCase().includes('sp')) {
                    currency.sp += quantity;
                } else if (itemName.toLowerCase().includes('copper pieces') || itemName.toLowerCase().includes('cp')) {
                    currency.cp += quantity;
                } else if (itemName.toLowerCase().includes('platinum pieces') || itemName.toLowerCase().includes('pp')) {
                    currency.pp += quantity;
                } else {
                    // This is an actual item - try to match it to database
                    // For now, just add it by name (will be enriched on fetch)
                    // Note: item names need to match database exactly for enrichment to work
                    inventory.push({
                        itemId: itemName,
                        quantity,
                        equipped: false,
                        attuned: false,
                        source: 'background'
                    });
                }
            }
        }

        // Calculate spell slots based on class and level
        const spellSlots = getSpellSlots(dndClass, 1);

        const result = await appDb.collection('characters').insertOne({
            userId: new ObjectId(userId),
            name:       name.trim(),
            race,
            class:      dndClass,
            background,
            alignment,
            height:        height        ?? null,
            weight:        weight        ?? null,
            age:           age           ?? null,
            proficiencies: proficiencies ?? [],
            stats,
            story:      story   ?? {},
            hp:         hp      ?? null,
            level:      1,
            inventory,
            currency,
            feats:      [],
            spellSlots: spellSlots,
            subclass:   subclass ?? null,
            createdAt:  new Date(),
        });

        return NextResponse.json({
            success: true,
            characterId: result.insertedId.toString(),
        });
    } catch (error) {
        console.error('Character creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
