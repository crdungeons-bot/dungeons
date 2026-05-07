import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// POST - Remove member from party
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { dmUserId, memberUserId } = body;

        if (!dmUserId || !memberUserId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');

        // Verify party exists and user is DM
        const party = await partiesCollection.findOne({ _id: new ObjectId(id) });

        if (!party) {
            return NextResponse.json(
                { error: 'Party not found' },
                { status: 404 }
            );
        }

        if (party.dmUserId.toString() !== dmUserId) {
            return NextResponse.json(
                { error: 'Only the DM can remove members' },
                { status: 403 }
            );
        }

        // Remove member
        await partiesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { members: { userId: new ObjectId(memberUserId) } } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Remove member error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
