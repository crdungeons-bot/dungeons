import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/spells-abilities
 *
 * Query parameters (all optional):
 *   class       ,   filter to entries whose `classes` array contains this value
 *   race        ,   filter to entries whose `races` array contains this value
 *   type        ,   'spell' | 'class-ability' | 'racial-ability'
 *                  ('spell' means no `type` field in the document)
 *   levelMax    ,   for spells: only levels 0..levelMax
 *   levelGained ,   for abilities: only entries with this exact levelGained value
 *   school      ,   filter by spell school
 *   actionType  ,   filter by actionType
 *   concentration,   'true' | 'false'
 *   ritual       ,   'true' | 'false'
 *   q           ,   text search on name + description (case-insensitive substring)
 *
 * Returns: { entries: SpellEntry[], total: number }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const classParam    = searchParams.get('class');
        const raceParam     = searchParams.get('race');
        const typeParam     = searchParams.get('type');          // 'spell' | 'class-ability' | 'racial-ability'
        const levelMax      = searchParams.get('levelMax');      // max spell level (number)
        const levelGained   = searchParams.get('levelGained');   // exact ability level
        const school        = searchParams.get('school');
        const actionType    = searchParams.get('actionType');
        const concentration = searchParams.get('concentration'); // 'true' | 'false'
        const ritual        = searchParams.get('ritual');        // 'true' | 'false'
        const q             = searchParams.get('q');             // text search

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: Record<string, any> = {};

        // ── class / race ──────────────────────────────────────────
        // When both are given, find entries relevant to EITHER (used by
        // the character sheet to fetch everything for one character in a
        // single round-trip). When only one is given, filter exactly.
        if (classParam && raceParam) {
            filter.$or = [{ classes: classParam }, { races: raceParam }];
        } else {
            if (classParam) filter.classes = classParam;
            if (raceParam)  filter.races   = raceParam;
        }

        // ── type ──────────────────────────────────────────────────
        // 'spell'           → documents with no `type` field (or type: null)
        // 'class-ability'   → type: 'class-ability'
        // 'racial-ability'  → type: 'racial-ability'
        if (typeParam === 'spell') {
            filter.type = { $in: [null, undefined] };
            // MongoDB: documents where `type` does not exist or is null
            filter.$or = [{ type: { $exists: false } }, { type: null }];
            delete filter.type; // handled by $or
        } else if (typeParam) {
            filter.type = typeParam;
        }

        // ── spell level ───────────────────────────────────────────
        if (levelMax !== null) {
            const max = parseInt(levelMax, 10);
            if (!Number.isNaN(max)) filter.level = { $lte: max };
        }

        // ── ability level gained ───────────────────────────────────
        if (levelGained !== null) {
            const lg = parseInt(levelGained, 10);
            if (!Number.isNaN(lg)) filter.levelGained = lg;
        }

        // ── metadata ──────────────────────────────────────────────
        if (school)      filter.school     = school;
        if (actionType)  filter.actionType = actionType;

        if (concentration === 'true')  filter.concentration = true;
        if (concentration === 'false') filter.concentration = { $ne: true };
        if (ritual === 'true')         filter.ritual        = true;
        if (ritual === 'false')        filter.ritual        = { $ne: true };

        // ── text search ───────────────────────────────────────────
        if (q && q.trim()) {
            filter.name = { $regex: q.trim(), $options: 'i' };
        }

        const client     = await clientPromise;
        const collection = client.db('dnd-resources').collection('spells-abilities');

        const entries = await collection
            .find(filter, { projection: { _id: 0 } })
            .sort({ type: 1, levelGained: 1, level: 1, name: 1 })
            .toArray();

        return NextResponse.json(
            { entries, total: entries.length },
            { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
        );
    } catch (err) {
        console.error('[/api/resources/spells-abilities] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
