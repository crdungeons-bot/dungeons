import RaceSelectStep    from '@/components/character-creation/race-select-step';
import ClassSelectStep   from '@/components/character-creation/class-select-step';
import BackgroundStep    from '@/components/character-creation/background-step';
import ProficiencyStep   from '@/components/character-creation/proficiency-step';
import StoryStep         from '@/components/character-creation/story-step';
import StatsStep         from '@/components/character-creation/stats-step';
import SummaryStep       from '@/components/character-creation/summary-step';
import { STATIC_BACKGROUNDS } from '@/data/backgrounds';

type ApiItem = { index: string; name: string; url: string };
type ApiList  = { count: number; results: ApiItem[] };

const STEPS = ['Race', 'Class', 'Background', 'Proficiencies', 'Story', 'Stats', 'Review'];

export default async function CreateCharacterPage({
    searchParams,
}: {
    searchParams: Promise<{
        step?: string;
        preselect?: string;
        preselect_class?: string;
        race?: string;
        class?: string;
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

    // Steps 1–2 need the full list; step 4 needs race+class detail; others need nothing
    const listUrl =
        currentStep === 2 ? 'https://www.dnd5eapi.co/api/classes' :
                            'https://www.dnd5eapi.co/api/races';

    const data: ApiList = currentStep <= 2
        ? await fetch(listUrl, { cache: 'force-cache' }).then(r => r.json())
        : { count: 0, results: [] };

    // For the proficiency step, fetch race + class detail in parallel
    const [raceApiData, classApiData] = currentStep === 4 && params.race && params.class
        ? await Promise.all([
            fetch(`https://www.dnd5eapi.co/api/races/${params.race}`,   { cache: 'force-cache' }).then(r => r.json()),
            fetch(`https://www.dnd5eapi.co/api/classes/${params.class}`, { cache: 'force-cache' }).then(r => r.json()),
          ])
        : [null, null];

    const stepLabel = STEPS[currentStep - 1] ?? 'Race';

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
                    {currentStep === 7
                        ? '⚔ Review & Create'
                        : `Step ${currentStep}: ${
                            currentStep === 4 ? 'Choose Your Proficiencies' :
                            currentStep === 5 ? 'Tell Your Story'           :
                            currentStep === 6 ? 'Roll Your Stats'           :
                            `Choose Your ${stepLabel}`
                          }`}
                </h1>

                {/* Progress indicator */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {STEPS.map((label, i) => {
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
                                        fontSize: '0.75rem',
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

                                {i < STEPS.length - 1 && (
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
                />
            )}

            {currentStep === 2 && (
                <ClassSelectStep
                    classes={data.results}
                    preselect={params.preselect_class}
                    race={params.race}
                />
            )}

            {currentStep === 3 && (
                <BackgroundStep
                    backgrounds={STATIC_BACKGROUNDS}
                    race={params.race}
                    dndClass={params.class}
                />
            )}

            {currentStep === 4 && (
                <ProficiencyStep
                    race={params.race}
                    dndClass={params.class}
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

            {currentStep === 5 && (
                <StoryStep
                    race={params.race}
                    dndClass={params.class}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === 6 && (
                <StatsStep
                    race={params.race}
                    dndClass={params.class}
                    name={params.name}
                    background={params.background}
                    alignment={params.alignment}
                    height={params.height}
                    weight={params.weight}
                    age={params.age}
                    proficiencies={params.proficiencies}
                />
            )}

            {currentStep === 7 && (
                <SummaryStep
                    race={params.race}
                    dndClass={params.class}
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
