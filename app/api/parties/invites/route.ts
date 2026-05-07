import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

// GET - Get user's pending invites
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('email');

        if (!userEmail) {
            return NextResponse.json(
                { error: 'Email required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const invitesCollection = db.collection('party_invites');

        const invites = await invitesCollection.find({
            invitedEmail: userEmail.toLowerCase(),
            status: 'pending'
        }).toArray();

        const serializedInvites = invites.map(invite => ({
            _id: invite._id.toString(),
            partyId: invite.partyId.toString(),
            partyName: invite.partyName,
            invitedEmail: invite.invitedEmail,
            invitedBy: invite.invitedBy.toString(),
            status: invite.status,
            createdAt: invite.createdAt
        }));

        return NextResponse.json({ invites: serializedInvites });
    } catch (error) {
        console.error('Get invites error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
