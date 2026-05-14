/**
 * D&D 2024 (5.5e) Background structure.
 * Backgrounds now provide ability score increases, Origin feats, and structured equipment choices.
 */
export type Background = {
    index: string;
    name: string;
    ability_scores: string[]; // e.g., ['str', 'int', 'cha'] - player chooses +2/+1 or +1/+1/+1
    feat: {
        name: string;
        desc: string[];
    };
    skill_proficiencies: { index: string; name: string }[];
    tool_proficiency: string; // Single tool proficiency
    equipment_choice: {
        package_a: { equipment: { name: string }; quantity: number }[];
        package_b_gold: number; // Always 50 GP in 2024 rules
    };
    desc: string[]; // Background narrative description
};

export type BackgroundFeature = {
    name: string;
    feat: { name: string; desc: string[] };
    equipment_choice?: {
        package_a: { equipment: { name: string }; quantity: number }[];
        package_b_gold: number;
    };
};
