package info.kurozeropb.azurlane.structures

data class ErrorResponse(
    override val statusCode: Int,
    override val statusMessage: String,
    override val message: String,
    val error: String? = null
) : BaseResponse