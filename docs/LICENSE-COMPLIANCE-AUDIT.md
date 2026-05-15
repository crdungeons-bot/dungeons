# D&D Licensing Compliance Audit & Action Plan

**Date:** May 14, 2026  
**Status:** 🔴 URGENT - Non-Compliant Content Identified

## Executive Summary

We've built a comprehensive D&D character creator using content from various D&D sources. After auditing against the SRD 5.2 (the only content legally available under Creative Commons), we have **significant compliance issues** that must be addressed before launch.

## License Decision: Creative Commons Attribution 4.0

**We will use:** SRD 5.2 under Creative Commons Attribution 4.0 International License

**Why not OGL?**
- OGL 1.0a is for 3E/3.5E content
- Wizards attempted to revoke it in 2023 (legal controversy)
- SRD 5.2 uses CC BY 4.0 (cleaner, legally tested, current standard)

## Content Audit Results

### ✅ COMPLIANT CONTENT (In SRD 5.2)

#### Classes (12 total)
- Barbarian
- Bard
- Cleric
- Druid
- Fighter
- Monk
- Paladin
- Ranger
- Rogue
- Sorcerer
- Warlock
- Wizard

Each with ONE example subclass included in SRD.

#### Species/Races (9 total)
- Dragonborn
- Dwarf
- Elf
- Gnome
- Goliath
- Halfling
- Human
- Orc
- Tiefling

#### Backgrounds (ONLY 4!)
- Acolyte
- Criminal
- Sage
- Soldier

#### Spells
- All spells in SRD spell lists (need to verify each spell individually)

### ❌ NON-COMPLIANT CONTENT (Must Remove or Rewrite)

#### Classes
- **ARTIFICER** - Entire class is NOT in SRD
  - Source: Eberron: Rising from the Last War / Tasha's Cauldron of Everything
  - Status: Proprietary Wizards content
  - All subclasses: Alchemist, Armorer, Artillerist, Battle Smith
  - All Artificer-specific spells
  - Files affected:
    - `scripts/classes-data.ts` (Artificer entry)
    - `data/spell-slots.ts` (Artificer references)
    - Database: `dnd-resources.classes` collection
    - Database: `dnd-resources.spells-abilities` (Artificer spells)
    - Multiple docs in `docs/` folder

#### Backgrounds (12 of our 16)
- **2014 PHB backgrounds NOT in SRD:**
  - Charlatan
  - Entertainer
  - Folk Hero
  - Guild Artisan
  - Hermit
  - Noble
  - Outlander
  - Sailor
  - Urchin

- **2024 PHB backgrounds NOT in SRD:**
  - Artisan
  - Farmer
  - Guard
  - Guide
  - Merchant
  - Scribe
  - Wayfarer

- Files affected:
  - `scripts/backgrounds-data-2024.ts`
  - `scripts/backgrounds-data.ts`
  - Database: `dnd-resources.backgrounds` collection

#### Species/Races
- **NOT in SRD:**
  - Aarakocra (Elemental Evil Player's Companion)
  - Aasimar (Volo's Guide to Monsters)
  - Firbolg (Volo's Guide to Monsters)
  - Genasi (Elemental Evil Player's Companion)
  - Kenku (Volo's Guide to Monsters)
  - Tabaxi (Volo's Guide to Monsters)
  - Triton (Volo's Guide to Monsters)
  - **Warforged** (Eberron: Rising from the Last War)

- Files affected:
  - `scripts/races-data.ts`
  - Database: `dnd-resources.races` collection
  - `public/images/races/` (images for these races)

#### Subraces
- Need individual audit - some may be generic fantasy, others copied from supplements

#### Branding
- **"DND Guru"** brand name/domain
  - Risk: D&D/DND are registered trademarks
  - "Guru" doesn't save us if we're implying official D&D affiliation
  - Domain: dnd.guru or dndbeyond.com-like URLs create confusion

## Required Changes

### Priority 1: IMMEDIATE (Before Any Public Launch)

#### 1. Remove Non-SRD Content
- [ ] **Remove Artificer class entirely**
  - Delete from `scripts/classes-data.ts`
  - Remove from `data/spell-slots.ts`
  - Drop from `dnd-resources.classes` collection
  - Remove all Artificer spells from `dnd-resources.spells-abilities`
  - Delete Artificer docs in `docs/` folder

- [ ] **Reduce backgrounds to SRD-only (4 total)**
  - Keep: Acolyte, Criminal, Sage, Soldier
  - Remove all others from data files and database
  - Update `scripts/backgrounds-data-2024.ts` to only include SRD backgrounds

- [ ] **Remove supplemental races**
  - Keep only: Dragonborn, Dwarf, Elf, Gnome, Goliath, Halfling, Human, Orc, Tiefling
  - Remove: Aarakocra, Aasimar, Firbolg, Genasi, Kenku, Tabaxi, Triton, Warforged
  - Update `scripts/races-data.ts`
  - Clean up `public/images/races/`

#### 2. Add Required Attribution
- [ ] Create footer component with exact SRD attribution:
  ```
  This work includes material from the System Reference Document 5.2 ("SRD 5.2") 
  by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. 
  The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International 
  License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
  ```
- [ ] Add to every page footer
- [ ] Create "Legal" or "Licenses" page with full text
- [ ] Do NOT add other Wizards attribution beyond this

#### 3. Rebrand Away from "DND"
**Options:**
- "5E Character Forge"
- "Fantasy RPG Creator"
- "Fifth Edition Tools"
- "Adventure Builder (5E Compatible)"
- "[YourName]'s 5E Character Creator"

**Update:**
- [ ] Site name/logo
- [ ] Domain name (if possible)
- [ ] Page titles
- [ ] Meta descriptions
- [ ] Navigation components
- [ ] All marketing copy

**Safe to say:**
- ✅ "Compatible with Fifth Edition"
- ✅ "5E Compatible Tools"
- ✅ "Fantasy Tabletop RPG Character Creator"
- ❌ "D&D Character Creator"
- ❌ "Official D&D Tools"
- ❌ "DND Guru"

### Priority 2: Content Verification

#### 4. Spell Audit
- [ ] Compare every spell in `dnd-resources.spells-abilities` against SRD spell lists
- [ ] Remove any spells NOT in SRD
- [ ] Verify spell text is either:
  - Exact SRD text (preferred)
  - OR completely rewritten mechanics (risky)

#### 5. Subrace Audit
- [ ] Review each subrace description
- [ ] Ensure text is NOT copied from PHB/supplements
- [ ] Rewrite any non-SRD subrace descriptions in generic fantasy terms
- [ ] OR remove subraces and stick to base SRD species only

#### 6. Class Description Audit
- [ ] Review class descriptions for the 12 SRD classes
- [ ] Ensure we're using SRD text or original content
- [ ] Verify we're not copying PHB descriptions

### Priority 3: Ongoing Compliance

#### 7. Content Policy
- [ ] Document: "Only add content from SRD 5.2 or original creations"
- [ ] Create checklist for new content additions
- [ ] Maintain list of SRD-included content

#### 8. Fan Content Consideration
If site remains **free and non-commercial**, we MIGHT qualify for Wizards' Fan Content Policy
- Must be clearly fan-made
- No sales, subscriptions, premium features, or significant monetization
- Cannot include verbatim copying of non-SRD content
- More restrictive than SRD/CC route

#### 9. Future Expansion Options
If you want more content later:
- **Option A:** Create 100% original content (your own classes, backgrounds, species)
- **Option B:** License from Wizards (requires contacting them, likely expensive)
- **Option C:** Use third-party OGL/CC content from other creators
- **Option D:** Keep it SRD-only and focus on UX/tools as differentiator

## Legal Text Required on Site

### Attribution Footer (Every Page)
```html
<footer>
  <p>
    This work includes material from the System Reference Document 5.2 ("SRD 5.2") 
    by Wizards of the Coast LLC, available at 
    <a href="https://www.dndbeyond.com/srd">https://www.dndbeyond.com/srd</a>. 
    The SRD 5.2 is licensed under the Creative Commons Attribution 4.0 International 
    License, available at 
    <a href="https://creativecommons.org/licenses/by/4.0/legalcode">
      https://creativecommons.org/licenses/by/4.0/legalcode
    </a>.
  </p>
  <p>
    This site is compatible with Fifth Edition. 
    This site is not affiliated with, endorsed, sponsored, or specifically 
    approved by Wizards of the Coast LLC.
  </p>
</footer>
```

### About/Legal Page
Include:
- Full CC BY 4.0 license text (link to it)
- Statement: "This is an independent project, not official D&D content"
- List of SRD 5.2 content used
- Disclaimer: Not affiliated with Wizards of the Coast

## Risk Assessment

### Current Risk Level: 🔴 HIGH

**Why:**
1. Using "DND" in branding (trademark infringement risk)
2. Artificer class is definitely NOT SRD (copyright infringement)
3. 12+ non-SRD backgrounds (copyright infringement)
4. Multiple non-SRD races (copyright infringement)
5. No attribution statement anywhere on site

**Potential Consequences:**
- Cease & Desist letter from Wizards legal team
- DMCA takedown notices
- Domain seizure (if using DND in domain)
- Lawsuit (unlikely if you comply quickly, but possible)
- Forced rebranding and content removal

### After Compliance: 🟢 LOW

Once we:
1. Remove all non-SRD content
2. Add proper attribution
3. Rebrand away from "DND"
4. Make clear we're "5E Compatible" not "official"

Risk becomes minimal. You're using exactly what Wizards offers for free.

## Timeline Recommendation

**While in maintenance mode (NOW):**
- Complete all Priority 1 changes (1-2 days of work)
- Verify Priority 2 content audits (2-3 days)
- Update branding across site (1 day)

**Before public launch:**
- All non-SRD content removed
- Attribution in place
- New branding live
- Legal page created

**Post-launch:**
- Monitor for any missed non-SRD content
- Consider original content expansion

## References

- [SRD 5.2 PDF](https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.pdf)
- [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/legalcode)
- [Wizards Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy)
- [OGL Controversy 2023](https://www.wired.com/story/hasbro-dd-open-gaming-license-ogl/)

## Next Steps

1. Review this document with any legal counsel (if available)
2. Make Priority 1 decisions:
   - Agree to remove Artificer? (Recommend: YES)
   - Agree to reduce backgrounds to 4? (Recommend: YES)
   - Agree to new brand name? (Recommend: YES)
3. Begin implementation following checklist above
4. Test thoroughly before disabling maintenance mode

---

**Bottom Line:** You can absolutely continue this project legally. You just need to:
1. Use ONLY SRD content (or your own original content)
2. Add proper attribution
3. Don't use "D&D" or "DND" in branding
4. Be clear you're "5E Compatible" not "official"

This is still an amazing project - you'll just be working within the free, legal boundaries Wizards has provided.
