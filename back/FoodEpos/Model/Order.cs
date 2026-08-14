namespace FoodEpos.API.Model
{
    public class Order
    {
        public Guid OrderId { get; set; }
        public int OrderNum { get; set; }
        public List<OrderItems> OrderItems { get; set; } = [];
        public float Total { get; set; }
        public float Discount { get; set; }
        public bool IsPaid { get; set; }
        public bool IsDineIn { get; set; }
        public string? DeliveryAddress { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
