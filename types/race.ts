// D&D Race Types
export type Race = {
  index: string;
  name: string;
  url?: string; // Optional for backwards compatibility
};

export type AbilityBonus = {
  ability_score: {
    index: string;
    name: string;
  };
  bonus: number;
};

export type Trait = {
  index: string;
  name: string;
};

export type Language = {
  index: string;
  name: string;
};

export type RaceDetail = {
  index: string;
  name: string;
  speed: number;
  alignment: string;
  /** Player-facing overview when present (supplement races); else use alignment text. */
  short_description?: string;
  age: string;
  size: string;
  size_description: string;
  language_desc: string;
  ability_bonuses: AbilityBonus[];
  traits: Trait[];
  languages: Language[];
  url?: string; // Optional for backwards compatibility
};

export type RacesResponse = {
  count: number;
  results: RaceDetail[];
};
