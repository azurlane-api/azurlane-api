# Ships

Used to get ships from a specific rarity, type or affiliation.

**URL** : `/ships`

**URL Parameters** :
- `category=[string]` can be one of `rarity`, `type` or `affiliation`.
- `rarity=[string]` depending on what you used in category, this is which rarity.
- `type=[string]` depending on what you used in category, this is which type.
- `affiliation=[string]` depending on what you used in category, this is which affiliation.

**Method** : `GET`

**Auth required** : YES
```json
{
    "Authorization": "Bearer <token>"
}
```

## Success Response

**Code** : `200 OK`

**Content return types**

[https://kurozeropb.info/azurlane/v2/ships?category=affiliation&affiliation=Sardegna%20Empire](https://kurozeropb.info/azurlane/v2/ships?category=affiliation&affiliation=Sardegna%20Empire)
```js
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    ships: [
        {
            id: String,
            name: String
        }
    ]
}

```

## Error Response

**Condition** : If something server-side goes wrong.

**Code** : `500 Internal Server Error`

**Content return types** :

```js
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    error?: String
}
```

**Condition** : Bad request param.

**Code** : `400 Bad Request`

**Content return types** :

```js
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    error?: String
}
```

**Condition**: Invalid authorization token.

**Code**: `401 Unauthorized`

**Content return types** :

```js
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    error?: String
}
```