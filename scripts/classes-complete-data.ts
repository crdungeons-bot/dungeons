/**
 * Comprehensive D&D 5e Class Data with Full Feature Progressions
 * 
 * This file contains complete class definitions including all features by level,
 * spell progression, resources, multiclassing rules, and mechanical details.
 * 
 * Sources: PHB, XGtE, TCoE, SCAG, Eberron, Fizban's, and all official sourcebooks
 * 
 * NOTE: This is the definitive source for class data. Data will be seeded into
 * the MongoDB `dnd-resources.classes` collection.
 */

import type { ClassComplete } from '../types/dnd-class';

export const CLASSES_COMPLETE: ClassComplete[] = [
    // ═══════════════════════════════════════════════════════════
    // BARBARIAN
    // ═══════════════════════════════════════════════════════════
    {
        index: 'barbarian',
        name: 'Barbarian',
        sourcebook: 'PHB',
        hit_die: 12,
        hitPoints: {
            hitDie: 12,
            firstLevel: '12 + Constitution modifier',
            higherLevels: '1d12 (or 7) + Constitution modifier per Barbarian level after 1st',
        },
        subclass_level: 3,
        asi_levels: [4, 8, 12, 16, 19],
        
        saving_throws: [
            { index: 'saving-throw-str', name: 'Saving Throw: STR' },
            { index: 'saving-throw-con', name: 'Saving Throw: CON' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor' },
            { index: 'medium-armor', name: 'Medium Armor' },
            { index: 'shields', name: 'Shields' },
            { index: 'simple-weapons', name: 'Simple Weapons' },
            { index: 'martial-weapons', name: 'Martial Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, or Survival',
                choose: 2,
                type: 'skills',
                from: {
                    option_set_type: 'options_array',
                    options: [
                        { option_type: 'reference', item: { index: 'skill-animal-handling', name: 'Skill: Animal Handling' } },
                        { option_type: 'reference', item: { index: 'skill-athletics', name: 'Skill: Athletics' } },
                        { option_type: 'reference', item: { index: 'skill-intimidation', name: 'Skill: Intimidation' } },
                        { option_type: 'reference', item: { index: 'skill-nature', name: 'Skill: Nature' } },
                        { option_type: 'reference', item: { index: 'skill-perception', name: 'Skill: Perception' } },
                        { option_type: 'reference', item: { index: 'skill-survival', name: 'Skill: Survival' } },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { equipment: { index: 'greataxe', name: 'Greataxe' }, quantity: 1 },
            { equipment: { index: 'handaxe', name: 'Handaxe' }, quantity: 4 },
            { equipment: { index: 'explorers-pack', name: "Explorer's Pack" }, quantity: 1 },
        ],
        
        multiclassing: {
            prerequisites: { str: 13 },
            proficienciesGained: {
                armor: ['shields'],
                weapons: ['simple-weapons', 'martial-weapons'],
            },
        },
        
        resources: [
            {
                name: 'Rage',
                type: 'rage',
                usesPerRest: '2 at level 1, increases with level',
                restType: 'long',
                levelGained: 1,
                description: 'Number of times you can enter a rage. From level 12+, regain 1 use on short rest.',
            },
        ],
        
        features: {
            1: [
                {
                    name: 'Rage',
                    level: 1,
                    description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain benefits if you aren\'t wearing heavy armor: You have advantage on Strength checks and Strength saving throws; when you make a melee weapon attack using Strength, you gain a bonus to damage (see table); you have resistance to bludgeoning, piercing, and slashing damage. Your rage lasts for 1 minute and ends early if you are knocked unconscious, you don a suit of heavy armor, or your turn ends and you haven\'t attacked a hostile creature or taken damage since your last turn. You can maintain rage with a bonus action. You can rage a number of times shown in the Barbarian table. You regain expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '2 at level 1-2, 3 at level 3-5, 4 at level 6-11, 5 at level 12-16, 6 at level 17-20',
                    restType: 'long',
                    scaling: 'Rage damage: +2 (levels 1-8), +3 (levels 9-15), +4 (levels 16-20)',
                    damage: {
                        dice: '+2/+3/+4',
                        type: 'bonus to melee damage',
                        scaling: 'Increases at levels 9 and 16',
                    },
                },
                {
                    name: 'Unarmored Defense',
                    level: 1,
                    description: 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Reckless Attack',
                    level: 2,
                    description: 'You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
                    actionType: 'special',
                },
                {
                    name: 'Danger Sense',
                    level: 2,
                    description: 'You gain an uncanny sense of when things nearby aren\'t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can\'t be blinded, deafened, or incapacitated.',
                    actionType: 'passive',
                },
            ],
            3: [
                {
                    name: 'Primal Path',
                    level: 3,
                    description: 'You choose a path that shapes the nature of your rage. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.',
                    actionType: 'special',
                },
                {
                    name: 'Primal Knowledge',
                    level: 3,
                    description: 'You gain proficiency in one skill of your choice from the list of skills available to barbarians at 1st level.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. You can\'t increase an ability score above 20 using this feature. You gain this feature again at levels 8, 12, 16, and 19.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
                {
                    name: 'Fast Movement',
                    level: 5,
                    description: 'Your speed increases by 10 feet while you aren\'t wearing heavy armor.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Path Feature',
                    level: 6,
                    description: 'You gain a feature from your Primal Path choice.',
                    actionType: 'special',
                },
            ],
            7: [
                {
                    name: 'Feral Instinct',
                    level: 7,
                    description: 'Your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren\'t incapacitated, you can act normally on your first turn if you enter your rage before doing anything else.',
                    actionType: 'passive',
                },
                {
                    name: 'Instinctive Pounce',
                    level: 7,
                    description: 'As part of the bonus action you use to enter your rage, you can move up to half your speed.',
                    actionType: 'bonus action',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            9: [
                {
                    name: 'Brutal Strike',
                    level: 9,
                    description: 'If you use Reckless Attack, you can forgo advantage on the attack roll. If the attack hits, you can add one Brutal Strike effect: Forceful Blow (push target 15 feet), or Hamstring Blow (target\'s speed reduced by 15 feet until start of your next turn).',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Forceful Blow', 'Hamstring Blow'],
                },
            ],
            10: [
                {
                    name: 'Path Feature',
                    level: 10,
                    description: 'You gain a feature from your Primal Path choice.',
                    actionType: 'special',
                },
            ],
            11: [
                {
                    name: 'Relentless Rage',
                    level: 11,
                    description: 'Your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you\'re raging and don\'t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead. Each time you use this feature after the first, the DC increases by 5. The DC resets to 10 when you finish a short or long rest.',
                    actionType: 'passive',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Improved Brutal Strike',
                    level: 13,
                    description: 'Your Brutal Strike gains a third option: Staggering Blow (target has disadvantage on saving throws until the start of your next turn).',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Forceful Blow', 'Hamstring Blow', 'Staggering Blow'],
                },
            ],
            14: [
                {
                    name: 'Path Feature',
                    level: 14,
                    description: 'You gain a feature from your Primal Path choice.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Persistent Rage',
                    level: 15,
                    description: 'Your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.',
                    actionType: 'passive',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Indomitable Might',
                    level: 18,
                    description: 'If your total for a Strength check is less than your Strength score, you can use that score in place of the total.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Primal Champion',
                    level: 20,
                    description: 'You embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // BARD
    // ═══════════════════════════════════════════════════════════
    {
        index: 'bard',
        name: 'Bard',
        sourcebook: 'PHB',
        hit_die: 8,
        hitPoints: {
            hitDie: 8,
            firstLevel: '8 + Constitution modifier',
            higherLevels: '1d8 (or 5) + Constitution modifier per Bard level after 1st',
        },
        subclass_level: 3,
        asi_levels: [4, 8, 12, 16, 19],
        
        saving_throws: [
            { index: 'saving-throw-dex', name: 'Saving Throw: DEX' },
            { index: 'saving-throw-cha', name: 'Saving Throw: CHA' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons' },
            { index: 'hand-crossbows', name: 'Hand Crossbows' },
            { index: 'longswords', name: 'Longswords' },
            { index: 'rapiers', name: 'Rapiers' },
            { index: 'shortswords', name: 'Shortswords' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose three from any skills',
                choose: 3,
                type: 'skills',
                from: {
                    option_set_type: 'options_array',
                    options: [
                        { option_type: 'reference', item: { index: 'skill-acrobatics', name: 'Skill: Acrobatics' } },
                        { option_type: 'reference', item: { index: 'skill-animal-handling', name: 'Skill: Animal Handling' } },
                        { option_type: 'reference', item: { index: 'skill-arcana', name: 'Skill: Arcana' } },
                        { option_type: 'reference', item: { index: 'skill-athletics', name: 'Skill: Athletics' } },
                        { option_type: 'reference', item: { index: 'skill-deception', name: 'Skill: Deception' } },
                        { option_type: 'reference', item: { index: 'skill-history', name: 'Skill: History' } },
                        { option_type: 'reference', item: { index: 'skill-insight', name: 'Skill: Insight' } },
                        { option_type: 'reference', item: { index: 'skill-intimidation', name: 'Skill: Intimidation' } },
                        { option_type: 'reference', item: { index: 'skill-investigation', name: 'Skill: Investigation' } },
                        { option_type: 'reference', item: { index: 'skill-medicine', name: 'Skill: Medicine' } },
                        { option_type: 'reference', item: { index: 'skill-nature', name: 'Skill: Nature' } },
                        { option_type: 'reference', item: { index: 'skill-perception', name: 'Skill: Perception' } },
                        { option_type: 'reference', item: { index: 'skill-performance', name: 'Skill: Performance' } },
                        { option_type: 'reference', item: { index: 'skill-persuasion', name: 'Skill: Persuasion' } },
                        { option_type: 'reference', item: { index: 'skill-religion', name: 'Skill: Religion' } },
                        { option_type: 'reference', item: { index: 'skill-sleight-of-hand', name: 'Skill: Sleight of Hand' } },
                        { option_type: 'reference', item: { index: 'skill-stealth', name: 'Skill: Stealth' } },
                        { option_type: 'reference', item: { index: 'skill-survival', name: 'Skill: Survival' } },
                    ],
                },
            },
            {
                desc: 'Choose three musical instruments',
                choose: 3,
                type: 'tools',
                from: {
                    option_set_type: 'options_array',
                    options: [
                        { option_type: 'reference', item: { index: 'bagpipes', name: 'Bagpipes' } },
                        { option_type: 'reference', item: { index: 'drum', name: 'Drum' } },
                        { option_type: 'reference', item: { index: 'dulcimer', name: 'Dulcimer' } },
                        { option_type: 'reference', item: { index: 'flute', name: 'Flute' } },
                        { option_type: 'reference', item: { index: 'lute', name: 'Lute' } },
                        { option_type: 'reference', item: { index: 'lyre', name: 'Lyre' } },
                        { option_type: 'reference', item: { index: 'horn', name: 'Horn' } },
                        { option_type: 'reference', item: { index: 'pan-flute', name: 'Pan Flute' } },
                        { option_type: 'reference', item: { index: 'shawm', name: 'Shawm' } },
                        { option_type: 'reference', item: { index: 'viol', name: 'Viol' } },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { equipment: { index: 'rapier', name: 'Rapier' }, quantity: 1 },
            { equipment: { index: 'leather-armor', name: 'Leather Armor' }, quantity: 1 },
            { equipment: { index: 'dagger', name: 'Dagger' }, quantity: 1 },
            { equipment: { index: 'entertainers-pack', name: "Entertainer's Pack" }, quantity: 1 },
            { equipment: { index: 'lute', name: 'Lute' }, quantity: 1 },
        ],
        
        spellcasting: {
            type: 'full',
            ability: 'cha',
            cantripsKnownPerLevel: {
                1: 2, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3,
                10: 4, 11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4,
            },
            spellsKnownPerLevel: {
                1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12,
                10: 14, 11: 15, 12: 15, 13: 16, 14: 18, 15: 19, 16: 19, 17: 20, 18: 22, 19: 22, 20: 22,
            },
            spellSlotsPerLevel: {
                1: { 1: 2 },
                2: { 1: 3 },
                3: { 1: 4, 2: 2 },
                4: { 1: 4, 2: 3 },
                5: { 1: 4, 2: 3, 3: 2 },
                6: { 1: 4, 2: 3, 3: 3 },
                7: { 1: 4, 2: 3, 3: 3, 4: 1 },
                8: { 1: 4, 2: 3, 3: 3, 4: 2 },
                9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
                11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
                18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
            },
        },
        
        multiclassing: {
            prerequisites: { cha: 13 },
            proficienciesGained: {
                armor: ['light-armor'],
                tools: ['one musical instrument'],
            },
        },
        
        resources: [
            {
                name: 'Bardic Inspiration',
                type: 'bardic_inspiration',
                usesPerRest: 'Charisma modifier (minimum 1)',
                restType: 'long',
                levelGained: 1,
                diceType: 'd6 (L1-4), d8 (L5-9), d10 (L10-14), d12 (L15+)',
                description: 'Grant allies inspiration die they can add to ability checks, attack rolls, or saving throws',
            },
        ],
        
        features: {
            1: [
                {
                    name: 'Spellcasting',
                    level: 1,
                    description: 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations. You know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels. The Spells Known column shows when you learn more bard spells of your choice. To cast one of these spells, you must expend a slot of the spell\'s level or higher. You regain all expended spell slots when you finish a long rest. Charisma is your spellcasting ability for your bard spells.',
                    actionType: 'special',
                },
                {
                    name: 'Bardic Inspiration',
                    level: 1,
                    description: 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6. Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time. You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest. Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.',
                    actionType: 'bonus action',
                    usesPerRest: 'Charisma modifier (minimum 1)',
                    restType: 'long',
                    scaling: 'd6 (L1-4), d8 (L5-9), d10 (L10-14), d12 (L15-20)',
                },
            ],
            2: [
                {
                    name: 'Jack of All Trades',
                    level: 2,
                    description: 'You can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.',
                    actionType: 'passive',
                },
                {
                    name: 'Song of Rest',
                    level: 2,
                    description: 'You can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points. The extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level.',
                    actionType: 'special',
                    scaling: '1d6 (L2-8), 1d8 (L9-12), 1d10 (L13-16), 1d12 (L17-20)',
                },
            ],
            3: [
                {
                    name: 'Bard College',
                    level: 3,
                    description: 'You delve into the advanced techniques of a bard college of your choice. Your choice grants you features at 3rd level and again at 6th and 14th level.',
                    actionType: 'special',
                },
                {
                    name: 'Expertise',
                    level: 3,
                    description: 'Choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies. At 10th level, you can choose another two skill proficiencies to gain this benefit.',
                    actionType: 'passive',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. You gain this feature again at levels 8, 12, 16, and 19.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Bardic Inspiration (d8)',
                    level: 5,
                    description: 'Your Bardic Inspiration die becomes a d8.',
                    actionType: 'passive',
                },
                {
                    name: 'Font of Inspiration',
                    level: 5,
                    description: 'You regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Countercharm',
                    level: 6,
                    description: 'You gain the ability to use musical notes or words of power to disrupt mind-influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creatures within 30 feet of you have advantage on saving throws against being frightened or charmed. A creature must be able to hear you to gain this benefit. The performance ends early if you are incapacitated or silenced or if you voluntarily end it (no action required).',
                    actionType: 'action',
                },
                {
                    name: 'Bard College Feature',
                    level: 6,
                    description: 'You gain a feature from your Bard College choice.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Bardic Inspiration (d10)',
                    level: 10,
                    description: 'Your Bardic Inspiration die becomes a d10.',
                    actionType: 'passive',
                },
                {
                    name: 'Expertise',
                    level: 10,
                    description: 'You can choose two more of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.',
                    actionType: 'passive',
                },
                {
                    name: 'Magical Secrets',
                    level: 10,
                    description: 'You have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any class, including this one. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip. The chosen spells count as bard spells for you and are included in the number in the Spells Known column of the Bard table. You learn two additional spells from any class at 14th level and again at 18th level.',
                    actionType: 'special',
                    scaling: '2 spells at L10, 2 more at L14, 2 more at L18',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Magical Secrets',
                    level: 14,
                    description: 'You learn two additional spells from any class.',
                    actionType: 'special',
                },
                {
                    name: 'Bard College Feature',
                    level: 14,
                    description: 'You gain a feature from your Bard College choice.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Bardic Inspiration (d12)',
                    level: 15,
                    description: 'Your Bardic Inspiration die becomes a d12.',
                    actionType: 'passive',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Magical Secrets',
                    level: 18,
                    description: 'You learn two additional spells from any class.',
                    actionType: 'special',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Superior Inspiration',
                    level: 20,
                    description: 'When you roll initiative and have no uses of Bardic Inspiration left, you regain one use.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // CLERIC
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'cleric',
        name: 'Cleric',
        sourcebook: 'PHB',
        hit_die: 8,
        
        hitPoints: {
            atFirstLevel: '8 + your Constitution modifier',
            atHigherLevels: '1d8 (or 5) + your Constitution modifier per cleric level after 1st',
        },
        
        saving_throws: [
            { index: 'wisdom', name: 'Wisdom' },
            { index: 'charisma', name: 'Charisma' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'medium-armor', name: 'Medium Armor', type: 'Armor' },
            { index: 'shields', name: 'Shields', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from History, Insight, Medicine, Persuasion, and Religion',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'history', name: 'History' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'medicine', name: 'Medicine' },
                        { index: 'persuasion', name: 'Persuasion' },
                        { index: 'religion', name: 'Religion' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A mace or a warhammer (if proficient)', quantity: 1 },
            { item: 'Scale mail, leather armor, or chain mail (if proficient)', quantity: 1 },
            { item: 'A light crossbow and 20 bolts or any simple weapon', quantity: 1 },
            { item: 'A priest\'s pack or an explorer\'s pack', quantity: 1 },
            { item: 'A shield and a holy symbol', quantity: 1 },
        ],
        
        spellcasting: {
            level: 1,
            spellcastingAbility: 'wis',
            progression: 'full', // Full caster
            spellSlots: {
                1: { 1: 2 },
                2: { 1: 3 },
                3: { 1: 4, 2: 2 },
                4: { 1: 4, 2: 3 },
                5: { 1: 4, 2: 3, 3: 2 },
                6: { 1: 4, 2: 3, 3: 3 },
                7: { 1: 4, 2: 3, 3: 3, 4: 1 },
                8: { 1: 4, 2: 3, 3: 3, 4: 2 },
                9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
                11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
                18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
            },
            cantripsKnown: {
                1: 3, 4: 4, 10: 5,
            },
            spellsKnownType: 'prepared',
            spellsKnownNote: 'You prepare a list of cleric spells that are available for you to cast. You prepare a number of spells equal to your Wisdom modifier + your cleric level (minimum of one spell).',
        },
        
        multiclassing: {
            prerequisites: [{ ability: 'wis', minimumScore: 13 }],
            proficienciesGained: ['light-armor', 'medium-armor', 'shields'],
        },
        
        resources: [
            {
                name: 'Channel Divinity',
                type: 'short',
                uses: { 2: 1, 6: 2, 18: 3 },
                description: 'You can channel divine energy directly from your deity. You start with two effects: Turn Undead and an effect determined by your domain. Some domains grant additional uses.',
            },
        ],
        
        subclass_level: 1, // Cleric domains are chosen at level 1, unlike most classes!
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/cleric',
        
        features: {
            1: [
                {
                    name: 'Spellcasting',
                    level: 1,
                    description: 'As a conduit for divine power, you can cast cleric spells. You prepare spells from the cleric spell list. You can change your list of prepared spells when you finish a long rest. Wisdom is your spellcasting ability. You can use a holy symbol as a spellcasting focus. You can cast cleric spells as rituals if they have the ritual tag and you have them prepared.',
                    actionType: 'special',
                },
                {
                    name: 'Divine Domain',
                    level: 1,
                    description: 'Choose one domain related to your deity: Knowledge, Life, Light, Nature, Tempest, Trickery, War, or others. Your choice grants you domain spells and other features at 1st level and again at 2nd, 6th, 8th, and 17th level. Domain spells are always prepared and don\'t count against the number of spells you can prepare each day.',
                    actionType: 'special',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity',
                    level: 2,
                    description: 'You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels. When you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again. Beginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests.',
                    actionType: 'special',
                },
                {
                    name: 'Channel Divinity: Turn Undead',
                    level: 2,
                    description: 'As an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage. A turned creature must spend its turns trying to move as far away from you as it can, and it can\'t willingly move to a space within 30 feet of you. It also can\'t take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there\'s nowhere to move, the creature can use the Dodge action.',
                    actionType: 'action',
                },
            ],
            3: [
                {
                    name: 'Cantrip Versatility (Optional)',
                    level: 3,
                    description: 'Whenever you gain a level in this class, you can replace one cantrip you learned from this class with another cantrip from the cleric spell list.',
                    actionType: 'special',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Destroy Undead',
                    level: 5,
                    description: 'When an undead of CR 1/2 or lower fails its saving throw against your Turn Undead feature, the creature is instantly destroyed. The CR threshold increases as you gain levels: CR 1 at 8th level, CR 2 at 11th level, CR 3 at 14th level, and CR 4 at 17th level.',
                    actionType: 'passive',
                    scaling: 'CR threshold: 1/2 (5th), 1 (8th), 2 (11th), 3 (14th), 4 (17th)',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Divine Intervention',
                    level: 10,
                    description: 'You can call on your deity to intervene on your behalf when your need is great. As an action, describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes. The DM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate. If your deity intervenes, you can\'t use this feature again for 7 days. Otherwise, you can use it again after you finish a long rest. At 20th level, your call for intervention succeeds automatically, no roll required.',
                    actionType: 'action',
                    usesPerRest: 'special',
                    restType: 'special',
                    scaling: 'Auto-succeeds at level 20',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Divine Intervention Improvement',
                    level: 20,
                    description: 'Your call for divine intervention succeeds automatically, no roll required.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // DRUID
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'druid',
        name: 'Druid',
        sourcebook: 'PHB',
        hit_die: 8,
        
        hitPoints: {
            atFirstLevel: '8 + your Constitution modifier',
            atHigherLevels: '1d8 (or 5) + your Constitution modifier per druid level after 1st',
        },
        
        saving_throws: [
            { index: 'intelligence', name: 'Intelligence' },
            { index: 'wisdom', name: 'Wisdom' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'medium-armor', name: 'Medium Armor', type: 'Armor' },
            { index: 'shields', name: 'Shields', type: 'Armor' },
            { index: 'clubs', name: 'Clubs', type: 'Weapons' },
            { index: 'daggers', name: 'Daggers', type: 'Weapons' },
            { index: 'darts', name: 'Darts', type: 'Weapons' },
            { index: 'javelins', name: 'Javelins', type: 'Weapons' },
            { index: 'maces', name: 'Maces', type: 'Weapons' },
            { index: 'quarterstaffs', name: 'Quarterstaffs', type: 'Weapons' },
            { index: 'scimitars', name: 'Scimitars', type: 'Weapons' },
            { index: 'sickles', name: 'Sickles', type: 'Weapons' },
            { index: 'slings', name: 'Slings', type: 'Weapons' },
            { index: 'spears', name: 'Spears', type: 'Weapons' },
            { index: 'herbalism-kit', name: 'Herbalism Kit', type: 'Tools' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'arcana', name: 'Arcana' },
                        { index: 'animal-handling', name: 'Animal Handling' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'medicine', name: 'Medicine' },
                        { index: 'nature', name: 'Nature' },
                        { index: 'perception', name: 'Perception' },
                        { index: 'religion', name: 'Religion' },
                        { index: 'survival', name: 'Survival' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A wooden shield or any simple weapon', quantity: 1 },
            { item: 'A scimitar or any simple melee weapon', quantity: 1 },
            { item: 'Leather armor, an explorer\'s pack, and a druidic focus', quantity: 1 },
        ],
        
        spellcasting: {
            level: 1,
            spellcastingAbility: 'wis',
            progression: 'full', // Full caster
            spellSlots: {
                1: { 1: 2 },
                2: { 1: 3 },
                3: { 1: 4, 2: 2 },
                4: { 1: 4, 2: 3 },
                5: { 1: 4, 2: 3, 3: 2 },
                6: { 1: 4, 2: 3, 3: 3 },
                7: { 1: 4, 2: 3, 3: 3, 4: 1 },
                8: { 1: 4, 2: 3, 3: 3, 4: 2 },
                9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
                11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
                18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
            },
            cantripsKnown: {
                1: 2, 4: 3, 10: 4,
            },
            spellsKnownType: 'prepared',
            spellsKnownNote: 'You prepare a list of druid spells that are available for you to cast. You prepare a number of spells equal to your Wisdom modifier + your druid level (minimum of one spell).',
        },
        
        multiclassing: {
            prerequisites: [{ ability: 'wis', minimumScore: 13 }],
            proficienciesGained: ['light-armor', 'medium-armor', 'shields'],
        },
        
        subclass_level: 2,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/druid',
        
        features: {
            1: [
                {
                    name: 'Druidic',
                    level: 1,
                    description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message\'s presence with a successful DC 15 Wisdom (Perception) check but can\'t decipher it without magic.',
                    actionType: 'passive',
                },
                {
                    name: 'Spellcasting',
                    level: 1,
                    description: 'Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will. You prepare druid spells from the druid spell list. Wisdom is your spellcasting ability. You can use a druidic focus as a spellcasting focus. You can cast druid spells as rituals if they have the ritual tag and you have them prepared.',
                    actionType: 'special',
                },
            ],
            2: [
                {
                    name: 'Wild Shape',
                    level: 2,
                    description: 'You can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest. Your druid level determines the beasts you can transform into (CR 1/4 at 2nd, CR 1/2 at 4th, CR 1 at 8th). You can stay in beast shape for a number of hours equal to half your druid level (rounded down). You can revert to your normal form earlier as a bonus action. You automatically revert if you fall unconscious, drop to 0 hit points, or die.',
                    actionType: 'action',
                    usesPerRest: '2',
                    restType: 'short',
                    scaling: 'Max CR: 1/4 (2nd), 1/2 (4th), 1 (8th). Duration: hours = druid level ÷ 2. Swim speed at 4th, fly speed at 8th.',
                },
                {
                    name: 'Druid Circle',
                    level: 2,
                    description: 'You choose to identify with a circle of druids: the Circle of the Land, Circle of the Moon, or another circle. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.',
                    actionType: 'special',
                },
            ],
            4: [
                {
                    name: 'Wild Shape Improvement',
                    level: 4,
                    description: 'You can transform into beasts with a CR as high as 1/2, and can transform into beasts with a swimming speed.',
                    actionType: 'passive',
                },
                {
                    name: 'Cantrip Versatility (Optional)',
                    level: 4,
                    description: 'Whenever you gain a level in this class, you can replace one cantrip you learned from this class with another cantrip from the druid spell list.',
                    actionType: 'special',
                },
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Wild Shape Improvement',
                    level: 8,
                    description: 'You can transform into beasts with a CR as high as 1, and can transform into beasts with a flying speed.',
                    actionType: 'passive',
                },
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Timeless Body',
                    level: 18,
                    description: 'The primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year.',
                    actionType: 'passive',
                },
                {
                    name: 'Beast Spells',
                    level: 18,
                    description: 'You can cast many of your druid spells in any shape you assume using Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast shape, but you aren\'t able to provide material components.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Archdruid',
                    level: 20,
                    description: 'You can use your Wild Shape an unlimited number of times. Additionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren\'t consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // FIGHTER
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'fighter',
        name: 'Fighter',
        sourcebook: 'PHB',
        hit_die: 10,
        
        hitPoints: {
            atFirstLevel: '10 + your Constitution modifier',
            atHigherLevels: '1d10 (or 6) + your Constitution modifier per fighter level after 1st',
        },
        
        saving_throws: [
            { index: 'strength', name: 'Strength' },
            { index: 'constitution', name: 'Constitution' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'medium-armor', name: 'Medium Armor', type: 'Armor' },
            { index: 'heavy-armor', name: 'Heavy Armor', type: 'Armor' },
            { index: 'shields', name: 'Shields', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
            { index: 'martial-weapons', name: 'Martial Weapons', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'acrobatics', name: 'Acrobatics' },
                        { index: 'animal-handling', name: 'Animal Handling' },
                        { index: 'athletics', name: 'Athletics' },
                        { index: 'history', name: 'History' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'intimidation', name: 'Intimidation' },
                        { index: 'perception', name: 'Perception' },
                        { index: 'survival', name: 'Survival' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'Chain mail or leather armor, longbow, and 20 arrows', quantity: 1 },
            { item: 'A martial weapon and a shield or two martial weapons', quantity: 1 },
            { item: 'A light crossbow and 20 bolts or two handaxes', quantity: 1 },
            { item: 'A dungeoneer\'s pack or an explorer\'s pack', quantity: 1 },
        ],
        
        multiclassing: {
            prerequisites: [
                { ability: 'str', minimumScore: 13 },
                { ability: 'dex', minimumScore: 13, alternativeTo: 'str' },
            ],
            proficienciesGained: ['light-armor', 'medium-armor', 'shields', 'simple-weapons', 'martial-weapons'],
        },
        
        subclass_level: 3,
        asi_levels: [4, 6, 8, 12, 14, 16, 19], // Fighter gets extra ASIs!
        url: '/classes/fighter',
        
        features: {
            1: [
                {
                    name: 'Fighting Style',
                    level: 1,
                    description: 'You adopt a particular style of fighting as your specialty. Choose one of the following options: Archery, Blind Fighting, Defense, Dueling, Great Weapon Fighting, Interception, Protection, Superior Technique, Thrown Weapon Fighting, Two-Weapon Fighting, or Unarmed Fighting. You can\'t take a Fighting Style option more than once, even if you later get to choose again.',
                    actionType: 'passive',
                    choices: ['Archery', 'Blind Fighting', 'Defense', 'Dueling', 'Great Weapon Fighting', 'Interception', 'Protection', 'Superior Technique', 'Thrown Weapon Fighting', 'Two-Weapon Fighting', 'Unarmed Fighting'],
                },
                {
                    name: 'Second Wind',
                    level: 1,
                    description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            2: [
                {
                    name: 'Action Surge',
                    level: 2,
                    description: 'You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.',
                    actionType: 'special',
                    usesPerRest: '1 (2 at 17th)',
                    restType: 'short',
                    scaling: 'Increases to 2 uses at level 17',
                },
            ],
            3: [
                {
                    name: 'Martial Archetype',
                    level: 3,
                    description: 'You choose an archetype that you strive to emulate in your combat styles and techniques. Your archetype grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.',
                    actionType: 'special',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn. The number of attacks increases to three when you reach 11th level in this class and to four when you reach 20th level in this class.',
                    actionType: 'passive',
                    scaling: '2 attacks (5th), 3 attacks (11th), 4 attacks (20th)',
                },
            ],
            6: [
                {
                    name: 'Ability Score Improvement',
                    level: 6,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            7: [
                {
                    name: 'Know Your Enemy',
                    level: 7,
                    description: 'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice: Strength score, Dexterity score, Constitution score, Armor Class, Current hit points, Total class levels (if any), Fighter class levels (if any).',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            9: [
                {
                    name: 'Indomitable',
                    level: 9,
                    description: 'You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can\'t use this feature again until you finish a long rest. You can use this feature twice between long rests starting at 13th level and three times between long rests starting at 17th level.',
                    actionType: 'special',
                    usesPerRest: '1 (2 at 13th, 3 at 17th)',
                    restType: 'long',
                    scaling: 'Increases: 1 use (9th), 2 uses (13th), 3 uses (17th)',
                },
            ],
            11: [
                {
                    name: 'Extra Attack (2)',
                    level: 11,
                    description: 'You can attack three times whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Indomitable (2 uses)',
                    level: 13,
                    description: 'You can use Indomitable twice between long rests.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Ability Score Improvement',
                    level: 14,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Action Surge (2 uses)',
                    level: 17,
                    description: 'You can use Action Surge twice before a rest, although you can only use it once on the same turn.',
                    actionType: 'passive',
                },
                {
                    name: 'Indomitable (3 uses)',
                    level: 17,
                    description: 'You can use Indomitable three times between long rests.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Extra Attack (3)',
                    level: 20,
                    description: 'You can attack four times whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // MONK
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'monk',
        name: 'Monk',
        sourcebook: 'PHB',
        hit_die: 8,
        
        hitPoints: {
            atFirstLevel: '8 + your Constitution modifier',
            atHigherLevels: '1d8 (or 5) + your Constitution modifier per monk level after 1st',
        },
        
        saving_throws: [
            { index: 'strength', name: 'Strength' },
            { index: 'dexterity', name: 'Dexterity' },
        ],
        
        proficiencies: [
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
            { index: 'shortswords', name: 'Shortswords', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose one type of artisan\'s tools or one musical instrument',
                choose: 1,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'artisan-tools', name: 'Artisan\'s Tools' },
                        { index: 'musical-instrument', name: 'Musical Instrument' },
                    ],
                },
            },
            {
                desc: 'Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'acrobatics', name: 'Acrobatics' },
                        { index: 'athletics', name: 'Athletics' },
                        { index: 'history', name: 'History' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'religion', name: 'Religion' },
                        { index: 'stealth', name: 'Stealth' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A shortsword or any simple weapon', quantity: 1 },
            { item: 'A dungeoneer\'s pack or an explorer\'s pack', quantity: 1 },
            { item: '10 darts', quantity: 1 },
        ],
        
        multiclassing: {
            prerequisites: [
                { ability: 'dex', minimumScore: 13 },
                { ability: 'wis', minimumScore: 13 },
            ],
            proficienciesGained: ['simple-weapons', 'shortswords'],
        },
        
        resources: [
            {
                name: 'Ki Points',
                type: 'short',
                uses: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20 },
                description: 'You have ki points equal to your monk level. You spend ki points to fuel various ki features. You regain all expended ki points when you finish a short or long rest.',
            },
        ],
        
        subclass_level: 3,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/monk',
        
        features: {
            1: [
                {
                    name: 'Unarmored Defense',
                    level: 1,
                    description: 'While you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.',
                    actionType: 'passive',
                },
                {
                    name: 'Martial Arts',
                    level: 1,
                    description: 'Your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons (shortswords and simple melee weapons that don\'t have the two-handed or heavy property). You gain the following benefits while unarmed or wielding only monk weapons and not wearing armor or wielding a shield: You can use Dexterity instead of Strength for attack and damage rolls. You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon (this die changes as you gain monk levels). When you use the Attack action with an unarmed strike or a monk weapon, you can make one unarmed strike as a bonus action.',
                    actionType: 'passive',
                    scaling: 'Martial Arts die: d4 (1st), d6 (5th), d8 (11th), d10 (17th)',
                },
            ],
            2: [
                {
                    name: 'Ki',
                    level: 2,
                    description: 'Your training allows you to harness the mystic energy of ki. You have a number of ki points equal to your monk level. You can spend these points to fuel various ki features: Flurry of Blows (1 ki, 2 unarmed strikes as bonus action after Attack action), Patient Defense (1 ki, Dodge as bonus action), Step of the Wind (1 ki, Disengage or Dash as bonus action, jump distance doubled). You regain all expended ki points when you finish a short or long rest.',
                    actionType: 'special',
                },
                {
                    name: 'Unarmored Movement',
                    level: 2,
                    description: 'Your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases as you gain monk levels. At 9th level, you gain the ability to move along vertical surfaces and across liquids without falling during your move.',
                    actionType: 'passive',
                    scaling: 'Speed bonus: +10 ft (2nd), +15 ft (6th), +20 ft (10th), +25 ft (14th), +30 ft (18th)',
                },
            ],
            3: [
                {
                    name: 'Monastic Tradition',
                    level: 3,
                    description: 'You commit yourself to a monastic tradition. Your tradition grants you features at 3rd level and again at 6th, 11th, and 17th level.',
                    actionType: 'special',
                },
                {
                    name: 'Deflect Missiles',
                    level: 3,
                    description: 'You can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack (range 20/60 feet) with the weapon or piece of ammunition you just caught, as part of the same reaction.',
                    actionType: 'reaction',
                },
            ],
            4: [
                {
                    name: 'Slow Fall',
                    level: 4,
                    description: 'You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.',
                    actionType: 'reaction',
                },
                {
                    name: 'Quickened Healing (Optional)',
                    level: 4,
                    description: 'As an action, you can spend 2 ki points and roll a Martial Arts die. You regain a number of hit points equal to the number rolled plus your proficiency bonus.',
                    actionType: 'action',
                },
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
                {
                    name: 'Stunning Strike',
                    level: 5,
                    description: 'You can interfere with the flow of ki in an opponent\'s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Ki-Empowered Strikes',
                    level: 6,
                    description: 'Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.',
                    actionType: 'passive',
                },
            ],
            7: [
                {
                    name: 'Evasion',
                    level: 7,
                    description: 'Your instinctive agility lets you dodge out of the way of certain area effects. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
                    actionType: 'passive',
                },
                {
                    name: 'Stillness of Mind',
                    level: 7,
                    description: 'You can use your action to end one effect on yourself that is causing you to be charmed or frightened.',
                    actionType: 'action',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            9: [
                {
                    name: 'Unarmored Movement Improvement',
                    level: 9,
                    description: 'You gain the ability to move along vertical surfaces and across liquids on your turn without falling during the move.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Purity of Body',
                    level: 10,
                    description: 'Your mastery of the ki flowing through you makes you immune to disease and poison.',
                    actionType: 'passive',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Tongue of the Sun and Moon',
                    level: 13,
                    description: 'You learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Diamond Soul',
                    level: 14,
                    description: 'Your mastery of ki grants you proficiency in all saving throws. Additionally, whenever you make a saving throw and fail, you can spend 1 ki point to reroll it and take the second result.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Timeless Body',
                    level: 15,
                    description: 'Your ki sustains you so that you suffer none of the frailty of old age, and you can\'t be aged magically. You can still die of old age, however. In addition, you no longer need food or water.',
                    actionType: 'passive',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Empty Body',
                    level: 18,
                    description: 'You can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage. Additionally, you can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can\'t take any other creatures with you.',
                    actionType: 'action',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Perfect Self',
                    level: 20,
                    description: 'When you roll for initiative and have no ki points remaining, you regain 4 ki points.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // PALADIN
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'paladin',
        name: 'Paladin',
        sourcebook: 'PHB',
        hit_die: 10,
        
        hitPoints: {
            atFirstLevel: '10 + your Constitution modifier',
            atHigherLevels: '1d10 (or 6) + your Constitution modifier per paladin level after 1st',
        },
        
        saving_throws: [
            { index: 'wisdom', name: 'Wisdom' },
            { index: 'charisma', name: 'Charisma' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'medium-armor', name: 'Medium Armor', type: 'Armor' },
            { index: 'heavy-armor', name: 'Heavy Armor', type: 'Armor' },
            { index: 'shields', name: 'Shields', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
            { index: 'martial-weapons', name: 'Martial Weapons', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'athletics', name: 'Athletics' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'intimidation', name: 'Intimidation' },
                        { index: 'medicine', name: 'Medicine' },
                        { index: 'persuasion', name: 'Persuasion' },
                        { index: 'religion', name: 'Religion' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A martial weapon and a shield or two martial weapons', quantity: 1 },
            { item: 'Five javelins or any simple melee weapon', quantity: 1 },
            { item: 'A priest\'s pack or an explorer\'s pack', quantity: 1 },
            { item: 'Chain mail and a holy symbol', quantity: 1 },
        ],
        
        spellcasting: {
            level: 2,
            spellcastingAbility: 'cha',
            progression: 'half', // Half caster
            spellSlots: {
                2: { 1: 2 },
                3: { 1: 3 },
                5: { 1: 4, 2: 2 },
                7: { 1: 4, 2: 3 },
                9: { 1: 4, 2: 3, 3: 2 },
                11: { 1: 4, 2: 3, 3: 3 },
                13: { 1: 4, 2: 3, 3: 3, 4: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 2 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
            },
            spellsKnownType: 'prepared',
            spellsKnownNote: 'You prepare a list of paladin spells that are available for you to cast. You prepare a number of spells equal to your Charisma modifier + half your paladin level, rounded down (minimum of one spell).',
        },
        
        multiclassing: {
            prerequisites: [
                { ability: 'str', minimumScore: 13 },
                { ability: 'cha', minimumScore: 13 },
            ],
            proficienciesGained: ['light-armor', 'medium-armor', 'shields', 'simple-weapons', 'martial-weapons'],
        },
        
        resources: [
            {
                name: 'Lay on Hands',
                type: 'long',
                uses: { 1: '5 × paladin level' },
                description: 'You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.',
            },
            {
                name: 'Channel Divinity',
                type: 'short',
                uses: { 3: 1, 7: 2, 15: 3, 18: 4, 19: 5 },
                description: 'You gain Channel Divinity based on your Sacred Oath, usable a certain number of times between rests.',
            },
            {
                name: 'Cleansing Touch',
                type: 'long',
                uses: { 14: 'Charisma modifier' },
                description: 'You can use your Cleansing Touch feature a number of times equal to your Charisma modifier (minimum of once).',
            },
        ],
        
        subclass_level: 3,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/paladin',
        
        features: {
            1: [
                {
                    name: 'Divine Sense',
                    level: 1,
                    description: 'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type of any being whose presence you sense, but not its identity. Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell. You can use this feature a number of times equal to 1 + your Charisma modifier. You regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1 + Charisma modifier',
                    restType: 'long',
                },
                {
                    name: 'Lay on Hands',
                    level: 1,
                    description: 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5. As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool. Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.',
                    actionType: 'action',
                },
            ],
            2: [
                {
                    name: 'Fighting Style',
                    level: 2,
                    description: 'You adopt a fighting style as your specialty. Choose one: Blessed Warrior, Blind Fighting, Defense, Dueling, Great Weapon Fighting, Interception, or Protection. You can\'t take a Fighting Style option more than once.',
                    actionType: 'passive',
                    choices: ['Blessed Warrior', 'Blind Fighting', 'Defense', 'Dueling', 'Great Weapon Fighting', 'Interception', 'Protection'],
                },
                {
                    name: 'Spellcasting',
                    level: 2,
                    description: 'You have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does. You prepare paladin spells from the paladin spell list. Charisma is your spellcasting ability. You can use a holy symbol as a spellcasting focus.',
                    actionType: 'special',
                },
                {
                    name: 'Divine Smite',
                    level: 2,
                    description: 'When you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon\'s damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend, to a maximum of 6d8.',
                    actionType: 'special',
                    damage: {
                        dice: '2d8 + 1d8 per level above 1st',
                        type: 'radiant',
                        scaling: 'Max 5d8 (6d8 vs undead/fiend)',
                    },
                },
            ],
            3: [
                {
                    name: 'Divine Health',
                    level: 3,
                    description: 'The divine magic flowing through you makes you immune to disease.',
                    actionType: 'passive',
                },
                {
                    name: 'Sacred Oath',
                    level: 3,
                    description: 'You swear an oath that binds you as a paladin forever. Your oath grants you features at 3rd level and again at 7th, 15th, and 20th level. Your oath also grants you additional ways to use Channel Divinity when you gain that feature at 3rd level, and additional benefits at 7th, 15th, and 20th level.',
                    actionType: 'special',
                },
                {
                    name: 'Channel Divinity',
                    level: 3,
                    description: 'You gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Sacred Weapon and Turn the Undead (or effects determined by your Sacred Oath). Some oaths grant you additional effects as you advance in levels. When you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again. Some Channel Divinity effects require saving throws. The DC equals your paladin spell save DC.',
                    actionType: 'special',
                },
                {
                    name: 'Harness Divine Power (Optional)',
                    level: 3,
                    description: 'You can expend a use of your Channel Divinity to fuel your spells. As a bonus action, you touch your holy symbol, utter a prayer, and regain one expended spell slot, the level of which can be no higher than half your proficiency bonus (rounded up). The number of times you can use this feature is based on the level you\'ve reached in this class: 3rd level, once; 7th level, twice; 15th level, three times. You regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
                {
                    name: 'Martial Versatility (Optional)',
                    level: 4,
                    description: 'Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace a fighting style you know with another fighting style available to paladins.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Aura of Protection',
                    level: 6,
                    description: 'Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (6th), 30 feet (18th)',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Aura of Courage',
                    level: 10,
                    description: 'You and friendly creatures within 10 feet of you can\'t be frightened while you are conscious. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (10th), 30 feet (18th)',
                },
            ],
            11: [
                {
                    name: 'Improved Divine Smite',
                    level: 11,
                    description: 'You are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'radiant',
                        scaling: 'Always active on melee weapon hits',
                    },
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Cleansing Touch',
                    level: 14,
                    description: 'You can use your action to end one spell on yourself or on one willing creature that you touch. You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Charisma modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Aura Improvements',
                    level: 18,
                    description: 'The range of your Aura of Protection and Aura of Courage increases to 30 feet.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // RANGER
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'ranger',
        name: 'Ranger',
        sourcebook: 'PHB',
        hit_die: 10,
        
        hitPoints: {
            atFirstLevel: '10 + your Constitution modifier',
            atHigherLevels: '1d10 (or 6) + your Constitution modifier per ranger level after 1st',
        },
        
        saving_throws: [
            { index: 'strength', name: 'Strength' },
            { index: 'dexterity', name: 'Dexterity' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'medium-armor', name: 'Medium Armor', type: 'Armor' },
            { index: 'shields', name: 'Shields', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
            { index: 'martial-weapons', name: 'Martial Weapons', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival',
                choose: 3,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'animal-handling', name: 'Animal Handling' },
                        { index: 'athletics', name: 'Athletics' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'investigation', name: 'Investigation' },
                        { index: 'nature', name: 'Nature' },
                        { index: 'perception', name: 'Perception' },
                        { index: 'stealth', name: 'Stealth' },
                        { index: 'survival', name: 'Survival' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'Scale mail or leather armor', quantity: 1 },
            { item: 'Two shortswords or two simple melee weapons', quantity: 1 },
            { item: 'A dungeoneer\'s pack or an explorer\'s pack', quantity: 1 },
            { item: 'A longbow and a quiver of 20 arrows', quantity: 1 },
        ],
        
        spellcasting: {
            level: 2,
            spellcastingAbility: 'wis',
            progression: 'half', // Half caster
            spellSlots: {
                2: { 1: 2 },
                3: { 1: 3 },
                5: { 1: 4, 2: 2 },
                7: { 1: 4, 2: 3 },
                9: { 1: 4, 2: 3, 3: 2 },
                11: { 1: 4, 2: 3, 3: 3 },
                13: { 1: 4, 2: 3, 3: 3, 4: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 2 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
            },
            spellsKnownType: 'known',
            spellsKnownNote: 'You know a number of ranger spells equal to your Wisdom modifier + half your ranger level, rounded down (minimum of one spell).',
        },
        
        multiclassing: {
            prerequisites: [
                { ability: 'dex', minimumScore: 13 },
                { ability: 'wis', minimumScore: 13 },
            ],
            proficienciesGained: ['light-armor', 'medium-armor', 'shields', 'simple-weapons', 'martial-weapons'],
        },
        
        subclass_level: 3,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/ranger',
        
        features: {
            1: [
                {
                    name: 'Favored Enemy',
                    level: 1,
                    description: 'You have significant experience studying, tracking, hunting, and even talking to a certain type of enemy. Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can select two races of humanoid (such as gnolls and orcs) as favored enemies. You have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them. You choose one additional favored enemy, as well as an associated language, at 6th and 14th level.',
                    actionType: 'passive',
                    scaling: 'Additional favored enemies: 1 (1st), 2 (6th), 3 (14th)',
                },
                {
                    name: 'Natural Explorer',
                    level: 1,
                    description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain: arctic, coast, desert, forest, grassland, mountain, swamp, or the Underdark. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you\'re proficient in. While traveling for an hour or more in your favored terrain, you gain several benefits (difficult terrain doesn\'t slow group travel, can\'t become lost except by magic, remain alert to danger even when engaged in another activity, can move stealthily at a normal pace when alone, find twice as much food when foraging, and learn exact number/sizes/time since passing of tracked creatures). You choose additional favored terrain types at 6th and 10th level.',
                    actionType: 'passive',
                    scaling: 'Additional favored terrains: 1 (1st), 2 (6th), 3 (10th)',
                },
            ],
            2: [
                {
                    name: 'Fighting Style',
                    level: 2,
                    description: 'You adopt a particular style of fighting as your specialty. Choose one: Archery, Blind Fighting, Defense, Druidic Warrior, Dueling, or Two-Weapon Fighting.',
                    actionType: 'passive',
                    choices: ['Archery', 'Blind Fighting', 'Defense', 'Druidic Warrior', 'Dueling', 'Two-Weapon Fighting'],
                },
                {
                    name: 'Spellcasting',
                    level: 2,
                    description: 'You have learned to use the magical essence of nature to cast spells, much as a druid does. You know a number of ranger spells based on your ranger level and Wisdom modifier. Wisdom is your spellcasting ability.',
                    actionType: 'special',
                },
            ],
            3: [
                {
                    name: 'Ranger Archetype',
                    level: 3,
                    description: 'You choose an archetype that you strive to emulate: Beast Master, Hunter, or another archetype. Your choice grants you features at 3rd level and again at 7th, 11th, and 15th level.',
                    actionType: 'special',
                },
                {
                    name: 'Primeval Awareness',
                    level: 3,
                    description: 'You can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn\'t reveal the creatures\' location or number.',
                    actionType: 'action',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
                {
                    name: 'Martial Versatility (Optional)',
                    level: 4,
                    description: 'Whenever you reach a level in this class that grants the Ability Score Improvement feature, you can replace a fighting style you know with another fighting style available to rangers.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Land\'s Stride',
                    level: 8,
                    description: 'Moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard. In addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such those created by the entangle spell.',
                    actionType: 'passive',
                },
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Hide in Plain Sight',
                    level: 10,
                    description: 'You can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage. Once you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit.',
                    actionType: 'special',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Vanish',
                    level: 14,
                    description: 'You can use the Hide action as a bonus action on your turn. Also, you can\'t be tracked by nonmagical means, unless you choose to leave a trail.',
                    actionType: 'bonus action',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Feral Senses',
                    level: 18,
                    description: 'You gain preternatural senses that help you fight creatures you can\'t see. When you attack a creature you can\'t see, your inability to see it doesn\'t impose disadvantage on your attack rolls against it. You are also aware of the location of any invisible creature within 30 feet of you, provided that the creature isn\'t hidden from you and you aren\'t blinded or deafened.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Foe Slayer',
                    level: 20,
                    description: 'You become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies. You can choose to use this feature before or after the roll, but before any effects of the roll are applied.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // ROGUE
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'rogue',
        name: 'Rogue',
        sourcebook: 'PHB',
        hit_die: 8,
        
        hitPoints: {
            atFirstLevel: '8 + your Constitution modifier',
            atHigherLevels: '1d8 (or 5) + your Constitution modifier per rogue level after 1st',
        },
        
        saving_throws: [
            { index: 'dexterity', name: 'Dexterity' },
            { index: 'intelligence', name: 'Intelligence' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
            { index: 'hand-crossbows', name: 'Hand Crossbows', type: 'Weapons' },
            { index: 'longswords', name: 'Longswords', type: 'Weapons' },
            { index: 'rapiers', name: 'Rapiers', type: 'Weapons' },
            { index: 'shortswords', name: 'Shortswords', type: 'Weapons' },
            { index: 'thieves-tools', name: 'Thieves\' Tools', type: 'Tools' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth',
                choose: 4,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'acrobatics', name: 'Acrobatics' },
                        { index: 'athletics', name: 'Athletics' },
                        { index: 'deception', name: 'Deception' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'intimidation', name: 'Intimidation' },
                        { index: 'investigation', name: 'Investigation' },
                        { index: 'perception', name: 'Perception' },
                        { index: 'performance', name: 'Performance' },
                        { index: 'persuasion', name: 'Persuasion' },
                        { index: 'sleight-of-hand', name: 'Sleight of Hand' },
                        { index: 'stealth', name: 'Stealth' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A rapier or a shortsword', quantity: 1 },
            { item: 'A shortbow and quiver of 20 arrows or a shortsword', quantity: 1 },
            { item: 'A burglar\'s pack, a dungeoneer\'s pack, or an explorer\'s pack', quantity: 1 },
            { item: 'Leather armor, two daggers, and thieves\' tools', quantity: 1 },
        ],
        
        multiclassing: {
            prerequisites: [{ ability: 'dex', minimumScore: 13 }],
            proficienciesGained: ['light-armor', 'thieves-tools'],
        },
        
        subclass_level: 3,
        asi_levels: [4, 8, 10, 12, 16, 19],
        url: '/classes/rogue',
        
        features: {
            1: [
                {
                    name: 'Expertise',
                    level: 1,
                    description: 'Choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves\' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies. At 6th level, you can choose two more of your proficiencies to gain this benefit.',
                    actionType: 'passive',
                    scaling: 'Choose 2 proficiencies (1st), 4 total (6th)',
                },
                {
                    name: 'Sneak Attack',
                    level: 1,
                    description: 'You know how to strike subtly and exploit a foe\'s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon. You don\'t need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn\'t incapacitated, and you don\'t have disadvantage on the attack roll. The amount of the extra damage increases as you gain levels in this class.',
                    actionType: 'special',
                    damage: {
                        dice: '1d6',
                        type: 'weapon damage type',
                        scaling: 'Increases by 1d6 every 2 levels: 1d6 (1st), 2d6 (3rd), 3d6 (5th)... 10d6 (19th)',
                    },
                },
                {
                    name: 'Thieves\' Cant',
                    level: 1,
                    description: 'During your rogue training you learned thieves\' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. It takes four times longer to convey such a message than it does to speak the same idea plainly.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Cunning Action',
                    level: 2,
                    description: 'Your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.',
                    actionType: 'bonus action',
                },
            ],
            3: [
                {
                    name: 'Roguish Archetype',
                    level: 3,
                    description: 'You choose an archetype that you emulate in the exercise of your rogue abilities. Your archetype choice grants you features at 3rd level and then again at 9th, 13th, and 17th level.',
                    actionType: 'special',
                },
                {
                    name: 'Steady Aim (Optional)',
                    level: 3,
                    description: 'As a bonus action, you give yourself advantage on your next attack roll on the current turn. You can use this bonus action only if you haven\'t moved during this turn, and after you use the bonus action, your speed is 0 until the end of the current turn.',
                    actionType: 'bonus action',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            5: [
                {
                    name: 'Uncanny Dodge',
                    level: 5,
                    description: 'When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.',
                    actionType: 'reaction',
                },
            ],
            6: [
                {
                    name: 'Expertise (Additional)',
                    level: 6,
                    description: 'You can choose two more of your proficiencies to gain the Expertise benefit.',
                    actionType: 'passive',
                },
            ],
            7: [
                {
                    name: 'Evasion',
                    level: 7,
                    description: 'You can nimbly dodge out of the way of certain area effects. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Ability Score Improvement',
                    level: 10,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            11: [
                {
                    name: 'Reliable Talent',
                    level: 11,
                    description: 'You have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.',
                    actionType: 'passive',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Blindsense',
                    level: 14,
                    description: 'If you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Slippery Mind',
                    level: 15,
                    description: 'You have acquired greater mental strength. You gain proficiency in Wisdom saving throws.',
                    actionType: 'passive',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Elusive',
                    level: 18,
                    description: 'You are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren\'t incapacitated.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Stroke of Luck',
                    level: 20,
                    description: 'You have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // SORCERER
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'sorcerer',
        name: 'Sorcerer',
        sourcebook: 'PHB',
        hit_die: 6,
        
        hitPoints: {
            atFirstLevel: '6 + your Constitution modifier',
            atHigherLevels: '1d6 (or 4) + your Constitution modifier per sorcerer level after 1st',
        },
        
        saving_throws: [
            { index: 'constitution', name: 'Constitution' },
            { index: 'charisma', name: 'Charisma' },
        ],
        
        proficiencies: [
            { index: 'daggers', name: 'Daggers', type: 'Weapons' },
            { index: 'darts', name: 'Darts', type: 'Weapons' },
            { index: 'slings', name: 'Slings', type: 'Weapons' },
            { index: 'quarterstaffs', name: 'Quarterstaffs', type: 'Weapons' },
            { index: 'light-crossbows', name: 'Light Crossbows', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'arcana', name: 'Arcana' },
                        { index: 'deception', name: 'Deception' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'intimidation', name: 'Intimidation' },
                        { index: 'persuasion', name: 'Persuasion' },
                        { index: 'religion', name: 'Religion' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A light crossbow and 20 bolts or any simple weapon', quantity: 1 },
            { item: 'A component pouch or an arcane focus', quantity: 1 },
            { item: 'A dungeoneer\'s pack or an explorer\'s pack', quantity: 1 },
            { item: 'Two daggers', quantity: 1 },
        ],
        
        spellcasting: {
            level: 1,
            spellcastingAbility: 'cha',
            progression: 'full', // Full caster
            spellSlots: {
                1: { 1: 2 },
                2: { 1: 3 },
                3: { 1: 4, 2: 2 },
                4: { 1: 4, 2: 3 },
                5: { 1: 4, 2: 3, 3: 2 },
                6: { 1: 4, 2: 3, 3: 3 },
                7: { 1: 4, 2: 3, 3: 3, 4: 1 },
                8: { 1: 4, 2: 3, 3: 3, 4: 2 },
                9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
                11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
                18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
            },
            cantripsKnown: {
                1: 4, 4: 5, 10: 6,
            },
            spellsKnownType: 'known',
            spellsKnownNote: 'You know a limited number of sorcerer spells, learning more as you gain levels. You know 2 spells at 1st level, and learn additional spells as shown in the Sorcerer table.',
        },
        
        multiclassing: {
            prerequisites: [{ ability: 'cha', minimumScore: 13 }],
            proficienciesGained: [],
        },
        
        resources: [
            {
                name: 'Sorcery Points',
                type: 'long',
                uses: { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20 },
                description: 'You have sorcery points equal to your sorcerer level. You can use them to fuel Metamagic and other sorcerous abilities. You regain all spent sorcery points when you finish a long rest.',
            },
        ],
        
        subclass_level: 1,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/sorcerer',
        
        features: {
            1: [
                {
                    name: 'Spellcasting',
                    level: 1,
                    description: 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells. Charisma is your spellcasting ability. You can use an arcane focus as a spellcasting focus.',
                    actionType: 'special',
                },
                {
                    name: 'Sorcerous Origin',
                    level: 1,
                    description: 'Choose a sorcerous origin, which describes the source of your innate magical power. Your choice grants you features when you choose it at 1st level and again at 6th, 14th, and 18th level.',
                    actionType: 'special',
                },
            ],
            2: [
                {
                    name: 'Font of Magic',
                    level: 2,
                    description: 'You tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects. You have 2 sorcery points, and you gain more as you reach higher levels. You can use sorcery points to: Create spell slots (spend points equal to slot level), Convert spell slots to sorcery points (bonus action, gain points equal to slot level).',
                    actionType: 'special',
                },
            ],
            3: [
                {
                    name: 'Metamagic',
                    level: 3,
                    description: 'You gain the ability to twist your spells to suit your needs. You learn two Metamagic options of your choice (from: Careful Spell, Distant Spell, Empowered Spell, Extended Spell, Heightened Spell, Quickened Spell, Subtle Spell, Twinned Spell, etc.). You can use only one Metamagic option on a spell when you cast it, unless otherwise noted. You gain another Metamagic option at 10th and 17th level.',
                    actionType: 'special',
                    scaling: 'Metamagic options known: 2 (3rd), 3 (10th), 4 (17th)',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Metamagic (Additional)',
                    level: 10,
                    description: 'You learn an additional Metamagic option of your choice.',
                    actionType: 'passive',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Metamagic (Additional)',
                    level: 17,
                    description: 'You learn an additional Metamagic option of your choice.',
                    actionType: 'passive',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Sorcerous Restoration',
                    level: 20,
                    description: 'You regain 4 expended sorcery points whenever you finish a short rest.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // WARLOCK
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'warlock',
        name: 'Warlock',
        sourcebook: 'PHB',
        hit_die: 8,
        
        hitPoints: {
            atFirstLevel: '8 + your Constitution modifier',
            atHigherLevels: '1d8 (or 5) + your Constitution modifier per warlock level after 1st',
        },
        
        saving_throws: [
            { index: 'wisdom', name: 'Wisdom' },
            { index: 'charisma', name: 'Charisma' },
        ],
        
        proficiencies: [
            { index: 'light-armor', name: 'Light Armor', type: 'Armor' },
            { index: 'simple-weapons', name: 'Simple Weapons', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'arcana', name: 'Arcana' },
                        { index: 'deception', name: 'Deception' },
                        { index: 'history', name: 'History' },
                        { index: 'intimidation', name: 'Intimidation' },
                        { index: 'investigation', name: 'Investigation' },
                        { index: 'nature', name: 'Nature' },
                        { index: 'religion', name: 'Religion' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A light crossbow and 20 bolts or any simple weapon', quantity: 1 },
            { item: 'A component pouch or an arcane focus', quantity: 1 },
            { item: 'A scholar\'s pack or a dungeoneer\'s pack', quantity: 1 },
            { item: 'Leather armor, any simple weapon, and two daggers', quantity: 1 },
        ],
        
        spellcasting: {
            level: 1,
            spellcastingAbility: 'cha',
            progression: 'pact', // Pact Magic (unique to Warlock)
            pactMagicSlots: {
                1: { slots: 1, level: 1 },
                2: { slots: 2, level: 1 },
                3: { slots: 2, level: 2 },
                5: { slots: 2, level: 3 },
                7: { slots: 2, level: 4 },
                9: { slots: 2, level: 5 },
                11: { slots: 3, level: 5 },
                17: { slots: 4, level: 5 },
            },
            cantripsKnown: {
                1: 2, 4: 3, 10: 4,
            },
            spellsKnownType: 'known',
            spellsKnownNote: 'You know a limited number of warlock spells, learning more as you gain levels. Unlike other spellcasters, you regain all expended spell slots when you finish a short or long rest. All spell slots are of the same level.',
        },
        
        multiclassing: {
            prerequisites: [{ ability: 'cha', minimumScore: 13 }],
            proficienciesGained: ['light-armor', 'simple-weapons'],
        },
        
        subclass_level: 1,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/warlock',
        
        features: {
            1: [
                {
                    name: 'Otherworldly Patron',
                    level: 1,
                    description: 'You have struck a bargain with an otherworldly being chosen from: The Archfey, The Fiend, The Great Old One, The Celestial, The Hexblade, The Undying, The Genie, or The Fathomless. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.',
                    actionType: 'special',
                },
                {
                    name: 'Pact Magic',
                    level: 1,
                    description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells. You know two cantrips of your choice from the warlock spell list. You know two 1st-level spells of your choice from the warlock spell list. Unlike other spellcasters, you regain all expended Pact Magic spell slots when you finish a short or long rest. The Pact Magic feature lets you cast warlock spells. Charisma is your spellcasting ability. You can use an arcane focus as a spellcasting focus.',
                    actionType: 'special',
                },
            ],
            2: [
                {
                    name: 'Eldritch Invocations',
                    level: 2,
                    description: 'In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability. You gain two invocations of your choice. A level prerequisite refers to your warlock level. When you gain certain warlock levels, you gain additional invocations: 5th (3 invocations), 7th (4), 9th (5), 12th (6), 15th (7), 18th (8). Additionally, when you gain a level in this class, you can choose one of the invocations you know and replace it with another invocation that you could learn at that level.',
                    actionType: 'special',
                    scaling: 'Invocations known: 2 (2nd), 3 (5th), 4 (7th), 5 (9th), 6 (12th), 7 (15th), 8 (18th)',
                },
            ],
            3: [
                {
                    name: 'Pact Boon',
                    level: 3,
                    description: 'Your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features: Pact of the Chain (familiar), Pact of the Blade (summon weapon), Pact of the Tome (Book of Shadows with cantrips), or Pact of the Talisman (protective amulet).',
                    actionType: 'special',
                    choices: ['Pact of the Chain', 'Pact of the Blade', 'Pact of the Tome', 'Pact of the Talisman'],
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            11: [
                {
                    name: 'Mystic Arcanum (6th level)',
                    level: 11,
                    description: 'Your patron bestows upon you a magical secret called an arcanum. Choose one 6th-level spell from the warlock spell list as this arcanum. You can cast your arcanum spell once without expending a spell slot. You must finish a long rest before you can do so again. At higher levels, you gain more arcanum spells: 7th level spell (13th level), 8th level spell (15th level), and 9th level spell (17th level).',
                    actionType: 'special',
                    scaling: 'Arcanum: 6th (11th), 7th (13th), 8th (15th), 9th (17th)',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Mystic Arcanum (7th level)',
                    level: 13,
                    description: 'You can choose one 7th-level spell from the warlock spell list as your arcanum. You can cast it once without expending a spell slot, and must finish a long rest before you can do so again.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Mystic Arcanum (8th level)',
                    level: 15,
                    description: 'You can choose one 8th-level spell from the warlock spell list as your arcanum. You can cast it once without expending a spell slot, and must finish a long rest before you can do so again.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Mystic Arcanum (9th level)',
                    level: 17,
                    description: 'You can choose one 9th-level spell from the warlock spell list as your arcanum. You can cast it once without expending a spell slot, and must finish a long rest before you can do so again.',
                    actionType: 'special',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Eldritch Master',
                    level: 20,
                    description: 'You can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended Pact Magic spell slots. Once you regain spell slots with this feature, you must finish a long rest before you can do so again.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════
    // WIZARD
    // ═══════════════════════════════════════════════════════════
    
    {
        index: 'wizard',
        name: 'Wizard',
        sourcebook: 'PHB',
        hit_die: 6,
        
        hitPoints: {
            atFirstLevel: '6 + your Constitution modifier',
            atHigherLevels: '1d6 (or 4) + your Constitution modifier per wizard level after 1st',
        },
        
        saving_throws: [
            { index: 'intelligence', name: 'Intelligence' },
            { index: 'wisdom', name: 'Wisdom' },
        ],
        
        proficiencies: [
            { index: 'daggers', name: 'Daggers', type: 'Weapons' },
            { index: 'darts', name: 'Darts', type: 'Weapons' },
            { index: 'slings', name: 'Slings', type: 'Weapons' },
            { index: 'quarterstaffs', name: 'Quarterstaffs', type: 'Weapons' },
            { index: 'light-crossbows', name: 'Light Crossbows', type: 'Weapons' },
        ],
        
        proficiency_choices: [
            {
                desc: 'Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion',
                choose: 2,
                type: 'proficiencies',
                from: {
                    options: [
                        { index: 'arcana', name: 'Arcana' },
                        { index: 'history', name: 'History' },
                        { index: 'insight', name: 'Insight' },
                        { index: 'investigation', name: 'Investigation' },
                        { index: 'medicine', name: 'Medicine' },
                        { index: 'religion', name: 'Religion' },
                    ],
                },
            },
        ],
        
        starting_equipment: [
            { item: 'A quarterstaff or a dagger', quantity: 1 },
            { item: 'A component pouch or an arcane focus', quantity: 1 },
            { item: 'A scholar\'s pack or an explorer\'s pack', quantity: 1 },
            { item: 'A spellbook', quantity: 1 },
        ],
        
        spellcasting: {
            level: 1,
            spellcastingAbility: 'int',
            progression: 'full', // Full caster
            spellSlots: {
                1: { 1: 2 },
                2: { 1: 3 },
                3: { 1: 4, 2: 2 },
                4: { 1: 4, 2: 3 },
                5: { 1: 4, 2: 3, 3: 2 },
                6: { 1: 4, 2: 3, 3: 3 },
                7: { 1: 4, 2: 3, 3: 3, 4: 1 },
                8: { 1: 4, 2: 3, 3: 3, 4: 2 },
                9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
                11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
                13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
                15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
                17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
                18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
            },
            cantripsKnown: {
                1: 3, 4: 4, 10: 5,
            },
            spellsKnownType: 'spellbook',
            spellsKnownNote: 'You have a spellbook containing six 1st-level wizard spells of your choice. You can copy wizard spells you find into your spellbook. You prepare a number of spells equal to your Intelligence modifier + your wizard level (minimum of one spell).',
        },
        
        multiclassing: {
            prerequisites: [{ ability: 'int', minimumScore: 13 }],
            proficienciesGained: [],
        },
        
        subclass_level: 2,
        asi_levels: [4, 8, 12, 16, 19],
        url: '/classes/wizard',
        
        features: {
            1: [
                {
                    name: 'Spellcasting',
                    level: 1,
                    description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power. At 1st level, you have a spellbook containing six 1st-level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind. The spells that you add to your spellbook as you gain levels reflect the arcane research you conduct on your own. You might find other spells during your adventures, which you can add to your spellbook. Intelligence is your spellcasting ability. You can use an arcane focus as a spellcasting focus. You can cast wizard spells as rituals if they have the ritual tag and are in your spellbook.',
                    actionType: 'special',
                },
                {
                    name: 'Arcane Recovery',
                    level: 1,
                    description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher. For example, if you\'re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'special',
                },
            ],
            2: [
                {
                    name: 'Arcane Tradition',
                    level: 2,
                    description: 'You choose an arcane tradition, shaping your practice of magic through one of the following schools: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation, or others. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.',
                    actionType: 'special',
                },
            ],
            3: [
                {
                    name: 'Cantrip Formulas (Optional)',
                    level: 3,
                    description: 'You have scribed a set of arcane formulas in your spellbook that you can use to formulate a cantrip in your mind. Whenever you finish a long rest and consult those formulas in your spellbook, you can replace one wizard cantrip you know with another cantrip from the wizard spell list.',
                    actionType: 'special',
                },
            ],
            4: [
                {
                    name: 'Ability Score Improvement',
                    level: 4,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Ability Score Improvement',
                    level: 8,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            12: [
                {
                    name: 'Ability Score Improvement',
                    level: 12,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            16: [
                {
                    name: 'Ability Score Improvement',
                    level: 16,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Spell Mastery',
                    level: 18,
                    description: 'You have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared. If you want to cast either spell at a higher level, you must expend a spell slot as normal. By spending 8 hours in study, you can exchange one or both of the spells you chose for different spells of the same levels.',
                    actionType: 'special',
                },
            ],
            19: [
                {
                    name: 'Ability Score Improvement',
                    level: 19,
                    description: 'You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. Alternatively, you can take a feat.',
                    actionType: 'special',
                },
            ],
            20: [
                {
                    name: 'Signature Spells',
                    level: 20,
                    description: 'You gain mastery over two powerful spells and can cast them with little effort. Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don\'t count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot. When you do so, you can\'t do so again until you finish a short or long rest. If you want to cast either spell at a higher level, you must expend a spell slot as normal.',
                    actionType: 'special',
                },
            ],
        },
    },
];

export default CLASSES_COMPLETE;
