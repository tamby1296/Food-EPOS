namespace FoodEpos.API.Model
{
    public class OrderItems
    {
        public Guid OrderItemId { get; set; }
        public Guid MealId { get; set; }
        public string? OrderNote { get; set; }
        public int Quantity { get; set; }
        public float UnitPrice { get; set; }
        public ICollection<Meal> Meals { get; set; } = [];
    }
}
