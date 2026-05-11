import { Navigation, Card } from "@/components";
import { RaceDetail } from "@/types";
import clientPromise from "@/lib/mongo";

export default async function Races() {
    const client = await clientPromise;
    const collection = client.db('dnd-resources').collection('races');
    
    const races = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ name: 1 })
        .toArray();

    return (
        <div>
            <Navigation />
            <h1>D&D Races ({races.length} total)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {(races as RaceDetail[]).map((race) => (
                    <Card
                        key={race.index}
                        title={race.name}
                        description={`Learn about the ${race.name} race`}
                        url={`/races/${race.index}`}
                        image={`/images/races/${race.index}.png`}
                    />
                ))}
            </div>
        </div>
    )
}
