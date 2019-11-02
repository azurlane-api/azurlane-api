/** Capitalize a word */
export function capitalize(str: string): string {
    if (str.startsWith("(")) return str.slice(0, 1) + str.charAt(1).toUpperCase() + str.slice(2)
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeAll: string[] = [
    "Mkii",
    "Hms",
    "Hdn",
    "Ai"
];

/** Certain parts of names shouldn't be capitalized */
export const skipCapitalization: string[] = [
    "der",
    "of",
    "d'Arc"
];

/** All available nations */
export const nations: string[] = [
    "USS",   // Eagle Union
    "HMS",   // Royal Navy
    "KMS",   // Ironblood
    "ROC",   // Eastern Radiance (Yat Sen)
    "PRAN",  // Eastern Radiance
    "SN",    // North Union
    "RN",    // Sardegna Empire
    "FFNF",  // Iris Libre
    "MNF",   // Vichya Dominion
    "IJN",   // Sakura Empire
    "UNIV"   // Universal
];

export const affiliations: string[] = [
    "Eagle Union",
    "Royal Navy",
    "Ironblood",
    "Eastern Radiance",
    "North Union",
    "Sardegna Empire",
    "Iris Libre",
    "Vichya Dominion",
    "Sakura Empire",
    "Universal",
    // Collabs
    "Utawarerumono",
    "Neptunia",
    "KizunaAI",
    "Bilibili"
];

export const rarities: string[] = [
    "Normal",
    "Rare",
    "Elite",
    "Super Rare",
    "Priority",
    "Decisive",
    "Ultra Rare",
    "Unreleased"
];

export const types: string[] = [
    "Destroyer",
    "Light Cruiser",
    "Heavy Cruiser",
    "Battleship",
    "Light Aircraft Carrier",
    "Aircraft Carrier",
    "Repair Ship",
    "Battlecruiser",
    "Monitor",
    "Submarine",
    "Submarine Carrier",
    "Large Cruiser",
    "BBV"
];