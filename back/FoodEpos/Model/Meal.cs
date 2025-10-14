using System.ComponentModel.DataAnnotations;

namespace FoodEpos.API.Model
{
    public class Meal
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = null;
        public string? ImgURL { get; set; } = null;
        [Required]
        public float Price { get; set; }
        public int MealCategoryId { get; set; }
        public MealCategory MealCategory { get; set; }
    }
}
