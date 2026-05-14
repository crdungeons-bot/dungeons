# Race Images Status

## Date: May 14, 2026

## Summary
All race images are correctly located and referenced in the system.

## Image Location
All race images are stored in: `public/images/races/`

## Status: ✅ ALL RACES HAVE IMAGES

### Complete Race List (18 races)

| Race | Image File | Status |
|------|------------|--------|
| Aarakocra | `aarakocra.png` | ✅ Correct location |
| Aasimar | `aasimar.png` | ✅ |
| Dragonborn | `dragonborn.png` | ✅ |
| Dwarf | `dwarf.png` | ✅ |
| Elf | `elf.png` | ✅ |
| Firbolg | `firbolg.png` | ✅ |
| Genasi | `genasi.png` | ✅ |
| Gnome | `gnome.png` | ✅ |
| Goliath | `goliath.png` | ✅ |
| Half-Elf | `half-elf.png` | ✅ |
| Half-Orc | `half-orc.png` | ✅ |
| Halfling | `halfling.png` | ✅ |
| Human | `human.png` | ✅ |
| Kenku | `kenku.png` | ✅ |
| Tabaxi | `tabaxi.png` | ✅ |
| Tiefling | `tiefling.png` | ✅ |
| Triton | `triton.png` | ✅ |
| Warforged | `warforged.png` | ✅ |

## Image References in Code

Race images are referenced throughout the application using the pattern:
```typescript
/images/races/${race.index}.png
```

### Files Using Race Images:

1. **Character Creation**
   - `components/character-creation/race-select-step.tsx`
   - `components/character-creation/summary-step.tsx`

2. **Character Display**
   - `components/sections/character-detail-section.tsx`
   - `components/sections/characters-section.tsx`
   - `components/sections/character-view-modal.tsx`

3. **Race Information**
   - `components/sections/races-section.tsx`
   - `components/sections/race-detail-section.tsx`
   - `app/(game)/races/page.tsx`

4. **Party Management**
   - `components/sections/parties-section.tsx`
   - `components/sections/party-detail-section.tsx`

5. **Dashboard**
   - `components/sections/dashboard-home-section.tsx`

## Aarakocra Verification

✅ **Aarakocra image is in the correct location**
- Located at: `public/images/races/aarakocra.png`
- NOT in `public/images/dnd-classes/` (no duplicate found)
- All code references use `/images/races/aarakocra.png`

## How Images Are Used

### 1. Race Selection Cards
```tsx
<Image
  src={`/images/races/${race.index}.png`}
  alt={race.name}
  fill
  style={{ objectFit: 'cover' }}
/>
```

### 2. Character Backgrounds
```tsx
background: `url(/images/races/${char.race}.png) center / cover no-repeat`
```

### 3. Race Detail Hero Images
```tsx
background: `url(/images/races/${race}.png) top / cover no-repeat`
```

## Notes

- All race images follow the naming convention: `{race-index}.png`
- Images are automatically loaded based on the race's `index` field from the database
- No manual mapping or configuration required
- The system gracefully handles missing images with fallback backgrounds

## Testing

To verify a race image is working:
1. Navigate to `/races` to see the races grid
2. Click on a race to view its detail page
3. Start creating a character and select the race
4. The image should appear in all locations

## Future Additions

When adding new races:
1. Add the race data to `scripts/races-data.ts`
2. Add the corresponding image to `public/images/races/{race-index}.png`
3. Run the seeding script to update the database
4. The image will automatically be used throughout the app
