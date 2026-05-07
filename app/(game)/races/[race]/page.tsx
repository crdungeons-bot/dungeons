import { Navigation } from '@/components';
import Link from 'next/link';
import { RaceDetail } from '@/types';
import TraitHoverBadge from '@/components/ui/trait-hover-badge';

type TraitDetail = { index: string; name: string; desc: string[] };

export default async function RaceDetailPage({ params }: { params: Promise<{ race: string }> }) {
    const { race } = await params;
    
    const response = await fetch(`https://www.dnd5eapi.co/api/races/${race}`);
    const data: RaceDetail = await response.json();

    const traitDetails: TraitDetail[] = await Promise.all(
        data.traits.map((t) =>
            fetch(`https://www.dnd5eapi.co/api/traits/${t.index}`).then((r) => r.json())
        )
    );
    const traitMap = new Map(traitDetails.map((t) => [t.index, t]));

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Navigation />
            
            {/* Epic Hero Section with Background Image */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(/images/races/${race}.png)`,
                        filter: 'brightness(0.4)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[var(--color-primary)]" />
                
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 
                        className="text-7xl md:text-8xl font-bold mb-6 tracking-wide"
                        style={{
                            color: 'var(--color-gold)',
                            textShadow: '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)',
                            fontFamily: 'var(--font-accent)'
                        }}
                    >
                        {data.name}
                    </h1>
                    <div className="flex gap-8 justify-center text-2xl" style={{ color: 'var(--color-parchment)' }}>
                        <span>⚡ Speed: {data.speed} ft</span>
                        <span>📏 {data.size}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 py-12 -mt-20 relative z-20">
                
                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    
                    {/* Ability Bonuses */}
                    <div className="card-dnd">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                            Ability Score Bonuses
                        </h2>
                        <div className="space-y-3">
                            {data.ability_bonuses.map((bonus) => (
                                <div 
                                    key={bonus.ability_score.index} 
                                    className="flex justify-between items-center p-4 rounded-lg"
                                    style={{
                                        backgroundColor: 'var(--color-accent)',
                                        border: '1px solid var(--color-gold-dark)'
                                    }}
                                >
                                    <span className="font-semibold text-xl" style={{ color: 'var(--color-parchment)' }}>
                                        {bonus.ability_score.name}
                                    </span>
                                    <span className="text-3xl font-bold" style={{ color: 'var(--color-gold)' }}>
                                        +{bonus.bonus}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Racial Traits */}
                    <div className="card-dnd">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                            Racial Traits
                        </h2>
                        <div className="space-y-2">
                            {data.traits.map((trait) => (
                                <TraitHoverBadge
                                    key={trait.index}
                                    name={trait.name}
                                    desc={traitMap.get(trait.index)?.desc ?? []}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Languages Section */}
                <div className="card-dnd mb-6">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-gold)' }}>
                        Languages
                    </h2>
                    <p className="mb-4 text-lg" style={{ color: 'var(--color-parchment)' }}>
                        {data.language_desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {data.languages.map((language) => (
                            <span 
                                key={language.index} 
                                className="px-4 py-2 rounded-full text-sm font-semibold"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'var(--color-gold)',
                                    border: '1px solid var(--color-gold-dark)'
                                }}
                            >
                                {language.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Age & Alignment Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="card-dnd">
                        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-gold)' }}>
                            Age
                        </h2>
                        <p style={{ color: 'var(--color-parchment)' }}>{data.age}</p>
                    </div>
                    
                    <div className="card-dnd">
                        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-gold)' }}>
                            Alignment
                        </h2>
                        <p style={{ color: 'var(--color-parchment)' }}>{data.alignment}</p>
                    </div>
                </div>

                {/* Size Description */}
                <div className="card-dnd mb-8">
                    <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-gold)' }}>
                        Size & Build
                    </h2>
                    <p style={{ color: 'var(--color-parchment)' }}>{data.size_description}</p>
                </div>

                {/* Back Button */}
                <div className="text-center">
                    <Link href="/races" className="btn-secondary inline-block">
                        ← Back to All Races
                    </Link>
                </div>
            </div>
        </div>
    );
}