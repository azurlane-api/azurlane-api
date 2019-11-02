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
        "skins": [
            {
                "title": "Default",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/6/67/Prinz_Eugen.png/600px-Prinz_Eugen.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/5/5d/Prinz_EugenChibi.png"
            },
            {
                "title": "Symphonic Fate",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/3/3a/Prinz_EugenWedding.png/600px-Prinz_EugenWedding.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/d/dd/Prinz_EugenWeddingChibi.png"
            },
            {
                "title": "Unfading Smile",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/f/f9/Prinz_EugenSummer.png/600px-Prinz_EugenSummer.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/5/59/Prinz_EugenSummerChibi.png"
            },
            {
                "title": "Unfading Smile (JP)",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/e/e6/Prinz_EugenSummerJP.png/600px-Prinz_EugenSummerJP.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/0/0a/Prinz_EugenSummerJPChibi.png"
            },
            {
                "title": "Dance of a Hundred Flowers",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/3/34/Prinz_EugenNew_Year.png/600px-Prinz_EugenNew_Year.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/d/d3/Prinz_EugenNew_YearChibi.png"
            },
            {
                "title": "Cordial Cornflower",
                "image": "https://azurlane.koumakan.jp/w/images/thumb/2/22/Prinz_EugenParty.png/600px-Prinz_EugenParty.png",
                "chibi": "https://azurlane.koumakan.jp/w/images/4/44/Prinz_EugenPartyChibi.png"
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
        "stats": {
            "100": [
                {
                    "name": "Health",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/8/8b/Duration.png/25px-Duration.png",
                    "value": "5683"
                },
                {
                    "name": "Armor",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/06/Armor.png/25px-Armor.png",
                    "value": "Medium"
                },
                {
                    "name": "Reload",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/e/e3/Refill.png/25px-Refill.png",
                    "value": "159"
                },
                {
                    "name": "Luck",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/f/f0/Luck.png/24px-Luck.png",
                    "value": "78"
                },
                {
                    "name": "Firepower",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d5/Firepower.png/25px-Firepower.png",
                    "value": "196"
                },
                {
                    "name": "Torpedo",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/4/40/Torpedo.png/25px-Torpedo.png",
                    "value": "133"
                },
                {
                    "name": "Evasion",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d2/Evasion.png/25px-Evasion.png",
                    "value": "24"
                },
                {
                    "name": "Speed",
                    "image": null,
                    "value": "25"
                },
                {
                    "name": "Anti-air",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/0f/AntiAir.png/25px-AntiAir.png",
                    "value": "178"
                },
                {
                    "name": "Aviation",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/6/6a/Aviation.png/25px-Aviation.png",
                    "value": "0"
                },
                {
                    "name": "Oil consumption",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/9/90/Consumption.png/25px-Consumption.png",
                    "value": "12"
                },
                {
                    "name": "Accuracy (Hit)",
                    "image": null,
                    "value": "114"
                },
                {
                    "name": "Anti-submarine warfare",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/1/16/ASW.png/25px-ASW.png",
                    "value": "0"
                }
            ],
            "120": [
                {
                    "name": "Health",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/8/8b/Duration.png/25px-Duration.png",
                    "value": "6252"
                },
                {
                    "name": "Armor",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/06/Armor.png/25px-Armor.png",
                    "value": "Medium"
                },
                {
                    "name": "Reload",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/e/e3/Refill.png/25px-Refill.png",
                    "value": "182"
                },
                {
                    "name": "Luck",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/f/f0/Luck.png/24px-Luck.png",
                    "value": "78"
                },
                {
                    "name": "Firepower",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d5/Firepower.png/25px-Firepower.png",
                    "value": "226"
                },
                {
                    "name": "Torpedo",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/4/40/Torpedo.png/25px-Torpedo.png",
                    "value": "153"
                },
                {
                    "name": "Evasion",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d2/Evasion.png/25px-Evasion.png",
                    "value": "62"
                },
                {
                    "name": "Speed",
                    "image": null,
                    "value": "25"
                },
                {
                    "name": "Anti-air",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/0f/AntiAir.png/25px-AntiAir.png",
                    "value": "205"
                },
                {
                    "name": "Aviation",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/6/6a/Aviation.png/25px-Aviation.png",
                    "value": "0"
                },
                {
                    "name": "Oil consumption",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/9/90/Consumption.png/25px-Consumption.png",
                    "value": "12"
                },
                {
                    "name": "Accuracy (Hit)",
                    "image": null,
                    "value": "128"
                },
                {
                    "name": "Anti-submarine warfare",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/1/16/ASW.png/25px-ASW.png",
                    "value": "0"
                }
            ],
            "base": [
                {
                    "name": "Health",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/8/8b/Duration.png/25px-Duration.png",
                    "value": "1099"
                },
                {
                    "name": "Armor",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/06/Armor.png/25px-Armor.png",
                    "value": "Medium"
                },
                {
                    "name": "Reload",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/e/e3/Refill.png/25px-Refill.png",
                    "value": "67"
                },
                {
                    "name": "Luck",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/f/f0/Luck.png/24px-Luck.png",
                    "value": "78"
                },
                {
                    "name": "Firepower",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d5/Firepower.png/25px-Firepower.png",
                    "value": "43"
                },
                {
                    "name": "Torpedo",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/4/40/Torpedo.png/25px-Torpedo.png",
                    "value": "28"
                },
                {
                    "name": "Evasion",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/d/d2/Evasion.png/25px-Evasion.png",
                    "value": "9"
                },
                {
                    "name": "Speed",
                    "image": null,
                    "value": "25"
                },
                {
                    "name": "Anti-air",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/0/0f/AntiAir.png/25px-AntiAir.png",
                    "value": "38"
                },
                {
                    "name": "Aviation",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/6/6a/Aviation.png/25px-Aviation.png",
                    "value": "0"
                },
                {
                    "name": "Oil consumption",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/9/90/Consumption.png/25px-Consumption.png",
                    "value": "4"
                },
                {
                    "name": "Accuracy (Hit)",
                    "image": null,
                    "value": "44"
                },
                {
                    "name": "Anti-submarine warfare",
                    "image": "https://azurlane.koumakan.jp/w/images/thumb/1/16/ASW.png/25px-ASW.png",
                    "value": "0"
                }
            ],
            "retrofit100": null,
            "retrofit120": null
        },
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