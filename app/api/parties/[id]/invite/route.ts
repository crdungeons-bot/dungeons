import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// POST - Send party invite
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { dmUserId, invitedEmail } = body;

        if (!dmUserId || !invitedEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');
        const usersCollection = db.collection('users');
        const invitesCollection = db.collection('party_invites');

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
                { error: 'Only the DM can send invites' },
                { status: 403 }
            );
        }

        // Check if party is full
        if (party.members.length >= party.maxMembers) {
            return NextResponse.json(
                { error: 'Party is full' },
                { status: 400 }
            );
        }

        // Check if user exists
        const invitedUser = await usersCollection.findOne({ email: invitedEmail.toLowerCase() });

        if (!invitedUser) {
            return NextResponse.json(
                { error: 'User not found with that email' },
                { status: 404 }
            );
        }

        // Check if user is already a member
        const isAlreadyMember = party.members.some(
            (m: any) => m.userId.toString() === invitedUser._id.toString()
        );

        if (isAlreadyMember) {
            return NextResponse.json(
                { error: 'User is already a member of this party' },
                { status: 400 }
            );
        }

        // Check if there's already a pending invite
        const existingInvite = await invitesCollection.findOne({
            partyId: new ObjectId(id),
            invitedEmail: invitedEmail.toLowerCase(),
            status: 'pending'
        });

        if (existingInvite) {
            return NextResponse.json(
                { error: 'An invite is already pending for this user' },
                { status: 400 }
            );
        }

        // Create invite
        const invite = {
            partyId: new ObjectId(id),
            partyName: party.name,
            invitedEmail: invitedEmail.toLowerCase(),
            invitedBy: new ObjectId(dmUserId),
            status: 'pending',
            createdAt: new Date()
        };

        const result = await invitesCollection.insertOne(invite);

        return NextResponse.json({
            success: true,
            invite: {
                _id: result.insertedId.toString(),
                ...invite,
                partyId: id,
                invitedBy: dmUserId
            }
        });
    } catch (error) {
        console.error('Send invite error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
