package info.kurozeropb.azurlane

import info.kurozeropb.azurlane.controllers.ConstructionController
import info.kurozeropb.azurlane.controllers.ShipController
import info.kurozeropb.azurlane.controllers.ShipsController
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin

object API {

    @JvmStatic
    fun main(args: Array<String>) {
        val app = Javalin.create().apply {
            exception(Exception::class.java) { e, _ -> e.printStackTrace() }
            error(404) { ctx -> ctx.json("not found") }
        }.start(System.getenv("PORT")?.toInt() ?: 8080)

        app.routes {

            get("/") { ctx ->
                ctx.status(200).json(object {
                    val statusCode = 200
                    val statusMessage = "OK"
                    val message = "Request was successful"
                    val routes = listOf(
                        "/v1/ship [deprecated]",
                        "/v1/ships [deprecated]",
                        "/v1/build [deprecated]",
                        "/v2/ship",
                        "/v2/ships",
                        "/v2/build"
                    )
                })
            }

            path("v1") {
                get { ctx ->
                    ctx.status(200).json(object {
                        val statusCode = 200
                        val statusMessage = "OK"
                        val message = "Request was successful"
                        val routes = listOf(
                            "/ship [deprecated]",
                            "/ships [deprecated]",
                            "/build [deprecated]"
                        )
                    })
                }

                get("/ship", ShipController::getShip)

                get("/build", ConstructionController::getBuildInfo)

                get("/ships", ShipsController::getShips)
            }

            path("/v2") {

                get { ctx ->
                    ctx.status(200).json(object {
                        val statusCode = 200
                        val statusMessage = "OK"
                        val message = "Request was successful"
                        val routes = listOf(
                            "/ship",
                            "/ships",
                            "/build"
                        )
                    })
                }

                get("/ship", ShipController::getShip)

                get("/build", ConstructionController::getBuildInfo)

                get("/ships", ShipsController::getShips)
            }
        }
    }
}