import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// GET - Get party details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');
        const usersCollection = db.collection('users');
        const charactersCollection = db.collection('characters');

        const party = await partiesCollection.findOne({ _id: new ObjectId(id) });

        if (!party) {
            return NextResponse.json(
                { error: 'Party not found' },
                { status: 404 }
            );
        }

        // Get DM info
        const dm = await usersCollection.findOne(
            { _id: party.dmUserId },
            { projection: { firstName: 1, lastName: 1, email: 1 } }
        );

        // Get member details (user info + character info)
        const memberDetails = await Promise.all(
            party.members.map(async (member: any) => {
                const user = await usersCollection.findOne(
                    { _id: member.userId },
                    { projection: { firstName: 1, lastName: 1 } }
                );
                const character = await charactersCollection.findOne(
                    { _id: member.characterId },
                    { projection: { name: 1, race: 1, class: 1, level: 1 } }
                );

                return {
                    userId: member.userId.toString(),
                    characterId: member.characterId.toString(),
                    joinedAt: member.joinedAt,
                    user: user ? {
                        firstName: user.firstName,
                        lastName: user.lastName
                    } : null,
                    character: character ? {
                        name: character.name,
                        race: character.race,
                        class: character.class,
                        level: character.level
                    } : null
                };
            })
        );

        return NextResponse.json({
            party: {
                _id: party._id.toString(),
                name: party.name,
                description: party.description,
                dmUserId: party.dmUserId.toString(),
                maxMembers: party.maxMembers,
                members: memberDetails,
                createdAt: party.createdAt,
                dm: dm ? {
                    firstName: dm.firstName,
                    lastName: dm.lastName,
                    email: dm.email
                } : null
            }
        });
    } catch (error) {
        console.error('Get party error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete party (DM only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');

        // Check if user is DM
        const party = await partiesCollection.findOne({ _id: new ObjectId(id) });

        if (!party) {
            return NextResponse.json(
                { error: 'Party not found' },
                { status: 404 }
            );
        }

        if (party.dmUserId.toString() !== userId) {
            return NextResponse.json(
                { error: 'Only the DM can delete the party' },
                { status: 403 }
            );
        }

        await partiesCollection.deleteOne({ _id: new ObjectId(id) });

        // Also delete any pending invites for this party
        await db.collection('party_invites').deleteMany({ partyId: new ObjectId(id) });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete party error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update party (DM only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { userId, name, description } = body;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');

        // Check if user is DM
        const party = await partiesCollection.findOne({ _id: new ObjectId(id) });

        if (!party) {
            return NextResponse.json(
                { error: 'Party not found' },
                { status: 404 }
            );
        }

        if (party.dmUserId.toString() !== userId) {
            return NextResponse.json(
                { error: 'Only the DM can update the party' },
                { status: 403 }
            );
        }

        const updates: any = {};
        if (name) updates.name = name.trim();
        if (description !== undefined) updates.description = description.trim();

        await partiesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update party error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
