import { Navigation, Card } from "@/components";
import { Race, RacesResponse } from "@/types";

export default async function Races() {

    const response = await fetch('https://www.dnd5eapi.co/api/races');
    const data: RacesResponse = await response.json();

    return (
        <div>
            <Navigation />
            <h1>D&D Races ({data.count} total)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.results.map((race: Race) => (
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
