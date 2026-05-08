# Inventory System - ID-Based Item References

## Overview

The inventory system now uses **ID-based references** to the items database. Instead of storing complete item data in each character document, we store only item IDs and character-specific metadata (quantity, equipped status, etc.). Full item details are fetched from the `dnd-resources.items` collection when needed.

## Architecture

### 1. Character Schema
```typescript
{
  inventory: [
    {
      itemId: string,        // Name of item in items collection (e.g., "Longsword")
      quantity: number,      // How many the character has
      equipped?: boolean,    // Is it currently equipped?
      attuned?: boolean,     // Is it attuned (for magic items)?
      source?: string        // Where it came from (background, purchased, loot, etc.)
    }
  ]
}
```

### 2. API Endpoints

**`GET /api/characters/[id]/inventory`**
- Fetches character's inventory references
- Enriches them with full item details from `dnd-resources.items`
- Returns merged data with both character-specific fields and database item details

**`PUT /api/characters/[id]/inventory`**
- Updates entire inventory array (for bulk operations)

**`POST /api/characters/[id]/inventory`**
- Adds a single item to inventory
- Auto-increments quantity if item already exists

### 3. Components

**`ItemTooltip` (`components/ui/item-tooltip.tsx`)**
- Reusable hover tooltip for displaying full item details
- Shows stats (damage, AC, weight, value), properties, special attributes
- Color-coded by rarity

**`useCharacterInventory` hook (`hooks/use-character-inventory.ts`)**
- Fetches and manages enriched inventory data
- Provides loading and error states
- Includes `refetch()` method for refreshing data

### 4. Display Components

**Character Detail Section** (`components/sections/character-detail-section.tsx`)
- Updated `ItemRow` to support both enriched and fallback items
- Wraps item names in `<ItemTooltip>` for enriched items
- Shows background starting equipment as fallback when inventory is empty

**Character View Modal** (`components/sections/character-view-modal.tsx`)
- (TODO: Update to use new inventory system)

## Benefits

1. **Single Source of Truth**: Item stats come from the centralized database
2. **Easy Updates**: Fix a typo in an item? All characters automatically see the fix
3. **Smaller Documents**: Character documents only store IDs, not full item data
4. **Consistent Data**: No drift between characters' copies of the same item
5. **Rich Tooltips**: Hover any item to see full details without expanding

## Usage Example

### Adding an item to a character:
```typescript
await fetch(`/api/characters/${characterId}/inventory`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    itemId: 'Longsword',
    quantity: 1,
    equipped: true,
    source: 'purchased'
  })
});
```

### Displaying inventory with tooltips:
```tsx
import { useCharacterInventory } from '@/hooks/use-character-inventory';
import ItemTooltip from '@/components/ui/item-tooltip';

function MyComponent({ characterId }) {
  const { data, loading } = useCharacterInventory(characterId);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.inventory.map(item => (
        <ItemTooltip key={item.itemId} item={item}>
          <span>{item.name} x{item.quantity}</span>
        </ItemTooltip>
      ))}
    </div>
  );
}
```

## Next Steps

1. ✅ Create inventory API endpoints
2. ✅ Create ItemTooltip component
3. ✅ Create useCharacterInventory hook
4. ✅ Update character-detail-section to use new system
5. ✅ Update character creation to save starting equipment as inventory
6. ✅ Separate starting gold from items (goes to currency)
7. ✅ Create Add Item modal with search & custom item creation
8. TODO: Update character-view-modal to use new system (partially done)
9. TODO: Add ability to remove/edit items
10. TODO: Create migration script to populate existing characters' inventories

## Adding Items

Users can add items to their inventory from the Gear tab:

### Search for Items
1. Click "+ Add Item" button
2. Search for items by name or description
3. Results show up to 20 matches from the items database
4. Click "+ Add" to add the item to inventory

### Create Custom Items
For homebrew or unique items:
1. Click "+ Add Item" button
2. Search for an item - if not found, click "Create Custom Item"
3. Or click "Create Custom Item" from the initial modal
4. Fill in:
   - **Name** (required)
   - **Category** (weapon, armor, tool, misc, etc.)
   - **Description** (optional)
   - **Quantity** (default 1)
5. Click "Add to Inventory"

Custom items are stored by name and won't be enriched from database (they'll show basic info only).

## Starting Equipment

When a character is created:
- **Items** from background starting equipment are automatically saved to the `inventory` array
- **Gold** (or other currency) is automatically added to the `currency` object
- Items are referenced by name (e.g., "Holy Symbol", "Crowbar")
- All items with `source: 'background'` appear with a "BG" badge

### Background Equipment Example:
```javascript
// Acolyte background starting_equipment:
[
  { equipment: { name: 'Holy Symbol' }, quantity: 1 },
  { equipment: { name: 'Prayer Book' }, quantity: 1 },
  { equipment: { name: 'Gold Pieces' }, quantity: 15 }  // → Goes to currency.gp
]

// Character document after creation:
{
  inventory: [
    { itemId: 'Holy Symbol', quantity: 1, equipped: false, attuned: false, source: 'background' },
    { itemId: 'Prayer Book', quantity: 1, equipped: false, attuned: false, source: 'background' }
  ],
  currency: { pp: 0, gp: 15, sp: 0, cp: 0 }
}
```

## Database Setup

Make sure to seed the items collection:
```bash
npm run seed:spells
```

This populates `dnd-resources.items` with all weapons, armor, gear, tools, and magic items.
