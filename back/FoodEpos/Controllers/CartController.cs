using FoodEpos.API.Data;
using FoodEpos.API.Model;
using FoodEpos.API.Model.Dtos;
using FoodEpos.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private const int CartTtlMinutes = 30;

        private readonly FoodEposDbContext _context;

        public CartController(FoodEposDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCart()
        {
            var now = DateTimeOffset.UtcNow;
            var cart = new Cart
            {
                Id = Guid.NewGuid(),
                Status = CartStatus.Active,
                CreatedAt = now,
                UpdatedAt = now,
                ExpiresAt = now.AddMinutes(CartTtlMinutes)
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return Ok(ToCartResponse(cart));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(Guid id)
        {
            var cart = await LoadCart(id);
            if (cart is null) return NotFound();

            var stateError = await EnsureUsable(cart, allowCompleted: true);
            if (stateError is not null) return stateError;

            return Ok(ToCartResponse(cart));
        }

        [HttpPost("{id}/items")]
        public async Task<IActionResult> AddItem(Guid id, AddCartItemRequest request)
        {
            if (request.Quantity <= 0) return BadRequest("Quantity must be greater than zero.");

            var cart = await LoadCart(id);
            if (cart is null) return NotFound();

            var stateError = await EnsureUsable(cart);
            if (stateError is not null) return stateError;

            var meal = await _context.Meals.FindAsync(request.MealId);
            if (meal is null) return BadRequest("Meal not found.");

            var existing = cart.Items.FirstOrDefault(i => i.MealId == request.MealId);
            if (existing is not null)
            {
                existing.Quantity += request.Quantity;
                if (request.Note is not null) existing.Note = request.Note;
            }
            else
            {
                var newItem = new CartItem
                {
                    Id = Guid.NewGuid(),
                    CartId = cart.Id,
                    MealId = meal.Id,
                    Quantity = request.Quantity,
                    UnitPrice = (decimal)meal.Price,
                    Note = request.Note
                };
                _context.CartItems.Add(newItem);
            }

            TouchCart(cart);
            await _context.SaveChangesAsync();

            return Ok(ToCartResponse(cart));
        }

        [HttpPut("{id}/items/{itemId}")]
        public async Task<IActionResult> UpdateItem(Guid id, Guid itemId, UpdateCartItemRequest request)
        {
            if (request.Quantity <= 0) return BadRequest("Quantity must be greater than zero.");

            var cart = await LoadCart(id);
            if (cart is null) return NotFound();

            var stateError = await EnsureUsable(cart);
            if (stateError is not null) return stateError;

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item is null) return NotFound();

            item.Quantity = request.Quantity;
            item.Note = request.Note;

            TouchCart(cart);
            await _context.SaveChangesAsync();

            return Ok(ToCartResponse(cart));
        }

        [HttpDelete("{id}/items/{itemId}")]
        public async Task<IActionResult> RemoveItem(Guid id, Guid itemId)
        {
            var cart = await LoadCart(id);
            if (cart is null) return NotFound();

            var stateError = await EnsureUsable(cart);
            if (stateError is not null) return stateError;

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item is null) return NotFound();

            cart.Items.Remove(item);
            _context.CartItems.Remove(item);

            TouchCart(cart);
            await _context.SaveChangesAsync();

            return Ok(ToCartResponse(cart));
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteCart(Guid id)
        {
            var cart = await LoadCart(id);
            if (cart is null) return NotFound();

            var stateError = await EnsureUsable(cart);
            if (stateError is not null) return stateError;

            if (cart.Items.Count == 0) return BadRequest("Cart is empty.");

            var now = DateTimeOffset.UtcNow;
            var order = new Order
            {
                Id = Guid.NewGuid(),
                Status = OrderStatus.Created,
                Total = cart.Items.Sum(i => i.Quantity * i.UnitPrice),
                Discount = 0,
                IsPaid = true,
                IsDineIn = cart.IsDineIn,
                DeliveryAddress = cart.DeliveryAddress,
                CreatedAt = now,
                UpdatedAt = now,
                OrderItems = cart.Items.Select(i => new OrderItems
                {
                    Id = Guid.NewGuid(),
                    MealId = i.MealId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    Note = i.Note
                }).ToList()
            };

            cart.Status = CartStatus.Completed;
            cart.UpdatedAt = now;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var meals = await _context.Meals
                .Where(m => order.OrderItems.Select(i => i.MealId).Contains(m.Id))
                .ToDictionaryAsync(m => m.Id, m => m.Name);

            return StatusCode(201, OrderMapper.ToResponse(order, meals));
        }

        private async Task<Cart?> LoadCart(Guid id)
        {
            return await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Meal)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        private void TouchCart(Cart cart)
        {
            var now = DateTimeOffset.UtcNow;
            cart.UpdatedAt = now;
            cart.ExpiresAt = now.AddMinutes(CartTtlMinutes);
        }

        private async Task<IActionResult?> EnsureUsable(Cart cart, bool allowCompleted = false)
        {
            if (cart.Status == CartStatus.Active && cart.ExpiresAt < DateTimeOffset.UtcNow)
            {
                cart.Status = CartStatus.Expired;
                await _context.SaveChangesAsync();
            }

            if (cart.Status == CartStatus.Expired) return StatusCode(410, "Cart has expired.");
            if (cart.Status == CartStatus.Completed && !allowCompleted) return Conflict("Cart has already been completed.");

            return null;
        }

        private static CartResponse ToCartResponse(Cart cart)
        {
            var items = cart.Items.Select(i => new CartItemResponse(
                i.Id, i.MealId, i.Meal?.Name ?? string.Empty, i.Meal?.ImgURL, i.Quantity, i.UnitPrice, i.Note
            )).ToList();

            return new CartResponse(
                cart.Id,
                cart.Status.ToString(),
                items,
                items.Sum(i => i.Quantity * i.UnitPrice),
                cart.ExpiresAt
            );
        }
    }
}
