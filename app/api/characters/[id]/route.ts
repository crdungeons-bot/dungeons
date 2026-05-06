import { NextRequest, NextResponse } from 'next/server';
import { ObjectId }                  from 'mongodb';
import clientPromise                 from '@/lib/mongo';

/* ── shared helper ── */
function mapCharacter(character: Record<string, unknown>) {
    return {
        id:            (character._id as ObjectId).toString(),
        name:          character.name,
        race:          character.race,
        class:         character.class,
        background:    character.background,
        alignment:     character.alignment,
        level:         character.level          ?? 1,
        hp:            character.hp             ?? null,
        currency:      character.currency       ?? { pp: 0, gp: 0, sp: 0, cp: 0 },
        height:        character.height         ?? null,
        weight:        character.weight         ?? null,
        age:           character.age            ?? null,
        proficiencies: character.proficiencies  ?? [],
        stats:         character.stats          ?? {},
        story:         character.story          ?? {},
        createdAt:     character.createdAt,
    };
}

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid character ID' }, { status: 400 });
    }

    try {
        const client    = await clientPromise;
        const db        = client.db('dnd-app');
        const character = await db
            .collection('characters')
            .findOne({ _id: new ObjectId(id) });

        if (!character) {
            return NextResponse.json({ error: 'Character not found' }, { status: 404 });
        }

        return NextResponse.json({ character: mapCharacter(character as Record<string, unknown>) });
    } catch (error) {
        console.error('Fetch character error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid character ID' }, { status: 400 });
    }

    try {
        const body   = await request.json();
        const update: Record<string, unknown> = {};

        if (body.level    !== undefined) update.level    = body.level;
        if (body.hp       !== undefined) update.hp       = body.hp;
        if (body.stats    !== undefined) update.stats    = body.stats;
        if (body.currency !== undefined) update.currency = body.currency;

        const client = await clientPromise;
        const db     = client.db('dnd-app');

        await db.collection('characters').updateOne(
            { _id: new ObjectId(id) },
            { $set: update },
        );

        const updated = await db
            .collection('characters')
            .findOne({ _id: new ObjectId(id) });

        if (!updated) {
            return NextResponse.json({ error: 'Character not found after update' }, { status: 404 });
        }

        return NextResponse.json({ character: mapCharacter(updated as Record<string, unknown>) });
    } catch (error) {
        console.error('Level up error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
