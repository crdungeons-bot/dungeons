// D&D Class Types

export type DndClass = {
    index: string;
    name: string;
    url: string;
};

export type Proficiency = {
    index: string;
    name: string;
};

export type ProficiencyChoice = {
    desc: string;
    choose: number;
    from: {
        options: {
            item: Proficiency;
        }[];
    };
};

export type SavingThrow = {
    index: string;
    name: string;
};

export type StartingEquipment = {
    equipment: {
        index: string;
        name: string;
    };
    quantity: number;
};

export type ClassDetail = {
    index: string;
    name: string;
    hit_die: number;
    proficiency_choices: ProficiencyChoice[];
    proficiencies: Proficiency[];
    saving_throws: SavingThrow[];
    starting_equipment: StartingEquipment[];
};

export type ClassesResponse = {
    count: number;
    results: ClassDetail[];
};
