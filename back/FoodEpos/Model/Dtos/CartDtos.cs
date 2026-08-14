namespace FoodEpos.API.Model.Dtos
{
    public record AddCartItemRequest(Guid MealId, int Quantity, string? Note);

    public record UpdateCartItemRequest(int Quantity, string? Note);

    public record CartItemResponse(Guid Id, Guid MealId, string MealName, string? MealImgUrl, int Quantity, decimal UnitPrice, string? Note);

    public record CartResponse(Guid Id, string Status, List<CartItemResponse> Items, decimal Total, DateTimeOffset ExpiresAt);
}
