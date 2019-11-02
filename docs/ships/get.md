# Ship

Used to get ship info.

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
```json
{
    "statusCode": 200,
    "statusMessage": "OK",
    "message": "The request was successful",
    "ships": [
        {
            "id": "410",
            "name": "Littorio"
        },
        {
            "id": "411",
            "name": "Conte di Cavour"
        },
        {
            "id": "412",
            "name": "Giulio Cesare"
        },
        {
            "id": "413",
            "name": "Zara"
        },
        {
            "id": "414",
            "name": "Trento"
        },
        {
            "id": "415",
            "name": "Carabiniere"
        },
        {
            "id": "9006",
            "name": "Pola"
        },
        {
            "id": "9007",
            "name": "Vittorio Veneto"
        }
    ]
}

```

## Error Response

**Condition** : If something server-side goes wrong.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
    "statusCode": 500,
    "statusMessage": "Internal Server Error",
    "message": "The server encountered an unexpected condition that prevented it from fulfilling the request.",
    "error": "TypeError: Cannot read property 'attribs' of undefined"
}
```

**Condition** : Bad request param.

**Code** : `400 Bad Request`

**Content** :

```json
{
    "statusCode": 400,
    "statusMessage": "Bad Request",
    "message": "Invalid orderBy param"
}
```