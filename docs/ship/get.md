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
interface NamesData {
    en: string | null;
    cn: string | null;
    jp: string | null;
    kr: string | null;
}

interface SkinData {
    title: string | null;
    image: string | null;
    chibi: string | null;
}

interface StatData {
    name: string | null;
    image: string | null;
    value: string | null;
}

interface MiscellaneousData {
    link: string | null;
    name: string | null;
}

interface Response {
    statusCode: number;
    statusMessage: string;
    message: string;
    ship: {
        wikiUrl: string;
        id: string | null;
        names: NamesData;
        thumbnail: string;
        skins: Array<SkinData>;
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
            100: Array<StatData> | null;
            120: Array<StatData> | null;
            base: Array<StatData> | null;
            retrofit100: Array<StatData> | null;
            retrofit120: Array<StatData> | null;
        },
        miscellaneous: {
            artist: MiscellaneousData | null;
            web: MiscellaneousData | null;
            pixiv: MiscellaneousData | null;
            twitter: MiscellaneousData | null;
            voiceActress: MiscellaneousData | null;
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