/**
 * D&D 2024 Player's Handbook backgrounds (5.5e).
 * 
 * The 2024 rules significantly changed backgrounds - they now provide:
 * - Ability Score Increases (3 scores: choose +2/+1 or +1/+1/+1)
 * - Origin Feats (new mechanical benefits)
 * - Skill Proficiencies (2 skills)
 * - Tool Proficiency (1 tool)
 * - Equipment choice (package or 50 GP)
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
        index: 'artisan',
        name: 'Artisan',
        ability_scores: ['str', 'dex', 'int'],
        feat: {
            name: 'Crafter',
            desc: [
                'You gain proficiency with three Artisan\'s Tools of your choice.',
                'Whenever you buy a nonmagical item, you receive a 20 percent discount on it.',
                'When you finish a Long Rest, you can craft one piece of gear from the following list: Arrows (20), Bolts (20), Crossbow (Light), Shortbow, Club, Dagger, Greatclub, Handaxe, Javelin, Light Hammer, Mace, Quarterstaff, Sickle, Spear.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-investigation', name: 'Skill: Investigation' },
            { index: 'skill-persuasion', name: 'Skill: Persuasion' }
        ],
        tool_proficiency: "One kind of Artisan's Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: "Artisan's Tools" }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Pouch' }, quantity: 2 },
                { equipment: { name: 'Gold Pieces' }, quantity: 32 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You worked as a skilled craftsperson, learning your trade through years of practice and dedication.',
            'Your expertise with tools and materials has made you valuable in any community, and your understanding of craft extends beyond mere manual skill to encompass the social and economic aspects of your profession.'
        ]
    },
    {
        index: 'charlatan',
        name: 'Charlatan',
        ability_scores: ['dex', 'con', 'cha'],
        feat: {
            name: 'Skilled',
            desc: [
                'You gain proficiency in any combination of three skills or tools of your choice.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-deception', name: 'Skill: Deception' },
            { index: 'skill-sleight-of-hand', name: 'Skill: Sleight of Hand' }
        ],
        tool_proficiency: 'Forgery Kit',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Forgery Kit' }, quantity: 1 },
                { equipment: { name: 'Costume' }, quantity: 1 },
                { equipment: { name: 'Fine Clothes' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 15 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You learned early on that people are gullible and easy to exploit. You survived by using deception, misdirection, and charm to part fools from their money.',
            'You might have been a confidence artist, a card shark, a crooked gambler, or simply someone who knew how to bend the truth to their advantage.'
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
            'You eked out a living in dark alleyways, cutting purses or burgling shops. Perhaps you were part of a small gang of like-minded wrongdoers who looked out for each other.',
            'Or maybe you were a lone wolf, fending for yourself against the local thieves\' guild and more fearsome lawbreakers.'
        ]
    },
    {
        index: 'entertainer',
        name: 'Entertainer',
        ability_scores: ['str', 'dex', 'cha'],
        feat: {
            name: 'Musician',
            desc: [
                'You gain proficiency with three Musical Instruments of your choice.',
                'After you finish a Short Rest or Long Rest, you can play a song on a Musical Instrument with which you have proficiency and give Heroic Inspiration to allies who hear the song. The number of allies you can affect equals your Proficiency Bonus.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-acrobatics', name: 'Skill: Acrobatics' },
            { index: 'skill-performance', name: 'Skill: Performance' }
        ],
        tool_proficiency: 'One kind of Musical Instrument',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Musical Instrument' }, quantity: 1 },
                { equipment: { name: 'Costume' }, quantity: 2 },
                { equipment: { name: 'Mirror (steel)' }, quantity: 1 },
                { equipment: { name: 'Perfume' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 11 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You made your living by performing for crowds, whether as a musician, actor, acrobat, storyteller, or some other type of artist.',
            'Your performances brought joy to audiences and perhaps a little coin to your purse. You might have traveled from place to place or performed regularly at a single venue.'
        ]
    },
    {
        index: 'farmer',
        name: 'Farmer',
        ability_scores: ['str', 'con', 'wis'],
        feat: {
            name: 'Tough',
            desc: [
                'Your Hit Point maximum increases by an amount equal to twice your character level when you gain this feat.',
                'Whenever you gain a character level thereafter, your Hit Point maximum increases by an additional 2 Hit Points.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-animal-handling', name: 'Skill: Animal Handling' },
            { index: 'skill-nature', name: 'Skill: Nature' }
        ],
        tool_proficiency: "Carpenter's Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Sickle' }, quantity: 1 },
                { equipment: { name: "Carpenter's Tools" }, quantity: 1 },
                { equipment: { name: "Healer's Kit" }, quantity: 1 },
                { equipment: { name: 'Iron Pot' }, quantity: 1 },
                { equipment: { name: 'Shovel' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 30 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You grew up close to the land, learning the rhythms of nature and the hard work required to coax a living from the soil.',
            'Whether you worked a small family plot or labored on a large estate, you understand the value of patience, persistence, and the sweat of your brow.'
        ]
    },
    {
        index: 'guard',
        name: 'Guard',
        ability_scores: ['str', 'int', 'wis'],
        feat: {
            name: 'Alert',
            desc: [
                'When you roll Initiative, you can add your Proficiency Bonus to the roll.',
                'Immediately after you roll Initiative, you can swap your Initiative with one willing ally in the same combat. You can\'t make this swap if you or the ally has the Incapacitated condition.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-perception', name: 'Skill: Perception' }
        ],
        tool_proficiency: 'One kind of Gaming Set',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Spear' }, quantity: 1 },
                { equipment: { name: 'Light Crossbow' }, quantity: 1 },
                { equipment: { name: 'Crossbow Bolts' }, quantity: 20 },
                { equipment: { name: 'Gaming Set' }, quantity: 1 },
                { equipment: { name: 'Hooded Lantern' }, quantity: 1 },
                { equipment: { name: 'Manacles' }, quantity: 1 },
                { equipment: { name: 'Quiver' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 12 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You served as a guard, watchman, or soldier, protecting a community, caravan, or noble estate.',
            'Your training taught you to stay alert, react quickly to danger, and work as part of a team to maintain order and safety.'
        ]
    },
    {
        index: 'guide',
        name: 'Guide',
        ability_scores: ['dex', 'con', 'wis'],
        feat: {
            name: 'Magic Initiate (Druid)',
            desc: [
                'You learn two cantrips and one 1st-level spell from the Druid spell list.',
                'You can cast the 1st-level spell once without a spell slot, and you regain the ability to do so when you finish a Long Rest.',
                'You can also cast it using any spell slots you have.',
                'Choose Intelligence, Wisdom, or Charisma as your spellcasting ability for these spells.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-stealth', name: 'Skill: Stealth' },
            { index: 'skill-survival', name: 'Skill: Survival' }
        ],
        tool_proficiency: "Cartographer's Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Shortbow' }, quantity: 1 },
                { equipment: { name: 'Arrows' }, quantity: 20 },
                { equipment: { name: "Cartographer's Tools" }, quantity: 1 },
                { equipment: { name: 'Bedroll' }, quantity: 1 },
                { equipment: { name: 'Quiver' }, quantity: 1 },
                { equipment: { name: 'Tent' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 3 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You served as a guide, leading travelers through dangerous wilderness, across treacherous mountains, or into uncharted territories.',
            'Your knowledge of the wild and your ability to navigate by the stars made you invaluable to those who ventured beyond civilization\'s borders.'
        ]
    },
    {
        index: 'hermit',
        name: 'Hermit',
        ability_scores: ['con', 'wis', 'cha'],
        feat: {
            name: 'Healer',
            desc: [
                'When you use a Healer\'s Kit to stabilize a dying creature, that creature also regains 1 Hit Point.',
                'As an action, you can spend one use of a Healer\'s Kit to tend to a creature and restore Hit Points to it. The creature can spend one of its Hit Dice, and you then roll that die. The creature regains a number of Hit Points equal to the roll plus your Proficiency Bonus.',
                'Whenever you roll a die to determine the number of Hit Points you restore with a spell or with this feat, you can reroll the die if it rolls a 1, and you must use the new roll.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-medicine', name: 'Skill: Medicine' },
            { index: 'skill-religion', name: 'Skill: Religion' }
        ],
        tool_proficiency: 'Herbalism Kit',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Quarterstaff' }, quantity: 1 },
                { equipment: { name: 'Herbalism Kit' }, quantity: 1 },
                { equipment: { name: 'Book (philosophy)' }, quantity: 1 },
                { equipment: { name: 'Lamp' }, quantity: 1 },
                { equipment: { name: 'Oil (flask)' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 16 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You lived in seclusion, either in a remote hermitage, a mountain cave, or a secluded monastery.',
            'In your isolation, you found peace, contemplation, and perhaps insights into the nature of the multiverse that others might never discover.'
        ]
    },
    {
        index: 'merchant',
        name: 'Merchant',
        ability_scores: ['con', 'int', 'cha'],
        feat: {
            name: 'Lucky',
            desc: [
                'You have a number of Luck Points equal to your Proficiency Bonus. You can spend these points on various benefits.',
                'When you roll a d20 for a D20 Test, you can spend 1 Luck Point to give yourself Advantage on the roll.',
                'When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to impose Disadvantage on that roll.',
                'You regain all expended Luck Points when you finish a Long Rest.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-animal-handling', name: 'Skill: Animal Handling' },
            { index: 'skill-persuasion', name: 'Skill: Persuasion' }
        ],
        tool_proficiency: "Navigator's Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: "Navigator's Tools" }, quantity: 1 },
                { equipment: { name: 'Pouch' }, quantity: 2 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 22 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You worked as a merchant, buying and selling goods, negotiating deals, and perhaps traveling far and wide to trade in distant markets.',
            'Your sharp mind for business and your personable nature made you successful in the world of commerce.'
        ]
    },
    {
        index: 'noble',
        name: 'Noble',
        ability_scores: ['str', 'int', 'cha'],
        feat: {
            name: 'Skilled',
            desc: [
                'You gain proficiency in any combination of three skills or tools of your choice.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-history', name: 'Skill: History' },
            { index: 'skill-persuasion', name: 'Skill: Persuasion' }
        ],
        tool_proficiency: 'One kind of Gaming Set',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Gaming Set' }, quantity: 1 },
                { equipment: { name: 'Fine Clothes' }, quantity: 1 },
                { equipment: { name: 'Perfume' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 29 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You were born into privilege, whether as a member of the aristocracy, a wealthy family, or a powerful organization.',
            'You understand the workings of high society, the etiquette of the elite, and how to navigate complex social and political situations.'
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
                { equipment: { name: 'Quarterstaff' }, quantity: 1 },
                { equipment: { name: "Calligrapher's Supplies" }, quantity: 1 },
                { equipment: { name: 'Book (history)' }, quantity: 1 },
                { equipment: { name: 'Parchment' }, quantity: 8 },
                { equipment: { name: 'Robe' }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 8 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You spent your formative years traveling between manors and monasteries, performing various odd jobs and services in exchange for access to their libraries.',
            'You whiled away many a long evening studying books and scrolls, learning the lore of the multiverse, even the rudiments of magic, and your mind yearns for more.'
        ]
    },
    {
        index: 'sailor',
        name: 'Sailor',
        ability_scores: ['str', 'dex', 'wis'],
        feat: {
            name: 'Tavern Brawler',
            desc: [
                'You have proficiency with Improvised Weapons.',
                'When you hit with an Unarmed Strike on your turn, you can deal extra damage to the target equal to your Proficiency Bonus.',
                'When you make an attack roll using Strength and miss, you can roll 1d8 and add it to the total, possibly changing the miss into a hit.',
                'When you hit a creature with an Unarmed Strike as part of the Attack action on your turn, you can deal damage to the target and also push it 5 feet away. You can use this benefit only once per turn.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-acrobatics', name: 'Skill: Acrobatics' },
            { index: 'skill-perception', name: 'Skill: Perception' }
        ],
        tool_proficiency: "Navigator's Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Dagger' }, quantity: 1 },
                { equipment: { name: "Navigator's Tools" }, quantity: 1 },
                { equipment: { name: 'Rope (50 feet)' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 20 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You sailed the seas, whether as a merchant sailor, naval officer, pirate, or simple deckhand.',
            'The life aboard ship taught you to work as part of a crew, handle yourself in a fight, and navigate by the stars.'
        ]
    },
    {
        index: 'scribe',
        name: 'Scribe',
        ability_scores: ['dex', 'int', 'wis'],
        feat: {
            name: 'Skilled',
            desc: [
                'You gain proficiency in any combination of three skills or tools of your choice.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-investigation', name: 'Skill: Investigation' },
            { index: 'skill-perception', name: 'Skill: Perception' }
        ],
        tool_proficiency: "Calligrapher's Supplies",
        equipment_choice: {
            package_a: [
                { equipment: { name: "Calligrapher's Supplies" }, quantity: 1 },
                { equipment: { name: 'Fine Clothes' }, quantity: 1 },
                { equipment: { name: 'Lamp' }, quantity: 1 },
                { equipment: { name: 'Oil (flask)' }, quantity: 1 },
                { equipment: { name: 'Parchment' }, quantity: 10 },
                { equipment: { name: 'Gold Pieces' }, quantity: 23 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You worked as a scribe, copyist, or clerk, recording information, copying texts, and maintaining records.',
            'Your work required precision, attention to detail, and often discretion, as you might have handled sensitive documents or secret correspondence.'
        ]
    },
    {
        index: 'soldier',
        name: 'Soldier',
        ability_scores: ['str', 'dex', 'con'],
        feat: {
            name: 'Savage Attacker',
            desc: [
                'Once per turn when you hit a target with a weapon, you can reroll the weapon\'s damage dice and use either result.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-intimidation', name: 'Skill: Intimidation' }
        ],
        tool_proficiency: 'One kind of Gaming Set',
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Spear' }, quantity: 1 },
                { equipment: { name: 'Shortbow' }, quantity: 1 },
                { equipment: { name: 'Arrows' }, quantity: 20 },
                { equipment: { name: 'Gaming Set' }, quantity: 1 },
                { equipment: { name: "Healer's Kit" }, quantity: 1 },
                { equipment: { name: 'Quiver' }, quantity: 1 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 14 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You began training for war as soon as you reached adulthood and carry precious few memories of life before you took up arms.',
            'Battle is in your blood. Sometimes you catch yourself reflexively performing the basic fighting exercises you learned first. Eventually, you put that training to use on the battlefield, protecting the realm by waging war.'
        ]
    },
    {
        index: 'wayfarer',
        name: 'Wayfarer',
        ability_scores: ['dex', 'wis', 'cha'],
        feat: {
            name: 'Lucky',
            desc: [
                'You have a number of Luck Points equal to your Proficiency Bonus. You can spend these points on various benefits.',
                'When you roll a d20 for a D20 Test, you can spend 1 Luck Point to give yourself Advantage on the roll.',
                'When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to impose Disadvantage on that roll.',
                'You regain all expended Luck Points when you finish a Long Rest.'
            ]
        },
        skill_proficiencies: [
            { index: 'skill-insight', name: 'Skill: Insight' },
            { index: 'skill-stealth', name: 'Skill: Stealth' }
        ],
        tool_proficiency: "Thieves' Tools",
        equipment_choice: {
            package_a: [
                { equipment: { name: 'Dagger' }, quantity: 2 },
                { equipment: { name: "Thieves' Tools" }, quantity: 1 },
                { equipment: { name: 'Gaming Set' }, quantity: 1 },
                { equipment: { name: 'Bedroll' }, quantity: 1 },
                { equipment: { name: 'Pouch' }, quantity: 2 },
                { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
                { equipment: { name: 'Gold Pieces' }, quantity: 15 }
            ],
            package_b_gold: 50
        },
        desc: [
            'You grew up on the road, always traveling from place to place with no permanent home.',
            'Whether you were part of a nomadic community, a wandering exile, or simply someone who could never stay in one place for long, you learned to rely on your wits and your ability to read people and situations.'
        ]
    }
];
