# Data Architecture Audit - Single Source of Truth

## Date: May 14, 2026

## ✅ VERIFIED: Database is the Single Source of Truth

The application correctly follows a database-first architecture. All data is sourced from MongoDB, with no direct repository file imports in the frontend or API layer (except for utility functions).

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    REPOSITORY DATA FILES                     │
│  (scripts/races-data.ts, classes-data.ts, spells.ts, etc.)  │
│                   ↓ ONLY USED BY ↓                          │
│              scripts/seed-resources.ts                       │
└─────────────────────────────────────────────────────────────┘
                            ↓ SEEDS
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                          │
│                  (dnd-resources.*)                          │
│    • races collection                                        │
│    • subraces collection                                     │
│    • classes collection                                      │
│    • subclasses collection                                   │
│    • spells-abilities collection                             │
│    • items collection                                        │
│    • feats collection                                        │
│    • backgrounds collection                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓ QUERIED BY
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES                              │
│   • /api/resources/races                                     │
│   • /api/resources/subraces                                  │
│   • /api/resources/classes                                   │
│   • /api/resources/subclasses                                │
│   • /api/resources/spells-abilities                          │
│   • /api/resources/items                                     │
│   • /api/resources/feats                                     │
│   • /api/resources/backgrounds                               │
└─────────────────────────────────────────────────────────────┘
                            ↓ CONSUMED BY
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND COMPONENTS                             │
│   • Character Creation                                       │
│   • Class/Race Selection                                     │
│   • Spell Lists                                              │
│   • Character Sheets                                         │
│   • Item Management                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Files Inventory

### 1. Repository Data Files (Used ONLY for Seeding)

| File | Purpose | Used By | ✅ Status |
|------|---------|---------|---------|
| `data/spells.ts` | Spell data + types | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/races-data.ts` | Race data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/subraces-data.ts` | Subrace data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/classes-data.ts` | Basic class data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/classes-complete-data.ts` | Complete class data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/subclasses-complete-data.ts` | Subclass data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/feats-data.ts` | Feat data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/items-data.ts` | Item data | `scripts/seed-resources.ts` | ✅ Correct |
| `scripts/backgrounds-data.ts` | Background data | `scripts/seed-resources.ts` | ✅ Correct |

### 2. Utility Code (Pure Functions - NOT Data)

| File | Purpose | Imported By | ✅ Status |
|------|---------|-------------|---------|
| `data/spell-slots.ts` | Calculate spell slots by class/level | API routes, components | ✅ Correct - Pure logic |
| `lib/subclass-levels.ts` | Subclass level mapping | Components | ✅ Correct - Configuration |

### 3. TypeScript Types (Type Definitions Only)

| Type | File | Used For | ✅ Status |
|------|------|----------|---------|
| `SpellEntry` | `data/spells.ts` | TypeScript typing | ✅ Correct |
| `SpellSlots`, `PactMagicSlots` | `data/spell-slots.ts` | TypeScript typing | ✅ Correct |
| `ClassComplete` | `types/dnd-class.ts` | TypeScript typing | ✅ Correct |

---

## Import Analysis

### ✅ GOOD: No Direct Data Imports in Application Code

**Frontend Components** (`components/`, `app/`)
- ✅ Zero imports from `scripts/*-data.ts` files
- ✅ Only imports utility functions and types from `data/`
- ✅ All data fetched via `fetch('/api/resources/*')`

**API Routes** (`app/api/`)
- ✅ Zero imports from `scripts/*-data.ts` files
- ✅ Only imports from `lib/mongo` for database access
- ✅ Utility imports from `data/spell-slots` for calculations

**Seed Scripts** (`scripts/seed-resources.ts`)
- ✅ ONLY place that imports data files
- ✅ Transforms and inserts into MongoDB
- ✅ One-time operation when data changes

---

## Exception: Utility Code (Justified)

### `data/spell-slots.ts` - Pure Functions ✅

**Purpose**: Calculate spell slot progression based on class and level
**Why It's OK**:
- Contains pure game logic (D&D 5e spell slot rules)
- No actual data, just algorithms
- Would be wasteful to store calculated values in DB
- Stateless, deterministic functions

**Functions**:
- `getSpellSlots(class, level)` - Returns spell slots for a given class/level
- `isSpellcaster(class)` - Checks if class has spellcasting
- `usesPactMagic(class)` - Checks if class uses warlock pact magic
- `getSpellcastingAbility(class)` - Returns primary spellcasting stat

**Used By**:
- `app/api/characters/route.ts` - Calculate slots when creating characters
- `app/api/characters/[id]/route.ts` - Calculate slots when fetching characters
- `components/sections/character-detail-section.tsx` - Display spell slots
- `components/sections/character-view-modal.tsx` - Display spell slots
- `components/ui/spellcasting-stats.tsx` - Render spellcasting UI

### `lib/subclass-levels.ts` - Configuration ✅

**Purpose**: Define at which level each class gains its subclass
**Why It's OK**:
- Small configuration map (not dynamic data)
- Game rule that rarely changes
- Used for UI logic (when to show subclass)
- Could be in DB but would be overkill for 13 values

---

## API Endpoints (All Query MongoDB)

### Resources API
- `GET /api/resources/races` → `dnd-resources.races`
- `GET /api/resources/subraces` → `dnd-resources.subraces`
- `GET /api/resources/classes` → `dnd-resources.classes`
- `GET /api/resources/subclasses` → `dnd-resources.subclasses`
- `GET /api/resources/spells-abilities` → `dnd-resources.spells-abilities`
- `GET /api/resources/items` → `dnd-resources.items`
- `GET /api/resources/feats` → `dnd-resources.feats`
- `GET /api/resources/backgrounds` → `dnd-resources.backgrounds`

### Character API
- `GET /api/characters?userId={id}` → `dnd-app.characters`
- `POST /api/characters` → `dnd-app.characters`
- `GET /api/characters/[id]` → `dnd-app.characters`
- `PATCH /api/characters/[id]` → `dnd-app.characters`
- `DELETE /api/characters/[id]` → `dnd-app.characters`

---

## Frontend Data Fetching Examples

### ✅ CORRECT: Character Creation

```typescript
// app/(app)/create-character/page.tsx
const client = await clientPromise;
const db = client.db('dnd-resources');

// Fetches from MongoDB, not from data files
const races = await db.collection('races').find().toArray();
const classes = await db.collection('classes').find().toArray();
```

### ✅ CORRECT: Race Selection Component

```typescript
// components/character-creation/race-select-step.tsx
const response = await fetch(`/api/resources/races?index=${selectedRace}`);
const data = await response.json();
const raceData = data.results[0];
```

### ✅ CORRECT: Spell/Ability Fetching

```typescript
// components/sections/character-detail-section.tsx
const response = await fetch(`/api/resources/spells-abilities?classes=${char.class}`);
const spellsData = await response.json();
```

---

## Seeding Process

### When to Reseed
- After modifying any `scripts/*-data.ts` file
- After modifying `data/spells.ts`
- When adding new races, classes, items, etc.

### How to Reseed
```bash
npm run seed:spells
```

This command:
1. Reads all data files from `scripts/` and `data/`
2. Drops existing collections (if any)
3. Inserts fresh data into MongoDB
4. Creates indexes for performance
5. Logs results

---

## Recently Added: Artificer Class

### Files Modified
- ✅ `scripts/classes-data.ts` - Added Artificer entry (May 14, 2026)
- ✅ `scripts/classes-complete-data.ts` - Already had Artificer
- ✅ `public/images/dnd-classes/artificer.png` - Image exists

### Next Steps
1. ⏳ Run `npm run seed:spells` to populate Artificer in database
2. ⏳ Verify Artificer appears in character creation
3. ⏳ Test Artificer spell slots calculation
4. ⏳ Verify all 4 Artificer subclasses work

---

## Summary: Architecture is Sound ✅

### What's Correct
1. ✅ Database is the single source of truth
2. ✅ No data files imported directly in frontend/API
3. ✅ All data flows through MongoDB
4. ✅ Utility functions properly separated
5. ✅ Seeding script is the only consumer of data files
6. ✅ API routes properly query MongoDB
7. ✅ Frontend components fetch via API

### What Makes Sense to Keep as Code
1. ✅ `data/spell-slots.ts` - Pure calculation functions
2. ✅ `lib/subclass-levels.ts` - Small configuration map
3. ✅ Type definitions - TypeScript types

### Data Files Role
- **Purpose**: Version-controlled source data
- **Used Once**: During database seeding
- **Benefit**: Easy to update, review changes via git
- **Result**: Populates MongoDB for production use

---

## Conclusion

**The architecture is correct.** The database is the single source of truth, with data files serving only as the initial source for seeding. All application code (frontend and API) queries MongoDB, not data files.

The only exceptions are utility functions (`spell-slots.ts`) and small configuration maps (`subclass-levels.ts`), which contain logic/rules rather than data. These are appropriate to keep as code.

✅ **No changes needed to data architecture.**
