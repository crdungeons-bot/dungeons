import { NextRequest, NextResponse } from 'next/server';
import { ObjectId }                  from 'mongodb';
import clientPromise                 from '@/lib/mongo';

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId || !ObjectId.isValid(userId)) {
        return NextResponse.json({ error: 'Valid userId required' }, { status: 400 });
    }

    try {
        const client     = await clientPromise;
        const db         = client.db('dnd-app');
        const characters = await db
            .collection('characters')
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            characters: characters.map(c => ({
                id:         c._id.toString(),
                name:       c.name,
                race:       c.race,
                class:      c.class,
                background: c.background,
                alignment:  c.alignment,
                level:      c.level ?? 1,
                createdAt:  c.createdAt,
            })),
        });
    } catch (error) {
        console.error('Fetch characters error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            userId,
            name,
            race,
            dndClass,
            background,
            alignment,
            height,
            weight,
            age,
            proficiencies,
            stats,
            story,
            hp,
        } = body;

        if (!userId || !name || !race || !dndClass || !background || !alignment || !stats) {
            return NextResponse.json(
                { error: 'Missing required character fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db     = client.db('dnd-app');

        const result = await db.collection('characters').insertOne({
            userId: new ObjectId(userId),
            name:       name.trim(),
            race,
            class:      dndClass,
            background,
            alignment,
            height:        height        ?? null,
            weight:        weight        ?? null,
            age:           age           ?? null,
            proficiencies: proficiencies ?? [],
            stats,
            story:      story   ?? {},
            hp:         hp      ?? null,
            level:      1,
            createdAt:  new Date(),
        });

        return NextResponse.json({
            success: true,
            characterId: result.insertedId.toString(),
        });
    } catch (error) {
        console.error('Character creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
