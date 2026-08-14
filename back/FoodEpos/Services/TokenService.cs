using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FoodEpos.API.Model;
using Microsoft.IdentityModel.Tokens;

namespace FoodEpos.API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public (string Token, DateTimeOffset ExpiresAt) GenerateToken(User user)
        {
            var key = _configuration["Jwt:Key"]!;
            var expiryHours = _configuration.GetValue<double?>("Jwt:ExpiryHours") ?? 8;
            var expiresAt = DateTimeOffset.UtcNow.AddHours(expiryHours);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                claims: claims,
                expires: expiresAt.UtcDateTime,
                signingCredentials: credentials
            );

            return (new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
        }
    }
}
