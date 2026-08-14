using FoodEpos.API.Data;
using FoodEpos.API.Model.Dtos;
using FoodEpos.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FoodEposDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(FoodEposDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user is null)
            {
                return Unauthorized();
            }

            var hasher = new PasswordHasher<Model.User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized();
            }

            var (token, expiresAt) = _tokenService.GenerateToken(user);
            return Ok(new LoginResponse(token, expiresAt, user.Username));
        }
    }
}
