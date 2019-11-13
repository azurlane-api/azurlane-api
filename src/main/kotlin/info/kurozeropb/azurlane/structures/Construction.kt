package info.kurozeropb.azurlane.structures

data class Construction(
    val time: String,
    val wikiUrl: String,
    val ships: List<String>
)

data class ConstructionResponse(
    override val statusCode: Int,
    override val statusMessage: String,
    override val message: String,
    val construction: Construction
) : BaseResponse