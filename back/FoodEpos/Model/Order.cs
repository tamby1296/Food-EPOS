using System.ComponentModel.DataAnnotations;

namespace FoodEpos.API.Model
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public int OrderNumber { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Created;
        public List<OrderItems> OrderItems { get; set; } = [];
        public decimal Total { get; set; }
        public decimal Discount { get; set; }
        public bool IsPaid { get; set; }
        public bool IsDineIn { get; set; }
        public string? DeliveryAddress { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}
