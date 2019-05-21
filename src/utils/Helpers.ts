export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const nations: string[] = [
    "USS",   // Eagle Union
    "HMS",   // Royal Navy
    "KMS",   // Ironblood
    "ROC",   // Eastern Radiance
    "SN",    // North Union
    "FFNF",  // Iris Libre
    "MNF",   // Vichya Dominion
    "IJN"    // Sakura Empire
];
