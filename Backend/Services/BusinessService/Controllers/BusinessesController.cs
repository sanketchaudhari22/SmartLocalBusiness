using Microsoft.AspNetCore.Mvc;
using SmartLocalBusiness.Shared.DTOs;
using SmartLocalBusiness.Shared.Responses;
using BusinessService.Services;

namespace BusinessService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessesController : ControllerBase
    {
        private readonly IBusinessService _businessService;

        public BusinessesController(IBusinessService businessService)
        {
            _businessService = businessService;
        }

        // ✅ Create Business
        [HttpPost]
        public async Task<IActionResult> CreateBusiness([FromBody] CreateBusinessDto dto)
        {
            var business = await _businessService.CreateBusinessAsync(dto);
            return Ok(ApiResponse<BusinessDto>.SuccessResponse(business, "Business created successfully"));
        }

        // ✅ Get All
        [HttpGet]
        public async Task<IActionResult> GetAllBusinesses()
        {
            var businesses = await _businessService.GetAllBusinessesAsync();
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
        }

        // ✅ Get By Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusiness(int id)
        {
            var business = await _businessService.GetBusinessByIdAsync(id);
            return Ok(ApiResponse<BusinessDto>.SuccessResponse(business));
        }

        // ✅ Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, [FromBody] CreateBusinessDto dto)
        {
            var business = await _businessService.UpdateBusinessAsync(id, dto);
            return Ok(ApiResponse<BusinessDto>.SuccessResponse(business, "Business updated successfully"));
        }

        // ✅ Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var result = await _businessService.DeleteBusinessAsync(id);
            return Ok(ApiResponse<bool>.SuccessResponse(result, result ? "Business deleted" : "Not found"));
        }

        // ✅ Get By Category
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var businesses = await _businessService.GetBusinessesByCategoryAsync(categoryId);
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
        }

        // ✅ Get By User (Dashboard)
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var businesses = await _businessService.GetBusinessesByUserAsync(userId);
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses, "Businesses by user fetched"));
        }
    }
}
