import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

/**
 * GET /api/resources/character-abilities
 *
 * Fetches all abilities for a character including:
 * - Class features (from classes collection)
 * - Subclass features (from subclasses collection)
 * - Spells and racial abilities (from spells-abilities collection)
 *
 * Query parameters:
 *   class         - Character's class (required)
 *   race          - Character's race (required)
 *   level         - Character's level (required)
 *   subclass      - Character's subclass name (optional)
 *
 * Returns: { 
 *   classFeatures: ClassFeature[],
 *   subclassFeatures: SubclassFeature[],
 *   spellsAndAbilities: SpellEntry[],
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const charClass = searchParams.get('class');
        const charRace = searchParams.get('race');
        const charLevel = parseInt(searchParams.get('level') ?? '1', 10);
        const subclassName = searchParams.get('subclass');

        if (!charClass || !charRace) {
            return NextResponse.json(
                { error: 'Missing required parameters: class and race' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('dnd-resources');

        // ── 1. Fetch CLASS features ──────────────────────────────────
        const classesCol = db.collection('classes');
        const classData = await classesCol.findOne(
            { index: charClass },
            { projection: { _id: 0, features: 1 } }
        );

        const classFeatures: any[] = [];
        if (classData?.features) {
            // Get all features up to character's level
            for (const [level, features] of Object.entries(classData.features)) {
                const lvl = parseInt(level, 10);
                if (lvl <= charLevel && Array.isArray(features)) {
                    classFeatures.push(...features.map((f: any) => ({
                        ...f,
                        level: lvl,
                        source: 'class'
                    })));
                }
            }
        }

        // ── 2. Fetch SUBCLASS features ───────────────────────────────
        let subclassFeatures: any[] = [];
        if (subclassName) {
            const subclassesCol = db.collection('subclasses');
            const subclassData = await subclassesCol.findOne(
                { name: subclassName, class: charClass },
                { projection: { _id: 0, features: 1, spells: 1, proficiencies: 1, resources: 1 } }
            );

            if (subclassData?.features) {
                // Get all subclass features up to character's level
                for (const [level, features] of Object.entries(subclassData.features)) {
                    const lvl = parseInt(level, 10);
                    if (lvl <= charLevel && Array.isArray(features)) {
                        subclassFeatures.push(...features.map((f: any) => ({
                            ...f,
                            level: lvl,
                            source: 'subclass'
                        })));
                    }
                }
            }

            // Add subclass proficiencies as a feature if they exist
            if (subclassData?.proficiencies) {
                const profList: string[] = [];
                const prof = subclassData.proficiencies;
                if (prof.armor) profList.push(...prof.armor.map((a: string) => `${a} proficiency`));
                if (prof.weapons) profList.push(...prof.weapons.map((w: string) => `${w} proficiency`));
                if (prof.tools) profList.push(...prof.tools.map((t: string) => `${t} proficiency`));
                
                if (profList.length > 0) {
                    subclassFeatures.unshift({
                        name: 'Bonus Proficiencies',
                        level: subclassData.subclass_level ?? 1,
                        description: `You gain proficiency with: ${profList.join(', ')}`,
                        actionType: 'passive',
                        source: 'subclass'
                    });
                }
            }
        }

        // ── 3. Fetch SPELLS & ABILITIES ──────────────────────────────
        const spellsCol = db.collection('spells-abilities');
        
        // Build query for spells/abilities
        const spellFilter: any = {
            $or: [
                { classes: charClass },
                { races: charRace },
            ]
        };

        // Add subclass filter if applicable
        if (subclassName) {
            const subclassTag = `${subclassName.toLowerCase()} ${charClass}`;
            spellFilter.$or.push({ subclasses: subclassTag });
        }

        const spellsAndAbilities = await spellsCol
            .find(spellFilter, { projection: { _id: 0 } })
            .sort({ type: 1, levelGained: 1, level: 1, name: 1 })
            .toArray();

        return NextResponse.json(
            {
                classFeatures,
                subclassFeatures,
                spellsAndAbilities,
            },
            { 
                headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' }
            }
        );
    } catch (err) {
        console.error('[/api/resources/character-abilities] Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
