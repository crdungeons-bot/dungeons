import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('dnd-resources');
        
        const backgrounds = await db
            .collection('backgrounds')
            .find()
            .sort({ name: 1 })
            .toArray();

        return NextResponse.json({
            count: backgrounds.length,
            results: backgrounds,
        });
    } catch (error) {
        console.error('Fetch backgrounds error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch backgrounds' },
            { status: 500 }
        );
    }
}
