# Ship

Used to get ship info.

**URL** : `/v1/azurlane/ship`

**URL Parameters** : `ship=[string]` where `ship` is the name of the ship you want to get.

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
    "ship": {
        "wikiUrl": "https://azurlane.koumakan.jp/Prinz_Eugen",
        "id": "244",
        "names": {
            "en": "Prinz Eugen",
            "cn": "欧根亲王",
            "jp": "プリンツ・オイゲン",
            "kr": "프린츠 오이겐"
        },
        "thumbnail": "https://azurlane.koumakan.jp/w/images/f/f7/Prinz_EugenIcon.png",
        "chibi": "https://azurlane.koumakan.jp//w/images/thumb/5/5d/Prinz_EugenChibi.png/147px-Prinz_EugenChibi.png",
        "skins": [
            {
                "title": "Default",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/6/67/Prinz_Eugen.png/600px-Prinz_Eugen.png"
            },
            {
                "title": "Symphonic Fate",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/3/3a/Prinz_EugenWedding.png/600px-Prinz_EugenWedding.png"
            },
            {
                "title": "Unfading Smile",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/f/f9/Prinz_EugenSummer.png/600px-Prinz_EugenSummer.png"
            },
            {
                "title": "Unfading Smile (JP)",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/e/e6/Prinz_EugenSummerJP.png/600px-Prinz_EugenSummerJP.png"
            },
            {
                "title": "Dance of a Hundred Flowers",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/3/34/Prinz_EugenNew_Year.png/600px-Prinz_EugenNew_Year.png"
            },
            {
                "title": "Cordial Cornflower",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/2/22/Prinz_EugenParty.png/600px-Prinz_EugenParty.png"
            }
        ],
        "buildTime": "02:00:00",
        "rarity": "Super Rare",
        "stars": {
            "value": "★★★☆☆☆",
            "count": 3
        },
        "class": "Admiral Hipper",
        "nationality": "Ironblood",
        "nationalityShort": "KMS",
        "hullType": "Heavy Cruiser",
        "miscellaneous": {
            "artist": {
                "link": "https://azurlane.koumakan.jp/Artists#realmbw",
                "name": "realmbw"
            },
            "web": {
                "link": "https://weibo.com/realmbw",
                "name": "realmbw_瞌睡魔"
            },
            "pixiv": {
                "link": "https://www.pixiv.net/member.php?id=529070",
                "name": "RJ"
            },
            "twitter": {
                "link": "https://twitter.com/realmbw",
                "name": "RJ"
            },
            "voiceActress": {
                "link": "https://en.wikipedia.org/wiki/Ayane_Sakura",
                "name": "Ayane Sakura"
            }
        }
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
    "message": "Invalid ship name."
}
```