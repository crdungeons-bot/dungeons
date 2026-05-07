import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';

// POST - Create a new party
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, dmUserId, maxMembers } = body;

        // Validation
        if (!name || !dmUserId || !maxMembers) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (maxMembers < 2 || maxMembers > 8) {
            return NextResponse.json(
                { error: 'Max members must be between 2 and 8' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-app');
        const partiesCollection = db.collection('parties');

        const party = {
            name: name.trim(),
            description: description?.trim() || '',
            dmUserId: new ObjectId(dmUserId),
            maxMembers,
            members: [],
            createdAt: new Date(),
        };

        const result = await partiesCollection.insertOne(party);

        return NextResponse.json({
            success: true,
            party: {
                _id: result.insertedId.toString(),
                ...party,
                dmUserId: dmUserId,
            }
        });
    } catch (error) {
        console.error('Create party error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET - Get user's parties (as DM or member)
export async function GET(request: NextRequest) {
    try {
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

        const userObjectId = new ObjectId(userId);

        // Find parties where user is DM or a member
        const parties = await partiesCollection.find({
            $or: [
                { dmUserId: userObjectId },
                { 'members.userId': userObjectId }
            ]
        }).toArray();

        // Convert ObjectIds to strings
        const serializedParties = parties.map(party => ({
            _id: party._id.toString(),
            name: party.name,
            description: party.description,
            dmUserId: party.dmUserId.toString(),
            maxMembers: party.maxMembers,
            members: party.members.map((m: any) => ({
                userId: m.userId.toString(),
                characterId: m.characterId.toString(),
                joinedAt: m.joinedAt
            })),
            createdAt: party.createdAt
        }));

        return NextResponse.json({ parties: serializedParties });
    } catch (error) {
        console.error('Get parties error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
