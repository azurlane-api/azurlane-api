# Ships

Used to get ships from a specific rarity, type or affiliation.

**URL** : `/ships`

**URL Parameters** :
- `category=[string]` can be one of `rarity`, `type` or `affiliation`.
- `rarity=[string]` depending on what you used in category, this is which rarity.
- `type=[string]` depending on what you used in category, this is which type.
- `affiliation=[string]` depending on what you used in category, this is which affiliation.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content return types**

[https://azurlane-api.herokuapp.com/v2/ships?category=affiliation&affiliation=Sardegna%20Empire](https://azurlane-api.herokuapp.com/v2/ships?category=affiliation&affiliation=Sardegna%20Empire)
```kotlin
interface Ship {
    val id: String
    val name: String
}

interface Response {
    val statusCode: Int
    val statusMessage: String
    val message: String
    val ships: List<Ship>
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
