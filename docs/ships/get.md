# Ships

Used to get ships from a specific rarity, type or affiliation.

**URL** : `/ships`

**URL Parameters** :
- `orderBy=[string]` can be one of `rarity`, `type` or `affiliation`.
- `rarity=[string]` depending on what you used in orderBy, this is which rarity.
- `type=[string]` depending on what you used in orderBy, this is which type.
- `affiliation=[string]` depending on what you used in orderBy, this is which affiliation.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

https://azurlane-api.appspot.com/v1/ships?orderBy=affiliation&affiliation=Sardegna%20Empire
```ts
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    ships: [
        {
            id: String,
            name: String
        },
        ...
    ]
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