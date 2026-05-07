import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// POST - Accept invite
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { userId, characterId } = body;

        if (!userId || !characterId) {
            return NextResponse.json(
                { error: 'User ID and Character ID required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const invitesCollection = db.collection('party_invites');
        const partiesCollection = db.collection('parties');
        const charactersCollection = db.collection('characters');

        // Get invite
        const invite = await invitesCollection.findOne({ _id: new ObjectId(id) });

        if (!invite) {
            return NextResponse.json(
                { error: 'Invite not found' },
                { status: 404 }
            );
        }

        if (invite.status !== 'pending') {
            return NextResponse.json(
                { error: 'Invite is no longer pending' },
                { status: 400 }
            );
        }

        // Verify character belongs to user
        const character = await charactersCollection.findOne({
            _id: new ObjectId(characterId),
            userId: new ObjectId(userId)
        });

        if (!character) {
            return NextResponse.json(
                { error: 'Character not found or does not belong to user' },
                { status: 404 }
            );
        }

        // Get party to check if it's full
        const party = await partiesCollection.findOne({ _id: invite.partyId });

        if (!party) {
            return NextResponse.json(
                { error: 'Party no longer exists' },
                { status: 404 }
            );
        }

        if (party.members.length >= party.maxMembers) {
            return NextResponse.json(
                { error: 'Party is now full' },
                { status: 400 }
            );
        }

        // Add member to party
        await partiesCollection.updateOne(
            { _id: invite.partyId },
            {
                $push: {
                    members: {
                        userId: new ObjectId(userId),
                        characterId: new ObjectId(characterId),
                        joinedAt: new Date()
                    }
                }
            } as any
        );

        // Update invite status
        await invitesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: 'accepted' } }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Accept invite error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
