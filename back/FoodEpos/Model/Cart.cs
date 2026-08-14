using System.ComponentModel.DataAnnotations;

namespace FoodEpos.API.Model
{
    public class Cart
    {
        [Key]
        public Guid Id { get; set; }
        public CartStatus Status { get; set; } = CartStatus.Active;
        public bool IsDineIn { get; set; } = true;
        public string? DeliveryAddress { get; set; }
        public List<CartItem> Items { get; set; } = [];
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public DateTimeOffset ExpiresAt { get; set; }
    }
}
