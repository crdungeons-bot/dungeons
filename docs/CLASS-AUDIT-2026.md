# D&D 5e Classes Audit

## Date: May 14, 2026

## Official D&D 5e Classes

D&D 5e features **13 official character classes** across multiple sourcebooks:

### Player's Handbook (PHB) - 12 Classes
1. ✅ Barbarian
2. ✅ Bard
3. ✅ Cleric
4. ✅ Druid
5. ✅ Fighter
6. ✅ Monk
7. ✅ Paladin
8. ✅ Ranger
9. ✅ Rogue
10. ✅ Sorcerer
11. ✅ Warlock
12. ✅ Wizard

### Eberron: Rising from the Last War (ERLW) - 1 Class
13. ⚠️ **Artificer** (Also reprinted in Tasha's Cauldron of Everything)

## Current Data Files Status

### `scripts/classes-data.ts` (4,712 lines)
**Status**: Contains 12/13 classes

**Missing**:
- ❌ Artificer

**Present Classes**:
- ✅ Barbarian
- ✅ Bard
- ✅ Cleric
- ✅ Druid
- ✅ Fighter
- ✅ Monk
- ✅ Paladin
- ✅ Ranger
- ✅ Rogue
- ✅ Sorcerer
- ✅ Warlock
- ✅ Wizard

### `scripts/classes-complete-data.ts` (3,190 lines)
**Status**: Contains Artificer (at minimum)

**Confirmed Present**:
- ✅ Artificer (complete with features, spell progression, infusions)

**Note**: This file appears to be a newer, more comprehensive format with full feature progressions by level.

## Gap Analysis

### Critical Missing Data
1. **Artificer in `classes-data.ts`**: The artificer exists in `classes-complete-data.ts` but not in the basic `classes-data.ts` file. This creates inconsistency.

### Data Structure Differences

**`classes-data.ts`** appears to follow a simpler D&D 5e SRD-style format:
- Basic proficiencies
- Proficiency choices
- Starting equipment
- Subclasses list
- Spellcasting info (if applicable)

**`classes-complete-data.ts`** is more comprehensive:
- Full feature progression by level
- Detailed ability descriptions
- Hit points formulas
- ASI levels
- Subclass features integrated
- Spell slot progression tables

## Recommendations

### Option 1: Add Artificer to `classes-data.ts`
**Pros**:
- Maintains consistency across both files
- Ensures Artificer shows up in all queries
- Minimal changes needed

**Cons**:
- Need to format Artificer data to match existing structure
- Requires careful data transformation

### Option 2: Migrate to `classes-complete-data.ts` as Primary
**Pros**:
- More comprehensive data structure
- Better suited for character creation and leveling
- Already has Artificer

**Cons**:
- May require updating API routes and frontend components
- More complex data structure to work with
- Larger file size

### Option 3: Sync Both Files
**Pros**:
- Maintains both formats for different use cases
- Best of both worlds
- Maximum flexibility

**Cons**:
- Double maintenance burden
- Risk of drift between files
- More complex seeding scripts

## Artificer Details

**Source**: Eberron: Rising from the Last War (2019), reprinted in Tasha's Cauldron of Everything (2020)

**Core Characteristics**:
- **Hit Die**: d8
- **Primary Ability**: Intelligence
- **Saving Throws**: Constitution, Intelligence
- **Armor**: Light armor, medium armor, shields
- **Weapons**: Simple weapons
- **Tools**: Thieves' tools, tinker's tools, one artisan's tools
- **Skills**: Choose 2 from Arcana, History, Investigation, Medicine, Nature, Perception, Sleight of Hand

**Subclass Level**: 3rd level (Artificer Specialist)

**Official Subclasses**:
1. Alchemist (ERLW, TCoE)
2. Armorer (TCoE)
3. Artillerist (ERLW, TCoE)
4. Battle Smith (ERLW, TCoE)

**Unique Features**:
- **Spellcasting**: Half-caster (like Paladin/Ranger), Intelligence-based
- **Infusions**: Magic item creation system
- **Tool Expertise**: At 6th level
- **Spell-Storing Item**: At 11th level
- **Soul of Artifice**: At 20th level

## Database Status

Need to verify:
- Does `dnd-resources.classes` collection contain Artificer?
- Are class images present for all 13 classes?
- Do frontend components handle Artificer correctly?

## Action Items

1. ✅ Audit complete
2. ⏳ Research complete
3. ⏳ Add Artificer to `classes-data.ts`
4. ⏳ Verify Artificer image exists at `public/images/dnd-classes/artificer.png`
5. ⏳ Seed Artificer into database
6. ⏳ Test Artificer in character creation
7. ⏳ Verify Artificer spells populate correctly
8. ⏳ Confirm all 4 Artificer subclasses are present in subclasses data

## Testing Checklist

After adding Artificer:
- [ ] Artificer appears in class selection during character creation
- [ ] Artificer image loads correctly
- [ ] Artificer description displays
- [ ] Artificer proficiencies are applied
- [ ] Artificer spell list populates at level 1
- [ ] Subclass selection appears at level 3
- [ ] All 4 Artificer subclasses are available
- [ ] Artificer subclass spells display (e.g., Armorer gets Magic Missile, etc.)
- [ ] Tool proficiencies are correctly applied
- [ ] Hit die is d8
- [ ] Starting HP calculation uses d8
- [ ] Intelligence is the spellcasting ability

## Notes

- Artificer is the ONLY official class not in the Player's Handbook
- It's specific to the Eberron setting but can be used in any campaign
- Tasha's Cauldron made it more universally available
- This is technically the 13th class, not the 12th
- No other official classes exist in 5e (as of 2026)
