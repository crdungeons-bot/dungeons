import RacesSection            from '@/components/sections/races-section';
import CharactersSection       from '@/components/sections/characters-section';
import CharacterDetailSection  from '@/components/sections/character-detail-section';
import ClassesSection from '@/components/sections/classes-section';
import LoreSection from '@/components/sections/lore-section';
import RaceDetailSection from '@/components/sections/race-detail-section';
import ClassDetailSection from '@/components/sections/class-detail-section';
import RacialAbilitiesSection from '@/components/sections/racial-abilities-section';
import BackgroundsSection from '@/components/sections/backgrounds-section';
import SpellsSection from '@/components/sections/spells-section';

export default async function Dashboard({
    searchParams,
}: {
    searchParams: Promise<{ section?: string; item?: string }>;
}) {
    const { section, item } = await searchParams;

    return (
        <div style={{
            minHeight: '100%',
            backgroundColor: 'var(--color-primary)',
        }}>
            {section === 'characters' && !item && <CharactersSection />}
        {section === 'characters' &&  item && <CharacterDetailSection id={item} />}
        {section === 'races' && !item && <RacesSection />}
            {section === 'races' && item && <RaceDetailSection race={item} />}

            {section === 'classes' && !item && <ClassesSection />}
            {section === 'classes' && item && <ClassDetailSection dndClass={item} />}

            {section === 'lore' && <LoreSection />}
            {section === 'racial-abilities' && <RacialAbilitiesSection />}
            {section === 'backgrounds' && <BackgroundsSection />}
            {section === 'spells' && <SpellsSection />}
            {(!section || section === 'home') && <DashboardHome />}
        </div>
    );
}

function DashboardHome() {
    return (
        <div style={{
            padding: '4rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
        }}>
            <p style={{
                color: 'var(--color-accent-light)',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
            }}>
                Welcome Back
            </p>
            <h1 style={{
                color: 'var(--color-gold)',
                fontSize: '2.5rem',
                marginBottom: '1rem'
            }}>
                Your Dashboard
            </h1>
            <p style={{
                color: 'rgba(244, 232, 208, 0.4)',
                fontSize: '1rem',
                maxWidth: '400px',
                lineHeight: '1.8',
                fontStyle: 'italic'
            }}>
                Select something from the sidebar to get started.
                More features are on the way.
            </p>
        </div>
    );
}
