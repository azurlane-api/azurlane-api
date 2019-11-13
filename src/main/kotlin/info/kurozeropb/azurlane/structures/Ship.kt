package info.kurozeropb.azurlane.structures

data class Names(
    val en: String? = null,
    val cn: String? = null,
    val jp: String? = null,
    val kr: String? = null
)

data class Skin(
    val title: String? = null,
    val image: String? = null,
    val chibi: String? = null
)

data class Stars(
    val value: String? = null,
    val count: Int
)

data class Stat(
    val name: String? = null,
    val image: String? = null,
    val value: String? = null
)

data class Stats(
    val `100`: List<Stat>? = null,
    val `120`: List<Stat>? = null,
    val base: List<Stat>? = null,
    val retrofit100: List<Stat>? = null,
    val retrofit120: List<Stat>? = null
)

data class MiscellaneousData(
    val link: String? = null,
    val name: String? = null
)

data class Miscellaneous(
    var artist: MiscellaneousData? = null,
    var web: MiscellaneousData? = null,
    var pixiv: MiscellaneousData? = null,
    var twitter: MiscellaneousData? = null,
    var voiceActress: MiscellaneousData? = null
)

data class Ship(
    val wikiUrl: String,
    val id: String? = null,
    val names: Names,
    val thumbnail: String,
    val skins: List<Skin>,
    val buildTime: String? = null,
    val rarity: String? = null,
    val starts: Stars,
    val `class`: String? = null,
    val nationality: String? = null,
    val nationalityShort: String? = null,
    val hullType: String? = null,
    val stats: Stats? = null, // Change back to not null
    val miscellaneous: Miscellaneous? = null // Change back to not null
)

data class ShipResponse(
    override val statusCode: Int,
    override val statusMessage: String,
    override val message: String,
    val ship: Ship
) : BaseResponse