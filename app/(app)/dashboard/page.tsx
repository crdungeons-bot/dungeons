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
import DiceRollerSection from '@/components/sections/dice-roller-section';
import DashboardHomeSection from '@/components/sections/dashboard-home-section';

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
            {section === 'dice-roller' && <DiceRollerSection />}
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
            {(!section || section === 'home') && <DashboardHomeSection />}
        </div>
    );
}
