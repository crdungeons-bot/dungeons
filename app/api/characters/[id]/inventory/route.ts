import { NextRequest, NextResponse } from 'next/server';
import { ObjectId }                  from 'mongodb';
import clientPromise                 from '@/lib/mongo';

/**
 * GET /api/characters/[id]/inventory
 * 
 * Returns enriched inventory: merges character's item references with full
 * item details from the items collection.
 */
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid character ID' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const appDb = client.db('dnd-app');
        const resourcesDb = client.db('dnd-resources');

        // Get character
        const character = await appDb
            .collection('characters')
            .findOne({ _id: new ObjectId(id) });

        if (!character) {
            return NextResponse.json({ error: 'Character not found' }, { status: 404 });
        }

        // Get inventory array (item references)
        const inventory = character.inventory as Array<{
            itemId: string;
            quantity: number;
            equipped?: boolean;
            attuned?: boolean;
            source?: string;
        }> ?? [];

        if (inventory.length === 0) {
            return NextResponse.json({ inventory: [], currency: character.currency ?? { pp: 0, gp: 0, sp: 0, cp: 0 } });
        }

        // Fetch all item details from resources DB
        const itemNames = inventory.map(ref => ref.itemId);
        const items = await resourcesDb
            .collection('items')
            .find({ name: { $in: itemNames } }, { projection: { _id: 0 } })
            .toArray();

        // Create lookup map
        const itemMap = new Map(items.map(item => [item.name as string, item]));

        // Enrich inventory with full item details
        const enrichedInventory = inventory.map(ref => {
            const itemDetails = itemMap.get(ref.itemId);
            if (!itemDetails) {
                // Item not found in database, return minimal data
                return {
                    itemId: ref.itemId,
                    name: ref.itemId,
                    quantity: ref.quantity,
                    equipped: ref.equipped ?? false,
                    attuned: ref.attuned ?? false,
                    source: ref.source ?? 'unknown',
                    category: 'misc',
                    rarity: 'common',
                    description: 'Item details not found',
                };
            }

            return {
                ...itemDetails,
                // Character-specific overrides
                quantity: ref.quantity,
                equipped: ref.equipped ?? false,
                attuned: ref.attuned ?? false,
                source: ref.source,
            };
        });

        return NextResponse.json({
            inventory: enrichedInventory,
            currency: character.currency ?? { pp: 0, gp: 0, sp: 0, cp: 0 },
        });
    } catch (error) {
        console.error('[GET /api/characters/[id]/inventory] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * PUT /api/characters/[id]/inventory
 * 
 * Updates character's inventory. Accepts array of item references.
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid character ID' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { inventory } = body;

        if (!Array.isArray(inventory)) {
            return NextResponse.json({ error: 'Inventory must be an array' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');

        await db.collection('characters').updateOne(
            { _id: new ObjectId(id) },
            { $set: { inventory } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[PUT /api/characters/[id]/inventory] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/characters/[id]/inventory
 * 
 * Add a single item to character's inventory.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid character ID' }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { itemId, quantity = 1, equipped = false, attuned = false, source = 'purchased' } = body;

        if (!itemId) {
            return NextResponse.json({ error: 'itemId is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');

        // Check if item already exists in inventory
        const character = await db.collection('characters').findOne(
            { _id: new ObjectId(id), 'inventory.itemId': itemId }
        );

        if (character) {
            // Item exists, increment quantity
            await db.collection('characters').updateOne(
                { _id: new ObjectId(id), 'inventory.itemId': itemId },
                { $inc: { 'inventory.$.quantity': quantity } } as any
            );
        } else {
            // Item doesn't exist, add new entry
            await db.collection('characters').updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        inventory: {
                            itemId,
                            quantity,
                            equipped,
                            attuned,
                            source,
                        }
                    }
                } as any
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[POST /api/characters/[id]/inventory] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
