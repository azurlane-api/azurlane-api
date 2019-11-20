# Construction

Used to get construction info.

**URL** : `/build`

**URL Parameters** : `build=[string]` where `build` is the construction time.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content return types**

```kotlin
interface Construction {
    val time: String
    val wikiUrl: String
    val ships: List<String>
}

interface Response {
    val statusCode: Int
    val statusMessage: String
    val message: String
    val construction: Construction
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