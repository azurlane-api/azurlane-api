package info.kurozeropb.azurlaneapi.controllers

import info.kurozeropb.azurlaneapi.structures.Names
import info.kurozeropb.azurlaneapi.structures.Ship
import info.kurozeropb.azurlaneapi.structures.Skin
import info.kurozeropb.azurlaneapi.structures.Stars
import io.javalin.http.Context
import it.skrape.core.Method
import it.skrape.core.Mode
import it.skrape.extract
import it.skrape.selects.findFirst
import it.skrape.selects.html5.a
import it.skrape.selects.html5.span
import it.skrape.selects.htmlDocument
import it.skrape.skrape

object ShipController {

    fun getShip(ctx: Context) {
        val name = ctx.queryParam("name")
        val data = scrapeHtmlForShipData(name ?: "")
        ctx.json(data)
    }

//    private fun getShipNameFromId(id: String) {
//
//    }

    private fun scrapeHtmlForShipData(ship: String)  =
        skrape {
            url = "https://azurlane.koumakan.jp/$ship"
            mode = Mode.DOM
            method = Method.GET
            followRedirects = true
            userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"

            extract {
                htmlDocument {
                    val skins: MutableList<Skin> = mutableListOf()
                    val chibis = getElementsByAttributeValueContaining("alt", "Chibi")
                    val list = getElementsByClass("tabbertab")
                    list.forEachIndexed { index, element ->
                        val child = element.children().find { c -> c.className().contains("adaptiveratioimg") }
                        if (child != null) {
                            var skinChibi: String? = null
                            var chibi = chibis[index].attr("src").split("/")
                            if (chibi.isNotEmpty()) {
                                chibi = chibi.dropLast(1)
                                skinChibi = "https://azurlane.koumakan.jp" + chibi.joinToString("/").replace("/thumb", "")
                            }

                            skins.add(Skin(
                                title = element.attr("title"),
                                image = "https://azurlane.koumakan.jp" + child.children()?.get(0)?.children()?.get(0)?.attr("src"),
                                chibi = skinChibi
                            ))
                        }
                    }

                    Ship(
                        wikiUrl = "https://azurlane.koumakan.jp/${ship}",
                        id = getElementsContainingOwnText("ID").first()?.nextElementSibling()?.text(),
                        names = Names(
                            en = null,
                            cn = span { withAttribute = Pair("lang", "zh"); findFirst { text() } },
                            jp = span { withAttribute = Pair("lang", "ja"); findFirst { text() } },
                            kr = span { withAttribute = Pair("lang", "ko"); findFirst { text() } }
                        ),
                        thumbnail = "https://azurlane.koumakan.jp/" + a { withAttribute = Pair("href", "/File:${ship.replace(" ", "_")}Icon.png"); findFirst { children() } }.first()?.attr("src"),
                        skins = skins,
                        buildTime = a { withAttribute = Pair("href", "/${ship.replace(" ", "_")}#Construction"); findFirst { text() } },
                        rarity = getElementsContainingOwnText("☆").first()?.children()?.get(0)?.attr("title"),
                        starts = Stars(
                            value = getElementsContainingOwnText("☆").first()?.text(),
                            count = getElementsContainingOwnText("☆").first()?.text()?.count { it == '★' } ?: 0
                        ),
                        `class` = null,
                        nationality = null,
                        nationalityShort = null,
                        hullType = null,
                        stats = null,
                        miscellaneous = null
                    )
                }
            }
        }

}