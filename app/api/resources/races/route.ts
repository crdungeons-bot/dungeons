import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/races
 *
 * Query parameters (all optional):
 *   index ,   specific race index (dragonborn, elf, dwarf, etc.)
 *   q     ,   name / description text search (case-insensitive)
 *
 * Returns: { races: RaceEntry[], count: number }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const index = searchParams.get('index');
        const q     = searchParams.get('q');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        if (index) filter.index = index;

        if (q && q.trim()) {
            filter.$or = [
                { name: { $regex: q.trim(), $options: 'i' } },
                { alignment: { $regex: q.trim(), $options: 'i' } },
                { short_description: { $regex: q.trim(), $options: 'i' } },
            ];
        }

        const client     = await clientPromise;
        const collection = client.db('dnd-resources').collection('races');

        const races = await collection
            .find(filter, { projection: { _id: 0 } })
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(
            { results: races, count: races.length },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.error('[/api/resources/races] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
