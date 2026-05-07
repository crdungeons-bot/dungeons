import { Navigation } from '@/components';
import Link from 'next/link';
import { ClassDetail } from '@/types';

export default async function ClassDetailPage({ params }: { params: Promise<{ class: string }> }) {
    const { class: className } = await params;

    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}`);
    const data: ClassDetail = await response.json();

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Navigation />

            {/* Epic Hero Section with Background Image */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(/images/dnd-classes/${className}.png)`,
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
                    <div className="text-3xl" style={{ color: 'var(--color-parchment)' }}>
                        🎲 Hit Die: d{data.hit_die}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 py-12 -mt-20 relative z-20">
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Saving Throws */}
                    <div className="card-dnd">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                            Saving Throws
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {data.saving_throws.map((st) => (
                                <span 
                                    key={st.index} 
                                    className="px-5 py-3 rounded-lg font-semibold text-lg"
                                    style={{
                                        backgroundColor: 'var(--color-accent)',
                                        color: 'var(--color-gold)',
                                        border: '2px solid var(--color-gold-dark)',
                                        textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                                    }}
                                >
                                    {st.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Proficiencies */}
                    <div className="card-dnd">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                            Proficiencies
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.proficiencies.map((prof) => (
                                <span 
                                    key={prof.index} 
                                    className="px-3 py-2 rounded-full text-sm font-medium"
                                    style={{
                                        backgroundColor: 'var(--color-primary-light)',
                                        border: '1px solid var(--color-gold-dark)',
                                        color: 'var(--color-parchment)'
                                    }}
                                >
                                    {prof.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Starting Equipment */}
                <div className="card-dnd mb-6">
                    <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                        Starting Equipment
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.starting_equipment.map((item) => (
                            <div 
                                key={item.equipment.index} 
                                className="p-4 rounded-lg text-center"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    border: '2px solid var(--color-gold-dark)',
                                }}
                            >
                                <div style={{ color: 'var(--color-parchment)', fontWeight: '600', marginBottom: '0.25rem' }}>
                                    {item.equipment.name}
                                </div>
                                <div 
                                    className="text-xl font-bold"
                                    style={{ color: 'var(--color-gold)' }}
                                >
                                    x{item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Proficiency Choices */}
                {data.proficiency_choices.length > 0 && (
                    <div className="card-dnd mb-8">
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-gold)' }}>
                            Proficiency Choices
                        </h2>
                        {data.proficiency_choices.map((choice, index) => (
                            <div 
                                key={index} 
                                className="p-4 rounded-lg mb-3"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    border: '1px solid var(--color-gold-dark)'
                                }}
                            >
                                <p 
                                    className="text-lg italic"
                                    style={{ color: 'var(--color-parchment)' }}
                                >
                                    {choice.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back Button */}
                <div className="text-center">
                    <Link href="/classes" className="btn-secondary inline-block">
                        ← Back to All Classes
                    </Link>
                </div>
            </div>
        </div>
    );
}
