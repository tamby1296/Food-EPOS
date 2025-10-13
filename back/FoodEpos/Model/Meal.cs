namespace FoodEpos.API.Model
{
    public class Meal
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = null;
        public string ImgURL { get; set; } = null;
        public float Price { get; set; }
    }
}
