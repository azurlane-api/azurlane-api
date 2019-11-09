package info.kurozeropb.azurlane.controllers

import info.kurozeropb.azurlane.Config
import info.kurozeropb.azurlane.structures.*
import io.javalin.http.Context
import it.skrape.core.Method
import it.skrape.core.Mode
import it.skrape.extract
import it.skrape.selects.findFirst
import it.skrape.selects.html5.a
import it.skrape.selects.html5.span
import it.skrape.selects.html5.td
import it.skrape.selects.htmlDocument
import it.skrape.skrape

object ShipController {

    fun getShip(ctx: Context) {
        var name = ctx.queryParam("name")
        if (name == null) {
            var id = ctx.queryParam("id")
            if (id == null) {
                ctx.status(400).json(ErrorResponse(
                    statusCode = 400,
                    statusMessage = "Bad Request",
                    message = "Missing or invalid name/id query param"
                ))
                return
            }
            id = id.capitalize()
            name = getShipNameFromId(id)
        }

        if (name.isNullOrBlank()) {
            ctx.status(400).json(ErrorResponse(
                statusCode = 400,
                statusMessage = "Bad Request",
                message = "Missing or invalid name/id query param"
            ))
            return
        }

        name = name.toLowerCase()
            .replace(Regex(" ", setOf(RegexOption.IGNORE_CASE)), "_")
            .split("_")
            .map { if (Config.skipCapitalization.contains(it)) it else it.capitalize() }
            .joinToString("_") { if (Config.capitalizeAll.contains(it)) it.toUpperCase() else it }

        if (name.startsWith("Jeanne")) {
            name = "Jeanne d'Arc"
        }

        val data = scrapeHtmlForShipData(name)
        ctx.status(200).json(ShipResponse(
            statusCode = 200,
            statusMessage = "OK",
            message = "The request was successful",
            ship = data
        ))
    }

    private fun getShipNameFromId(id: String): String =
        skrape {
            url = "${Config.baseUrl}/List_of_Ships"
            mode = Mode.DOM
            method = Method.GET
            followRedirects = true
            userAgent = Config.userAgent

            extract {
                htmlDocument {
                    td {
                        withAttribute = Pair("data-sort-value", id)
                        findFirst {
                            child(0).attr("title")
                        }
                    }
                }
            }
        }

    private fun scrapeHtmlForShipData(ship: String) =
        skrape {
            url = "${Config.baseUrl}/$ship"
            mode = Mode.DOM
            method = Method.GET
            followRedirects = true
            userAgent = Config.userAgent

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
                                skinChibi = Config.baseUrl + chibi.joinToString("/").replace("/thumb", "")
                            }

                            skins.add(Skin(
                                title = element.attr("title"),
                                image = Config.baseUrl + child.child(0)?.child(0)?.attr("src"),
                                chibi = skinChibi
                            ))
                        }
                    }

                    Ship(
                        wikiUrl = "${Config.baseUrl}/${ship}",
                        id = getElementsContainingOwnText("ID").first()?.nextElementSibling()?.text(),
                        names = Names(
                            en = null,
                            cn = span { withAttribute = Pair("lang", "zh"); findFirst { text() } },
                            jp = span { withAttribute = Pair("lang", "ja"); findFirst { text() } },
                            kr = span { withAttribute = Pair("lang", "ko"); findFirst { text() } }
                        ),
                        thumbnail = "${Config.baseUrl}/" + a { withAttribute = Pair("href", "/File:${ship}Icon.png"); findFirst { child(0) } }.attr("src"),
                        skins = skins,
                        buildTime = a { withAttribute = Pair("href", "/${ship}#Construction"); findFirst { text() } },
                        rarity = getElementsContainingOwnText("☆").first()?.child(0)?.attr("title"),
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