using FoodEpos.API.Model;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Data
{
    public class FoodEposDbContext : DbContext
    {
        public FoodEposDbContext(DbContextOptions<FoodEposDbContext> options)
            : base(options)
        {
        }

        public DbSet<MealCategory> MealCategories { get; set; } = null!;
        public DbSet<Meal> Meals { get; set; } = null!;

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MealCategory>()
                .HasMany(c => c.Meals)
                .WithOne(m => m.MealCategory)
                .HasForeignKey(m => m.MealCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MealCategory>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Meal>()
                .Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Meal>()
                .Property(m => m.Price)
                .IsRequired();

            //modelBuilder.Entity<OrderItems>()
            //    .HasOne<Meal>()
            //    .WithMany()
            //    .HasForeignKey(oi => oi.MealId);
        }
    }
}
