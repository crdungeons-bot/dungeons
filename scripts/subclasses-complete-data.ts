/**
 * Comprehensive D&D 5e Subclass Data with Full Feature Progressions
 * 
 * This file contains complete subclass definitions including all features by level,
 * expanded spell lists, proficiencies, resources, and mechanical details.
 * 
 * Sources: PHB, XGtE, TCoE, SCAG, Eberron, Fizban's, and all official sourcebooks
 * 
 * NOTE: This is the definitive source for subclass data. Data will be seeded into
 * the MongoDB `dnd-resources.subclasses` collection.
 */

import type { SubclassComplete } from '../types/subclass';

export const SUBCLASSES_COMPLETE: SubclassComplete[] = [
    
    // ═══════════════════════════════════════════════════════════════════
    // ARTIFICER SUBCLASSES
    // ═══════════════════════════════════════════════════════════════════
    
    {
        name: 'Alchemist',
        description: 'An Alchemist is an expert at combining reagents to produce mystical effects. Alchemists use their creations to give life and to leech it away. Alchemy is the oldest of artificer traditions, and its versatility has long been valued during times of war and peace.',
        class: 'artificer',
        subclass_level: 3,
        sourcebook: 'ERLW',
        
        // Expanded spell list for Alchemist
        spells: {
            3: ['Healing Word', 'Ray of Sickness'],
            5: ['Flaming Sphere', 'Melf\'s Acid Arrow'],
            9: ['Gaseous Form', 'Mass Healing Word'],
            13: ['Blight', 'Death Ward'],
            17: ['Cloudkill', 'Raise Dead'],
        },
        
        // Alchemist features by level
        features: {
            3: [
                {
                    name: 'Tool Proficiency',
                    level: 3,
                    description: 'When you adopt this specialization at 3rd level, you gain proficiency with alchemist\'s supplies. If you already have this proficiency, you gain proficiency with one other type of artisan\'s tools of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Alchemist Spells',
                    level: 3,
                    description: 'Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Alchemist Spells table. These spells count as artificer spells for you, but they don\'t count against the number of artificer spells you prepare.',
                    actionType: 'passive',
                },
                {
                    name: 'Experimental Elixir',
                    level: 3,
                    description: 'Beginning at 3rd level, whenever you finish a long rest, you can magically produce an experimental elixir in an empty flask you touch. Roll on the Experimental Elixir table for the elixir\'s effect, which is triggered when someone drinks the elixir. As an action, a creature can drink the elixir or administer it to an incapacitated creature.\n\nCreating an experimental elixir requires you to have alchemist supplies on your person, and any elixir you create with this feature lasts until it is drunk or until the end of your next long rest.\n\nWhen you reach certain levels in this class, you can make more elixirs at the end of a long rest: two at 6th level and three at 15th level. Roll for each elixir\'s effect separately. Each elixir requires its own flask.\n\nYou can create additional experimental elixirs by expending a spell slot of 1st level or higher for each one. When you do so, you use your action to create the elixir in an empty flask you touch, and you choose the elixir\'s effect from the Experimental Elixir table.\n\nExperimental Elixir Table:\n1. Healing: The drinker regains a number of hit points equal to 2d4 + your Intelligence modifier.\n2. Swiftness: The drinker\'s walking speed increases by 10 feet for 1 hour.\n3. Resilience: The drinker gains a +1 bonus to AC for 10 minutes.\n4. Boldness: The drinker can roll a d4 and add the number rolled to every attack roll and saving throw they make for the next minute.\n5. Flight: The drinker gains a flying speed of 10 feet for 10 minutes.\n6. Transformation: The drinker\'s body is transformed as if by the alter self spell. The drinker determines the transformation caused by the spell, the effects of which last for 10 minutes.',
                    actionType: 'special',
                    scaling: 'Number of elixirs increases: 1 at level 3, 2 at level 6, 3 at level 15',
                },
            ],
            5: [
                {
                    name: 'Alchemical Savant',
                    level: 5,
                    description: 'At 5th level, you develop masterful command of magical chemicals, enhancing the healing and damage you create through them. Whenever you cast a spell using your alchemist\'s supplies as the spellcasting focus, you gain a bonus to one roll of the spell. That roll must restore hit points or be a damage roll that deals acid, fire, necrotic, or poison damage, and the bonus equals your Intelligence modifier (minimum of +1).',
                    actionType: 'passive',
                    scaling: 'Bonus equals Intelligence modifier',
                },
            ],
            9: [
                {
                    name: 'Restorative Reagents',
                    level: 9,
                    description: 'Starting at 9th level, you can incorporate restorative reagents into some of your works:\n\n• Whenever a creature drinks an experimental elixir you created, the creature gains temporary hit points equal to 2d6 + your Intelligence modifier (minimum of 1 temporary hit point).\n\n• You can cast lesser restoration without expending a spell slot and without preparing the spell, provided you use alchemist\'s supplies as the spellcasting focus. You can do so a number of times equal to your Intelligence modifier (minimum of once), and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Intelligence modifier (minimum 1) for Lesser Restoration',
                    restType: 'long',
                },
            ],
            15: [
                {
                    name: 'Chemical Mastery',
                    level: 15,
                    description: 'By 15th level, you have been exposed to so many chemicals that they pose little risk to you, and you can use them to quickly end certain ailments:\n\n• You gain resistance to acid damage and poison damage, and you are immune to the poisoned condition.\n\n• You can cast greater restoration and heal without expending a spell slot, without preparing the spell, and without material components, provided you use alchemist\'s supplies as the spellcasting focus. Once you cast either spell with this feature, you can\'t cast that spell with it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1 use of Greater Restoration and 1 use of Heal per long rest',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Armorer',
        description: 'An artificer who specializes as an Armorer modifies armor to function almost like a second skin. The armor is enhanced to hone the artificer\'s magic, unleash potent attacks, and generate a formidable defense. The artificer bonds with this armor, becoming one with it even as they experiment with it and refine its magical capabilities.',
        class: 'artificer',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        // Armorer proficiencies
        proficiencies: {
            armor: ['heavy-armor'],
            tools: ['smith\'s-tools'],
        },
        
        // Expanded spell list for Armorer
        spells: {
            3: ['Magic Missile', 'Thunderwave'],
            5: ['Mirror Image', 'Shatter'],
            9: ['Hypnotic Pattern', 'Lightning Bolt'],
            13: ['Fire Shield', 'Greater Invisibility'],
            17: ['Passwall', 'Wall of Force'],
        },
        
        // Armorer features by level
        features: {
            3: [
                {
                    name: 'Tools of the Trade',
                    level: 3,
                    description: 'When you adopt this specialization at 3rd level, you gain proficiency with heavy armor. You also gain proficiency with smith\'s tools. If you already have this tool proficiency, you gain proficiency with one other type of artisan\'s tools of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Armorer Spells',
                    level: 3,
                    description: 'Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Armorer Spells table. These spells count as artificer spells for you, but they don\'t count against the number of artificer spells you prepare.',
                    actionType: 'passive',
                },
                {
                    name: 'Arcane Armor',
                    level: 3,
                    description: 'Beginning at 3rd level, your metallurgical pursuits have led to you making armor a conduit for your magic. As an action, you can turn a suit of armor you are wearing into Arcane Armor, provided you have smith\'s tools in hand.\n\nYou gain the following benefits while wearing this armor:\n\n• If the armor normally has a Strength requirement, the arcane armor lacks this requirement for you.\n• You can use the arcane armor as a spellcasting focus for your artificer spells.\n• The armor attaches to you and can\'t be removed against your will. It also expands to cover your entire body, although you can retract or deploy the helmet as a bonus action. The armor replaces any missing limbs, functioning identically to a body part it is replacing.\n• You can doff or don the armor as an action.\n\nThe armor continues to be Arcane Armor until you don another suit of armor or you die.',
                    actionType: 'action',
                },
                {
                    name: 'Armor Model',
                    level: 3,
                    description: 'Beginning at 3rd level, you can customize your Arcane Armor. When you do so, choose one of the following armor models: Guardian or Infiltrator. The model you choose gives you special benefits while you wear it.\n\nEach model includes a special weapon. When you attack with that weapon, you can add your Intelligence modifier, instead of Strength or Dexterity, to the attack and damage rolls.\n\nYou can change the armor\'s model whenever you finish a short or long rest, provided you have smith\'s tools in hand.\n\n**Guardian.** You design your armor to be in the front line of conflict. It has the following features:\n• Thunder Gauntlets: Each of the armor\'s gauntlets counts as a simple melee weapon while you aren\'t holding anything in it, and it deals 1d8 thunder damage on a hit. A creature hit by the gauntlet has disadvantage on attack rolls against targets other than you until the start of your next turn, as the armor magically emits a distracting pulse when the creature attacks someone else.\n• Defensive Field: As a bonus action, you can gain temporary hit points equal to your level in this class, replacing any temporary hit points you already have. You lose these temporary hit points if you doff the armor. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n\n**Infiltrator.** You customize your armor for subtle undertakings. It has the following features:\n• Lightning Launcher: A gemlike node appears on one of your armored fists or on the chest (your choice). It counts as a simple ranged weapon, with a normal range of 90 feet and a long range of 300 feet, and it deals 1d6 lightning damage on a hit. Once on each of your turns when you hit a creature with it, you can deal an extra 1d6 lightning damage to that target.\n• Powered Steps: Your walking speed increases by 5 feet.\n• Dampening Field: You have advantage on Dexterity (Stealth) checks. If the armor normally imposes disadvantage on such checks, the advantage and disadvantage cancel each other, as normal.',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Guardian', 'Infiltrator'],
                    damage: {
                        dice: '1d8 (Guardian) or 1d6 (Infiltrator)',
                        type: 'thunder or lightning',
                    },
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'Starting at 5th level, you can attack twice, rather than once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            9: [
                {
                    name: 'Armor Modifications',
                    level: 9,
                    description: 'At 9th level, you learn how to use your artificer infusions to specially modify your Arcane Armor. That armor now counts as separate items for the purposes of your Infuse Items feature: armor (the chest piece), boots, helmet, and the armor\'s special weapon. Each of those items can bear one of your infusions, and the infusions transfer over if you change your armor\'s model with the Armor Model feature. In addition, the maximum number of items you can infuse at once increases by 2, but those extra items must be part of your Arcane Armor.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Perfected Armor',
                    level: 15,
                    description: 'At 15th level, your Arcane Armor gains additional benefits based on its model, as shown below.\n\n**Guardian.** When a Huge or smaller creature you can see ends its turn within 30 feet of you, you can use your reaction to magically force the creature to make a Strength saving throw against your spell save DC, pulling the creature up to 30 feet toward you to an unoccupied space. If you pull the target to a space within 5 feet of you, you can make a melee weapon attack against it as part of this reaction.\n\nYou can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest.\n\n**Infiltrator.** Any creature that takes lightning damage from your Lightning Launcher glimmers with magical light until the start of your next turn. The glimmering creature sheds dim light in a 5-foot radius, and it has disadvantage on attack rolls against you, as the light jolts it if it attacks you. In addition, the next attack roll against it has advantage, and if that attack hits, the target takes an extra 1d6 lightning damage.',
                    actionType: 'special',
                    usesPerRest: 'Proficiency bonus (Guardian only)',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Artillerist',
        description: 'An Artillerist specializes in using magic to hurl energy, projectiles, and explosions on a battlefield. This destructive power was valued by all the armies of the Last War. Now that the war is over, some members of this specialization have sought to build a more peaceful world by using their powers to protect and defend others.',
        class: 'artificer',
        subclass_level: 3,
        sourcebook: 'ERLW',
        
        // Expanded spell list for Artillerist
        spells: {
            3: ['Shield', 'Thunderwave'],
            5: ['Scorching Ray', 'Shatter'],
            9: ['Fireball', 'Wind Wall'],
            13: ['Ice Storm', 'Wall of Fire'],
            17: ['Cone of Cold', 'Wall of Force'],
        },
        
        // Artillerist features by level
        features: {
            3: [
                {
                    name: 'Tool Proficiency',
                    level: 3,
                    description: 'When you adopt this specialization at 3rd level, you gain proficiency with woodcarver\'s tools. If you already have this proficiency, you gain proficiency with one other type of artisan\'s tools of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Artillerist Spells',
                    level: 3,
                    description: 'Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Artillerist Spells table. These spells count as artificer spells for you, but they don\'t count against the number of artificer spells you prepare.',
                    actionType: 'passive',
                },
                {
                    name: 'Eldritch Cannon',
                    level: 3,
                    description: 'At 3rd level, you learn how to create a magical cannon. Using woodcarver\'s tools or smith\'s tools, you can take an action to magically create a Small or Tiny eldritch cannon in an unoccupied space on a horizontal surface within 5 feet of you. A Small eldritch cannon occupies its space, and a Tiny one can be held in one hand.\n\nOnce you create a cannon, you can\'t do so again until you finish a long rest or until you expend a spell slot of 1st level or higher. You can have only one cannon at a time and can\'t create one while your cannon is present.\n\nThe cannon is a magical object. Regardless of size, the cannon has an AC of 18 and a number of hit points equal to five times your artificer level. It is immune to poison damage and psychic damage. If it is forced to make an ability check or a saving throw, treat all its ability scores as 10 (+0). If the mending spell is cast on it, it regains 2d6 hit points. It disappears if it is reduced to 0 hit points or after 1 hour. You can dismiss it early as an action.\n\nWhen you create the cannon, you determine its appearance and whether it has legs. You also decide which type it is, choosing from the options on the Eldritch Cannons table. On each of your turns, you can take a bonus action to cause the cannon to activate if you are within 60 feet of it. As part of the same bonus action, you can direct the cannon to walk or climb up to 15 feet to an unoccupied space, provided it has legs.\n\n**Eldritch Cannon Types:**\n• Flamethrower: The cannon exhales fire in an adjacent 15-foot cone that you designate. Each creature in that area must make a Dexterity saving throw against your spell save DC, taking 2d8 fire damage on a failed save or half as much damage on a successful one. The fire ignites any flammable objects in the area that aren\'t being worn or carried.\n• Force Ballista: Make a ranged spell attack, originating from the cannon, at one creature or object within 120 feet of it. On a hit, the target takes 2d8 force damage, and if the target is a creature, it is pushed up to 5 feet away from the cannon.\n• Protector: The cannon emits a burst of positive energy that grants itself and each creature of your choice within 10 feet of it a number of temporary hit points equal to 1d8 + your Intelligence modifier (minimum of +1).',
                    actionType: 'special',
                    usesPerRest: '1 per long rest, or expend spell slot',
                    restType: 'long',
                    scaling: 'Damage increases to 3d8 at 9th level',
                    damage: {
                        dice: '2d8 (3d8 at 9th level)',
                        type: 'fire, force, or healing',
                    },
                },
            ],
            5: [
                {
                    name: 'Arcane Firearm',
                    level: 5,
                    description: 'At 5th level, you know how to turn a wand, staff, or rod into an arcane firearm, a conduit for your destructive spells. When you finish a long rest, you can use woodcarver\'s tools to carve special sigils into a wand, staff, or rod and thereby turn it into your arcane firearm. The sigils disappear from the object if you later carve them on a different item. The sigils otherwise last indefinitely.\n\nYou can use your arcane firearm as a spellcasting focus for your artificer spells. When you cast an artificer spell through the firearm, roll a d8, and you gain a bonus to one of the spell\'s damage rolls equal to the number rolled.',
                    actionType: 'passive',
                    damage: {
                        dice: '+1d8',
                        type: 'bonus to spell damage',
                    },
                },
            ],
            9: [
                {
                    name: 'Explosive Cannon',
                    level: 9,
                    description: 'Starting at 9th level, every eldritch cannon you create is more destructive:\n\n• The cannon\'s damage rolls all increase by 1d8.\n• As an action, you can command the cannon to detonate if you are within 60 feet of it. Doing so destroys the cannon and forces each creature within 20 feet of it to make a Dexterity saving throw against your spell save DC, taking 3d8 force damage on a failed save or half as much damage on a successful one.',
                    actionType: 'special',
                    scaling: 'Cannon damage increases by 1d8',
                    damage: {
                        dice: '3d8',
                        type: 'force (on detonation)',
                    },
                },
            ],
            15: [
                {
                    name: 'Fortified Position',
                    level: 15,
                    description: 'By 15th level, you\'re a master at forming well-defended emplacements using Eldritch Cannon:\n\n• You and your allies have half cover while within 10 feet of a cannon you create with Eldritch Cannon, as a result of a shimmering field of magical protection that the cannon emits.\n• You can now have two cannons at the same time. You can create two with the same action (but not the same spell slot), and you can activate both of them with the same bonus action. You determine whether the cannons are identical to each other or different. You can\'t create a third cannon while you have two.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Battle Smith',
        description: 'Armies require protection, and someone has to put things back together if defenses fail. A combination of protector and medic, a Battle Smith is an expert at defending others and repairing both material and personnel. Among artificers, Battle Smiths are unmatched in their ability to fight in melee combat, using their mechanical companion to defend their allies.',
        class: 'artificer',
        subclass_level: 3,
        sourcebook: 'ERLW',
        
        // Battle Smith proficiencies
        proficiencies: {
            weapons: ['martial-weapons'],
        },
        
        // Expanded spell list for Battle Smith
        spells: {
            3: ['Heroism', 'Shield'],
            5: ['Branding Smite', 'Warding Bond'],
            9: ['Aura of Vitality', 'Conjure Barrage'],
            13: ['Aura of Purity', 'Fire Shield'],
            17: ['Banishing Smite', 'Mass Cure Wounds'],
        },
        
        // Battle Smith features by level
        features: {
            3: [
                {
                    name: 'Tool Proficiency',
                    level: 3,
                    description: 'When you adopt this specialization at 3rd level, you gain proficiency with smith\'s tools. If you already have this proficiency, you gain proficiency with one other type of artisan\'s tools of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Battle Smith Spells',
                    level: 3,
                    description: 'Starting at 3rd level, you always have certain spells prepared after you reach particular levels in this class, as shown in the Battle Smith Spells table. These spells count as artificer spells for you, but they don\'t count against the number of artificer spells you prepare.',
                    actionType: 'passive',
                },
                {
                    name: 'Battle Ready',
                    level: 3,
                    description: 'When you reach 3rd level, your combat training and your experiments with magic have paid off in two ways:\n\n• You gain proficiency with martial weapons.\n• When you attack with a magic weapon, you can use your Intelligence modifier, instead of Strength or Dexterity modifier, for the attack and damage rolls.',
                    actionType: 'passive',
                },
                {
                    name: 'Steel Defender',
                    level: 3,
                    description: 'By 3rd level, your tinkering has borne you a faithful companion, a steel defender. It is friendly to you and your companions, and it obeys your commands. See this creature\'s game statistics in the steel defender stat block. You determine the creature\'s appearance and whether it has two legs or four; your choice has no effect on its game statistics.\n\nIn combat, the steel defender shares your initiative count, but it takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. That action can be one in its stat block or some other action. If you are incapacitated, the defender can take any action of its choice, not just Dodge.\n\nIf the mending spell is cast on it, it regains 2d6 hit points. If it has died within the last hour, you can use your smith\'s tools as an action to revive it, provided you are within 5 feet of it and you expend a spell slot of 1st level or higher. The steel defender returns to life after 1 minute with all its hit points restored.\n\nAt the end of a long rest, you can create a new steel defender if you have your smith\'s tools with you. If you already have a steel defender from this feature, the first one immediately perishes. The defender also perishes if you die.',
                    actionType: 'bonus action',
                },
            ],
            5: [
                {
                    name: 'Extra Attack',
                    level: 5,
                    description: 'Starting at 5th level, you can attack twice, rather than once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            9: [
                {
                    name: 'Arcane Jolt',
                    level: 9,
                    description: 'At 9th level, you learn new ways to channel arcane energy to harm or heal. When either you hit a target with a magic weapon attack or your steel defender hits a target, you can channel magical energy through the strike to create one of the following effects:\n\n• The target takes an extra 2d6 force damage.\n• Choose one creature or object you can see within 30 feet of the target. Healing energy flows into the chosen recipient, restoring 2d6 hit points to it.\n\nYou can use this energy a number of times equal to your Intelligence modifier (minimum of once), but you can do so no more than once on a turn. You regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Intelligence modifier (minimum 1)',
                    restType: 'long',
                    damage: {
                        dice: '2d6',
                        type: 'force or healing',
                    },
                },
            ],
            15: [
                {
                    name: 'Improved Defender',
                    level: 15,
                    description: 'At 15th level, your Arcane Jolt and steel defender become more powerful:\n\n• The extra damage and the healing of your Arcane Jolt both increase to 4d6.\n• Your steel defender gains a +2 bonus to Armor Class.\n• Whenever your steel defender uses its Deflect Attack, the attacker takes force damage equal to 1d4 + your Intelligence modifier.',
                    actionType: 'passive',
                    damage: {
                        dice: '4d6 (Arcane Jolt), 1d4 + Int (Deflect Attack)',
                        type: 'force or healing',
                    },
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // BARBARIAN SUBCLASSES
    // ═══════════════════════════════════════════════════════════════════
    
    {
        name: 'Path of the Ancestral Guardian',
        description: 'Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living. When a barbarian who follows this path rages, the barbarian contacts the spirit world and calls on these guardian spirits for aid.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Ancestral Protectors',
                    level: 3,
                    description: 'Spectral warriors appear when you enter your rage. While you\'re raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn\'t against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack. The effect on the target ends early if your rage ends.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Spirit Shield',
                    level: 6,
                    description: 'The guardian spirits that aid you can provide supernatural protection to those you defend. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6. When you reach certain levels in this class, you can reduce the damage by more: by 3d6 at 10th level and by 4d6 at 14th level.',
                    actionType: 'reaction',
                    scaling: '2d6 at level 6, 3d6 at level 10, 4d6 at level 14',
                    damage: {
                        dice: '2d6/3d6/4d6',
                        type: 'damage reduction',
                        scaling: 'Improves at levels 10 and 14',
                    },
                },
            ],
            10: [
                {
                    name: 'Consult the Spirits',
                    level: 10,
                    description: 'You gain the ability to consult with your ancestral spirits. When you do so, you cast the augury or clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location. Wisdom is your spellcasting ability for these spells. After you cast either spell in this way, you can\'t use this feature again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                    spellReference: 'Augury, Clairvoyance',
                },
            ],
            14: [
                {
                    name: 'Vengeful Ancestors',
                    level: 14,
                    description: 'Your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes an amount of force damage equal to the damage that your Spirit Shield prevents.',
                    actionType: 'passive',
                    damage: {
                        dice: 'Equal to Spirit Shield (2d6/3d6/4d6)',
                        type: 'force',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Path of the Berserker',
        description: 'For some barbarians, rage is a means to an end—that end being violence. The Path of the Berserker is a path of untrammeled fury, slick with blood. As you enter the berserker\'s rage, you thrill in the chaos of battle, heedless of your own health or well-being.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Frenzy',
                    level: 3,
                    description: 'You can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Mindless Rage',
                    level: 6,
                    description: 'You can\'t be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Intimidating Presence',
                    level: 10,
                    description: 'You can use your action to frighten someone with your menacing presence. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC equal to 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the end of your next turn. On subsequent turns, you can use your action to extend the duration of this effect on the frightened creature until the end of your next turn. This effect ends if the creature ends its turn out of line of sight or more than 60 feet away from you. If the creature succeeds on its saving throw, you can\'t use this feature on that creature again for 24 hours.',
                    actionType: 'action',
                },
            ],
            14: [
                {
                    name: 'Retaliation',
                    level: 14,
                    description: 'When you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    
    {
        name: 'Path of the Battlerager',
        description: 'Known as Kuldjargh (literally "axe idiot") in Dwarvish, battleragers are dwarf followers of the gods of war and take the Path of the Battlerager. They specialize in wearing bulky, spiked armor and throwing themselves into combat, striking with their body itself and giving themselves over to the fury of battle.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'SCAG',
        
        restrictions: {
            race: ['dwarf'],
            other: 'Traditionally restricted to dwarves in Forgotten Realms, but DM may allow other races',
        },
        
        proficiencies: {
            armor: ['spiked-armor'],
        },
        
        features: {
            3: [
                {
                    name: 'Battlerager Armor',
                    level: 3,
                    description: 'You gain the ability to use spiked armor as a weapon. While you are wearing spiked armor and are raging, you can use a bonus action to make one melee weapon attack with your armor spikes against a target within 5 feet of you. If the attack hits, the spikes deal 1d4 piercing damage. You use your Strength modifier for the attack and damage rolls. Additionally, when you use the Attack action to grapple a creature, the target takes 3 piercing damage if your grapple check succeeds.',
                    actionType: 'bonus action',
                    damage: {
                        dice: '1d4',
                        type: 'piercing',
                    },
                },
            ],
            6: [
                {
                    name: 'Reckless Abandon',
                    level: 6,
                    description: 'When you use Reckless Attack while raging, you also gain temporary hit points equal to your Constitution modifier (minimum of 1). They vanish if any of them are left when your rage ends.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Battlerager Charge',
                    level: 10,
                    description: 'You can take the Dash action as a bonus action while you are raging.',
                    actionType: 'bonus action',
                },
            ],
            14: [
                {
                    name: 'Spiked Retribution',
                    level: 14,
                    description: 'When a creature within 5 feet of you hits you with a melee attack, the attacker takes 3 piercing damage if you are raging, aren\'t incapacitated, and are wearing spiked armor.',
                    actionType: 'passive',
                    damage: {
                        dice: '3',
                        type: 'piercing',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Path of the Beast',
        description: 'Barbarians who walk the Path of the Beast draw their rage from a bestial spark burning within their souls. That beast bursts forth in the throes of rage, physically transforming the barbarian. Such a barbarian might be inhabited by a primal spirit or be descended from shape-shifters. You can choose the origin of your feral might or determine it randomly.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        features: {
            3: [
                {
                    name: 'Form of the Beast',
                    level: 3,
                    description: 'When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it, as normal. You choose the weapon\'s form each time you rage:\n\n**Bite.** Your mouth transforms into a bestial muzzle or great mandibles (your choice). It deals 1d8 piercing damage on a hit. Once on each of your turns when you damage a creature with this bite, you regain a number of hit points equal to your proficiency bonus, provided you have less than half your hit points when you hit.\n\n**Claws.** Each of your hands transforms into a claw, which you can use as a weapon if it\'s empty. It deals 1d6 slashing damage on a hit. Once on each of your turns when you attack with a claw using the Attack action, you can make one additional claw attack as part of the same action.\n\n**Tail.** You grow a lashing, spiny tail, which deals 1d8 piercing damage on a hit and has the reach property. If a creature you can see within 10 feet of you hits you with an attack roll, you can use your reaction to swipe your tail and add 1d8 to your AC against that attack, potentially causing the attack to miss you.',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Bite', 'Claws', 'Tail'],
                    damage: {
                        dice: '1d8 (Bite/Tail) or 1d6 (Claws)',
                        type: 'piercing or slashing',
                    },
                },
            ],
            6: [
                {
                    name: 'Bestial Soul',
                    level: 6,
                    description: 'The feral power within you increases, causing the natural weapons of your Form of the Beast to count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. You can also alter your form to help you adapt to your surroundings. When you finish a short or long rest, choose one of the following benefits, which lasts until you finish your next short or long rest:\n\n• You gain a swimming speed equal to your walking speed, and you can breathe underwater.\n• You gain a climbing speed equal to your walking speed, and you can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.\n• When you jump, you can make a Strength (Athletics) check and extend your jump by a number of feet equal to the check\'s total. You can make this special check only once per turn.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Swimming', 'Climbing', 'Jumping'],
                },
            ],
            10: [
                {
                    name: 'Infectious Fury',
                    level: 10,
                    description: 'When you hit a creature with your natural weapons while you are raging, the beast within you can curse your target with rabid fury. The target must succeed on a Wisdom saving throw (DC equal to 8 + your Constitution modifier + your proficiency bonus) or suffer one of the following effects (your choice):\n\n• The target must use its reaction to make a melee attack against another creature of your choice that you can see.\n• The target takes 2d12 psychic damage.\n\nYou can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Proficiency bonus',
                    restType: 'long',
                    providesChoice: true,
                    choices: ['Force Attack', 'Psychic Damage'],
                    damage: {
                        dice: '2d12',
                        type: 'psychic',
                    },
                },
            ],
            14: [
                {
                    name: 'Call the Hunt',
                    level: 14,
                    description: 'The beast within you grows so powerful that you can spread its ferocity to others and gain resilience from them joining your hunt. When you enter your rage, you can choose a number of other willing creatures you can see within 30 feet of you equal to your Constitution modifier (minimum of one creature). You gain 5 temporary hit points for each creature that accepts this feature. Until the rage ends, the chosen creatures can each use the following benefit once on each of their turns: when the creature hits a target with an attack roll and deals damage to it, the creature can roll a d6 and gain a bonus to the damage equal to the number rolled. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Proficiency bonus',
                    restType: 'long',
                    damage: {
                        dice: '+1d6',
                        type: 'bonus damage for allies',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Path of the Giant',
        description: 'Barbarians who walk the Path of the Giant draw strength from the primal forces that are the Giants and their elemental ilk. Their rage bursts forth as they surge with elemental power and grow to enormous size. When an avatar of battle enters a fray, their foes face a giant sunder their ranks.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'BPGotG',
        
        features: {
            3: [
                {
                    name: 'Giant\'s Havoc',
                    level: 3,
                    description: 'Your rages pull strength from the primal might of giants, transforming you into a hulking force of destruction. While raging, you gain the following benefits:\n\n**Crushing Throw.** When you make a successful ranged attack with a thrown weapon using Strength, you can add your Rage Damage bonus to the attack\'s damage roll.\n\n**Giant Stature.** Your reach increases by 5 feet, and if you are smaller than Large, you become Large, along with anything you are wearing. If there isn\'t enough room for you to become Large, your size doesn\'t change.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Elemental Cleaver',
                    level: 6,
                    description: 'Your bond with the elemental might of giants and their ilk grows, and you learn to infuse weapons with primordial energy. When you enter your rage, you can choose one weapon that you are holding and infuse it with one of the following damage types: acid, cold, fire, thunder, or lightning. While you wield the infused weapon during your rage, the weapon\'s damage type changes to the chosen type, it deals an extra 1d6 damage of the chosen type when it hits, and it gains the thrown property, with a normal range of 20 feet and a long range of 60 feet. If you throw the weapon, it reappears in your hand the instant after it hits or misses a target. The infused weapon\'s benefits are suppressed while a creature other than you wields it. While raging and holding the infused weapon, you can use a bonus action to change the infused weapon\'s current damage type to another one from the damage type options above.',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Acid', 'Cold', 'Fire', 'Thunder', 'Lightning'],
                    damage: {
                        dice: '+1d6',
                        type: 'elemental (chosen type)',
                    },
                },
            ],
            10: [
                {
                    name: 'Mighty Impel',
                    level: 10,
                    description: 'Your connection to giant strength now allows you to hurl both allies and enemies on the battlefield. As a bonus action while raging, you can choose one Medium or smaller creature within your reach and move it to an unoccupied space you can see within 30 feet of yourself. An unwilling creature must succeed on a Strength saving throw (DC equals 8 + your proficiency bonus + your Strength modifier) to avoid the effect. If the creature is moved 10 feet or more, it takes damage as if it had fallen the same distance.',
                    actionType: 'bonus action',
                },
            ],
            14: [
                {
                    name: 'Demiurgic Colossus',
                    level: 14,
                    description: 'The primordial power of your rage intensifies. When you rage, your reach increases by 10 feet, your size can increase to Huge, and you can use your Mighty Impel to move creatures that are Large or smaller. In addition, the extra damage dealt by your Elemental Cleaver feature increases to 2d6.',
                    actionType: 'passive',
                    damage: {
                        dice: '+2d6',
                        type: 'elemental',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Path of the Storm Herald',
        description: 'All barbarians harbor a fury within. Their rage grants them superior strength, durability, and speed. Barbarians who follow the Path of the Storm Herald learn to transform that rage into a mantle of primal magic, which swirls around them. When in a fury, a barbarian of this path taps into the forces of nature to create powerful magical effects.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Storm Aura',
                    level: 3,
                    description: 'You emanate a stormy, magical aura while you rage. The aura extends 10 feet from you in every direction, but not through total cover. Your aura has an effect that activates when you enter your rage, and you can activate the effect again on each of your turns as a bonus action. Choose desert, sea, or tundra. Your aura\'s effect depends on that chosen environment. You can change your environment choice whenever you gain a level in this class.\n\n**Desert.** When this effect is activated, all other creatures in your aura take 2 fire damage each. The damage increases when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level.\n\n**Sea.** When this effect is activated, you can choose one other creature you can see in your aura. The target must make a Dexterity saving throw. The DC equals 8 + your proficiency bonus + your Constitution modifier. The target takes 1d6 lightning damage on a failed save, or half as much damage on a successful one. The damage increases when you reach certain levels in this class, increasing to 2d6 at 10th level, 3d6 at 15th level, and 4d6 at 20th level.\n\n**Tundra.** When this effect is activated, each creature of your choice in your aura gains 2 temporary hit points, as icy spirits inure it to suffering. The temporary hit points increase when you reach certain levels in this class, increasing to 3 at 5th level, 4 at 10th level, 5 at 15th level, and 6 at 20th level.',
                    actionType: 'bonus action',
                    providesChoice: true,
                    choices: ['Desert', 'Sea', 'Tundra'],
                    scaling: 'Desert and Tundra: increase at levels 5, 10, 15, 20. Sea: 1d6 (L3), 2d6 (L10), 3d6 (L15), 4d6 (L20)',
                    damage: {
                        dice: '2-6 fire (Desert), 1d6-4d6 lightning (Sea), or 2-6 temp HP (Tundra)',
                        type: 'fire, lightning, or healing',
                        scaling: 'Increases at levels 5, 10, 15, and 20',
                    },
                },
            ],
            6: [
                {
                    name: 'Storm Soul',
                    level: 6,
                    description: 'The storm grants you benefits even when your aura isn\'t active. The benefits are based on the environment you chose for your Storm Aura.\n\n**Desert.** You gain resistance to fire damage, and you don\'t suffer the effects of extreme heat. Moreover, as an action, you can touch a flammable object that isn\'t being worn or carried by anyone else and set it on fire.\n\n**Sea.** You gain resistance to lightning damage, and you can breathe underwater. You also gain a swimming speed of 30 feet.\n\n**Tundra.** You gain resistance to cold damage, and you don\'t suffer the effects of extreme cold. Moreover, as an action, you can touch water and turn a 5-foot cube of it into ice, which melts after 1 minute. This action fails if a creature is in the cube.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Shielding Storm',
                    level: 10,
                    description: 'You learn to use your mastery of the storm to protect others. Each creature of your choice has the damage resistance you gained from the Storm Soul feature while the creature is in your Storm Aura.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Raging Storm',
                    level: 14,
                    description: 'The power of the storm you channel grows mightier, lashing out at your foes. The effect is based on the environment you chose for your Storm Aura.\n\n**Desert.** Immediately after a creature in your aura hits you with an attack, you can use your reaction to force that creature to make a Dexterity saving throw. On a failed save, the creature takes fire damage equal to half your barbarian level.\n\n**Sea.** When you hit a creature in your aura with an attack, you can use your reaction to force that creature to make a Strength saving throw. On a failed save, the creature is knocked prone, as if struck by a wave.\n\n**Tundra.** Whenever the effect of your Storm Aura is activated, you can choose one creature you can see in the aura. That creature must succeed on a Strength saving throw, or its speed is reduced to 0 until the start of your next turn, as magical frost covers it.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    
    {
        name: 'Path of the Totem Warrior',
        description: 'The Path of the Totem Warrior is a spiritual journey, as the barbarian accepts a spirit animal as guide, protector, and inspiration. In battle, your totem spirit fills you with supernatural might, adding magical fuel to your barbarian rage. Most barbarian tribes consider a totem animal to be kin to a particular clan. It is unusual for an individual to have more than one totem animal spirit, though exceptions exist.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Spirit Seeker',
                    level: 3,
                    description: 'Yours is a path that seeks attunement with the natural world, giving you a kinship with beasts. You gain the ability to cast the beast sense and speak with animals spells, but only as rituals.',
                    actionType: 'special',
                    spellReference: 'Beast Sense, Speak with Animals',
                },
                {
                    name: 'Totem Spirit',
                    level: 3,
                    description: 'You choose a totem spirit and gain its feature. You must make or acquire a physical totem object—an amulet or similar adornment—that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. Choose from Bear, Eagle, Wolf, Elk, or Tiger.\n\n**Bear.** While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.\n\n**Eagle.** While you\'re raging and aren\'t wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can use the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.\n\n**Wolf.** While you\'re raging, your friends have advantage on melee attack rolls against any creature within 5 feet of you that is hostile to you. The spirit of the wolf makes you a leader of hunters.\n\n**Elk.** While you\'re raging and aren\'t wearing heavy armor, your walking speed increases by 15 feet. The spirit of the elk makes you extraordinarily swift.\n\n**Tiger.** While raging, you can add 10 feet to your long jump distance and 3 feet to your high jump distance. The spirit of the tiger empowers your leaps.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Bear', 'Eagle', 'Wolf', 'Elk', 'Tiger'],
                },
            ],
            6: [
                {
                    name: 'Aspect of the Beast',
                    level: 6,
                    description: 'You gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.\n\n**Bear.** You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.\n\n**Eagle.** You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn\'t impose disadvantage on your Wisdom (Perception) checks.\n\n**Wolf.** You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace.\n\n**Elk.** Whether mounted or on foot, your travel pace is doubled, as is the travel pace of up to ten companions while they\'re within 60 feet of you and you\'re not incapacitated. The elk spirit helps you roam far and fast.\n\n**Tiger.** You gain proficiency in two skills from the following list: Athletics, Acrobatics, Stealth, and Survival. The cat spirit hones your survival instincts.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Bear', 'Eagle', 'Wolf', 'Elk', 'Tiger'],
                },
            ],
            10: [
                {
                    name: 'Spirit Walker',
                    level: 10,
                    description: 'You can cast the commune with nature spell, but only as a ritual. When you do so, a spiritual version of one of the animals you chose for Totem Spirit or Aspect of the Beast appears to you to convey the information you seek.',
                    actionType: 'special',
                    spellReference: 'Commune with Nature',
                },
            ],
            14: [
                {
                    name: 'Totemic Attunement',
                    level: 14,
                    description: 'You gain a magical benefit based on a totem animal of your choice. You can choose the same animal you selected previously or a different one.\n\n**Bear.** While you\'re raging, any creature within 5 feet of you that\'s hostile to you has disadvantage on attack rolls against targets other than you or another character with this feature. An enemy is immune to this effect if it can\'t see or hear you or if it can\'t be frightened.\n\n**Eagle.** While raging, you have a flying speed equal to your current walking speed. This benefit works only in short bursts; you fall if you end your turn in the air and nothing else is holding you aloft.\n\n**Wolf.** While you\'re raging, you can use a bonus action on your turn to knock a Large or smaller creature prone when you hit it with a melee weapon attack.\n\n**Elk.** While raging, you can use a bonus action during your move to pass through the space of a Large or smaller creature. That creature must succeed on a Strength saving throw (DC 8 + your Strength bonus + your proficiency bonus) or be knocked prone and take bludgeoning damage equal to 1d12 + your Strength modifier.\n\n**Tiger.** While you\'re raging, if you move at least 20 feet in a straight line toward a Large or smaller target right before making a melee weapon attack against it, you can use a bonus action to make an additional melee weapon attack against it.',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Bear', 'Eagle', 'Wolf', 'Elk', 'Tiger'],
                    damage: {
                        dice: '1d12 + Str (Elk)',
                        type: 'bludgeoning',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Path of Wild Magic',
        description: 'Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other realms of supernatural power radiate with such forces and can profoundly influence people. As folk of deep feeling, barbarians are especially susceptible to these wild influences, with some barbarians being transformed by the magic. These magic-suffused barbarians walk the Path of Wild Magic.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        features: {
            3: [
                {
                    name: 'Magic Awareness',
                    level: 3,
                    description: 'As an action, you can open your awareness to the presence of concentrated magic. Until the end of your next turn, you know the location of any spell or magic item within 60 feet of you that isn\'t behind total cover. When you sense a spell, you learn which school of magic it belongs to. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Proficiency bonus',
                    restType: 'long',
                },
                {
                    name: 'Wild Surge',
                    level: 3,
                    description: 'The magical energy roiling inside you sometimes erupts from you. When you enter your rage, roll on the Wild Magic table to determine the magical effect produced. If the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Constitution modifier.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Bolstering Magic',
                    level: 6,
                    description: 'You can harness your wild magic to bolster yourself or a companion. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits of your choice to that creature:\n\n• For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll.\n\n• Roll a d3. The creature regains one expended spell slot, the level of which equals the number rolled or lower (the creature\'s choice). Once a creature receives this benefit, that creature can\'t receive it again until after a long rest.\n\nYou can take this action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Proficiency bonus',
                    restType: 'long',
                    providesChoice: true,
                    choices: ['Roll d3 bonus', 'Restore spell slot'],
                },
            ],
            10: [
                {
                    name: 'Unstable Backlash',
                    level: 10,
                    description: 'When you are imperiled during your rage, the magic within you can lash out; immediately after you take damage or fail a saving throw while raging, you can use your reaction to roll on the Wild Magic table and immediately produce the effect rolled. This effect replaces your current Wild Surge effect.',
                    actionType: 'reaction',
                },
            ],
            14: [
                {
                    name: 'Controlled Surge',
                    level: 14,
                    description: 'Whenever you roll on the Wild Magic table, you can roll the die twice and choose which of the two effects to unleash. If you roll the same number on both dice, you can ignore the number and choose any effect on the table.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Path of the Zealot',
        description: 'Some deities inspire their followers to pitch themselves into a ferocious battle fury. These barbarians are zealots—warriors who channel their rage into powerful displays of divine power. A variety of gods across the worlds of D&D inspire their followers to embrace this path. Tempus from the Forgotten Realms and Hextor and Erythnul of Greyhawk are all prime examples.',
        class: 'barbarian',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Divine Fury',
                    level: 3,
                    description: 'You can channel divine fury into your weapon strikes. While you\'re raging, the first creature you hit on each of your turns with a weapon attack takes extra damage equal to 1d6 + half your barbarian level. The extra damage is necrotic or radiant; you choose the type of damage when you gain this feature.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Necrotic', 'Radiant'],
                    damage: {
                        dice: '1d6 + half barbarian level',
                        type: 'necrotic or radiant',
                        scaling: 'Scales with barbarian level',
                    },
                },
                {
                    name: 'Warrior of the Gods',
                    level: 3,
                    description: 'Your soul is marked for endless battle. If a spell, such as raise dead, has the sole effect of restoring you to life (but not undeath), the caster doesn\'t need material components to cast the spell on you.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Fanatical Focus',
                    level: 6,
                    description: 'The divine power that fuels your rage can protect you. If you fail a saving throw while you\'re raging, you can reroll it, and you must use the new roll. You can use this ability only once per rage.',
                    actionType: 'special',
                    usesPerRest: '1 per rage',
                },
            ],
            10: [
                {
                    name: 'Zealous Presence',
                    level: 10,
                    description: 'You learn to channel divine power to inspire zealotry in others. As a bonus action, you unleash a battle cry infused with divine energy. Up to ten other creatures of your choice within 60 feet of you that can hear you gain advantage on attack rolls and saving throws until the start of your next turn. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Rage Beyond Death',
                    level: 14,
                    description: 'The divine power that fuels your rage allows you to shrug off fatal blows. While you\'re raging, having 0 hit points doesn\'t knock you unconscious. You still must make death saving throws, and you suffer the normal effects of taking damage while at 0 hit points. However, if you would die due to failing death saving throws, you don\'t die until your rage ends, and you die then only if you still have 0 hit points.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // BARD SUBCLASSES
    // ═══════════════════════════════════════════════════════════════════
    
    {
        name: 'College of Lore',
        description: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from sources as diverse as scholarly tomes and peasant tales. Whether singing folk ballads in taverns or elaborate compositions in royal courts, these bards use their gifts to hold audiences spellbound.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency with three skills of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Cutting Words',
                    level: 3,
                    description: 'You learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an attack roll, an ability check, or a damage roll, you can use your reaction to expend one of your uses of Bardic Inspiration, rolling a Bardic Inspiration die and subtracting the number rolled from the creature\'s roll. You can choose to use this feature after the creature makes its roll, but before the DM determines whether the attack roll or ability check succeeds or fails, or before the creature deals its damage. The creature is immune if it can\'t hear you or if it\'s immune to being charmed.',
                    actionType: 'reaction',
                },
            ],
            6: [
                {
                    name: 'Additional Magical Secrets',
                    level: 6,
                    description: 'You learn two spells of your choice from any class. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip. The chosen spells count as bard spells for you but don\'t count against the number of bard spells you know.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Peerless Skill',
                    level: 14,
                    description: 'When you make an ability check, you can expend one use of Bardic Inspiration. Roll a Bardic Inspiration die and add the number rolled to your ability check. You can choose to do so after you roll the die for the ability check, but before the DM tells you whether you succeed or fail.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'College of Valor',
        description: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past, and thereby inspire a new generation of heroes. These bards gather in mead halls or around great bonfires to sing the deeds of the mighty, both past and present.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        proficiencies: {
            armor: ['medium-armor', 'shields'],
            weapons: ['martial-weapons'],
        },
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency with medium armor, shields, and martial weapons.',
                    actionType: 'passive',
                },
                {
                    name: 'Combat Inspiration',
                    level: 3,
                    description: 'You learn to inspire others in battle. A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made. Alternatively, when an attack roll is made against the creature, it can use its reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, after seeing the roll but before knowing whether it hits or misses.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Extra Attack',
                    level: 6,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Battle Magic',
                    level: 14,
                    description: 'You have mastered the art of weaving spellcasting and weapon use into a single harmonious act. When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    {
        name: 'College of Glamour',
        description: 'The College of Glamour is open to those bards who mastered their craft in the vibrant realm of the Feywild or under the tutelage of someone who dwelled there. Tutored by satyrs, eladrin, and other fey, these bards learn to use their magic to delight and captivate others.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Mantle of Inspiration',
                    level: 3,
                    description: 'As a bonus action, you can expend one use of your Bardic Inspiration to grant yourself a wondrous appearance. When you do so, choose a number of creatures you can see and who can see you within 60 feet of you, up to a number equal to your Charisma modifier (minimum of one). Each of them gains 5 temporary hit points. When a creature gains these temporary hit points, it can immediately use its reaction to move up to its speed, without provoking opportunity attacks. The number of temporary hit points increases when you reach certain levels in this class, increasing to 8 at 5th level, 11 at 10th level, and 14 at 15th level.',
                    actionType: 'bonus action',
                    scaling: 'Temp HP increases: 5 (3rd), 8 (5th), 11 (10th), 14 (15th)',
                },
                {
                    name: 'Enthralling Performance',
                    level: 3,
                    description: 'You can charge your performance with seductive, fey magic. If you perform for at least 1 minute, you can attempt to inspire wonder in your audience by singing, reciting a poem, or dancing. At the end of the performance, choose a number of humanoids within 60 feet of you who watched and listened to all of it, up to a number equal to your Charisma modifier (minimum of one). Each target must succeed on a Wisdom saving throw against your spell save DC or be charmed by you. While charmed in this way, the target idolizes you, it speaks glowingly of you to anyone who speaks to it, and it hinders anyone who opposes you, avoiding violence unless it was already inclined to fight on your behalf. This effect ends on a target after 1 hour, if it takes any damage, if you attack it, or if it witnesses you attacking or damaging any of its allies. If a target succeeds on its saving throw, the target has no hint that you tried to charm it. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            6: [
                {
                    name: 'Mantle of Majesty',
                    level: 6,
                    description: 'As a bonus action, you cast command, without expending a spell slot, and you take on an appearance of unearthly beauty for 1 minute or until your concentration ends (as if you were concentrating on a spell). During this time, you can cast command as a bonus action on each of your turns, without expending a spell slot. Any creature charmed by you automatically fails its saving throw against the command you cast with this feature. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Unbreakable Majesty',
                    level: 14,
                    description: 'As a bonus action, you can assume a magically majestic presence for 1 minute or until you are incapacitated. For the duration, whenever any creature tries to attack you for the first time on a turn, the attacker must make a Charisma saving throw against your spell save DC. On a failed save, it can\'t attack you on this turn, and it must choose a new target for its attack or the attack is wasted. On a successful save, it can attack you on this turn, but it has disadvantage on any saving throw it makes against your spells on your next turn. Once you assume this majestic presence, you can\'t do so again until you finish a short or long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    
    {
        name: 'College of Swords',
        description: 'Bards of the College of Swords are called blades, and they entertain through daring feats of weapon prowess. Blades perform stunts such as sword swallowing, knife throwing and juggling, and mock combats. Their talent with weapons inspires many blades to lead double lives.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        proficiencies: {
            weapons: ['scimitars'],
            armor: ['medium-armor'],
        },
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency with medium armor and the scimitar. If you\'re proficient with a simple or martial melee weapon, you can use it as a spellcasting focus for your bard spells.',
                    actionType: 'passive',
                },
                {
                    name: 'Fighting Style',
                    level: 3,
                    description: 'You adopt a fighting style. Choose one: Dueling (+2 damage with one-handed weapon) or Two-Weapon Fighting (add ability modifier to damage of off-hand attack).',
                    actionType: 'passive',
                    choices: ['Dueling', 'Two-Weapon Fighting'],
                },
                {
                    name: 'Blade Flourish',
                    level: 3,
                    description: 'When you take the Attack action on your turn, your walking speed increases by 10 feet until the end of the turn, and if a weapon attack that you make as part of this action hits a creature, you can use one of the following Blade Flourish options. You can use only one Blade Flourish option per turn.\n\n• Defensive Flourish: You expend one use of Bardic Inspiration, rolling it and adding the number to your AC until the start of your next turn. You also add it to the attack\'s damage roll.\n• Slashing Flourish: You expend one use of Bardic Inspiration, rolling it and adding the number to the attack\'s damage roll. You can choose one creature within 5 feet of you (other than the target) to also take the same damage.\n• Mobile Flourish: You expend one use of Bardic Inspiration, rolling it and adding the number to the attack\'s damage roll. You can also push the target up to 5 feet away from you, plus a number of feet equal to the number you rolled. You can then immediately use your reaction to move up to your walking speed to an unoccupied space within 5 feet of the target.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Extra Attack',
                    level: 6,
                    description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Master\'s Flourish',
                    level: 14,
                    description: 'When you use a Blade Flourish option, you can roll a d6 and use it instead of expending a Bardic Inspiration die.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'College of Whispers',
        description: 'Most folk are happy to welcome a bard into their midst. Bards of the College of Whispers use this to their advantage. They appear to be like other bards, sharing news, singing songs, and telling tales to the audiences they gather. In truth, the College of Whispers teaches its students that they are wolves among sheep.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Psychic Blades',
                    level: 3,
                    description: 'When you hit a creature with a weapon attack, you can expend one use of your Bardic Inspiration to deal an additional 2d6 psychic damage to that target. You can do so only once per round on your turn. The psychic damage increases when you reach certain levels in this class, increasing to 3d6 at 5th level, 5d6 at 10th level, and 8d6 at 15th level.',
                    actionType: 'special',
                    damage: {
                        dice: '2d6',
                        type: 'psychic',
                        scaling: 'Increases: 2d6 (3rd), 3d6 (5th), 5d6 (10th), 8d6 (15th)',
                    },
                },
                {
                    name: 'Words of Terror',
                    level: 3,
                    description: 'If you speak to a humanoid alone for at least 1 minute, you can attempt to seed paranoia and fear into its mind. At the end of the conversation, the target must succeed on a Wisdom saving throw against your spell save DC or be frightened of you or another creature of your choice. The target is frightened in this way for 1 hour, until it is attacked or damaged, or until it witnesses its allies being attacked or damaged. If the target succeeds on its saving throw, the target has no hint that you tried to frighten it. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            6: [
                {
                    name: 'Mantle of Whispers',
                    level: 6,
                    description: 'When a humanoid dies within 30 feet of you, you can magically capture its shadow using your reaction. You retain this shadow until you use it or you finish a long rest. You can use the shadow as an action. When you do so, it vanishes, magically transforming into a disguise that appears on you. You now look like the dead person, but healthy and alive. This disguise lasts for 1 hour or until you end it as a bonus action. While in the disguise, you gain access to all information that the humanoid would freely share with a casual acquaintance. Once you capture a shadow, you can\'t capture another one until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            14: [
                {
                    name: 'Shadow Lore',
                    level: 14,
                    description: 'As an action, you magically whisper a phrase that only one creature of your choice within 30 feet of you can hear. The target must make a Wisdom saving throw against your spell save DC. It automatically succeeds if it doesn\'t share a language with you or if you can\'t see it. On a successful saving throw, your whisper sounds like unintelligible mumbling and has no effect. On a failed saving throw, the target is charmed by you for the next 8 hours or until you or your allies attack or damage it. It interprets the whispers as a description of its most mortifying secret. While charmed, the creature obeys your commands for fear that you will reveal its secret. It won\'t risk its life for you or fight for you, unless it was already inclined to do so. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'College of Eloquence',
        description: 'Adherents of the College of Eloquence master the art of oratory. Persuasion is regarded as a high art, and a well-reasoned, well-spoken argument often proves more persuasive than facts. These bards wield a blend of logic and theatrical wordplay, winning over skeptics and detractors with logical arguments and plucking at heartstrings to appeal to the emotions of audiences.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        features: {
            3: [
                {
                    name: 'Silver Tongue',
                    level: 3,
                    description: 'You are a master at saying the right thing at the right time. When you make a Charisma (Persuasion) or Charisma (Deception) check, you can treat a d20 roll of 9 or lower as a 10.',
                    actionType: 'passive',
                },
                {
                    name: 'Unsettling Words',
                    level: 3,
                    description: 'You can spin words laced with magic that unsettle a creature and cause it to doubt itself. As a bonus action, you can expend one use of your Bardic Inspiration and choose one creature you can see within 60 feet of you. Roll the Bardic Inspiration die. The creature must subtract the number rolled from the next saving throw it makes before the start of your next turn.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Unfailing Inspiration',
                    level: 6,
                    description: 'When a creature adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll fails, the creature can keep the Bardic Inspiration die.',
                    actionType: 'passive',
                },
                {
                    name: 'Universal Speech',
                    level: 6,
                    description: 'You have gained the ability to make your speech intelligible to any creature. As an action, choose one or more creatures within 60 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). The chosen creatures can magically understand you, regardless of the language you speak, for 1 hour. Once you use this feature, you can\'t use it again until you finish a long rest, unless you expend a spell slot to use it again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Infectious Inspiration',
                    level: 14,
                    description: 'When a creature within 60 feet of you adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll succeeds, you can use your reaction to encourage the creature, granting another creature (other than yourself) within 60 feet of you that can hear you a Bardic Inspiration die without expending any of your Bardic Inspiration uses.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    
    {
        name: 'College of Creation',
        description: 'Bards believe the cosmos is a work of art - the creation of the first dragons and gods. That creative work included harmonies that continue to resound through existence today, a power known as the Song of Creation. The bards of the College of Creation draw on that primeval song through dance, music, and poetry, and their teachers share this lesson: "Before the sun and the moon, there was the Song, and its music awoke the first dawn. Its melodies so delighted the stones and trees that some of them gained a voice of their own. And now they sing too."',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        features: {
            3: [
                {
                    name: 'Mote of Potential',
                    level: 3,
                    description: 'Whenever you give a creature a Bardic Inspiration die, you can utter a note from the Song of Creation to create a Tiny mote of potential, which orbits within 5 feet of that creature. The mote is intangible and invulnerable, and it lasts until the Bardic Inspiration die is lost. The mote looks like a musical note, a star, a flower, or another symbol of art or life that you choose. When the creature uses the Bardic Inspiration die, the mote provides an additional effect based on whether the die benefits an ability check, an attack roll, or a saving throw:\n\n• Ability Check: When the creature rolls the Bardic Inspiration die to add it to an ability check, the creature can roll the Bardic Inspiration die again and choose which roll to use.\n• Attack Roll: Immediately after the creature rolls the Bardic Inspiration die to add it to an attack roll against a target, the mote thunderously shatters. The target and each creature of your choice within 5 feet of it must succeed on a Constitution saving throw against your spell save DC or take thunder damage equal to the number rolled on the Bardic Inspiration die.\n• Saving Throw: Immediately after the creature rolls the Bardic Inspiration die and adds it to a saving throw, the mote vanishes with the sound of soft music, causing the creature to gain temporary hit points equal to the number rolled on the Bardic Inspiration die plus your Charisma modifier (minimum of 1).',
                    actionType: 'passive',
                },
                {
                    name: 'Performance of Creation',
                    level: 3,
                    description: 'As an action, you can channel the magic of the Song of Creation to create one nonmagical item of your choice in an unoccupied space within 10 feet of you. The item must appear on a surface or in a liquid that can support it. The gp value of the item can\'t be more than 20 times your bard level, and the item must be Medium or smaller. The item glimmers softly, and a creature can faintly hear music when touching it. The created item disappears after a number of hours equal to your proficiency bonus. Once you create an item with this feature, you can\'t do so again until you finish a long rest, unless you expend a spell slot of 2nd level or higher to use this feature again. The size of the item you can create increases by one size category when you reach 6th level (Large) and 14th level (Huge).',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    scaling: 'Item size: Medium (3rd), Large (6th), Huge (14th). Max GP: 20 × bard level',
                },
            ],
            6: [
                {
                    name: 'Animating Performance',
                    level: 6,
                    description: 'As an action, you can target a Large or smaller nonmagical item you can see within 30 feet of you and animate it. The animate item uses the Dancing Item stat block (AC 16, HP equal to your bard level + your Charisma modifier, can move and take reactions, has proficiency in Strength and Constitution saves equal to your proficiency bonus, attacks use your spell attack bonus and deal 1d10 + your Charisma modifier damage). The item is friendly to you and your companions and obeys your commands. It lives for 1 hour, until it is reduced to 0 hit points, or until you die. In combat, the item shares your initiative but takes its turn immediately after yours. It can move and use its reaction on its own, but the only action it takes on its turn is the Dodge action, unless you take a bonus action on your turn to command it to take another action. Once you animate an item with this feature, you can\'t do so again until you finish a long rest, unless you expend a spell slot of 3rd level or higher to use this feature again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Creative Crescendo',
                    level: 14,
                    description: 'When you use your Performance of Creation feature, you can create more than one item at once. The number of items equals your Charisma modifier (minimum of two items). If you create an item that would exceed that number, you choose which of the previously created items disappears. Only one of these items can be of the maximum size you can create; the rest must be Small or Tiny. You are no longer limited by gp value when creating items with Performance of Creation.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'College of Spirits',
        description: 'Bards of the College of Spirits seek tales with inherent power—be they legends, histories, or fictions—and bring their subjects to life. Using occult trappings, these bards conjure spiritual embodiments of powerful forces to change the world once more.',
        class: 'bard',
        subclass_level: 3,
        sourcebook: 'VRGtR',
        
        features: {
            3: [
                {
                    name: 'Guiding Whispers',
                    level: 3,
                    description: 'You can reach out to spirits to guide you and others. You learn the guidance cantrip, which doesn\'t count against the number of bard cantrips you know. For you, it has a range of 60 feet when you cast it.',
                    actionType: 'passive',
                },
                {
                    name: 'Spiritual Focus',
                    level: 3,
                    description: 'You employ tools that aid you in channeling spirits, be they historical figures or fictional archetypes. You can use a candle, crystal ball, skull, spirit board, or tarokka deck as a spellcasting focus for your bard spells. When you cast a bard spell that deals damage or restores hit points through the Spiritual Focus, roll a d6, and you gain a bonus to one damage or healing roll of the spell equal to the number rolled.',
                    actionType: 'passive',
                },
                {
                    name: 'Tales from Beyond',
                    level: 3,
                    description: 'You reach out to spirits who tell their tales through you. While you are holding your Spiritual Focus, you can use a bonus action to expend one use of your Bardic Inspiration and roll on the Spirit Tales table (or choose a tale) to determine the tale the spirits direct you to tell. You retain the tale in mind until you bestow the tale\'s effect or you finish a short or long rest. You can use an action to choose one creature you can see within 30 feet of you to be the target of the tale\'s effect. Once you do so, you can\'t bestow the tale\'s effect again until you roll it again. The tales grant various benefits: Beast (5 temp HP), Warrior (+1d6 to attack rolls), Friends (+1d6 to persuasion/performance), Runaway (+10 speed), Traveler (+1d6 temp HP when regain HP), Beguiler (no reactions for 1 round).',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Spirit Session',
                    level: 6,
                    description: 'Spirits provide you with supernatural insights. You can conduct an hour-long ritual channeling spirits (which can be part of a short or long rest) using your Spiritual Focus. You can conduct the ritual with a number of willing creatures equal to your proficiency bonus (including yourself). At the end of the ritual, you temporarily learn one spell of your choice from any class. The spell you choose must be of a level equal to the number of creatures that conducted the ritual or less, the spell must be of a level you can cast, and it must be in the school of divination or necromancy. The chosen spell counts as a bard spell for you but doesn\'t count against the number of bard spells you know. Once you perform the ritual, you can\'t do so again until you start a long rest, and you know the chosen spell until you start a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Mystical Connection',
                    level: 14,
                    description: 'You now have the ability to nudge the spirits of Tales from Beyond toward certain tales. Whenever you roll on the Spirit Tales table, you can roll the die twice and choose which of the two effects to bestow. If you roll the same number on both dice, you can ignore the number and choose any effect on the table.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CLERIC SUBCLASSES (Divine Domains)
    // ═══════════════════════════════════════════════════════════════════
    
    {
        name: 'Knowledge Domain',
        description: 'The gods of knowledge value learning and understanding above all. Some teach that knowledge is to be gathered and shared in libraries and universities, or promote the practical knowledge of craft and invention.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        proficiencies: {
            skills: ['Choose two from Arcana, History, Nature, or Religion'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['command', 'identify'],
                3: ['augury', 'suggestion'],
                5: ['nondetection', 'speak-with-dead'],
                7: ['arcane-eye', 'confusion'],
                9: ['legend-lore', 'scrying'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Blessings of Knowledge',
                    level: 1,
                    description: 'You learn two languages of your choice. You also become proficient in your choice of two of the following skills: Arcana, History, Nature, or Religion. Your proficiency bonus is doubled for any ability check you make that uses either of those skills.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Knowledge of the Ages',
                    level: 2,
                    description: 'You can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Channel Divinity: Read Thoughts',
                    level: 6,
                    description: 'You can use your Channel Divinity to read a creature\'s thoughts. You can then use your access to the creature\'s mind to command it. As an action, choose one creature that you can see within 60 feet of you. That creature must make a Wisdom saving throw. If the creature succeeds on the saving throw, you can\'t use this feature on it again until you finish a long rest. If the creature fails its save, you can read its surface thoughts (those foremost in its mind, reflecting its current emotions and what it is actively thinking about) when it is within 60 feet of you. This effect lasts for 1 minute. During that time, you can use your action to end this effect and cast the suggestion spell on the creature without expending a spell slot. The target automatically fails its saving throw against the spell.',
                    actionType: 'action',
                },
            ],
            8: [
                {
                    name: 'Potent Spellcasting',
                    level: 8,
                    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Visions of the Past',
                    level: 17,
                    description: 'You can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy visions of recent events. You can meditate in this way for a number of minutes equal to your Wisdom score and must maintain concentration during that time, as if you were casting a spell. Once you use this feature, you can\'t use it again until you finish a short or long rest. Object Reading: Holding an object as you meditate, you can see visions of the object\'s previous owner. Area Reading: As you meditate, you see visions of recent events in your immediate vicinity (a room, street, tunnel, clearing, or the like, up to a 50-foot cube), going back a number of days equal to your Wisdom score.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    
    {
        name: 'Life Domain',
        description: 'The Life domain focuses on the vibrant positive energy—one of the fundamental forces of the universe—that sustains all life. The gods of life promote vitality and health through healing the sick and wounded, caring for those in need, and driving away the forces of death and undeath.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        proficiencies: {
            armor: ['heavy-armor'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['bless', 'cure-wounds'],
                3: ['lesser-restoration', 'spiritual-weapon'],
                5: ['beacon-of-hope', 'revivify'],
                7: ['death-ward', 'guardian-of-faith'],
                9: ['mass-cure-wounds', 'raise-dead'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiency',
                    level: 1,
                    description: 'You gain proficiency with heavy armor.',
                    actionType: 'passive',
                },
                {
                    name: 'Disciple of Life',
                    level: 1,
                    description: 'Your healing spells are more effective. Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell\'s level.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Preserve Life',
                    level: 2,
                    description: 'You can use your Channel Divinity to heal the badly injured. As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can\'t use this feature on an undead or a construct.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Blessed Healer',
                    level: 6,
                    description: 'The healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell\'s level.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'radiant',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Supreme Healing',
                    level: 17,
                    description: 'When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die. For example, instead of restoring 2d6 hit points to a creature, you restore 12.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Light Domain',
        description: 'Gods of light promote the ideals of rebirth and renewal, truth, vigilance, and beauty, often using the symbol of the sun. Some of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others are tireless sentinels whose eyes pierce every shadow and see through every deception.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        spells: {
            byCharacterLevel: {
                1: ['burning-hands', 'faerie-fire'],
                3: ['flaming-sphere', 'scorching-ray'],
                5: ['daylight', 'fireball'],
                7: ['guardian-of-faith', 'wall-of-fire'],
                9: ['flame-strike', 'scrying'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Cantrip',
                    level: 1,
                    description: 'You gain the light cantrip if you don\'t already know it. This cantrip doesn\'t count against the number of cleric cantrips you know.',
                    actionType: 'passive',
                },
                {
                    name: 'Warding Flare',
                    level: 1,
                    description: 'You can interpose divine light between yourself and an attacking enemy. When you are attacked by a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll, causing light to flare before the attacker before it hits or misses. An attacker that can\'t be blinded is immune to this feature. You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Radiance of the Dawn',
                    level: 2,
                    description: 'You can use your Channel Divinity to harness sunlight, banishing darkness and dealing radiant damage to your foes. As an action, you present your holy symbol, and any magical darkness within 30 feet of you is dispelled. Additionally, each hostile creature within 30 feet of you must make a Constitution saving throw. A creature takes radiant damage equal to 2d10 + your cleric level on a failed saving throw, and half as much damage on a successful one. A creature that has total cover from you is not affected.',
                    actionType: 'action',
                    damage: {
                        dice: '2d10 + cleric level',
                        type: 'radiant',
                        scaling: 'Scales with cleric level',
                    },
                },
            ],
            6: [
                {
                    name: 'Improved Flare',
                    level: 6,
                    description: 'You can also use your Warding Flare feature when a creature that you can see within 30 feet of you attacks a creature other than you.',
                    actionType: 'reaction',
                },
            ],
            8: [
                {
                    name: 'Potent Spellcasting',
                    level: 8,
                    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Corona of Light',
                    level: 17,
                    description: 'You can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action. You emit bright light in a 60-foot radius and dim light 30 feet beyond that. Your enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant damage.',
                    actionType: 'action',
                },
            ],
        },
    },
    
    {
        name: 'Nature Domain',
        description: 'Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests to friendly deities associated with particular springs and groves. Druids revere nature as a whole and might serve one of these deities, practicing mysterious rites and reciting all-but-forgotten prayers in their own secret tongue.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        proficiencies: {
            armor: ['heavy-armor'],
            skills: ['Choose one from Animal Handling, Nature, or Survival'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['animal-friendship', 'speak-with-animals'],
                3: ['barkskin', 'spike-growth'],
                5: ['plant-growth', 'wind-wall'],
                7: ['dominate-beast', 'grasping-vine'],
                9: ['insect-plague', 'tree-stride'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Acolyte of Nature',
                    level: 1,
                    description: 'You learn one cantrip of your choice from the druid spell list. This cantrip counts as a cleric cantrip for you, but it doesn\'t count against the number of cleric cantrips you know. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival.',
                    actionType: 'passive',
                },
                {
                    name: 'Bonus Proficiency',
                    level: 1,
                    description: 'You gain proficiency with heavy armor.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Charm Animals and Plants',
                    level: 2,
                    description: 'You can use your Channel Divinity to charm animals and plants. As an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Dampen Elements',
                    level: 6,
                    description: 'When you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.',
                    actionType: 'reaction',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 cold, fire, or lightning damage (your choice) to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'cold, fire, or lightning',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Master of Nature',
                    level: 17,
                    description: 'You gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    {
        name: 'Tempest Domain',
        description: 'Gods whose portfolios include the Tempest domain govern storms, sea, and sky. They include gods of lightning and thunder, gods of earthquakes, some fire gods, and certain gods of violence, physical strength, and courage.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        proficiencies: {
            armor: ['heavy-armor'],
            weapons: ['martial-weapons'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['fog-cloud', 'thunderwave'],
                3: ['gust-of-wind', 'shatter'],
                5: ['call-lightning', 'sleet-storm'],
                7: ['control-water', 'ice-storm'],
                9: ['destructive-wave', 'insect-plague'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'You gain proficiency with martial weapons and heavy armor.',
                    actionType: 'passive',
                },
                {
                    name: 'Wrath of the Storm',
                    level: 1,
                    description: 'You can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one. You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    damage: {
                        dice: '2d8',
                        type: 'lightning or thunder',
                        scaling: 'Half damage on successful save',
                    },
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Destructive Wrath',
                    level: 2,
                    description: 'You can use your Channel Divinity to wield the power of the storm with unchecked ferocity. When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Thunderbolt Strike',
                    level: 6,
                    description: 'When you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'thunder',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Stormborn',
                    level: 17,
                    description: 'You have a flying speed equal to your current walking speed whenever you are not underground or indoors.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Trickery Domain',
        description: 'Gods of trickery are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals. They\'re patrons of thieves, scoundrels, gamblers, rebels, and liberators.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        spells: {
            byCharacterLevel: {
                1: ['charm-person', 'disguise-self'],
                3: ['mirror-image', 'pass-without-trace'],
                5: ['blink', 'dispel-magic'],
                7: ['dimension-door', 'polymorph'],
                9: ['dominate-person', 'modify-memory'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Blessing of the Trickster',
                    level: 1,
                    description: 'You can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.',
                    actionType: 'action',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Invoke Duplicity',
                    level: 2,
                    description: 'You can use your Channel Divinity to create an illusory duplicate of yourself. As an action, you create a perfect illusion of yourself that lasts for 1 minute, or until you lose your concentration (as if you were concentrating on a spell). The illusion appears in an unoccupied space that you can see within 30 feet of you. As a bonus action on your turn, you can move the illusion up to 30 feet to a space you can see, but it must remain within 120 feet of you. For the duration, you can cast spells as though you were in the illusion\'s space, but you must use your own senses. Additionally, when both you and your illusion are within 5 feet of a creature that can see the illusion, you have advantage on attack rolls against that creature, given how distracting the illusion is to the target.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Channel Divinity: Cloak of Shadows',
                    level: 6,
                    description: 'You can use your Channel Divinity to vanish. As an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell.',
                    actionType: 'action',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with poison. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 poison damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'poison',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Improved Duplicity',
                    level: 17,
                    description: 'You can create up to four duplicates of yourself, instead of one, when you use Invoke Duplicity. As a bonus action on your turn, you can move any number of them up to 30 feet, to a maximum range of 120 feet.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    {
        name: 'War Domain',
        description: 'War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage. In either case, the gods of war watch over warriors and reward them for their great deeds.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'PHB',
        
        proficiencies: {
            armor: ['heavy-armor'],
            weapons: ['martial-weapons'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['divine-favor', 'shield-of-faith'],
                3: ['magic-weapon', 'spiritual-weapon'],
                5: ['crusaders-mantle', 'spirit-guardians'],
                7: ['freedom-of-movement', 'stoneskin'],
                9: ['flame-strike', 'hold-monster'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'You gain proficiency with martial weapons and heavy armor.',
                    actionType: 'passive',
                },
                {
                    name: 'War Priest',
                    level: 1,
                    description: 'When you use the Attack action, you can make one weapon attack as a bonus action. You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Guided Strike',
                    level: 2,
                    description: 'You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Channel Divinity: War God\'s Blessing',
                    level: 6,
                    description: 'When a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.',
                    actionType: 'reaction',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 damage of the same type dealt by the weapon to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'weapon damage type',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Avatar of Battle',
                    level: 17,
                    description: 'You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Arcana Domain',
        description: 'Magic is an energy that suffuses the multiverse and that fuels both destruction and creation. Gods of the Arcana domain know the secrets and potential of magic intimately. For some of these gods, magical knowledge is a great responsibility that comes with a special understanding of the nature of reality. Other gods of Arcana see magic as pure power, to be used as its wielder sees fit.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'SCAG',
        
        spells: {
            byCharacterLevel: {
                1: ['detect-magic', 'magic-missile'],
                3: ['magic-weapon', 'nystuls-magic-aura'],
                5: ['dispel-magic', 'magic-circle'],
                7: ['arcane-eye', 'leomunds-secret-chest'],
                9: ['planar-binding', 'teleportation-circle'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Arcane Initiate',
                    level: 1,
                    description: 'You gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Arcane Abjuration',
                    level: 2,
                    description: 'You can use your Channel Divinity to abjure otherworldly creatures. As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage. A turned creature must spend its turns trying to move as far away from you as it can, and it can\'t willingly end its move in a space within 30 feet of you. It also can\'t take reactions. For its action, it can only use the Dash action or try to escape from an effect that prevents it from moving. If there\'s nowhere to move, the creature can use the Dodge action. After you reach 5th level, when a creature fails its saving throw against your Arcane Abjuration feature, the creature is banished for 1 minute (as in the banishment spell, no concentration required) if it isn\'t on its plane of origin and its challenge rating is at or below a certain threshold: 5th level CR 1/2 or lower, 8th level CR 1 or lower, 11th level CR 2 or lower, 14th level CR 3 or lower, 17th level CR 4 or lower.',
                    actionType: 'action',
                    scaling: 'Banishment CR threshold increases with level',
                },
            ],
            6: [
                {
                    name: 'Spell Breaker',
                    level: 6,
                    description: 'When you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell.',
                    actionType: 'special',
                },
            ],
            8: [
                {
                    name: 'Potent Spellcasting',
                    level: 8,
                    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Arcane Mastery',
                    level: 17,
                    description: 'You choose four spells from the wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Death Domain',
        description: 'The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures. Deities such as Chemosh, Myrkul, and Wee Jas are patrons of necromancers, death knights, liches, mummy lords, and vampires. Gods of the Death domain also embody murder (Anubis, Bhaal, and Pyremius), pain (Iuz or Loviatar), disease or poison (Incabulos, Talona, or Morgion), and the underworld (Hades and Hel).',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'DMG',
        
        proficiencies: {
            weapons: ['martial-weapons'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['false-life', 'ray-of-sickness'],
                3: ['blindness-deafness', 'ray-of-enfeeblement'],
                5: ['animate-dead', 'vampiric-touch'],
                7: ['blight', 'death-ward'],
                9: ['antilife-shell', 'cloudkill'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiency',
                    level: 1,
                    description: 'You gain proficiency with martial weapons.',
                    actionType: 'passive',
                },
                {
                    name: 'Reaper',
                    level: 1,
                    description: 'You learn one necromancy cantrip of your choice from any spell list. When you cast a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Touch of Death',
                    level: 2,
                    description: 'You can use Channel Divinity to destroy another creature\'s life force by touch. When you hit a creature with a melee attack, you can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice your cleric level.',
                    actionType: 'special',
                    damage: {
                        dice: '5 + 2 × cleric level',
                        type: 'necrotic',
                        scaling: 'Scales with cleric level',
                    },
                },
            ],
            6: [
                {
                    name: 'Inescapable Destruction',
                    level: 6,
                    description: 'Your ability to channel negative energy becomes more potent. Necrotic damage dealt by your cleric spells and Channel Divinity options ignores resistance to necrotic damage.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with necrotic energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 necrotic damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'necrotic',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Improved Reaper',
                    level: 17,
                    description: 'When you cast a necromancy spell of 1st through 5th level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, you must provide them for each target.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Forge Domain',
        description: 'The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith who keeps a village in horseshoes and plow blades to the mighty elf artisan whose diamond-tipped arrows of mithral have felled demon lords. The gods of the forge teach that, with patience and hard work, even the most intractable metal can be transformed from a lump of ore to a beautifully wrought object.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'XGtE',
        
        proficiencies: {
            armor: ['heavy-armor'],
            tools: ['smith\'s tools'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['identify', 'searing-smite'],
                3: ['heat-metal', 'magic-weapon'],
                5: ['elemental-weapon', 'protection-from-energy'],
                7: ['fabricate', 'wall-of-fire'],
                9: ['animate-objects', 'creation'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'You gain proficiency with heavy armor and smith\'s tools.',
                    actionType: 'passive',
                },
                {
                    name: 'Blessing of the Forge',
                    level: 1,
                    description: 'You gain the ability to imbue magic into a weapon or armor. At the end of a long rest, you can touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest or until you die, the object becomes a magic item, granting a +1 bonus to AC if it\'s armor or a +1 bonus to attack and damage rolls if it\'s a weapon. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Artisan\'s Blessing',
                    level: 2,
                    description: 'You can use your Channel Divinity to create simple items. You conduct an hour-long ritual that crafts a nonmagical item that must include some metal: a simple or martial weapon, a suit of armor, ten pieces of ammunition, a set of tools, or another metal object. The creation is completed at the end of the hour, coalescing in an unoccupied space of your choice on a surface within 5 feet of you. The thing you create can be something that is worth no more than 100 gp. As part of this ritual, you must lay out metal, which can include coins, with a value equal to the creation. The metal irretrievably coalesces and transforms into the creation at the ritual\'s end, magically forming even nonmetal parts of the creation. The ritual can create a duplicate of a nonmagical item that contains metal, such as a key, if you possess the original during the ritual.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Soul of the Forge',
                    level: 6,
                    description: 'Your mastery of the forge grants you special abilities: You gain resistance to fire damage. While wearing heavy armor, you gain a +1 bonus to AC.',
                    actionType: 'passive',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with the fiery power of the forge. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 fire damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'fire',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Saint of Forge and Fire',
                    level: 17,
                    description: 'Your blessed affinity with fire and metal becomes more powerful: You gain immunity to fire damage. While wearing heavy armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Grave Domain',
        description: 'Gods of the grave watch over the line between life and death. To these deities, death and the afterlife are a foundational part of the multiverse. To desecrate the peace of the dead is an abomination. Followers of these deities seek to put wandering spirits to rest, destroy the undead, and ease the suffering of the dying.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                1: ['bane', 'false-life'],
                3: ['gentle-repose', 'ray-of-enfeeblement'],
                5: ['revivify', 'vampiric-touch'],
                7: ['blight', 'death-ward'],
                9: ['antilife-shell', 'raise-dead'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Circle of Mortality',
                    level: 1,
                    description: 'You gain the ability to manipulate the line between life and death. When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die. In addition, you learn the spare the dying cantrip, which doesn\'t count against the number of cleric cantrips you know. For you, it has a range of 30 feet, and you can cast it as a bonus action.',
                    actionType: 'passive',
                },
                {
                    name: 'Eyes of the Grave',
                    level: 1,
                    description: 'You gain the ability to occasionally sense the presence of the undead, whose existence is an insult to the natural cycle of life. As an action, you can open your awareness to magically detect undead. Until the end of your next turn, you know the location of any undead within 60 feet of you that isn\'t behind total cover and that isn\'t protected from divination magic. This sense doesn\'t tell you anything about a creature\'s capabilities or identity. You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Path to the Grave',
                    level: 2,
                    description: 'You can use your Channel Divinity to mark another creature\'s life force for termination. As an action, you choose one creature you can see within 30 feet of you, cursing it until the end of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack\'s damage, and then the curse ends.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Sentinel at Death\'s Door',
                    level: 6,
                    description: 'You gain the ability to impede death\'s progress. As a reaction when you or a creature you can see within 30 feet of you suffers a critical hit, you can turn that hit into a normal hit. Any effects triggered by a critical hit are canceled. You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            8: [
                {
                    name: 'Potent Spellcasting',
                    level: 8,
                    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Keeper of Souls',
                    level: 17,
                    description: 'You can seize a trace of vitality from a parting soul and use it to heal the living. When an enemy you can see dies within 60 feet of you, you or one creature of your choice that is within 60 feet of you regains hit points equal to the enemy\'s number of Hit Dice. You can use this feature only if you aren\'t incapacitated. Once you use it, you can\'t do so again until the start of your next turn.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Order Domain',
        description: 'The Order Domain represents discipline, as well as devotion to the laws that govern a society, an institution, or a philosophy. Clerics of Order meditate on logic and justice as they serve their gods, examples of which appear in the Order Deities table.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'GGtR',
        
        proficiencies: {
            armor: ['heavy-armor'],
            skills: ['Choose one from Intimidation or Persuasion'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['command', 'heroism'],
                3: ['hold-person', 'zone-of-truth'],
                5: ['mass-healing-word', 'slow'],
                7: ['compulsion', 'locate-creature'],
                9: ['commune', 'dominate-person'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'You gain proficiency with heavy armor. You also gain proficiency in the Intimidation or Persuasion skill (your choice).',
                    actionType: 'passive',
                },
                {
                    name: 'Voice of Authority',
                    level: 1,
                    description: 'You can invoke the power of law to embolden an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see. If the spell targets more than one ally, you choose the ally who can make the attack.',
                    actionType: 'passive',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Order\'s Demand',
                    level: 2,
                    description: 'You can use your Channel Divinity to exert an intimidating presence over others. As an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any of the charmed creatures to drop what they are holding when they fail the saving throw.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Embodiment of the Law',
                    level: 6,
                    description: 'You become remarkably adept at channeling magical energy to compel others. If you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell\'s casting time to 1 bonus action for this casting, provided the spell\'s casting time is normally 1 action. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 psychic damage to the target. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'psychic',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Order\'s Wrath',
                    level: 17,
                    description: 'Enemies you designate for destruction wilt under the combined efforts of you and your allies. If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target also takes 2d8 psychic damage, and the curse ends. You can curse a creature in this way only once per turn.',
                    actionType: 'passive',
                    damage: {
                        dice: '2d8',
                        type: 'psychic',
                        scaling: 'Triggered when ally hits',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Peace Domain',
        description: 'The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted. The gods of peace inspire people of all sorts to resolve conflict and to stand up against those forces that try to prevent peace from flourishing.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'TCoE',
        
        proficiencies: {
            skills: ['Choose one from Insight, Performance, or Persuasion'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['heroism', 'sanctuary'],
                3: ['aid', 'warding-bond'],
                5: ['beacon-of-hope', 'sending'],
                7: ['aura-of-purity', 'otilukes-resilient-sphere'],
                9: ['greater-restoration', 'rarys-telepathic-bond'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Implement of Peace',
                    level: 1,
                    description: 'You gain proficiency in the Insight, Performance, or Persuasion skill (your choice).',
                    actionType: 'passive',
                },
                {
                    name: 'Emboldening Bond',
                    level: 1,
                    description: 'You can forge an empowering bond among people who are at peace with one another. As an action, you choose a number of willing creatures within 30 feet of you (this can include yourself) equal to your proficiency bonus. You create a magical bond among them for 10 minutes or until you use this feature again. While any bonded creature is within 30 feet of another, the creature can roll a d4 and add the number rolled to an attack roll, an ability check, or a saving throw it makes. Each creature can add the d4 no more than once per turn. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Balm of Peace',
                    level: 2,
                    description: 'You can use your Channel Divinity to make your very presence a soothing balm. As an action, you can move up to your speed, without provoking opportunity attacks, and when you move within 5 feet of any other creature during this action, you can restore a number of hit points to that creature equal to 2d6 + your Wisdom modifier (minimum of 1 hit point). A creature can receive this healing only once whenever you take this action.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Protective Bond',
                    level: 6,
                    description: 'The bond you forge between people helps them protect each other. When a creature affected by your Emboldening Bond feature is about to take damage, a second bonded creature within 30 feet of the first can use its reaction to teleport to an unoccupied space within 5 feet of the first creature. The second creature then takes all the damage instead.',
                    actionType: 'reaction',
                },
            ],
            8: [
                {
                    name: 'Potent Spellcasting',
                    level: 8,
                    description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Expansive Bond',
                    level: 17,
                    description: 'The benefits of your Emboldening Bond and Protective Bond features now work when the creatures are within 60 feet of each other. Moreover, when a creature uses Protective Bond to take someone else\'s damage, the creature has resistance to that damage.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Twilight Domain',
        description: 'The twilight transitions from light into darkness often bring calm and even joy, as the day\'s labors end and the hours of rest begin. The darkness can also bring terrors, but the gods of twilight guard against the horrors of the night.',
        class: 'cleric',
        subclass_level: 1,
        sourcebook: 'TCoE',
        
        proficiencies: {
            armor: ['heavy-armor'],
            weapons: ['martial-weapons'],
        },
        
        spells: {
            byCharacterLevel: {
                1: ['faerie-fire', 'sleep'],
                3: ['moonbeam', 'see-invisibility'],
                5: ['aura-of-vitality', 'leomunds-tiny-hut'],
                7: ['aura-of-life', 'greater-invisibility'],
                9: ['circle-of-power', 'mislead'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'You gain proficiency with martial weapons and heavy armor.',
                    actionType: 'passive',
                },
                {
                    name: 'Eyes of Night',
                    level: 1,
                    description: 'You can see through the deepest gloom. You have darkvision out to a range of 300 feet. In that radius, you can see in dim light as if it were bright light and in darkness as if it were dim light. As an action, you can magically share the darkvision of this feature with willing creatures you can see within 10 feet of you, up to a number of creatures equal to your Wisdom modifier (minimum of one creature). The shared darkvision lasts for 1 hour. Once you share it, you can\'t do so again until you finish a long rest, unless you expend a spell slot of any level to share it again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
                {
                    name: 'Vigilant Blessing',
                    level: 1,
                    description: 'The night has taught you to be vigilant. As an action, you give one creature you touch (including possibly yourself) advantage on the next initiative roll the creature makes. This benefit ends immediately after the roll or if you use this feature again.',
                    actionType: 'action',
                },
            ],
            2: [
                {
                    name: 'Channel Divinity: Twilight Sanctuary',
                    level: 2,
                    description: 'You can use your Channel Divinity to refresh your allies with soothing twilight. As an action, you present your holy symbol, and a sphere of twilight emanates from you. The sphere is centered on you, has a 30-foot radius, and is filled with dim light. The sphere moves with you, and it lasts for 1 minute or until you are incapacitated or die. Whenever a creature (including you) ends its turn in the sphere, you can grant that creature one of these benefits: You grant it temporary hit points equal to 1d6 plus your cleric level, or you end one effect on it causing it to be charmed or frightened.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Steps of Night',
                    level: 6,
                    description: 'You can draw on the mystical power of night to rise into the air. As a bonus action when you are in dim light or darkness, you can magically give yourself a flying speed equal to your walking speed for 1 minute. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            8: [
                {
                    name: 'Divine Strike',
                    level: 8,
                    description: 'You gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage. When you reach 14th level, the extra damage increases to 2d8.',
                    actionType: 'passive',
                    damage: {
                        dice: '1d8',
                        type: 'radiant',
                        scaling: 'Increases to 2d8 at level 14',
                    },
                },
            ],
            17: [
                {
                    name: 'Twilight Shroud',
                    level: 17,
                    description: 'The twilight that you summon offers a protective embrace: you and your allies have half cover while in the sphere created by your Twilight Sanctuary.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // DRUID SUBCLASSES (Druid Circles)
    // ═══════════════════════════════════════════════════════════════════
    
    {
        name: 'Circle of the Land',
        description: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle\'s wisest members preside as the chief priests of communities that hold to the Old Faith.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'PHB',
        
        features: {
            2: [
                {
                    name: 'Bonus Cantrip',
                    level: 2,
                    description: 'You learn one additional druid cantrip of your choice. This cantrip doesn\'t count against the number of druid cantrips you know.',
                    actionType: 'passive',
                },
                {
                    name: 'Natural Recovery',
                    level: 2,
                    description: 'You can regain some of your magical energy by sitting in meditation and communing with nature. During a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher. You can\'t use this feature again until you finish a long rest. For example, when you are a 4th-level druid, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level slot or two 1st-level slots.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
                {
                    name: 'Circle Spells',
                    level: 2,
                    description: 'Your mystical connection to the land infuses you with the ability to cast certain spells. Choose a land type (Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, or Underdark). You gain circle spells based on your chosen land at 3rd, 5th, 7th, and 9th druid level. Once you gain access to a circle spell, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Land\'s Stride',
                    level: 6,
                    description: 'Moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard. In addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such as those created by the entangle spell.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Nature\'s Ward',
                    level: 10,
                    description: 'You can\'t be charmed or frightened by elementals or fey, and you are immune to poison and disease.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Nature\'s Sanctuary',
                    level: 14,
                    description: 'Creatures of the natural world sense your connection to nature and become hesitant to attack you. When a beast or plant creature attacks you, that creature must make a Wisdom saving throw against your druid spell save DC. On a failed save, the creature must choose a different target, or the attack automatically misses. On a successful save, the creature is immune to this effect for 24 hours. The creature is aware of this effect before it makes its attack against you.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Circle of the Moon',
        description: 'Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings. They haunt the deepest parts of the wilderness, where they might go for weeks on end before crossing paths with another humanoid creature, let alone another druid.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'PHB',
        
        features: {
            2: [
                {
                    name: 'Combat Wild Shape',
                    level: 2,
                    description: 'You gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action. Additionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Circle Forms',
                    level: 2,
                    description: 'The rites of your circle grant you the ability to transform into more dangerous animal forms. You can transform into a beast with a challenge rating as high as 1 (you ignore the Max. CR column of the Beast Shapes table, but must abide by the other limitations there). Starting at 6th level, you can transform into a beast with a challenge rating as high as your druid level divided by 3, rounded down.',
                    actionType: 'passive',
                    scaling: 'Max CR: 1 (2nd), druid level ÷ 3 (6th+)',
                },
            ],
            6: [
                {
                    name: 'Primal Strike',
                    level: 6,
                    description: 'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Elemental Wild Shape',
                    level: 10,
                    description: 'You can expend two uses of Wild Shape at the same time to transform into an air elemental, an earth elemental, a fire elemental, or a water elemental.',
                    actionType: 'action',
                },
            ],
            14: [
                {
                    name: 'Thousand Forms',
                    level: 14,
                    description: 'You have learned to use magic to alter your physical form in more subtle ways. You can cast the alter self spell at will.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Circle of Dreams',
        description: 'Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms. The druids\' guardianship of the natural world makes for a natural alliance between them and good-aligned fey. These druids seek to fill the world with dreamy wonder.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'XGtE',
        
        features: {
            2: [
                {
                    name: 'Balm of the Summer Court',
                    level: 2,
                    description: 'You become imbued with the blessings of the Summer Court. You are a font of energy that offers respite from injuries. You have a pool of fey energy represented by a number of d6s equal to your druid level. As a bonus action, you can choose an ally you can see within 120 feet of you and spend a number of those dice equal to half your druid level or less. Roll the spent dice and add them together. The target regains a number of hit points equal to the total. The target also gains 1 temporary hit point per die spent. You regain all expended dice when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'druid level d6s',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Hearth of Moonlight and Shadow',
                    level: 6,
                    description: 'Home can be wherever you are. During a short or long rest, you can invoke the shadowy power of the Gloaming Court to help guard your respite. At the start of the rest, you touch a point in space, and an invisible, 30-foot-radius sphere of magic appears, centered on that point. Total cover blocks the sphere. While within the sphere, you and your allies gain a +5 bonus to Dexterity (Stealth) and Wisdom (Perception) checks, and any light from open flames in the sphere (a campfire, torches, or the like) isn\'t visible outside it. The sphere vanishes at the end of the rest or when you leave the sphere.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Hidden Paths',
                    level: 10,
                    description: 'You can use the hidden, magical pathways that some fey use to traverse space in the blink of an eye. As a bonus action on your turn, you can teleport up to 60 feet to an unoccupied space you can see. Alternatively, you can use your action to teleport one willing creature you touch up to 30 feet to an unoccupied space you can see. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Walker in Dreams',
                    level: 14,
                    description: 'The magic of the Feywild grants you the ability to travel mentally or physically through dreamlands. When you finish a short rest, you can cast one of the following spells, without expending a spell slot or requiring material components: dream (with you as the messenger), scrying, or teleportation circle. This use of teleportation circle is special. Rather than opening a portal to a permanent teleportation circle, it opens a portal to the last location where you finished a long rest on your current plane of existence. If you haven\'t taken a long rest on your current plane, the spell fails but isn\'t wasted. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Circle of the Shepherd',
        description: 'Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid. These druids recognize that all living things play a role in the natural world, yet they focus on protecting animals and fey creatures that have difficulty defending themselves.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'XGtE',
        
        features: {
            2: [
                {
                    name: 'Speech of the Woods',
                    level: 2,
                    description: 'You gain the ability to converse with beasts and many fey. You learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions. Most beasts lack the intelligence to convey or understand sophisticated concepts, but a friendly beast could relay what it has seen or heard in the recent past. This ability doesn\'t grant you any special friendship with beasts, though you can combine this ability with gifts to curry favor with them as you would with any nonplayer character.',
                    actionType: 'passive',
                },
                {
                    name: 'Spirit Totem',
                    level: 2,
                    description: 'You gain the ability to call forth nature spirits and use them to influence the world around you. As a bonus action, you magically summon an incorporeal spirit to a point you can see within 60 feet of you. The spirit creates an aura in a 30-foot radius around that point. It counts as neither a creature nor an object, though it has the spectral appearance of the creature it represents. As a bonus action, you can move the spirit up to 60 feet to a point you can see. The spirit persists for 1 minute. Once you use this feature, you can\'t use it again until you finish a short or long rest. The effect of the spirit\'s aura depends on the type of spirit you summon: Bear (temp HP), Hawk (advantage on attacks), or Unicorn (advantage on detection, healing boost).',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            6: [
                {
                    name: 'Mighty Summoner',
                    level: 6,
                    description: 'Beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains two benefits: The creature appears with more hit points than normal: 2 extra hit points per Hit Die it has. The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Guardian Spirit',
                    level: 10,
                    description: 'Your Spirit Totem safeguards the beasts and fey that you call forth with your magic. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains a number of hit points equal to half your druid level.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Faithful Summons',
                    level: 14,
                    description: 'The nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of conjure animals as if it were cast with a 9th-level spell slot. It summons four beasts of your choice that are challenge rating 2 or lower. The conjured beasts appear within 20 feet of you. If they receive no commands from you, they protect you from harm and attack your foes. The spell lasts for 1 hour, requiring no concentration, or until you dismiss it (no action required). Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Circle of Spores',
        description: 'Druids of the Circle of Spores find beauty in decay. They see within mold and other fungi the ability to transform lifeless material into abundant, albeit somewhat strange, life. These druids believe that life and death are portions of a grand cycle, with one leading to the other and then back again.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                2: ['chill-touch'],
                3: ['blindness-deafness', 'gentle-repose'],
                5: ['animate-dead', 'gaseous-form'],
                7: ['blight', 'confusion'],
                9: ['cloudkill', 'contagion'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            2: [
                {
                    name: 'Circle Spells',
                    level: 2,
                    description: 'Your symbiotic link to fungus and your ability to tap into the cycle of life and death grants you access to certain spells. You gain the chill touch cantrip. At 3rd, 5th, 7th, and 9th level you gain access to the spells listed for that level in the Circle of Spores Spells table. Once you gain access to one of these spells, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.',
                    actionType: 'passive',
                },
                {
                    name: 'Halo of Spores',
                    level: 2,
                    description: 'You are surrounded by invisible, necrotic spores that are harmless until you unleash them on a creature nearby. When a creature you can see moves into a space within 10 feet of you or starts its turn there, you can use your reaction to deal 1d4 necrotic damage to that creature unless it succeeds on a Constitution saving throw against your spell save DC. The necrotic damage increases to 1d6 at 6th level, 1d8 at 10th level, and 1d10 at 14th level.',
                    actionType: 'reaction',
                    damage: {
                        dice: '1d4',
                        type: 'necrotic',
                        scaling: 'Increases: 1d4 (2nd), 1d6 (6th), 1d8 (10th), 1d10 (14th)',
                    },
                },
                {
                    name: 'Symbiotic Entity',
                    level: 2,
                    description: 'You gain the ability to channel magic into your spores. As an action, you can expend a use of your Wild Shape feature to awaken those spores, rather than transforming into a beast form, and you gain 4 temporary hit points for each level you have in this class. While this feature is active, you gain the following benefits: When you deal your Halo of Spores damage, roll the damage die a second time and add it to the total. Your melee weapon attacks deal an extra 1d6 necrotic damage to any target they hit. These benefits last for 10 minutes, until you lose all these temporary hit points, or until you use your Wild Shape again.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Fungal Infestation',
                    level: 6,
                    description: 'Your spores gain the ability to infest a humanoid corpse and animate it. If a beast or a humanoid that is Small or Medium dies within 10 feet of you, you can use your reaction to animate it, causing it to stand up immediately with 1 hit point. The creature uses the Zombie stat block in the Monster Manual. It remains animate for 1 hour, after which time it collapses and dies. In combat, the zombie\'s turn is immediately after yours. It obeys your mental commands, and the only action it can take is the Attack action, making one melee attack. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Spreading Spores',
                    level: 10,
                    description: 'You gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute. The spores disappear early if you use this feature again, if you dismiss them as a bonus action, or if your Symbiotic Entity feature is no longer active. Whenever a creature moves into the cube or starts its turn there, that creature takes your Halo of Spores damage, unless the creature succeeds on a Constitution saving throw against your spell save DC. A creature can take this damage no more than once per turn. While the cube of spores persists, you can\'t use your Halo of Spores reaction.',
                    actionType: 'bonus action',
                },
            ],
            14: [
                {
                    name: 'Fungal Body',
                    level: 14,
                    description: 'The fungal spores in your body alter you: you can\'t be blinded, deafened, frightened, or poisoned, and any critical hit against you counts as a normal hit instead, unless you\'re incapacitated.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Circle of Stars',
        description: 'The Circle of Stars allows druids to draw on the power of starlight. These druids have tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations. By revealing and understanding these secrets, the Circle of the Stars seeks to harness the powers of the cosmos.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                2: ['guiding-bolt'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            2: [
                {
                    name: 'Star Map',
                    level: 2,
                    description: 'You\'ve created a star chart as part of your heavenly studies. It is a Tiny object and can serve as a spellcasting focus for your druid spells. You determine its form (scroll, stone tablet, spellbook, etc.). If you lose your star map, you can perform a 1-hour ceremony to magically create a replacement. While holding this map, you have the following benefits: You know the guidance cantrip. You have the guiding bolt spell prepared. It counts as a druid spell for you, and it doesn\'t count against the number of spells you can have prepared. You can cast guiding bolt without expending a spell slot. You can do so a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                },
                {
                    name: 'Starry Form',
                    level: 2,
                    description: 'As a bonus action, you can expend a use of your Wild Shape feature to take on a starry form, rather than transforming into a beast. While in your starry form, you retain your game statistics, but your body becomes luminous; your joints glimmer like stars, and glowing lines connect them as on a star chart. This form sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The form lasts for 10 minutes. It ends early if you dismiss it (no action required), are incapacitated, die, or use this feature again. Whenever you assume your starry form, choose which of the following constellations glimmers on your body: Archer (ranged spell attack bonus action), Chalice (healing boost), Dragon (Int/Wis check and Con save bonus).',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Cosmic Omen',
                    level: 6,
                    description: 'Whenever you finish a long rest, you can consult your Star Map for omens. When you do so, roll a die. Until you finish your next long rest, you gain access to a special reaction based on whether you rolled an even or an odd number on the die: Weal (even): Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and add the number rolled to the total. Woe (odd): Whenever a creature you can see within 30 feet of you is about to make an attack roll, a saving throw, or an ability check, you can use your reaction to roll a d6 and subtract the number rolled from the total. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Twinkling Constellations',
                    level: 10,
                    description: 'The constellations of your Starry Form improve. The Archer, the Chalice, and the Dragon benefit from a 1d8 increase: Archer deals 2d8, Chalice heals 2d8, and Dragon grants +1d8 bonus.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Full of Stars',
                    level: 14,
                    description: 'While in your Starry Form, you become partially incorporeal, giving you resistance to bludgeoning, piercing, and slashing damage.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Circle of Wildfire',
        description: 'Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation, such as when a forest fire promotes later growth. These druids bond with a primal spirit that harbors both destructive and creative power, allowing the druids to create controlled flames that burn away one thing but give life to another.',
        class: 'druid',
        subclass_level: 2,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                2: ['burning-hands', 'cure-wounds'],
                3: ['flaming-sphere', 'scorching-ray'],
                5: ['plant-growth', 'revivify'],
                7: ['aura-of-life', 'fire-shield'],
                9: ['flame-strike', 'mass-cure-wounds'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            2: [
                {
                    name: 'Circle Spells',
                    level: 2,
                    description: 'You have formed a bond with a wildfire spirit, a primal being of creation and destruction. Your link with this spirit grants you access to certain spells. At 2nd level and again at 3rd, 5th, 7th, and 9th level, you gain access to the spells listed for that level in the Circle of Wildfire Spells table. Once you gain access to one of these spells, you always have it prepared, and it doesn\'t count against the number of spells you can prepare each day.',
                    actionType: 'passive',
                },
                {
                    name: 'Summon Wildfire Spirit',
                    level: 2,
                    description: 'You can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your wildfire spirit, rather than assuming a beast form. The spirit appears in an unoccupied space of your choice that you can see within 30 feet of you. Each creature within 10 feet of the spirit (other than you) when it appears must succeed on a Dexterity saving throw against your spell save DC or take 2d6 fire damage. The spirit is friendly to you and your companions and obeys your commands. It uses the Wildfire Spirit stat block. In combat, the spirit shares your initiative and takes its turn immediately after yours. The spirit manifests for 1 hour, until it is reduced to 0 hit points, until you use this feature to summon the spirit again, or until you die.',
                    actionType: 'action',
                    damage: {
                        dice: '2d6',
                        type: 'fire',
                        scaling: 'Summon damage when spirit appears',
                    },
                },
            ],
            6: [
                {
                    name: 'Enhanced Bond',
                    level: 6,
                    description: 'The bond with your wildfire spirit enhances your destructive and restorative spells. Whenever you cast a spell that deals fire damage or restores hit points while your wildfire spirit is summoned, roll a d8, and you gain a bonus equal to the number rolled to one damage or healing roll of the spell. In addition, when you cast a spell with a range other than self, the spell can originate from you or your wildfire spirit.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Cauterizing Flames',
                    level: 10,
                    description: 'You gain the ability to turn death into magical flames that can heal or incinerate. When a Small or larger creature dies within 30 feet of you or your wildfire spirit, a harmless spectral flame springs forth in the dead creature\'s space and flickers there for 1 minute. When a creature you can see enters that space, you can use your reaction to extinguish the spectral flame there and either heal the creature or deal fire damage to it. The healing or damage equals 2d10 + your Wisdom modifier. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Blazing Revival',
                    level: 14,
                    description: 'The bond with your wildfire spirit can save you from death. If the spirit is within 120 feet of you when you are reduced to 0 hit points and thereby fall unconscious, you can cause the spirit to drop to 0 hit points. You then regain half your hit points and immediately rise to your feet. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // FIGHTER SUBCLASSES (Martial Archetypes)
    // ═══════════════════════════════════════════════════════════════════
    
    // Note: Fighter subclass features appear at levels 3, 7, 10, 15, 18
    
    {
        name: 'Champion',
        description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Improved Critical',
                    level: 3,
                    description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.',
                    actionType: 'passive',
                },
            ],
            7: [
                {
                    name: 'Remarkable Athlete',
                    level: 7,
                    description: 'You can add half your proficiency bonus (rounded up) to any Strength, Dexterity, or Constitution check you make that doesn\'t already use your proficiency bonus. In addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Additional Fighting Style',
                    level: 10,
                    description: 'You can choose a second option from the Fighting Style class feature.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Superior Critical',
                    level: 15,
                    description: 'Your weapon attacks score a critical hit on a roll of 18-20.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Survivor',
                    level: 18,
                    description: 'You attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don\'t gain this benefit if you have 0 hit points.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Battle Master',
        description: 'Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry, but those who do are well-rounded fighters of great skill and knowledge.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        resources: [
            {
                name: 'Superiority Dice',
                type: 'superiority_dice',
                uses: { 3: 4, 7: 5, 15: 6 },
                restType: 'short',
                levelGained: 3,
                diceType: 'd8 (d10 at 10th, d12 at 18th)',
                description: 'You have superiority dice, which are expended when you use them to fuel maneuvers. You regain all expended superiority dice when you finish a short or long rest.',
            },
        ],
        
        features: {
            3: [
                {
                    name: 'Combat Superiority',
                    level: 3,
                    description: 'You learn maneuvers that are fueled by special dice called superiority dice. You learn three maneuvers of your choice (from options like Disarming Attack, Feinting Attack, Goading Attack, Menacing Attack, Precision Attack, Riposte, Trip Attack, etc.). You learn two additional maneuvers at 7th, 10th, and 15th level. You have four superiority dice, which are d8s. A superiority die is expended when you use it. You regain all expended superiority dice when you finish a short or long rest. You gain another superiority die at 7th level and one more at 15th level.',
                    actionType: 'special',
                    scaling: 'Maneuvers known: 3 (3rd), 5 (7th), 7 (10th), 9 (15th). Superiority dice: 4d8 (3rd), 5d8 (7th), 5d10 (10th), 6d10 (15th), 6d12 (18th)',
                },
                {
                    name: 'Student of War',
                    level: 3,
                    description: 'You gain proficiency with one type of artisan\'s tools of your choice.',
                    actionType: 'passive',
                },
            ],
            7: [
                {
                    name: 'Know Your Enemy',
                    level: 7,
                    description: 'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics: Strength score, Dexterity score, Constitution score, Armor Class, Current hit points, Total class levels, Fighter class levels.',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Improved Combat Superiority',
                    level: 10,
                    description: 'Your superiority dice turn into d10s.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Relentless',
                    level: 15,
                    description: 'When you roll initiative and have no superiority dice remaining, you regain one superiority die.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Improved Combat Superiority (d12)',
                    level: 18,
                    description: 'Your superiority dice turn into d12s.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Eldritch Knight',
        description: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic: abjuration and evocation.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        spells: {
            cantripsKnown: { 3: 2, 10: 3 },
            spellsKnown: { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7, 11: 8, 13: 9, 14: 10, 16: 11, 19: 12, 20: 13 },
            spellSlots: {
                3: { 1: 2 },
                4: { 1: 3 },
                7: { 1: 4, 2: 2 },
                8: { 1: 4, 2: 3 },
                10: { 1: 4, 2: 3, 3: 2 },
                11: { 1: 4, 2: 3, 3: 3 },
                13: { 1: 4, 2: 3, 3: 3, 4: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 2 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
            },
            spellcastingAbility: 'int',
            progression: 'third', // Third caster
            restriction: 'Must choose spells from wizard list, primarily abjuration and evocation',
        },
        
        features: {
            3: [
                {
                    name: 'Spellcasting',
                    level: 3,
                    description: 'You augment your martial prowess with the ability to cast spells. You learn two cantrips and three 1st-level wizard spells. Two of the three must be from the abjuration and evocation schools. Intelligence is your spellcasting ability. You learn additional spells as you level up, with most spells required to be from abjuration or evocation schools.',
                    actionType: 'special',
                },
                {
                    name: 'Weapon Bond',
                    level: 3,
                    description: 'You learn a ritual that creates a magical bond between yourself and one weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. The weapon must be within your reach throughout the ritual. Once you have bonded a weapon to yourself, you can\'t be disarmed of that weapon unless you are incapacitated. If it is on the same plane of existence, you can summon that weapon as a bonus action, causing it to teleport instantly to your hand. You can have up to two bonded weapons, but can summon only one at a time. If you attempt to bond with a third weapon, you must break the bond with one of the other two.',
                    actionType: 'bonus action',
                },
            ],
            7: [
                {
                    name: 'War Magic',
                    level: 7,
                    description: 'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.',
                    actionType: 'bonus action',
                },
            ],
            10: [
                {
                    name: 'Eldritch Strike',
                    level: 10,
                    description: 'You learn how to make your weapon strikes undercut a creature\'s resistance to your spells. When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Arcane Charge',
                    level: 15,
                    description: 'You gain the ability to teleport up to 30 feet to an unoccupied space you can see when you use your Action Surge. You can teleport before or after the additional action.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Improved War Magic',
                    level: 18,
                    description: 'When you use your action to cast a spell, you can make one weapon attack as a bonus action.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    {
        name: 'Cavalier',
        description: 'The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner. Cavaliers also learn how to guard those in their charge from harm, often serving as the protectors of their superiors and of the weak.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        proficiencies: {
            skills: ['Choose one from Animal Handling, History, Insight, Performance, or Persuasion'],
        },
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiency',
                    level: 3,
                    description: 'You gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Born to the Saddle',
                    level: 3,
                    description: 'Your mastery as a rider becomes apparent. You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you\'re not incapacitated. Mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed.',
                    actionType: 'passive',
                },
                {
                    name: 'Unwavering Mark',
                    level: 3,
                    description: 'You can menace your foes, foiling their attacks and punishing them for harming others. When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. A marked creature has disadvantage on any attack roll against a target other than you or someone else who marked it. If a marked creature deals damage to anyone other than you, you can make a special melee weapon attack against the marked creature as a bonus action on your next turn. This attack has advantage, and if it hits, it deals extra damage equal to half your fighter level. You can make this special attack a number of times equal to your Strength modifier (minimum of once), and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Strength modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            7: [
                {
                    name: 'Warding Maneuver',
                    level: 7,
                    description: 'You learn to fend off strikes directed at you, your mount, or other creatures nearby. If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you\'re wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target\'s AC against that attack. If the attack still hits, the target has resistance against the attack\'s damage. You can use this feature a number of times equal to your Constitution modifier (minimum of once), and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Constitution modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Hold the Line',
                    level: 10,
                    description: 'You become a master of locking down your enemies. Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target\'s speed is reduced to 0 until the end of the current turn.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Ferocious Charger',
                    level: 15,
                    description: 'You can run down your foes, whether you\'re mounted or not. If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this feature only once on each of your turns.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Vigilant Defender',
                    level: 18,
                    description: 'You respond to danger with extraordinary vigilance. In combat, you get a special reaction that you can take once on every creature\'s turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can\'t use it on the same turn that you take your normal reaction.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Samurai',
        description: 'The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A Samurai\'s resolve is nearly unbreakable, and the enemies in a Samurai\'s path have two choices: yield or die fighting.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        proficiencies: {
            skills: ['Choose one from History, Insight, Performance, or Persuasion'],
        },
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiency',
                    level: 3,
                    description: 'You gain proficiency in one of the following skills of your choice: History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.',
                    actionType: 'passive',
                },
                {
                    name: 'Fighting Spirit',
                    level: 3,
                    description: 'Your intensity in battle can shield you and help you strike true. As a bonus action on your turn, you can give yourself advantage on weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points. The number of temporary hit points increases when you reach certain levels in this class, increasing to 10 at 10th level and 15 at 15th level. You can use this feature three times, and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '3',
                    restType: 'long',
                    scaling: 'Temp HP: 5 (3rd), 10 (10th), 15 (15th)',
                },
            ],
            7: [
                {
                    name: 'Elegant Courtier',
                    level: 7,
                    description: 'Your discipline and attention to detail allow you to excel in social situations. Whenever you make a Charisma (Persuasion) check, you gain a bonus to the check equal to your Wisdom modifier. Your self-control also causes you to gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Tireless Spirit',
                    level: 10,
                    description: 'When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Rapid Strike',
                    level: 15,
                    description: 'You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action. You can do so no more than once per turn.',
                    actionType: 'special',
                },
            ],
            18: [
                {
                    name: 'Strength Before Death',
                    level: 18,
                    description: 'Your fighting spirit can delay the grasp of death. If you take damage that reduces you to 0 hit points and doesn\'t kill you outright, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn, interrupting the current turn. While you have 0 hit points during that extra turn, taking damage causes death saving throw failures as normal, and three death saving throw failures can still kill you. When the extra turn ends, you fall unconscious if you still have 0 hit points. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Arcane Archer',
        description: 'An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        proficiencies: {
            skills: ['Choose one from Arcana or Nature'],
        },
        
        resources: [
            {
                name: 'Arcane Shot',
                type: 'other',
                uses: { 3: 2, 7: 2, 15: 2, 18: 2 },
                restType: 'short',
                levelGained: 3,
                description: 'You have two uses of Arcane Shot, and you regain all expended uses when you finish a short or long rest.',
            },
        ],
        
        features: {
            3: [
                {
                    name: 'Arcane Archer Lore',
                    level: 3,
                    description: 'You learn magical theory or some of the secrets of nature. You gain proficiency in either the Arcana or the Nature skill (your choice). You also learn either the prestidigitation or the druidcraft cantrip.',
                    actionType: 'passive',
                },
                {
                    name: 'Arcane Shot',
                    level: 3,
                    description: 'You learn to unleash special magical effects with some of your shots. When you gain this feature, you learn two Arcane Shot options of your choice (from: Banishing Arrow, Beguiling Arrow, Bursting Arrow, Enfeebling Arrow, Grasping Arrow, Piercing Arrow, Seeking Arrow, Shadow Arrow). Once per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Arcane Shot options to that arrow. You decide to use the option when the arrow hits a creature, unless the option doesn\'t involve an attack roll. You have two uses of this ability, and you regain all expended uses when you finish a short or long rest. You gain an additional Arcane Shot option at 7th, 10th, 15th, and 18th level.',
                    actionType: 'special',
                    usesPerRest: '2',
                    restType: 'short',
                    scaling: 'Arcane Shot options known: 2 (3rd), 3 (7th), 4 (10th), 5 (15th), 6 (18th)',
                },
            ],
            7: [
                {
                    name: 'Magic Arrow',
                    level: 7,
                    description: 'You gain the ability to infuse arrows with magic. Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. The magic fades from the arrow immediately after it hits or misses its target.',
                    actionType: 'passive',
                },
                {
                    name: 'Curving Shot',
                    level: 7,
                    description: 'You learn how to direct an errant arrow toward a new target. When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target.',
                    actionType: 'bonus action',
                },
            ],
            10: [
                {
                    name: 'Arcane Shot Improvement',
                    level: 10,
                    description: 'You gain an additional Arcane Shot option of your choice.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Ever-Ready Shot',
                    level: 15,
                    description: 'Your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Arcane Shot Improvement',
                    level: 18,
                    description: 'You gain an additional Arcane Shot option of your choice.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Psi Warrior',
        description: 'Awake to the psionic power within, a Psi Warrior is a fighter who augments their physical might with psi-infused weapon strikes, telekinetic lashes, and barriers of mental force. Many githyanki train to become such warriors, as do some of the most disciplined high elves.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        resources: [
            {
                name: 'Psionic Energy Dice',
                type: 'psionic_energy',
                uses: { 3: 'proficiency bonus', 5: 'proficiency bonus × 2' },
                restType: 'long',
                levelGained: 3,
                diceType: 'd6 (d8 at 5th, d10 at 11th, d12 at 17th)',
                description: 'You harbor a wellspring of psionic energy. You have a number of Psionic Energy dice equal to twice your proficiency bonus. The die starts as a d6 and changes as you gain fighter levels.',
            },
        ],
        
        features: {
            3: [
                {
                    name: 'Psionic Power',
                    level: 3,
                    description: 'You harbor a wellspring of psionic energy within yourself. This energy is represented by your Psionic Energy dice, which are each a d6. You have a number of these dice equal to twice your proficiency bonus, and they fuel various psionic powers you have, which are detailed below. You can use the following powers: Protective Field (reduce damage as reaction), Psionic Strike (add force damage to weapon attack), Telekinetic Movement (move object or creature 30 feet as action).',
                    actionType: 'special',
                    scaling: 'Psionic Energy dice: d6 (3rd), d8 (5th), d10 (11th), d12 (17th). Number: 2× proficiency bonus',
                },
            ],
            7: [
                {
                    name: 'Telekinetic Adept',
                    level: 7,
                    description: 'You have mastered new ways to use your telekinetic abilities. You can cast the mage hand cantrip, and the hand is invisible. You also gain two new uses for your Psionic Energy dice: Psi-Powered Leap (as bonus action, gain flying speed equal to twice walking speed until end of turn), Telekinetic Thrust (when you deal Psionic Strike damage, target makes Str save or be knocked prone or moved 10 feet).',
                    actionType: 'special',
                },
            ],
            10: [
                {
                    name: 'Guarded Mind',
                    level: 10,
                    description: 'The psionic energy flowing through you has bolstered your mind. You have resistance to psychic damage. Moreover, if you start your turn charmed or frightened, you can expend a Psionic Energy die and end every effect on yourself subjecting you to those conditions.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Bulwark of Force',
                    level: 15,
                    description: 'You can shield yourself and others with telekinetic force. As a bonus action, you can choose creatures, which can include you, that you can see within 30 feet of you, up to a number of creatures equal to your Intelligence modifier (minimum of one creature). Each of the chosen creatures is protected by half cover for 1 minute or until you\'re incapacitated. Once you take this bonus action, you can\'t do so again until you finish a long rest, unless you expend a Psionic Energy die to take it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1 (or expend Psionic Energy die)',
                    restType: 'long',
                },
            ],
            18: [
                {
                    name: 'Telekinetic Master',
                    level: 18,
                    description: 'Your ability to move creatures and objects with your mind is matched by few. You can cast the telekinesis spell, requiring no components, and your spellcasting ability for the spell is Intelligence. On each of your turns while you concentrate on the spell, including the turn when you cast it, you can make one attack with a weapon as a bonus action. Once you cast the spell with this feature, you can\'t do so again until you finish a long rest, unless you expend a Psionic Energy die to cast it again.',
                    actionType: 'special',
                    usesPerRest: '1 (or expend Psionic Energy die)',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Rune Knight',
        description: 'Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants. Rune cutters can be found among any family of giants, and you likely learned your methods first or second hand from such a mystical artisan.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        proficiencies: {
            tools: ['smith\'s tools'],
        },
        
        resources: [
            {
                name: 'Giant\'s Might',
                type: 'other',
                uses: { 3: 'proficiency bonus' },
                restType: 'long',
                levelGained: 3,
                description: 'You can invoke the might of giants. You can use this feature a number of times equal to your proficiency bonus.',
            },
        ],
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency with smith\'s tools, and you learn to speak, read, and write Giant.',
                    actionType: 'passive',
                },
                {
                    name: 'Rune Carver',
                    level: 3,
                    description: 'You can use magic runes to enhance your gear. You learn two runes of your choice from among the runes described below (Cloud, Fire, Frost, Stone, Hill, Storm, etc.), and you learn an additional rune at 7th, 10th, and 15th level. Whenever you finish a long rest, you can touch a number of objects equal to the number of runes you know, and you inscribe a different rune onto each of the objects. An object can bear only one of your runes at a time. Each rune has a passive property and an active property (invoke property). You can invoke a rune a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    scaling: 'Runes known: 2 (3rd), 3 (7th), 4 (10th), 5 (15th)',
                },
                {
                    name: 'Giant\'s Might',
                    level: 3,
                    description: 'You have learned how to imbue yourself with the might of giants. As a bonus action, you magically gain the following benefits, which last for 1 minute: If you are smaller than Large, you become Large, along with anything you are wearing. Your size increases by one category—from Medium to Large, for example. Your weapons also grow to match your new size. You have advantage on Strength checks and Strength saving throws. Once on each of your turns, one of your attacks with a weapon or an unarmed strike can deal extra damage to a target on a hit. The extra damage equals 1d6 (1d8 at 10th level, 1d10 at 18th level). You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                    damage: {
                        dice: '1d6',
                        type: 'extra weapon damage',
                        scaling: 'Increases: 1d6 (3rd), 1d8 (10th), 1d10 (18th)',
                    },
                },
            ],
            7: [
                {
                    name: 'Runic Shield',
                    level: 7,
                    description: 'You learn to invoke your rune magic to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to force the attacker to reroll the d20 and use the new roll. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Great Stature',
                    level: 10,
                    description: 'The magic of your runes permanently alters you. When you gain this feature, roll 3d4. You grow a number of inches in height equal to the roll. Moreover, the extra damage you deal with your Giant\'s Might feature increases to 1d8.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Master of Runes',
                    level: 15,
                    description: 'You can invoke each rune you know from your Rune Carver feature twice, rather than once, and you regain all expended uses when you finish a short or long rest.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Runic Juggernaut',
                    level: 18,
                    description: 'You learn how to amplify your rune-powered transformation. When you use Giant\'s Might, your size can increase to Huge, and while you are that size or smaller, your reach increases by 5 feet. Moreover, the extra damage you deal with Giant\'s Might increases to 1d10.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Echo Knight',
        description: 'A mysterious and feared frontline warrior of the Kryn Dynasty, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle. Surrounded by echoes of their own might, they charge into the fray as a cycling swarm of shadows and strikes.',
        class: 'fighter',
        subclass_level: 3,
        sourcebook: 'EGtW',
        
        features: {
            3: [
                {
                    name: 'Manifest Echo',
                    level: 3,
                    description: 'You can use a bonus action to magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you\'re incapacitated. Your echo has AC 14 + your proficiency bonus, 1 hit point, and immunity to all conditions. If it has to make a saving throw, it uses your saving throw bonus. On your turn, you can mentally command the echo to move up to 30 feet in any direction (no action required). You can use the echo in various ways: make attacks originate from its space, swap places with it (15 feet, unlimited uses), make opportunity attacks from its space.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Unleash Incarnation',
                    level: 3,
                    description: 'You can heighten your echo\'s fury. Whenever you take the Attack action, you can make one additional melee attack from the echo\'s position. You can use this feature a number of times equal to your Constitution modifier (minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Constitution modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            7: [
                {
                    name: 'Echo Avatar',
                    level: 7,
                    description: 'You can temporarily transfer your consciousness to your echo. As an action, you can see through your echo\'s eyes and hear through its ears. During this time, you are deafened and blinded. You can sustain this effect for up to 10 minutes, and you can end it at any time (requires no action). While your echo is being used in this way, it can be up to 1,000 feet away from you without being destroyed.',
                    actionType: 'action',
                },
            ],
            10: [
                {
                    name: 'Shadow Martyr',
                    level: 10,
                    description: 'You can make your echo throw itself in front of an attack directed at another creature that you can see. Before the attack roll is made, you can use your reaction to teleport the echo to an unoccupied space within 5 feet of the targeted creature. The attack roll that triggered the reaction is instead made against your echo. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            15: [
                {
                    name: 'Reclaim Potential',
                    level: 15,
                    description: 'You\'ve learned to absorb the fleeting magic of your echo. When an echo of yours is destroyed by taking damage, you can gain a number of temporary hit points equal to 2d6 + your Constitution modifier, provided you don\'t already have temporary hit points. You can use this feature a number of times equal to your Constitution modifier (minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Constitution modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            18: [
                {
                    name: 'Legion of One',
                    level: 18,
                    description: 'You can use a bonus action to create two echoes with your Manifest Echo feature, and these echoes can coexist. If you try to create a third echo, the previous two echoes are destroyed. Anything you can do from one echo\'s position can be done from the other\'s instead. In addition, when you roll initiative and have no uses of your Unleash Incarnation feature left, you regain one use of that feature.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // MONK SUBCLASSES (Monastic Traditions)
    // ═══════════════════════════════════════════════════════════════════
    
    // Note: Monk subclass features appear at levels 3, 6, 11, 17
    
    {
        name: 'Way of the Open Hand',
        description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat, whether armed or unarmed. They learn techniques to push and trip their opponents, manipulate ki to heal damage to their bodies, and practice advanced meditation that can protect them from harm.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Open Hand Technique',
                    level: 3,
                    description: 'You can manipulate your enemy\'s ki when you harness your own. Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of the following effects on that target: It must succeed on a Dexterity saving throw or be knocked prone. It must make a Strength saving throw. If it fails, you can push it up to 15 feet away from you. It can\'t take reactions until the end of your next turn.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Wholeness of Body',
                    level: 6,
                    description: 'You gain the ability to heal yourself. As an action, you can regain hit points equal to three times your monk level. You must finish a long rest before you can use this feature again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            11: [
                {
                    name: 'Tranquility',
                    level: 11,
                    description: 'You can enter a special meditation that surrounds you with an aura of peace. At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest (the spell can end early as normal). The saving throw DC for the spell equals 8 + your Wisdom modifier + your proficiency bonus.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Quivering Palm',
                    level: 17,
                    description: 'You gain the ability to set up lethal vibrations in someone\'s body. When you hit a creature with an unarmed strike, you can spend 3 ki points to start these imperceptible vibrations, which last for a number of days equal to your monk level. The vibrations are harmless unless you use your action to end them. To do so, you and the target must be on the same plane of existence. When you use this action, the creature must make a Constitution saving throw. If it fails, it is reduced to 0 hit points. If it succeeds, it takes 10d10 necrotic damage. You can have only one creature under the effect of this feature at a time. You can choose to end the vibrations harmlessly without using an action.',
                    actionType: 'special',
                    damage: {
                        dice: '10d10',
                        type: 'necrotic',
                        scaling: 'Or reduced to 0 HP on failed save',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Way of Shadow',
        description: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge. These monks might be called ninjas or shadowdancers, and they serve as spies and assassins. Sometimes the members of a ninja monastery are family members, forming a clan sworn to secrecy about their arts and missions.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Shadow Arts',
                    level: 3,
                    description: 'You can use your ki to duplicate the effects of certain spells. As an action, you can spend 2 ki points to cast darkness, darkvision, pass without trace, or silence, without providing material components. Additionally, you gain the minor illusion cantrip if you don\'t already know it.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Shadow Step',
                    level: 6,
                    description: 'You gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action you can teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness. You then have advantage on the first melee attack you make before the end of the turn.',
                    actionType: 'bonus action',
                },
            ],
            11: [
                {
                    name: 'Cloak of Shadows',
                    level: 11,
                    description: 'You have learned to become one with the shadows. When you are in an area of dim light or darkness, you can use your action to become invisible. You remain invisible until you make an attack, cast a spell, or are in an area of bright light.',
                    actionType: 'action',
                },
            ],
            17: [
                {
                    name: 'Opportunist',
                    level: 17,
                    description: 'You can exploit a creature\'s momentary distraction when it is hit by an attack. Whenever a creature within 5 feet of you is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    
    {
        name: 'Way of the Four Elements',
        description: 'You follow a monastic tradition that teaches you to harness the elements. When you focus your ki, you can align yourself with the forces of creation and bend the four elements to your will, using them as an extension of your body.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Disciple of the Elements',
                    level: 3,
                    description: 'You learn magical disciplines that harness the power of the four elements. A discipline requires you to spend ki points each time you use it. You know the Elemental Attunement discipline and one other elemental discipline of your choice (from: Fangs of the Fire Snake, Fist of Four Thunders, Fist of Unbroken Air, Rush of the Gale Spirits, Shape the Flowing River, Sweeping Cinder Strike, Water Whip, and more). You learn one additional elemental discipline at 6th, 11th, and 17th level. Whenever you learn a new elemental discipline, you can also replace one you already know with a different one.',
                    actionType: 'special',
                    scaling: 'Disciplines known: 2 (3rd), 3 (6th), 4 (11th), 5 (17th)',
                },
            ],
            6: [
                {
                    name: 'Extra Elemental Discipline',
                    level: 6,
                    description: 'You learn one additional elemental discipline of your choice.',
                    actionType: 'passive',
                },
            ],
            11: [
                {
                    name: 'Extra Elemental Discipline',
                    level: 11,
                    description: 'You learn one additional elemental discipline of your choice.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Extra Elemental Discipline',
                    level: 17,
                    description: 'You learn one additional elemental discipline of your choice.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Way of the Long Death',
        description: 'Monks of the Way of the Long Death are obsessed with the meaning and mechanics of dying. They capture creatures and prepare elaborate experiments to capture, record, and understand the moments of their demise. They use this knowledge to guide their understanding of martial arts, yielding a deadly fighting style.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'SCAG',
        
        features: {
            3: [
                {
                    name: 'Touch of Death',
                    level: 3,
                    description: 'Your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level (minimum of 1 temporary hit point).',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Hour of Reaping',
                    level: 6,
                    description: 'You gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. When you take this action, each creature within 30 feet of you that can see you must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn.',
                    actionType: 'action',
                },
            ],
            11: [
                {
                    name: 'Mastery of Death',
                    level: 11,
                    description: 'You use your familiarity with death to escape its grasp. When you are reduced to 0 hit points, you can expend 1 ki point (no action required) to have 1 hit point instead.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Touch of the Long Death',
                    level: 17,
                    description: 'Your touch can channel the energy of death into a creature. As an action, you touch one creature within 5 feet of you, and you expend 1 to 10 ki points. The target must make a Constitution saving throw, and it takes 2d10 necrotic damage per ki point spent on a failed save, or half as much damage on a successful one.',
                    actionType: 'action',
                    damage: {
                        dice: '2d10 per ki point',
                        type: 'necrotic',
                        scaling: 'Scales with ki points spent (1-10)',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Way of the Sun Soul',
        description: 'Monks of the Way of the Sun Soul learn to channel their life energy into searing bolts of light. They teach that meditation can unlock the ability to unleash the indomitable light shed by the soul of every living creature.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Radiant Sun Bolt',
                    level: 3,
                    description: 'You can hurl searing bolts of magical radiance. You gain a new attack option that you can use with the Attack action. This special attack is a ranged spell attack with a range of 30 feet. You are proficient with it, and you add your Dexterity modifier to its attack and damage rolls. Its damage is radiant, and its damage die is a d4. This die changes as you gain monk levels (same as Martial Arts die). When you take the Attack action on your turn and use this special attack as part of it, you can spend 1 ki point to make the special attack twice as a bonus action. When you gain the Extra Attack feature, this special attack can be used for any of the attacks you make as part of the Attack action.',
                    actionType: 'special',
                    damage: {
                        dice: 'Martial Arts die',
                        type: 'radiant',
                        scaling: 'Uses Martial Arts die progression',
                    },
                },
            ],
            6: [
                {
                    name: 'Searing Arc Strike',
                    level: 6,
                    description: 'You gain the ability to channel your ki into searing waves of energy. Immediately after you take the Attack action on your turn, you can spend 2 ki points to cast the burning hands spell as a bonus action. You can spend additional ki points to cast burning hands as a higher-level spell. Each additional ki point you spend increases the spell\'s level by 1. The maximum number of ki points (2 plus any additional points) that you can spend on the spell equals half your monk level.',
                    actionType: 'bonus action',
                },
            ],
            11: [
                {
                    name: 'Searing Sunburst',
                    level: 11,
                    description: 'You gain the ability to create an orb of light that erupts into a devastating explosion. As an action, you magically create an orb and hurl it at a point you choose within 150 feet, where it erupts into a sphere of radiant light for a brief but deadly instant. Each creature in that 20-foot-radius sphere must succeed on a Constitution saving throw or take 2d6 radiant damage. A creature doesn\'t need to make the save if the creature is behind total cover that is opaque. You can increase the sphere\'s damage by spending ki points. Each point you spend, to a maximum of 3, increases the damage by 2d6.',
                    actionType: 'action',
                    damage: {
                        dice: '2d6 (up to 8d6 with 3 ki)',
                        type: 'radiant',
                        scaling: '+2d6 per ki point spent (max 3 ki)',
                    },
                },
            ],
            17: [
                {
                    name: 'Sun Shield',
                    level: 17,
                    description: 'You become wreathed in a luminous, magical aura. You shed bright light in a 30-foot radius and dim light for an additional 30 feet. You can extinguish or restore the light as a bonus action. If a creature hits you with a melee attack while this light shines, you can use your reaction to deal radiant damage to the creature. The radiant damage equals 5 + your Wisdom modifier.',
                    actionType: 'reaction',
                    damage: {
                        dice: '5 + Wisdom modifier',
                        type: 'radiant',
                        scaling: 'Scales with Wisdom modifier',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Way of the Drunken Master',
        description: 'The Way of the Drunken Master teaches its students to move with the jerky, unpredictable movements of a drunkard. A drunken master sways, tottering on unsteady feet, to present what seems like an incompetent combatant who proves frustrating to engage. The drunken master\'s erratic stumbles conceal a carefully executed dance of blocks, parries, advances, attacks, and retreats.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        proficiencies: {
            tools: ['brewer\'s supplies'],
            skills: ['Performance'],
        },
        
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency in the Performance skill if you don\'t already have it. Your martial arts technique mixes combat training with the precision of a dancer and the antics of a jester. You also gain proficiency with brewer\'s supplies if you don\'t already have it.',
                    actionType: 'passive',
                },
                {
                    name: 'Drunken Technique',
                    level: 3,
                    description: 'Whenever you use Flurry of Blows, you gain the benefit of the Disengage action, and your walking speed increases by 10 feet until the end of the current turn.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Tipsy Sway',
                    level: 6,
                    description: 'You can move in sudden, swaying ways. You gain the following benefits: Leap to Your Feet: When you\'re prone, you can stand up by spending 5 feet of movement, rather than half your speed. Redirect Attack: When a creature misses you with a melee attack roll, you can spend 1 ki point as a reaction to cause that attack to hit one creature of your choice, other than the attacker, that you can see within 5 feet of you.',
                    actionType: 'reaction',
                },
            ],
            11: [
                {
                    name: 'Drunkard\'s Luck',
                    level: 11,
                    description: 'You always seem to get a lucky bounce at the right moment. When you make an ability check, an attack roll, or a saving throw and have disadvantage, you can spend 2 ki points to cancel the disadvantage for that roll.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Intoxicated Frenzy',
                    level: 17,
                    description: 'You gain the ability to make an overwhelming number of attacks against a group of enemies. When you use your Flurry of Blows, you can make up to three additional attacks with it (up to a total of five Flurry of Blows attacks), provided that each Flurry of Blows attack targets a different creature this turn.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Way of the Kensei',
        description: 'Monks of the Way of the Kensei train relentlessly with their weapons, to the point where the weapon becomes an extension of the body. Founded on a mastery of sword fighting, the tradition has expanded to include many different weapons.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        features: {
            3: [
                {
                    name: 'Path of the Kensei',
                    level: 3,
                    description: 'Your special martial arts training leads you to master the use of certain weapons. Choose two types of weapons to be your kensei weapons: one melee weapon and one ranged weapon. Each of these weapons can be any simple or martial weapon that lacks the heavy and special properties. You gain proficiency with these weapons if you don\'t already have it. Weapons of the chosen types are monk weapons for you. Many of this tradition\'s features work only with your kensei weapons. When you reach 6th, 11th, and 17th level, you can choose another type of weapon to be a kensei weapon for you. You gain the following benefits: Agile Parry, Kensei\'s Shot, Way of the Brush (calligrapher\'s or painter\'s supplies proficiency).',
                    actionType: 'special',
                    scaling: 'Kensei weapons: 2 (3rd), 3 (6th), 4 (11th), 5 (17th)',
                },
            ],
            6: [
                {
                    name: 'One with the Blade',
                    level: 6,
                    description: 'You extend your ki into your kensei weapons, granting you the following benefits: Magic Kensei Weapons: Your attacks with your kensei weapons count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. Deft Strike: When you hit a target with a kensei weapon, you can spend 1 ki point to cause the weapon to deal extra damage to the target equal to your Martial Arts die. You can use this feature only once on each of your turns.',
                    actionType: 'special',
                },
            ],
            11: [
                {
                    name: 'Sharpen the Blade',
                    level: 11,
                    description: 'You gain the ability to augment your weapons further with your ki. As a bonus action, you can expend up to 3 ki points to grant one kensei weapon you touch a bonus to attack and damage rolls when you attack with it. The bonus equals the number of ki points you spent. This bonus lasts for 1 minute or until you use this feature again. This feature has no effect on a magic weapon that already has a bonus to attack and damage rolls.',
                    actionType: 'bonus action',
                },
            ],
            17: [
                {
                    name: 'Unerring Accuracy',
                    level: 17,
                    description: 'Your mastery of weapons grants you extraordinary accuracy. If you miss with an attack roll using a monk weapon on your turn, you can reroll it. You can use this feature only once on each of your turns.',
                    actionType: 'special',
                },
            ],
        },
    },
    
    {
        name: 'Way of the Astral Self',
        description: 'A monk who follows the Way of the Astral Self believes their body is an illusion. They see their ki as a representation of their true form, an astral self. This astral self has the capacity to be a force of order or disorder, with some monasteries training students to use their power to protect the weak and other instructing aspirants in how to manifest their true selves in service to the mighty.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        features: {
            3: [
                {
                    name: 'Arms of the Astral Self',
                    level: 3,
                    description: 'Your mastery of your ki allows you to summon a portion of your astral self. As a bonus action, you can spend 1 ki point to summon the arms of your astral self. When you do so, each creature of your choice that you can see within 10 feet of you must succeed on a Dexterity saving throw or take force damage equal to two rolls of your Martial Arts die. For 10 minutes, these spectral arms hover near your shoulders or surround your arms. You determine the arms\' appearance. While the spectral arms are present, you gain the following benefits: You can use your Wisdom modifier in place of your Strength modifier when making Strength checks and Strength saving throws. You can use the spectral arms to make unarmed strikes. When you make an unarmed strike with the arms, your reach is 5 feet greater than normal, and the damage is force damage. The unarmed strikes can use your Wisdom modifier.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Visage of the Astral Self',
                    level: 6,
                    description: 'You can summon the visage of your astral self. As a bonus action, or as part of the bonus action you take to activate Arms of the Astral Self, you can spend 1 ki point to summon this visage for 10 minutes. It vanishes early if you are incapacitated or die. The spectral visage covers your face and grants you the following benefits: Astral Sight (darkvision 120 ft), Wisdom of the Spirit (advantage on Wisdom/Charisma checks), Word of the Spirit (telepathic speech).',
                    actionType: 'bonus action',
                },
            ],
            11: [
                {
                    name: 'Body of the Astral Self',
                    level: 11,
                    description: 'When you have both your astral arms and visage summoned, you can cause the body of your astral self to appear (no action required). This spectral body covers your physical form like a suit of armor, connecting with the arms and visage. You determine its appearance. While the spectral body is present, you gain the following benefits: Deflect Energy (reduce elemental damage as reaction), Empowered Arms (once per turn add Martial Arts die to Arms damage).',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Awakening of the Astral Self',
                    level: 17,
                    description: 'Your connection to your astral self is complete, allowing you to unleash its full potential. As a bonus action, you can spend 5 ki points to summon the arms, visage, and body of your astral self and awaken it for 10 minutes. This awakening ends early if you are incapacitated or die. While your astral self is awakened, you gain the following benefits: Armor of the Spirit (+2 AC), Astral Barrage (bonus action for additional Arms attack against different creature).',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    
    {
        name: 'Way of Mercy',
        description: 'Monks of the Way of Mercy learn to manipulate the life force of others to bring aid to those in need. They are wandering physicians to the poor and hurt. However, to those beyond their help—whether ailing or evil—they bring a swift end as an act of mercy. Those who follow the Way of Mercy might be members of a religious order, administering to the needy and making grim choices rooted in reality rather than idealism.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        proficiencies: {
            skills: ['Insight or Medicine'],
            tools: ['herbalism kit'],
        },
        
        features: {
            3: [
                {
                    name: 'Implements of Mercy',
                    level: 3,
                    description: 'You gain proficiency in the Insight and Medicine skills, and you gain proficiency with the herbalism kit. You also gain a special mask, which you often wear when using the features of this subclass. You determine its appearance, or generate it randomly.',
                    actionType: 'passive',
                },
                {
                    name: 'Hand of Healing',
                    level: 3,
                    description: 'Your mystical touch can mend wounds. As an action, you can spend 1 ki point to touch a creature and restore a number of hit points equal to a roll of your Martial Arts die + your Wisdom modifier. When you use your Flurry of Blows, you can replace one of the unarmed strikes with a use of this feature without spending a ki point for the healing.',
                    actionType: 'action',
                },
                {
                    name: 'Hand of Harm',
                    level: 3,
                    description: 'You use your ki to inflict wounds. When you hit a creature with an unarmed strike, you can spend 1 ki point to deal extra necrotic damage equal to one roll of your Martial Arts die + your Wisdom modifier. You can use this feature only once per turn.',
                    actionType: 'special',
                    damage: {
                        dice: 'Martial Arts die + Wisdom',
                        type: 'necrotic',
                        scaling: 'Scales with Martial Arts die',
                    },
                },
            ],
            6: [
                {
                    name: 'Physician\'s Touch',
                    level: 6,
                    description: 'You can administer even greater cures with a touch, and if you feel it\'s necessary, you can use your knowledge to cause harm. When you use Hand of Healing on a creature, you can also end one disease or one of the following conditions affecting the creature: blinded, deafened, paralyzed, poisoned, or stunned. When you use Hand of Harm on a creature, you can subject that creature to the poisoned condition until the end of your next turn.',
                    actionType: 'special',
                },
            ],
            11: [
                {
                    name: 'Flurry of Healing and Harm',
                    level: 11,
                    description: 'You can now mete out a flurry of comfort and hurt. When you use Flurry of Blows, you can now replace each of the unarmed strikes with a use of your Hand of Healing, without spending ki points for the healing. In addition, when you make an unarmed strike with Flurry of Blows, you can use Hand of Harm with that strike without spending the ki point for Hand of Harm. You can still use Hand of Harm only once per turn.',
                    actionType: 'special',
                },
            ],
            17: [
                {
                    name: 'Hand of Ultimate Mercy',
                    level: 17,
                    description: 'Your mastery of life energy opens the door to the ultimate mercy. As an action, you can touch the corpse of a creature that died within the past 24 hours and expend 5 ki points. The creature then returns to life, regaining a number of hit points equal to 4d10 + your Wisdom modifier. If the creature died while subject to any of the following conditions, it revives with them removed: blinded, deafened, paralyzed, poisoned, and stunned. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Way of the Ascendant Dragon',
        description: 'The fundamental teaching of this tradition holds that by emulating dragons, a monk becomes a more integrated part of the world and its magic. By altering their spirit to resonate with draconic might, monks who follow this tradition augment their prowess in battle, bolster their allies, and can even soar through the air on draconic wings.',
        class: 'monk',
        subclass_level: 3,
        sourcebook: 'FToD',
        
        features: {
            3: [
                {
                    name: 'Draconic Disciple',
                    level: 3,
                    description: 'You can channel draconic power to magnify your presence and imbue your unarmed strikes with the essence of a dragon\'s breath. You gain the following benefits: You learn to speak, read, and write Draconic or one other language of your choice. Draconic Strike: When you damage a target with an unarmed strike, you can change the damage type to acid, cold, fire, lightning, or poison. Tongue of Dragons: You can make Charisma (Intimidation or Persuasion) checks with advantage if it involves talking to dragons.',
                    actionType: 'passive',
                },
                {
                    name: 'Breath of the Dragon',
                    level: 3,
                    description: 'You can channel destructive waves of energy, like those created by the dragons you emulate. When you take the Attack action on your turn, you can replace one of the attacks with an exhalation of draconic energy in either a 20-foot cone or a 30-foot line that is 5 feet wide (your choice). Choose a damage type: acid, cold, fire, lightning, or poison. Each creature in that area must make a Dexterity saving throw, taking damage of the chosen type equal to two rolls of your Martial Arts die on a failed save, or half as much damage on a successful one. At 11th level, the damage increases to three rolls of your Martial Arts die. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                    damage: {
                        dice: '2× Martial Arts die (3× at 11th)',
                        type: 'acid, cold, fire, lightning, or poison',
                        scaling: 'Increases at 11th level',
                    },
                },
            ],
            6: [
                {
                    name: 'Wings Unfurled',
                    level: 6,
                    description: 'When you use your Step of the Wind, you can unfurl spectral draconic wings from your back that vanish at the end of your turn. While the wings exist, you have a flying speed equal to your walking speed. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            11: [
                {
                    name: 'Aspect of the Wyrm',
                    level: 11,
                    description: 'The power of your draconic spirit now radiates from you, warding your allies or inspiring fear in your enemies. As a bonus action, you can create an aura of draconic power in a 10-foot radius around you for 1 minute. Choose Frightful Presence (enemies must save or be frightened) or Resistance (you and allies have resistance to acid, cold, fire, lightning, or poison damage). Once you create this aura, you can\'t create it again until you finish a long rest, unless you expend 3 ki points to create it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1 (or 3 ki)',
                    restType: 'long',
                },
            ],
            17: [
                {
                    name: 'Ascendant Aspect',
                    level: 17,
                    description: 'Your draconic spirit reaches its peak. You gain the following benefits: Augment Breath (spend 1 ki to use Breath of the Dragon twice as part of same action), Blindsight (10 feet), Explosive Fury (when hit by critical, use reaction to force attacker to make Dex save or take Breath of the Dragon damage).',
                    actionType: 'special',
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // PALADIN SUBCLASSES (Sacred Oaths)
    // ═══════════════════════════════════════════════════════════════════
    
    // Note: Paladin subclass features appear at levels 3, 7, 15, 20
    
    {
        name: 'Oath of Devotion',
        description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order. Sometimes called cavaliers, white knights, or holy warriors, these paladins meet the ideal of the knight in shining armor, acting with honor in pursuit of justice and the greater good.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        spells: {
            byCharacterLevel: {
                3: ['protection-from-evil-and-good', 'sanctuary'],
                5: ['lesser-restoration', 'zone-of-truth'],
                9: ['beacon-of-hope', 'dispel-magic'],
                13: ['freedom-of-movement', 'guardian-of-faith'],
                17: ['commune', 'flame-strike'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Sacred Weapon',
                    level: 3,
                    description: 'As an action, you can imbue one weapon that you are holding with positive energy, using your Channel Divinity. For 1 minute, you add your Charisma modifier to attack rolls made with that weapon (with a minimum bonus of +1). The weapon also emits bright light in a 20-foot radius and dim light 20 feet beyond that. If the weapon is not already magical, it becomes magical for the duration. You can end this effect on your turn as part of any other action. If you are no longer holding or carrying this weapon, or if you fall unconscious, this effect ends.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Turn the Unholy',
                    level: 3,
                    description: 'As an action, you present your holy symbol and speak a prayer censuring fiends and undead, using your Channel Divinity. Each fiend or undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes damage.',
                    actionType: 'action',
                },
            ],
            7: [
                {
                    name: 'Aura of Devotion',
                    level: 7,
                    description: 'You and friendly creatures within 10 feet of you can\'t be charmed while you are conscious. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Purity of Spirit',
                    level: 15,
                    description: 'You are always under the effects of a protection from evil and good spell.',
                    actionType: 'passive',
                },
            ],
            20: [
                {
                    name: 'Holy Nimbus',
                    level: 20,
                    description: 'As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that. Whenever an enemy creature starts its turn in the bright light, the creature takes 10 radiant damage. In addition, for the duration, you have advantage on saving throws against spells cast by fiends or undead. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '10',
                        type: 'radiant',
                        scaling: 'Each turn enemy starts in bright light',
                    },
                },
            ],
        },
    },
    
    {
        name: 'Oath of the Ancients',
        description: 'The Oath of the Ancients is as old as the race of elves and the rituals of the druids. Sometimes called fey knights, green knights, or horned knights, paladins who swear this oath cast their lot with the side of the light in the cosmic struggle against darkness because they love the beautiful and life-giving things of the world.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        spells: {
            byCharacterLevel: {
                3: ['ensnaring-strike', 'speak-with-animals'],
                5: ['moonbeam', 'misty-step'],
                9: ['plant-growth', 'protection-from-energy'],
                13: ['ice-storm', 'stoneskin'],
                17: ['commune-with-nature', 'tree-stride'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Nature\'s Wrath',
                    level: 3,
                    description: 'You can use your Channel Divinity to invoke primeval forces to ensnare a foe. As an action, you can cause spectral vines to spring up and reach for a creature within 10 feet of you that you can see. The creature must succeed on a Strength or Dexterity saving throw (its choice) or be restrained. While restrained by the vines, the creature repeats the saving throw at the end of each of its turns. On a success, it frees itself and the vines vanish.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Turn the Faithless',
                    level: 3,
                    description: 'You can use your Channel Divinity to utter ancient words that are painful for fey and fiends to hear. As an action, you present your holy symbol, and each fey or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.',
                    actionType: 'action',
                },
            ],
            7: [
                {
                    name: 'Aura of Warding',
                    level: 7,
                    description: 'Ancient magic lies so heavily upon you that it forms an eldritch ward. You and friendly creatures within 10 feet of you have resistance to damage from spells. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Undying Sentinel',
                    level: 15,
                    description: 'When you are reduced to 0 hit points and are not killed outright, you can choose to drop to 1 hit point instead. Once you use this ability, you can\'t use it again until you finish a long rest. Additionally, you suffer none of the drawbacks of old age, and you can\'t be aged magically.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            20: [
                {
                    name: 'Elder Champion',
                    level: 20,
                    description: 'You can assume the form of an ancient force of nature, taking on an appearance you choose. For example, your skin might turn green or take on a bark-like texture, your hair might become leafy or moss-like, or you might sprout antlers or a lion-like mane. Using your action, you undergo a transformation. For 1 minute, you gain the following benefits: At the start of each of your turns, you regain 10 hit points. Whenever you cast a paladin spell that has a casting time of 1 action, you can cast it using a bonus action instead. Enemy creatures within 10 feet of you have disadvantage on saving throws against your paladin spells and Channel Divinity options. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oath of Vengeance',
        description: 'The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin. When evil forces slaughter helpless villagers, when an entire people turns against the will of the gods, when a thieves\' guild grows too violent and powerful, when a dragon rampages through the countryside—at times like these, paladins arise and swear an Oath of Vengeance to set right that which has gone wrong.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        spells: {
            byCharacterLevel: {
                3: ['bane', 'hunters-mark'],
                5: ['hold-person', 'misty-step'],
                9: ['haste', 'protection-from-energy'],
                13: ['banishment', 'dimension-door'],
                17: ['hold-monster', 'scrying'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Abjure Enemy',
                    level: 3,
                    description: 'As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity. Choose one creature within 60 feet of you that you can see. That creature must make a Wisdom saving throw, unless it is immune to being frightened. Fiends and undead have disadvantage on this saving throw. On a failed save, the creature is frightened for 1 minute or until it takes any damage. While frightened, the creature\'s speed is 0, and it can\'t benefit from any bonus to its speed. On a successful save, the creature\'s speed is halved for 1 minute or until the creature takes any damage.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Vow of Enmity',
                    level: 3,
                    description: 'As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity. You gain advantage on attack rolls against the creature for 1 minute or until it drops to 0 hit points or falls unconscious.',
                    actionType: 'bonus action',
                },
            ],
            7: [
                {
                    name: 'Relentless Avenger',
                    level: 7,
                    description: 'Your supernatural focus helps you close off a foe\'s retreat. When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack and as part of the same reaction. This movement doesn\'t provoke opportunity attacks.',
                    actionType: 'reaction',
                },
            ],
            15: [
                {
                    name: 'Soul of Vengeance',
                    level: 15,
                    description: 'The authority with which you speak your Vow of Enmity gives you greater power over your foe. When a creature under the effect of your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against that creature if it is within range.',
                    actionType: 'reaction',
                },
            ],
            20: [
                {
                    name: 'Avenging Angel',
                    level: 20,
                    description: 'You can assume the form of an angelic avenger. Using your action, you undergo a transformation. For 1 hour, you gain the following benefits: Wings sprout from your back and grant you a flying speed of 60 feet. You emanate an aura of menace in a 30-foot radius. The first time any enemy creature enters the aura or starts its turn there during a battle, the creature must succeed on a Wisdom saving throw or become frightened of you for 1 minute or until it takes any damage. Attack rolls against the frightened creature have advantage. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oath of Conquest',
        description: 'The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies. It isn\'t enough for these paladins to establish order. They must crush the forces of chaos. Sometimes called knight tyrants or iron mongers, those who swear this oath gather into grim orders that serve gods or philosophies of war and well-ordered might.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                3: ['armor-of-agathys', 'command'],
                5: ['hold-person', 'spiritual-weapon'],
                9: ['bestow-curse', 'fear'],
                13: ['dominate-beast', 'stoneskin'],
                17: ['cloudkill', 'dominate-person'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Conquering Presence',
                    level: 3,
                    description: 'You can use your Channel Divinity to exude a terrifying presence. As an action, you force each creature of your choice that you can see within 30 feet of you to make a Wisdom saving throw. On a failed save, a creature becomes frightened of you for 1 minute. The frightened creature can repeat this saving throw at the end of each of its turns, ending the effect on itself on a success.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Guided Strike',
                    level: 3,
                    description: 'You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.',
                    actionType: 'special',
                },
            ],
            7: [
                {
                    name: 'Aura of Conquest',
                    level: 7,
                    description: 'You constantly emanate a menacing aura while you\'re not incapacitated. The aura extends 10 feet from you in every direction, but not through total cover. If a creature is frightened of you, its speed is reduced to 0 while in the aura, and that creature takes psychic damage equal to half your paladin level if it starts its turn there. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    damage: {
                        dice: 'half paladin level',
                        type: 'psychic',
                        scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                    },
                },
            ],
            15: [
                {
                    name: 'Scornful Rebuke',
                    level: 15,
                    description: 'Those who dare to strike you are psychically punished for their audacity. Whenever a creature hits you with an attack, that creature takes psychic damage equal to your Charisma modifier (minimum of 1) if you\'re not incapacitated.',
                    actionType: 'passive',
                    damage: {
                        dice: 'Charisma modifier',
                        type: 'psychic',
                        scaling: 'Whenever hit by an attack',
                    },
                },
            ],
            20: [
                {
                    name: 'Invincible Conqueror',
                    level: 20,
                    description: 'You gain the ability to harness extraordinary martial prowess. As an action, you can magically become an avatar of conquest, gaining the following benefits for 1 minute: You have resistance to all damage. When you take the Attack action on your turn, you can make one additional attack as part of that action. Your melee weapon attacks score a critical hit on a roll of 19 or 20 on the d20. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oath of Redemption',
        description: 'The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort. Paladins who dedicate themselves to this oath believe that any person can be redeemed and that the path of benevolence and justice is one that anyone can walk. These paladins face evil creatures in the hope of turning their foes to the light.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                3: ['sanctuary', 'sleep'],
                5: ['calm-emotions', 'hold-person'],
                9: ['counterspell', 'hypnotic-pattern'],
                13: ['otilukes-resilient-sphere', 'stoneskin'],
                17: ['hold-monster', 'wall-of-force'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Emissary of Peace',
                    level: 3,
                    description: 'You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Channel Divinity: Rebuke the Violent',
                    level: 3,
                    description: 'You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage.',
                    actionType: 'reaction',
                },
            ],
            7: [
                {
                    name: 'Aura of the Guardian',
                    level: 7,
                    description: 'You can shield others from harm at the cost of your own health. When a creature within 10 feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn\'t transfer any other effects that might accompany the damage, and this damage can\'t be reduced in any way. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'reaction',
                    scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Protective Spirit',
                    level: 15,
                    description: 'A holy presence mends your wounds in battle. You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren\'t incapacitated.',
                    actionType: 'passive',
                },
            ],
            20: [
                {
                    name: 'Emissary of Redemption',
                    level: 20,
                    description: 'You become an avatar of peace, which gives you two benefits: You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects). Whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack. If you attack a creature, cast a spell on it, or deal damage to it by any means but this feature, neither benefit works against that creature until you finish a long rest.',
                    actionType: 'passive',
                },
            ],
        },
    },
    
    {
        name: 'Oath of Glory',
        description: 'Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism. They train diligently and encourage their companions so they\'re all ready when destiny calls.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                3: ['guiding-bolt', 'heroism'],
                5: ['enhance-ability', 'magic-weapon'],
                9: ['haste', 'protection-from-energy'],
                13: ['compulsion', 'freedom-of-movement'],
                17: ['commune', 'flame-strike'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Peerless Athlete',
                    level: 3,
                    description: 'As a bonus action, you can use your Channel Divinity to augment your athleticism. For the next 10 minutes, you have advantage on Strength (Athletics) and Dexterity (Acrobatics) checks; you can carry, push, drag, and lift twice as much weight as normal; and the distance of your long and high jumps increases by 10 feet (this extra distance costs movement as normal).',
                    actionType: 'bonus action',
                },
                {
                    name: 'Channel Divinity: Inspiring Smite',
                    level: 3,
                    description: 'Immediately after you deal damage to a creature with your Divine Smite feature, you can use your Channel Divinity as a bonus action and distribute temporary hit points to creatures of your choice within 30 feet of you, which can include you. The total number of temporary hit points equals 2d8 + your level in this class, divided among the chosen creatures however you like.',
                    actionType: 'bonus action',
                },
            ],
            7: [
                {
                    name: 'Aura of Alacrity',
                    level: 7,
                    description: 'You emanate an aura that fills you and your companions with supernatural speed, allowing you to race across a battlefield in formation. Your walking speed increases by 10 feet. In addition, if you aren\'t incapacitated, the walking speed of any ally who starts their turn within 5 feet of you increases by 10 feet until the end of that turn. When you reach 18th level in this class, the range of the aura increases to 10 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 5 feet (7th), 10 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Glorious Defense',
                    level: 15,
                    description: 'You can turn defense into a sudden strike. When you or another creature you can see within 10 feet of you is hit by an attack roll, you can use your reaction to grant a bonus to the target\'s AC against that attack, potentially causing it to miss. The bonus equals your Charisma modifier (minimum of +1). If the attack misses, you can make one weapon attack against the attacker as part of this reaction, provided the attacker is within your weapon\'s range. You can use this feature a number of times equal to your Charisma modifier (minimum of once), and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Charisma modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            20: [
                {
                    name: 'Living Legend',
                    level: 20,
                    description: 'You can empower yourself with the legends—whether true or exaggerated—of your great deeds. As a bonus action, you gain the following benefits for 1 minute: You are blessed with an otherworldly presence, gaining advantage on all Charisma checks. Once on each of your turns when you miss with a weapon attack, you can cause that attack to hit instead. If you fail a saving throw, you can use your reaction to reroll it. You must use this new roll. Once you use this feature, you can\'t use it again until you finish a long rest, unless you expend a 5th-level spell slot to use it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1 (or 5th-level spell slot)',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oath of the Watchers',
        description: 'The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures, many of which can lay waste to mortals and their holdings. Thus, the Watchers hone their minds, spirits, and bodies to be the ultimate weapons against such threats.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                3: ['alarm', 'detect-magic'],
                5: ['moonbeam', 'see-invisibility'],
                9: ['counterspell', 'nondetection'],
                13: ['aura-of-purity', 'banishment'],
                17: ['hold-monster', 'scrying'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Watcher\'s Will',
                    level: 3,
                    description: 'You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Abjure the Extraplanar',
                    level: 3,
                    description: 'You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each aberration, celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.',
                    actionType: 'action',
                },
            ],
            7: [
                {
                    name: 'Aura of the Sentinel',
                    level: 7,
                    description: 'You emit an aura of alertness while you aren\'t incapacitated. When you and any creatures of your choice within 10 feet of you roll initiative, you all gain a bonus to initiative equal to your proficiency bonus. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Vigilant Rebuke',
                    level: 15,
                    description: 'You\'ve learned how to chastise anyone who dares wield beguilements against you and your wards. Whenever you or a creature you can see within 30 feet of you succeeds on an Intelligence, a Wisdom, or a Charisma saving throw, you can use your reaction to deal 2d8 + your Charisma modifier force damage to the creature that forced the saving throw.',
                    actionType: 'reaction',
                    damage: {
                        dice: '2d8 + Charisma modifier',
                        type: 'force',
                        scaling: 'When ally succeeds on mental save',
                    },
                },
            ],
            20: [
                {
                    name: 'Mortal Bulwark',
                    level: 20,
                    description: 'You manifest a spark of divine power in defense of the mortal realms. As a bonus action, you gain the following benefits for 1 minute: You gain truesight with a range of 120 feet. You have advantage on attack rolls against aberrations, celestials, elementals, fey, and fiends. When you hit a creature with an attack roll and deal damage to it, you can also force it to make a Charisma saving throw against your spell save DC. On a failed save, the creature is magically banished to its native plane of existence if it\'s currently not there. On a successful save, the creature can\'t be banished by this feature for 24 hours. Once you use this bonus action, you can\'t use it again until you finish a long rest, unless you expend a 5th-level spell slot to use it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1 (or 5th-level spell slot)',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oath of the Crown',
        description: 'The Oath of the Crown is sworn to the ideals of civilization, be it the spirit of a nation, fealty to a sovereign, or service to a deity of law and rulership. The paladins who swear this oath dedicate themselves to serving society and, in particular, the just laws that hold society together.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'SCAG',
        
        spells: {
            byCharacterLevel: {
                3: ['command', 'compelled-duel'],
                5: ['warding-bond', 'zone-of-truth'],
                9: ['aura-of-vitality', 'spirit-guardians'],
                13: ['banishment', 'guardian-of-faith'],
                17: ['circle-of-power', 'geas'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Champion Challenge',
                    level: 3,
                    description: 'You issue a challenge that compels other creatures to do battle with you. As a bonus action, you can use your Channel Divinity to issue a challenge. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can\'t willingly move more than 30 feet away from you. This effect ends on the creature if you are incapacitated or die or if the creature is more than 30 feet away from you.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Channel Divinity: Turn the Tide',
                    level: 3,
                    description: 'As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points.',
                    actionType: 'bonus action',
                },
            ],
            7: [
                {
                    name: 'Divine Allegiance',
                    level: 7,
                    description: 'When a creature within 5 feet of you takes damage, you can use your reaction to magically substitute your own health for that of the target creature, causing that creature not to take the damage. Instead, you take the damage. This damage to you can\'t be reduced or prevented in any way.',
                    actionType: 'reaction',
                },
            ],
            15: [
                {
                    name: 'Unyielding Spirit',
                    level: 15,
                    description: 'You have advantage on saving throws to avoid becoming paralyzed or stunned.',
                    actionType: 'passive',
                },
            ],
            20: [
                {
                    name: 'Exalted Champion',
                    level: 20,
                    description: 'Your presence on the field of battle is an inspiration to those dedicated to your cause. You can use your action to gain the following benefits for 1 hour: You have resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons. Your allies have advantage on death saving throws while within 30 feet of you. You have advantage on Wisdom saving throws, as do your allies within 30 feet of you. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    
    {
        name: 'Oathbreaker',
        description: 'An Oathbreaker is a paladin who breaks their sacred oaths to pursue some dark ambition or serve an evil power. Whatever light burned in the paladin\'s heart has been extinguished. Only darkness remains. A paladin must be evil and at least 3rd level to become an Oathbreaker.',
        class: 'paladin',
        subclass_level: 3,
        sourcebook: 'DMG',
        
        spells: {
            byCharacterLevel: {
                3: ['hellish-rebuke', 'inflict-wounds'],
                5: ['crown-of-madness', 'darkness'],
                9: ['animate-dead', 'bestow-curse'],
                13: ['blight', 'confusion'],
                17: ['contagion', 'dominate-person'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Channel Divinity: Control Undead',
                    level: 3,
                    description: 'As an action, you target one undead creature you can see within 30 feet of you. The target must make a Wisdom saving throw. On a failed save, the target must obey your commands for the next 24 hours, or until you use this Channel Divinity option again. An undead whose challenge rating is equal to or greater than your paladin level is immune to this effect.',
                    actionType: 'action',
                },
                {
                    name: 'Channel Divinity: Dreadful Aspect',
                    level: 3,
                    description: 'As an action, you channel the darkest emotions and focus them into a burst of magical menace. Each creature of your choice within 30 feet of you must make a Wisdom saving throw if it can see you. On a failed save, the target is frightened of you for 1 minute. If a creature frightened by this effect ends its turn more than 30 feet away from you, it can attempt another Wisdom saving throw to end the effect on it.',
                    actionType: 'action',
                },
            ],
            7: [
                {
                    name: 'Aura of Hate',
                    level: 7,
                    description: 'You, as well as any fiends and undead within 10 feet of you, gain a bonus to melee weapon damage rolls equal to your Charisma modifier (minimum of +1). A creature can benefit from this feature from only one paladin at a time. At 18th level, the range of this aura increases to 30 feet.',
                    actionType: 'passive',
                    scaling: 'Range: 10 feet (7th), 30 feet (18th)',
                },
            ],
            15: [
                {
                    name: 'Supernatural Resistance',
                    level: 15,
                    description: 'You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.',
                    actionType: 'passive',
                },
            ],
            20: [
                {
                    name: 'Dread Lord',
                    level: 20,
                    description: 'You can, as an action, surround yourself with an aura of gloom that lasts for 1 minute. The aura reduces any bright light in a 30-foot radius around you to dim light. Whenever an enemy that is frightened by you starts its turn in the aura, it takes 4d10 psychic damage. Additionally, you and any creatures of your choosing in the aura are draped in deeper shadow. Creatures that rely on sight have disadvantage on attack rolls against creatures draped in this shadow. While the aura lasts, you can use a bonus action on your turn to cause the shadows in the aura to attack one creature. Make a melee spell attack against the target. If the attack hits, the target takes necrotic damage equal to 3d10 + your Charisma modifier. After activating the aura, you can\'t do so again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '4d10 psychic (frightened enemies), 3d10 + Cha necrotic (shadow attack)',
                        type: 'psychic/necrotic',
                        scaling: 'Multiple damage sources',
                    },
                },
            ],
        },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // RANGER SUBCLASSES (Ranger Archetypes)
    // ═══════════════════════════════════════════════════════════════════
    
    // Note: Ranger subclass features appear at levels 3, 7, 11, 15
    
    {
        name: 'Hunter',
        description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness. As you walk the Hunter\'s path, you learn specialized techniques for fighting the threats you face.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Hunter\'s Prey',
                    level: 3,
                    description: 'You gain one of the following features of your choice: Colossus Slayer (When you hit a creature with a weapon attack, the creature takes an extra 1d8 damage if it\'s below its hit point maximum), Giant Killer (When a Large or larger creature within 5 feet of you hits or misses you with an attack, you can use your reaction to attack that creature immediately after its attack, provided that you can see the creature), or Horde Breaker (Once on each of your turns when you make a weapon attack, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target and within range of your weapon).',
                    actionType: 'special',
                    providesChoice: true,
                    choices: ['Colossus Slayer', 'Giant Killer', 'Horde Breaker'],
                    damage: {
                        dice: '1d8',
                        type: 'weapon',
                        scaling: 'Once per turn',
                    },
                },
            ],
            7: [
                {
                    name: 'Defensive Tactics',
                    level: 7,
                    description: 'You gain one of the following features of your choice: Escape the Horde (Opportunity attacks against you are made with disadvantage), Multiattack Defense (When a creature hits you with an attack, you gain a +4 bonus to AC against all subsequent attacks made by that creature for the rest of the turn), or Steel Will (You have advantage on saving throws against being frightened).',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Escape the Horde', 'Multiattack Defense', 'Steel Will'],
                },
            ],
            11: [
                {
                    name: 'Multiattack',
                    level: 11,
                    description: 'You gain one of the following features of your choice: Volley (You can use your action to make a ranged attack against any number of creatures within 10 feet of a point you can see within your weapon\'s range. You must have ammunition for each target, as normal, and you make a separate attack roll for each target), or Whirlwind Attack (You can use your action to make a melee attack against any number of creatures within 5 feet of you, with a separate attack roll for each target).',
                    actionType: 'action',
                    providesChoice: true,
                    choices: ['Volley', 'Whirlwind Attack'],
                },
            ],
            15: [
                {
                    name: 'Superior Hunter\'s Defense',
                    level: 15,
                    description: 'You gain one of the following features of your choice: Evasion (When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail), Stand Against the Tide (When a hostile creature misses you with a melee attack, you can use your reaction to force that creature to repeat the same attack against another creature (other than itself) of your choice), or Uncanny Dodge (When an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you).',
                    actionType: 'reaction',
                    providesChoice: true,
                    choices: ['Evasion', 'Stand Against the Tide', 'Uncanny Dodge'],
                },
            ],
        },
    },

    {
        name: 'Beast Master',
        description: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the wild. United in focus, beast and ranger fight as one.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'PHB',
        
        features: {
            3: [
                {
                    name: 'Ranger\'s Companion',
                    level: 3,
                    description: 'You gain a beast companion that accompanies you on your adventures. Choose a beast that is no larger than Medium and has a challenge rating of 1/4 or lower. The beast obeys your commands as best as it can. In combat, the beast acts during your turn. You can verbally command the beast where to move (no action required), or you can use your action to command it to take the Attack, Dash, Disengage, Dodge, or Help action. If you don\'t issue a command, the beast takes the Dodge action. Once you have the Extra Attack feature, you can make one weapon attack yourself when you command the beast to take the Attack action. Note: Tasha\'s Cauldron of Everything provides Primal Companion as an alternative.',
                    actionType: 'special',
                },
            ],
            7: [
                {
                    name: 'Exceptional Training',
                    level: 7,
                    description: 'On any of your turns when your beast companion doesn\'t attack, you can use a bonus action to command the beast to take the Dash, Disengage, or Help action on its turn. Additionally, the beast\'s attacks now count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.',
                    actionType: 'bonus action',
                },
            ],
            11: [
                {
                    name: 'Bestial Fury',
                    level: 11,
                    description: 'When you command your beast companion to take the Attack action, the beast can make two attacks, or it can take the Multiattack action if it has that action.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Share Spells',
                    level: 15,
                    description: 'When you cast a spell targeting yourself, you can also affect your beast companion with the spell if the beast is within 30 feet of you.',
                    actionType: 'special',
                },
            ],
        },
    },

    {
        name: 'Gloom Stalker',
        description: 'Gloom Stalkers are at home in the darkest places: deep under the earth, in gloomy alleyways, in primeval forests, and wherever else the light dims. Most folk enter such places with trepidation, but a Gloom Stalker ventures boldly into the darkness, seeking to ambush threats before they can reach the broader world.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                3: ['disguise-self'],
                5: ['rope-trick'],
                9: ['fear'],
                13: ['greater-invisibility'],
                17: ['seeming'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Dread Ambusher',
                    level: 3,
                    description: 'You master the art of the ambush. You can add your Wisdom modifier to your initiative rolls. At the start of your first turn of each combat, your walking speed increases by 10 feet, which lasts until the end of that turn. If you take the Attack action on that turn, you can make one additional weapon attack as part of that action. If that attack hits, the target takes an extra 1d8 damage of the weapon\'s damage type.',
                    actionType: 'special',
                    damage: {
                        dice: '1d8',
                        type: 'weapon',
                        scaling: 'First turn of combat only',
                    },
                },
                {
                    name: 'Umbral Sight',
                    level: 3,
                    description: 'You gain darkvision out to a range of 60 feet. If you already have darkvision from your race, its range increases by 30 feet. You are also adept at evading creatures that rely on darkvision. While in darkness, you are invisible to any creature that relies on darkvision to see you in that darkness.',
                    actionType: 'passive',
                },
            ],
            7: [
                {
                    name: 'Iron Mind',
                    level: 7,
                    description: 'You have honed your ability to resist the mind-altering powers of your prey. You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).',
                    actionType: 'passive',
                },
            ],
            11: [
                {
                    name: 'Stalker\'s Flurry',
                    level: 11,
                    description: 'You learn to attack with such unexpected speed that you can turn a miss into another strike. Once on each of your turns when you miss with a weapon attack, you can make another weapon attack as part of the same action.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Shadowy Dodge',
                    level: 15,
                    description: 'You can dodge in unforeseen ways, with wisps of supernatural shadow around you. Whenever a creature makes an attack roll against you and doesn\'t have advantage on the roll, you can use your reaction to impose disadvantage on it. You must use this feature before you know the outcome of the attack roll.',
                    actionType: 'reaction',
                    usesPerRest: 'unlimited',
                },
            ],
        },
    },

    {
        name: 'Horizon Walker',
        description: 'Horizon Walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic. They seek out planar portals and keep watch over them, venturing to the Inner Planes and the Outer Planes as needed to pursue their foes.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                3: ['protection-from-evil-and-good'],
                5: ['misty-step'],
                9: ['haste'],
                13: ['banishment'],
                17: ['teleportation-circle'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Detect Portal',
                    level: 3,
                    description: 'You gain the ability to magically sense the presence of a planar portal. As an action, you detect the distance and direction to the closest planar portal within 1 mile of you. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
                {
                    name: 'Planar Warrior',
                    level: 3,
                    description: 'You learn to draw on the energy of the multiverse to augment your attacks. As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack. At 11th level, the extra damage increases to 2d8.',
                    actionType: 'bonus action',
                    damage: {
                        dice: '1d8',
                        type: 'force',
                        scaling: '2d8 at 11th level',
                    },
                },
            ],
            7: [
                {
                    name: 'Ethereal Step',
                    level: 7,
                    description: 'You learn to step through the Ethereal Plane. As a bonus action, you can cast the etherealness spell with this feature, without expending a spell slot, but the spell ends at the end of the current turn. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                    spellReference: 'etherealness',
                },
            ],
            11: [
                {
                    name: 'Distant Strike',
                    level: 11,
                    description: 'You gain the ability to pass between the planes in the blink of an eye. When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see. If you attack at least two different creatures with the action, you can make one additional attack with it against a third creature.',
                    actionType: 'special',
                },
            ],
            15: [
                {
                    name: 'Spectral Defense',
                    level: 15,
                    description: 'Your ability to move between planes enables you to slip through the planar boundaries to lessen the harm done to you during battle. When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack\'s damage on this turn.',
                    actionType: 'reaction',
                    usesPerRest: 'unlimited',
                },
            ],
        },
    },

    {
        name: 'Monster Slayer',
        description: 'You have dedicated yourself to hunting down creatures of the night and wielders of grim magic. A Monster Slayer seeks out vampires, dragons, evil fey, fiends, and other magical threats. Trained in supernatural techniques to overcome such monsters, slayers are experts at unearthing and defeating mighty, mystical foes.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'XGtE',
        
        spells: {
            byCharacterLevel: {
                3: ['protection-from-evil-and-good'],
                5: ['zone-of-truth'],
                9: ['magic-circle'],
                13: ['banishment'],
                17: ['hold-monster'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Hunter\'s Sense',
                    level: 3,
                    description: 'You gain the ability to peer at a creature and magically discern how best to hurt it. As an action, choose one creature you can see within 60 feet of you. You immediately learn whether the creature has any damage immunities, resistances, or vulnerabilities and what they are. If the creature is hidden from divination magic, you sense that it has no damage immunities, resistances, or vulnerabilities. You can use this feature a number of times equal to your Wisdom modifier (minimum of once). You regain all expended uses of it when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Wisdom modifier',
                    restType: 'long',
                },
                {
                    name: 'Slayer\'s Prey',
                    level: 3,
                    description: 'You can focus your ire on one foe, increasing the harm you inflict on it. As a bonus action, you designate one creature you can see within 60 feet of you as the target of this feature. The first time each turn that you hit that target with a weapon attack, it takes an extra 1d6 damage from the weapon. This benefit lasts until you finish a short or long rest. It ends early if you designate a different creature.',
                    actionType: 'bonus action',
                    damage: {
                        dice: '1d6',
                        type: 'weapon',
                        scaling: 'Once per turn',
                    },
                },
            ],
            7: [
                {
                    name: 'Supernatural Defense',
                    level: 7,
                    description: 'You gain extra resilience against your prey\'s assaults on your mind and body. Whenever the target of your Slayer\'s Prey forces you to make a saving throw and whenever you make an ability check to escape that target\'s grapple, add 1d6 to your roll.',
                    actionType: 'passive',
                },
            ],
            11: [
                {
                    name: 'Magic-User\'s Nemesis',
                    level: 11,
                    description: 'You gain the ability to thwart someone else\'s magic. When you see a creature casting a spell or teleporting within 60 feet of you, you can use your reaction to try to magically foil it. The creature must succeed on a Wisdom saving throw against your spell save DC, or its spell or teleport fails and is wasted. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            15: [
                {
                    name: 'Slayer\'s Counter',
                    level: 15,
                    description: 'You gain the ability to counterattack when your prey tries to sabotage you. If the target of your Slayer\'s Prey forces you to make a saving throw, you can use your reaction to make one weapon attack against the quarry. You make this attack immediately before making the saving throw. If your attack hits, your save automatically succeeds, in addition to the attack\'s normal effects.',
                    actionType: 'reaction',
                    usesPerRest: 'unlimited',
                },
            ],
        },
    },

    {
        name: 'Fey Wanderer',
        description: 'A fey mystique surrounds you, thanks to the boon of an archfey, the shining fruit you ate from a talking tree, the magic spring you swam in, or some other auspicious event. However you acquired your fey magic, you are now a Fey Wanderer, a ranger who represents both the mortal and the fey realms.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                3: ['charm-person'],
                5: ['misty-step'],
                9: ['dispel-magic'],
                13: ['dimension-door'],
                17: ['mislead'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Dreadful Strikes',
                    level: 3,
                    description: 'You can augment your weapon strikes with mind-scarring magic, drawn from the gloomy hollows of the Feywild. When you hit a creature with a weapon, you can deal an extra 1d4 psychic damage to the target, which can take this extra damage only once per turn. The extra damage increases to 1d6 when you reach 11th level in this class.',
                    actionType: 'special',
                    damage: {
                        dice: '1d4',
                        type: 'psychic',
                        scaling: '1d6 at 11th level',
                    },
                },
                {
                    name: 'Otherworldly Glamour',
                    level: 3,
                    description: 'Your fey qualities give you a supernatural charm. As a result, whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1). In addition, you gain proficiency in one of the following skills of your choice: Deception, Performance, or Persuasion.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Deception', 'Performance', 'Persuasion'],
                },
            ],
            7: [
                {
                    name: 'Beguiling Twist',
                    level: 7,
                    description: 'The magic of the Feywild guards your mind. You have advantage on saving throws against being charmed or frightened. In addition, whenever you or a creature you can see within 120 feet of you succeeds on a saving throw against being charmed or frightened, you can use your reaction to force a different creature you can see within 120 feet of you to make a Wisdom saving throw against your spell save DC. If the save fails, the target is charmed or frightened by you (your choice) for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a successful save.',
                    actionType: 'reaction',
                    usesPerRest: 'unlimited',
                },
            ],
            11: [
                {
                    name: 'Fey Reinforcements',
                    level: 11,
                    description: 'The royal courts of the Feywild have blessed you with the assistance of fey beings: you know the spell summon fey. It doesn\'t count against the number of ranger spells you know, and you can cast it without a material component. You can also cast it once without a spell slot, and you regain the ability to do so when you finish a long rest. Whenever you start casting the spell, you can modify it so that it doesn\'t require concentration. If you do so, the spell\'s duration becomes 1 minute for that casting.',
                    actionType: 'special',
                    spellReference: 'summon-fey',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            15: [
                {
                    name: 'Misty Wanderer',
                    level: 15,
                    description: 'You can slip in and out of the Feywild to move in the blink of an eye: you can cast misty step without expending a spell slot. You can do so a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a long rest. In addition, whenever you cast misty step, you can bring along one willing creature you can see within 5 feet of you. That creature teleports to an unoccupied space of your choice within 5 feet of your destination space.',
                    actionType: 'bonus action',
                    spellReference: 'misty-step',
                    usesPerRest: 'Wisdom modifier',
                    restType: 'long',
                },
            ],
        },
    },

    {
        name: 'Swarmkeeper',
        description: 'Feeling a deep connection to the environment around them, some rangers reach out through their magical connection to the world and bond with a swarm of nature spirits. The swarm becomes a potent force in battle, as well as helpful company for the ranger.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'TCoE',
        
        spells: {
            byCharacterLevel: {
                3: ['faerie-fire', 'mage-hand'],
                5: ['web'],
                9: ['gaseous-form'],
                13: ['arcane-eye'],
                17: ['insect-plague'],
            },
            alwaysPrepared: true,
        },
        
        features: {
            3: [
                {
                    name: 'Gathered Swarm',
                    level: 3,
                    description: 'A swarm of intangible nature spirits has bonded itself to you and can assist you in battle. Until you die, the swarm remains in your space, crawling on you or flying and skittering around you within your space. Once on each of your turns, you can cause the swarm to assist you in one of the following ways: The swarm moves up to 5 feet, and you move with it. Immediately after you hit a creature with an attack, the creature must make a Strength saving throw against your spell save DC. If it fails, you can move it up to 15 feet horizontally. Immediately after you hit a creature with an attack, the swarm deals 1d6 piercing damage to that creature.',
                    actionType: 'special',
                    damage: {
                        dice: '1d6',
                        type: 'piercing',
                        scaling: '1d8 at 11th level',
                    },
                },
            ],
            7: [
                {
                    name: 'Writhing Tide',
                    level: 7,
                    description: 'You can condense part of your swarm into a focused mass that lifts you up. As a bonus action, you gain a flying speed of 10 feet and can hover. This effect lasts for 1 minute or until you are incapacitated. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            11: [
                {
                    name: 'Mighty Swarm',
                    level: 11,
                    description: 'Your Gathered Swarm grows mightier in the following ways: The damage of Gathered Swarm increases to 1d8. If a creature fails its saving throw against being moved by Gathered Swarm, you can also cause the swarm to knock the creature prone. When you are moved by Gathered Swarm, it gives you half cover until the start of your next turn.',
                    actionType: 'passive',
                },
            ],
            15: [
                {
                    name: 'Swarming Dispersal',
                    level: 15,
                    description: 'You can discorporate into your swarm, avoiding danger. When you take damage, you can use your reaction to give yourself resistance to that damage. You vanish into your swarm and then teleport to an unoccupied space that you can see within 30 feet of you, where you reappear with the swarm. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
        },
    },

    {
        name: 'Drakewarden',
        description: 'Your connection to the natural world takes the form of a draconic spirit, which can manifest in physical form as a drake. As your powers grow, your drake grows as well, blaze with elemental power, and eventually grows wings and becomes a mount.',
        class: 'ranger',
        subclass_level: 3,
        sourcebook: 'FToD',
        
        features: {
            3: [
                {
                    name: 'Draconic Gift',
                    level: 3,
                    description: 'The bond you share with your drake creates a connection to dragonkind, granting you understanding and empowering your presence. You gain the following benefits: You learn the Thaumaturgy cantrip. You learn to speak, read, and write Draconic or one other language of your choice.',
                    actionType: 'passive',
                    providesChoice: true,
                    choices: ['Draconic', 'Other Language'],
                },
                {
                    name: 'Drake Companion',
                    level: 3,
                    description: 'You can magically summon a drake that is bound to you. As an action, you can summon the drake, which appears in an unoccupied space of your choice within 30 feet of you. The drake is friendly to you and your companions, and it obeys your commands. In combat, the drake shares your initiative count, but it takes its turn immediately after yours. The drake remains until it is reduced to 0 hit points, until you use this feature to summon the drake again, or until you die. The drake has a physical form with AC 14 + your proficiency bonus, hit points equal to 5 + five times your ranger level, and immunity to the damage type of its Draconic Essence.',
                    actionType: 'action',
                },
            ],
            7: [
                {
                    name: 'Bond of Fang and Scale',
                    level: 7,
                    description: 'The bond you share with your drake intensifies, protecting you and stoking the drake\'s fury. While your drake is summoned, you and the drake gain the following benefits: You gain resistance to the damage type chosen for the drake\'s Draconic Essence. Your drake\'s attacks now count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks. When you summon your drake, it grows wings on its back and gains a flying speed equal to its walking speed. Your drake\'s bite deals an extra 1d6 damage of the type chosen for its Draconic Essence.',
                    actionType: 'passive',
                    damage: {
                        dice: '+1d6',
                        type: 'chosen elemental',
                        scaling: 'Scales with Draconic Essence choice',
                    },
                },
            ],
            11: [
                {
                    name: 'Drake\'s Breath',
                    level: 11,
                    description: 'As an action, you can exhale a 30-foot cone of damaging breath or cause your drake to exhale it. Choose acid, cold, fire, lightning, or poison damage (your choice doesn\'t have to match your drake\'s Draconic Essence). Each creature in the cone must make a Dexterity saving throw against your spell save DC, taking 8d6 damage on a failed save, or half as much damage on a successful one. This damage increases to 10d6 when you reach 15th level in this class. Once you use this feature, you can\'t do so again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '8d6',
                        type: 'chosen elemental',
                        scaling: '10d6 at 15th level',
                    },
                },
            ],
            15: [
                {
                    name: 'Perfected Bond',
                    level: 15,
                    description: 'Your bond to your drake reaches the pinnacle of its power. While your drake is summoned, you and the drake gain the following benefits: The drake grows to Large size. Your walking speed increases by 10 feet. The drake can make one additional attack when it uses its Multiattack action. When either you or the drake takes damage while you\'re within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
        },
    },

    // Rogue Subclasses
    {
        name: 'Thief',
        description: 'Thieves are masters of stealth and cunning, using their quick thinking and nimble fingers to gain what others keep secure. Whether looting ancient ruins, pickpocketing nobles, or using their skills in combat, thieves rely on their dexterity and wits to succeed where others fail.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'PHB',
        features: {
            3: [
                {
                    name: 'Fast Hands',
                    level: 3,
                    description: 'Your quick hands and nimble fingers allow you to perform extra tasks with your Cunning Action. You can use your Cunning Action bonus action to make a Dexterity (Sleight of Hand) check, use your thieves\' tools to disarm a trap or open a lock, or take the Use an Object action.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Second-Story Work',
                    level: 3,
                    description: 'You gain the ability to climb faster than normal. Climbing no longer costs you extra movement. In addition, when you make a running jump, the distance you cover increases by a number of feet equal to your Dexterity modifier.',
                    actionType: 'passive',
                },
            ],
            9: [
                {
                    name: 'Supreme Sneak',
                    level: 9,
                    description: 'You have advantage on a Dexterity (Stealth) check if you move no more than half your speed on the same turn.',
                    actionType: 'passive',
                },
            ],
            13: [
                {
                    name: 'Use Magic Device',
                    level: 13,
                    description: 'You have learned enough about the workings of magic that you can improvise the use of items even when they are not intended for you. You ignore all class, race, and level requirements on the use of magic items.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Thief\'s Reflexes',
                    level: 17,
                    description: 'You have become adept at laying ambushes and quickly escaping danger. You can take two turns during the first round of any combat. You take your first turn at your normal initiative and your second turn at your initiative minus 10. You can\'t use this feature when you are surprised.',
                    actionType: 'special',
                },
            ],
        },
    },
    {
        name: 'Assassin',
        description: 'Assassins are masters of dealing swift death to unsuspecting foes. These rogues train in the grim art of death, learning a variety of techniques for killing targets from a distance or up close. Their skills are particularly effective against targets who are unaware of their presence.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'PHB',
        proficiencies: {
            tools: ['disguise-kit', 'poisoner-kit'],
        },
        features: {
            3: [
                {
                    name: 'Bonus Proficiencies',
                    level: 3,
                    description: 'You gain proficiency with the disguise kit and the poisoner\'s kit.',
                    actionType: 'passive',
                },
                {
                    name: 'Assassinate',
                    level: 3,
                    description: 'You are at your deadliest when you get the drop on your enemies. You have advantage on attack rolls against any creature that hasn\'t taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit.',
                    actionType: 'special',
                },
            ],
            9: [
                {
                    name: 'Infiltration Expertise',
                    level: 9,
                    description: 'You can unfailingly create false identities for yourself. You must spend seven days and 25 gp to establish the history, profession, and affiliations for an identity. You can\'t establish an identity that belongs to someone else. Thereafter, if you adopt the new identity as a disguise, other creatures believe you to be that person until given an obvious reason not to.',
                    actionType: 'passive',
                },
            ],
            13: [
                {
                    name: 'Imposter',
                    level: 13,
                    description: 'You gain the ability to unerringly mimic another person\'s speech, writing, and behavior. You must spend at least three hours studying these three components of the person\'s behavior, listening to speech, examining handwriting, and observing mannerisms. Your ruse is indiscernible to the casual observer. If a wary creature suspects something is amiss, you have advantage on any Charisma (Deception) check you make to avoid detection.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Death Strike',
                    level: 17,
                    description: 'You become a master of instant death. When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dexterity modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature.',
                    actionType: 'special',
                },
            ],
        },
    },
    {
        name: 'Arcane Trickster',
        description: 'Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion. These rogues include pickpockets and burglars, but also pranksters, mischief-makers, and a significant number of adventurers.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'PHB',

        spells: {
            cantripsKnown: { 3: 3, 10: 4 },
            spellsKnown: { 3: 3, 4: 4, 7: 5, 8: 6, 10: 7, 11: 8, 13: 9, 14: 10, 16: 11, 19: 12, 20: 13 },
            spellSlots: {
                3: { 1: 2 },
                4: { 1: 3 },
                7: { 1: 4, 2: 2 },
                8: { 1: 4, 2: 3 },
                10: { 1: 4, 2: 3, 3: 2 },
                11: { 1: 4, 2: 3, 3: 3 },
                13: { 1: 4, 2: 3, 3: 3, 4: 1 },
                14: { 1: 4, 2: 3, 3: 3, 4: 2 },
                16: { 1: 4, 2: 3, 3: 3, 4: 3 },
                19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
                20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
            },
            spellcastingAbility: 'int',
            progression: 'third',
            restriction: 'Must choose spells from wizard list, primarily enchantment and illusion. Must learn Mage Hand as one of your cantrips.',
        },

        features: {
            3: [
                {
                    name: 'Spellcasting',
                    level: 3,
                    description: 'You gain the ability to cast spells. You learn three cantrips (one must be Mage Hand) and three 1st-level wizard spells. Two of the three must be from the enchantment and illusion schools. Intelligence is your spellcasting ability. You learn additional spells as you level up, with most spells required to be from enchantment or illusion schools.',
                    actionType: 'special',
                },
                {
                    name: 'Mage Hand Legerdemain',
                    level: 3,
                    description: 'When you cast Mage Hand, you can make the spectral hand invisible. You can perform the following additional tasks with it: stow one object the hand is holding in a container worn or carried by another creature, retrieve an object in a container worn or carried by another creature, or use thieves\' tools to pick locks and disarm traps at range. You can perform one of these tasks without being noticed by a creature if you succeed on a Dexterity (Sleight of Hand) check contested by the creature\'s Wisdom (Perception) check. The hand can perform these tasks at a distance of up to 30 feet from you.',
                    actionType: 'special',
                },
            ],
            9: [
                {
                    name: 'Magical Ambush',
                    level: 9,
                    description: 'If you are hidden from a creature when you cast a spell on it, the creature has disadvantage on any saving throw it makes against the spell this turn.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Versatile Trickster',
                    level: 13,
                    description: 'You gain the ability to distract targets with your Mage Hand. As a bonus action on your turn, you can designate a creature within 5 feet of the spectral hand created by the spell. Doing so gives you advantage on attack rolls against that creature until the end of the turn.',
                    actionType: 'bonus action',
                },
            ],
            17: [
                {
                    name: 'Spell Thief',
                    level: 17,
                    description: 'You gain the ability to magically steal the knowledge of how to cast a spell from another spellcaster. Immediately after a creature casts a spell that targets you or includes you in its area of effect, you can use your reaction to force the creature to make a saving throw with its spellcasting ability modifier. The DC equals your spell save DC. On a failed save, you negate the spell\'s effect against you, and you steal the knowledge of the spell if it is at least 1st level and of a level you can cast (it doesn\'t need to be a wizard spell). For the next 8 hours, you know the spell and can cast it using your spell slots. The creature can\'t cast that spell until the 8 hours have passed. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Inquisitive',
        description: 'As an archetypal Inquisitive, you excel at rooting out secrets and unraveling mysteries. You rely on your sharp eye for detail, but also on your finely honed ability to read the words and deeds of other creatures to determine their true intent. You excel at defeating creatures that hide among and prey upon ordinary folk, and your mastery of lore and your keen deductions make you well equipped to expose and end hidden evils.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'XGtE',
        features: {
            3: [
                {
                    name: 'Ear for Deceit',
                    level: 3,
                    description: 'You develop a talent for picking out lies. Whenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8.',
                    actionType: 'passive',
                },
                {
                    name: 'Eye for Detail',
                    level: 3,
                    description: 'You can use a bonus action to make a Wisdom (Perception) check to spot a hidden creature or object or to make an Intelligence (Investigation) check to uncover or decipher clues.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Insightful Fighting',
                    level: 3,
                    description: 'You gain the ability to decipher an opponent\'s tactics and develop a counter to them. As a bonus action, you can make a Wisdom (Insight) check against a creature you can see that isn\'t incapacitated, contested by the target\'s Charisma (Deception) check. If you succeed, you can use your Sneak Attack against that target even if you don\'t have advantage on the attack roll, but not if you have disadvantage on it. This benefit lasts for 1 minute or until you successfully use this feature against a different target.',
                    actionType: 'bonus action',
                },
            ],
            9: [
                {
                    name: 'Steady Eye',
                    level: 9,
                    description: 'You have advantage on any Wisdom (Perception) or Intelligence (Investigation) check if you move no more than half your speed on the same turn.',
                    actionType: 'passive',
                },
            ],
            13: [
                {
                    name: 'Unerring Eye',
                    level: 13,
                    description: 'Your senses are almost impossible to foil. As an action, you sense the presence of illusions, shapechangers not in their original form, and other magic designed to deceive the senses within 30 feet of you, provided you aren\'t blinded or deafened. You sense that an effect is attempting to trick you, but you gain no insight into what is hidden or into its true nature. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Wisdom modifier (minimum 1)',
                    restType: 'long',
                },
            ],
            17: [
                {
                    name: 'Eye for Weakness',
                    level: 17,
                    description: 'You learn to exploit a creature\'s weaknesses by carefully studying its tactics and movement. While your Insightful Fighting feature applies to a creature, your Sneak Attack damage against that creature increases by 3d6.',
                    actionType: 'passive',
                    damage: {
                        dice: '3d6',
                        type: 'weapon',
                        scaling: 'Additional damage when using Insightful Fighting',
                    },
                },
            ],
        },
    },
    {
        name: 'Mastermind',
        description: 'Your focus is on people and on the influence and secrets they have. Many spies, courtiers, and schemers follow this archetype, leading lives of intrigue. Words are your weapons as often as knives or poison, and secrets and favors are some of your favorite treasures.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'XGtE',
        proficiencies: {
            tools: ['disguise-kit', 'forgery-kit', 'gaming-set'],
        },
        features: {
            3: [
                {
                    name: 'Master of Intrigue',
                    level: 3,
                    description: 'You gain proficiency with the disguise kit, the forgery kit, and one gaming set of your choice. You also learn two languages of your choice. Additionally, you can unerringly mimic the speech patterns and accent of a creature that you hear speak for at least 1 minute, enabling you to pass yourself off as a native speaker of a particular land, provided that you know the language.',
                    actionType: 'passive',
                },
                {
                    name: 'Master of Tactics',
                    level: 3,
                    description: 'You can use the Help action as a bonus action. Additionally, when you use the Help action to aid an ally in attacking a creature, the target of that attack can be within 30 feet of you, rather than within 5 feet of you, if the target can see or hear you.',
                    actionType: 'bonus action',
                },
            ],
            9: [
                {
                    name: 'Insightful Manipulator',
                    level: 9,
                    description: 'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice: Intelligence score, Wisdom score, Charisma score, or class levels (if any). At the DM\'s option, you might also realize you know a piece of the creature\'s history or one of its personality traits, if it has any.',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Misdirection',
                    level: 13,
                    description: 'You can sometimes cause another creature to suffer an attack meant for you. When you are targeted by an attack while a creature within 5 feet of you is granting you cover against that attack, you can use your reaction to have the attack target that creature instead of you.',
                    actionType: 'reaction',
                },
            ],
            17: [
                {
                    name: 'Soul of Deceit',
                    level: 17,
                    description: 'Your thoughts can\'t be read by telepathy or other means, unless you allow it. You can present false thoughts by succeeding on a Charisma (Deception) check contested by the mind reader\'s Wisdom (Insight) check. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates you are being truthful if you so choose, and you can\'t be compelled to tell the truth by magic.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'Scout',
        description: 'You are skilled in stealth and survival, far from the streets of a city, in the skirmishes and battlefields where armies clash. You survey the battlefield and look for advantages that can tip the balance in your favor. You are most at home in the wilds beyond civilization, and you are the eyes and ears of your adventuring party.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'XGtE',
        proficiencies: {
            skills: ['Nature', 'Survival'],
        },
        features: {
            3: [
                {
                    name: 'Skirmisher',
                    level: 3,
                    description: 'You can move up to half your speed as a reaction when an enemy ends its turn within 5 feet of you. This movement doesn\'t provoke opportunity attacks.',
                    actionType: 'reaction',
                },
                {
                    name: 'Survivalist',
                    level: 3,
                    description: 'You gain proficiency in the Nature and Survival skills if you don\'t already have it. Your proficiency bonus is doubled for any ability check you make that uses either of those proficiencies.',
                    actionType: 'passive',
                },
            ],
            9: [
                {
                    name: 'Superior Mobility',
                    level: 9,
                    description: 'Your walking speed increases by 10 feet. If you have a climbing or swimming speed, this increase applies to that speed as well.',
                    actionType: 'passive',
                },
            ],
            13: [
                {
                    name: 'Ambush Master',
                    level: 13,
                    description: 'You excel at leading ambushes and acting first in a fight. You have advantage on initiative rolls. In addition, the first creature you hit during the first round of a combat becomes easier for you and others to strike; attack rolls against that target have advantage until the start of your next turn.',
                    actionType: 'passive',
                },
            ],
            17: [
                {
                    name: 'Sudden Strike',
                    level: 17,
                    description: 'You can strike with deadly speed. If you take the Attack action on your turn, you can make one additional attack as a bonus action. This attack can benefit from your Sneak Attack even if you have already used it this turn, but you can\'t use your Sneak Attack against the same target more than once in a turn.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    {
        name: 'Swashbuckler',
        description: 'You focus your training on the art of the blade, relying on speed, elegance, and charm in equal parts. While some warriors are brutes clad in heavy armor, your method of fighting looks almost like a performance. Duelists and pirates typically belong to this archetype. A Swashbuckler excels in single combat, and can fight with two weapons while safely darting away from an opponent.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'XGtE',
        features: {
            3: [
                {
                    name: 'Fancy Footwork',
                    level: 3,
                    description: 'During your turn, if you make a melee attack against a creature, that creature can\'t make opportunity attacks against you for the rest of your turn.',
                    actionType: 'passive',
                },
                {
                    name: 'Rakish Audacity',
                    level: 3,
                    description: 'Your confidence propels you into battle. You can give yourself a bonus to your initiative rolls equal to your Charisma modifier. You also gain an additional way to use your Sneak Attack; you don\'t need advantage on your attack roll to use Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don\'t have disadvantage on the attack roll. All the other rules for Sneak Attack still apply to you.',
                    actionType: 'passive',
                },
            ],
            9: [
                {
                    name: 'Panache',
                    level: 9,
                    description: 'You can make a Charisma (Persuasion) check contested by a creature\'s Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language. If you succeed on the check and the creature is hostile, it has disadvantage on attack rolls against targets other than you and can\'t make opportunity attacks against targets other than you. This effect lasts for 1 minute, until one of your companions attacks the target or affects it with a spell, or until you and the target are more than 60 feet apart. If you succeed on the check and the creature isn\'t hostile, it is charmed by you for 1 minute. While charmed, it regards you as a friendly acquaintance. This effect ends immediately if you or your companions do anything harmful to it.',
                    actionType: 'action',
                },
            ],
            13: [
                {
                    name: 'Elegant Maneuver',
                    level: 13,
                    description: 'You can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn.',
                    actionType: 'bonus action',
                },
            ],
            17: [
                {
                    name: 'Master Duelist',
                    level: 17,
                    description: 'Your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can\'t use this feature again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    {
        name: 'Phantom',
        description: 'Many rogues walk a fine line between life and death, risking their own lives and taking the lives of others. While adventuring on that line, some rogues discover a mystical connection to death itself. These rogues take knowledge from the dead and become immersed in negative energy, eventually becoming like ghosts. Thieves\' guilds value them as highly effective information gatherers and spies. Many shadar-kai of the Shadowfell are masters of these macabre techniques, and some are willing to teach this path.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'TCoE',
        features: {
            3: [
                {
                    name: 'Whispers of the Dead',
                    level: 3,
                    description: 'Echoes of those who have died cling to you. Whenever you finish a short or long rest, you can gain one skill or tool proficiency of your choice, as a ghostly presence shares its knowledge with you. You lose this proficiency when you use this feature to choose a different proficiency that you lack.',
                    actionType: 'passive',
                },
                {
                    name: 'Wails from the Grave',
                    level: 3,
                    description: 'As you nudge someone closer to the grave, you can channel the power of death to harm someone else as well. Immediately after you deal your Sneak Attack damage to a creature on your turn, you can target a second creature that you can see within 30 feet of the first creature. Roll half the number of Sneak Attack dice for your level (round up), and the second creature takes necrotic damage equal to the roll\'s total, as wails of the dead sound around them for a moment.',
                    actionType: 'special',
                    damage: {
                        dice: 'Half of Sneak Attack dice',
                        type: 'necrotic',
                        scaling: 'Scales with Sneak Attack progression',
                    },
                },
            ],
            9: [
                {
                    name: 'Tokens of the Departed',
                    level: 9,
                    description: 'When a life ends in your presence, you can snatch a token from the departing soul. When a creature you can see dies within 30 feet of you, you can use your reaction to open your free hand and create a Tiny trinket there, a soul trinket. You can have a maximum number of soul trinkets equal to your proficiency bonus. You can use soul trinkets in the following ways: While a soul trinket is on your person, you have advantage on death saving throws and Constitution saving throws. As an action, you can destroy one of your soul trinkets and ask the spirit a question. The DM determines the spirit\'s knowledge and personality. As a reaction immediately after you deal your Sneak Attack damage on your turn, you can destroy one of your soul trinkets to use Wails from the Grave without expending your use of that feature.',
                    actionType: 'reaction',
                },
            ],
            13: [
                {
                    name: 'Ghost Walk',
                    level: 13,
                    description: 'You can phase partially into the realm of the dead, becoming like a ghost. As a bonus action, you assume a spectral form. While in this form, you have a flying speed of 10 feet, you can hover, and attack rolls have disadvantage against you. You can also move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object. You remain in this form for 10 minutes or until you end it as a bonus action. To use this feature again, you must finish a long rest or destroy one of your soul trinkets as part of the bonus action you use to activate Ghost Walk.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            17: [
                {
                    name: 'Death\'s Friend',
                    level: 17,
                    description: 'Your association with death has become so close that you gain the following benefits: When you use your Wails from the Grave, you can deal the necrotic damage to both the first and the second creature. You create a soul trinket when you finish a long rest, if you don\'t already have the maximum number. You have resistance to necrotic damage.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'Soulknife',
        description: 'Most assassins strike with physical weapons, and many burglars and spies use thieves\' tools to infiltrate secure locations. In contrast, a Soulknife strikes and infiltrates with the mind, cutting through barriers both physical and psychic. These rogues discover psionic power within themselves and channel it to do their roguish work. They find easy employment as members of thieves\' guilds, though they are often mistrusted by rogues who are leery of anyone using strange mind powers.',
        class: 'rogue',
        subclass_level: 3,
        sourcebook: 'TCoE',

        resources: [
            {
                name: 'Psionic Energy Dice',
                type: 'psionic_energy',
                uses: { 3: 'proficiency bonus × 2' },
                restType: 'long',
                levelGained: 3,
                diceType: 'd6 (d8 at 5th, d10 at 11th, d12 at 17th)',
                description: 'You harbor a wellspring of psionic energy. You have a number of Psionic Energy dice equal to twice your proficiency bonus. These dice fuel your psionic powers. A Psionic Energy die is expended when you use it. You regain all expended Psionic Energy dice when you finish a long rest.',
            },
        ],

        features: {
            3: [
                {
                    name: 'Psionic Power',
                    level: 3,
                    description: 'You harbor a wellspring of psionic energy. This energy is represented by your Psionic Energy dice. You have a number of these dice equal to twice your proficiency bonus, and they fuel the psionic powers below. You can use the following powers: Psi-Bolstered Knack (when you fail an ability check using a skill or tool you\'re proficient with, roll a Psionic Energy die and add it to the check, potentially turning failure into success), Psychic Whispers (establish telepathic communication with others equal to your proficiency bonus by expending a die; lasts for a number of hours equal to the die roll).',
                    actionType: 'special',
                    scaling: 'Psionic Energy dice: d6 (3rd), d8 (5th), d10 (11th), d12 (17th). Number: 2× proficiency bonus',
                },
                {
                    name: 'Psychic Blades',
                    level: 3,
                    description: 'You can manifest your psionic power as shimmering blades of psychic energy. Whenever you take the Attack action, you can manifest a psychic blade from your free hand and make the attack with that blade. This magic blade is a simple melee weapon with the finesse and thrown properties. It has a normal range of 60 feet and no long range, and on a hit, it deals psychic damage equal to 1d6 plus the ability modifier you used for the attack roll. The blade vanishes immediately after it hits or misses its target, and it leaves no mark on its target if it deals damage. After you attack with the blade, you can make a melee or ranged weapon attack with a second psychic blade as a bonus action on the same turn, provided your other hand is free to create it. The damage die of this bonus attack is 1d4, instead of 1d6.',
                    actionType: 'action',
                    damage: {
                        dice: '1d6 (main hand), 1d4 (bonus action)',
                        type: 'psychic',
                        scaling: 'Uses ability modifier on both attacks',
                    },
                },
            ],
            9: [
                {
                    name: 'Soul Blades',
                    level: 9,
                    description: 'Your Psychic Blades are now an expression of your psi-suffused soul, giving you these powers that use your Psionic Energy dice: Homing Strikes (if you make an attack roll with your Psychic Blades and miss the target, you can roll a Psionic Energy die and add it to the attack roll, potentially turning a miss into a hit), Psychic Teleportation (as a bonus action, manifest one of your Psychic Blades, expend a Psionic Energy die and roll it, then throw the blade at an unoccupied space you can see up to 10 times the number rolled; you then teleport to that space).',
                    actionType: 'special',
                },
            ],
            13: [
                {
                    name: 'Psychic Veil',
                    level: 13,
                    description: 'You can weave a veil of psychic static to mask yourself. As an action, you can magically become invisible, along with anything you are wearing or carrying, for 1 hour or until you dismiss this effect (no action required). This invisibility ends early immediately after you deal damage to a creature or you force a creature to make a saving throw. Once you use this feature, you can\'t do so again until you finish a long rest, unless you expend a Psionic Energy die to use this feature again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            17: [
                {
                    name: 'Rend Mind',
                    level: 17,
                    description: 'You can sweep your Psychic Blades directly through a creature\'s mind. When you use your Psychic Blades to deal Sneak Attack damage to a creature, you can force that target to make a Wisdom saving throw (DC equal to 8 + your proficiency bonus + your Dexterity modifier). If the save fails, the target is stunned for 1 minute. The stunned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once you use this feature, you can\'t do so again until you finish a long rest, unless you expend three Psionic Energy dice to use it again.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },

    // Sorcerer Subclasses
    {
        name: 'Draconic Bloodline',
        description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors. Most often, sorcerers with this origin trace their descent back to a mighty sorcerer of ancient times who made a bargain with a dragon or who might even have claimed a dragon parent. Some of these bloodlines are well established in the world, but most are obscure. Any given sorcerer could be the first of a new bloodline, as a result of a pact or some other exceptional circumstance.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'PHB',
        features: {
            1: [
                {
                    name: 'Dragon Ancestor',
                    level: 1,
                    description: 'You choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later. You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.',
                    actionType: 'passive',
                },
                {
                    name: 'Draconic Resilience',
                    level: 1,
                    description: 'As magic flows through your body, it causes physical traits of your dragon ancestors to emerge. At 1st level, your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class. Additionally, parts of your skin are covered by a thin sheen of dragon-like scales. When you aren\'t wearing armor, your AC equals 13 + your Dexterity modifier.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Elemental Affinity',
                    level: 6,
                    description: 'When you cast a spell that deals damage of the type associated with your draconic ancestry, you can add your Charisma modifier to one damage roll of that spell. At the same time, you can spend 1 sorcery point to gain resistance to that damage type for 1 hour.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Dragon Wings',
                    level: 14,
                    description: 'You gain the ability to sprout a pair of dragon wings from your back, gaining a flying speed equal to your current speed. You can create these wings as a bonus action on your turn. They last until you dismiss them as a bonus action on your turn. You can\'t manifest your wings while wearing armor unless the armor is made to accommodate them, and clothing not made to accommodate your wings might be destroyed when you manifest them.',
                    actionType: 'bonus action',
                },
            ],
            18: [
                {
                    name: 'Draconic Presence',
                    level: 18,
                    description: 'You can channel the dread presence of your dragon ancestor, causing those around you to become awestruck or frightened. As an action, you can spend 5 sorcery points to draw on this power and exude an aura of awe or fear (your choice) to a distance of 60 feet. For 1 minute or until you lose your concentration (as if you were casting a concentration spell), each hostile creature that starts its turn in this aura must succeed on a Wisdom saving throw or be charmed (if you chose awe) or frightened (if you chose fear) until the aura ends. A creature that succeeds on this saving throw is immune to your aura for 24 hours.',
                    actionType: 'action',
                    usesPerRest: '5 sorcery points',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Wild Magic',
        description: 'Your innate magic comes from the wild forces of chaos that underlie the order of creation. You might have endured exposure to some form of raw magic, perhaps through a planar portal leading to Limbo, the Elemental Planes, or the Far Realm. Perhaps you were blessed by a powerful fey creature or marked by a demon. Or your magic could be a fluke of your birth, with no apparent cause or reason. However it came to be, this chaotic magic churns within you, waiting for any outlet.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'PHB',
        features: {
            1: [
                {
                    name: 'Wild Magic Surge',
                    level: 1,
                    description: 'Your spellcasting can unleash surges of untamed magic. Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect. A Wild Magic Surge can happen once per turn. If a Wild Magic effect is a spell, it\'s too wild to be affected by Metamagic. If it normally requires concentration, it doesn\'t require concentration in this case; the spell lasts for its full duration.',
                    actionType: 'special',
                },
                {
                    name: 'Tides of Chaos',
                    level: 1,
                    description: 'You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw. Once you do so, you must finish a long rest before you can use this feature again. Any time before you regain the use of this feature, the DM can have you roll on the Wild Magic Surge table immediately after you cast a sorcerer spell of 1st level or higher. You then regain the use of this feature.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Bend Luck',
                    level: 6,
                    description: 'You have the ability to twist fate using your wild magic. When another creature you can see makes an attack roll, an ability check, or a saving throw, you can use your reaction and spend 2 sorcery points to roll 1d4 and apply the number rolled as a bonus or penalty (your choice) to the creature\'s roll. You can do so after the creature rolls but before any effects of the roll occur.',
                    actionType: 'reaction',
                    usesPerRest: '2 sorcery points',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Controlled Chaos',
                    level: 14,
                    description: 'You gain a modicum of control over the surges of your wild magic. Whenever you roll on the Wild Magic Surge table, you can roll twice and use either number.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Spell Bombardment',
                    level: 18,
                    description: 'The harmful energy of your spells intensifies. When you roll damage for a spell and roll the highest number possible on any of the dice, choose one of those dice, roll it again and add that roll to the damage. You can use the feature only once per turn.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'Divine Soul',
        description: 'Sometimes the spark of magic that fuels a sorcerer comes from a divine source that glimmers within the soul. Having such a blessed soul is a sign that your innate magic might come from a distant but powerful familial connection to a divine being. Perhaps your ancestor was an angel, transformed into a mortal and sent to fight in a god\'s name. Or your birth might align with an ancient prophecy, marking you as a servant of the gods or a chosen vessel of divine magic.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'XGtE',
        features: {
            1: [
                {
                    name: 'Divine Magic',
                    level: 1,
                    description: 'Your link to the divine allows you to learn spells from the cleric class. When your Spellcasting feature lets you learn or replace a sorcerer cantrip or a sorcerer spell of 1st level or higher, you can choose the new spell from the cleric spell list or the sorcerer spell list. You must otherwise obey all the restrictions for selecting the spell, and it becomes a sorcerer spell for you. In addition, choose an affinity for the source of your divine power: good, evil, law, chaos, or neutrality. You learn an additional spell based on that affinity (Cure Wounds for good, Inflict Wounds for evil, Bless for law, Bane for chaos, or Protection from Evil and Good for neutrality). This spell is a sorcerer spell for you, but it doesn\'t count against your number of sorcerer spells known. If you later replace this spell, you must replace it with a spell from the cleric spell list.',
                    actionType: 'passive',
                },
                {
                    name: 'Favored by the Gods',
                    level: 1,
                    description: 'Divine power guards your destiny. If you fail a saving throw or miss with an attack roll, you can roll 2d4 and add it to the total, possibly changing the outcome. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            6: [
                {
                    name: 'Empowered Healing',
                    level: 6,
                    description: 'The divine energy coursing through you can empower healing spells. Whenever you or an ally within 5 feet of you rolls dice to determine the number of hit points a spell restores, you can spend 1 sorcery point to reroll any number of those dice once, provided you aren\'t incapacitated. You can use this feature only once per turn.',
                    actionType: 'special',
                },
            ],
            14: [
                {
                    name: 'Otherworldly Wings',
                    level: 14,
                    description: 'You can use a bonus action to manifest a pair of spectral wings from your back. While the wings are present, you have a flying speed of 30 feet. The wings last until you\'re incapacitated, you die, or you dismiss them as a bonus action. The affinity you chose for your Divine Magic feature determines the appearance of the spectral wings: eagle wings for good or law, bat wings for evil or chaos, and dragonfly wings for neutrality.',
                    actionType: 'bonus action',
                },
            ],
            18: [
                {
                    name: 'Unearthly Recovery',
                    level: 18,
                    description: 'You gain the ability to overcome grievous injuries. As a bonus action when you have fewer than half of your hit points remaining, you can regain a number of hit points equal to half your hit point maximum. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Shadow Magic',
        description: 'You are a creature of shadow, for your innate magic comes from the Shadowfell itself. You might trace your lineage to an entity from that place, or perhaps you were exposed to its fell energy and transformed by it. The power of shadow magic casts a strange pall over your physical presence. The spark of life that sustains you is muffled, as if it struggles to remain viable against the dark energy that imbues your soul.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'XGtE',
        features: {
            1: [
                {
                    name: 'Eyes of the Dark',
                    level: 1,
                    description: 'You have darkvision with a range of 120 feet. When you reach 3rd level in this class, you learn the Darkness spell, which doesn\'t count against your number of sorcerer spells known. In addition, you can cast it by spending 2 sorcery points or by expending a spell slot. If you cast it with sorcery points, you can see through the darkness created by the spell.',
                    actionType: 'passive',
                },
                {
                    name: 'Strength of the Grave',
                    level: 1,
                    description: 'Your existence in a twilight state between life and death makes you difficult to defeat. When damage reduces you to 0 hit points, you can make a Charisma saving throw (DC 5 + the damage taken). On a success, you instead drop to 1 hit point. You can\'t use this feature if you are reduced to 0 hit points by radiant damage or by a critical hit. After the saving throw succeeds, you can\'t use this feature again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Hound of Ill Omen',
                    level: 6,
                    description: 'You gain the ability to call forth a howling creature of darkness to harry your foes. As a bonus action, you can spend 3 sorcery points to magically summon a hound of ill omen to target one creature you can see within 120 feet of you. The hound uses the dire wolf\'s statistics, with the following changes: the hound is size Medium, not Large, and it counts as a monstrosity, not a beast. It appears with a number of temporary hit points equal to half your sorcerer level. It can move through other creatures and objects as if they were difficult terrain. The hound takes its turn on your initiative. It can move only toward its target by the most direct route, and it can use its action only to attack its target. The hound can make opportunity attacks, but only against its target. Additionally, while the hound is within 5 feet of the target, the target has disadvantage on saving throws against any spell you cast. The hound disappears if it is reduced to 0 hit points, if its target is reduced to 0 hit points, or after 5 minutes.',
                    actionType: 'bonus action',
                    usesPerRest: '3 sorcery points',
                    restType: 'long',
                },
            ],
            14: [
                {
                    name: 'Shadow Walk',
                    level: 14,
                    description: 'You gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action, you can magically teleport up to 120 feet to an unoccupied space you can see that is also in dim light or darkness.',
                    actionType: 'bonus action',
                },
            ],
            18: [
                {
                    name: 'Umbral Form',
                    level: 18,
                    description: 'You can spend 6 sorcery points as a bonus action to magically transform yourself into a shadowy form. In this form, you have resistance to all damage except force and radiant damage, and you can move through other creatures and objects as if they were difficult terrain. You take 5 force damage if you end your turn inside an object. You remain in this form for 1 minute. It ends early if you are incapacitated, if you die, or if you dismiss it as a bonus action.',
                    actionType: 'bonus action',
                    usesPerRest: '6 sorcery points',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Storm Sorcery',
        description: 'Your innate magic comes from the power of elemental air. Many with this power can trace their magic back to a near-death experience caused by the Great Rain, but perhaps you were born during a howling gale so powerful that folk still tell stories of it, or your lineage might include the influence of potent air creatures such as djinn. Whatever the case, the magic of the storm permeates your being.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'XGtE',
        features: {
            1: [
                {
                    name: 'Wind Speaker',
                    level: 1,
                    description: 'The arcane magic you command is infused with elemental air. You can speak, read, and write Primordial. Knowing this language allows you to understand and be understood by those who speak its dialects: Aquan, Auran, Ignan, and Terran.',
                    actionType: 'passive',
                },
                {
                    name: 'Tempestuous Magic',
                    level: 1,
                    description: 'You can use a bonus action on your turn to cause whirling gusts of elemental air to briefly surround you, immediately before or after you cast a spell of 1st level or higher. Doing so allows you to fly up to 10 feet without provoking opportunity attacks.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Heart of the Storm',
                    level: 6,
                    description: 'You gain resistance to lightning and thunder damage. In addition, whenever you start casting a spell of 1st level or higher that deals lightning or thunder damage, stormy magic erupts from you. This eruption causes creatures of your choice that you can see within 10 feet of you to take lightning or thunder damage (choose each time this ability activates) equal to half your sorcerer level.',
                    actionType: 'passive',
                    damage: {
                        dice: 'half sorcerer level',
                        type: 'lightning or thunder',
                        scaling: 'Increases with sorcerer level',
                    },
                },
                {
                    name: 'Storm Guide',
                    level: 6,
                    description: 'You gain the ability to subtly control the weather around you. If it is raining, you can use an action to cause the rain to stop falling in a 20-foot-radius sphere centered on you. You can end this effect as a bonus action. If it is windy, you can use a bonus action each round to choose the direction that the wind blows in a 100-foot-radius sphere centered on you. The wind blows in that direction until the end of your next turn. This feature doesn\'t alter the speed of the wind.',
                    actionType: 'action',
                },
            ],
            14: [
                {
                    name: 'Storm\'s Fury',
                    level: 14,
                    description: 'When you are hit by a melee attack, you can use your reaction to deal lightning damage to the attacker. The damage equals your sorcerer level. The attacker must also make a Strength saving throw against your sorcerer spell save DC. On a failed save, the attacker is pushed in a straight line up to 20 feet away from you.',
                    actionType: 'reaction',
                    damage: {
                        dice: 'sorcerer level',
                        type: 'lightning',
                        scaling: 'Equals sorcerer level',
                    },
                },
            ],
            18: [
                {
                    name: 'Wind Soul',
                    level: 18,
                    description: 'You gain immunity to lightning and thunder damage. You also gain a magical flying speed of 60 feet. As an action, you can reduce your flying speed to 30 feet for 1 hour and choose a number of creatures within 30 feet of you equal to 3 + your Charisma modifier. The chosen creatures gain a magical flying speed of 30 feet for 1 hour. Once you reduce your flying speed in this way, you can\'t do so again until you finish a short or long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    {
        name: 'Aberrant Mind',
        description: 'An alien influence has wrapped its tendrils around your mind, giving you psionic power. You can now touch the minds of other creatures and fill them with alien horror. This power may have come to you after you were exposed to the Far Realm or some horror from beyond reality. Perhaps a psychic wind from the Astral Plane carried it to you. Or you might have been implanted with a mind flayer tadpole and somehow survived the ordeal.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'TCoE',

        spells: {
            byCharacterLevel: {
                1: ['arms-of-hadar', 'dissonant-whispers', 'mind-sliver'],
                3: ['calm-emotions', 'detect-thoughts'],
                5: ['hunger-of-hadar', 'sending'],
                7: ['evards-black-tentacles', 'summon-aberration'],
                9: ['rarys-telepathic-bond', 'telekinesis'],
            },
            alwaysPrepared: true,
        },

        features: {
            1: [
                {
                    name: 'Psionic Spells',
                    level: 1,
                    description: 'You learn additional spells when you reach certain levels in this class. Each of these spells counts as a sorcerer spell for you, but it doesn\'t count against the number of sorcerer spells you know. Whenever you gain a sorcerer level, you can replace one spell you gained from this feature with another spell of the same level. The new spell must be a divination or an enchantment spell from the sorcerer, warlock, or wizard spell list.',
                    actionType: 'passive',
                },
                {
                    name: 'Telepathic Speech',
                    level: 1,
                    description: 'You can form a telepathic connection between your mind and the mind of another. As a bonus action, choose one creature you can see within 30 feet of you. You and the chosen creature can speak telepathically with each other while the two of you are within a number of miles of each other equal to your Charisma modifier (minimum of 1 mile). To understand each other, you each must speak mentally in a language the other knows. The telepathic connection lasts for a number of minutes equal to your sorcerer level. It ends early if you are incapacitated or die or if you use this ability to form a connection with a different creature.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Psionic Sorcery',
                    level: 6,
                    description: 'When you cast any spell of 1st level or higher from your Psionic Spells feature, you can cast it by expending a spell slot as normal or by spending a number of sorcery points equal to the spell\'s level. If you cast the spell using sorcery points, it requires no verbal or somatic components, and it requires no material components, unless they are consumed by the spell.',
                    actionType: 'passive',
                },
                {
                    name: 'Psychic Defenses',
                    level: 6,
                    description: 'You gain resistance to psychic damage, and you have advantage on saving throws against being charmed or frightened.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Revelation in Flesh',
                    level: 14,
                    description: 'You can unleash the aberrant truth hidden within yourself. As a bonus action, you can spend 1 or more sorcery points to magically transform your body for 10 minutes. For each sorcery point you spend, you can gain one of the following benefits of your choice, the effects of which last until the transformation ends: You can see any invisible creature within 60 feet of you, provided it isn\'t behind total cover. You also see into the Ethereal Plane within 60 feet of you; You gain a flying speed equal to your walking speed and can hover; You gain a swimming speed equal to twice your walking speed, and you can breathe underwater; Your body, along with any equipment you are wearing or carrying, becomes slimy and pliable. You can move through any space as narrow as 1 inch without squeezing, and you can spend 5 feet of movement to escape from nonmagical restraints or being grappled.',
                    actionType: 'bonus action',
                },
            ],
            18: [
                {
                    name: 'Warping Implosion',
                    level: 18,
                    description: 'You can unleash your aberrant power as a space-warping anomaly. As an action, you can teleport to an unoccupied space you can see within 120 feet of you. Immediately after you disappear, each creature within 30 feet of the space you left must make a Strength saving throw. On a failed save, a creature takes 3d10 force damage and is pulled straight toward the space you left, ending in an unoccupied space as close to your former space as possible. On a successful save, the creature takes half as much damage and isn\'t pulled. Once you use this feature, you can\'t do so again until you finish a long rest, unless you spend 5 sorcery points to use it again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '3d10',
                        type: 'force',
                        scaling: 'Fixed damage',
                    },
                },
            ],
        },
    },
    {
        name: 'Clockwork Soul',
        description: 'The cosmic force of order has suffused you with magic. That power arises from Mechanus or a realm like it— a plane of existence shaped entirely by clockwork efficiency. You, or someone from your lineage, might have become entangled in the machinations of the modrons, the orderly beings who inhabit Mechanus. Perhaps your ancestor even took part in the Great Modron March. Whatever its origin within you, the power of order can seem strange to others, but for you, it is part of a vast and glorious system.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'TCoE',

        spells: {
            byCharacterLevel: {
                1: ['alarm', 'protection-from-evil-and-good'],
                3: ['aid', 'lesser-restoration'],
                5: ['dispel-magic', 'protection-from-energy'],
                7: ['freedom-of-movement', 'summon-construct'],
                9: ['greater-restoration', 'wall-of-force'],
            },
            alwaysPrepared: true,
        },

        features: {
            1: [
                {
                    name: 'Clockwork Magic',
                    level: 1,
                    description: 'You learn additional spells when you reach certain levels in this class. Each of these spells counts as a sorcerer spell for you, but it doesn\'t count against the number of sorcerer spells you know. Whenever you gain a sorcerer level, you can replace one spell you gained from this feature with another spell of the same level. The new spell must be an abjuration or a transmutation spell from the sorcerer, warlock, or wizard spell list.',
                    actionType: 'passive',
                },
                {
                    name: 'Restore Balance',
                    level: 1,
                    description: 'Your connection to the plane of absolute order allows you to equalize chaotic moments. When a creature you can see within 60 feet of you is about to roll a d20 with advantage or disadvantage, you can use your reaction to prevent the roll from being affected by advantage and disadvantage. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Bastion of Law',
                    level: 6,
                    description: 'You can tap into the grand equation of existence to imbue a creature with a shimmering shield of order. As an action, you can expend 1 to 5 sorcery points to create a magical ward around yourself or another creature you can see within 30 feet of you. The ward lasts until you finish a long rest or until you use this feature again. The ward is represented by a number of d8s equal to the number of sorcery points spent to create it. When the warded creature takes damage, it can expend a number of those dice, roll them, and reduce the damage taken by the total rolled on those dice.',
                    actionType: 'action',
                },
            ],
            14: [
                {
                    name: 'Trance of Order',
                    level: 14,
                    description: 'You gain the ability to align your consciousness to the endless calculations of Mechanus. As a bonus action, you can enter this state for 1 minute. For the duration, attack rolls against you can\'t benefit from advantage, and whenever you make an attack roll, an ability check, or a saving throw, you can treat a roll of 9 or lower on the d20 as a 10. Once you use this bonus action, you can\'t use it again until you finish a long rest, unless you spend 5 sorcery points to use it again.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            18: [
                {
                    name: 'Clockwork Cavalcade',
                    level: 18,
                    description: 'You summon spirits of order to expunge disorder around you. As an action, you summon the spirits in a 30-foot cube originating from you. The spirits look like modrons or other constructs of your choice. The spirits are intangible and invulnerable, and they create the following effects within the cube before vanishing: The spirits restore up to 100 hit points, divided as you choose among any number of creatures of your choice in the cube; Any damaged objects entirely in the cube are repaired instantly; Every spell of 6th level or lower ends on creatures and objects of your choice in the cube. Once you use this action, you can\'t use it again until you finish a long rest, unless you spend 7 sorcery points to use it again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Lunar Sorcery',
        description: 'On many worlds, the moon is a revered celestial body with magical properties. On Krynn, the gods of magic are associated with moons: the silver moon Solinari, the red moon Lunitari, and the invisible black moon Nuitari. On the world of Toril, the god Selûne uses the light of the moon to battle darkness. On Eberron, scholars of the Draconic Prophecy decipher ancient secrets from the waxing and waning of that world\'s twelve moons. You or someone from your lineage has been exposed to the concentrated magic of the moon (or moons) of your world, imbuing you with lunar magic. Perhaps your ancestor was involved in a druidic ritual involving an eclipse, or maybe a mystical fragment of a moon crashed near you. However you came to have your magic, your connection to the moon is obvious when you cast sorcerer spells.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'DSotDQ',

        spells: {
            byCharacterLevel: {
                1: ['shield', 'ray-of-sickness', 'color-spray'],
                3: ['lesser-restoration', 'blindness-deafness', 'alter-self'],
                5: ['dispel-magic', 'vampiric-touch', 'phantom-steed'],
                7: ['death-ward', 'confusion', 'hallucinatory-terrain'],
                9: ['rarys-telepathic-bond', 'hold-monster', 'mislead'],
            },
            alwaysPrepared: true,
        },

        features: {
            1: [
                {
                    name: 'Lunar Embodiment',
                    level: 1,
                    description: 'You learn additional spells when you reach certain levels in this class, as shown on the Lunar Spells table. Each spell you gain from this feature is associated with one of the lunar phases (Full Moon, New Moon, or Crescent Moon). Whenever you finish a long rest, you can choose what lunar phase manifests its power through your magic. While in the chosen phase, you can cast one 1st-level spell of that phase once without expending a spell slot. Once you cast a spell in this way, you can\'t do so again until you finish a long rest.',
                    actionType: 'passive',
                },
                {
                    name: 'Moon Fire',
                    level: 1,
                    description: 'You can call down the radiant light of the moon on command. You learn the Sacred Flame spell, which doesn\'t count against the number of sorcerer cantrips you know. When you cast Sacred Flame, you can target one creature as normal or target two creatures within range that are within 5 feet of each other.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Lunar Boons',
                    level: 6,
                    description: 'The current phase of your Lunar Embodiment can affect your Metamagic feature. Each Lunar Embodiment phase is associated with certain schools of magic: Full Moon (abjuration and divination spells), New Moon (enchantment and necromancy spells), and Crescent Moon (illusion and transmutation spells). Whenever you use Metamagic on a spell of a school of magic associated with your current Lunar Embodiment phase, you can reduce the sorcery points spent by 1 (minimum 0).',
                    actionType: 'passive',
                },
                {
                    name: 'Waxing and Waning',
                    level: 6,
                    description: 'You gain greater control over the phases of your lunar magic. As a bonus action, you can spend 1 sorcery point to change your current Lunar Embodiment phase to a different one. You can now cast one 1st-level spell from each lunar phase once without expending a spell slot, provided your current phase is the same as the spell\'s.',
                    actionType: 'bonus action',
                },
            ],
            14: [
                {
                    name: 'Lunar Empowerment',
                    level: 14,
                    description: 'The power of a lunar phase saturates your being. Whenever you choose a Lunar Embodiment phase, you gain the following benefit associated with that phase: Full Moon (you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and you and creatures of your choice have advantage on Investigation and Perception checks while within the bright light you shed), New Moon (you have advantage on Stealth checks, and while you are entirely in darkness, attack rolls have disadvantage against you), Crescent Moon (you have resistance to necrotic and radiant damage).',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Lunar Phenomenon',
                    level: 18,
                    description: 'As a bonus action, you can tap into a special power of your current Lunar Embodiment phase. Once you use this bonus action, you can\'t use it again until you finish a long rest, unless you spend 5 sorcery points to use it again. The power you gain depends on your current phase: Full Moon (you radiate moonlight for 1 minute, and during that time, you and creatures you choose have advantage on attack rolls and saving throws, and each of these creatures gains 10 temporary hit points), New Moon (you become an avatar of darkness for 1 minute, causing any creature to have disadvantage on attack rolls against you, and whenever any creature hits you with an attack during this time, that creature takes necrotic damage equal to half your sorcerer level), Crescent Moon (you can magically teleport to an unoccupied space you can see within 60 feet of yourself, and you can bring along one willing creature you can see within 5 feet of yourself, who also gains 3d8 temporary hit points and can reduce the number rolled on one d20 by one of the numbers rolled on these dice).',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Phoenix Sorcery',
        description: 'Your power draws from the immortal flame that fuels the legendary phoenix. You or your ancestors perhaps rendered a phoenix a great service, or you were born in fire as the phoenix was reborn, or a ritual of flame touched your soul. Whatever the cause, a shard of the phoenix\'s power lives within you. That power is a mixed blessing. Like the mythical creature, you can invoke fiery energy and gain the ability to cheat death itself. This power comes at a cost. The fire within you seethes, demanding to be unleashed. You sometimes find yourself absentmindedly feeding fires. You can\'t bear to allow a fire to sputter out. You feel most comfortable while holding a lit torch or sitting in front of a campfire.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'TCoE',
        features: {
            1: [
                {
                    name: 'Ignite',
                    level: 1,
                    description: 'At 1st level, you gain the ability to start fires with a touch. As an action, you can magically ignite a flammable object you touch with your hand—an object such as a torch, a piece of tinder, or the hem of drapes.',
                    actionType: 'action',
                },
                {
                    name: 'Mantle of Flame',
                    level: 1,
                    description: 'Starting at 1st level, you can unleash the phoenix fire that blazes within you. As a bonus action, you magically wreathe yourself in swirling fire, as your eyes glow like hot coals. For 1 minute, you gain the following benefits: You shed bright light in a 30-foot radius and dim light for an additional 30 feet; Any creature takes fire damage equal to your Charisma modifier if it hits you with a melee attack from within 5 feet of you or if it touches you; Whenever you roll fire damage on your turn, the roll gains a bonus equal to your Charisma modifier. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Phoenix Spark',
                    level: 6,
                    description: 'Starting at 6th level, the fiery energy within you grows restless and vengeful. In the face of defeat, it surges outward to preserve you in a fiery roar. If you are reduced to 0 hit points, you can use your reaction to draw on the spark of the phoenix. You are instead reduced to 1 hit point, and each creature within 10 feet of you takes fire damage equal to half your sorcerer level + your Charisma modifier. If you use this feature while under the effects of your Mantle of Flame, this feature deals an extra 1d6 fire damage. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: 'half sorcerer level + Cha mod (+ 1d6 if Mantle active)',
                        type: 'fire',
                        scaling: 'Increases with sorcerer level',
                    },
                },
            ],
            14: [
                {
                    name: 'Nourishing Fire',
                    level: 14,
                    description: 'Starting at 14th level, your fire spells soothe and restore you. When you expend a spell slot to cast a spell that includes a fire damage roll, you regain hit points equal to the slot\'s level + your Charisma modifier.',
                    actionType: 'passive',
                },
            ],
            18: [
                {
                    name: 'Form of the Phoenix',
                    level: 18,
                    description: 'At 18th level, you finally master the spark of fire that dances within you. While under the effect of your Mantle of Flame feature, you gain additional benefits: You have a flying speed of 40 feet and can hover; You have resistance to all damage; If you use your Phoenix Spark, that feature deals an extra 1d6 fire damage to each creature.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'Stone Sorcery',
        description: 'Your magic springs from a mystical link between your soul and the magic of elemental earth. You might trace a distant ancestor to the Plane of Earth, or your family might have earned a mighty boon in return for a service to the dao lords. Whatever your past, the magic of elemental earth is yours to command. Your link to earth magic grants you extraordinary resilience, and stone sorcerers have a natural affinity for combat. A steel blade feels like a natural extension of your body, and sorcerers with this origin have a knack for wielding both shields and weapons. In combat your place is amid the fray. You rely on your elemental nature to shield you from harm and your magic and metal weapons to overwhelm your foes.',
        class: 'sorcerer',
        subclass_level: 1,
        sourcebook: 'TCoE',
        proficiencies: {
            armor: ['shields'],
            weapons: ['simple-weapons', 'martial-weapons'],
        },
        features: {
            1: [
                {
                    name: 'Bonus Proficiencies',
                    level: 1,
                    description: 'At 1st level, you gain proficiency with shields, simple weapons, and martial weapons.',
                    actionType: 'passive',
                },
                {
                    name: 'Metal Magic',
                    level: 1,
                    description: 'Your affinity for metal gives you the option to learn some non-sorcerer spells that focus on weapon attacks. When your Spellcasting feature lets you learn a sorcerer spell of 1st level or higher, you can select the spell from the following list of spells, in addition to the sorcerer spell list: Compelled Duel, Searing Smite, Thunderous Smite, Wrathful Smite, Magic Weapon, and others. Once you select a spell from this list to learn, it counts as a sorcerer spell for you.',
                    actionType: 'passive',
                },
                {
                    name: 'Stone\'s Durability',
                    level: 1,
                    description: 'Your connection to stone gives you extra fortitude. Your hit point maximum increases by 1, and it increases by 1 again whenever you gain a level in this class. As an action, you can gain a base AC of 13 + your Constitution modifier if you aren\'t wearing armor, and your skin assumes a stony appearance. This effect lasts until you end it as a bonus action, you are incapacitated, or you don armor other than a shield.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Stone Aegis',
                    level: 6,
                    description: 'Starting at 6th level, your command of earth magic grows stronger, allowing you to harness it for your allies\' protection. As a bonus action, you can grant an aegis to one allied creature you can see within 60 feet of you. The aegis is a dim, gray aura of earth magic that protects the target. Any bludgeoning, piercing, or slashing damage the target takes is reduced by 2 + your sorcerer level ÷ 4. This effect lasts for 1 minute, until you use it again, or until you are incapacitated. In addition, when a creature you can see within 60 feet of the protected target hits it with a melee attack, you can use your reaction to teleport to an unoccupied space you can see within 5 feet of the attacker. You can teleport only if you and the attacker are on the same surface. You can then make one melee weapon attack against the attacker. If that attack hits, it deals an extra 1d10 force damage. This extra damage increases to 2d10 at 11th level and 3d10 at 17th level.',
                    actionType: 'bonus action',
                    damage: {
                        dice: '1d10 (2d10 at 11th, 3d10 at 17th)',
                        type: 'force',
                        scaling: 'Increases at levels 11 and 17',
                    },
                },
            ],
            14: [
                {
                    name: 'Stone\'s Edge',
                    level: 14,
                    description: 'Starting at 14th level, your mastery of earth magic allows you to add the force of elemental earth to your spells. When you cast a spell that deals damage, choose one creature damaged by that spell on the round you cast it. That creature takes extra force damage equal to half your sorcerer level. This feature can be used only once per casting of a spell.',
                    actionType: 'passive',
                    damage: {
                        dice: 'half sorcerer level',
                        type: 'force',
                        scaling: 'Increases with sorcerer level',
                    },
                },
            ],
            18: [
                {
                    name: 'Earth Master\'s Aegis',
                    level: 18,
                    description: 'Beginning at 18th level, when you use your Stone Aegis to protect an ally, you can choose up to three creatures to gain its benefits.',
                    actionType: 'passive',
                },
            ],
        },
    },

    // Warlock Subclasses
    {
        name: 'The Archfey',
        description: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born. This being\'s motivations are often inscrutable, and sometimes whimsical, and might involve a striving for greater magical power or the settling of age-old grudges. Beings of this sort include the Prince of Frost; the Queen of Air and Darkness, ruler of the Gloaming Court; Titania of the Summer Court; her consort Oberon, the Green Lord; Hyrsam, the Prince of Fools; and ancient hags.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'PHB',

        spells: {
            byCharacterLevel: {
                1: ['faerie-fire', 'sleep'],
                3: ['calm-emotions', 'phantasmal-force'],
                5: ['blink', 'plant-growth'],
                7: ['dominate-beast', 'greater-invisibility'],
                9: ['dominate-person', 'seeming'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Fey Presence',
                    level: 1,
                    description: 'Starting at 1st level, your patron bestows upon you the ability to project the beguiling and fearsome presence of the fey. As an action, you can cause each creature in a 10-foot cube originating from you to make a Wisdom saving throw against your warlock spell save DC. The creatures that fail their saving throws are all charmed or frightened by you (your choice) until the end of your next turn. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            6: [
                {
                    name: 'Misty Escape',
                    level: 6,
                    description: 'Starting at 6th level, you can vanish in a puff of mist in response to harm. When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet to an unoccupied space you can see. You remain invisible until the start of your next turn or until you attack or cast a spell. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            10: [
                {
                    name: 'Beguiling Defenses',
                    level: 10,
                    description: 'Beginning at 10th level, your patron teaches you how to turn the mind-affecting magic of your enemies against them. You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature. The creature must succeed on a Wisdom saving throw against your warlock spell save DC or be charmed by you for 1 minute or until the creature takes any damage.',
                    actionType: 'reaction',
                },
            ],
            14: [
                {
                    name: 'Dark Delirium',
                    level: 14,
                    description: 'Starting at 14th level, you can plunge a creature into an illusory realm. As an action, choose a creature that you can see within 60 feet of you. It must make a Wisdom saving throw against your warlock spell save DC. On a failed save, it is charmed or frightened by you (your choice) for 1 minute or until your concentration is broken (as if you are concentrating on a spell). This effect ends early if the creature takes any damage. Until this illusion ends, the creature thinks it is lost in a misty realm, the appearance of which you choose. The creature can see and hear only itself, you, and the illusion. You must finish a short or long rest before you can use this feature again.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    {
        name: 'The Fiend',
        description: 'You have made a pact with a fiend from the lower planes of existence, a being whose aims are evil, even if you strive against those aims. Such beings desire the corruption or destruction of all things, ultimately including you. Fiends powerful enough to forge a pact include demon lords such as Demogorgon, Orcus, Fraz\'Urb-luu, and Baphomet; archdevils such as Asmodeus, Dispater, Mephistopheles, and Belial; pit fiends and balors that are especially mighty; and ultroloths and other lords of the yugoloths.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'PHB',

        spells: {
            byCharacterLevel: {
                1: ['burning-hands', 'command'],
                3: ['blindness-deafness', 'scorching-ray'],
                5: ['fireball', 'stinking-cloud'],
                7: ['fire-shield', 'wall-of-fire'],
                9: ['flame-strike', 'hallow'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Dark One\'s Blessing',
                    level: 1,
                    description: 'Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Dark One\'s Own Luck',
                    level: 6,
                    description: 'Starting at 6th level, you can call on your patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll. You can do so after seeing the initial roll but before any of the roll\'s effects occur. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            10: [
                {
                    name: 'Fiendish Resilience',
                    level: 10,
                    description: 'Starting at 10th level, you can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one with this feature. Damage from magical weapons or silver weapons ignores this resistance.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Hurl Through Hell',
                    level: 14,
                    description: 'Starting at 14th level, when you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes. The creature disappears and hurtles through a nightmare landscape. At the end of your next turn, the target returns to the space it previously occupied, or the nearest unoccupied space. If the target is not a fiend, it takes 10d10 psychic damage as it reels from its horrific experience. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '10d10',
                        type: 'psychic',
                        scaling: 'Fixed damage',
                    },
                },
            ],
        },
    },
    {
        name: 'The Great Old One',
        description: 'Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality. It might come from the Far Realm, the space beyond reality, or it could be one of the elder gods known only in legends. Its motives are incomprehensible to mortals, and its knowledge so immense and ancient that even the greatest libraries pale in comparison to the vast secrets it holds. The Great Old One might be unaware of your existence or entirely indifferent to you, but the secrets you have learned allow you to draw your magic from it. Entities of this type include Ghaunadar, called That Which Lurks; Tharizdun, the Chained God; Dendar, the Night Serpent; Zargon, the Returner; Great Cthulhu; and other unfathomable beings.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'PHB',

        spells: {
            byCharacterLevel: {
                1: ['dissonant-whispers', 'tashas-hideous-laughter'],
                3: ['detect-thoughts', 'phantasmal-force'],
                5: ['clairvoyance', 'sending'],
                7: ['dominate-beast', 'evards-black-tentacles'],
                9: ['dominate-person', 'telekinesis'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Awakened Mind',
                    level: 1,
                    description: 'Starting at 1st level, your alien knowledge gives you the ability to touch the minds of other creatures. You can telepathically speak to any creature you can see within 30 feet of you. You don\'t need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Entropic Ward',
                    level: 6,
                    description: 'At 6th level, you learn to magically ward yourself against attack and to turn an enemy\'s failed strike into good luck for yourself. When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on that roll. If the attack misses you, your next attack roll against the creature has advantage if you make it before the end of your next turn. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            10: [
                {
                    name: 'Thought Shield',
                    level: 10,
                    description: 'Starting at 10th level, your thoughts can\'t be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Create Thrall',
                    level: 14,
                    description: 'At 14th level, you gain the ability to infect a humanoid\'s mind with the alien magic of your patron. You can use your action to touch an incapacitated humanoid. That creature is then charmed by you until a Remove Curse spell is cast on it, the charmed condition is removed from it, or you use this feature again. You can communicate telepathically with the charmed creature as long as the two of you are on the same plane of existence.',
                    actionType: 'action',
                },
            ],
        },
    },
    {
        name: 'The Celestial',
        description: 'Your patron is a powerful being of the Upper Planes. You have bound yourself to an ancient empyrean, solar, ki-rin, unicorn, or other entity that resides in the planes of everlasting bliss. Your pact with that being allows you to experience the barest touch of the holy light that illuminates the multiverse. Being connected to such power can cause changes in your behavior and beliefs. You might find yourself driven to annihilate the undead, to defeat fiends, and to protect the innocent. At times, your heart might also be filled with a longing for the celestial realm of your patron, and a desire to wander that paradise for the rest of your days. But you know that your mission is among mortals for now, and that your pact binds you to bring light to the dark places of the world.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'XGtE',

        spells: {
            byCharacterLevel: {
                1: ['cure-wounds', 'guiding-bolt'],
                3: ['flaming-sphere', 'lesser-restoration'],
                5: ['daylight', 'revivify'],
                7: ['guardian-of-faith', 'wall-of-fire'],
                9: ['flame-strike', 'greater-restoration'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Bonus Cantrips',
                    level: 1,
                    description: 'At 1st level, you learn the Light and Sacred Flame cantrips. They count as warlock cantrips for you, but they don\'t count against your number of cantrips known.',
                    actionType: 'passive',
                },
                {
                    name: 'Healing Light',
                    level: 1,
                    description: 'At 1st level, you gain the ability to channel celestial energy to heal wounds. You have a pool of d6s that you spend to fuel this healing. The number of dice in the pool equals 1 + your warlock level. As a bonus action, you can heal one creature you can see within 60 feet of you, spending dice from the pool. The maximum number of dice you can spend at once equals your Charisma modifier (minimum of one die). Roll the dice you spend, add them together, and restore a number of hit points equal to the total. Your pool regains all expended dice when you finish a long rest.',
                    actionType: 'bonus action',
                },
            ],
            6: [
                {
                    name: 'Radiant Soul',
                    level: 6,
                    description: 'Starting at 6th level, your link to the Celestial allows you to serve as a conduit for radiant energy. You have resistance to radiant damage, and when you cast a spell that deals radiant or fire damage, you can add your Charisma modifier to one radiant or fire damage roll of that spell against one of its targets.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Celestial Resilience',
                    level: 10,
                    description: 'Starting at 10th level, you gain temporary hit points whenever you finish a short or long rest. These temporary hit points equal your warlock level + your Charisma modifier. Additionally, choose up to five creatures you can see at the end of the rest. Those creatures each gain temporary hit points equal to half your warlock level + your Charisma modifier.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Searing Vengeance',
                    level: 14,
                    description: 'Starting at 14th level, the radiant energy you channel allows you to resist death. When you have to make a death saving throw at the start of your turn, you can instead spring back to your feet with a burst of radiant energy. You regain hit points equal to half your hit point maximum, and then you stand up if you so choose. Each creature of your choice that is within 30 feet of you takes radiant damage equal to 2d8 + your Charisma modifier, and is blinded until the end of the current turn. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '2d8 + Charisma modifier',
                        type: 'radiant',
                        scaling: 'Fixed damage',
                    },
                },
            ],
        },
    },
    {
        name: 'The Hexblade',
        description: 'You have made your pact with a mysterious entity from the Shadowfell - a force that manifests in sentient magic weapons carved from the stuff of shadow. The mighty sword Blackrazor is the most notable of these weapons, which have been spread across the multiverse over the ages. The shadowy force behind these weapons can offer power to warlocks who form pacts with it. Many hexblade warlocks create weapons that emulate those formed in the Shadowfell. Others forgo such arms, content to weave the dark magic of that plane into their spellcasting. As a hexblade warlock, you have been drawn to this power and now walk a perilous path between the light and the darkness.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'XGtE',

        spells: {
            byCharacterLevel: {
                1: ['shield', 'wrathful-smite'],
                3: ['blur', 'branding-smite'],
                5: ['blink', 'elemental-weapon'],
                7: ['phantasmal-killer', 'staggering-smite'],
                9: ['banishing-smite', 'cone-of-cold'],
            },
            alwaysPrepared: false,
        },

        proficiencies: {
            armor: ['medium-armor', 'shields'],
            weapons: ['martial-weapons'],
        },

        features: {
            1: [
                {
                    name: 'Hexblade\'s Curse',
                    level: 1,
                    description: 'Starting at 1st level, you gain the ability to place a baleful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute. The curse ends early if the target dies, you die, or you are incapacitated. Until the curse ends, you gain the following benefits: You gain a bonus to damage rolls against the cursed target. The bonus equals your proficiency bonus. Any attack roll you make against the cursed target is a critical hit on a roll of 19 or 20 on the d20. If the cursed target dies, you regain hit points equal to your warlock level + your Charisma modifier (minimum of 1 hit point). You can\'t use this feature again until you finish a short or long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                },
                {
                    name: 'Hex Warrior',
                    level: 1,
                    description: 'At 1st level, you acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons. The influence of your patron also allows you to mystically channel your will through a particular weapon. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls. This benefit lasts until you finish a long rest. If you later gain the Pact of the Blade feature, this benefit extends to every pact weapon you conjure with that feature, no matter the weapon\'s type.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Accursed Specter',
                    level: 6,
                    description: 'Starting at 6th level, you can curse the soul of a person you slay, temporarily binding it in your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter. When the specter appears, it gains temporary hit points equal to half your warlock level. Roll initiative for the specter, which has its own turns. It obeys your verbal commands, and it gains a special bonus to its attack rolls equal to your Charisma modifier (minimum of +0). The specter remains in your service until the end of your next long rest, at which point it vanishes to the afterlife. Once you bind a specter with this feature, you can\'t use the feature again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Armor of Hexes',
                    level: 10,
                    description: 'At 10th level, your hex grows more powerful. If the target cursed by your Hexblade\'s Curse hits you with an attack roll, you can use your reaction to roll a d6. On a 4 or higher, the attack instead misses you, regardless of its roll.',
                    actionType: 'reaction',
                },
            ],
            14: [
                {
                    name: 'Master of Hexes',
                    level: 14,
                    description: 'Starting at 14th level, you can spread your Hexblade\'s Curse from a slain creature to another creature. When the creature cursed by your Hexblade\'s Curse dies, you can apply the curse to a different creature you can see within 30 feet of you, provided you aren\'t incapacitated. When you apply the curse in this way, you don\'t regain hit points from the death of the previously cursed creature.',
                    actionType: 'special',
                },
            ],
        },
    },
    {
        name: 'The Fathomless',
        description: 'You have plunged into a pact with the deeps. An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now allows you to draw on its thalassic power. Is it merely using you to learn about terrestrial realms, or does it want you to open cosmic floodgates and drown the world? Perhaps you were born into a generational cult that venerates the Fathomless and its spawn. Or you might have been shipwrecked and on the brink of drowning when your patron\'s grasp offered you a chance at life. Whatever the reason for your pact, the sea and its unknown depths call to you. Entities of the deep that might empower a warlock include krakens, ancient water elementals, godlike hallucinations dreamed into being by kuo-toa, merfolk demigods, and sea hag covens.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'TCoE',

        spells: {
            byCharacterLevel: {
                1: ['create-or-destroy-water', 'thunderwave'],
                3: ['gust-of-wind', 'silence'],
                5: ['lightning-bolt', 'sleet-storm'],
                7: ['control-water', 'summon-elemental'],
                9: ['bigbys-hand', 'cone-of-cold'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Tentacle of the Deeps',
                    level: 1,
                    description: 'At 1st level, you can magically summon a spectral tentacle that strikes at your foes. As a bonus action, you create a 10-foot-long tentacle at a point you can see within 60 feet of you. The tentacle lasts for 1 minute or until you use this feature to create another tentacle. When you create the tentacle, you can make a melee spell attack against one creature within 10 feet of it. On a hit, the target takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn. When you reach 10th level in this class, the damage increases to 2d8. As a bonus action on your turn, you can move the tentacle up to 30 feet and repeat the attack. You can summon the tentacle a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                    damage: {
                        dice: '1d8 (2d8 at 10th)',
                        type: 'cold',
                        scaling: 'Increases to 2d8 at 10th level',
                    },
                },
                {
                    name: 'Gift of the Sea',
                    level: 1,
                    description: 'Also at 1st level, you gain a swimming speed of 40 feet, and you can breathe underwater.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Oceanic Soul',
                    level: 6,
                    description: 'At 6th level, you are now even more at home in the depths. You gain resistance to cold damage. In addition, when you are fully submerged, any creature that is also fully submerged can understand your speech, and you can understand theirs.',
                    actionType: 'passive',
                },
                {
                    name: 'Guardian Coil',
                    level: 6,
                    description: 'At 6th level, your Tentacle of the Deeps can defend you and others, interposing itself between them and harm. When you or a creature you can see takes damage while within 10 feet of the tentacle, you can use your reaction to choose one of those creatures and reduce the damage to that creature by 1d8. When you reach 10th level in this class, the damage reduced by the tentacle increases to 2d8.',
                    actionType: 'reaction',
                },
            ],
            10: [
                {
                    name: 'Grasping Tentacles',
                    level: 10,
                    description: 'Starting at 10th level, you learn the spell Evard\'s Black Tentacles. It counts as a warlock spell for you, but it doesn\'t count against the number of spells you know. You can also cast it once without using a spell slot, and you regain the ability to do so when you finish a long rest. Whenever you cast this spell, your patron\'s magic bolsters you, granting you a number of temporary hit points equal to your warlock level. Moreover, damage can\'t break your concentration on this spell.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Fathomless Plunge',
                    level: 14,
                    description: 'Starting at 14th level, you can magically open temporary conduits to watery destinations. As an action, you can teleport yourself and up to five other willing creatures that you can see within 30 feet of you. Amid a whirl of tentacles, you all vanish and then reappear up to 1 mile away in a body of water you\'ve seen (pond size or larger) or within 30 feet of it, each of you appearing in an unoccupied space within 30 feet of the others. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },
    {
        name: 'The Genie',
        description: 'You have made a pact with one of the rarest kinds of genie, a noble genie. Such entities rule vast fiefs on the Elemental Planes and have great influence over lesser genies and elemental creatures. Noble genies are varied in their motivations, but most are arrogant and wield power that rivals that of lesser deities. They delight in turning the table on mortals, who often bind genies into servitude, and readily enter into pacts that expand their reach. You choose your patron\'s kind or determine it randomly, using the Genie Kind table.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'TCoE',

        spells: {
            byCharacterLevel: {
                1: ['detect-evil-and-good'],
                3: ['phantasmal-force'],
                5: ['create-food-and-water'],
                7: ['phantasmal-killer'],
                9: ['creation', 'wish'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Genie\'s Vessel',
                    level: 1,
                    description: 'Your patron gifts you a magical vessel that grants you a measure of the genie\'s power. The vessel is a Tiny object, and you can use it as a spellcasting focus for your warlock spells. You decide what the object is, or you can determine what it is randomly by rolling on the Genie\'s Vessel table. While you are touching the vessel, you can use it in the following ways: Bottled Respite (as an action, you can magically vanish and enter your vessel, which remains in the space you left; the interior is an extradimensional space in the shape of a 20-foot-radius cylinder, 20 feet high; you can remain inside for up to twice your proficiency bonus hours; you exit early as a bonus action; you exit early if you die or the vessel is destroyed); Genie\'s Wrath (once per turn when you hit with an attack roll, you can deal extra damage equal to your proficiency bonus; the damage type is determined by your patron: bludgeoning for dao, thunder for djinni, fire for efreeti, or cold for marid).',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Elemental Gift',
                    level: 6,
                    description: 'At 6th level, you begin to take on characteristics of your patron\'s kind. You now have resistance to a damage type determined by your patron\'s kind: bludgeoning (dao), thunder (djinni), fire (efreeti), or cold (marid). In addition, as a bonus action, you can give yourself a flying speed of 30 feet that lasts for 10 minutes, during which you can hover. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Sanctuary Vessel',
                    level: 10,
                    description: 'At 10th level, when you enter your Genie\'s Vessel via the Bottled Respite feature, you can now choose up to five willing creatures that you can see within 30 feet of you, and the chosen creatures are drawn into the vessel with you. As a bonus action, you can eject any number of creatures from the vessel, and everyone is ejected if you leave or die or if the vessel is destroyed. In addition, anyone (including you) who remains within the vessel for at least 10 minutes gains the benefit of finishing a short rest, and anyone can add your proficiency bonus to the number of hit points they regain if they spend any Hit Dice as part of that short rest.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Limited Wish',
                    level: 14,
                    description: 'At 14th level, you entreat your patron to grant you a small wish. As an action, you can speak your desire to your Genie\'s Vessel, requesting the effect of one spell that is 6th level or lower and has a casting time of 1 action. The spell can be from any class\'s spell list, and you don\'t need to meet the requirements in that spell, including costly components; the spell simply takes effect as part of this action. Once you use this feature, you can\'t use it again until you finish 1d4 long rests.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'The Undead',
        description: 'You\'ve made a pact with a deathless being, a creature that defies the cycle and life and death, forsaking its mortal shell so it might eternally pursue its unfathomable ambitions. For such beings, time and morality are fleeting things, the concerns of those for whom grains of sand still rush through life\'s hourglass. Having once been mortal themselves, these ancient undead know firsthand the paths of ambition and the routes past the doors of death. They eagerly share this profane knowledge, along with other secrets, with those who work their will among the living. Beings of this type include the demilich Acererak, the vampire tyrant Kas the Bloody-Handed, the githyanki lich-queen Vlaakith, the dracolich Dragotha, the undead pharaoh Ankhtepot, and the elusive Darklord Azalin Rex.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'VRGtR',

        spells: {
            byCharacterLevel: {
                1: ['bane', 'false-life'],
                3: ['blindness-deafness', 'phantasmal-force'],
                5: ['phantom-steed', 'speak-with-dead'],
                7: ['death-ward', 'greater-invisibility'],
                9: ['antilife-shell', 'cloudkill'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Form of Dread',
                    level: 1,
                    description: 'At 1st level, you manifest an aspect of your patron\'s dreadful power. As a bonus action, you transform for 1 minute. You gain the following benefits while transformed: You gain temporary hit points equal to 1d10 + your warlock level. Once during each of your turns, when you hit a creature with an attack roll, you can force it to make a Wisdom saving throw, and if the saving throw fails, the target is frightened of you until the end of your next turn. You are immune to the frightened condition. You can transform a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest. The appearance of your Form of Dread reflects some aspect of your patron.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Grave Touched',
                    level: 6,
                    description: 'At 6th level, your patron\'s powers have a profound effect on your body and magic. You don\'t need to eat, drink, or breathe. In addition, once during each of your turns, when you hit a creature with an attack and roll damage against the creature, you can replace the damage type with necrotic damage. While you are using your Form of Dread, you can roll one additional damage die when determining the necrotic damage the target takes.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Necrotic Husk',
                    level: 10,
                    description: 'At 10th level, your connection to undeath and necrotic energy now saturates your body. You have resistance to necrotic damage. If you are transformed using your Form of Dread, you instead become immune to necrotic damage. In addition, when you are reduced to 0 hit points, you can use your reaction to drop to 1 hit point instead and cause your body to erupt with deathly energy. Each creature of your choice that is within 30 feet of you takes necrotic damage equal to 2d10 + your warlock level. You then gain 1 level of exhaustion. Once you use this reaction, you can\'t do so again until you finish 1d4 long rests.',
                    actionType: 'reaction',
                    damage: {
                        dice: '2d10 + warlock level',
                        type: 'necrotic',
                        scaling: 'Fixed damage',
                    },
                },
            ],
            14: [
                {
                    name: 'Spirit Projection',
                    level: 14,
                    description: 'At 14th level, your body is a vessel that can be inhabited by your spirit. As an action, you can project your spirit from your body. The body you leave behind is unconscious and in a state of suspended animation. Your spirit can remain outside your body for up to 1 hour or until your concentration is broken (as if concentrating on a spell). When your projection ends, your spirit returns to your body or your body magically teleports to your spirit\'s space (your choice). While projecting your spirit, you gain the following benefits: Your spirit and body gain resistance to bludgeoning, piercing, and slashing damage. When you cast a spell of the conjuration or necromancy school, the spell doesn\'t require verbal or somatic components or material components that lack a gold cost. You have a flying speed equal to your walking speed and can hover. You can move through creatures and objects as if they were difficult terrain, but you take 1d10 force damage if you end your turn inside a creature or an object. While you are using your Form of Dread, once during each of your turns when you deal necrotic damage to a creature, you regain hit points equal to half the amount of necrotic damage dealt. Once you use this feature, you can\'t do so again until you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'The Undying',
        description: 'Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize - like all power - comes at a price. Once mortal, the Undying has seen mortal lifetimes pass like the seasons, like the flicker of endless days and nights. It has the secrets it learned to sustain its immortality. It often shares these secrets with those who serve its will. Undying patrons aren\'t just immortal; they\'re eternal. They live on not through the magic of necromancy, but through some deeper truth. The Undying patron is found in such beings as: the arch-lich Acererak, the dark goddess Shar, the Raven Queen, the dracolich Chthonius, and the corpse king Andok Dur.',
        class: 'warlock',
        subclass_level: 1,
        sourcebook: 'SCAG',

        spells: {
            byCharacterLevel: {
                1: ['false-life', 'ray-of-sickness'],
                3: ['blindness-deafness', 'silence'],
                5: ['feign-death', 'speak-with-dead'],
                7: ['aura-of-life', 'death-ward'],
                9: ['contagion', 'legend-lore'],
            },
            alwaysPrepared: false,
        },

        features: {
            1: [
                {
                    name: 'Among the Dead',
                    level: 1,
                    description: 'Starting at 1st level, you learn the Spare the Dying cantrip, which counts as a warlock cantrip for you. You also have advantage on saving throws against any disease. Additionally, undead have difficulty harming you. If an undead targets you directly with an attack or a harmful spell, that creature must make a Wisdom saving throw against your spell save DC (an undead needn\'t make the save when it includes you in an area effect, such as the explosion of fireball). On a failed save, the creature must choose a new target or forfeit targeting someone instead of you, potentially wasting the attack or spell. On a successful save, the creature is immune to this effect for 24 hours. An undead is also immune to this effect for 24 hours if you target it with an attack or a harmful spell.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Defy Death',
                    level: 6,
                    description: 'Starting at 6th level, you can give yourself vitality when you cheat death or when you help someone else cheat it. You can regain hit points equal to 1d8 + your Constitution modifier (minimum of 1 hit point) when you succeed on a death saving throw or when you stabilize a creature with Spare the Dying. Once you use this feature, you can\'t use it again until you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Undying Nature',
                    level: 10,
                    description: 'Beginning at 10th level, you can hold your breath indefinitely, and you don\'t require food, water, or sleep, although you still require rest to reduce exhaustion and still benefit from finishing short and long rests. In addition, you age at a slower rate. For every 10 years that pass, your body ages only 1 year, and you are immune to being magically aged.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Indestructible Life',
                    level: 14,
                    description: 'When you reach 14th level, you partake of some of the true secrets of the Undying. On your turn, you can use a bonus action to regain hit points equal to 1d8 + your warlock level. Additionally, if you put a severed body part of yours back in place when you use this feature, the part reattaches. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'bonus action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
        },
    },

    // Wizard Subclasses
    {
        name: 'School of Abjuration',
        description: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects. Detractors of this school say that its tradition is about denial, negation rather than positive assertion. You understand, however, that ending harmful effects, protecting the weak, and banishing evil influences is anything but a philosophical void. It is a proud and respected vocation. Called abjurers, members of this school are sought when baleful spirits require exorcism, when important locations must be guarded against magical spying, and when portals to other planes of existence must be closed.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Abjuration Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy an abjuration spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Arcane Ward',
                    level: 2,
                    description: 'Starting at 2nd level, you can weave magic around yourself for protection. When you cast an abjuration spell of 1st level or higher, you can simultaneously use a strand of the spell\'s magic to create a magical ward on yourself that lasts until you finish a long rest. The ward has hit points equal to twice your wizard level + your Intelligence modifier. Whenever you take damage, the ward takes the damage instead. If this damage reduces the ward to 0 hit points, you take any remaining damage. While the ward has 0 hit points, it can\'t absorb damage, but its magic remains. Whenever you cast an abjuration spell of 1st level or higher, the ward regains a number of hit points equal to twice the level of the spell. Once you create the ward, you can\'t create it again until you finish a long rest.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Projected Ward',
                    level: 6,
                    description: 'Starting at 6th level, when a creature that you can see within 30 feet of you takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage. If this damage reduces the ward to 0 hit points, the warded creature takes any remaining damage.',
                    actionType: 'reaction',
                },
            ],
            10: [
                {
                    name: 'Improved Abjuration',
                    level: 10,
                    description: 'Beginning at 10th level, when you cast an abjuration spell that requires you to make an ability check as a part of casting that spell (as in Counterspell and Dispel Magic), you add your proficiency bonus to that ability check.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Spell Resistance',
                    level: 14,
                    description: 'Starting at 14th level, you have advantage on saving throws against spells. Furthermore, you have resistance against the damage of spells.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'School of Conjuration',
        description: 'As a conjurer, you favor spells that produce objects and creatures out of thin air. You can conjure billowing clouds of killing fog or summon creatures from elsewhere to fight on your behalf. As your mastery grows, you learn spells of transportation and can teleport yourself across vast distances, even to other planes of existence, in an instant.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Conjuration Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy a conjuration spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Minor Conjuration',
                    level: 2,
                    description: 'Starting at 2nd level when you select this school, you can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen. The object is visibly magical, radiating dim light out to 5 feet. The object disappears after 1 hour, when you use this feature again, or if it takes any damage.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Benign Transposition',
                    level: 6,
                    description: 'Starting at 6th level, you can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places. Once you use this feature, you can\'t use it again until you finish a long rest or you cast a conjuration spell of 1st level or higher.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Focused Conjuration',
                    level: 10,
                    description: 'Beginning at 10th level, while you are concentrating on a conjuration spell, your concentration can\'t be broken as a result of taking damage.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Durable Summons',
                    level: 14,
                    description: 'Starting at 14th level, any creature that you summon or create with a conjuration spell has 30 temporary hit points.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'School of Divination',
        description: 'The counsel of a diviner is sought by royalty and commoners alike, for all seek a clearer understanding of the past, present, and future. As a diviner, you strive to part the veils of space, time, and consciousness so that you can see clearly. You work to master spells of discernment, remote viewing, supernatural knowledge, and foresight.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Divination Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy a divination spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Portent',
                    level: 2,
                    description: 'Starting at 2nd level when you choose this school, glimpses of the future begin to press in on your awareness. When you finish a long rest, roll two d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls. You must choose to do so before the roll, and you can replace a roll in this way only once per turn. Each foretelling roll can be used only once. When you finish a long rest, you lose any unused foretelling rolls.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Expert Divination',
                    level: 6,
                    description: 'Beginning at 6th level, casting divination spells comes so easily to you that it expends only a fraction of your spellcasting efforts. When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the spell you cast and can\'t be higher than 5th level.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'The Third Eye',
                    level: 10,
                    description: 'Starting at 10th level, you can use your action to increase your powers of perception. When you do so, choose one of the following benefits, which lasts until you are incapacitated or you take a short or long rest. You can\'t use the feature again until you finish a short or long rest. Darkvision: You gain darkvision out to a range of 60 feet. Ethereal Sight: You can see into the Ethereal Plane within 60 feet of you. Greater Comprehension: You can read any language. See Invisibility: You can see invisible creatures and objects within 10 feet of you that are within line of sight.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            14: [
                {
                    name: 'Greater Portent',
                    level: 14,
                    description: 'Starting at 14th level, the visions in your dreams intensify and paint a more accurate picture in your mind of what is to come. You roll three d20s for your Portent feature, rather than two.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'School of Enchantment',
        description: 'As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters. Some enchanters are peacemakers who bewitch the violent to lay down their arms and charm the cruel into showing mercy. Others are tyrants who magically bind the unwilling into their service. Most enchanters fall somewhere in between.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Enchantment Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy an enchantment spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Hypnotic Gaze',
                    level: 2,
                    description: 'Starting at 2nd level when you choose this school, your soft words and enchanting gaze can magically enthrall another creature. As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn. The charmed creature\'s speed drops to 0, and the creature is incapacitated and visibly dazed. On subsequent turns, you can use your action to maintain this effect, extending its duration until the end of your next turn. However, the effect ends if you move more than 5 feet away from the creature, if the creature can neither see nor hear you, or if the creature takes damage. Once the effect ends, or if the creature succeeds on its initial saving throw against this effect, you can\'t use this feature on that creature again until you finish a long rest.',
                    actionType: 'action',
                },
            ],
            6: [
                {
                    name: 'Instinctive Charm',
                    level: 6,
                    description: 'Beginning at 6th level, when a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack\'s range. The attacker must make a Wisdom saving throw against your wizard spell save DC. On a failed save, the attacker must target the creature that is closest to it, not including you or itself. If multiple creatures are closest, the attacker chooses which one to target. On a successful save, you can\'t use this feature on the attacker again until you finish a long rest. You must choose to use this feature before knowing whether the attack hits or misses. Creatures that can\'t be charmed are immune to this effect.',
                    actionType: 'reaction',
                },
            ],
            10: [
                {
                    name: 'Split Enchantment',
                    level: 10,
                    description: 'Starting at 10th level, when you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Alter Memories',
                    level: 14,
                    description: 'At 14th level, you gain the ability to make a creature unaware of your magical influence on it. When you cast an enchantment spell to charm one or more creatures, you can alter one creature\'s understanding so that it remains unaware of being charmed. Additionally, once before the spell expires, you can use your action to try to make the chosen creature forget some of the time it spent charmed. The creature must succeed on an Intelligence saving throw against your wizard spell save DC or lose a number of hours of its memories equal to 1 + your Charisma modifier (minimum 1). You can make the creature forget less time, and the amount of time can\'t exceed the duration of your enchantment spell.',
                    actionType: 'action',
                },
            ],
        },
    },
    {
        name: 'School of Evocation',
        description: 'You focus your study on magic that creates powerful elemental effects such as bitter cold, searing flame, rolling thunder, crackling lightning, and burning acid. Some evokers find employment in military forces, serving as artillery to blast enemy armies from afar. Others use their spectacular power to protect the weak, while some seek their own gain as bandits, adventurers, or aspiring tyrants.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Evocation Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy an evocation spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Sculpt Spells',
                    level: 2,
                    description: 'Beginning at 2nd level, you can create pockets of relative safety within the effects of your evocation spells. When you cast an evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 + the spell\'s level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Potent Cantrip',
                    level: 6,
                    description: 'Starting at 6th level, your damaging cantrips affect even creatures that avoid the brunt of the effect. When a creature succeeds on a saving throw against your cantrip, the creature takes half the cantrip\'s damage (if any) but suffers no additional effect from the cantrip.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Empowered Evocation',
                    level: 10,
                    description: 'Beginning at 10th level, you can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Overchannel',
                    level: 14,
                    description: 'Starting at 14th level, you can increase the power of your simpler spells. When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell. The first time you do so, you suffer no adverse effect. If you use this feature again before you finish a long rest, you take 2d12 necrotic damage for each level of the spell, immediately after you cast it. Each time you use this feature again before finishing a long rest, the necrotic damage per spell level increases by 1d12. This damage ignores resistance and immunity.',
                    actionType: 'special',
                    damage: {
                        dice: '2d12 per spell level (increases by 1d12 per use)',
                        type: 'necrotic',
                        scaling: 'Increases by 1d12 per use before long rest',
                    },
                },
            ],
        },
    },
    {
        name: 'School of Illusion',
        description: 'You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk. Your magic is subtle, but the illusions crafted by your keen mind make the impossible seem real. Some illusionists – including many gnome wizards – are benign tricksters who use their spells to entertain. Others are more sinister masters of deception, using their illusions to frighten and fool others for their personal gain.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Illusion Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy an illusion spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Improved Minor Illusion',
                    level: 2,
                    description: 'When you choose this school at 2nd level, you learn the Minor Illusion cantrip. If you already know this cantrip, you learn a different wizard cantrip of your choice. The cantrip doesn\'t count against your number of cantrips known. When you cast Minor Illusion, you can create both a sound and an image with a single casting of the spell.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Malleable Illusions',
                    level: 6,
                    description: 'Starting at 6th level, when you cast an illusion spell that has a duration of 1 minute or longer, you can use your action to change the nature of that illusion (using the spell\'s normal parameters for the illusion), provided that you can see the illusion.',
                    actionType: 'action',
                },
            ],
            10: [
                {
                    name: 'Illusory Self',
                    level: 10,
                    description: 'Beginning at 10th level, you can create an illusory duplicate of yourself as an instant, almost instinctual reaction to danger. When a creature makes an attack roll against you, you can use your reaction to interpose the illusory duplicate between the attacker and yourself. The attack automatically misses you, then the illusion dissipates. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'reaction',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            14: [
                {
                    name: 'Illusory Reality',
                    level: 14,
                    description: 'By 14th level, you have learned the secret of weaving shadow magic into your illusions to give them a semi-reality. When you cast an illusion spell of 1st level or higher, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real. You can do this on your turn as a bonus action while the spell is ongoing. The object remains real for 1 minute. For example, you can create an illusion of a bridge over a chasm and then make it real long enough for your allies to cross. The object can\'t deal damage or otherwise directly harm anyone.',
                    actionType: 'bonus action',
                },
            ],
        },
    },
    {
        name: 'School of Necromancy',
        description: 'The School of Necromancy explores the cosmic forces of life, death, and undeath. As you focus your studies in this tradition, you learn to manipulate the energy that animates all living things. As you progress, you learn to sap the life force from a creature as your magic destroys its body, transforming that vital energy into magical power you can manipulate. Most people see necromancers as menacing, or even villainous, due to the close association with death. Not all necromancers are evil, but the forces they manipulate are considered taboo by many societies.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Necromancy Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy a necromancy spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Grim Harvest',
                    level: 2,
                    description: 'At 2nd level, you gain the ability to reap life energy from creatures you kill with your spells. Once per turn when you kill one or more creatures with a spell of 1st level or higher, you regain hit points equal to twice the spell\'s level, or three times its level if the spell belongs to the School of Necromancy. You don\'t gain this benefit for killing constructs or undead.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Undead Thralls',
                    level: 6,
                    description: 'At 6th level, you add the Animate Dead spell to your spellbook if it is not there already. When you cast Animate Dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate. Whenever you create an undead using a necromancy spell, it has additional benefits: The creature\'s hit point maximum is increased by an amount equal to your wizard level. The creature adds your proficiency bonus to its weapon damage rolls.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Inured to Undeath',
                    level: 10,
                    description: 'Beginning at 10th level, you have resistance to necrotic damage, and your hit point maximum can\'t be reduced. You have spent so much time dealing with undead and the forces that animate them that you have become inured to some of their worst effects.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Command Undead',
                    level: 14,
                    description: 'Starting at 14th level, you can use magic to bring undead under your control, even those created by other wizards. As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw against your wizard spell save DC. If it succeeds, you can\'t use this feature on it again. If it fails, it becomes friendly to you and obeys your commands until you use this feature again. Intelligent undead are harder to control in this way. If the target has an Intelligence of 8 or higher, it has advantage on the saving throw. If it fails the saving throw and has an Intelligence of 12 or higher, it can repeat the saving throw at the end of every hour until it succeeds and breaks free.',
                    actionType: 'action',
                },
            ],
        },
    },
    {
        name: 'School of Transmutation',
        description: 'You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable, and you delight in being an agent of change. You wield the raw stuff of creation and learn to alter both physical forms and mental qualities. Your magic gives you the tools to become a smith on reality\'s forge. Some transmuters are tinkerers and pranksters, turning people into toads and transforming copper into silver for fun and occasional profit. Others pursue their magical studies with deadly seriousness, seeking the power of the gods to make and destroy worlds.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'PHB',

        features: {
            2: [
                {
                    name: 'Transmutation Savant',
                    level: 2,
                    description: 'Beginning when you select this school at 2nd level, the gold and time you must spend to copy a transmutation spell into your spellbook is halved.',
                    actionType: 'passive',
                },
                {
                    name: 'Minor Alchemy',
                    level: 2,
                    description: 'Starting at 2nd level when you select this school, you can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another. You perform a special alchemical procedure on one object composed entirely of wood, stone (but not a gemstone), iron, copper, or silver, transforming it into a different one of those materials. For each 10 minutes you spend performing the procedure, you can transform up to 1 cubic foot of material. After 1 hour, or until you lose your concentration (as if you were concentrating on a spell), the material reverts to its original substance.',
                    actionType: 'special',
                },
            ],
            6: [
                {
                    name: 'Transmuter\'s Stone',
                    level: 6,
                    description: 'Starting at 6th level, you can spend 8 hours creating a transmuter\'s stone that stores transmutation magic. You can benefit from the stone yourself or give it to another creature. A creature gains a benefit of your choice as long as the stone is in the creature\'s possession. When you create the stone, choose the benefit from the following options: Darkvision out to a range of 60 feet, an increase to speed of 10 feet while the creature is unencumbered, proficiency in Constitution saving throws, or resistance to acid, cold, fire, lightning, or thunder damage (your choice whenever you choose this benefit). Each time you cast a transmutation spell of 1st level or higher, you can change the effect of your stone if the stone is on your person. If you create a new transmuter\'s stone, the previous one ceases to function.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Shapechanger',
                    level: 10,
                    description: 'At 10th level, you add the Polymorph spell to your spellbook, if it is not there already. You can cast Polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or less. Once you cast Polymorph in this way, you can\'t do so again until you finish a short or long rest, though you can still cast it normally using an available spell slot.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            14: [
                {
                    name: 'Master Transmuter',
                    level: 14,
                    description: 'Starting at 14th level, you can use your action to consume the reserve of transmutation magic stored within your transmuter\'s stone in a single burst. When you do so, choose one of the following effects. Your transmuter\'s stone is destroyed and can\'t be remade until you finish a long rest. Major Transformation: You can transmute one nonmagical object – no larger than a 5-foot cube – into another nonmagical object of similar size and mass and of equal or lesser value. You must spend 10 minutes handling the object to transform it. Panacea: You remove all curses, diseases, and poisons affecting a creature that you touch with the transmuter\'s stone. The creature also regains all its hit points. Restore Life: You cast the Raise Dead spell on a creature you touch with the transmuter\'s stone, without expending a spell slot or needing to have the spell in your spellbook. Restore Youth: You touch the transmuter\'s stone to a willing creature, and that creature\'s apparent age is reduced by 3d10 years, to a minimum of 13 years. This effect doesn\'t extend the creature\'s lifespan.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                },
            ],
        },
    },
    {
        name: 'Bladesinging',
        description: 'Bladesingers are elves who bravely defend their people and lands. They are elf wizards who master a school of sword fighting grounded in a tradition of arcane magic. In combat, a bladesinger uses a series of intricate, elegant maneuvers that fend off harm and allow the bladesinger to channel magic into devastating attacks and a cunning defense. Many who have observed a bladesinger at work remember the display as one of the more beautiful experiences in their life, a glorious dance accompanied by a singing blade.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'TCoE',

        proficiencies: {
            armor: ['light-armor'],
            weapons: ['longsword', 'shortsword', 'rapier', 'scimitar'],
            skills: ['performance'],
        },

        features: {
            2: [
                {
                    name: 'Training in War and Song',
                    level: 2,
                    description: 'When you adopt this tradition at 2nd level, you gain proficiency with light armor, and you gain proficiency with one type of one-handed melee weapon of your choice. You also gain proficiency in the Performance skill if you don\'t already have it.',
                    actionType: 'passive',
                },
                {
                    name: 'Bladesong',
                    level: 2,
                    description: 'Starting at 2nd level, you can invoke an elven magic called the Bladesong, provided that you aren\'t wearing medium or heavy armor or using a shield. It graces you with supernatural speed, agility, and focus. You can use a bonus action to start the Bladesong, which lasts for 1 minute. It ends early if you are incapacitated, if you don medium or heavy armor or a shield, or if you use two hands to make an attack with a weapon. You can also dismiss the Bladesong at any time (no action required). While your Bladesong is active, you gain the following benefits: You gain a bonus to your AC equal to your Intelligence modifier (minimum of +1). Your walking speed increases by 10 feet. You have advantage on Dexterity (Acrobatics) checks. You gain a bonus to any Constitution saving throw you make to maintain your concentration on a spell. The bonus equals your Intelligence modifier (minimum of +1). You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Extra Attack',
                    level: 6,
                    description: 'Starting at 6th level, you can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Song of Defense',
                    level: 10,
                    description: 'Beginning at 10th level, you can direct your magic to absorb damage while your Bladesong is active. When you take damage, you can use your reaction to expend one spell slot and reduce that damage to you by an amount equal to five times the spell slot\'s level.',
                    actionType: 'reaction',
                },
            ],
            14: [
                {
                    name: 'Song of Victory',
                    level: 14,
                    description: 'Starting at 14th level, you can add your Intelligence modifier (minimum of +1) to the damage of your melee weapon attacks while your Bladesong is active.',
                    actionType: 'passive',
                },
            ],
        },
    },
    {
        name: 'Chronurgy Magic',
        description: 'Focusing on the manipulation of time, those who follow the Chronurgy tradition learn to alter the pace of reality to their liking. Using the ramping of anticipatory dunamis energy, these mages can bend the flow of time as adroitly as a skilled musician plays an instrument, lending themselves and their allies an advantage in the blink of an eye.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'EGtW',

        features: {
            2: [
                {
                    name: 'Chronal Shift',
                    level: 2,
                    description: 'At 2nd level, you can magically exert limited control over the flow of time around a creature. As a reaction, after you or a creature you can see within 30 feet of you makes an attack roll, an ability check, or a saving throw, you can force the creature to reroll. You make this decision after you see whether the roll succeeds or fails. The target must use the result of the second roll. You can use this ability twice, and you regain any expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: '2',
                    restType: 'long',
                },
                {
                    name: 'Temporal Awareness',
                    level: 2,
                    description: 'Starting at 2nd level, you can add your Intelligence modifier to your initiative rolls.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Momentary Stasis',
                    level: 6,
                    description: 'When you reach 6th level, as an action, you can magically force a Large or smaller creature you can see within 60 feet of you to make a Constitution saving throw against your spell save DC. Unless the saving throw is a success, the creature is encased in a field of magical energy until the end of your next turn or until the creature takes any damage. While encased in this way, the creature is incapacitated and has a speed of 0. You can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Intelligence modifier',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Arcane Abeyance',
                    level: 10,
                    description: 'At 10th level, when you cast a spell using a spell slot of 4th level or lower, you can condense the spell\'s magic into a mote. The spell is frozen in time at the moment of casting and held within a gray bead for 1 hour. This bead is a Tiny object with AC 15 and 1 hit point, and it is immune to poison and psychic damage. When the duration ends, or if the bead is destroyed, it vanishes in a flash of light, and the spell is lost. A creature holding the bead can use its action to release the spell within, whereupon the bead disappears. The spell uses your spell attack bonus and save DC, and the spell treats the creature who released it as the caster for all other purposes. Once you use this feature, you can\'t use it again until you finish a short or long rest.',
                    actionType: 'special',
                    usesPerRest: '1',
                    restType: 'short',
                },
            ],
            14: [
                {
                    name: 'Convergent Future',
                    level: 14,
                    description: 'Starting at 14th level, you can peer through possible futures and magically pull one of them into being. When you or a creature you can see within 60 feet of you makes an attack roll, an ability check, or a saving throw, you can use your reaction to ignore the die roll and decide whether the number rolled is the minimum needed to succeed or one less than that number (your choice). When you use this feature, you gain one level of exhaustion. Only by finishing a long rest can you remove a level of exhaustion gained in this way.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    {
        name: 'Graviturgy Magic',
        description: 'Understanding and mastering the forces that draw bodies of matter together or drive them apart, the students of the Graviturgy tradition learn to further bend and manipulate the violent energy of gravity to their benefit, and the terrible detriment of their enemies.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'EGtW',

        features: {
            2: [
                {
                    name: 'Adjust Density',
                    level: 2,
                    description: 'At 2nd level, as an action, you can magically alter the weight of one object or creature you can see within 30 feet of you. The object or creature must be Large or smaller. The target\'s weight is halved or doubled for up to 1 minute or until your concentration ends (as if you were concentrating on a spell). While the weight of a creature is halved, the creature\'s speed increases by 10 feet, it can jump twice as far, and it has disadvantage on Strength checks and Strength saving throws. While the weight of a creature is doubled, the creature\'s speed is reduced by 10 feet, and it has advantage on Strength checks and Strength saving throws. Upon reaching 10th level in this class, you can target an object or creature that is Huge or smaller. You can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'action',
                    usesPerRest: 'Intelligence modifier',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Gravity Well',
                    level: 6,
                    description: 'At 6th level, whenever you cast a spell on a creature, you can move the target 5 feet to an unoccupied space of your choice if the target is willing to move, the spell hits it with an attack, or it fails a saving throw against the spell.',
                    actionType: 'passive',
                },
            ],
            10: [
                {
                    name: 'Violent Attraction',
                    level: 10,
                    description: 'At 10th level, when another creature that you can see within 60 feet of you hits with a weapon attack, you can use your reaction to increase the attack\'s velocity, causing the attack\'s target to take an extra 1d10 damage of the weapon\'s type. Alternatively, if a creature within 60 feet of you takes damage from a fall, you can use your reaction to increase the fall\'s damage by 2d10. You can use this feature a number of times equal to your Intelligence modifier (a minimum of once). You regain all expended uses when you finish a long rest.',
                    actionType: 'reaction',
                    usesPerRest: 'Intelligence modifier',
                    restType: 'long',
                    damage: {
                        dice: '1d10 (weapon) or 2d10 (fall)',
                        type: 'weapon/bludgeoning',
                        scaling: 'Fixed damage',
                    },
                },
            ],
            14: [
                {
                    name: 'Event Horizon',
                    level: 14,
                    description: 'At 14th level, as an action, you can magically emit a powerful field of gravitational energy that tugs at other creatures for up to 1 minute or until your concentration ends (as if you were concentrating on a spell). For the duration, whenever a creature hostile to you starts its turn within 30 feet of you, it must make a Strength saving throw against your spell save DC. On a failed save, it takes 2d10 force damage, and its speed is reduced to 0 until the start of its next turn. On a successful save, it takes half as much damage, and every foot it moves this turn costs 2 extra feet of movement. Once you use this feature, you can\'t do so again until you finish a long rest, or until you expend a spell slot of 3rd level or higher on it.',
                    actionType: 'action',
                    usesPerRest: '1',
                    restType: 'long',
                    damage: {
                        dice: '2d10',
                        type: 'force',
                        scaling: 'Fixed damage',
                    },
                },
            ],
        },
    },
    {
        name: 'Order of Scribes',
        description: 'Magic of the book—that\'s what many folk call wizardry. The name is apt, given how much time wizards spend poring over tomes and penning theories about the nature of magic. It\'s rare to see wizards traveling without books and scrolls sprouting from their bags, and a wizard would go to great lengths to plumb an archive of ancient knowledge. Among wizards, the Order of Scribes is the most book-bound. It takes many forms in different worlds, but its primary mission is the same everywhere: recording magical discoveries so that wizardry can flourish. And while all wizards value spellbooks, a wizard in the Order of Scribes magically awakens their book, turning it into a trusted companion.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'TCoE',

        features: {
            2: [
                {
                    name: 'Wizardly Quill',
                    level: 2,
                    description: 'At 2nd level, as a bonus action, you can magically create a Tiny quill in your free hand. The magic quill has the following properties: The quill doesn\'t require ink. When you write with it, it produces ink in a color of your choice on the writing surface. The time you must spend to copy a spell into your spellbook equals 2 minutes per spell level if you use the quill for the transcription. You can erase anything you write with the quill if you wave the feather over the text as a bonus action, provided the text is within 5 feet of you. This quill disappears if you create another one or if you die.',
                    actionType: 'bonus action',
                },
                {
                    name: 'Awakened Spellbook',
                    level: 2,
                    description: 'Using specially prepared inks and ancient incantations passed down by your wizardly order, you have awakened an arcane sentience within your spellbook. At 2nd level, while you are holding the book, it grants you the following benefits: You can use the book as a spellcasting focus for your wizard spells. When you cast a wizard spell with a spell slot, you can temporarily replace its damage type with a type that appears in another spell in your spellbook, which magically alters the spell\'s formula for this casting only. The other spell must be of the same level as the spell slot you expend. When you cast a wizard spell as a ritual, you can use the spell\'s normal casting time, rather than adding 10 minutes to it. Once you use this benefit, you can\'t do so again until you finish a long rest. If necessary, you can replace the book over the course of a short rest by using your Wizardly Quill to write arcane sigils in a blank book or a magic spellbook to which you\'re attuned. At the end of the rest, your spellbook\'s consciousness is summoned into the new book, which the consciousness transforms into your spellbook, along with all its spells. If the previous book still existed somewhere, all the spells vanish from its pages.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Manifest Mind',
                    level: 6,
                    description: 'At 6th level, you can conjure forth the mind of your Awakened Spellbook. As a bonus action while the book is on your person, you can cause the mind to manifest as a Tiny spectral object, hovering in an unoccupied space of your choice within 60 feet of you. The spectral mind is intangible and doesn\'t occupy its space, and it sheds dim light in a 10-foot radius. It looks like a ghostly tome, a cascade of text, or a scholar from the past (your choice). While manifested, the spectral mind can hear and see, and it has darkvision with a range of 60 feet. The mind can telepathically share with you what it sees and hears (no action required). Whenever you cast a wizard spell on your turn, you can cast it as if you were in the spectral mind\'s space, instead of your own, using its senses. You can do so a number of times per day equal to your proficiency bonus, and you regain all expended uses when you finish a long rest. As a bonus action, you can cause the spectral mind to hover up to 30 feet to an unoccupied space that you or it can see. It can pass through creatures but not objects. The spectral mind stops manifesting if it is ever more than 300 feet away from you, if someone casts Dispel Magic on it, if the Awakened Spellbook is destroyed, if you die, or if you dismiss it as a bonus action.',
                    actionType: 'bonus action',
                    usesPerRest: 'proficiency bonus',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Master Scrivener',
                    level: 10,
                    description: 'At 10th level, whenever you finish a long rest, you can create one magic scroll by touching your Wizardly Quill to a blank piece of paper or parchment and causing one spell from your Awakened Spellbook to be copied onto the scroll. The spellbook must be within 5 feet of you when you make the scroll. The chosen spell must be of 1st or 2nd level and must have a casting time of 1 action. Once in the scroll, the spell\'s power is enhanced, counting as one level higher than normal. You can cast the spell from the scroll by reading it as an action. The scroll is unintelligible to anyone else, and the spell vanishes from the scroll when you cast it or when you finish your next long rest. You are also adept at crafting spell scrolls, which are described in the treasure chapter of the Dungeon Master\'s Guide. The gold and time you must spend to make such a scroll are halved if you use your Wizardly Quill.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'One with the Word',
                    level: 14,
                    description: 'At 14th level, your connection to your Awakened Spellbook has become so profound that your soul has become entwined with it. While the book is on your person, you have advantage on all Intelligence (Arcana) checks, as the spellbook helps you remember magical lore. Moreover, if you take damage while your spellbook\'s mind is manifested, you can prevent all of that damage to you by using your reaction to dismiss the spectral mind, using its energy to save yourself. Then roll 3d6. The spellbook temporarily loses spells of your choice that have a combined spell level equal to that roll or higher. For example, if the roll\'s total is 9, spells vanish from the book that have a combined level of at least 9, which could mean one 9th-level spell, three 3rd-level spells, or some other combination. The lost spells and spell slots return to the spellbook after you finish 1d6 long rests. If you die, your Awakened Spellbook is destroyed. If the book is destroyed, you can create a new one using the method described in Awakened Spellbook.',
                    actionType: 'reaction',
                },
            ],
        },
    },
    {
        name: 'War Magic',
        description: 'A variety of arcane colleges specialize in training wizards for war. The tradition of War Magic blends principles of evocation and abjuration, rather than specializing in either of those schools. It teaches techniques that empower a caster\'s spells, while also providing methods for wizards to bolster their own defenses. Followers of this tradition are known as war mages. They see their magic as both a weapon and armor, a resource superior to any piece of steel. War mages act fast in battle, using their spells to seize tactical control of a situation. Their spells strike hard, while their defensive skills foil their opponents\' attempts to counterattack. War mages are also adept at turning other spellcasters\' magical energy against them.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'XGtE',

        features: {
            2: [
                {
                    name: 'Arcane Deflection',
                    level: 2,
                    description: 'At 2nd level, you have learned to weave your magic to fortify yourself against harm. When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw. When you use this feature, you can\'t cast spells other than cantrips until the end of your next turn.',
                    actionType: 'reaction',
                },
                {
                    name: 'Tactical Wit',
                    level: 2,
                    description: 'Starting at 2nd level, your keen ability to assess tactical situations allows you to act quickly in battle. You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier.',
                    actionType: 'passive',
                },
            ],
            6: [
                {
                    name: 'Power Surge',
                    level: 6,
                    description: 'Starting at 6th level, you can store magical energy within yourself to later empower your damaging spells. In its stored form, this energy is called a power surge. You can store a maximum number of power surges equal to your Intelligence modifier (minimum of one). Whenever you finish a long rest, your number of power surges resets to one. Whenever you successfully end a spell with Dispel Magic or Counterspell, you gain one power surge, as you steal magic from the spell you foiled. If you end a short rest with no power surges, you gain one power surge. Once per turn when you deal damage to a creature or object with a wizard spell, you can spend one power surge to deal extra force damage to that target. The extra damage equals half your wizard level.',
                    actionType: 'special',
                    damage: {
                        dice: 'Half wizard level',
                        type: 'force',
                        scaling: 'Increases with wizard level',
                    },
                },
            ],
            10: [
                {
                    name: 'Durable Magic',
                    level: 10,
                    description: 'Beginning at 10th level, the magic you channel helps ward off harm. While you maintain concentration on a spell, you have a +2 bonus to AC and all saving throws.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Deflecting Shroud',
                    level: 14,
                    description: 'At 14th level, your Arcane Deflection becomes infused with deadly magic. When you use your Arcane Deflection feature, you can cause magical energy to arc from you. Up to three creatures of your choice that you can see within 60 feet of you each take force damage equal to half your wizard level.',
                    actionType: 'passive',
                    damage: {
                        dice: 'Half wizard level',
                        type: 'force',
                        scaling: 'Increases with wizard level',
                    },
                },
            ],
        },
    },
    {
        name: 'School of Onomancy',
        description: 'Practitioners of magic well know the power of names, but wizards who follow the tradition of Onomancy use their magic to manipulate the words that encompass existence. Onomancers expand their study into language itself, searching for threads of magical significance that weave through names. Something that is named stands out in the multiverse, distinct from the tapestry of creation all around it. That distinction creates power that onomancers seek to tap. By speaking a target\'s true name, the wizard\'s spells slip between the cracks of the target\'s defenses, conforming to its essential nature through the power of its name. To protect themselves, wizards who follow this tradition often hide their true names, typically by adopting monikers and pseudonyms.',
        class: 'wizard',
        subclass_level: 2,
        sourcebook: 'TCoE',

        proficiencies: {
            tools: ['calligraphers-supplies'],
        },

        features: {
            2: [
                {
                    name: 'Bonus Proficiencies',
                    level: 2,
                    description: 'At 2nd level, you learn one language of your choice and gain proficiency with calligrapher\'s supplies.',
                    actionType: 'passive',
                },
                {
                    name: 'Extract Name',
                    level: 2,
                    description: 'Starting at 2nd level, you can magically compel a creature to divulge its true name. As a bonus action, you target one creature you can see within 60 feet of you. The target must make a Wisdom saving throw against your spell save DC. On a successful save, you discern that this magic failed, and you can\'t use this feature on the target again. On a failed save, the target is charmed by you until the end of your next turn, and you mentally learn the charmed target\'s name or the fact that the target lacks a name. You can use this feature a number of times equal to your Intelligence modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.',
                    actionType: 'bonus action',
                    usesPerRest: 'Intelligence modifier',
                    restType: 'long',
                },
                {
                    name: 'Fateful Naming',
                    level: 2,
                    description: 'At 2nd level, you can bend magic to assist or hinder creatures through the power of their true names, and even use those names as an anchor for your magic. The Bane and Bless spells are wizard spells for you, and you add them to your spellbook. You always have them prepared, yet they don\'t count against the number of spells you can prepare. You can cast either spell without expending a spell slot if you speak the true name of one target of the spell as part of casting it. You can cast the spells in this way a number of times equal to your Intelligence modifier (a minimum of once), and you regain all expended uses when you finish a long rest.',
                    actionType: 'special',
                    usesPerRest: 'Intelligence modifier',
                    restType: 'long',
                },
            ],
            6: [
                {
                    name: 'Resonant Utterance',
                    level: 6,
                    description: 'At 6th level, you learn words of power called Resonants, which allow you to tailor your spells through the use of a target\'s true name. When you gain this feature, you learn two Resonants of your choice, which are detailed in the Resonant Options section below. Whenever you cast a spell that deals damage or restores hit points to a creature, and the spell targets at least one creature whose true name you know, you can use one known Resonant in conjunction with that spell. You can use a Resonant a number of times equal to half of your wizard level (rounded down), and you regain all expended uses when you finish a long rest. Resonants (choose 2): Absorption (3d6 temp HP), Devastation (disadvantage on first save), Dissolution (2d8 force damage), Nullification (learn other spells affecting target).',
                    actionType: 'special',
                    usesPerRest: 'half wizard level',
                    restType: 'long',
                },
            ],
            10: [
                {
                    name: 'Inexorable Pronouncement',
                    level: 10,
                    description: 'At 10th level, you learn two new Resonants of your choice from your Resonant Utterance feature. Absorption temp HP increases to 4d6, Dissolution damage increases to 3d8.',
                    actionType: 'passive',
                },
            ],
            14: [
                {
                    name: 'Relentless Naming',
                    level: 14,
                    description: 'At 14th level, you have learned how to bypass a named creature\'s defenses against certain types of damage. When you cast a spell that deals damage to a creature whose true name you know, you can cause the spell to deal force or psychic damage to the creature, instead of the spell\'s normal damage type. Absorption temp HP increases to 5d6, Dissolution damage increases to 4d8.',
                    actionType: 'passive',
                },
            ],
        },
    },
];

export default SUBCLASSES_COMPLETE;
