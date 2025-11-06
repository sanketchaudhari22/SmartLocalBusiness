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

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            try
            {
                var results = await _searchService.SearchBusinessesAsync(request);
                return Ok(ApiResponse<PagedResult<BusinessDto>>.SuccessResponse(results));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<PagedResult<BusinessDto>>.ErrorResponse(ex.Message));
            }
        }

        [HttpGet("nearby")]
        public async Task<IActionResult> GetNearby(
            [FromQuery] decimal latitude,
            [FromQuery] decimal longitude,
            [FromQuery] int radiusInKm = 10,
            [FromQuery] int? categoryId = null)
        {
            try
            {
                var businesses = await _searchService.GetNearbyBusinessesAsync(
                    latitude, longitude, radiusInKm, categoryId);
                return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<List<BusinessDto>>.ErrorResponse(ex.Message));
            }
        }
    }
}
