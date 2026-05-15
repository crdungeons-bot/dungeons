/**
 * D&D 2024 SRD 5.2 Backgrounds
 * 
 * Only the following 4 backgrounds are included in the SRD 5.2:
 * - Acolyte
 * - Criminal
 * - Sage
 * - Soldier
 * 
 * All other backgrounds are proprietary Wizards of the Coast content
 * and have been moved to non-compliant/ folder for archival purposes.
 */

export type Background2024 = {
    index: string;
    name: string;
    ability_scores: string[]; // Array of 3 ability scores (e.g., ['str', 'int', 'cha'])
    feat: {
        name: string;
        desc: string[];
    };
    skill_proficiencies: { index: string; name: string }[];
    tool_proficiency: string;
    equipment_choice: {
        package_a: { equipment: { name: string }; quantity: number }[];
        package_b_gold: number; // Always 50 in 2024 rules
    };
    desc: string[]; // Background narrative description
};

export const BACKGROUNDS_2024: Background2024[] = [
    {
        index: 'acolyte',
        name: 'Acolyte',
        ability_scores: ['int', 'wis', 'cha'],
        feat: {
            name: 'Magic Initiate (Cleric)',
            desc: [
                'You learn two cantrips and one 1st-level spell from the Cleric spell list.',
                'You can cast the 1st-level spell once without a spell slot, and you regain the ability to do so when you finish a Long Rest.',
                'You can also cast it using any spell slots you have.',
                'Choose Intelligence, Wisdom, or Charisma as your spellcasting ability for these spells.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-insight', name: 'Skill: Insight' },
            { index: 'skill-religion', name: 'Skill: Religion' }
        ],
        tool_proficiency: "Calligrapher's Supplies",
        equipment_choice: {
            package_a: [
                { equipment: { name: "Calligrapher's Supplies" }, quantity: 1 },
                { equipment: { name: 'Book (prayers)' }, quantity: 1 },
                { equipment: { name: 'Holy Symbol' }, quantity: 1 },
                { equipment: { name: 'Parchment' }, quantity: 10 },
                { equipment: { name: 'Robe' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 8 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You devoted yourself to service in a temple, either nestled in a town or secluded in a sacred grove. There you performed rites in honor of a god or pantheon.',
            'You served under a priest and studied religion. Thanks to your priest\'s instruction and your own devotion, you also learned how to channel a modicum of divine power in service to your place of worship and the people who prayed there.'
        ]
    },
    {
        index: 'criminal',
        name: 'Criminal',
        ability_scores: ['dex', 'con', 'int'],
        feat: {
            name: 'Alert',
            desc: [
                'When you roll Initiative, you can add your Proficiency Bonus to the roll.',
                'Immediately after you roll Initiative, you can swap your Initiative with one willing ally in the same combat. You can\'t make this swap if you or the ally has the Incapacitated condition.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-sleight-of-hand', name: 'Skill: Sleight of Hand' },
            { index: 'skill-stealth', name: 'Skill: Stealth' }
        ],
        tool_proficiency: "Thieves' Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Dagger' }, quantity: 2 },
                { equipment: { name: "Thieves' Tools" }, quantity: 1 },
                { equipment: { name: 'Crowbar' }, quantity: 1 },
                { equipment: { name: 'Pouch' }, quantity: 2 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 16 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You have a history of breaking the law. You have spent much of your life thieving, pickpocketing, or otherwise operating outside the law.',
            'Your criminal background has given you knowledge of the seedy underbelly of society and the individuals who populate it.'
        ]
    },
    {
        index: 'sage',
        name: 'Sage',
        ability_scores: ['con', 'int', 'wis'],
        feat: {
            name: 'Magic Initiate (Wizard)',
            desc: [
                'You learn two cantrips and one 1st-level spell from the Wizard spell list.',
                'You can cast the 1st-level spell once without a spell slot, and you regain the ability to do so when you finish a Long Rest.',
                'You can also cast it using any spell slots you have.',
                'Choose Intelligence, Wisdom, or Charisma as your spellcasting ability for these spells.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-arcana', name: 'Skill: Arcana' },
            { index: 'skill-history', name: 'Skill: History' }
        ],
        tool_proficiency: "Calligrapher's Supplies",
        equipment_choice: {
            package_a: [
                { equipment: { name: "Calligrapher's Supplies" }, quantity: 1 },
                { equipment: { name: 'Book (history)' }, quantity: 1 },
                { equipment: { name: 'Parchment' }, quantity: 10 },
                { equipment: { name: 'Robe' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 8 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You spent your formative years studying, reading, and researching in a library, university, or under the tutelage of a learned mentor.',
            'Your knowledge of history, arcane lore, and the mysteries of the world is extensive, and you are driven by an insatiable curiosity to learn more.'
        ]
    },
    {
        index: 'soldier',
        name: 'Soldier',
        ability_scores: ['str', 'con', 'cha'],
        feat: {
            name: 'Savage Attacker',
            desc: [
                'You have trained to deal devastating strikes. Once per turn, when you hit a target with a weapon, you can roll the weapon\'s damage dice twice and use either roll against the target.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-intimidation', name: 'Skill: Intimidation' }
        ],
        tool_proficiency: "Gaming Set",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Spear' }, quantity: 1 },
                { equipment: { name: 'Shortbow' }, quantity: 1 },
                { equipment: { name: 'Arrow' }, quantity: 20 },
                { equipment: { name: 'Gaming Set (dice)' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Pouch' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 14 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You have served in a militia, royal army, mercenary company, or similar martial organization.',
            'Your experience on the battlefield has taught you discipline, tactics, and the value of a well-trained unit.'
        ]
    }
];
