import { Navigation } from '@/components';
import Link from 'next/link';
import { RaceDetail } from '@/types';
import TraitHoverBadge from '@/components/ui/trait-hover-badge';

type TraitDetail = { index: string; name: string; desc: string[] };

export default async function RaceDetailPage({ params }: { params: Promise<{ race: string }> }) {
    const { race } = await params;
    
    const response = await fetch(`https://www.dnd5eapi.co/api/races/${race}`);
    const data: RaceDetail = await response.json();

    // Fetch all trait descriptions in parallel
    const traitDetails: TraitDetail[] = await Promise.all(
        data.traits.map((t) =>
            fetch(`https://www.dnd5eapi.co/api/traits/${t.index}`).then((r) => r.json())
        )
    );
    const traitMap = new Map(traitDetails.map((t) => [t.index, t]));

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <div className="max-w-4xl mx-auto p-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-6 shadow-lg">
                    <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
                    <div className="flex gap-6 text-lg">
                        <span>⚡ Speed: {data.speed} ft</span>
                        <span>📏 Size: {data.size}</span>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Left Column - Ability Bonuses */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ability Score Bonuses</h2>
                        <div className="space-y-3">
                            {data.ability_bonuses.map((bonus) => (
                                <div key={bonus.ability_score.index} 
                                     className="flex justify-between items-center bg-blue-50 p-3 rounded">
                                    <span className="font-semibold text-gray-700">
                                        {bonus.ability_score.name}
                                    </span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        +{bonus.bonus}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Traits */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Racial Traits</h2>
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
                <div className="bg-white rounded-lg p-6 shadow-md mt-6">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">Languages</h2>
                    <p className="text-gray-600 mb-3">{data.language_desc}</p>
                    <div className="flex flex-wrap gap-2">
                        {data.languages.map((language) => (
                            <span key={language.index} 
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                {language.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Age & Alignment Section */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Age</h2>
                        <p className="text-gray-600">{data.age}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Alignment</h2>
                        <p className="text-gray-600">{data.alignment}</p>
                    </div>
                </div>

                {/* Size Description */}
                <div className="bg-white rounded-lg p-6 shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">Size & Build</h2>
                    <p className="text-gray-600">{data.size_description}</p>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link href="/races" className="standard-button inline-block">
                        ← Back to All Races
                    </Link>
                </div>
            </div>
        </div>
    );
}