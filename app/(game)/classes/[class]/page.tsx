import { Navigation } from '@/components';
import ClassDetailSection from '@/components/sections/class-detail-section';

export default async function ClassDetailPage({ params }: { params: Promise<{ class: string }> }) {
    const { class: className } = await params;

    return (
        <>
            <Navigation />
            <ClassDetailSection dndClass={className} />
        </>
    );
}
