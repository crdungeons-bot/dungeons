import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ index: string }> }
) {
    const { index } = await params;

    try {
        const client = await clientPromise;
        const db = client.db('dnd-resources');
        
        const background = await db
            .collection('backgrounds')
            .findOne({ index });

        if (!background) {
            return NextResponse.json(
                { error: 'Background not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(background);
    } catch (error) {
        console.error('Fetch background error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch background' },
            { status: 500 }
        );
    }
}
