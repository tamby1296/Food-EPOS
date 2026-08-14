using FoodEpos.API.Data;
using FoodEpos.API.Model;
using FoodEpos.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodEpos.API.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly FoodEposDbContext _context;

        public OrderController(FoodEposDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] OrderStatus? status)
        {
            var query = _context.Orders.Include(o => o.OrderItems).AsQueryable();

            if (status.HasValue)
            {
                query = query.Where(o => o.Status == status.Value);
            }

            var orders = await query
                .OrderBy(o => o.CreatedAt)
                .ToListAsync();

            var mealNames = await GetMealNames(orders.SelectMany(o => o.OrderItems).Select(i => i.MealId));

            return Ok(orders.Select(o => OrderMapper.ToResponse(o, mealNames)));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(Guid id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
            if (order is null) return NotFound();

            var mealNames = await GetMealNames(order.OrderItems.Select(i => i.MealId));
            return Ok(OrderMapper.ToResponse(order, mealNames));
        }

        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> CompleteOrder(Guid id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(o => o.Id == id);
            if (order is null) return NotFound();

            if (order.Status == OrderStatus.Completed) return Conflict("Order has already been completed.");

            order.Status = OrderStatus.Completed;
            order.UpdatedAt = DateTimeOffset.UtcNow;
            await _context.SaveChangesAsync();

            var mealNames = await GetMealNames(order.OrderItems.Select(i => i.MealId));
            return Ok(OrderMapper.ToResponse(order, mealNames));
        }

        private async Task<Dictionary<Guid, string>> GetMealNames(IEnumerable<Guid> mealIds)
        {
            var ids = mealIds.Distinct().ToList();
            return await _context.Meals
                .Where(m => ids.Contains(m.Id))
                .ToDictionaryAsync(m => m.Id, m => m.Name);
        }
    }
}
