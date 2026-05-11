# D&D 5e Spell Slots System

This feature implements the complete D&D 5e spell slot system for all spellcasting classes.

## Overview

Characters automatically receive spell slots based on their class and level:
- **Full Casters** (Bard, Cleric, Druid, Sorcerer, Wizard): Spell slots up to 9th level
- **Half Casters** (Paladin, Ranger): Spell slots up to 5th level
- **Warlock**: Pact Magic (fewer slots, all cast at highest level)
- **Non-Casters** (Barbarian, Fighter, Monk, Rogue): No spell slots

## Features

### 1. Automatic Calculation
- Spell slots are calculated automatically on:
  - Character creation (level 1)
  - Level up
- Based on class and level using official D&D 5e progression tables

### 2. Visual Display
- Beautiful, color-coded spell slot display in the "Spells & Abilities" tab
- Each spell level has its own distinct color
- Shows slot count for each available spell level
- Special display for Warlock's Pact Magic
- Clear "No Spellcasting" message for non-casters

### 3. Database Storage
- Spell slots are stored in the character document
- Automatically updated when leveling up
- Supports both standard spell slots and Pact Magic

## Technical Implementation

### Files Created

1. **`data/spell-slots.ts`**
   - Spell slot progression tables for all classes
   - Helper functions: `getSpellSlots()`, `isSpellcaster()`, `usesPactMagic()`, `getSpellcastingAbility()`
   - TypeScript types: `SpellSlots`, `PactMagicSlots`

2. **`components/ui/spell-slots-display.tsx`**
   - React component for displaying spell slots
   - Handles all three states: standard slots, Pact Magic, no slots
   - Responsive, color-coded design

3. **`scripts/migrate-spell-slots.ts`**
   - Migration script for existing characters
   - Adds spell slots to all characters without them

### Files Modified

1. **Character API Routes**
   - `app/api/characters/route.ts`: Calculate spell slots on creation
   - `app/api/characters/[id]/route.ts`: Recalculate on level up

2. **Character Display Components**
   - `components/sections/character-detail-section.tsx`: Show spell slots in magic tab
   - `components/sections/character-view-modal.tsx`: Show spell slots in party member view

3. **TypeScript Types**
   - Updated `CharacterData` type to include `spellSlots` field

## Usage

### For New Characters
Spell slots are automatically calculated and stored when a character is created.

### For Existing Characters
Run the migration script to add spell slots to existing characters:

```bash
# Make sure MongoDB connection is available
npm run dev

# In a new terminal:
npx tsx scripts/migrate-spell-slots.ts
```

### Viewing Spell Slots
1. Navigate to a character page
2. Click on the "Spells & Abilities" tab
3. Spell slots are displayed at the top of the page

## Spell Slot Progressions

### Full Casters
Level 1: 2×1st | Level 5: 4×1st, 3×2nd, 2×3rd | Level 10: 4×1st, 3×2nd, 3×3rd, 3×4th, 2×5th
Level 17: All slots up to 9th level | Level 20: Maximum slots across all levels

### Half Casters
Level 2: 2×1st | Level 5: 4×1st, 2×2nd | Level 9: 4×1st, 3×2nd, 2×3rd
Level 17: 4×1st, 3×2nd, 3×3rd, 3×4th, 1×5th

### Warlock (Pact Magic)
Level 1: 1 slot (1st level) | Level 2: 2 slots (1st level) | Level 3-4: 2 slots (2nd level)
Level 11-16: 3 slots (5th level) | Level 17-20: 4 slots (5th level)

## API Changes

### Character Document Schema
```typescript
{
  // ... existing fields
  spellSlots: SpellSlots | PactMagicSlots | null
}
```

### GET /api/characters/[id]
Response now includes `spellSlots` field.

### PATCH /api/characters/[id]
When `level` is updated, `spellSlots` are automatically recalculated.

## Future Enhancements

- [ ] Track used/available spell slots
- [ ] Short rest recovery (Warlock slots)
- [ ] Long rest recovery (all slots)
- [ ] Spell slot usage tracking per spell
- [ ] Higher-level casting (using higher slot for lower level spell)
- [ ] Spell preparation system
- [ ] Multiclassing spell slot calculation

## Notes

- The system uses official D&D 5e spell slot progression tables
- Warlock's Pact Magic is handled separately (fewer slots, higher level)
- Non-spellcasting classes show a clear message instead of empty slots
- Spell slots are view-only for party members (read-only character sheet)
