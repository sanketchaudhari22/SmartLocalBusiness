using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLocalBusiness.Infrastructure.Data;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;

namespace BusinessService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ApplicationDbContext context, ILogger<CategoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all active categories
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                _logger.LogInformation("🔍 Fetching all categories");

                var categories = await _context.Categories
                    .Where(c => c.IsActive)
                    .OrderBy(c => c.CategoryName)
                    .Select(c => new CategoryDto
                    {
                        CategoryId = c.CategoryId,
                        CategoryName = c.CategoryName,
                        Description = c.Description,
                        IconUrl = c.IconUrl,
                        IsActive = c.IsActive
                    })
                    .ToListAsync();

                _logger.LogInformation("✅ Retrieved {Count} categories", categories.Count);

                return Ok(ApiResponse<List<CategoryDto>>.SuccessResponse(categories));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error fetching categories");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to fetch categories"));
            }
        }

        /// <summary>
        /// Get category by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            try
            {
                _logger.LogInformation("🔍 Fetching category ID: {Id}", id);

                var category = await _context.Categories
                    .Where(c => c.CategoryId == id)
                    .Select(c => new CategoryDto
                    {
                        CategoryId = c.CategoryId,
                        CategoryName = c.CategoryName,
                        Description = c.Description,
                        IconUrl = c.IconUrl,
                        IsActive = c.IsActive
                    })
                    .FirstOrDefaultAsync();

                if (category == null)
                {
                    _logger.LogWarning("❌ Category not found: {Id}", id);
                    return NotFound(ApiResponse<object>.ErrorResponse("Category not found"));
                }

                _logger.LogInformation("✅ Category found: {Id}", id);
                return Ok(ApiResponse<CategoryDto>.SuccessResponse(category));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error fetching category: {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to fetch category"));
            }
        }

        /// <summary>
        /// Create new category (Admin only)
        /// </summary>
        [HttpPost]
        // [Authorize(Roles = "Admin")] // TODO: Uncomment when auth is implemented
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            try
            {
                _logger.LogInformation("➕ Creating new category: {Name}", dto.CategoryName);

                // Validate
                if (string.IsNullOrWhiteSpace(dto.CategoryName))
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Category name is required"));
                }

                // Check for duplicate
                var exists = await _context.Categories
                    .AnyAsync(c => c.CategoryName.ToLower() == dto.CategoryName.ToLower());

                if (exists)
                {
                    _logger.LogWarning("❌ Category already exists: {Name}", dto.CategoryName);
                    return Conflict(ApiResponse<object>.ErrorResponse("Category with this name already exists"));
                }

                var category = new SmartLocalBusiness.Domain.Entities.Category
                {
                    CategoryName = dto.CategoryName,
                    Description = dto.Description,
                    IconUrl = dto.IconUrl,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                _logger.LogInformation("✅ Category created: {Id} - {Name}", category.CategoryId, category.CategoryName);

                var result = new CategoryDto
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    Description = category.Description,
                    IconUrl = category.IconUrl,
                    IsActive = category.IsActive
                };

                return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId },
                    ApiResponse<CategoryDto>.SuccessResponse(result, "Category created successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error creating category");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to create category"));
            }
        }

        /// <summary>
        /// Update existing category (Admin only)
        /// </summary>
        [HttpPut("{id}")]
        // [Authorize(Roles = "Admin")] // TODO: Uncomment when auth is implemented
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CreateCategoryDto dto)
        {
            try
            {
                _logger.LogInformation("🔄 Updating category: {Id}", id);

                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                {
                    _logger.LogWarning("❌ Category not found: {Id}", id);
                    return NotFound(ApiResponse<object>.ErrorResponse("Category not found"));
                }

                // Validate
                if (string.IsNullOrWhiteSpace(dto.CategoryName))
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Category name is required"));
                }

                // Check for duplicate name (excluding current category)
                var duplicate = await _context.Categories
                    .AnyAsync(c => c.CategoryName.ToLower() == dto.CategoryName.ToLower() && c.CategoryId != id);

                if (duplicate)
                {
                    _logger.LogWarning("❌ Category name already exists: {Name}", dto.CategoryName);
                    return Conflict(ApiResponse<object>.ErrorResponse("Category with this name already exists"));
                }

                category.CategoryName = dto.CategoryName;
                category.Description = dto.Description;
                category.IconUrl = dto.IconUrl;

                _context.Categories.Update(category);
                await _context.SaveChangesAsync();

                _logger.LogInformation("✅ Category updated: {Id} - {Name}", id, category.CategoryName);

                var result = new CategoryDto
                {
                    CategoryId = category.CategoryId,
                    CategoryName = category.CategoryName,
                    Description = category.Description,
                    IconUrl = category.IconUrl,
                    IsActive = category.IsActive
                };

                return Ok(ApiResponse<CategoryDto>.SuccessResponse(result, "Category updated successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error updating category: {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to update category"));
            }
        }

        /// <summary>
        /// Delete category (soft delete by marking inactive) (Admin only)
        /// </summary>
        [HttpDelete("{id}")]
        // [Authorize(Roles = "Admin")] // TODO: Uncomment when auth is implemented
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                _logger.LogInformation("🗑️ Deleting category: {Id}", id);

                var category = await _context.Categories
                    .Include(c => c.Businesses)
                    .FirstOrDefaultAsync(c => c.CategoryId == id);

                if (category == null)
                {
                    _logger.LogWarning("❌ Category not found: {Id}", id);
                    return NotFound(ApiResponse<object>.ErrorResponse("Category not found"));
                }

                // Check if category has businesses
                if (category.Businesses.Any())
                {
                    _logger.LogWarning("❌ Cannot delete category with businesses: {Id}", id);
                    return BadRequest(ApiResponse<object>.ErrorResponse(
                        "Cannot delete category that has associated businesses. Please reassign or remove businesses first."));
                }

                // Soft delete by marking inactive
                category.IsActive = false;
                _context.Categories.Update(category);
                await _context.SaveChangesAsync();

                _logger.LogInformation("✅ Category marked inactive: {Id}", id);

                return Ok(ApiResponse<object>.SuccessResponse(null, "Category deleted successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error deleting category: {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to delete category"));
            }
        }

        /// <summary>
        /// Get category with business count
        /// </summary>
        [HttpGet("{id}/stats")]
        public async Task<IActionResult> GetCategoryStats(int id)
        {
            try
            {
                _logger.LogInformation("📊 Fetching stats for category: {Id}", id);

                var category = await _context.Categories
                    .Where(c => c.CategoryId == id)
                    .Select(c => new
                    {
                        c.CategoryId,
                        c.CategoryName,
                        c.Description,
                        c.IconUrl,
                        c.IsActive,
                        BusinessCount = c.Businesses.Count(b => b.IsVerified == true)
                    })
                    .FirstOrDefaultAsync();

                if (category == null)
                {
                    _logger.LogWarning("❌ Category not found: {Id}", id);
                    return NotFound(ApiResponse<object>.ErrorResponse("Category not found"));
                }

                _logger.LogInformation("✅ Category stats retrieved: {Id}", id);
                return Ok(ApiResponse<object>.SuccessResponse(category));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Error fetching category stats: {Id}", id);
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Failed to fetch category stats"));
            }
        }
    }
}
