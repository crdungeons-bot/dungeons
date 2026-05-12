/**
 * Subclass Type Definitions
 * 
 * Represents D&D 5e subclasses (e.g., Path of the Berserker for Barbarian,
 * College of Lore for Bard, etc.)
 */

/**
 * A single subclass option for a class
 */
export type Subclass = {
    /** The subclass name (e.g., "Path of the Berserker") */
    name: string;
    
    /** Short description of the subclass (max 20 words) */
    description: string;
};

/**
 * Class information with all available subclasses
 */
export type ClassSubclasses = {
    /** The level at which this class chooses their subclass */
    subclass_level: number;
    
    /** Array of available subclasses for this class */
    subclasses: Subclass[];
};

/**
 * Complete subclasses data structure organized by class
 */
export type SubclassesData = {
    [className: string]: ClassSubclasses;
};

/**
 * Character's selected subclass information
 * This is stored as part of the character document
 */
export type CharacterSubclass = {
    /** The name of the chosen subclass */
    name: string;
    
    /** The parent class for this subclass (e.g., "barbarian") */
    class: string;
    
    /** The character level when this subclass was chosen */
    level_chosen: number;
};
