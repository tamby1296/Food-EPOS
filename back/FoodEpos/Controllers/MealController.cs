using FoodEpos.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace FoodEpos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly FoodEposDbContext _context;

        public MealController(FoodEposDbContext ctx)
        {
            _context = ctx;
        }

        [HttpGet]
        public async Task<IActionResult> GetMeals()
        {
            return Ok(await _context.Meals.ToListAsync());
        }
    }
}
