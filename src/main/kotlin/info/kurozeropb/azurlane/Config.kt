package info.kurozeropb.azurlane

object Config {
    val version = "2.0.0"
    val baseUrl = "https://azurlane.koumakan.jp"
    val userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"

    val capitalizeAll = listOf(
        "Mkii",
        "Hms",
        "Hdn",
        "Ai"
    )

    val skipCapitalization = listOf(
        "der",
        "of",
        "d'Arc"
    )

    val nations = listOf(
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
    )

    val affiliations = listOf(
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
    )

    val rarities = listOf(
        "Normal",
        "Rare",
        "Elite",
        "Super Rare",
        "Priority",
        "Decisive",
        "Ultra Rare",
        "Unreleased"
    )

    val types = listOf(
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
    )
}