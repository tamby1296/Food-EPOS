using FoodEpos.API.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Data
{
    public class FoodEposDbContext : DbContext
    {
        public FoodEposDbContext(DbContextOptions<FoodEposDbContext> options) : base(options)
        {
        }

        public DbSet<Meal> Meals { get; set; }
    }
}
