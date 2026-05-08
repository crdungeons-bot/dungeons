/**
 * Comprehensive D&D 5e Feats with structured data
 */

export type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type FeatStatBonus = {
    type: 'fixed';     // Fixed stat increase
    stat: StatKey;
    amount: number;
} | {
    type: 'choice';    // Player chooses one stat from options
    options: StatKey[];
    amount: number;
};

export type FeatEntry = {
    name: string;
    prerequisite: string | null;
    benefit: string;
    statBonus?: FeatStatBonus;  // Optional stat increase
    proficiencies?: string[];    // Skills, tools, weapons, etc.
    languages?: number;          // Number of languages to learn
};

export const FEATS: FeatEntry[] = [
    {
        name: 'Alert',
        prerequisite: null,
        benefit: '+5 to initiative. Cannot be surprised while conscious. Enemies gain no benefit from being hidden when attacking you.',
    },
    {
        name: 'Athlete',
        prerequisite: null,
        benefit: 'Climbing costs no extra movement. Standing up costs only 5 ft of movement. Running long jump only needs 5 ft run-up.',
        statBonus: { type: 'choice', options: ['str', 'dex'], amount: 1 },
    },
    {
        name: 'Actor',
        prerequisite: null,
        benefit: 'Advantage on Deception and Performance when trying to pass as someone else. Can mimic speech or sounds you\'ve heard.',
        statBonus: { type: 'fixed', stat: 'cha', amount: 1 },
    },
    {
        name: 'Charger',
        prerequisite: null,
        benefit: 'After Dash action, bonus action melee attack (+5 dmg) or shove up to 10 ft.',
    },
    {
        name: 'Dual Wielder',
        prerequisite: null,
        benefit: '+1 AC while dual wielding. Can dual-wield non-Light weapons. Can draw/stow two weapons at once.',
    },
    {
        name: 'Durable',
        prerequisite: null,
        benefit: 'Minimum roll when spending Hit Dice equals twice your CON modifier (min 2).',
        statBonus: { type: 'fixed', stat: 'con', amount: 1 },
    },
    {
        name: 'Elemental Adept',
        prerequisite: 'Spellcasting',
        benefit: 'Spells of chosen damage type ignore resistance. Treat 1s on damage dice as 2s.',
    },
    {
        name: 'Grappler',
        prerequisite: 'STR 13+',
        benefit: 'Advantage on attack rolls against creatures you\'ve grappled. Can pin a grappled creature (both restrained).',
    },
    {
        name: 'Great Weapon Master',
        prerequisite: null,
        benefit: 'Heavy weapon crit or kill → bonus action attack. Take -5 attack for +10 damage.',
    },
    {
        name: 'Healer',
        prerequisite: null,
        benefit: 'Stabilize at 1 HP with healer\'s kit. Use healer\'s kit to heal 1d6+4+max-HD HP (once per creature per short rest).',
    },
    {
        name: 'Keen Mind',
        prerequisite: null,
        benefit: 'Always know N/S/E/W and hours to sunset/sunrise. Perfect memory for past month.',
        statBonus: { type: 'fixed', stat: 'int', amount: 1 },
    },
    {
        name: 'Linguist',
        prerequisite: null,
        benefit: 'Learn 3 languages. Can create written ciphers.',
        statBonus: { type: 'fixed', stat: 'int', amount: 1 },
        languages: 3,
    },
    {
        name: 'Lucky',
        prerequisite: null,
        benefit: '3 luck points per long rest. Spend to reroll attack/ability/saving throw, pick either result.',
    },
    {
        name: 'Mage Slayer',
        prerequisite: null,
        benefit: 'Reaction attack when adjacent creature casts. Disadvantage on concentration saves from your damage. Advantage vs spells while within 5 ft of caster.',
    },
    {
        name: 'Magic Initiate',
        prerequisite: null,
        benefit: 'Learn 2 cantrips and 1 1st-level spell (cast once per long rest without slot) from one class list.',
    },
    {
        name: 'Mounted Combatant',
        prerequisite: null,
        benefit: 'Advantage vs unmounted creatures smaller than mount. Force attacks targeting mount to target you. Mount auto-succeeds DEX saves vs area effects (half dmg on fail = none; fail = half).',
    },
    {
        name: 'Observant',
        prerequisite: null,
        benefit: 'If you see lips move, can lip-read. +5 to passive Perception and Insight.',
        statBonus: { type: 'choice', options: ['int', 'wis'], amount: 1 },
    },
    {
        name: 'Polearm Master',
        prerequisite: null,
        benefit: 'Bonus action attack with polearm butt (1d4). Reaction attack when creature enters your reach.',
    },
    {
        name: 'Resilient',
        prerequisite: null,
        benefit: 'Proficiency in saving throws with chosen ability.',
        statBonus: { type: 'choice', options: ['str', 'dex', 'con', 'int', 'wis', 'cha'], amount: 1 },
    },
    {
        name: 'Ritual Caster',
        prerequisite: 'INT or WIS 13+',
        benefit: 'Choose a class. Learn 2 rituals from that class. Can learn more rituals from spellbooks. Cast rituals as rituals only.',
    },
    {
        name: 'Savage Attacker',
        prerequisite: null,
        benefit: 'Once per turn reroll melee damage dice and use either result.',
    },
    {
        name: 'Sentinel',
        prerequisite: null,
        benefit: 'Opportunity attacks stop movement. Opportunity attacks on Disengage. Reaction attack when adjacent ally is attacked.',
    },
    {
        name: 'Sharpshooter',
        prerequisite: null,
        benefit: 'No disadvantage at long range. Ignore half/three-quarters cover. -5 attack for +10 damage.',
    },
    {
        name: 'Shield Master',
        prerequisite: null,
        benefit: 'Bonus action shove when you attack. Add shield AC to DEX save vs single-target spell. No damage on successful save (instead of half).',
    },
    {
        name: 'Skilled',
        prerequisite: null,
        benefit: 'Proficiency in any 3 skills or tools.',
        proficiencies: [], // Player chooses 3
    },
    {
        name: 'Skulker',
        prerequisite: 'DEX 13+',
        benefit: 'Can hide when lightly obscured. Missing a ranged attack doesn\'t reveal your location. Dim light doesn\'t impose Perception disadvantage.',
    },
    {
        name: 'Spell Sniper',
        prerequisite: 'Spellcasting',
        benefit: 'Double range of attack-roll spells. Ignore half/three-quarters cover. Learn one attack-roll cantrip.',
    },
    {
        name: 'Tavern Brawler',
        prerequisite: null,
        benefit: 'Improvised weapons and unarmed strikes deal 1d4. Bonus action grapple after unarmed/improvised hit.',
        statBonus: { type: 'choice', options: ['str', 'con'], amount: 1 },
    },
    {
        name: 'Tough',
        prerequisite: null,
        benefit: '+2 HP per level (including current, retroactive).',
    },
    {
        name: 'War Caster',
        prerequisite: 'Spellcasting',
        benefit: 'Advantage on concentration saves. Somatic components with hands full. Cast spell as opportunity attack.',
    },
    {
        name: 'Weapon Master',
        prerequisite: null,
        benefit: 'Proficiency with 4 weapons of your choice.',
        statBonus: { type: 'choice', options: ['str', 'dex'], amount: 1 },
        proficiencies: [], // Player chooses 4 weapons
    },
];
