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

```ts
interface Response {
    statusCode: number;
    statusMessage: string;
    message: string;
    ship: {
        wikiUrl: string;
        id: string | null;
        names: {
            en: string | null;
            cn: string | null;
            jp: string | null;
            kr: string | null;
        },
        thumbnail: string;
        skins: {
            title: string | null;
            image: string | null;
            chibi: string | null;
        }[];
        buildTime: string | null;
        rarity: string;
        stars: {
            value: string | null; // example: ★★★☆☆☆
            count: number
        };
        class: string | null;
        nationality: string | null;
        nationalityShort: string | null;
        hullType: string | null;
        stats: {
            100: {
                name: string | null;
                image: string | null;
                value: string | null;
            }[] | null;
            120: {
                name: string | null;
                image: string | null;
                value: string | null;
            }[] | null;
            base: {
                name: string | null;
                image: string | null;
                value: string | null;
            }[] | null;
            retrofit100: {
                name: string | null;
                image: string | null;
                value: string | null;
            }[] | null;
            retrofit120: {
                name: string | null;
                image: string | null;
                value: string | null;
            }[] | null;
        },
        miscellaneous: {
            artist: {
                link: string | null;
                name: string | null;
            } | null;
            web: {
                link: string | null;
                name: string | null;
            } | null;
            pixiv: {
                link: string | null;
                name: string | null;
            } | null;
            twitter: {
                link: string | null;
                name: string | null;
            } | null;
            voiceActress: {
                link: string | null;
                name: string | null;
            } | null;
        };
    };
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