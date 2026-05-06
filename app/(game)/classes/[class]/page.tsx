import { Navigation } from '@/components';
import Link from 'next/link';
import { ClassDetail } from '@/types';

export default async function ClassDetailPage({ params }: { params: Promise<{ class: string }> }) {
    const { class: className } = await params;

    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}`);
    const data: ClassDetail = await response.json();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary)' }}>
            <Navigation />

            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--color-accent-dark), var(--color-primary-light))',
                    border: '2px solid var(--color-gold)',
                    borderRadius: '0.5rem',
                    padding: '2rem',
                    marginBottom: '1.5rem'
                }}>
                    <h1 style={{ fontSize: '3rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                        {data.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-parchment)' }}>
                        🎲 Hit Die: d{data.hit_die}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Saving Throws */}
                    <div className="card-dnd">
                        <h2 style={{ color: 'var(--color-primary)' }}>Saving Throws</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.saving_throws.map((st) => (
                                <span key={st.index} style={{
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontWeight: '600',
                                    fontSize: '0.875rem'
                                }}>
                                    {st.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Proficiencies */}
                    <div className="card-dnd">
                        <h2 style={{ color: 'var(--color-primary)' }}>Proficiencies</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.proficiencies.map((prof) => (
                                <span key={prof.index} style={{
                                    backgroundColor: 'var(--color-primary)',
                                    border: '1px solid var(--color-gold)',
                                    color: 'var(--color-gold)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem'
                                }}>
                                    {prof.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Starting Equipment */}
                <div className="card-dnd mt-6">
                    <h2 style={{ color: 'var(--color-primary)' }}>Starting Equipment</h2>
                    <div className="flex flex-wrap gap-3 mt-3">
                        {data.starting_equipment.map((item) => (
                            <div key={item.equipment.index} style={{
                                backgroundColor: 'var(--color-primary)',
                                border: '1px solid var(--color-gold)',
                                borderRadius: '0.5rem',
                                padding: '0.5rem 1rem',
                            }}>
                                <span style={{ color: 'var(--color-parchment)', fontWeight: '500' }}>
                                    {item.equipment.name}
                                </span>
                                <span style={{ color: 'var(--color-gold)', marginLeft: '0.5rem' }}>
                                    x{item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Proficiency Choices */}
                {data.proficiency_choices.length > 0 && (
                    <div className="card-dnd mt-6">
                        <h2 style={{ color: 'var(--color-primary)' }}>Proficiency Choices</h2>
                        {data.proficiency_choices.map((choice, index) => (
                            <div key={index} className="mt-3">
                                <p style={{ color: 'var(--color-primary)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                                    {choice.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-8">
                    <Link href="/classes" className="btn-secondary inline-block">
                        ← Back to All Classes
                    </Link>
                </div>
            </div>
        </div>
    );
}
