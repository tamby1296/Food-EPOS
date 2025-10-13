using FoodEpos.API.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Data
{
    public class FoodEposDbContext : DbContext
    {
        public FoodEposDbContext(DbContextOptions<FoodEposDbContext> options) : base(options)
        {
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries<Meal>()
                         .Where(e => e.State == EntityState.Added && string.IsNullOrEmpty(e.Entity.Id)))
            {
                entry.Entity.Id = Guid.NewGuid().ToString();
            }

            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Meal>().HasData(
                new Meal { Id = "13674975-5f6a-4b79-9f17-cfea791d28a2", Name = "Margherita Pizza", ImgURL = "https://example.com/images/margherita.jpg", Price = 9.99f },
                new Meal { Id = "16677470-2c6b-446b-847f-f0b28b46ed0e", Name = "Chicken Caesar Salad", ImgURL = "https://example.com/images/caesar.jpg", Price = 8.50f },
                new Meal { Id = "2b267a03-dfa8-4f40-b0bb-f14b211ec3b4", Name = "Spaghetti Bolognese", ImgURL = "https://example.com/images/bolognese.jpg", Price = 11.25f },
                new Meal { Id = "307b2786-62ac-42e8-8f7b-f2910184e435", Name = "Grilled Salmon", ImgURL = "https://example.com/images/salmon.jpg", Price = 14.95f },
                new Meal { Id = "54835e48-1cec-4163-be1a-030a901e7d85", Name = "Vegan Buddha Bowl", ImgURL = "https://example.com/images/buddha.jpg", Price = 10.50f },
                new Meal { Id = "7d3a1483-002d-42bc-8ef4-18c018b10e12", Name = "Beef Burger", ImgURL = "https://example.com/images/burger.jpg", Price = 12.00f },
                new Meal { Id = "8b6d9548-287e-404a-984a-dfdf2a39acf3", Name = "Chocolate Lava Cake", ImgURL = "https://example.com/images/lava_cake.jpg", Price = 6.75f }
            );
        }

        public DbSet<Meal> Meals { get; set; }
    }
}
