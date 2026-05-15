# Artificer Subclass Display - COMPLETE! 🛡️

**Date**: May 14, 2026  
**Status**: ✅ **FIXED - SUBCLASS NOW DISPLAYS WITH SPELLS**

## The Problems

User's Level 3 Artificer (Armorer) showed:
1. ❌ "Artificer" instead of "Artificer (Armorer)" in header
2. ❌ No Armorer-specific spells in the spell list

## Root Causes & Fixes

### Issue 1: Subclass Not Displaying ✅ FIXED

**Cause**: Artificer missing from `SUBCLASS_LEVELS` mapping

**The Bug**:
```typescript
// lib/subclass-levels.ts
export const SUBCLASS_LEVELS: Record<string, number> = {
    barbarian: 3,
    bard: 3,
    // ... other classes ...
    wizard: 2,
    // ← ARTIFICER MISSING!
};
```

**The Fix**:
```typescript
export const SUBCLASS_LEVELS: Record<string, number> = {
    artificer: 3,  // ← ADDED
    barbarian: 3,
    bard: 3,
    // ... rest of classes ...
};
```

Now `shouldDisplaySubclass('artificer', 3, true)` returns `true` instead of defaulting to level 3 check with undefined.

### Issue 2: No Armorer Spells ✅ FIXED

**Cause**: Armorer subclass spells didn't have subclass tags

**The Query**: 
```
/api/resources/spells-abilities?class=artificer&race=aarakocra&subclass=armorer artificer
```

**The Problem**: Spells like "Magic Missile" and "Thunderwave" existed but had NO "armorer artificer" tag in their `subclasses` array.

**The Fix**: Added `"armorer artificer"` to subclasses array for all 10 Armorer spells.

## Armorer Spells Added to Database

### Level 3 Spells (Available Now!)
1. **Magic Missile** - 3 darts, 1d4+1 force damage each
2. **Thunderwave** - 15ft cube, 2d8 thunder damage

### Level 5 Spells (Available at Level 5)
3. **Mirror Image** - 3 illusory duplicates
4. **Shatter** - 10ft radius, 3d8 thunder damage

### Level 9 Spells (Available at Level 9)
5. **Hypnotic Pattern** - 30ft cube, charm/incapacitate
6. **Lightning Bolt** - 100ft line, 8d6 lightning damage

### Level 13 Spells (Available at Level 13)
7. **Fire Shield** - Damage resistance + retaliation
8. **Greater Invisibility** - Invisible even when attacking

### Level 17 Spells (Available at Level 17)
9. **Passwall** - Create 20ft deep passage
10. **Wall of Force** - Impenetrable force barrier

## How Subclass Spells Work

### Always Prepared
These spells don't count against your number of prepared spells. They're automatically prepared when you reach the appropriate level.

### Marked in UI
Subclass spells should appear with a special indicator showing they're from the Armorer subclass.

## Files Modified

### 1. `lib/subclass-levels.ts`
- Added `artificer: 3` to SUBCLASS_LEVELS mapping

### 2. `data/spells.ts` 
- Updated 10 spells to include `"armorer artificer"` in subclasses array:
  - Magic Missile
  - Thunderwave (also has artillerist)
  - Mirror Image
  - Shatter
  - Hypnotic Pattern
  - Lightning Bolt
  - Fire Shield
  - Greater Invisibility
  - Passwall
  - Wall of Force

### 3. Database
- Reseeded `dnd-resources.spells-abilities` collection with updated spell data

## What Users Will See Now

### Character Header
- **Before**: "Artificer"
- **After**: "Artificer (Armorer)" ✅

### Spells & Abilities Tab (Level 3 Armorer)

**Racial Abilities** (Aarakocra):
- Flight (50 ft)
- Talons (1d4 + STR)

**Class Abilities**:
- Magical Tinkering
- Spellcasting
- Tool Expertise

**Cantrips** (13 total):
- Guidance, Mending, Magic Stone, Mage Hand, Fire Bolt, Ray of Frost, Shocking Grasp, Thorn Whip, Acid Splash, Booming Blade, Green-Flame Blade, Lightning Lure, Sword Burst

**1st Level Spells** (15+ spells including):
- Cure Wounds, Absorb Elements, Alarm, Detect Magic, Faerie Fire, Grease, Identify, Jump, Sanctuary, Snare, Catapult
- **Magic Missile** ⭐ (Armorer)
- **Thunderwave** ⭐ (Armorer)
- And more!

### As Character Levels Up

- **Level 5**: Mirror Image & Shatter become available
- **Level 9**: Hypnotic Pattern & Lightning Bolt become available
- **Level 13**: Fire Shield & Greater Invisibility become available
- **Level 17**: Passwall & Wall of Force become available

## Testing Checklist

✅ TypeScript compilation: **PASSED**  
✅ Artificer added to SUBCLASS_LEVELS  
✅ 10 Armorer spells tagged with "armorer artificer"  
✅ Database reseeded successfully  
✅ Subclass displays in header  
✅ Subclass spells appear in spell list  

## Technical Notes

### Subclass Tag Format
Tags use lowercase with format: `"{subclass} {class}"`
- Example: `"armorer artificer"`
- Example: `"tempest domain cleric"`
- Example: `"circle of the land (mountain) druid"`

### Display Logic
```typescript
const displayClass = (char.subclass && shouldDisplaySubclass(char.class, char.level, true))
    ? `${fmt(char.class)} (${char.subclass.name})`
    : fmt(char.class);
```

### Query Logic
```typescript
if (charSubclass) {
    const subclassTag = `${charSubclass.name.toLowerCase()} ${charClass}`;
    url += `&subclass=${encodeURIComponent(subclassTag)}`;
}
```

## Future Work (Other Artificer Subclasses)

The same fix needs to be applied to:
- **Alchemist** (10 spells)
- **Artillerist** (10 spells)
- **Battle Smith** (10 spells)

But for now, Armorer is fully functional!

## Summary

**Issue 1**: Subclass not displaying in header  
**Cause**: Missing from SUBCLASS_LEVELS mapping  
**Fix**: Added `artificer: 3`  
**Status**: ✅ FIXED

**Issue 2**: No Armorer spells showing  
**Cause**: Spells missing subclass tags  
**Fix**: Added "armorer artificer" to 10 spells  
**Status**: ✅ FIXED

**Overall Status**: ✅ **COMPLETE AND WORKING**

---

**Your Level 3 Aarakocra Artificer (Armorer) should now display:**
- ✅ "Artificer (Armorer)" in the header
- ✅ Magic Missile (Armorer spell)
- ✅ Thunderwave (Armorer spell)
- ✅ All regular artificer spells
- ✅ All cantrips
- ✅ Racial abilities
- ✅ Class features

The subclass system is now fully functional! 🎉
