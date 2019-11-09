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

**Content return types**

[https://azurlane-api.appspot.com/v1/ships?orderBy=affiliation&affiliation=Sardegna%20Empire](https://azurlane-api.appspot.com/v1/ships?orderBy=affiliation&affiliation=Sardegna%20Empire)
```ts
interface Response {
    statusCode: number;
    statusMessage: string;
    message: string;
    ships: {
        id: string;
        name: string;
    }[];
}

```

## Error Response

**Condition** : If something server-side goes wrong.

**Code** : `500 Internal Server Error`

**Content return types** :

```ts
interface ErrorResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
    error: string;
}
```

**Condition** : Bad request param.

**Code** : `400 Bad Request`

**Content return types** :

```ts
interface ErrorResponse {
    statusCode: number;
    statusMessage: string;
    message: string;
}
```