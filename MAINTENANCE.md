# Maintenance Mode

## Quick Toggle

Your site is now **LOCKED DOWN** in maintenance mode.

### How to Control Maintenance Mode

**Option 1: Edit `middleware.ts` (Current Method - ACTIVE)**
```typescript
// Line 10 in middleware.ts
const MAINTENANCE_MODE = true;  // Site is LOCKED 🔒
const MAINTENANCE_MODE = false; // Site is LIVE ✅
```

**Option 2: Use Environment Variable (Alternative)**
If you prefer using env vars, update `middleware.ts` to read from `.env.local`:
```typescript
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';
```

Then set in `.env.local`:
```bash
MAINTENANCE_MODE=true   # LOCKED 🔒
MAINTENANCE_MODE=false  # LIVE ✅
```

## What's Locked

When `MAINTENANCE_MODE = true`:
- ✅ All pages redirect to `/maintenance`
- ✅ All routes blocked (dashboard, characters, create, etc.)
- ✅ Static assets still work (images, logo, etc.)
- ✅ API routes are blocked (change in middleware if you need them accessible)
- ✅ Simple "Under Construction" page with your logo

## What Users See

A clean page with:
- Your DND Guru logo
- "Under Construction" heading
- Brief message
- "We'll be back soon!" notice

## Files Created

1. **`middleware.ts`** - Controls the lockdown
2. **`app/maintenance/page.tsx`** - The construction page
3. **`MAINTENANCE.md`** - This documentation

## To Go Live Again

1. Open `middleware.ts`
2. Change line 10: `const MAINTENANCE_MODE = false;`
3. Save
4. Restart your dev server (Ctrl+C then `npm run dev`)
5. Site is live ✅

## Emergency Notes

- No user data is affected
- No database changes needed
- Instant on/off switch
- Safe for production

---

**Current Status:** 🔒 **LOCKED** (Maintenance Mode ON)
