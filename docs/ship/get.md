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

**Content example**

```ts
// `?` means nullable
{
    statusCode: Number,
    statusMessage: String,
    message: String,
    ship: {
        wikiUrl: String,
        id?: String,
        names: {
            en?: String,
            cn?: String,
            jp?: String,
            kr?: String
        },
        thumbnail: String,
        skins: [
            {
                title?: String,
                image?: String,
                chibi?: String
            },
            ...
        ],
        buildTime?: String,
        rarity: String,
        stars: {
            value?: String, // example: ★★★☆☆☆
            count: Number
        },
        class?: String,
        nationality?: String,
        nationalityShort?: String,
        hullType?: String,
        stats: {
            100?: [
                {
                    name?: String,
                    image?: String,
                    value?: String
                },
                ...
            ],
            120?: [
                {
                    name?: String,
                    image?: String,
                    value?: String
                },
                ...
            ],
            base?: [
                {
                    name?: String,
                    image?: String,
                    value?: String
                },
                ...
            ],
            retrofit100?: [
                {
                    name?: String,
                    image?: String,
                    value?: String
                },
                ...
            ],
            retrofit120?: [
                {
                    name?: String,
                    image?: String,
                    value?: String
                },
                ...
            ]
        },
        miscellaneous: {
            artist?: {
                link?: String,
                name?: String
            },
            web?: {
                link?: String,
                name?: String
            },
            pixiv?: {
                link?: String,
                name?: String
            },
            twitter?: {
                link?: String,
                name?: String
            },
            voiceActress?: {
                link?: String,
                name?: String
            }
        }
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