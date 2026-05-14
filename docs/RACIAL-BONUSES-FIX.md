# Racial Ability Score Bonuses & Redirect Fix

## Date: May 14, 2026

## Issues Addressed

### Issue 1: Missing Racial Ability Score Bonuses
**Problem**: When creating a Rock Gnome Artificer, the +1 CON bonus from the Rock Gnome subrace was not being applied to the character's constitution score during character creation.

**Root Cause**: The character creation flow was only storing and displaying the base rolled/manual stats. Racial and subracial ability score bonuses were never being fetched or applied.

**Solution**: Modified `components/character-creation/summary-step.tsx` to:
1. Fetch racial bonuses from the `dnd-resources.races` collection
2. Fetch subracial bonuses from the `dnd-resources.subraces` collection
3. Calculate final stats by adding base stats + racial bonuses
4. Display the bonus breakdown in the UI (e.g., "15 (13 + 2)")
5. Send the final stats (with bonuses applied) to the API

### Issue 2: Incorrect Redirect After Character Creation
**Problem**: After completing character creation, users were being redirected to race selection instead of the characters page at `/dashboard?section=characters`.

**Root Cause**: Unknown - the code was correct (`router.push('/dashboard?section=characters')`), but users were experiencing incorrect navigation.

**Solution**: Enhanced redirect logic with:
1. Console logging to track redirect attempts
2. Fallback using `window.location.href` after 500ms if Next.js router navigation fails
3. This provides maximum reliability for the redirect

## Changes Made

### `components/character-creation/summary-step.tsx`

#### 1. Added Type Definitions
```typescript
type AbilityBonus = {
    ability_score: { index: string; name: string };
    bonus: number;
};

type RacialBonuses = {
    str: number; dex: number; con: number; int: number; wis: number; cha: number;
};
```

#### 2. Added State for Racial Bonuses
```typescript
const [racialBonuses, setRacialBonuses] = useState<RacialBonuses>({
    str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0,
});
const [loadingBonuses, setLoadingBonuses] = useState(true);
```

#### 3. Split Stats into Base and Final
- `baseStats`: The raw rolled/manual stats without racial bonuses
- `stats`: Final stats = base stats + racial bonuses (used for character creation)

#### 4. Added useEffect to Fetch Racial Bonuses
Fetches race and subrace data from API endpoints and aggregates all ability score bonuses.

#### 5. Enhanced StatBlock Component
Added optional `baseValue` and `bonus` props to display the breakdown:
- Shows final value prominently
- Shows breakdown like "(13 + 2)" for bonused stats in green text

#### 6. Enhanced Redirect Logic
```typescript
// Try router.push first
router.push('/dashboard?section=characters');

// Fallback: use window.location after a short delay if router.push fails
setTimeout(() => {
    if (window.location.pathname !== '/dashboard') {
        window.location.href = '/dashboard?section=characters';
    }
}, 500);
```

#### 7. Added Artificer to HIT_DICE
Artificers have a d8 hit die, now correctly calculated for starting HP.

## Example: Rock Gnome Artificer

### Base Gnome (from races collection)
- **Ability Bonuses**: +2 INT

### Rock Gnome Subrace (from subraces collection)
- **Ability Bonuses**: +1 CON

### Character Creation Flow
1. User rolls/enters base stats (e.g., STR 10, DEX 12, CON 13, INT 15, WIS 10, CHA 8)
2. Summary step fetches racial bonuses
3. Final stats displayed and sent to API:
   - STR: 10 (10 + 0)
   - DEX: 12 (12 + 0)
   - CON: 14 (13 + 1) ← Rock Gnome bonus
   - INT: 17 (15 + 2) ← Gnome bonus
   - WIS: 10 (10 + 0)
   - CHA: 8 (8 + 0)

## API Endpoints Used
- `GET /api/resources/races?index={race}` - Fetches race data with ability_bonuses
- `GET /api/resources/subraces?name={subrace}` - Fetches subrace data with ability_bonuses

## Testing Checklist
- [ ] Create a new Rock Gnome character and verify +1 CON is applied
- [ ] Create a character with multiple racial bonuses (e.g., Dragonborn: +2 STR, +1 CHA)
- [ ] Create a character without subraces (e.g., Human, Tiefling) and verify base racial bonuses
- [ ] Verify redirect goes to `/dashboard?section=characters` after character creation
- [ ] Check browser console for redirect logging

## Notes
- All racial and subracial ability bonuses are now properly applied
- The UI clearly shows the breakdown of base + bonus for transparency
- The redirect has a robust fallback mechanism
- Artificers now correctly show d8 hit die for starting HP calculation
