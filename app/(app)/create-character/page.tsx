import RaceSelectStep    from '@/components/character-creation/race-select-step';
import ClassSelectStep   from '@/components/character-creation/class-select-step';
import SubclassSelectStep from '@/components/character-creation/subclass-select-step';
import BackgroundStep    from '@/components/character-creation/background-step';
import ProficiencyStep   from '@/components/character-creation/proficiency-step';
import StoryStep         from '@/components/character-creation/story-step';
import StatsStep         from '@/components/character-creation/stats-step';
import SummaryStep       from '@/components/character-creation/summary-step';
import { STATIC_BACKGROUNDS } from '@/data/backgrounds';
import clientPromise from '@/lib/mongo';

type ApiItem = { index: string; name: string; url: string };
type ApiList  = { count: number; results: ApiItem[] };

const STEPS = ['Race', 'Class', 'Subclass', 'Background', 'Proficiencies', 'Story', 'Stats', 'Review'];

// Classes that choose subclass at level 1
const LEVEL_1_SUBCLASS_CLASSES = ['cleric', 'warlock'];

export default async function CreateCharacterPage({
    searchParams,
}: {
    searchParams: Promise<{
        step?: string;
        preselect?: string;
        preselect_class?: string;
        race?: string;
        class?: string;
        subclass?: string;
        name?: string;
        background?: string;
        alignment?: string;
        height?: string;
        weight?: string;
        age?: string;
        proficiencies?: string;
    }>;
}) {
    const params = await searchParams;
    const currentStep = Number(params.step ?? '1');

    // Check if we need to show subclass step
    const needsSubclassStep = params.class && LEVEL_1_SUBCLASS_CLASSES.includes(params.class);
    
    // Adjust step display if subclass step is not needed
    const effectiveSteps = needsSubclassStep 
        ? STEPS 
        : STEPS.filter(s => s !== 'Subclass');

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

    // For the proficiency step (now step 5 if subclass shown, step 4 otherwise), fetch race + class detail in parallel
    const proficiencyStep = needsSubclassStep ? 5 : 4;
    let raceApiData = null;
    let classApiData = null;
    if (currentStep === proficiencyStep && params.race && params.class) {
        raceApiData = await db.collection('races').findOne({ index: params.race });
        classApiData = await db.collection('classes').findOne({ index: params.class });
    }

    const stepLabel = effectiveSteps[currentStep - 1] ?? 'Race';

    return (
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
                    {currentStep === effectiveSteps.length
                        ? '⚔ Review & Create'
                        : currentStep === proficiencyStep ? 'Step ' + currentStep + ': Choose Your Proficiencies' :
                          currentStep === proficiencyStep + 1 ? 'Step ' + currentStep + ': Tell Your Story' :
                          currentStep === proficiencyStep + 2 ? 'Step ' + currentStep + ': Roll Your Stats' :
                          `Step ${currentStep}: Choose Your ${stepLabel}`}
                </h1>

                {/* Progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {effectiveSteps.map((label, i) => {
                        const stepNum  = i + 1;
                        const isDone   = stepNum < currentStep;
                        const isActive = stepNum === currentStep;

                        return (
                            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '50%',
                                        backgroundColor: isDone || isActive ? 'var(--color-gold)' : 'transparent',
                                        border: `1.5px solid ${isDone || isActive ? 'var(--color-gold)' : 'rgba(212,175,55,0.25)'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        color: isDone || isActive ? 'var(--color-primary)' : 'rgba(212,175,55,0.25)',
                                        flexShrink: 0,
                                    }}>
                                        {isDone ? '✓' : stepNum}
                                    </div>
                                    <span style={{
                                        fontSize: isActive ? '0.75rem' : '0rem',
                                        color: isActive
                                            ? 'var(--color-gold)'
                                            : isDone
                                                ? 'rgba(212,175,55,0.7)'
                                                : 'rgba(212,175,55,0.25)',
                                        fontWeight: isActive ? '700' : '400',
                                    }}>
                                        {label}
                                    </span>
                                </div>

                                {i < effectiveSteps.length - 1 && (
                                    <div style={{
                                        width: '28px',
                                        height: '1.5px',
                                        margin: '0 0.375rem',
                                        backgroundColor: isDone ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)',
                                    }} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Step content ── */}
            {currentStep === 1 && (
                <RaceSelectStep
                    races={data.results}
                    preselect={params.preselect}
                    preselectClass={params.preselect_class}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === 2 && (
                <ClassSelectStep
                    classes={data.results}
                    preselect={params.preselect_class}
                    race={params.race}
                    subclass={params.subclass}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === 3 && needsSubclassStep && params.class && (
                <SubclassSelectStep
                    characterClass={params.class}
                    race={params.race}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === (needsSubclassStep ? 4 : 3) && (
                <BackgroundStep
                    backgrounds={STATIC_BACKGROUNDS}
                    race={params.race}
                    dndClass={params.class}
                    subclass={params.subclass}
                />
            )}

            {currentStep === (needsSubclassStep ? 5 : 4) && (
                <ProficiencyStep
                    race={params.race}
                    dndClass={params.class}
                    subclass={params.subclass}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    raceApiData={raceApiData}
                    classApiData={classApiData}
                />
            )}

            {currentStep === (needsSubclassStep ? 6 : 5) && (
                <StoryStep
                    race={params.race}
                    dndClass={params.class}
                    subclass={params.subclass}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === (needsSubclassStep ? 7 : 6) && (
                <StatsStep
                    race={params.race}
                    dndClass={params.class}
                    subclass={params.subclass}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === (needsSubclassStep ? 8 : 7) && (
                <SummaryStep
                    race={params.race}
                    dndClass={params.class}
                    subclass={params.subclass}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}
        </div>
    );
}
