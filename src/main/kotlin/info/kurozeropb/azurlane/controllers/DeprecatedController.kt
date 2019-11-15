package info.kurozeropb.azurlane.controllers

import info.kurozeropb.azurlane.structures.ErrorResponse
import io.javalin.http.Context

object DeprecatedController {

    fun showDeprecationMessage(ctx: Context) {
        ctx.status(404).json(ErrorResponse(
            statusCode = 404,
            statusMessage = "Not Found",
            message = "/v1 is deprecated use /v2"
        ))
    }

}