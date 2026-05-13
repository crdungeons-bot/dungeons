# Action Type Standardization Fix

## Issue

The spell/ability data had inconsistent naming conventions for the "Bonus Action" action type:
- `"bonusAction"` (camelCase) - 29 occurrences
- `"bonus action"` (lowercase) - 7 occurrences
- `"Bonus Action"` (correct) - 30 occurrences

This inconsistency caused filtering and display issues in the Spells section.

## Solution

Standardized all variants to: **`"Bonus Action"`** (title case with space)

## Changes Made

### 1. Source Data File (`data/spells.ts`)
- Fixed 29 occurrences: `"bonusAction"` → `"Bonus Action"`
- Fixed 7 occurrences: `"bonus action"` → `"Bonus Action"`
- **Total: 36 entries corrected**

### 2. Database Fix Script (`scripts/fix-action-types.ts`)
Created comprehensive migration script that:
- Checks for all variants: `bonusAction`, `BonusAction`, `bonus action`
- Updates all inconsistent entries to `Bonus Action`
- Provides detailed before/after reporting
- Lists all unique action types in the database

### 3. Database Updates
**First Run:**
- Fixed 29 documents: `bonusAction` → `Bonus Action`

**Second Run:**
- Fixed 7 documents: `bonus action` → `Bonus Action`

**Total: 36 database entries standardized**

## Current State

### All Action Types in Database (Standardized):
- ✅ `"Bonus Action"` (36 entries)
- ✅ `"action"` (majority of spells)
- ✅ `"reaction"`
- ✅ `"free"`
- ✅ `"passive"`
- ✅ `"special"`

### Inconsistencies Removed:
- ❌ `"bonusAction"` (removed)
- ❌ `"BonusAction"` (removed)
- ❌ `"bonus action"` (removed)

## Verification

### Script Output:
```
📊 Checking current state...
   - 'bonusAction' (camelCase): 0
   - 'BonusAction' (PascalCase): 0
   - 'bonus action' (lowercase): 0
   - 'Bonus Action' (correct): 36

✅ All action types have been standardized to "Bonus Action"!

📋 All unique action types in database:
   - "Bonus Action"
   - "action"
   - "free"
   - "passive"
   - "reaction"
   - "special"
```

### Build Status:
✅ Compiled successfully
✅ No TypeScript errors
✅ All routes generated

## Files Modified

1. **`data/spells.ts`**
   - 36 entries updated to use `"Bonus Action"`

2. **`scripts/fix-action-types.ts`** (new file)
   - Migration script to fix database inconsistencies
   - Can be run multiple times safely
   - Provides detailed reporting

## Impact

### User-Facing:
- ✅ Consistent filtering in Spells section
- ✅ Correct display of action types
- ✅ Improved search/filter functionality

### Developer:
- ✅ Cleaner, more maintainable data
- ✅ Prevents future confusion
- ✅ Single source of truth for action types

## Best Practices Established

Going forward, all action types should use:
- **Title Case**: First letter of each word capitalized
- **Spaces**: Use spaces, not camelCase
- **Consistent naming**: Match exactly across all data sources

### Standard Action Types:
```typescript
"Bonus Action"  // ✅ Correct
"Action"        // ✅ Correct (if needed for clarity)
"Reaction"      // ✅ Correct
"Free"          // ✅ Correct
"Passive"       // ✅ Correct
"Special"       // ✅ Correct
```

### Never Use:
```typescript
"bonusAction"   // ❌ Wrong (camelCase)
"BonusAction"   // ❌ Wrong (PascalCase)
"bonus action"  // ❌ Wrong (lowercase)
```

## Future Maintenance

To check for inconsistencies in the future:
```bash
npx tsx scripts/fix-action-types.ts
```

The script will:
1. Check current state
2. Fix any inconsistencies found
3. Report results
4. List all unique action types

## Status

✅ **Complete**
- Source data corrected
- Database updated
- Build verified
- Script created for future use
- Documentation complete

---

**All action types are now standardized to "Bonus Action"** across both the source data and MongoDB database.
