import { Card } from '@/components';
import { ClassDetail } from '@/types';
import clientPromise from '@/lib/mongo';

const CLASS_DESCRIPTIONS: Record<string, string> = {
    artificer: 'Master inventor fusing magic and technology, turning scrap into sentient guardians.',
    barbarian: 'Primal rage made flesh,   nearly impossible to kill and devastating up close.',
    bard:      'Magic through music and wit, inspiring allies and turning battles with words alone.',
    cleric:    'Divine power channeled through faith,   healer, warrior, and vessel of the gods.',
    druid:     'Shape-shifter and nature\'s champion, wielding elemental forces and wild magic.',
    fighter:   'Disciplined, versatile, and devastating,   the purest expression of martial mastery.',
    monk:      'Ki-powered unarmed combatant,   fluid, precise, and blindingly fast.',
    paladin:   'Holy warrior bound by a sacred oath, fusing heavy armour with divine magic.',
    ranger:    'Hunter and tracker who thrives in the wild, pairing archery with nature magic.',
    rogue:     'Precision striker who exploits every opening for one perfectly calculated blow.',
    sorcerer:  'Raw arcane power from within,   innate, wild, and impossible to suppress.',
    warlock:   'Pact-bound caster trading service to a dark patron for eldritch, rechargeable power.',
    wizard:    'The broadest spell arsenal in existence, earned through decades of obsessive study.',
};

export default async function ClassesSection() {
    const client = await clientPromise;
    const collection = client.db('dnd-resources').collection('classes');
    
    const classes = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ name: 1 })
        .toArray() as unknown as ClassDetail[];

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
                    Classes ({classes.length})
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {classes.map((dndClass) => (
                    <Card
                        key={dndClass.index}
                        title={dndClass.name}
                        description={CLASS_DESCRIPTIONS[dndClass.index] ?? `A legendary class with a rich place in the world's history.`}
                        url={`/dashboard?section=classes&item=${dndClass.index}`}
                        image={`/images/dnd-classes/${dndClass.index}.png`}
                        showCreate
                        createUrl={`/create-character?preselect_class=${dndClass.index}`}
                    />
                ))}
            </div>
        </div>
    );
}
