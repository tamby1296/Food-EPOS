using FoodEpos.API.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(FoodEposDbContext context)
        {
            context.Database.Migrate();

            if (!context.MealCategories.Any())
            {
                var categories = new List<MealCategory>
                {
                    new MealCategory { Name = "Hot dishes" },
                    new MealCategory { Name = "Cold dishes" },
                    new MealCategory { Name = "Soup" },
                    new MealCategory { Name = "Grill" },
                    new MealCategory { Name = "Appetizer" },
                    new MealCategory { Name = "Dessert" }
                };

                context.MealCategories.AddRange(categories);
                context.SaveChanges();
            }

            var categoryMap = context.MealCategories.ToDictionary(c => c.Name, c => c.Id);

            if (!context.Meals.Any())
            {
                var meals = new List<Meal>
                {
                    new Meal { Name = "Margherita Pizza", ImgURL = "https://example.com/images/margherita.jpg", Price = 9.99f, MealCategoryId = categoryMap["Hot dishes"] },
                    new Meal { Name = "Chicken Caesar Salad", ImgURL = "https://example.com/images/caesar.jpg", Price = 8.50f, MealCategoryId = categoryMap["Cold dishes"] },
                    new Meal { Name = "Spaghetti Bolognese", ImgURL = "https://example.com/images/bolognese.jpg", Price = 11.25f, MealCategoryId = categoryMap["Hot dishes"] },
                    new Meal { Name = "Grilled Salmon", ImgURL = "https://example.com/images/salmon.jpg", Price = 14.95f, MealCategoryId = categoryMap["Grill"] },
                    new Meal { Name = "Vegan Buddha Bowl", ImgURL = "https://example.com/images/buddha.jpg", Price = 10.50f, MealCategoryId = categoryMap["Cold dishes"] },
                    new Meal { Name = "Beef Burger", ImgURL = "https://example.com/images/burger.jpg", Price = 12.00f, MealCategoryId = categoryMap["Hot dishes"] },
                    new Meal { Name = "Chocolate Lava Cake", ImgURL = "https://example.com/images/lava_cake.jpg", Price = 6.75f, MealCategoryId = categoryMap["Dessert"] },
                    new Meal { Name = "Tomato Soup", ImgURL = "https://example.com/images/tomato_soup.jpg", Price = 7.25f, MealCategoryId = categoryMap["Soup"] },
                    new Meal { Name = "Garlic Bread", ImgURL = "https://example.com/images/garlic_bread.jpg", Price = 4.25f, MealCategoryId = categoryMap["Appetizer"] }
                };

                context.Meals.AddRange(meals);
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                var hasher = new PasswordHasher<User>();
                var admin = new User
                {
                    Id = Guid.NewGuid(),
                    Username = "admin",
                    CreatedAt = DateTimeOffset.UtcNow
                };
                admin.PasswordHash = hasher.HashPassword(admin, "admin");

                context.Users.Add(admin);
                context.SaveChanges();
            }
        }
    }
}
