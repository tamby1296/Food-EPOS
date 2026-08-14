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
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Cart> Carts { get; set; } = null!;
        public DbSet<CartItem> CartItems { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItems> OrderItems { get; set; } = null!;

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

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(i => i.Cart)
                .HasForeignKey(i => i.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(i => i.Meal)
                .WithMany()
                .HasForeignKey(i => i.MealId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CartItem>()
                .Property(i => i.UnitPrice)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(i => i.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .Property(o => o.Total)
                .HasColumnType("numeric(10,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.Discount)
                .HasColumnType("numeric(10,2)");

            modelBuilder.HasSequence<int>("OrderNumberSeq").StartsAt(1000);

            modelBuilder.Entity<Order>()
                .Property(o => o.OrderNumber)
                .HasDefaultValueSql("nextval('\"OrderNumberSeq\"')");

            modelBuilder.Entity<OrderItems>()
                .HasOne(i => i.Meal)
                .WithMany()
                .HasForeignKey(i => i.MealId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItems>()
                .Property(i => i.UnitPrice)
                .HasColumnType("numeric(10,2)");
        }
    }
}
