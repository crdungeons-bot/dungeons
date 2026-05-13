import RaceSelectStep    from '@/components/character-creation/race-select-step';
import ClassSelectStep   from '@/components/character-creation/class-select-step';
import SubclassSelectStep from '@/components/character-creation/subclass-select-step';
import BackgroundStep    from '@/components/character-creation/background-step';
import ProficiencyStep   from '@/components/character-creation/proficiency-step';
import StoryStep         from '@/components/character-creation/story-step';
import StatsStep         from '@/components/character-creation/stats-step';
import SummaryStep       from '@/components/character-creation/summary-step';
import clientPromise from '@/lib/mongo';
import CharacterCreationWrapper from '@/components/character-creation/creation-wrapper';
import CharacterCreationProgressNav from '@/components/character-creation/creation-progress-nav';

type ApiItem = { index: string; name: string; url: string };
type ApiList  = { count: number; results: ApiItem[] };

const STEPS = ['Race', 'Class', 'Subclass', 'Background', 'Proficiencies', 'Story', 'Stats', 'Review'] as const;

export default async function CreateCharacterPage({
    searchParams,
}: {
    searchParams: Promise<{
        step?: string;
    }>;
}) {
    const params = await searchParams;
    const currentStep = Number(params.step ?? '1');

    // Always show all steps - the client components will handle conditional logic
    const effectiveSteps = STEPS;

    // Query MongoDB directly (works in production without localhost)
    const client = await clientPromise;
    const db = client.db('dnd-resources');

    // Steps 1–2 need the full list
    let data: ApiList = { count: 0, results: [] };
    if (currentStep === 1) {
        const races = await db.collection('races').find().sort({ name: 1 }).toArray();
        data = {
            count: races.length,
            results: races.map(r => ({ index: r.index, name: r.name, url: r.url || '' })) as ApiItem[],
        };
    } else if (currentStep === 2) {
        const classes = await db.collection('classes').find().sort({ name: 1 }).toArray();
        data = {
            count: classes.length,
            results: classes.map(c => ({ index: c.index, name: c.name, url: c.url || '' })) as ApiItem[],
        };
    }

    // For the background step (always step 4 now), fetch all backgrounds
    let backgrounds: object[] = [];
    if (currentStep === 4) {
        backgrounds = await db.collection('backgrounds').find().sort({ name: 1 }).toArray();
    }

    return (
        <CharacterCreationWrapper>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                backgroundColor: 'var(--color-primary)',
            }}>
            {/* ── Step header ── */}
            <div style={{
                padding: '1.25rem 2rem 1rem',
                borderBottom: '1px solid rgba(212,175,55,0.15)',
                backgroundColor: 'var(--color-primary-dark)',
                flexShrink: 0,
            }}>
                <p style={{
                    color: 'rgba(212,175,55,0.45)',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    margin: '0 0 0.2rem',
                }}>
                    Character Creation
                </p>
                <h1 style={{
                    color: 'var(--color-gold)',
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    margin: '0 0 1rem',
                }}>
                    {currentStep === 1 ? 'Step 1: Choose Your Race' :
                     currentStep === 2 ? 'Step 2: Choose Your Class' :
                     currentStep === 3 ? 'Step 3: Choose Your Subclass' :
                     currentStep === 4 ? 'Step 4: Choose Your Background' :
                     currentStep === 5 ? 'Step 5: Choose Your Proficiencies' :
                     currentStep === 6 ? 'Step 6: Tell Your Story' :
                     currentStep === 7 ? 'Step 7: Roll Your Stats' :
                     '⚔ Review & Create'}
                </h1>

                <CharacterCreationProgressNav steps={effectiveSteps} currentStep={currentStep} />
            </div>

            {/* ── Step content ── */}
            {currentStep === 1 && (
                <RaceSelectStep
                    races={data.results}
                />
            )}

            {currentStep === 2 && (
                <ClassSelectStep
                    classes={data.results}
                />
            )}

            {currentStep === 3 && (
                <SubclassSelectStep />
            )}

            {currentStep === 4 && (
                <BackgroundStep
                    backgrounds={backgrounds as []}
                />
            )}

            {currentStep === 5 && (
                <ProficiencyStep />
            )}

            {currentStep === 6 && <StoryStep />}

            {currentStep === 7 && <StatsStep />}

            {currentStep === 8 && <SummaryStep />}
        </div>
        </CharacterCreationWrapper>
    );
}
