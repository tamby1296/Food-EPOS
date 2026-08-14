namespace FoodEpos.API.Model.Dtos
{
    public record OrderItemResponse(Guid Id, Guid MealId, string MealName, int Quantity, decimal UnitPrice, string? Note);

    public record OrderResponse(
        Guid Id,
        int OrderNumber,
        string Status,
        List<OrderItemResponse> Items,
        decimal Total,
        decimal Discount,
        bool IsPaid,
        bool IsDineIn,
        string? DeliveryAddress,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );
}
