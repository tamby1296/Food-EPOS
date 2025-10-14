using FoodEpos.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FoodEpos.API.Controllers
{
    [Route("api/meal")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly FoodEposDbContext _context;

        public MealController(FoodEposDbContext ctx)
        {
            _context = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetMeals([FromQuery] int? categoryId)
        {
            var query = _context.Meals.AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(m => m.MealCategoryId == categoryId.Value);
            }

            var meals = await query.ToListAsync();
            return Ok(meals);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetMealCategories()
        {
            return Ok(await _context.MealCategories.ToListAsync());
        }
    }
}
