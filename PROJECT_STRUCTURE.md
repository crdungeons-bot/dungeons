# Project Structure - D&D Next.js App

## ✅ Updated File Structure

```
my-next-practice/
├── app/
│   ├── (game)/                    # Route group for game-related pages
│   │   └── races/
│   │       ├── page.tsx           → /races (list all races)
│   │       └── [race]/
│   │           └── page.tsx       → /races/dwarf (specific race)
│   │
│   ├── (marketing)/               # Route group for info pages
│   │   └── about/
│   │       └── page.tsx           → /about
│   │
│   ├── api/
│   │   └── auth/                  # Auth endpoints grouped
│   │       ├── login/
│   │       │   └── route.ts       → POST /api/auth/login
│   │       └── register/
│   │           └── route.ts       → POST /api/auth/register
│   │
│   ├── layout.tsx                 # Root layout (wraps all pages)
│   ├── page.tsx                   # Homepage → /
│   ├── globals.css                # Global styles
│   └── favicon.ico
│
├── components/                    # All reusable components
│   ├── card.tsx                   # Generic Card component
│   ├── counter.tsx                # Counter with state example
│   ├── greeting-input.tsx         # Input example component
│   ├── navigation.tsx             # Main navigation
│   └── index.tsx                  # Barrel export (exports all components)
│
├── lib/                           # Utilities and helpers
│   └── mongo.ts                   # MongoDB connection utility
│
├── types/                         # TypeScript type definitions
│   ├── race.ts                    # D&D race types
│   ├── user.ts                    # User/auth types
│   └── index.ts                   # Export all types
│
├── public/                        # Static assets
│   ├── images/
│   └── icons/
│
├── .env.local                     # Environment variables (secrets)
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── next.config.ts                 # Next.js config
```

---

## 🎯 Key Improvements Made

### 1. **Route Groups**
- `(game)/` - Game content (races, classes, spells)
- `(marketing)/` - Info pages (about, help)
- Parentheses don't appear in URLs!

### 2. **Consistent Imports**
All files now use `@/` alias instead of relative paths:

```typescript
// ✅ Good (updated)
import { Navigation } from '@/components';
import { Race } from '@/types';

// ❌ Bad (old way)
import { Navigation } from '../../../components';
```

### 3. **Centralized Types**
All TypeScript types in one place:

```typescript
// Import from types folder
import { Race, RaceDetail, User } from '@/types';
```

### 4. **Fixed API Routes**
- Login now correctly validates password with bcrypt
- Both routes use consistent database name ('dnd-app')
- Proper error handling

### 5. **Correct Folder Naming**
- `races/[race]` (not `race/[races]`)
- URL: `/races/dwarf` ✅
- Param name matches folder name

---

## 📁 Import Patterns

### Components
```typescript
import { Navigation, Card, Counter } from '@/components';
```

### Types
```typescript
import { Race, RaceDetail, User } from '@/types';
```

### Lib/Utils
```typescript
import clientPromise from '@/lib/mongo';
```

---

## 🔄 What Changed

### Before:
```
app/
  components/          ❌ Components in wrong place
  race/                ❌ Wrong naming
    [races]/           ❌ Wrong param name
  about/
```

### After:
```
components/            ✅ Components at root
app/
  (game)/              ✅ Route groups
    races/             ✅ Correct naming
      [race]/          ✅ Correct param name
  (marketing)/
    about/
```

---

## 🚀 Next Steps for Scaling

### When to add more structure:

**Add feature folders when you have:**
- Multiple components per feature
- Feature-specific hooks
- Feature-specific utils

Example:
```
features/
  races/
    components/
      RaceCard.tsx
      RaceTable.tsx
    hooks/
      useRaces.ts
    utils/
      raceHelpers.ts
```

---

## ✅ Testing Checklist

- [x] Routes work correctly (`/races`, `/races/dwarf`, `/about`)
- [x] All imports use `@/` alias
- [x] Types are centralized
- [x] API routes work with MongoDB
- [x] No relative import paths
- [x] Components properly organized

---

## 📝 Notes

- The `@/` alias is configured in `tsconfig.json`
- Route groups `(name)` don't affect URLs
- Always use centralized types from `types/` folder
- Keep components at root level, not in `app/`
