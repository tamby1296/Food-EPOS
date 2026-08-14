namespace FoodEpos.API.Model.Dtos
{
    public record LoginRequest(string Username, string Password);

    public record LoginResponse(string Token, DateTimeOffset ExpiresAt, string Username);
}
