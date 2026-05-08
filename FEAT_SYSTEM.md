# D&D 5e Feat System

## Overview

This implementation provides full support for the D&D 5e Ability Score Improvement (ASI) and Feat selection system during character leveling.

## How It Works

### 1. ASI Levels

Characters gain an Ability Score Improvement at specific levels based on their class:

- **Most classes**: Levels 4, 8, 12, 16, 19
- **Fighters**: Levels 4, 6, 8, 12, 14, 16, 19 (2 extra ASIs)
- **Rogues**: Levels 4, 8, 10, 12, 16, 19 (1 extra ASI)

These are configured in the `ASI_LEVELS` constant in `levelup-modal.tsx`.

### 2. The Choice

At each ASI level, the player is presented with two options:

#### Option A: Increase Ability Scores
- Increase one ability score by +2, OR
- Increase two different ability scores by +1 each
- Ability scores cannot exceed 20 (except for Barbarians at level 20, where STR/CON can reach 24)

#### Option B: Gain a Feat
- Select one feat from the available list
- Gain all benefits from that feat
- Some feats also provide ability score bonuses

## Feat Structure

Feats are stored in `scripts/feats-data.ts` with the following structure:

```typescript
{
    name: string;              // e.g., "Great Weapon Master"
    prerequisite: string | null;  // e.g., "STR 13+" or null
    benefit: string;           // Description of what the feat does
    statBonus?: {
        type: 'fixed' | 'choice';  // Fixed: specific stat, Choice: player picks
        stat?: StatKey;         // For fixed bonuses
        options?: StatKey[];    // For choice bonuses
        amount: number;         // Usually +1
    };
    proficiencies?: string[];  // Skills, tools, weapons granted
    languages?: number;        // Number of languages to learn
}
```

### Feat Stat Bonuses

Some feats provide ability score increases:

**Fixed Bonuses** (specific stat):
- Actor: +1 CHA
- Durable: +1 CON
- Keen Mind: +1 INT
- Linguist: +1 INT

**Choice Bonuses** (player chooses):
- Athlete: +1 STR or DEX
- Observant: +1 INT or WIS
- Resilient: +1 to any ability score
- Tavern Brawler: +1 STR or CON
- Weapon Master: +1 STR or DEX

## Level-Up Flow

1. **Announcement Screen**: Epic "LEVEL UP!" animation
2. **HP Roll**: Roll hit die or take average
3. **ASI Choice** (if applicable): Choose between ASI or Feat
   - If **ASI**: Select ability scores to increase
   - If **Feat**: Browse and select a feat
     - If feat has stat bonus with choices, select which stat to increase
4. **Features Screen**: Display new class/racial features
5. **Summary Screen**: Review all changes
6. **Confirm**: Save to database

## Database Storage

### Feats Collection

Located in MongoDB: `dnd-resources.feats`

Seeded by: `scripts/seed-resources.ts`

### Character Feats

Stored on character document as an array:

```typescript
feats: [
    {
        name: "Great Weapon Master",
        benefit: "Heavy weapon crit or kill → bonus action attack...",
        level: 4,                // Level when feat was gained
        statChoice: null         // Or 'str', 'dex', etc. if applicable
    }
]
```

## API Endpoints

### GET /api/resources/feats
Fetches all available feats.

Query parameters:
- `q`: Search by name or benefit (optional)
- `prerequisite`: Filter by prerequisite (optional)

### PATCH /api/characters/[id]
Updates character during level-up.

Payload includes:
- `level`: New level
- `hp`: New max HP
- `stats`: Updated stats object
- `feat` (optional): Selected feat object
  ```json
  {
    "name": "Alert",
    "benefit": "+5 to initiative...",
    "level": 4,
    "statChoice": null
  }
  ```

## UI Components

### ASIChoiceScreen
Presents the initial choice between ASI and Feat selection.

### ASIScreen
Allows selecting ability score increases (existing implementation).

### FeatScreen
- Searchable list of all feats
- Displays feat name, prerequisites, and description
- Shows stat bonuses
- Allows stat choice selection if feat requires it
- Real-time stat preview

### SummaryScreen
Updated to display:
- HP gain
- Selected feat (if any)
- Stat increases (including those from feats)
- New features
- Level increase

## Character Display

Feats are displayed in the character overview tab:

```
┌─────────────────────────────────────┐
│ 🌟 Great Weapon Master   [Level 4] │
│                                     │
│ Heavy weapon crit or kill → bonus  │
│ action attack. Take -5 attack for  │
│ +10 damage.                        │
└─────────────────────────────────────┘
```

If the feat provided a stat bonus, it's also shown:
```
[Level 4] [+1 STR]
```

## Technical Notes

### Stat Application
- Fixed stat bonuses are applied automatically
- Choice stat bonuses require player selection
- Stat increases from feats are applied immediately and reflected in the character's stats object
- The system respects stat caps (20 for most, 24 for Barbarian STR/CON)

### Feat Validation
- Prerequisites are displayed but not currently enforced (can be added)
- Feats can be taken multiple times if allowed (though most D&D feats are one-time only)

### Navigation Flow
When a player chooses "Feat" at the ASI choice screen:
```
announce → hp → asi-choice → [FEAT] → features → summary
```

When a player chooses "ASI":
```
announce → hp → asi-choice → [ASI] → features → summary
```

## Future Enhancements

Potential improvements:
- Prerequisite enforcement (check class, stats, etc.)
- Feat prerequisites requiring other feats (e.g., "must have X feat")
- Repeatable feat support
- Feat-specific UI for complex feats (Magic Initiate, Ritual Caster)
- Display feat effects in combat stats
- Feat recommendations based on class/build
