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

        [HttpPost]
        public async Task<IActionResult> CreateBusiness([FromBody] CreateBusinessDto dto)
        {
            try
            {
                var business = await _businessService.CreateBusinessAsync(dto);
                return Ok(ApiResponse<BusinessDto>.SuccessResponse(business, "Business created successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<BusinessDto>.ErrorResponse(ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusiness(int id)
        {
            try
            {
                var business = await _businessService.GetBusinessByIdAsync(id);
                return Ok(ApiResponse<BusinessDto>.SuccessResponse(business));
            }
            catch (Exception ex)
            {
                return NotFound(ApiResponse<BusinessDto>.ErrorResponse(ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBusinesses()
        {
            var businesses = await _businessService.GetAllBusinessesAsync();
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, [FromBody] CreateBusinessDto dto)
        {
            try
            {
                var business = await _businessService.UpdateBusinessAsync(id, dto);
                return Ok(ApiResponse<BusinessDto>.SuccessResponse(business, "Business updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<BusinessDto>.ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var result = await _businessService.DeleteBusinessAsync(id);
            if (result)
                return Ok(ApiResponse<bool>.SuccessResponse(true, "Business deleted successfully"));

            return NotFound(ApiResponse<bool>.ErrorResponse("Business not found"));
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetBusinessesByCategory(int categoryId)
        {
            var businesses = await _businessService.GetBusinessesByCategoryAsync(categoryId);
            return Ok(ApiResponse<List<BusinessDto>>.SuccessResponse(businesses));
        }
    }
}
