import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/subclasses
 * 
 * Query params:
 *   - class: filter by class (e.g., ?class=cleric)
 *   - name: filter by exact subclass name
 * 
 * Returns: { results: Subclass[], count: number }
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const className = searchParams.get('class');
        const name = searchParams.get('name');

        const client = await clientPromise;
        const db = client.db('dnd-resources');
        const collection = db.collection('subclasses');

        // Build query filter
        const filter: Record<string, unknown> = {};
        if (className) {
            filter.class = className.toLowerCase();
        }
        if (name) {
            filter.name = name;
        }

        // Fetch subclasses
        const results = await collection
            .find(filter)
            .sort({ class: 1, name: 1 })
            .toArray();

        return NextResponse.json({
            results: results.map(doc => ({
                name: doc.name,
                description: doc.description,
                class: doc.class,
                subclass_level: doc.subclass_level,
            })),
            count: results.length,
        });
    } catch (error) {
        console.error('Subclasses API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subclasses' },
            { status: 500 }
        );
    }
}
