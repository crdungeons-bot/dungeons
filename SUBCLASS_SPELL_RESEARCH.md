# Subclass Spell & Ability Research Guide

## Overview

This document outlines the research needed to tag spells and abilities with their associated subclasses in the `spells-abilities` collection.

## Database Schema

Each spell/ability entry now supports a `subclasses` field:
```typescript
subclasses?: string[]  // Format: ["forge domain cleric", "hexblade warlock"]
```

## Naming Convention

Subclass tags should use the format: `"{subclass name} {class}"` (all lowercase)

**Examples:**
- `"forge domain cleric"`
- `"oath of vengeance paladin"`
- `"hexblade warlock"`
- `"circle of the land druid"`

## Modified Spells

When a subclass modifies how a spell works (different mechanics, scaling, etc.), create a **separate entry** with the naming convention:
```
"{Spell Name} - {Subclass} {Class}"
```

**Example:** If the Hexblade modifies Eldritch Blast, create a new entry:
- Original: `"Eldritch Blast"`
- Modified: `"Eldritch Blast - Hexblade Warlock"`

---

## Subclasses Requiring Research

### **Cleric Domains** (Level 1 Subclass - 9 domains)

Clerics gain domain spells at levels: **1, 3, 5, 7, 9**

#### 1. **Forge Domain** ✅ COMPLETED
- [x] 1st: Identify, Searing Smite
- [x] 3rd: Heat Metal, Magic Weapon
- [x] 5th: Elemental Weapon, Protection from Energy
- [x] 7th: Fabricate, Wall of Fire
- [x] 9th: Animate Objects, Creation

**Status:** All 9 spells tagged in database with `subclasses: ["forge domain cleric"]`

#### 2. **Grave Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:grave

#### 3. **Knowledge Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:knowledge

#### 4. **Life Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:life

#### 5. **Light Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:light

#### 6. **Nature Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:nature

#### 7. **Tempest Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:tempest

#### 8. **Trickery Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:trickery

#### 9. **War Domain**
- [ ] Research spell list at levels 1, 3, 5, 7, 9
- **Resource:** https://dnd5e.wikidot.com/cleric:war

---

### **Paladin Oaths** (Level 3 Subclass - 5 oaths)

Paladins gain oath spells at levels: **3, 5, 9, 13, 17**

#### 1. **Oath of the Ancients**
- [ ] Research spell list at levels 3, 5, 9, 13, 17
- **Resource:** https://dnd5e.wikidot.com/paladin:ancients

#### 2. **Oath of Conquest**
- [ ] Research spell list at levels 3, 5, 9, 13, 17
- **Resource:** https://dnd5e.wikidot.com/paladin:conquest

#### 3. **Oath of Devotion**
- [ ] Research spell list at levels 3, 5, 9, 13, 17
- **Resource:** https://dnd5e.wikidot.com/paladin:devotion

#### 4. **Oath of Redemption**
- [ ] Research spell list at levels 3, 5, 9, 13, 17
- **Resource:** https://dnd5e.wikidot.com/paladin:redemption

#### 5. **Oath of Vengeance**
- [ ] Research spell list at levels 3, 5, 9, 13, 17
- **Resource:** https://dnd5e.wikidot.com/paladin:vengeance

---

### **Warlock Patrons** (Level 1 Subclass - 5 patrons)

Warlocks gain **expanded spell list** (spells added to their available options, organized by spell level 1-5)

**NOTE:** These aren't automatically known - they're added to the warlock spell list for that character to choose from.

#### 1. **Archfey**
- [ ] Research expanded spell list (1st through 5th level spells)
- **Resource:** https://dnd5e.wikidot.com/warlock:archfey

#### 2. **Celestial**
- [ ] Research expanded spell list (1st through 5th level spells)
- **Resource:** https://dnd5e.wikidot.com/warlock:celestial

#### 3. **Fiend**
- [ ] Research expanded spell list (1st through 5th level spells)
- **Resource:** https://dnd5e.wikidot.com/warlock:fiend

#### 4. **Great Old One**
- [ ] Research expanded spell list (1st through 5th level spells)
- **Resource:** https://dnd5e.wikidot.com/warlock:great-old-one

#### 5. **Hexblade**
- [ ] Research expanded spell list (1st through 5th level spells)
- [ ] Check for modified spells (e.g., weapon-related modifications)
- **Resource:** https://dnd5e.wikidot.com/warlock:hexblade

---

### **Druid Circles** (Level 2 Subclass - 1 circle with spells)

#### **Circle of the Land**

This is unique - Land Druids choose a terrain type, and each terrain grants different spells at levels: **3, 5, 7, 9**

**Terrain Options:**
1. [ ] **Arctic** - Research circle spells
2. [ ] **Coast** - Research circle spells
3. [ ] **Desert** - Research circle spells
4. [ ] **Forest** - Research circle spells
5. [ ] **Grassland** - Research circle spells
6. [ ] **Mountain** - Research circle spells
7. [ ] **Swamp** - Research circle spells
8. [ ] **Underdark** - Research circle spells (if applicable)

**Tagging Format:** Use `"circle of the land (terrain) druid"`
- Example: `"circle of the land (arctic) druid"`

**Resource:** https://dnd5e.wikidot.com/druid:land

---

## Other Subclasses (No Expanded Spell Lists)

These subclasses do **not** grant additional spells to tag:

### **No Spell Lists:**
- **Barbarian** - All paths (no spells)
- **Bard** - All colleges (no bonus spells beyond class list)
- **Fighter** - All archetypes except:
  - Eldritch Knight (can learn wizard spells - no special tagging needed)
- **Monk** - All ways (no actual spells, just ki abilities)
- **Ranger** - All conclaves (share the ranger spell list)
- **Rogue** - All archetypes except:
  - Arcane Trickster (can learn wizard spells - no special tagging needed)
- **Sorcerer** - All origins (no expanded spell lists in PHB/XGtE)

---

## Research Process

### Step 1: Find Spell Lists
1. Visit the subclass page on https://dnd5e.wikidot.com/
2. Locate the spell table (usually under "Domain Spells", "Oath Spells", or "Expanded Spell List")
3. Record all spell names organized by level

### Step 2: Locate Spells in Database
1. Search for each spell name in `c:\dungeons\data\spells.ts`
2. If spell exists: Add subclass tag to `subclasses` array
3. If spell doesn't exist: Note it for potential addition

### Step 3: Update Database Entry
```typescript
// Before:
{
    "name": "Searing Smite",
    "level": 1,
    "school": "evocation",
    "classes": ["paladin"],
    // ...
}

// After:
{
    "name": "Searing Smite",
    "level": 1,
    "school": "evocation",
    "classes": ["paladin"],
    "subclasses": ["forge domain cleric"],  // ADD THIS
    // ...
}
```

### Step 4: Handle Modified Spells
If a subclass modifies a spell's mechanics:
1. Create a **new entry** in `spells.ts`
2. Use naming convention: `"{Spell Name} - {Subclass} {Class}"`
3. Document the differences in the description

---

## Progress Tracking

### Summary
- **Total Subclasses to Research:** 20
  - Cleric Domains: 9
  - Paladin Oaths: 5
  - Warlock Patrons: 5
  - Druid Land Circles: 8 terrains = 1 subclass

- **Estimated Spells to Tag:** ~100-150 spells
- **Completed:** 1 (Forge Domain as example)
- **Remaining:** 19

---

## Next Steps

1. **Prioritize by Frequency:**
   - Start with commonly played subclasses (Life, Light, Devotion, Fiend, Hexblade)
   - These will have immediate impact for users

2. **Batch Research:**
   - Complete all clerics together
   - Complete all paladins together
   - Complete all warlocks together
   - Complete druid last (terrain variations add complexity)

3. **Test After Each Batch:**
   - Run seed script: `npx tsx scripts/seed-resources.ts`
   - Verify data in MongoDB
   - Test character creation/spell lists in UI

---

## Notes for Implementation

- This research can be done incrementally
- The database schema is ready to accept subclass tags
- Missing tags won't break existing functionality
- As tags are added, spell filtering will become more accurate
- Consider creating a helper script to semi-automate the tagging process

---

## Questions / Decisions

1. **Terrain-Specific Land Druid Spells:**
   - Should we tag all terrain variants, or just note "Circle of the Land" generically?
   - **Decision:** Tag with terrain specificity for accurate filtering

2. **Spells Available to Multiple Subclasses:**
   - A spell can have multiple subclass tags
   - Example: `"subclasses": ["forge domain cleric", "war domain cleric"]`

3. **Modified vs. New Spells:**
   - Only create separate entries if mechanics change significantly
   - Minor flavor differences can be noted in description

---

_Last Updated: 2026-05-11_
_Status: Schema ready, research in progress_
