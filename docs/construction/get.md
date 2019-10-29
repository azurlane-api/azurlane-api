# Construction

Used to get construction info.

**URL** : `/build`

**URL Parameters** : `build=[string]` where `build` is the construction time.

**Method** : `GET`

**Auth required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "statusCode": 200,
    "statusMessage": "OK",
    "message": "The request was successful",
    "construction": {
        "time": "00:12:00",
        "wikiUrl": "https://azurlane.koumakan.jp/Building#List_of_Ships_by_Construction_Time",
        "ships": [
            "U-101",
            "U-81"
        ]
    }
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
    "message": "Invalid construction time."
}
```