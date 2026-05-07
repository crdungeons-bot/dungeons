import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// POST - Decline invite
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const invitesCollection = db.collection('party_invites');

        // Update invite status
        const result = await invitesCollection.updateOne(
            { _id: new ObjectId(id), status: 'pending' },
            { $set: { status: 'declined' } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Invite not found or already processed' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Decline invite error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
