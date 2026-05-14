# Database Structure Review & Proposed Schema

## Current Database Collections

### 1. **`dnd-resources.classes`**
**Purpose:** Store all D&D 5e class information

**Current Schema:**
```typescript
{
  index: string;              // e.g., "barbarian", "wizard"
  name: string;               // e.g., "Barbarian", "Wizard"
  hit_die: number;            // e.g., 12, 6
  proficiency_choices: ProficiencyChoice[];  // Skill choices
  proficiencies: Proficiency[];              // Base proficiencies (armor, weapons, saves)
  saving_throws: SavingThrow[];              // Primary saving throws
  starting_equipment: StartingEquipment[];   // Initial gear
  url?: string;
}
```

**Status:** ✅ **Adequate** for basic class info, but **MISSING**:
- Class features by level (Rage, Spellcasting, Extra Attack, etc.)
- Spell progression table (for casters)
- Hit points per level calculation
- Multiclassing prerequisites
- **Artificer class** entirely

---

### 2. **`dnd-resources.subclasses`**
**Purpose:** Store all D&D 5e subclass information

**Current Schema:**
```typescript
{
  name: string;               // e.g., "Path of the Berserker"
  description: string;        // Brief flavor text
  class: string;              // Parent class: "barbarian", "wizard", etc.
  subclass_level: number;     // When you choose it: 1, 2, or 3
}
```

**Status:** ❌ **CRITICALLY INSUFFICIENT** - Only stores name and description!

**MISSING Critical Data:**
- Features granted at each level (3rd, 6th, 10th, 14th, etc.)
- Expanded spell lists (for caster subclasses)
- Resource pools (channel divinity uses, ki points, etc.)
- Stat bonuses or ASI modifications
- Additional proficiencies granted
- Subclass-specific mechanics (e.g., Bladesong, Rage Beyond Death)
- Sourcebook reference

---

### 3. **`dnd-resources.spells-abilities`**
**Purpose:** Store spells, class abilities, and racial abilities

**Current Schema:**
```typescript
{
  name: string;
  type?: 'class-ability' | 'racial-ability';  // absent = spell
  
  // Spell-only fields
  level?: number;              // 0-9
  school?: string;             // "evocation", "necromancy", etc.
  concentration?: boolean;
  ritual?: boolean;
  range?: string;
  components?: string[];       // ["v", "s", "m"]
  material?: string;
  duration?: string;
  castingTime?: string;
  cantripUpgrade?: string;
  higherLevelSlot?: string;
  castingTrigger?: string;
  
  // Ability-only fields
  levelGained?: number;
  recharge?: string;
  upgrades?: string;
  races?: string[];
  
  // Shared fields
  classes?: string[];          // Which classes can access this
  subclasses?: string[];       // Which subclasses grant/expand this
  actionType: string;          // "action", "bonus action", "reaction", etc.
  description: string;
}
```

**Status:** ✅ **GOOD** - This collection is well-designed and flexible!

**What Works:**
- Can store spells, class abilities, and racial abilities
- Has `subclasses` array to link abilities to specific subclasses
- Comprehensive spell metadata
- Flexible for different ability types

**Minor Improvements Needed:**
- Add `sourcebook` field (PHB, XGtE, TCoE, etc.)
- Add `subclass_level` field for when subclass abilities are gained
- Ensure all subclass-specific spells/abilities are tagged correctly

---

### 4. **`characters` (user database)**
**Purpose:** Store player-created characters

**Current Schema (from `types/character.ts`):**
```typescript
{
  id: string;
  name: string;
  race: string;
  class: string;
  background: string;
  alignment: string;
  level: number;
  hp: number | null;
  currency: Currency;
  height: string | null;
  weight: string | null;
  age: string | null;
  proficiencies: string[];
  stats: Stats;
  story: Story;
  feats?: Feat[];
  spellSlots: SpellSlots | PactMagicSlots | null;
  subclass: CharacterSubclass | null;  // ← Links to subclass
  createdAt: string;
}
```

**Status:** ✅ **Adequate** for current needs

**What's Good:**
- Has `subclass` field to link chosen subclass
- Flexible enough to store character state

**What Could Be Better:**
- No tracking of which class features are unlocked at current level
- No tracking of which subclass features are unlocked
- No detailed spell list (just slots)
- No ability usage tracking (e.g., Rage uses remaining, Ki points)

---

## Compatibility Issues Identified

### 🚨 **Issue #1: Subclass Data is Too Shallow**

**Problem:**
- Current `subclasses` collection only has: `name`, `description`, `class`, `subclass_level`
- Missing ALL the actual mechanical features that make each subclass unique
- Cannot display "what you get at level 3, 6, 10, 14, etc."

**Impact:**
- Users can SELECT a subclass but don't know what it actually DOES
- Character sheets can't show unlocked subclass features
- No way to display subclass-specific spells or abilities

**Solution Required:**
- Expand subclass schema to include feature progressions

---

### 🚨 **Issue #2: Missing Class Feature Progressions**

**Problem:**
- `classes` collection has basic info but no level-by-level feature table
- Can't show "what features does a Level 5 Barbarian have?"

**Impact:**
- Character sheets can't display unlocked class features
- New players don't understand their class progression

**Solution Required:**
- Add class features table to classes collection or create new collection

---

### 🚨 **Issue #3: Artificer Class Missing Entirely**

**Problem:**
- Artificer is a full official class since Eberron: Rising from the Last War (2019)
- Has 4 subclasses
- We have 0 data for it

**Impact:**
- Users cannot create Artificer characters
- Missing ~4 subclasses from our 117 total

**Solution Required:**
- Add Artificer to `classes` collection
- Add 4 Artificer subclasses

---

### 🚨 **Issue #4: Sourcebook Attribution Missing**

**Problem:**
- No way to filter by sourcebook
- User settings might restrict content to PHB + XGtE only
- Expansion to TCoE needs tracking

**Impact:**
- Can't implement "only show PHB content" filter
- Legal/licensing unclear for which content is shown

**Solution Required:**
- Add `sourcebook` field to all resource documents

---

## Proposed New Schema

### **Enhanced Subclass Schema**

```typescript
{
  // Basic Info (existing)
  name: string;
  description: string;
  class: string;
  subclass_level: number;
  
  // NEW: Source tracking
  sourcebook: string;          // "PHB", "XGtE", "TCoE", etc.
  
  // NEW: Features by level
  features: {
    [level: number]: SubclassFeature[]
  };
  
  // NEW: Expanded spell list (for caster subclasses)
  spells?: {
    [level: number]: string[]  // spell names available at each character level
  };
  
  // NEW: Additional proficiencies granted
  proficiencies?: {
    armor?: string[];
    weapons?: string[];
    tools?: string[];
    skills?: string[];
  };
  
  // NEW: Resource modifications
  resources?: {
    name: string;              // e.g., "Channel Divinity: Turn Undead"
    type: string;              // "channel_divinity", "ki", "sorcery_points"
    usesPerRest: string;       // "1", "2", "proficiency_bonus"
    restType: string;          // "short", "long"
    levelGained: number;
  }[];
}
```

**SubclassFeature Type:**
```typescript
{
  name: string;               // "Frenzy", "Arcane Ward", etc.
  level: number;              // When you get it: 3, 6, 10, 14, etc.
  description: string;        // Full mechanical description
  actionType?: string;        // "action", "bonus action", etc.
  usesPerRest?: string;       // "1", "proficiency_bonus", etc.
  restType?: string;          // "short", "long"
  spellReference?: string;    // Link to spell if it grants spell-like ability
}
```

---

### **Enhanced Class Schema**

```typescript
{
  // Basic Info (existing)
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: ProficiencyChoice[];
  proficiencies: Proficiency[];
  saving_throws: SavingThrow[];
  starting_equipment: StartingEquipment[];
  
  // NEW: Source tracking
  sourcebook: string;
  
  // NEW: Class features by level
  features: {
    [level: number]: ClassFeature[]
  };
  
  // NEW: Spell progression (for casters)
  spellcasting?: {
    type: "full" | "half" | "pact";  // Caster type
    spellSlotsPerLevel: {
      [level: number]: SpellSlots | PactMagicSlots
    };
    spellsKnownPerLevel?: {
      [level: number]: number
    };
    cantripsKnownPerLevel?: {
      [level: number]: number
    };
    spellcastingAbility: "int" | "wis" | "cha";
  };
  
  // NEW: Multiclassing requirements
  multiclassing?: {
    prerequisites: {
      [stat: string]: number  // e.g., { "str": 13, "dex": 13 }
    };
    proficienciesGained: {
      armor?: string[];
      weapons?: string[];
    };
  };
}
```

**ClassFeature Type:**
```typescript
{
  name: string;
  level: number;
  description: string;
  choices?: string[];          // e.g., Fighting Style options
  scalingBy?: "level" | "proficiency_bonus";
}
```

---

## Migration Strategy

### Phase 1: Type Definitions ✅
1. Create comprehensive TypeScript types
2. Ensure backward compatibility with existing data
3. Define clear interfaces for new schema

### Phase 2: Data Collection & Preparation
1. Extract all 117 subclasses from official sourcebooks
2. Document all features by level for each subclass
3. Document all class features by level
4. Link subclass abilities to `spells-abilities` collection

### Phase 3: Database Schema Update
1. Add new fields to existing documents (backward compatible)
2. Create indexes for new fields
3. Validate data integrity

### Phase 4: Seed Script Update
1. Update `scripts/subclasses-data.ts` with full schema
2. Add Artificer to `scripts/classes-data.ts`
3. Update `scripts/seed-resources.ts` to handle new fields
4. Add subclass-specific abilities to `data/spells.ts`

### Phase 5: API Route Updates
1. Update `/api/resources/subclasses` to return new fields
2. Update `/api/resources/classes` to return new fields
3. Add new query parameters for filtering (sourcebook, level, etc.)

### Phase 6: Frontend Updates
1. Update TypeScript types in `types/`
2. Update UI components to display new data
3. Add feature unlock indicators on character sheets
4. Display subclass features in selection modal

---

## Questions for Clarification

### 1. **Sourcebook Scope**
You mentioned including PHB, XGtE, and TCoE. Should we also include:
- **Eberron: Rising from the Last War** (Artificer, some subclasses)?
- **Fizban's Treasury of Dragons** (Drakewarden, Way of Ascendant Dragon)?
- **Sword Coast Adventurer's Guide** (several subclasses)?
- **Other official sourcebooks**?

### 2. **Feature Granularity**
For each subclass feature, how detailed should we be?
- **Option A:** Just name + description (lighter, faster to implement)
- **Option B:** Full mechanical breakdown (damage dice, scaling, action economy, etc.)

### 3. **Spell List Handling**
For subclasses with expanded spell lists (e.g., Cleric domains, Warlock patrons):
- **Option A:** Store spell names in subclass document
- **Option B:** Tag spells in `spells-abilities` with subclass filter
- **Option C:** Both (redundant but more flexible for queries)

### 4. **Class Features**
Should we also expand the `classes` collection with full feature progressions?
- This would allow showing "Level 5 Fighter gets Extra Attack"
- More work but more complete

### 5. **Character Integration**
Should characters store:
- **Option A:** Just subclass name (query features at render time)
- **Option B:** Snapshot of unlocked features (faster but redundant)

---

## Recommended Decision: Comprehensive Approach

**I recommend we go FULL comprehensive:**

1. ✅ **Add all 60 missing subclasses** with complete feature data
2. ✅ **Expand subclass schema** to include features, spells, proficiencies
3. ✅ **Add Artificer class** with full progression
4. ✅ **Expand class schema** to include features by level
5. ✅ **Add sourcebook tracking** to all resources
6. ✅ **Link subclass abilities** to `spells-abilities` collection
7. ✅ **Update all TypeScript types**
8. ✅ **Update seed scripts** and API routes
9. ✅ **Update UI components** to display new data

**Rationale:**
- You said "time is not an issue, money is not an issue"
- This is a crucial part of the game
- Half measures will require rework later
- Better to do it right once than iterate multiple times
- Users expect complete, accurate D&D data

**Estimated Scope:**
- ~60-80 hours of careful, detailed work
- Will result in a professional, complete D&D character creation system
- Database will be authoritative source for all D&D 5e content

---

## Next Steps (Awaiting Your Approval)

Before I proceed with Step 3 (implementation), please confirm:

1. ✅ Agree with comprehensive approach?
2. ❓ Which sourcebooks to include beyond PHB + XGtE + TCoE?
3. ❓ Feature granularity level (Option A or B)?
4. ❓ Spell list handling strategy (Option A, B, or C)?
5. ❓ Expand class features too, or just subclass features?
6. ❓ Any specific concerns or requirements I haven't addressed?

**Once confirmed, I will proceed with:**
- Creating comprehensive TypeScript types
- Building complete data files for all subclasses
- Updating database schema
- Seeding the database
- Updating the application
