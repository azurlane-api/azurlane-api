package info.kurozeropb.azurlane.structures

data class SmallShip(
    val name: String,
    val id: String
)

data class ShipsResponse(
    override val statusCode: Int,
    override val statusMessage: String,
    override val message: String,
    val ships: List<SmallShip>
) : BaseResponse