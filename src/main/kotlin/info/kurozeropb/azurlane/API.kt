package info.kurozeropb.azurlane

import info.kurozeropb.azurlane.controllers.ShipController
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin

object API {

    @JvmStatic
    fun main(args: Array<String>) {
        val app = Javalin.create().apply {
            exception(Exception::class.java) { e, _ -> e.printStackTrace() }
            error(404) { ctx -> ctx.json("not found") }
        }.start(8080)

        app.routes {

            get("/") {

            }

            path("/v2") {

                get {}

                get("/ship", ShipController::getShip)
            }
        }
    }
}