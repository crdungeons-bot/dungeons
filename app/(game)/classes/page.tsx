import { Navigation, Card } from "@/components";
import { DndClass, ClassesResponse } from "@/types";

export default async function Classes() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/resources/classes`, { cache: 'force-cache' });
    const data: ClassesResponse = await response.json();

    return (
        <div>
            <Navigation />
            <h1>D&D Classes ({data.count} total)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.results.map((dndClass: DndClass) => (
                    <Card
                        key={dndClass.index}
                        title={dndClass.name}
                        description={`Learn about the ${dndClass.name} class`}
                        url={`/classes/${dndClass.index}`}
                        image={`/images/dnd-classes/${dndClass.index}.png`}
                    />
                ))}
            </div>
        </div>
    );
}
