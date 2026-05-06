import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/items
 *
 * Query parameters (all optional):
 *   category    — weapon | armor | shield | wondrous | ring | rod | staff | wand | potion | scroll | tool | ammunition | gear | clothing | trinket | misc
 *   subcategory — e.g. martial-melee, heavy, healing, artisan …
 *   rarity      — mundane | common | uncommon | rare | very-rare | legendary | artifact
 *   magical     — 'true' | 'false'
 *   attunement  — 'true' | 'false'
 *   q           — name / description text search (case-insensitive)
 *
 * Returns: { items: ItemEntry[], total: number }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const category    = searchParams.get('category');
        const subcategory = searchParams.get('subcategory');
        const rarity      = searchParams.get('rarity');
        const magical     = searchParams.get('magical');
        const attunement  = searchParams.get('attunement');
        const q           = searchParams.get('q');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        if (category)    filter.category    = category;
        if (subcategory) filter.subcategory = subcategory;
        if (rarity)      filter.rarity      = rarity;

        if (magical   === 'true')  filter.magical            = true;
        if (magical   === 'false') filter.magical            = { $ne: true };
        if (attunement === 'true')  filter.requiresAttunement = true;
        if (attunement === 'false') filter.requiresAttunement = { $ne: true };

        if (q && q.trim()) {
            filter.name = { $regex: q.trim(), $options: 'i' };
        }

        const client     = await clientPromise;
        const collection = client.db('dnd-resources').collection('items');

        const items = await collection
            .find(filter, { projection: { _id: 0 } })
            .sort({ category: 1, rarity: 1, name: 1 })
            .toArray();

        return NextResponse.json(
            { items, total: items.length },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.error('[/api/resources/items] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
