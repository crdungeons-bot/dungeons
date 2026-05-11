import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/classes
 *
 * Query parameters (all optional):
 *   index ,   specific class index (barbarian, wizard, etc.)
 *   q     ,   name text search (case-insensitive)
 *
 * Returns: { classes: ClassEntry[], count: number }
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
            filter.name = { $regex: q.trim(), $options: 'i' };
        }

        const client     = await clientPromise;
        const collection = client.db('dnd-resources').collection('classes');

        const classes = await collection
            .find(filter, { projection: { _id: 0 } })
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(
            { results: classes, count: classes.length },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.error('[/api/resources/classes] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
