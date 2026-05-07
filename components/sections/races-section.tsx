import { Card } from '@/components';
import { Race, RacesResponse } from '@/types';

const RACE_DESCRIPTIONS: Record<string, string> = {
    dragonborn: 'Proud dragon-blooded warriors with a breath weapon and a fierce, uncompromising sense of honour.',
    dwarf:      'Stout and unyielding, masters of stone and steel forged by centuries underground.',
    elf:        'Ancient and graceful, blessed with keen senses, arcane talent, and centuries of hard-won wisdom.',
    gnome:      'Small in stature, boundless in curiosity ,  natural tinkerers with a gift for illusion.',
    'half-elf': 'Born of two worlds, blending human ambition with elven charm, perception, and longevity.',
    'half-orc': 'Ferocious and tenacious, they refuse to fall even when death seems certain.',
    halfling:   'Nimble and uncannily lucky, halflings slip through danger with a cheerful, unshakeable calm.',
    human:      'Endlessly adaptable and fiercely ambitious ,  humans shape the world through sheer determination.',
    tiefling:   'Marked by infernal heritage, they are cunning survivors who forge their own fate despite the world\'s suspicion.',
};

export default async function RacesSection() {
    const response = await fetch('https://www.dnd5eapi.co/api/races');
    const data: RacesResponse = await response.json();

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                }}>
                    Resources
                </p>
                <h1 style={{ color: 'var(--color-gold)', margin: 0 }}>
                    Races ({data.count})
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.results.map((race: Race) => (
                    <Card
                        key={race.index}
                        title={race.name}
                        description={RACE_DESCRIPTIONS[race.index] ?? `A proud and storied race with a rich place in the world's history.`}
                        url={`/dashboard?section=races&item=${race.index}`}
                        image={`/images/races/${race.index}.png`}
                        showCreate
                        createUrl={`/create-character?preselect=${race.index}`}
                    />
                ))}
            </div>
        </div>
    );
}
