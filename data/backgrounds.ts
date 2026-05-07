/**
 * D&D 5e Player's Handbook backgrounds.
 *
 * The public SRD API only includes Acolyte, so the rest are defined here.
 * Shape matches the BackgroundData type in components/ui/background-card.tsx.
 */

export type StaticBackground = {
    index: string;
    name: string;
    starting_proficiencies: { index: string; name: string }[];
    feature: { name: string; desc: string[] };
    starting_equipment: { equipment: { name: string }; quantity: number }[];
    personality_traits?: { from: { desc: string }[] };
};

export const STATIC_BACKGROUNDS: StaticBackground[] = [
    {
        index: 'acolyte',
        name: 'Acolyte',
        starting_proficiencies: [
            { index: 'skill-insight', name: 'Skill: Insight' },
            { index: 'skill-religion', name: 'Skill: Religion' },
        ],
        feature: {
            name: 'Shelter of the Faithful',
            desc: [
                'As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity.',
                'You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith. Those who share your religion will support you (though only you) at a modest lifestyle. You might also have ties to a specific temple dedicated to your chosen deity or pantheon, and you have a residence there.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Holy Symbol' }, quantity: 1 },
            { equipment: { name: 'Prayer Book' }, quantity: 1 },
            { equipment: { name: 'Stick of Incense' }, quantity: 5 },
            { equipment: { name: 'Vestments' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 15 },
        ],
        personality_traits: {
            from: [{ desc: 'I idolize a particular hero of my faith and constantly refer to that person\'s deeds and example.' }],
        },
    },
    {
        index: 'charlatan',
        name: 'Charlatan',
        starting_proficiencies: [
            { index: 'skill-deception', name: 'Skill: Deception' },
            { index: 'skill-sleight-of-hand', name: 'Skill: Sleight of Hand' },
        ],
        feature: {
            name: 'False Identity',
            desc: [
                'You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona.',
                'Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Fine Clothes' }, quantity: 1 },
            { equipment: { name: 'Disguise Kit' }, quantity: 1 },
            { equipment: { name: 'Con Tools (weighted dice, marked cards, etc.)' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 15 },
        ],
        personality_traits: {
            from: [{ desc: 'I fall in and out of love easily, and am always pursuing someone.' }],
        },
    },
    {
        index: 'criminal',
        name: 'Criminal',
        starting_proficiencies: [
            { index: 'skill-deception', name: 'Skill: Deception' },
            { index: 'skill-stealth', name: 'Skill: Stealth' },
        ],
        feature: {
            name: 'Criminal Contact',
            desc: [
                'You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.',
                'You know how to get messages to and from your contact, even over great distances. You know the local criminal networks in any city you visit, and can find fences, black-market dealers, and underground information brokers.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Crowbar' }, quantity: 1 },
            { equipment: { name: 'Dark Common Clothes with Hood' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 15 },
        ],
        personality_traits: {
            from: [{ desc: 'I always have a plan for what to do when things go wrong.' }],
        },
    },
    {
        index: 'entertainer',
        name: 'Entertainer',
        starting_proficiencies: [
            { index: 'skill-acrobatics', name: 'Skill: Acrobatics' },
            { index: 'skill-performance', name: 'Skill: Performance' },
        ],
        feature: {
            name: 'By Popular Demand',
            desc: [
                'You can always find a place to perform ,  usually a tavern or inn ,  and your performance makes you something of a local celebrity.',
                'In exchange for performing, you receive free lodging and food of a modest or comfortable standard (depending on the establishment). In addition, your performance creates goodwill that can make strangers more positively disposed toward you.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Musical Instrument' }, quantity: 1 },
            { equipment: { name: "Admirer's Favor or Love Letter" }, quantity: 1 },
            { equipment: { name: 'Costume' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 15 },
        ],
        personality_traits: {
            from: [{ desc: 'I know a story relevant to almost every situation.' }],
        },
    },
    {
        index: 'folk-hero',
        name: 'Folk Hero',
        starting_proficiencies: [
            { index: 'skill-animal-handling', name: 'Skill: Animal Handling' },
            { index: 'skill-survival', name: 'Skill: Survival' },
        ],
        feature: {
            name: 'Rustic Hospitality',
            desc: [
                'Since you come from the ranks of the common folk, you fit in among them with ease.',
                'You can find a place to hide, rest, or recuperate among commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or others searching for you, though they will not risk their lives for you.',
            ],
        },
        starting_equipment: [
            { equipment: { name: "Artisan's Tools" }, quantity: 1 },
            { equipment: { name: 'Shovel' }, quantity: 1 },
            { equipment: { name: 'Iron Pot' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'I judge people by their actions, not their words.' }],
        },
    },
    {
        index: 'guild-artisan',
        name: 'Guild Artisan',
        starting_proficiencies: [
            { index: 'skill-insight', name: 'Skill: Insight' },
            { index: 'skill-persuasion', name: 'Skill: Persuasion' },
        ],
        feature: {
            name: 'Guild Membership',
            desc: [
                'As an established member of a guild, you can rely on fellow guild members for certain kinds of aid.',
                'Your fellow guild members will provide you with lodging and food if necessary and pay for your funeral if needed. In some cities and towns, a guild hall offers a central meeting place for guild members, providing poor lodging and food. Guilds often wield tremendous political power.',
            ],
        },
        starting_equipment: [
            { equipment: { name: "Artisan's Tools" }, quantity: 1 },
            { equipment: { name: 'Letter of Introduction from your Guild' }, quantity: 1 },
            { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 15 },
        ],
        personality_traits: {
            from: [{ desc: 'I believe that anything worth doing is worth doing right.' }],
        },
    },
    {
        index: 'hermit',
        name: 'Hermit',
        starting_proficiencies: [
            { index: 'skill-medicine', name: 'Skill: Medicine' },
            { index: 'skill-religion', name: 'Skill: Religion' },
        ],
        feature: {
            name: 'Discovery',
            desc: [
                'The quiet seclusion of your long hermitage gave you access to a unique and powerful discovery.',
                'The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the gods, the forces of nature, or the powers of the arcane. Work with your DM to determine the details of your discovery and its impact on the campaign.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Scroll Case with Notes' }, quantity: 1 },
            { equipment: { name: 'Winter Blanket' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Herbalism Kit' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 5 },
        ],
        personality_traits: {
            from: [{ desc: 'I am utterly serene, even in the face of disaster.' }],
        },
    },
    {
        index: 'noble',
        name: 'Noble',
        starting_proficiencies: [
            { index: 'skill-history', name: 'Skill: History' },
            { index: 'skill-persuasion', name: 'Skill: Persuasion' },
        ],
        feature: {
            name: 'Position of Privilege',
            desc: [
                'Thanks to your noble birth, people are inclined to think the best of you.',
                'You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you, and other people of high birth treat you as a member of the same social sphere. You can secure an audience with a local noble if you need to.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Fine Clothes' }, quantity: 1 },
            { equipment: { name: 'Signet Ring' }, quantity: 1 },
            { equipment: { name: 'Scroll of Pedigree' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 25 },
        ],
        personality_traits: {
            from: [{ desc: 'My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.' }],
        },
    },
    {
        index: 'outlander',
        name: 'Outlander',
        starting_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-survival', name: 'Skill: Survival' },
        ],
        feature: {
            name: 'Wanderer',
            desc: [
                'You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you.',
                'In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Staff' }, quantity: 1 },
            { equipment: { name: 'Hunting Trap' }, quantity: 1 },
            { equipment: { name: 'Trophy from an Animal you Killed' }, quantity: 1 },
            { equipment: { name: "Traveler's Clothes" }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'I watch over my friends as if they were a litter of newborn pups.' }],
        },
    },
    {
        index: 'sage',
        name: 'Sage',
        starting_proficiencies: [
            { index: 'skill-arcana', name: 'Skill: Arcana' },
            { index: 'skill-history', name: 'Skill: History' },
        ],
        feature: {
            name: 'Researcher',
            desc: [
                'When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it.',
                'Usually, this information comes from a library, scriptorium, university, or a sage or other learned person. Your DM might rule that the knowledge you seek is secreted away in an almost inaccessible place, or that it simply cannot be found.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Bottle of Black Ink' }, quantity: 1 },
            { equipment: { name: 'Quill' }, quantity: 1 },
            { equipment: { name: 'Small Knife' }, quantity: 1 },
            { equipment: { name: 'Letter from a Dead Colleague with an Unanswered Question' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'I use polysyllabic words that convey the impression of great erudition.' }],
        },
    },
    {
        index: 'sailor',
        name: 'Sailor',
        starting_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-perception', name: 'Skill: Perception' },
        ],
        feature: {
            name: "Ship's Passage",
            desc: [
                'When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions.',
                'You might sail on the ship you served on, or another ship you have good relations with. Because you\'re calling in a favor, you can\'t be certain of a schedule or route that will meet your every need. In return for free passage, you and your companions are expected to assist the crew during the voyage.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Belaying Pin (Club)' }, quantity: 1 },
            { equipment: { name: '50 Feet of Silk Rope' }, quantity: 1 },
            { equipment: { name: 'Lucky Charm (rabbit foot, small stone with hole)' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'My friends know they can rely on me, no matter what.' }],
        },
    },
    {
        index: 'soldier',
        name: 'Soldier',
        starting_proficiencies: [
            { index: 'skill-athletics', name: 'Skill: Athletics' },
            { index: 'skill-intimidation', name: 'Skill: Intimidation' },
        ],
        feature: {
            name: 'Military Rank',
            desc: [
                'You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence.',
                'You can invoke your rank to exert influence over soldiers and cause them to act in certain ways. You can also gain access to friendly military encampments and fortresses where your rank is recognized.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Insignia of Rank' }, quantity: 1 },
            { equipment: { name: 'Trophy from a Fallen Enemy' }, quantity: 1 },
            { equipment: { name: 'Deck of Cards or Set of Dice' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'I am always polite and respectful.' }],
        },
    },
    {
        index: 'urchin',
        name: 'Urchin',
        starting_proficiencies: [
            { index: 'skill-sleight-of-hand', name: 'Skill: Sleight of Hand' },
            { index: 'skill-stealth', name: 'Skill: Stealth' },
        ],
        feature: {
            name: 'City Secrets',
            desc: [
                'You know the secret patterns and flow of cities and can find passages through the urban sprawl that others would miss.',
                'When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.',
            ],
        },
        starting_equipment: [
            { equipment: { name: 'Small Knife' }, quantity: 1 },
            { equipment: { name: 'Map of the City you Grew Up In' }, quantity: 1 },
            { equipment: { name: 'Pet Mouse' }, quantity: 1 },
            { equipment: { name: 'Token to Remember your Parents By' }, quantity: 1 },
            { equipment: { name: 'Common Clothes' }, quantity: 1 },
            { equipment: { name: 'Gold Pieces' }, quantity: 10 },
        ],
        personality_traits: {
            from: [{ desc: 'I hide scraps of food and trinkets away in my pockets.' }],
        },
    },
];
