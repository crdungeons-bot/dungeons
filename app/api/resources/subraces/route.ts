/**
 * API Route: GET /api/resources/subraces
 * 
 * Query subraces from the dnd-resources.subraces collection.
 * 
 * Query params:
 *   - race: Filter by race (e.g., "dwarf", "elf", "dragonborn")
 *   - name: Filter by subrace name
 *   - source: Filter by sourcebook
 */

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const race = searchParams.get('race');
    const name = searchParams.get('name');
    const source = searchParams.get('source');

    const client = await clientPromise;
    const db = client.db('dnd-resources');
    const collection = db.collection('subraces');

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (race) filter.race = race;
    if (name) filter.name = new RegExp(name, 'i');
    if (source) filter.source = source;

    // Fetch subraces
    const subraces = await collection
      .find(filter)
      .sort({ race: 1, name: 1 })
      .toArray();

    return NextResponse.json(
      {
        results: subraces,
        count: subraces.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching subraces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subraces' },
      { status: 500 }
    );
  }
}
