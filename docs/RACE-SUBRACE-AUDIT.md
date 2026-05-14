# Race & Subrace Audit

**Date**: May 14, 2026  
**Status**: ⚠️ INCOMPLETE - Missing Many Subraces

## Current Database Status

We have **9 races**, but many are missing their official subraces!

### What We Have

| Race | Subraces in DB | Status |
|------|---------------|--------|
| Dragonborn | 0 | ❌ **MISSING ALL** |
| Dwarf | 1 (Hill Dwarf) | ⚠️ Missing Mountain Dwarf |
| Elf | 1 (High Elf) | ⚠️ Missing Wood Elf, Drow |
| Gnome | 1 (Rock Gnome) | ⚠️ Missing Forest Gnome |
| Half-Elf | 0 | ✅ (no official subraces) |
| Half-Orc | 0 | ✅ (no official subraces) |
| Halfling | 1 (Lightfoot) | ⚠️ Missing Stout Halfling |
| Human | 0 | ✅ (no official subraces) |
| Tiefling | 0 | ⚠️ Missing variants |

**Summary**: Only **4 out of 13 subraces** are in the database!

## Missing Subraces (PHB)

### 1. Dragonborn ❌❌❌
**Currently**: NO subraces at all  
**Should Have**:
- Chromatic Dragonborn (Fizban's) - 5 types
  - Black (Acid damage)
  - Blue (Lightning damage)
  - Green (Poison damage)
  - Red (Fire damage)
  - White (Cold damage)
- Metallic Dragonborn (Fizban's) - 5 types
  - Brass (Fire damage)
  - Bronze (Lightning damage)
  - Copper (Acid damage)
  - Gold (Fire damage)
  - Silver (Cold damage)
- Gem Dragonborn (Fizban's) - 5 types
  - Amethyst (Force damage)
  - Crystal (Radiant damage)
  - Emerald (Psychic damage)
  - Sapphire (Thunder damage)
  - Topaz (Necrotic damage)

**Note**: PHB version doesn't have subraces, but players choose their draconic ancestry (10 choices). Modern versions (Fizban's Treasury of Dragons) split these into separate lineages with different abilities.

### 2. Dwarf ⚠️
**Currently**: Hill Dwarf only  
**Missing**:
- ❌ Mountain Dwarf (+2 STR, armor proficiencies)

### 3. Elf ⚠️
**Currently**: High Elf only  
**Missing**:
- ❌ Wood Elf (+1 WIS, faster speed, weapon training)
- ❌ Drow / Dark Elf (+1 CHA, superior darkvision, drow magic)

### 4. Gnome ⚠️
**Currently**: Rock Gnome only  
**Missing**:
- ❌ Forest Gnome (+1 DEX, natural illusionist, speak with small beasts)

### 5. Halfling ⚠️
**Currently**: Lightfoot Halfling only  
**Missing**:
- ❌ Stout Halfling (+1 CON, dwarven resilience)

### 6. Tiefling ⚠️
**Currently**: No subraces (standard bloodline only)  
**Missing** (from Mordenkainen's Tome of Foes):
- ❌ Asmodeus Tiefling (standard)
- ❌ Baalzebul Tiefling (different spells)
- ❌ Dispater Tiefling (different spells)
- ❌ Fierna Tiefling (different spells)
- ❌ Glasya Tiefling (different spells)
- ❌ Levistus Tiefling (different spells)
- ❌ Mammon Tiefling (different spells)
- ❌ Mephistopheles Tiefling (different spells)
- ❌ Zariel Tiefling (different spells)

## Additional Popular Races (Not in DB)

These are official playable races from various sourcebooks:

### From Volo's Guide to Monsters
- ❌ Aasimar (Fallen, Protector, Scourge)
- ❌ Firbolg
- ❌ Goliath
- ❌ Kenku
- ❌ Lizardfolk
- ❌ Tabaxi
- ❌ Triton

### From Elemental Evil Player's Companion
- ❌ Aarakocra
- ❌ Genasi (Air, Earth, Fire, Water)

### From Mordenkainen's Tome of Foes
- ❌ Githyanki
- ❌ Githzerai

### From Eberron: Rising from the Last War
- ❌ Changeling
- ❌ Kalashtar
- ❌ Shifter (Beasthide, Longtooth, Swiftstride, Wildhunt)
- ❌ Warforged

### From Explorer's Guide to Wildemount
- ❌ Hollow One (supernatural gift)

### From Mythic Odysseys of Theros
- ❌ Centaur
- ❌ Leonin
- ❌ Satyr

## Priority Recommendation

### Phase 1: Complete PHB Subraces (HIGH PRIORITY)
Add the missing PHB subraces since we already have the base races:
1. Mountain Dwarf
2. Wood Elf
3. Drow (Dark Elf)
4. Forest Gnome
5. Stout Halfling

These are **essential** - most D&D players expect these!

### Phase 2: Dragonborn Variants (MEDIUM PRIORITY)
The Dragonborn currently has NO subrace system. We should:
- Either: Keep PHB version with draconic ancestry choice
- Or: Add Fizban's versions (Chromatic, Metallic, Gem)

### Phase 3: Tiefling Variants (LOW PRIORITY)
The 9 Tiefling bloodlines from Mordenkainen's are less common but still official.

### Phase 4: Additional Races (FUTURE)
Add the most popular additional races:
- Aasimar (very popular for paladins/clerics)
- Tabaxi (very popular for rogues/monks)
- Goliath (popular for barbarians)
- Warforged (extremely popular for artificers)
- Genasi (popular for elemental-themed characters)

## Impact on Players

**Current State**: Players are limited to only 13 race/subrace combinations.

**With Phase 1 Complete**: Players would have 18 combinations (PHB-complete).

**With Phases 1-3**: Players would have 30+ combinations.

**With Phase 4**: Players would have 50+ race/subrace combinations (comprehensive!).

## Technical Considerations

### Data Structure
The current structure supports subraces via the `subraces` array. We just need to:
1. Add subrace data files (similar to how we have class/subclass)
2. Update the races-data.ts file to include subrace references
3. Update the character creation wizard to allow subrace selection
4. Seed the database

### Frontend Changes Needed
- Race selection step needs to show subraces when available
- Subrace abilities need to be displayed in character sheet
- API needs to return subrace data

## Next Steps

1. Create comprehensive subrace data (following our subclass pattern)
2. Update races-data.ts with all missing subraces
3. Update character creation UI to handle subrace selection
4. Seed database
5. Test thoroughly

---

**Bottom Line**: We're missing **9+ essential PHB subraces** that players expect! This should be our next priority after spells.
