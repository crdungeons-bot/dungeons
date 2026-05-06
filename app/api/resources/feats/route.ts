import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/feats
 *
 * Query parameters (all optional):
 *   q            — name / benefit text search (case-insensitive)
 *   prerequisite — filter by prerequisite string (e.g. 'Spellcasting')
 *
 * Returns: { feats: FeatEntry[], total: number }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const q            = searchParams.get('q');
        const prerequisite = searchParams.get('prerequisite');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        if (prerequisite) filter.prerequisite = { $regex: prerequisite, $options: 'i' };

        if (q && q.trim()) {
            filter.name = { $regex: q.trim(), $options: 'i' };
        }

        const client     = await clientPromise;
        const collection = client.db('dnd-resources').collection('feats');

        const feats = await collection
            .find(filter, { projection: { _id: 0 } })
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json(
            { feats, total: feats.length },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.error('[/api/resources/feats] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
