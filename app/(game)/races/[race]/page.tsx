import { Navigation } from '@/components';
import RaceDetailSection from '@/components/sections/race-detail-section';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RaceDetailPage({ params }: { params: Promise<{ race: string }> }) {
    const { race } = await params;

    return (
        <>
            <Navigation />
            <RaceDetailSection race={race} />
        </>
    );
}