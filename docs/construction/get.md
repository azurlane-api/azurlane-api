# Construction

Used to get construction info.

**URL** : `/build`

**URL Parameters** : `build=[string]` where `build` is the construction time.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```ts
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    construction: {
        time: String,
        wikiUrl: String,
        ships: Array<String>
    }
}
```

## Error Response

**Condition** : If something server-side goes wrong.

**Code** : `500 Internal Server Error`

**Content** :

```ts
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    error: String
}
```

**Condition** : Bad request param.

**Code** : `400 Bad Request`

**Content** :

```ts
{
    statusCode: Number,
    statusMessage: String,
    message: String
}
```