# D&D 2024 (5.5e) Backgrounds Migration

**Date**: May 14, 2026
**Status**: ✅ Complete

## Overview

Successfully migrated the entire backgrounds system from D&D 2014 (5e) to D&D 2024 (5.5e) Player's Handbook. This represents a major mechanical overhaul of how backgrounds work in D&D.

## Key Changes in 2024 Backgrounds

### Mechanical Differences

#### 2014 Structure
```typescript
{
  starting_proficiencies: [...],
  feature: { name, desc },
  starting_equipment: [...],
  personality_traits?: [...]
}
```

#### 2024 Structure
```typescript
{
  ability_scores: ['str', 'int', 'cha'],  // NEW: ASI moved from species
  feat: { name, desc },                    // NEW: Origin feats
  skill_proficiencies: [...],             // Renamed from starting_proficiencies
  tool_proficiency: string,                // NEW: Single tool prof
  equipment_choice: {                      // NEW: Structured choice
    package_a: [...],
    package_b_gold: 50
  },
  desc: [...]                             // NEW: Narrative descriptions
}
```

### Gameplay Impact

1. **Ability Score Increases (ASI)**
   - **2014**: Tied to species/race
   - **2024**: Tied to background
   - Players choose: +2/+1 split OR +1/+1/+1 to three abilities

2. **Origin Feats**
   - **2014**: No feat at level 1 (unless variant human)
   - **2024**: Every background grants an Origin feat
   - Examples: Lucky, Alert, Magic Initiate, Tough, Skilled

3. **Background Power**
   - **2014**: Primarily narrative + skill proficiencies
   - **2024**: Major mechanical component of character creation

## Background Changes

### Added (6 New Backgrounds)
- **Farmer** - Tough feat, STR/CON/WIS
- **Guard** - Alert feat, STR/INT/WIS
- **Guide** - Magic Initiate (Druid), DEX/CON/WIS
- **Merchant** - Lucky feat, CON/INT/CHA
- **Scribe** - Skilled feat, DEX/INT/WIS
- **Wayfarer** - Lucky feat, DEX/WIS/CHA

### Removed (4 Old Backgrounds)
- ~~Folk Hero~~ (consolidated/replaced)
- ~~Guild Artisan~~ (replaced by Artisan)
- ~~Outlander~~ (consolidated/replaced)
- ~~Urchin~~ (consolidated/replaced)

### Updated (10 Continuing Backgrounds)
All retained backgrounds received complete mechanical overhauls:
- Acolyte
- ~~Guild Artisan → Artisan~~ (renamed + updated)
- Charlatan
- Criminal
- Entertainer
- Hermit
- Noble
- Sage
- Sailor
- Soldier

## Implementation Details

### 1. Data Structure

**File**: `scripts/backgrounds-data-2024.ts`

Created comprehensive new data file with all 16 2024 backgrounds:

```typescript
export type Background2024 = {
    index: string;
    name: string;
    ability_scores: string[];
    feat: {
        name: string;
        desc: string[];
    };
    skill_proficiencies: { index: string; name: string }[];
    tool_proficiency: string;
    equipment_choice: {
        package_a: { equipment: { name: string }; quantity: number }[];
        package_b_gold: number;
    };
    desc: string[];
};
```

### 2. Database Seeding

**File**: `scripts/seed-resources.ts`

Updated to import and seed from `backgrounds-data-2024.ts`:

```typescript
import { BACKGROUNDS_2024 } from './backgrounds-data-2024.js';
// ...
await collection.insertMany(BACKGROUNDS_2024 as object[]);
log(`Inserted ${BACKGROUNDS_2024.length} backgrounds (2024 5.5e rules)`);
```

**Result**: Successfully seeded 16 backgrounds to `dnd-resources.backgrounds` collection.

### 3. TypeScript Types

**File**: `types/background.ts`

Updated Background type to match 2024 structure:

```typescript
export type Background = {
    index: string;
    name: string;
    ability_scores: string[]; // e.g., ['str', 'int', 'cha']
    feat: {
        name: string;
        desc: string[];
    };
    skill_proficiencies: { index: string; name: string }[];
    tool_proficiency: string;
    equipment_choice: {
        package_a: { equipment: { name: string }; quantity: number }[];
        package_b_gold: number;
    };
    desc: string[];
};
```

### 4. Frontend Components

#### Character Creation Wizard
**File**: `components/character-creation/background-step.tsx`

Major updates to `BackgroundAccordionRow`:
- Displays **Ability Scores** with format helper (STR, INT, CHA, etc.)
- Shows **Origin Feat** name and full description
- Displays **Background Story** from `desc` array
- Shows **Tool Proficiency** (single tool)
- Updated **Equipment** display for choice structure (Package A or 50 GP)
- Removed personality traits section
- Increased maxHeight from `800px` to `1200px` to accommodate more content

Updated section description:
```typescript
"Your background shapes who your character was before they became an 
adventurer. It grants ability score increases, an Origin feat, skill 
& tool proficiencies, and equipment."
```

#### Resource Browser
**File**: `components/sections/backgrounds-section.tsx`

Complete overhaul of `BackgroundDetail` component:
- Added **Ability Score Increases** section with pills
- Added **Origin Feat** section with full description
- Added **Background Description** section
- Updated **Tool Proficiency** display
- Updated **Equipment Choices** to show Package A vs Package B
- Removed Feature and Personality Trait sections
- Updated header to show "Background (2024 5.5e)"

## Database Indexes

Added optimized indexes for 2024 structure:

```javascript
await collection.createIndex({ 'ability_scores': 1 },  { name: 'ability_scores' });
await collection.createIndex({ 'feat.name': 1 },       { name: 'feat_name' });
await collection.createIndex({ name: 'text', desc: 'text' }, { name: 'text_search' });
```

## Complete Background List (2024)

| # | Background | Ability Scores | Origin Feat | Skills |
|---|-----------|----------------|-------------|---------|
| 1 | Acolyte | INT, WIS, CHA | Magic Initiate (Cleric) | Insight, Religion |
| 2 | Artisan | STR, DEX, INT | Crafter | Investigation, Persuasion |
| 3 | Charlatan | DEX, CON, CHA | Skilled | Deception, Sleight of Hand |
| 4 | Criminal | DEX, CON, INT | Alert | Sleight of Hand, Stealth |
| 5 | Entertainer | STR, DEX, CHA | Musician | Acrobatics, Performance |
| 6 | Farmer | STR, CON, WIS | Tough | Animal Handling, Nature |
| 7 | Guard | STR, INT, WIS | Alert | Athletics, Perception |
| 8 | Guide | DEX, CON, WIS | Magic Initiate (Druid) | Stealth, Survival |
| 9 | Hermit | CON, WIS, CHA | Healer | Medicine, Religion |
| 10 | Merchant | CON, INT, CHA | Lucky | Animal Handling, Persuasion |
| 11 | Noble | STR, INT, CHA | Skilled | History, Persuasion |
| 12 | Sage | CON, INT, WIS | Magic Initiate (Wizard) | Arcana, History |
| 13 | Sailor | STR, DEX, WIS | Tavern Brawler | Acrobatics, Perception |
| 14 | Scribe | DEX, INT, WIS | Skilled | Investigation, Perception |
| 15 | Soldier | STR, DEX, CON | Savage Attacker | Athletics, Intimidation |
| 16 | Wayfarer | DEX, WIS, CHA | Lucky | Insight, Stealth |

## Origin Feats Summary

### Most Common Feats
- **Skilled** (3x): Charlatan, Noble, Scribe
- **Lucky** (2x): Merchant, Wayfarer
- **Alert** (2x): Criminal, Guard
- **Magic Initiate** (3x): Acolyte (Cleric), Guide (Druid), Sage (Wizard)

### Unique Feats
- Crafter (Artisan)
- Musician (Entertainer)
- Tough (Farmer)
- Healer (Hermit)
- Tavern Brawler (Sailor)
- Savage Attacker (Soldier)

## Testing Checklist

- [x] Database successfully seeded with 16 backgrounds
- [x] Character creation wizard displays new structure
- [x] Ability scores shown and explained
- [x] Origin feats displayed with full descriptions
- [x] Background descriptions visible
- [x] Tool proficiencies shown
- [x] Equipment choices structured correctly
- [x] Resource browser updated
- [x] TypeScript types updated
- [x] No compilation errors
- [x] No linting errors

## Migration Notes

### Breaking Changes
1. **Old Background Type Incompatible** - Any code using the old `Background` type will need updates
2. **API Response Changed** - Frontend components fetching backgrounds must handle new structure
3. **Character Creation Flow** - Background selection now more impactful (ASI + feat)

### Backwards Compatibility
None. This is a clean break from 2014 to 2024 rules. All characters created will use 2024 backgrounds going forward.

### Data Loss
- Personality trait suggestions removed (not part of 2024 rules)
- Background features replaced with Origin feats (different mechanics)
- Old equipment lists replaced with choice structure

## Resources Used

- [Arcane Eye: Backgrounds in 2024 PHB](https://arcaneeye.com/mechanic-overview/backgrounds-in-the-2024-players-handbook-a-comprehensive-guide/)
- [D&D Beyond: 2024 Backgrounds and Origin Feats](https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024)
- [Wargamer: All DnD 2024 Backgrounds Explained](https://www.wargamer.com/dnd/2024-backgrounds)
- [D&D Beyond Basic Rules: Character Origins](https://www.dndbeyond.com/sources/dnd/br-2024/character-origins)

## Future Enhancements

### Potential Additions
1. **Custom Backgrounds** - Allow DMs to create homebrew backgrounds
2. **Background Variants** - Support campaign-specific background modifications
3. **Feat Integration** - Link to full feat descriptions and mechanics
4. **Character Builder Logic** - Implement ASI selection UI during character creation
5. **Equipment Manager** - Allow players to choose Package A or B during creation

### Setting-Specific Backgrounds
Future expansions could include:
- **Forgotten Realms Backgrounds** (18 additional from Heroes of Faerûn 2025)
- **Eberron Backgrounds** (17 additional from Forge of the Artificer 2025)
- Each includes unique Dragonmark feats and house-specific abilities

## Conclusion

✅ **Migration Complete**

The system now fully supports D&D 2024 (5.5e) backgrounds with:
- 16 official backgrounds from 2024 Player's Handbook
- Complete mechanical integration (ASI, Origin feats, skills, tools, equipment)
- Updated frontend components for both character creation and resource browsing
- Comprehensive database with proper indexing
- Type-safe implementation throughout

The migration maintains the stylistic quality of the existing system while adding the enhanced mechanical depth of the 2024 rules. Players now have meaningful choices during character creation with backgrounds providing both narrative flavor and significant mechanical benefits.

---

**Last Updated**: May 14, 2026
**Maintained By**: CR Dungeons Development Team
