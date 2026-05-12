# Subclass Display Logic Fix

## Issue

The subclass display was not properly checking whether a character had reached the required level before showing the subclass name.

## Expected Behavior

1. **Level 1 Subclass Classes** (Cleric, Sorcerer, Warlock):
   - Always display: `{class} ({subclass})` if subclass is assigned
   - Example: "Cleric (Life Domain)" at level 1

2. **Higher Level Subclass Classes** (all others):
   - Display: `{class}` until reaching subclass level
   - Display: `{class} ({subclass})` once subclass level is reached
   - Example: "Paladin" at levels 1-2, "Paladin (Oath of the Ancients)" at level 3+

## What Was Wrong

### Character Creation Summary (`components/character-creation/summary-step.tsx`)
**Problem:** Always displayed subclass if it existed, regardless of level
```typescript
// OLD (WRONG)
const displayClass = dndClass && subclass
    ? `${fmt(dndClass)} (${fmt(subclass)})`
    : fmt(dndClass);
```

**Fixed:** Now checks if character has reached subclass level (level 1 for new characters)
```typescript
// NEW (CORRECT)
const displayClass = dndClass && subclass && shouldDisplaySubclass(dndClass, 1, true)
    ? `${fmt(dndClass)} (${fmt(subclass)})`
    : dndClass ? fmt(dndClass) : ', ';
```

### Character List (`components/sections/characters-section.tsx`)
**Problem:** Only displayed class name, never checked for subclass

```typescript
// OLD (WRONG)
{fmt(char.race)} · {fmt(char.class)}
```

**Fixed:** Added subclass field to type, imported helper, and added display logic
```typescript
// NEW (CORRECT)
const displayClass = (char.subclass && shouldDisplaySubclass(char.class, char.level ?? 1, true))
    ? `${fmt(char.class)} (${char.subclass.name})`
    : fmt(char.class);

{fmt(char.race)} · {displayClass}
```

## What Was Already Correct

These components already had the correct logic:
- ✓ `components/sections/character-detail-section.tsx` - Main character sheet
- ✓ `components/sections/character-view-modal.tsx` - Character modal/quick view
- ✓ `components/sections/levelup-modal.tsx` - Level-up flow (uses `char.level + 1` correctly)

## Subclass Levels Reference

From `lib/subclass-levels.ts`:

| Class     | Subclass Level |
|-----------|---------------|
| Cleric    | 1             |
| Sorcerer  | 1             |
| Warlock   | 1             |
| Druid     | 2             |
| Wizard    | 2             |
| Barbarian | 3             |
| Bard      | 3             |
| Fighter   | 3             |
| Monk      | 3             |
| Paladin   | 3             |
| Ranger    | 3             |
| Rogue     | 3             |

## Files Modified

1. **`components/character-creation/summary-step.tsx`**
   - Added import: `shouldDisplaySubclass`
   - Fixed: `displayClass` logic to check subclass level

2. **`components/sections/characters-section.tsx`**
   - Added import: `shouldDisplaySubclass`
   - Added: `subclass` field to `Character` type
   - Added: `displayClass` calculation in `CharacterCard`
   - Fixed: Display to use `displayClass` instead of `fmt(char.class)`

## Helper Function Logic

The `shouldDisplaySubclass` function from `lib/subclass-levels.ts`:

```typescript
export function shouldDisplaySubclass(
    characterClass: string,
    characterLevel: number,
    hasSubclass: boolean
): boolean {
    if (!hasSubclass) return false;
    const requiredLevel = SUBCLASS_LEVELS[characterClass.toLowerCase()] ?? 3;
    return characterLevel >= requiredLevel;
}
```

## Testing Examples

### Example 1: Cleric (Level 1 Subclass)
- **Level 1 Cleric with Life Domain**
  - Display: "Cleric (Life Domain)" ✓
- **Level 1 Cleric without subclass**
  - Display: "Cleric" ✓

### Example 2: Paladin (Level 3 Subclass)
- **Level 1 Paladin with Oath of the Ancients**
  - Display: "Paladin" ✓ (hasn't reached level 3 yet)
- **Level 2 Paladin with Oath of the Ancients**
  - Display: "Paladin" ✓ (hasn't reached level 3 yet)
- **Level 3 Paladin with Oath of the Ancients**
  - Display: "Paladin (Oath of the Ancients)" ✓ (reached subclass level)
- **Level 5 Paladin with Oath of the Ancients**
  - Display: "Paladin (Oath of the Ancients)" ✓

### Example 3: Warlock (Level 1 Subclass)
- **Level 1 Warlock with The Fiend**
  - Display: "Warlock (The Fiend)" ✓
- **Level 5 Warlock with The Fiend**
  - Display: "Warlock (The Fiend)" ✓

## Data Structure

The subclass is stored in the character record as:
```typescript
subclass?: {
    name: string;           // e.g., "Life Domain", "Oath of the Ancients"
    class: string;          // e.g., "cleric", "paladin"
    level_chosen: number;   // The level at which the subclass was chosen
} | null
```

## Build Status

✅ Compiled successfully
✅ No TypeScript errors
✅ All routes generated
✅ Production-ready

---

**Status: Complete** ✓

The subclass display logic now correctly shows or hides the subclass name based on whether the character has reached the required level for their class.
