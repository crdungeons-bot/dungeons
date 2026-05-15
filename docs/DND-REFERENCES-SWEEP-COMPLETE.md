# Comprehensive SRD Compliance - DND References Sweep

## Summary

Completed a comprehensive sweep of the entire codebase for "DND" and "dnd" references. Updated all **user-facing** instances to "Tabletop Guru" or "5E-compatible" language to comply with SRD 5.2 licensing.

## ✅ UPDATED FILES (User-Facing & Critical)

### High Priority - User-Facing Content
1. **app/layout.tsx** - Site metadata title and description
2. **app/(marketing)/about/page.tsx** - All brand references + added SRD attribution
3. **app/maintenance/page.tsx** - All brand references
4. **components/navigation.tsx** - Logo alt text
5. **components/home/hero.tsx** - Logo alt text
6. **lib/email.ts** - ALL email templates (password reset, party invites)
   - Email headers: "DND Guru" → "Tabletop Guru"
   - Email footers: "Your D&D Character Manager" → "Your 5E Character Manager"
   - Default FROM_EMAIL: noreply@dndguru.com → noreply@tabletopguru.com
7. **public/site.webmanifest** - App name for PWA
8. **public/README.md** - Updated documentation with legacy filename notes

## ℹ️ INTENTIONALLY KEPT (Internal/Technical)

### Database Names
- `dnd-resources` - MongoDB database name (internal reference, doesn't need change)
- `dnd-non-srd-compliant` - Archive database (internal)

### File Paths (Not User-Visible)
- `/images/dnd-classes/` - Internal image directory path
- `/dnd-guru-logo-*.png` - Legacy logo filenames (changing would break existing references)
- `/dnd-guru-logo.svg` - Logo file (SVG wrapper, filename kept for stability)

### CSS/Code Internal Names
- `--radius-dnd` - CSS custom property (internal styling variable)
- `.card-dnd` - CSS class name (internal styling class)
- `types/dnd-class.ts` - File name describing D&D class types (accurate description)

### Documentation Files (Low Priority)
- `docs/*.md` - Technical documentation, historical context
- `non-compliant/docs/*.md` - Archived documentation
- `*.md` project files (PASSWORD_RESET_IMPLEMENTATION.md, SENDGRID_SETUP.md, etc.)

### Migration & Seed Scripts
- `scripts/*.ts` - Data migration and seeding scripts (internal tools)
- References to `dnd-resources` database in scripts

## 🔍 REMAINING "DND" REFERENCES (Acceptable)

The following files still contain "dnd" references but are **acceptable** because they are:
1. Internal technical references (database names, file paths)
2. Documentation/historical records
3. Code comments describing D&D mechanics accurately

### By Category:

**API Routes** (25+ files) - Reference `dnd-resources` database:
- `app/api/resources/*.ts`
- `app/api/characters/*.ts`
- `app/api/parties/*.ts`
- These are server-side and reference the accurate database name

**Components** (6 files) - Reference `/images/dnd-classes/` path and `dnd-resources` DB:
- `components/sections/*.tsx`
- `components/character-creation/*.tsx`

**Type Definitions** (3 files):
- `types/dnd-class.ts` - Accurate file name for D&D class types
- `types/subclass.ts` - References "dnd-resources"
- `types/index.ts` - May re-export dnd types

**Scripts** (10+ files) - Seed/migration scripts referencing database:
- `scripts/seed-resources.ts`
- `scripts/migrate-*.ts`
- `scripts/*-data.ts`

**Documentation** (20+ files):
- `docs/*.md` - Historical/technical docs
- `non-compliant/docs/*.md` - Archived docs
- Root `.md` files - Setup/implementation guides

**CSS** (1 file):
- `app/globals.css` - Internal CSS variables/classes (`--radius-dnd`, `.card-dnd`)

## ✨ RESULT

**All user-visible "DND Guru" references have been replaced with "Tabletop Guru".**

Users will see:
- ✅ "Tabletop Guru - Your 5E Character Manager" (site title)
- ✅ "Tabletop Guru" in emails
- ✅ "5E-compatible" and "Fifth Edition" language
- ✅ SRD 5.2 attribution on About page
- ✅ No trademark-infringing "D&D" or "DND" branding

Internal code retains accurate technical references to:
- Database names (`dnd-resources`)
- File paths (`/images/dnd-classes/`)
- Type definitions (`dnd-class.ts`)
- CSS internal naming

## 📋 RECOMMENDATION

**No further "DND" removals needed.** The remaining instances are:
1. Technically accurate (describing D&D game content)
2. Internal-only (not user-facing)
3. Historical documentation

The site is now **SRD 5.2 compliant** from a branding perspective.
