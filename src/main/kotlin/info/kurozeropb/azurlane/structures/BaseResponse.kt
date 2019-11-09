package info.kurozeropb.azurlane.structures

interface BaseResponse {
    val statusCode: Int
    val statusMessage: String
    val message: String
}