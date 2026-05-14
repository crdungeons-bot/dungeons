# D&D 5e Backgrounds Audit

## Date: May 14, 2026

## ✅ COMPLETE - No Missing Backgrounds!

### Official D&D 5e Backgrounds (2014 Player's Handbook)

The original Player's Handbook contains **13 official backgrounds**:

1. ✅ Acolyte
2. ✅ Charlatan
3. ✅ Criminal
4. ✅ Entertainer
5. ✅ Folk Hero
6. ✅ Guild Artisan
7. ✅ Hermit
8. ✅ Noble
9. ✅ Outlander
10. ✅ Sage
11. ✅ Sailor
12. ✅ Soldier
13. ✅ Urchin

---

## Current Data Files Status

### `scripts/backgrounds-data.ts` (340 lines)
**Status**: Contains all 13/13 backgrounds ✅

**Present Backgrounds**:
- ✅ Acolyte
- ✅ Charlatan
- ✅ Criminal
- ✅ Entertainer
- ✅ Folk Hero
- ✅ Guild Artisan
- ✅ Hermit
- ✅ Noble
- ✅ Outlander
- ✅ Sage
- ✅ Sailor
- ✅ Soldier
- ✅ Urchin

### Database
According to the last seed log:
```
✓  Inserted 13 backgrounds
```

**Status**: ✅ All 13 backgrounds are in the database

---

## Note: 2024 Player's Handbook Changes

The 2024 Player's Handbook (D&D 5.5e) expanded to **16 backgrounds** with different mechanics:

### 2024 PHB Backgrounds (16 total)
1. Acolyte ✅ (we have)
2. Artisan (renamed from Guild Artisan)
3. Charlatan ✅ (we have)
4. Criminal ✅ (we have)
5. Entertainer ✅ (we have)
6. Farmer (NEW)
7. Guard (NEW)
8. Guide (NEW)
9. Hermit ✅ (we have)
10. Merchant (NEW)
11. Noble ✅ (we have)
12. Sage ✅ (we have)
13. Sailor ✅ (we have)
14. Scribe (NEW)
15. Soldier ✅ (we have)
16. Wayfarer (replaces Urchin)

### Key Changes in 2024
- **Added**: Farmer, Guard, Guide, Merchant, Scribe, Wayfarer (6 new)
- **Removed**: Outlander, Folk Hero, Urchin (3 removed)
- **Renamed**: Guild Artisan → Artisan
- **Mechanics**: Now include ability score increases and Origin feats

---

## Recommendation

### For 2014 Rules (Current System)
✅ **No action needed!** You have all 13 official backgrounds from the 2014 Player's Handbook.

### If You Want 2024 Content
You could optionally add the 6 new backgrounds:
1. Farmer
2. Guard
3. Guide
4. Merchant
5. Scribe
6. Wayfarer

However, these use different mechanics (ability score increases, Origin feats) that aren't in the 2014 rules.

---

## What Each Background Provides (2014 Rules)

Each background includes:
- **Skill Proficiencies**: 2 skills
- **Tool Proficiencies**: Varies by background
- **Languages**: Some backgrounds grant languages
- **Starting Equipment**: Background-specific items + gold
- **Feature**: Unique ability (e.g., "Shelter of the Faithful" for Acolyte)

---

## Comparison with Your Data

### Background Format
Your `scripts/backgrounds-data.ts` correctly includes:
```typescript
{
    index: string;              // ✅
    name: string;               // ✅
    starting_proficiencies: []; // ✅
    feature: { name, desc };    // ✅
    starting_equipment: [];     // ✅
    personality_traits: {};     // ✅
}
```

---

## Summary

### Current Status
- **2014 PHB Backgrounds**: 13/13 ✅ Complete
- **Database**: 13 backgrounds seeded ✅
- **Missing**: None ❌

### Your System is Based On
- 2014 Player's Handbook rules
- Classic 5e mechanics (pre-2024 update)
- All original 13 backgrounds present

### Conclusion
**You have all the official backgrounds for 2014 D&D 5e!** 🎉

No backgrounds are missing. Your system is complete for the classic 5e ruleset.

---

## Optional: Adding 2024 Backgrounds

If you want to add the 6 new 2024 backgrounds (Farmer, Guard, Guide, Merchant, Scribe, Wayfarer), be aware that:

1. They were designed for 2024 rules (with Origin feats)
2. You'd need to adapt them to 2014 mechanics
3. They might not be balanced for your current system
4. Most players expect the classic 13 backgrounds

**Recommendation**: Stick with the 13 you have unless specifically requested by users.

---

## Testing Checklist

To verify backgrounds work correctly:
- [ ] All 13 backgrounds appear in character creation
- [ ] Each background provides correct skill proficiencies
- [ ] Starting equipment is granted properly
- [ ] Background features are applied
- [ ] Gold amounts are correct

---

## Files

| File | Status |
|------|--------|
| `scripts/backgrounds-data.ts` | ✅ All 13 backgrounds |
| `data/backgrounds.ts` | ✅ Duplicate (same data) |
| Database: `dnd-resources.backgrounds` | ✅ 13 backgrounds seeded |

---

## Additional Backgrounds (Beyond PHB)

Various D&D supplements added more backgrounds:
- **Sword Coast Adventurer's Guide**: City Watch, Clan Crafter, Cloistered Scholar, Courtier, Faction Agent, Far Traveler, Inheritor, Knight of the Order, Mercenary Veteran, Urban Bounty Hunter, Uthgardt Tribe Member, Waterdhavian Noble
- **Acquisitions Incorporated**: Celebrity Adventurer's Scion, Failed Merchant, Gambler, Plaintiff, Rival Intern
- **Curse of Strahd**: Haunted One
- **Others**: Many more in various adventures and settings

**Note**: These are typically setting-specific and not part of the core rules. They can be added if needed but aren't necessary for a complete 5e system.
