import { RacesResponse, RaceDetail } from '@/types';
import TraitAccordion from '@/components/ui/trait-tooltip';

type TraitDetail = {
    index: string;
    name: string;
    desc: string[];
    races: { index: string; name: string }[];
};

export default async function RacialAbilitiesSection() {
    // Step 1: get the race list
    const listRes = await fetch('https://www.dnd5eapi.co/api/races');
    const list: RacesResponse = await listRes.json();

    // Step 2: fetch all race details in parallel to get their trait lists
    const raceDetails: RaceDetail[] = await Promise.all(
        list.results.map((r) =>
            fetch(`https://www.dnd5eapi.co/api/races/${r.index}`).then((res) => res.json())
        )
    );

    // Step 3: collect every unique trait index across all races
    const traitIndexSet = new Set<string>();
    raceDetails.forEach((race) => race.traits.forEach((t) => traitIndexSet.add(t.index)));

    // Step 4: fetch all trait details in parallel
    const traitDetailList: TraitDetail[] = await Promise.all(
        [...traitIndexSet].map((idx) =>
            fetch(`https://www.dnd5eapi.co/api/traits/${idx}`).then((res) => res.json())
        )
    );

    // Step 5: build a lookup map for quick access
    const traitMap = new Map<string, TraitDetail>();
    traitDetailList.forEach((t) => traitMap.set(t.index, t));

    return (
        <div style={{ padding: '2rem', maxWidth: '860px' }}>
            {/* Page header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <p style={{
                    color: 'var(--color-accent-light)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                }}>
                    Resources
                </p>
                <h1 style={{ color: 'var(--color-gold)', margin: '0 0 0.5rem' }}>
                    Racial Abilities
                </h1>
                <p style={{ color: 'rgba(244,232,208,0.45)', fontSize: '0.9rem', margin: 0 }}>
                    Every innate ability granted by race,   hover a trait on any race card to preview it in context.
                </p>
            </div>

            {/* One block per race */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {raceDetails.map((race) => (
                    <div key={race.index}>
                        {/* Race header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.75rem',
                            marginBottom: '0.75rem',
                        }}>
                            <h2 style={{
                                color: 'var(--color-gold)',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                margin: 0,
                                letterSpacing: '0.04em',
                            }}>
                                {race.name}
                            </h2>
                            <span style={{
                                color: 'rgba(212,175,55,0.35)',
                                fontSize: '0.75rem',
                            }}>
                                {race.traits.length} {race.traits.length === 1 ? 'trait' : 'traits'}
                            </span>
                        </div>

                        {race.traits.length === 0 ? (
                            <p style={{
                                color: 'rgba(244,232,208,0.3)',
                                fontSize: '0.875rem',
                                fontStyle: 'italic',
                                paddingLeft: '1rem',
                            }}>
                                No special racial traits.
                            </p>
                        ) : (
                        <div style={{
                            backgroundColor: 'var(--color-primary-light)',
                            border: '1px solid rgba(212,175,55,0.15)',
                            borderRadius: '0.5rem',
                            overflow: 'visible',
                        }}>
                            {race.traits.map((traitRef, idx) => {
                                const detail = traitMap.get(traitRef.index);
                                const isLast = idx === race.traits.length - 1;
                                return (
                                    <TraitAccordion
                                        key={traitRef.index}
                                        name={traitRef.name}
                                        desc={detail?.desc ?? []}
                                        isLast={isLast}
                                    />
                                );
                            })}
                        </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
