# Ship

Used to get ship info.

**URL** : `/ship`

**URL Parameters** :
- `ship=[string]` where `ship` is the name of the ship you want to get.
- `id=[string]` where `id` is the id of the ship you want to get.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content return types**

```kotlin
interface Names {
    val en: String?
    val cn: String?
    val jp: String?
    val kr: String?
}

interface Skin {
    val title: String?
    val image: String?
    val chibi: String?
}

interface Stars {
    val value: String? // example: ★★★☆☆☆
    val count: Int
}

interface Stat {
    val name: String?
    val image: String?
    val value: String?
}

interface Stats {
    val level100: List<Stat>?
    val level120: List<Stat>?
    val base: List<Stat>?
    val retrofit100: List<Stat>?
    val retrofit120: List<Stat>?
}

interface MiscellaneousData {
    val link: String?
    val name: String?
}

interface Miscellaneous {
    val artist: MiscellaneousData?
    val web: MiscellaneousData?
    val pixiv: MiscellaneousData?
    val twitter: MiscellaneousData?
    val voiceActress: MiscellaneousData?
}

interface Ship {
    val wikiUrl: String
    val id: String?
    val names: Names
    val thumbnail: String
    val skins: List<Skin>
    val buildTime: String?
    val rarity: String
    val stars: Stars
    val `class`: String?
    val nationality: String?
    val nationalityShort: String?
    val hullType: String?
    val stats: Stats,
    val miscellaneous: Miscellaneous
}

interface Response {
    val statusCode: Int
    val statusMessage: String
    val message: String
    val ship: Ship
}
```

## Error Response

**Condition** : If something server-side goes wrong.

**Code** : `500 Internal Server Error`

**Content return types** :

```kotlin
interface ErrorResponse {
    val statusCode: Int
    val statusMessage: String
    val message: String
    val error: String?
}
```

**Condition** : Bad request param.

**Code** : `400 Bad Request`

**Content return types** :

```kotlin
interface ErrorResponse {
    val statusCode: Int
    val statusMessage: String
    val message: String
    val error: String?
}
```