# Construction

Used to get construction info.

**URL** : `/build`

**URL Parameters** : `build=[string]` where `build` is the construction time.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content return types**

```ts
interface Construction {
    time: string;
    wikiUrl: string;
    ships: string[];
}

interface Response {
    statusCode: number;
    statusMessage: string;
    message: string;
    construction: Construction;
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