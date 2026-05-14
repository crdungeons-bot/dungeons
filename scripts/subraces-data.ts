// D&D 5e Subraces - Comprehensive Data
// Sources: PHB, Volo's, Fizban's, Eberron, Theros, MToF, XGtE, TCoE

export type SubraceData = {
  index: string;
  name: string;
  race: string;
  desc?: string;
  ability_bonuses: Array<{
    ability_score: { index: string; name: string };
    bonus: number;
  }>;
  starting_proficiencies?: Array<{
    index: string;
    name: string;
  }>;
  languages?: Array<{
    index: string;
    name: string;
  }>;
  racial_traits: Array<{
    index: string;
    name: string;
    desc: string;
  }>;
  source: string;
};

export const SUBRACES: SubraceData[] = [
  // ═══════════════════════════════════════════════════════════
  // DWARF SUBRACES (PHB)
  // ═══════════════════════════════════════════════════════════
  {
    index: "hill-dwarf",
    name: "Hill Dwarf",
    race: "dwarf",
    desc: "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
    ability_bonuses: [
      { ability_score: { index: "wis", name: "WIS" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "dwarven-toughness",
        name: "Dwarven Toughness",
        desc: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level."
      }
    ],
    source: "PHB"
  },
  {
    index: "mountain-dwarf",
    name: "Mountain Dwarf",
    race: "dwarf",
    desc: "As a mountain dwarf, you're strong and hardy, accustomed to a difficult life in rugged terrain. You're probably on the tall side for a dwarf, and tend toward lighter coloration.",
    ability_bonuses: [
      { ability_score: { index: "str", name: "STR" }, bonus: 2 }
    ],
    starting_proficiencies: [
      { index: "light-armor", name: "Light Armor" },
      { index: "medium-armor", name: "Medium Armor" }
    ],
    racial_traits: [
      {
        index: "dwarven-armor-training",
        name: "Dwarven Armor Training",
        desc: "You have proficiency with light and medium armor."
      }
    ],
    source: "PHB"
  },

  // ═══════════════════════════════════════════════════════════
  // ELF SUBRACES (PHB)
  // ═══════════════════════════════════════════════════════════
  {
    index: "high-elf",
    name: "High Elf",
    race: "elf",
    desc: "As a high elf, you have a keen mind and a mastery of at least the basics of magic.",
    ability_bonuses: [
      { ability_score: { index: "int", name: "INT" }, bonus: 1 }
    ],
    starting_proficiencies: [
      { index: "longsword", name: "Longsword" },
      { index: "shortsword", name: "Shortsword" },
      { index: "shortbow", name: "Shortbow" },
      { index: "longbow", name: "Longbow" }
    ],
    languages: [
      { index: "common", name: "Common" },
      { index: "elvish", name: "Elvish" }
    ],
    racial_traits: [
      {
        index: "elf-weapon-training",
        name: "Elf Weapon Training",
        desc: "You have proficiency with the longsword, shortsword, shortbow, and longbow."
      },
      {
        index: "cantrip",
        name: "Cantrip",
        desc: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it."
      },
      {
        index: "extra-language",
        name: "Extra Language",
        desc: "You can speak, read, and write one extra language of your choice."
      }
    ],
    source: "PHB"
  },
  {
    index: "wood-elf",
    name: "Wood Elf",
    race: "elf",
    desc: "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests.",
    ability_bonuses: [
      { ability_score: { index: "wis", name: "WIS" }, bonus: 1 }
    ],
    starting_proficiencies: [
      { index: "longsword", name: "Longsword" },
      { index: "shortsword", name: "Shortsword" },
      { index: "shortbow", name: "Shortbow" },
      { index: "longbow", name: "Longbow" }
    ],
    racial_traits: [
      {
        index: "elf-weapon-training",
        name: "Elf Weapon Training",
        desc: "You have proficiency with the longsword, shortsword, shortbow, and longbow."
      },
      {
        index: "fleet-of-foot",
        name: "Fleet of Foot",
        desc: "Your base walking speed increases to 35 feet."
      },
      {
        index: "mask-of-the-wild",
        name: "Mask of the Wild",
        desc: "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena."
      }
    ],
    source: "PHB"
  },
  {
    index: "dark-elf-drow",
    name: "Dark Elf (Drow)",
    race: "elf",
    desc: "Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world for following the goddess Lolth down the path to evil and corruption. Now they have built their own civilization in the depths of the Underdark.",
    ability_bonuses: [
      { ability_score: { index: "cha", name: "CHA" }, bonus: 1 }
    ],
    starting_proficiencies: [
      { index: "rapier", name: "Rapier" },
      { index: "shortsword", name: "Shortsword" },
      { index: "hand-crossbow", name: "Hand Crossbow" }
    ],
    racial_traits: [
      {
        index: "superior-darkvision",
        name: "Superior Darkvision",
        desc: "Your darkvision has a radius of 120 feet."
      },
      {
        index: "sunlight-sensitivity",
        name: "Sunlight Sensitivity",
        desc: "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight."
      },
      {
        index: "drow-magic",
        name: "Drow Magic",
        desc: "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells."
      },
      {
        index: "drow-weapon-training",
        name: "Drow Weapon Training",
        desc: "You have proficiency with rapiers, shortswords, and hand crossbows."
      }
    ],
    source: "PHB"
  },

  // ═══════════════════════════════════════════════════════════
  // GNOME SUBRACES (PHB)
  // ═══════════════════════════════════════════════════════════
  {
    index: "rock-gnome",
    name: "Rock Gnome",
    race: "gnome",
    desc: "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.",
    ability_bonuses: [
      { ability_score: { index: "con", name: "CON" }, bonus: 1 }
    ],
    starting_proficiencies: [
      { index: "artisans-tools", name: "Artisan's Tools" }
    ],
    racial_traits: [
      {
        index: "artificers-lore",
        name: "Artificer's Lore",
        desc: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply."
      },
      {
        index: "tinker",
        name: "Tinker",
        desc: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time."
      }
    ],
    source: "PHB"
  },
  {
    index: "forest-gnome",
    name: "Forest Gnome",
    race: "gnome",
    desc: "As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. In the worlds of D&D, forest gnomes are rare and secretive.",
    ability_bonuses: [
      { ability_score: { index: "dex", name: "DEX" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "natural-illusionist",
        name: "Natural Illusionist",
        desc: "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it."
      },
      {
        index: "speak-with-small-beasts",
        name: "Speak with Small Beasts",
        desc: "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets."
      }
    ],
    source: "PHB"
  },

  // ═══════════════════════════════════════════════════════════
  // HALFLING SUBRACES (PHB)
  // ═══════════════════════════════════════════════════════════
  {
    index: "lightfoot-halfling",
    name: "Lightfoot Halfling",
    race: "halfling",
    desc: "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You're inclined to be affable and get along well with others.",
    ability_bonuses: [
      { ability_score: { index: "cha", name: "CHA" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "naturally-stealthy",
        name: "Naturally Stealthy",
        desc: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you."
      }
    ],
    source: "PHB"
  },
  {
    index: "stout-halfling",
    name: "Stout Halfling",
    race: "halfling",
    desc: "As a stout halfling, you're hardier than average and have some resistance to poison. Some say that stouts have dwarven blood.",
    ability_bonuses: [
      { ability_score: { index: "con", name: "CON" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "stout-resilience",
        name: "Stout Resilience",
        desc: "You have advantage on saving throws against poison, and you have resistance against poison damage."
      }
    ],
    source: "PHB"
  },

  // ═══════════════════════════════════════════════════════════
  // DRAGONBORN SUBRACES (Fizban's Treasury of Dragons)
  // ═══════════════════════════════════════════════════════════
  
  // CHROMATIC DRAGONBORN
  {
    index: "black-dragonborn",
    name: "Black Dragonborn (Chromatic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a black dragon, granting you a special magical affinity. Black dragons are associated with acid damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-black",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals acid damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-acid",
        name: "Damage Resistance",
        desc: "You have resistance to acid damage."
      },
      {
        index: "chromatic-warding",
        name: "Chromatic Warding",
        desc: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to acid damage. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "blue-dragonborn",
    name: "Blue Dragonborn (Chromatic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a blue dragon, granting you a special magical affinity. Blue dragons are associated with lightning damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-blue",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals lightning damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-lightning",
        name: "Damage Resistance",
        desc: "You have resistance to lightning damage."
      },
      {
        index: "chromatic-warding",
        name: "Chromatic Warding",
        desc: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to lightning damage. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "green-dragonborn",
    name: "Green Dragonborn (Chromatic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a green dragon, granting you a special magical affinity. Green dragons are associated with poison damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-green",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals poison damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-poison",
        name: "Damage Resistance",
        desc: "You have resistance to poison damage."
      },
      {
        index: "chromatic-warding",
        name: "Chromatic Warding",
        desc: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to poison damage. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "red-dragonborn",
    name: "Red Dragonborn (Chromatic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a red dragon, granting you a special magical affinity. Red dragons are associated with fire damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-red",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals fire damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-fire",
        name: "Damage Resistance",
        desc: "You have resistance to fire damage."
      },
      {
        index: "chromatic-warding",
        name: "Chromatic Warding",
        desc: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to fire damage. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "white-dragonborn",
    name: "White Dragonborn (Chromatic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a white dragon, granting you a special magical affinity. White dragons are associated with cold damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-white",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals cold damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-cold",
        name: "Damage Resistance",
        desc: "You have resistance to cold damage."
      },
      {
        index: "chromatic-warding",
        name: "Chromatic Warding",
        desc: "Starting at 5th level, as an action, you can channel your draconic energy to protect yourself. For 1 minute, you become immune to cold damage. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },

  // METALLIC DRAGONBORN
  {
    index: "brass-dragonborn",
    name: "Brass Dragonborn (Metallic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a brass dragon, granting you a special magical affinity. Brass dragons are associated with fire damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-brass",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals fire damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-fire",
        name: "Damage Resistance",
        desc: "You have resistance to fire damage."
      },
      {
        index: "metallic-breath-weapon",
        name: "Metallic Breath Weapon",
        desc: "At 5th level, you gain a second breath weapon. When you take the Attack action, you can replace one of your attacks with an exhalation of a paralyzing breath in a 15-foot cone. Each creature in that area must succeed on a Constitution saving throw or be incapacitated until the start of your next turn. Once you use this ability, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "bronze-dragonborn",
    name: "Bronze Dragonborn (Metallic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a bronze dragon, granting you a special magical affinity. Bronze dragons are associated with lightning damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-bronze",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals lightning damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-lightning",
        name: "Damage Resistance",
        desc: "You have resistance to lightning damage."
      },
      {
        index: "metallic-breath-weapon",
        name: "Metallic Breath Weapon",
        desc: "At 5th level, you gain a second breath weapon. When you take the Attack action, you can replace one of your attacks with an exhalation of a repulsion breath in a 15-foot cone. Each creature in that area must succeed on a Strength saving throw or be pushed 20 feet away from you and be knocked prone. Once you use this ability, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "copper-dragonborn",
    name: "Copper Dragonborn (Metallic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a copper dragon, granting you a special magical affinity. Copper dragons are associated with acid damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-copper",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals acid damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-acid",
        name: "Damage Resistance",
        desc: "You have resistance to acid damage."
      },
      {
        index: "metallic-breath-weapon",
        name: "Metallic Breath Weapon",
        desc: "At 5th level, you gain a second breath weapon. When you take the Attack action, you can replace one of your attacks with an exhalation of a slowing breath in a 15-foot cone. Each creature in that area must succeed on a Constitution saving throw or its speed is halved until the start of your next turn. Once you use this ability, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "gold-dragonborn",
    name: "Gold Dragonborn (Metallic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a gold dragon, granting you a special magical affinity. Gold dragons are associated with fire damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-gold",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals fire damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-fire",
        name: "Damage Resistance",
        desc: "You have resistance to fire damage."
      },
      {
        index: "metallic-breath-weapon",
        name: "Metallic Breath Weapon",
        desc: "At 5th level, you gain a second breath weapon. When you take the Attack action, you can replace one of your attacks with an exhalation of a weakening breath in a 15-foot cone. Each creature in that area must succeed on a Strength saving throw or have disadvantage on Strength-based attack rolls and Strength checks until the start of your next turn. Once you use this ability, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "silver-dragonborn",
    name: "Silver Dragonborn (Metallic)",
    race: "dragonborn",
    desc: "You trace your ancestry to a silver dragon, granting you a special magical affinity. Silver dragons are associated with cold damage.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-silver",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals cold damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-cold",
        name: "Damage Resistance",
        desc: "You have resistance to cold damage."
      },
      {
        index: "metallic-breath-weapon",
        name: "Metallic Breath Weapon",
        desc: "At 5th level, you gain a second breath weapon. When you take the Attack action, you can replace one of your attacks with an exhalation of a paralyzing breath in a 15-foot cone. Each creature in that area must succeed on a Constitution saving throw or be paralyzed until the start of your next turn. Once you use this ability, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },

  // GEM DRAGONBORN
  {
    index: "amethyst-dragonborn",
    name: "Amethyst Dragonborn (Gem)",
    race: "dragonborn",
    desc: "You trace your ancestry to an amethyst dragon, granting you a special magical affinity. Amethyst dragons are associated with force damage and possess psionic abilities.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-amethyst",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals force damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-force",
        name: "Damage Resistance",
        desc: "You have resistance to force damage."
      },
      {
        index: "psionic-mind",
        name: "Psionic Mind",
        desc: "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature, but the creature must be able to understand at least one language."
      },
      {
        index: "gem-flight",
        name: "Gem Flight",
        desc: "Starting at 5th level, you can use a bonus action to manifest spectral wings that give you a flying speed equal to your walking speed for 1 minute. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "crystal-dragonborn",
    name: "Crystal Dragonborn (Gem)",
    race: "dragonborn",
    desc: "You trace your ancestry to a crystal dragon, granting you a special magical affinity. Crystal dragons are associated with radiant damage and possess psionic abilities.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-crystal",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals radiant damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-radiant",
        name: "Damage Resistance",
        desc: "You have resistance to radiant damage."
      },
      {
        index: "psionic-mind",
        name: "Psionic Mind",
        desc: "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature, but the creature must be able to understand at least one language."
      },
      {
        index: "gem-flight",
        name: "Gem Flight",
        desc: "Starting at 5th level, you can use a bonus action to manifest spectral wings that give you a flying speed equal to your walking speed for 1 minute. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "emerald-dragonborn",
    name: "Emerald Dragonborn (Gem)",
    race: "dragonborn",
    desc: "You trace your ancestry to an emerald dragon, granting you a special magical affinity. Emerald dragons are associated with psychic damage and possess psionic abilities.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-emerald",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals psychic damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-psychic",
        name: "Damage Resistance",
        desc: "You have resistance to psychic damage."
      },
      {
        index: "psionic-mind",
        name: "Psionic Mind",
        desc: "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature, but the creature must be able to understand at least one language."
      },
      {
        index: "gem-flight",
        name: "Gem Flight",
        desc: "Starting at 5th level, you can use a bonus action to manifest spectral wings that give you a flying speed equal to your walking speed for 1 minute. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "sapphire-dragonborn",
    name: "Sapphire Dragonborn (Gem)",
    race: "dragonborn",
    desc: "You trace your ancestry to a sapphire dragon, granting you a special magical affinity. Sapphire dragons are associated with thunder damage and possess psionic abilities.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-sapphire",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals thunder damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-thunder",
        name: "Damage Resistance",
        desc: "You have resistance to thunder damage."
      },
      {
        index: "psionic-mind",
        name: "Psionic Mind",
        desc: "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature, but the creature must be able to understand at least one language."
      },
      {
        index: "gem-flight",
        name: "Gem Flight",
        desc: "Starting at 5th level, you can use a bonus action to manifest spectral wings that give you a flying speed equal to your walking speed for 1 minute. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },
  {
    index: "topaz-dragonborn",
    name: "Topaz Dragonborn (Gem)",
    race: "dragonborn",
    desc: "You trace your ancestry to a topaz dragon, granting you a special magical affinity. Topaz dragons are associated with necrotic damage and possess psionic abilities.",
    ability_bonuses: [],
    racial_traits: [
      {
        index: "draconic-ancestry-topaz",
        name: "Draconic Ancestry",
        desc: "Your breath weapon deals necrotic damage in a 15-foot cone."
      },
      {
        index: "damage-resistance-necrotic",
        name: "Damage Resistance",
        desc: "You have resistance to necrotic damage."
      },
      {
        index: "psionic-mind",
        name: "Psionic Mind",
        desc: "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature, but the creature must be able to understand at least one language."
      },
      {
        index: "gem-flight",
        name: "Gem Flight",
        desc: "Starting at 5th level, you can use a bonus action to manifest spectral wings that give you a flying speed equal to your walking speed for 1 minute. Once you use this trait, you can't do so again until you finish a long rest."
      }
    ],
    source: "Fizban's Treasury of Dragons"
  },

  // ═══════════════════════════════════════════════════════════
  // AASIMAR SUBRACES (Volo's Guide to Monsters)
  // ═══════════════════════════════════════════════════════════
  {
    index: "protector-aasimar",
    name: "Protector Aasimar",
    race: "aasimar",
    desc: "Protector aasimar are charged by the powers of good to guard the weak, to strike at evil wherever it arises, and to stand vigilant against the darkness.",
    ability_bonuses: [
      { ability_score: { index: "wis", name: "WIS" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "radiant-soul",
        name: "Radiant Soul",
        desc: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. Once you use this trait, you can't use it again until you finish a long rest."
      }
    ],
    source: "Volo's Guide to Monsters"
  },
  {
    index: "scourge-aasimar",
    name: "Scourge Aasimar",
    race: "aasimar",
    desc: "Scourge aasimar are imbued with a divine energy that blazes intensely within them. It feeds a powerful desire to destroy evil—a desire that is, at its best, unflinching and, at its worst, all-consuming.",
    ability_bonuses: [
      { ability_score: { index: "con", name: "CON" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "radiant-consumption",
        name: "Radiant Consumption",
        desc: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing a searing light to radiate from you, pour out of your eyes and mouth, and threaten to char you. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, you and each creature within 10 feet of you take radiant damage equal to half your level (rounded up). In addition, once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. Once you use this trait, you can't use it again until you finish a long rest."
      }
    ],
    source: "Volo's Guide to Monsters"
  },
  {
    index: "fallen-aasimar",
    name: "Fallen Aasimar",
    race: "aasimar",
    desc: "An aasimar who was touched by dark powers as a youth or who turns to evil in early adulthood can become one of the fallen—a group of aasimar whose inner light has been replaced by shadow.",
    ability_bonuses: [
      { ability_score: { index: "str", name: "STR" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "necrotic-shroud",
        name: "Necrotic Shroud",
        desc: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that can see you must each succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or become frightened of you until the end of your next turn. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra necrotic damage equals your level. Once you use this trait, you can't use it again until you finish a long rest."
      }
    ],
    source: "Volo's Guide to Monsters"
  },

  // ═══════════════════════════════════════════════════════════
  // GENASI SUBRACES (Elemental Evil Player's Companion)
  // ═══════════════════════════════════════════════════════════
  {
    index: "air-genasi",
    name: "Air Genasi",
    race: "genasi",
    desc: "As an air genasi, you are descended from the djinn. As changeable as the weather, your moods shift from calm to wild and violent with little warning, but these storms rarely last long.",
    ability_bonuses: [
      { ability_score: { index: "dex", name: "DEX" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "unending-breath",
        name: "Unending Breath",
        desc: "You can hold your breath indefinitely while you're not incapacitated."
      },
      {
        index: "mingle-with-the-wind",
        name: "Mingle with the Wind",
        desc: "You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell."
      }
    ],
    source: "Elemental Evil Player's Companion"
  },
  {
    index: "earth-genasi",
    name: "Earth Genasi",
    race: "genasi",
    desc: "As an earth genasi, you are descended from the cruel and greedy dao. You feel your connection to the earth, and you have the ability to move through solid earth.",
    ability_bonuses: [
      { ability_score: { index: "str", name: "STR" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "earth-walk",
        name: "Earth Walk",
        desc: "You can move across difficult terrain made of earth or stone without expending extra movement."
      },
      {
        index: "merge-with-stone",
        name: "Merge with Stone",
        desc: "You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell."
      }
    ],
    source: "Elemental Evil Player's Companion"
  },
  {
    index: "fire-genasi",
    name: "Fire Genasi",
    race: "genasi",
    desc: "As a fire genasi, you have inherited the volatile mood and keen mind of the efreet. You tend toward impatience and making snap judgments. Rather than hide your distinctive appearance, you exult in it.",
    ability_bonuses: [
      { ability_score: { index: "int", name: "INT" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "darkvision",
        name: "Darkvision",
        desc: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. Your ties to the Elemental Plane of Fire make your darkvision unusual: everything you see in darkness is in a shade of red."
      },
      {
        index: "fire-resistance",
        name: "Fire Resistance",
        desc: "You have resistance to fire damage."
      },
      {
        index: "reach-to-the-blaze",
        name: "Reach to the Blaze",
        desc: "You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells."
      }
    ],
    source: "Elemental Evil Player's Companion"
  },
  {
    index: "water-genasi",
    name: "Water Genasi",
    race: "genasi",
    desc: "The lapping of waves, the spray of sea foam on the wind, the ocean depths—all of these things call to your heart. You wander freely and take pride in your independence, though others might consider you selfish.",
    ability_bonuses: [
      { ability_score: { index: "wis", name: "WIS" }, bonus: 1 }
    ],
    racial_traits: [
      {
        index: "acid-resistance",
        name: "Acid Resistance",
        desc: "You have resistance to acid damage."
      },
      {
        index: "amphibious",
        name: "Amphibious",
        desc: "You can breathe air and water."
      },
      {
        index: "swim",
        name: "Swim",
        desc: "You have a swimming speed of 30 feet."
      },
      {
        index: "call-to-the-wave",
        name: "Call to the Wave",
        desc: "You know the shape water cantrip. When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells."
      }
    ],
    source: "Elemental Evil Player's Companion"
  },
];

export default SUBRACES;
