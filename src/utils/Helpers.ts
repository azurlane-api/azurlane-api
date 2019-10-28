/** Capitalize a word */
export function capitalize(str: string): string {
    if (str.startsWith("(")) return str.slice(0, 1) + str.charAt(1).toUpperCase() + str.slice(2)
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeAll: string[] = [
    "Mkii"
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
    "FFNF",  // Iris Libre
    "MNF",   // Vichya Dominion
    "IJN",   // Sakura Empire
    "UNIV"   // Universal
];
