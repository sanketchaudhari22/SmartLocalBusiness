using Microsoft.AspNetCore.Mvc;
using SearchService.Services;
using SmartLocalBusiness.Shared.Models;
using SmartLocalBusiness.Shared.Responses;
using SmartLocalBusiness.Shared.DTOs;

namespace SearchService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        // ✅ Simple GET Search (for easy testing)
        [HttpGet]
        public async Task<IActionResult> SearchByQuery([FromQuery] string query = "", [FromQuery] int? categoryId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var request = new SearchRequest
            {
                SearchTerm = query,
                CategoryId = categoryId,
                PageNumber = page,
                PageSize = pageSize
            };
            var results = await _searchService.SearchBusinessesAsync(request);
            return Ok(ApiResponse<PagedResult<BusinessDto>>.SuccessResponse(results));
        }

        // ✅ Standard Search
        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var results = await _searchService.SearchBusinessesAsync(request);
            return Ok(ApiResponse<PagedResult<BusinessDto>>.SuccessResponse(results));
        }

        // ✅ Nearby Search
        [HttpGet("nearby")]
        public async Task<IActionResult> GetNearby([FromQuery] decimal latitude, [FromQuery] decimal longitude, [FromQuery] int radiusInKm = 10, [FromQuery] int? categoryId = null)
        {
            var businesses = await _searchService.GetNearbyBusinessesAsync(latitude, longitude, radiusInKm, categoryId);
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
        }

        // 🆕 Quick Search
        [HttpGet("quick")]
        public async Task<IActionResult> QuickSearch([FromQuery] string term, [FromQuery] int limit = 5)
        {
            var results = await _searchService.QuickSearchAsync(term, limit);
            return Ok(ApiResponse<IEnumerable<BusinessDto>>.SuccessResponse(results, "Quick results fetched"));
        }
    }
}
