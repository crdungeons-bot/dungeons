import { Navigation, Card } from "@/components";
import { ClassDetail } from "@/types";
import clientPromise from "@/lib/mongo";

export default async function Classes() {
    const client = await clientPromise;
    const collection = client.db('dnd-resources').collection('classes');
    
    const classes = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ name: 1 })
        .toArray() as unknown as ClassDetail[];

    return (
        <div>
            <Navigation />
            <h1>D&D Classes ({classes.length} total)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {classes.map((dndClass) => (
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
