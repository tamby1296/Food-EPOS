using FoodEpos.API.Model;
using FoodEpos.API.Model.Dtos;

namespace FoodEpos.API.Services
{
    public static class OrderMapper
    {
        public static OrderResponse ToResponse(Order order, IReadOnlyDictionary<Guid, string> mealNames)
        {
            var items = order.OrderItems.Select(i => new OrderItemResponse(
                i.Id, i.MealId, mealNames.GetValueOrDefault(i.MealId, string.Empty), i.Quantity, i.UnitPrice, i.Note
            )).ToList();

            return new OrderResponse(
                order.Id,
                order.OrderNumber,
                order.Status.ToString(),
                items,
                order.Total,
                order.Discount,
                order.IsPaid,
                order.IsDineIn,
                order.DeliveryAddress,
                order.CreatedAt,
                order.UpdatedAt
            );
        }
    }
}
