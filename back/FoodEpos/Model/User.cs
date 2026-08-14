using System.ComponentModel.DataAnnotations;

namespace FoodEpos.API.Model
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required, MaxLength(50)]
        public string Username { get; set; } = null!;
        [Required]
        public string PasswordHash { get; set; } = null!;
        public DateTimeOffset CreatedAt { get; set; }
    }
}
