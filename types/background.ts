export type Background = {
    index: string;
    name: string;
    starting_proficiencies: { index: string; name: string }[];
    feature: { name: string; desc: string[] };
    starting_equipment: { equipment: { name: string }; quantity: number }[];
    personality_traits?: { from: { desc: string }[] };
};

export type BackgroundFeature = {
    name: string;
    feature: { name: string; desc: string[] };
    starting_equipment?: { equipment: { name: string }; quantity: number }[];
};
